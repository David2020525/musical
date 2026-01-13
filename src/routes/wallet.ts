/**
 * Wallet Routes
 * Handles wallet operations and withdrawal requests
 */

import { Hono } from 'hono';
import { Bindings } from '../types';
import { verifyToken } from '../lib/auth';
import { z } from 'zod';

const wallet = new Hono<{ Bindings: Bindings }>();

/**
 * Get wallet balance and summary
 * GET /api/wallet
 */
wallet.get('/', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const user = await verifyToken(authHeader.replace('Bearer ', ''), c.env);
    if (!user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    // Get or create wallet
    let walletData = await c.env.DB.prepare(
      'SELECT * FROM wallets WHERE user_id = ?'
    )
      .bind(user.id)
      .first();

    if (!walletData) {
      // Create wallet if it doesn't exist
      await c.env.DB.prepare(
        `INSERT INTO wallets (user_id, balance, total_earned, total_withdrawn, currency, updated_at)
         VALUES (?, 0, 0, 0, 'TRY', datetime('now'))`
      )
        .bind(user.id)
        .run();

      walletData = await c.env.DB.prepare(
        'SELECT * FROM wallets WHERE user_id = ?'
      )
        .bind(user.id)
        .first();
    }

    // Get pending withdrawals
    const pendingWithdrawalsResult = await c.env.DB.prepare(
      'SELECT COALESCE(SUM(amount), 0) as total FROM withdrawal_requests WHERE user_id = ? AND status = ?'
    )
      .bind(user.id, 'pending')
      .first();

    const pendingAmount = parseFloat(pendingWithdrawalsResult?.total || '0');
    const availableBalance = parseFloat(walletData.balance) - pendingAmount;

    return c.json({
      success: true,
      wallet: {
        balance: parseFloat(walletData.balance),
        available: availableBalance,
        pending: pendingAmount,
        totalEarned: parseFloat(walletData.total_earned),
        totalWithdrawn: parseFloat(walletData.total_withdrawn),
        currency: walletData.currency,
      },
    });
  } catch (error) {
    console.error('Get wallet error:', error);
    return c.json({ success: false, error: 'Failed to fetch wallet' }, 500);
  }
});

/**
 * Get wallet transactions
 * GET /api/wallet/transactions
 */
