/**
 * Payment Routes - Iyzico Integration
 * Handles checkout, callbacks, and purchase processing
 */

import { Hono } from 'hono';
import { Bindings } from '../types';
import { verifyToken } from '../lib/auth';
import { createIyzicoClient } from '../lib/iyzico';
import { getEmailService } from '../lib/email';
import { getPurchaseConfirmationEmailTemplate, getTrackSoldEmailTemplate } from '../lib/email-templates';
import { z } from 'zod';

const payments = new Hono<{ Bindings: Bindings }>();

/**
 * Initialize checkout payment
 * POST /api/payments/checkout
 */
payments.post('/checkout', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token, c.env);
    if (!decoded) {
      console.error('Token verification failed for checkout');
      return c.json({ success: false, error: 'Invalid or expired token. Please log in again.' }, 401);
    }
    
    if (!decoded.userId) {
      console.error('Token missing userId:', decoded);
      return c.json({ success: false, error: 'Invalid token format' }, 401);
    }

    const body = await c.req.json();
    console.log('Checkout request body:', body);
    const { trackId, locale = 'en' } = body;

    if (!trackId) {
      return c.json({ success: false, error: 'trackId is required' }, 400);
    }

    // Get track details
    const track = await c.env.DB.prepare(
      `SELECT t.*, u.username as artist_name, u.email as artist_email, u.id as artist_id
       FROM tracks t
       LEFT JOIN users u ON t.user_id = u.id
       WHERE t.id = ?`
    )
      .bind(trackId)
      .first();

    if (!track) {
      return c.json({ success: false, error: 'Track not found' }, 404);
    }

    // Check if already purchased
    const existingPurchase = await c.env.DB.prepare(
      'SELECT id FROM purchases WHERE user_id = ? AND track_id = ?'
    )
      .bind(decoded.userId, trackId)
      .first();

    if (existingPurchase) {
      return c.json({ success: false, error: 'Track already purchased' }, 400);
    }

    const price = parseFloat(track.price || '29.99');
    const iyzico = createIyzicoClient(c.env);

    // Calculate commission
    const { platform, artist } = iyzico.calculateCommissions(price);

    // Create payment request
    const conversationId = `${decoded.userId}-${trackId}-${Date.now()}`;
    const basketId = `basket-${conversationId}`;

    const callbackUrl = `${c.env.APP_URL || 'http://localhost:3000'}/api/payments/callback`;

    const paymentRequest = {
      locale: locale as 'tr' | 'en',
      conversationId,
      price: price.toFixed(2),
      paidPrice: price.toFixed(2),
      currency: 'TRY' as const,
      basketId,
      paymentGroup: 'PRODUCT' as const,
      callbackUrl,
      enabledInstallments: [1],
      buyer: {
        id: decoded.userId.toString(),
        name: decoded.username?.split(' ')[0] || 'User',
        surname: decoded.username?.split(' ').slice(1).join(' ') || 'User',
        email: decoded.email,
        identityNumber: '11111111111', // Test identity for sandbox
        registrationAddress: 'Address',
        city: 'Istanbul',
        country: 'Turkey',
        ip: c.req.header('CF-Connecting-IP') || '127.0.0.1',
      },
      billingAddress: {
        contactName: decoded.username || 'User',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Address',
      },
      basketItems: [
        {
          id: trackId.toString(),
          name: track.title,
          category1: track.genre || 'Music',
          itemType: 'VIRTUAL' as const,
          price: price.toFixed(2),
        },
      ],
    };

    // Initialize payment
    let response;
    try {
      console.log('Initializing Iyzico checkout with request:', {
        locale: paymentRequest.locale,
        price: paymentRequest.price,
        conversationId: paymentRequest.conversationId,
        basketId: paymentRequest.basketId,
        buyerId: paymentRequest.buyer.id,
        trackId: trackId
      });
      
      response = await iyzico.initializeCheckout(paymentRequest);
      
      console.log('Iyzico response:', {
        status: response.status,
        hasPaymentUrl: !!response.paymentPageUrl,
        hasToken: !!response.token,
        errorCode: response.errorCode,
        errorMessage: response.errorMessage
      });
    } catch (error: any) {
      console.error('Iyzico checkout error:', error);
      console.error('Error type:', typeof error);
      console.error('Error keys:', Object.keys(error));
      console.error('Error iyzicoError:', error.iyzicoError);
      
      const errorMessage = error.iyzicoError?.errorMessage || error.message || 'Payment initialization failed';
      const errorDetails = error.iyzicoError || error.details || {};
      
      return c.json({
        success: false,
        error: errorMessage,
        details: errorDetails,
        errorType: error.constructor?.name,
        fullError: process.env.NODE_ENV === 'development' ? String(error) : undefined
      }, 400);
    }

    if (response.status === 'success' && response.paymentPageUrl) {
      // Store pending transaction
      await c.env.DB.prepare(
        `INSERT INTO purchases (
          user_id, track_id, amount, platform_commission, artist_earning,
          payment_status, payment_id, conversation_id, created_at
        ) VALUES (?, ?, ?, ?, ?, 'PENDING', ?, ?, datetime('now'))`
      )
        .bind(decoded.userId, trackId, price, platform, artist, response.token, conversationId)
        .run();

      return c.json({
        success: true,
        paymentUrl: response.paymentPageUrl,
        token: response.token,
      });
    } else {
      return c.json({
        success: false,
        error: response.errorMessage || 'Payment initialization failed',
      }, 400);
    }
  } catch (error) {
    console.error('Checkout error:', error);
    return c.json({ success: false, error: 'Payment processing failed' }, 500);
  }
});

