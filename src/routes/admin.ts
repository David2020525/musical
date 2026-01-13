import { Hono } from 'hono'
import { Bindings } from '../types'

const admin = new Hono<{ Bindings: Bindings }>()

// Middleware: Require admin role
admin.use('*', async (c, next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ success: false, error: 'Unauthorized' }, 401)
  }
  
  const token = authHeader.replace('Bearer ', '')
  
  try {
    const { verifyToken } = await import('../lib/auth')
    const decoded = await verifyToken(token)
    
    if (decoded.role !== 'admin') {
      return c.json({ success: false, error: 'Forbidden: Admin role required' }, 403)
    }
    
    // Attach user to context
    c.set('user', decoded)
    await next()
  } catch (error) {
    return c.json({ success: false, error: 'Invalid token' }, 401)
  }
})

// GET /api/admin/stats - Platform statistics
admin.get('/stats', async (c) => {
  try {
    const db = c.env.DB

    const [usersResult, tracksResult, applicationsResult, topicsResult] = await Promise.all([
      db.prepare('SELECT COUNT(*) as count FROM users').first(),
      db.prepare('SELECT COUNT(*) as count FROM tracks').first(),
      db.prepare('SELECT COUNT(*) as count FROM producer_applications WHERE status = ?').bind('pending').first(),
      db.prepare('SELECT COUNT(*) as count FROM forum_topics').first(),
    ])

    return c.json({
      success: true,
      data: {
        users: (usersResult as any)?.count || 0,
        tracks: (tracksResult as any)?.count || 0,
        pendingApplications: (applicationsResult as any)?.count || 0,
        forumTopics: (topicsResult as any)?.count || 0,
      }
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return c.json({ success: false, error: 'Failed to fetch stats' }, 500)
  }
})

// GET /api/admin/users - List all users
admin.get('/users', async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1')
    const limit = 50
    const offset = (page - 1) * limit

    const result = await c.env.DB.prepare(`
      SELECT id, email, username, name, role, created_at 
      FROM users 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `).bind(limit, offset).all()

    const countResult = await c.env.DB.prepare('SELECT COUNT(*) as count FROM users').first()
    const total = (countResult as any)?.count || 0

    return c.json({
      success: true,
      data: {
        users: result.results,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('List users error:', error)
    return c.json({ success: false, error: 'Failed to list users' }, 500)
  }
})

// PUT /api/admin/users/:id/role - Update user role
admin.put('/users/:id/role', async (c) => {
  try {
    const userId = c.req.param('id')
    const { role } = await c.req.json()

    if (!['user', 'producer', 'moderator', 'admin'].includes(role)) {
      return c.json({ success: false, error: 'Invalid role' }, 400)
    }

    await c.env.DB.prepare('UPDATE users SET role = ? WHERE id = ?')
      .bind(role, userId)
      .run()

    return c.json({ success: true, message: 'User role updated' })
  } catch (error) {
    console.error('Update role error:', error)
    return c.json({ success: false, error: 'Failed to update role' }, 500)
  }
})

// DELETE /api/admin/users/:id - Delete user
admin.delete('/users/:id', async (c) => {
  try {
    const userId = c.req.param('id')

    // Don't allow deleting yourself
    const currentUser = c.get('user') as any
    if (currentUser.id === parseInt(userId)) {
      return c.json({ success: false, error: 'Cannot delete your own account' }, 400)
    }

    await c.env.DB.prepare('DELETE FROM users WHERE id = ?')
      .bind(userId)
      .run()

    return c.json({ success: true, message: 'User deleted' })
  } catch (error) {
    console.error('Delete user error:', error)
    return c.json({ success: false, error: 'Failed to delete user' }, 500)
  }
})

// GET /api/admin/applications - List producer applications
admin.get('/applications', async (c) => {
  try {
    const status = c.req.query('status') || 'pending'
    const page = parseInt(c.req.query('page') || '1')
    const limit = 50
    const offset = (page - 1) * limit

    let query = `
      SELECT pa.*, u.name as user_name, u.email as user_email
      FROM producer_applications pa
      JOIN users u ON pa.user_id = u.id
    `
    
    if (status !== 'all') {
      query += ' WHERE pa.status = ?'
    }
    
    query += ' ORDER BY pa.created_at DESC LIMIT ? OFFSET ?'

    const bindings = status !== 'all' ? [status, limit, offset] : [limit, offset]
    const result = await c.env.DB.prepare(query).bind(...bindings).all()

    return c.json({
      success: true,
      data: result.results
    })
  } catch (error) {
    console.error('List applications error:', error)
    return c.json({ success: false, error: 'Failed to list applications' }, 500)
  }
})

// PUT /api/admin/applications/:id/approve - Approve producer application
admin.put('/applications/:id/approve', async (c) => {
  try {
    const appId = c.req.param('id')
    const { notes } = await c.req.json()

    // Get application
    const app = await c.env.DB.prepare('SELECT * FROM producer_applications WHERE id = ?')
      .bind(appId)
      .first() as any

    if (!app) {
      return c.json({ success: false, error: 'Application not found' }, 404)
    }

    if (app.status !== 'pending') {
      return c.json({ success: false, error: 'Application already processed' }, 400)
    }

    // Update application status
    await c.env.DB.prepare('UPDATE producer_applications SET status = ?, admin_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind('approved', notes || null, appId)
      .run()

    // Update user to producer
    await c.env.DB.prepare('UPDATE users SET is_producer = 1 WHERE id = ?')
      .bind(app.user_id)
      .run()

    // Create wallet for producer
    await c.env.DB.prepare('INSERT INTO wallets (user_id, balance, currency) VALUES (?, 0, ?)')
      .bind(app.user_id, 'USD')
      .run()

    return c.json({ success: true, message: 'Application approved successfully' })
  } catch (error) {
    console.error('Approve application error:', error)
    return c.json({ success: false, error: 'Failed to approve application' }, 500)
  }
})

// PUT /api/admin/applications/:id/reject - Reject producer application
admin.put('/applications/:id/reject', async (c) => {
  try {
    const appId = c.req.param('id')
    const { notes } = await c.req.json()

    // Get application
    const app = await c.env.DB.prepare('SELECT * FROM producer_applications WHERE id = ?')
      .bind(appId)
      .first() as any

    if (!app) {
      return c.json({ success: false, error: 'Application not found' }, 404)
    }

    if (app.status !== 'pending') {
      return c.json({ success: false, error: 'Application already processed' }, 400)
    }

    // Update application status
    await c.env.DB.prepare('UPDATE producer_applications SET status = ?, admin_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind('rejected', notes || null, appId)
      .run()

    return c.json({ success: true, message: 'Application rejected' })
  } catch (error) {
    console.error('Reject application error:', error)
    return c.json({ success: false, error: 'Failed to reject application' }, 500)
  }
})

/**
 * Get financial overview
 * GET /api/admin/financial/overview
 */
admin.get('/financial/overview', async (c) => {
  try {
    // Get total revenue (all purchases)
    const revenueResult = await c.env.DB.prepare(
      `SELECT 
        COALESCE(SUM(amount), 0) as total_revenue,
        COALESCE(SUM(platform_commission), 0) as platform_revenue,
        COALESCE(SUM(artist_payout), 0) as artist_payouts,
        COUNT(*) as total_sales
       FROM purchases WHERE status = 'completed'`
    ).first()

    // Get pending withdrawals
    const pendingWithdrawalsResult = await c.env.DB.prepare(
      `SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count
       FROM withdrawal_requests WHERE status = 'pending'`
    ).first()

    // Get monthly revenue (last 6 months)
    const monthlyRevenue = await c.env.DB.prepare(
      `SELECT 
        strftime('%Y-%m', created_at) as month,
        SUM(platform_commission) as revenue,
        COUNT(*) as sales
       FROM purchases
       WHERE status = 'completed' AND created_at >= datetime('now', '-6 months')
       GROUP BY strftime('%Y-%m', created_at)
       ORDER BY month DESC`
    ).all()

    // Top selling tracks
    const topTracks = await c.env.DB.prepare(
      `SELECT 
        t.id, t.title, t.artist,
        COUNT(p.id) as sales,
        SUM(p.amount) as revenue
       FROM tracks t
       JOIN purchases p ON t.id = p.track_id
       WHERE p.status = 'completed'
       GROUP BY t.id
       ORDER BY sales DESC
       LIMIT 10`
    ).all()

    return c.json({
      success: true,
      data: {
        overview: revenueResult,
        pendingWithdrawals: pendingWithdrawalsResult,
        monthlyRevenue: monthlyRevenue.results || [],
        topTracks: topTracks.results || [],
      },
    })
  } catch (error) {
    console.error('Financial overview error:', error)
    return c.json({ success: false, error: 'Failed to fetch financial overview' }, 500)
  }
})

/**
 * Get all transactions with filters
 * GET /api/admin/financial/transactions
 */
admin.get('/financial/transactions', async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '50')
    const offset = (page - 1) * limit
    const status = c.req.query('status')
    const startDate = c.req.query('start_date')
    const endDate = c.req.query('end_date')

    let query = `
      SELECT 
        p.*,
        t.title as track_title,
        u.username as buyer_name,
        u.email as buyer_email,
        prod.username as producer_name
      FROM purchases p
      JOIN tracks t ON p.track_id = t.id
      JOIN users u ON p.user_id = u.id
      LEFT JOIN users prod ON t.user_id = prod.id
      WHERE 1=1
    `
    const params: any[] = []

    if (status) {
      query += ' AND p.status = ?'
      params.push(status)
    }

    if (startDate) {
      query += ' AND p.created_at >= ?'
      params.push(startDate)
    }

    if (endDate) {
      query += ' AND p.created_at <= ?'
      params.push(endDate)
    }

    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const transactions = await c.env.DB.prepare(query).bind(...params).all()

    // Get total count
    let countQuery = 'SELECT COUNT(*) as count FROM purchases p WHERE 1=1'
    const countParams: any[] = []
    
    if (status) {
      countQuery += ' AND p.status = ?'
      countParams.push(status)
    }
    if (startDate) {
      countQuery += ' AND p.created_at >= ?'
      countParams.push(startDate)
    }
    if (endDate) {
      countQuery += ' AND p.created_at <= ?'
      countParams.push(endDate)
    }

    const countResult = await c.env.DB.prepare(countQuery).bind(...countParams).first()
    const total = countResult?.count || 0

    return c.json({
      success: true,
      data: {
        transactions: transactions.results || [],
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Get transactions error:', error)
    return c.json({ success: false, error: 'Failed to fetch transactions' }, 500)
  }
})

/**
 * Get withdrawal requests
 * GET /api/admin/financial/withdrawals
 */
admin.get('/financial/withdrawals', async (c) => {
  try {
    const status = c.req.query('status') || 'pending'
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '50')
    const offset = (page - 1) * limit

    let query = `
      SELECT 
        wr.*,
        u.username as producer_name,
        u.email as producer_email,
        w.balance as wallet_balance
      FROM withdrawal_requests wr
      JOIN users u ON wr.user_id = u.id
      LEFT JOIN wallets w ON w.user_id = u.id
    `
    
    const params: any[] = []
    if (status !== 'all') {
      query += ' WHERE wr.status = ?'
      params.push(status)
    }
    
    query += ' ORDER BY wr.created_at DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const withdrawals = await c.env.DB.prepare(query).bind(...params).all()

    return c.json({
      success: true,
      data: withdrawals.results || [],
    })
  } catch (error) {
    console.error('Get withdrawals error:', error)
    return c.json({ success: false, error: 'Failed to fetch withdrawals' }, 500)
  }
})

/**
 * Approve withdrawal request
 * POST /api/admin/financial/withdrawals/:id/approve
 */
admin.post('/financial/withdrawals/:id/approve', async (c) => {
  try {
    const withdrawalId = c.req.param('id')
    const { transactionId, note } = await c.req.json()

    // Get withdrawal request
    const withdrawal = await c.env.DB.prepare(
      'SELECT * FROM withdrawal_requests WHERE id = ?'
    ).bind(withdrawalId).first()

    if (!withdrawal) {
      return c.json({ success: false, error: 'Withdrawal request not found' }, 404)
    }

    if (withdrawal.status !== 'pending') {
      return c.json({ success: false, error: 'Withdrawal already processed' }, 400)
    }

    // Update withdrawal status
    await c.env.DB.prepare(
      `UPDATE withdrawal_requests 
       SET status = 'approved', 
           processed_at = datetime('now'),
           admin_note = ?,
           transaction_id = ?
       WHERE id = ?`
    ).bind(note || null, transactionId || null, withdrawalId).run()

    // Update wallet
    await c.env.DB.prepare(
      `UPDATE wallets 
       SET balance = balance - ?,
           total_withdrawn = total_withdrawn + ?,
           updated_at = datetime('now')
       WHERE user_id = ?`
    ).bind(withdrawal.amount, withdrawal.amount, withdrawal.user_id).run()

    // Send email notification
    const user = await c.env.DB.prepare(
      'SELECT username, email FROM users WHERE id = ?'
    ).bind(withdrawal.user_id).first()

    if (user) {
      const { getEmailService } = await import('../lib/email')
      const { getWithdrawalEmailTemplate } = await import('../lib/email-templates')

      const emailService = getEmailService(c.env)
      const lastFour = withdrawal.iban?.slice(-4) || '****'

      const emailTemplate = getWithdrawalEmailTemplate({
        producerName: user.username,
        amount: parseFloat(withdrawal.amount),
        bankName: withdrawal.bank_name,
        lastFourDigits: lastFour,
        locale: 'en',
      })

      await emailService.send({
        to: user.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      })
    }

    return c.json({
      success: true,
      message: 'Withdrawal approved and processed',
    })
  } catch (error) {
    console.error('Approve withdrawal error:', error)
    return c.json({ success: false, error: 'Failed to approve withdrawal' }, 500)
  }
})

/**
 * Reject withdrawal request
 * POST /api/admin/financial/withdrawals/:id/reject
 */
admin.post('/financial/withdrawals/:id/reject', async (c) => {
  try {
    const withdrawalId = c.req.param('id')
    const { reason } = await c.req.json()

    // Get withdrawal request
    const withdrawal = await c.env.DB.prepare(
      'SELECT * FROM withdrawal_requests WHERE id = ?'
    ).bind(withdrawalId).first()

    if (!withdrawal) {
      return c.json({ success: false, error: 'Withdrawal request not found' }, 404)
    }

    if (withdrawal.status !== 'pending') {
      return c.json({ success: false, error: 'Withdrawal already processed' }, 400)
    }

    // Update withdrawal status
    await c.env.DB.prepare(
      `UPDATE withdrawal_requests 
       SET status = 'rejected',
           processed_at = datetime('now'),
           admin_note = ?
       WHERE id = ?`
    ).bind(reason || 'Rejected by admin', withdrawalId).run()

    return c.json({
      success: true,
      message: 'Withdrawal request rejected',
    })
  } catch (error) {
    console.error('Reject withdrawal error:', error)
    return c.json({ success: false, error: 'Failed to reject withdrawal' }, 500)
  }
})

export default admin