wallet.get('/transactions', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const user = await verifyToken(authHeader.replace('Bearer ', ''), c.env);
    if (!user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    const limit = parseInt(c.req.query('limit') || '50');
    const offset = parseInt(c.req.query('offset') || '0');

    // Get wallet ID
    const walletData = await c.env.DB.prepare(
      'SELECT id FROM wallets WHERE user_id = ?'
    )
      .bind(user.id)
      .first();

    if (!walletData) {
      return c.json({ success: true, transactions: [], total: 0 });
    }

    // Get transactions with track details for sales
    const transactions = await c.env.DB.prepare(
      `SELECT 
        p.id,
        p.amount,
        p.artist_payout as net_amount,
        p.platform_commission as commission,
        p.created_at,
        t.title as track_title,
        'sale' as type,
        u.username as buyer_name
       FROM purchases p
       JOIN tracks t ON p.track_id = t.id
       JOIN users u ON p.user_id = u.id
       WHERE t.user_id = ? AND p.status = 'completed'
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`
    )
      .bind(user.id, limit, offset)
      .all();

    const total = await c.env.DB.prepare(
      `SELECT COUNT(*) as count FROM purchases p
       JOIN tracks t ON p.track_id = t.id
       WHERE t.user_id = ? AND p.status = 'completed'`
    )
      .bind(user.id)
      .first();

    return c.json({
      success: true,
      transactions: transactions.results || [],
      total: total?.count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    return c.json({ success: false, error: 'Failed to fetch transactions' }, 500);
  }
});

/**
 * Request withdrawal
 * POST /api/wallet/withdraw
 */
const withdrawSchema = z.object({
  amount: z.number().positive(),
  bankName: z.string().min(1),
  iban: z.string().min(1),
  accountHolder: z.string().min(1),
  note: z.string().optional(),
});

wallet.post('/withdraw', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const user = await verifyToken(authHeader.replace('Bearer ', ''), c.env);
    if (!user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    // Check if user is a producer
    if (user.role !== 'producer' && user.role !== 'admin') {
      return c.json({ success: false, error: 'Only producers can request withdrawals' }, 403);
    }

    const body = await c.req.json();
    const validation = withdrawSchema.safeParse(body);

    if (!validation.success) {
      return c.json({
        success: false,
        error: 'Invalid withdrawal request',
        details: validation.error.errors,
      }, 400);
    }

    const { amount, bankName, iban, accountHolder, note } = validation.data;

    // Get wallet
    const walletData = await c.env.DB.prepare(
      'SELECT * FROM wallets WHERE user_id = ?'
    )
      .bind(user.id)
      .first();

    if (!walletData) {
      return c.json({ success: false, error: 'Wallet not found' }, 404);
    }

    // Check pending withdrawals
    const pendingResult = await c.env.DB.prepare(
      'SELECT COALESCE(SUM(amount), 0) as total FROM withdrawal_requests WHERE user_id = ? AND status = ?'
    )
      .bind(user.id, 'pending')
      .first();

    const pendingAmount = parseFloat(pendingResult?.total || '0');
    const availableBalance = parseFloat(walletData.balance) - pendingAmount;

    if (amount > availableBalance) {
      return c.json({
        success: false,
        error: `Insufficient balance. Available: ₺${availableBalance.toFixed(2)}`,
      }, 400);
    }

    // Minimum withdrawal amount
    const minWithdrawal = 100; // ₺100 minimum
    if (amount < minWithdrawal) {
      return c.json({
        success: false,
        error: `Minimum withdrawal amount is ₺${minWithdrawal}`,
      }, 400);
    }

    // Create withdrawal request
    const result = await c.env.DB.prepare(
      `INSERT INTO withdrawal_requests (
        user_id, amount, bank_name, iban, account_holder, note, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, 'pending', datetime('now'))`
    )
      .bind(user.id, amount, bankName, iban, accountHolder, note || null)
      .run();

    return c.json({
      success: true,
      message: 'Withdrawal request submitted successfully',
      requestId: result.meta.last_row_id,
    });
  } catch (error) {
    console.error('Withdrawal request error:', error);
    return c.json({ success: false, error: 'Failed to process withdrawal request' }, 500);
  }
});

/**
 * Get withdrawal requests
 * GET /api/wallet/withdrawals
 */
wallet.get('/withdrawals', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const user = await verifyToken(authHeader.replace('Bearer ', ''), c.env);
    if (!user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    const withdrawals = await c.env.DB.prepare(
      `SELECT * FROM withdrawal_requests
       WHERE user_id = ?
       ORDER BY created_at DESC`
    )
      .bind(user.id)
      .all();

    return c.json({
      success: true,
      withdrawals: withdrawals.results || [],
    });
  } catch (error) {
    console.error('Get withdrawals error:', error);
    return c.json({ success: false, error: 'Failed to fetch withdrawals' }, 500);
  }
});

/**
 * Get earnings chart data (last 6 months)
 * GET /api/wallet/earnings-chart
 */
wallet.get('/earnings-chart', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const user = await verifyToken(authHeader.replace('Bearer ', ''), c.env);
    if (!user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    // Get monthly earnings for the last 6 months
    const earnings = await c.env.DB.prepare(
      `SELECT 
        strftime('%Y-%m', p.created_at) as month,
        SUM(p.artist_payout) as earnings,
        COUNT(*) as sales
       FROM purchases p
       JOIN tracks t ON p.track_id = t.id
       WHERE t.user_id = ? 
         AND p.status = 'completed'
         AND p.created_at >= datetime('now', '-6 months')
       GROUP BY strftime('%Y-%m', p.created_at)
       ORDER BY month DESC`
    )
      .bind(user.id)
      .all();

    return c.json({
      success: true,
      data: earnings.results || [],
    });
  } catch (error) {
    console.error('Get earnings chart error:', error);
    return c.json({ success: false, error: 'Failed to fetch earnings data' }, 500);
  }
});

export default wallet;