/**
 * Payment callback handler
 * POST /api/payments/callback
 */
payments.post('/callback', async (c) => {
  try {
    const body = await c.req.json();
    const { token } = body;

    if (!token) {
      return c.json({ success: false, error: 'Missing token' }, 400);
    }

    const iyzico = createIyzicoClient(c.env);

    // Retrieve payment result
    const paymentResult = await iyzico.retrievePayment(token);

    if (paymentResult.status !== 'success') {
      // Update purchase status to failed
      await c.env.DB.prepare(
        'UPDATE purchases SET status = ?, updated_at = datetime(\'now\') WHERE payment_id = ?'
      )
        .bind('failed', token)
        .run();

      return c.json({
        success: false,
        error: 'Payment failed',
        redirect: '/dashboard/purchases?status=failed',
      });
    }

    // Get purchase record
    const purchase = await c.env.DB.prepare(
      `SELECT p.*, t.title as track_title, t.audio_url, 
              u.id as buyer_id, u.email as buyer_email, u.name as buyer_name,
              a.id as artist_id, a.email as artist_email, a.name as artist_name
       FROM purchases p
       JOIN tracks t ON p.track_id = t.id
       JOIN users u ON p.user_id = u.id
       LEFT JOIN users a ON t.user_id = a.id
       WHERE p.payment_id = ?`
    )
      .bind(token)
      .first();

    if (!purchase) {
      return c.json({ success: false, error: 'Purchase not found' }, 404);
    }

    // Update purchase status
    await c.env.DB.prepare(
      `UPDATE purchases SET 
        status = 'completed',
        payment_status = ?,
        updated_at = datetime('now')
       WHERE payment_id = ?`
    )
      .bind(paymentResult.paymentStatus, token)
      .run();

    // Update artist wallet
    if (purchase.artist_id) {
      // Check if wallet exists
      const wallet = await c.env.DB.prepare(
        'SELECT id FROM wallets WHERE user_id = ?'
      )
        .bind(purchase.artist_id)
        .first();

      if (!wallet) {
        // Create wallet
        await c.env.DB.prepare(
          `INSERT INTO wallets (user_id, balance, total_earned, total_withdrawn, currency, updated_at)
           VALUES (?, ?, ?, 0, 'TRY', datetime('now'))`
        )
          .bind(purchase.artist_id, purchase.artist_payout, purchase.artist_payout)
          .run();
      } else {
        // Update wallet
        await c.env.DB.prepare(
          `UPDATE wallets SET 
            balance = balance + ?,
            total_earned = total_earned + ?,
            updated_at = datetime('now')
           WHERE user_id = ?`
        )
          .bind(purchase.artist_payout, purchase.artist_payout, purchase.artist_id)
          .run();
      }

      // Record transaction
      await c.env.DB.prepare(
        `INSERT INTO wallet_transactions (
          wallet_id, type, amount, description, created_at
        ) SELECT id, 'sale', ?, ?, datetime('now')
          FROM wallets WHERE user_id = ?`
      )
        .bind(
          purchase.artist_payout,
          `Sale of "${purchase.track_title}"`,
          purchase.artist_id
        )
        .run();
    }

    // Update track play count
    await c.env.DB.prepare(
      'UPDATE tracks SET sales_count = sales_count + 1 WHERE id = ?'
    )
      .bind(purchase.track_id)
      .run();

    // Send emails
    const emailService = getEmailService(c.env);

    // Send confirmation to buyer
    const buyerEmail = getPurchaseConfirmationEmailTemplate({
      buyerName: purchase.buyer_name,
      trackTitle: purchase.track_title,
      artistName: purchase.artist_name || 'Unknown Artist',
      amount: parseFloat(purchase.amount),
      downloadUrl: `${c.env.APP_URL}/dashboard/purchases?download=${purchase.id}`,
      receiptUrl: `${c.env.APP_URL}/dashboard/purchases/${purchase.id}`,
      locale: paymentResult.locale as 'en' | 'tr',
    });

    await emailService.send({
      to: purchase.buyer_email,
      subject: buyerEmail.subject,
      html: buyerEmail.html,
      text: buyerEmail.text,
    });

    // Send notification to artist
    if (purchase.artist_email) {
      const artistEmail = getTrackSoldEmailTemplate({
        producerName: purchase.artist_name || 'Producer',
        trackTitle: purchase.track_title,
        amount: parseFloat(purchase.amount),
        commission: parseFloat(purchase.platform_commission),
        netEarnings: parseFloat(purchase.artist_payout),
        buyerName: purchase.buyer_name,
        locale: paymentResult.locale as 'en' | 'tr',
      });

      await emailService.send({
        to: purchase.artist_email,
        subject: artistEmail.subject,
        html: artistEmail.html,
        text: artistEmail.text,
      });
    }

    return c.json({
      success: true,
      redirect: `/dashboard/purchases?status=success&id=${purchase.id}`,
    });
  } catch (error) {
    console.error('Callback error:', error);
    return c.json({ success: false, error: 'Callback processing failed' }, 500);
  }
});

/**
 * Get purchase details
 * GET /api/payments/purchase/:id
 */
payments.get('/purchase/:id', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const decoded = verifyToken(authHeader.replace('Bearer ', ''), c.env);
    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    const purchaseId = c.req.param('id');

    const purchase = await c.env.DB.prepare(
      `SELECT p.*, t.title, t.artist, t.audio_url, t.cover_url
       FROM purchases p
       JOIN tracks t ON p.track_id = t.id
       WHERE p.id = ? AND p.user_id = ?`
    )
      .bind(purchaseId, decoded.userId)
      .first();

    if (!purchase) {
      return c.json({ success: false, error: 'Purchase not found' }, 404);
    }

    return c.json({ success: true, purchase });
  } catch (error) {
    console.error('Get purchase error:', error);
    return c.json({ success: false, error: 'Failed to fetch purchase' }, 500);
  }
});

/**
 * Generate download URL for purchased track
 * GET /api/payments/download/:purchaseId
 */
payments.get('/download/:purchaseId', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const decoded = verifyToken(authHeader.replace('Bearer ', ''), c.env);
    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    const purchaseId = c.req.param('purchaseId');

    // Verify purchase ownership
    const purchase = await c.env.DB.prepare(
      `SELECT p.*, t.audio_url, t.title
       FROM purchases p
       JOIN tracks t ON p.track_id = t.id
       WHERE p.id = ? AND p.user_id = ? AND p.status = 'completed'`
    )
      .bind(purchaseId, decoded.userId)
      .first();

    if (!purchase) {
      return c.json({ success: false, error: 'Purchase not found or not completed' }, 404);
    }

    // For now, return the audio URL directly
    // TODO: Generate signed R2 URL with expiration
    return c.json({
      success: true,
      downloadUrl: purchase.audio_url,
      filename: `${purchase.title}.mp3`,
      expiresIn: 3600, // 1 hour
    });
  } catch (error) {
    console.error('Download URL error:', error);
    return c.json({ success: false, error: 'Failed to generate download URL' }, 500);
  }
});

export default payments;
