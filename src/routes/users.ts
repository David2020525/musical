import { Hono } from 'hono'
import { Bindings } from '../types'
import { verifyToken } from '../lib/auth'

const users = new Hono<{ Bindings: Bindings }>()

// Get current user profile
users.get('/me', async c => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Not authenticated' }, 401)
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const decoded = await verifyToken(token)

    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    const user = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?')
      .bind(decoded.id)
      .first()

    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404)
    }

    const { password_hash, ...userWithoutPassword } = user as any

    return c.json({
      success: true,
      data: userWithoutPassword,
    })
  } catch {
    return c.json({ success: false, error: 'Authentication failed' }, 401)
  }
})

// Update current user profile
users.put('/me', async c => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Not authenticated' }, 401)
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const decoded = await verifyToken(token)

    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    const body = await c.req.json()
    const { name, bio } = body

    await c.env.DB.prepare(
      'UPDATE users SET name = ?, bio = ? WHERE id = ?'
    )
      .bind(name || null, bio || null, decoded.id)
      .run()

    const user = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?')
      .bind(decoded.id)
      .first()

    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404)
    }

    const { password_hash, ...userWithoutPassword } = user as any

    return c.json({
      success: true,
      data: userWithoutPassword,
    })
  } catch (error: any) {
    return c.json({ success: false, error: 'Update failed' }, 500)
  }
})

// Get current user statistics
users.get('/me/stats', async c => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Not authenticated' }, 401)
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const decoded = await verifyToken(token)

    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    // Get track count
    const trackCount = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM tracks WHERE user_id = ?'
    ).bind(decoded.id).first<{ count: number }>()

    // Get total plays
    const totalPlays = await c.env.DB.prepare(
      'SELECT SUM(plays_count) as total FROM tracks WHERE user_id = ?'
    ).bind(decoded.id).first<{ total: number }>()

    // Get total likes
    const totalLikes = await c.env.DB.prepare(
      'SELECT SUM(likes_count) as total FROM tracks WHERE user_id = ?'
    ).bind(decoded.id).first<{ total: number }>()
    
    return c.json({
      success: true,
      data: {
        tracks: trackCount?.count || 0,
        plays: totalPlays?.total || 0,
        likes: totalLikes?.total || 0,
        followers: 0, // TODO: Implement user_followers table
        following: 0, // TODO: Implement user_followers table
      }
    })
  } catch (error) {
    console.error('Get user stats error:', error)
    return c.json({ success: false, error: 'Failed to fetch stats' }, 500)
  }
})

// Get producer earnings and wallet (producers only)
users.get('/me/earnings', async c => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Not authenticated' }, 401)
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const decoded = await verifyToken(token)

    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    // Check if user is a producer
    const user = await c.env.DB.prepare(
      'SELECT is_producer FROM users WHERE id = ?'
    ).bind(decoded.id).first<{ is_producer: number }>()

    if (!user || user.is_producer !== 1) {
      return c.json({ success: false, error: 'Producer access required' }, 403)
    }

    // Get or create wallet
    let wallet = await c.env.DB.prepare(
      'SELECT * FROM wallets WHERE user_id = ?'
    ).bind(decoded.id).first<any>()

    if (!wallet) {
      // Create wallet if doesn't exist
      await c.env.DB.prepare(
        'INSERT INTO wallets (user_id, balance, total_earned, total_withdrawn) VALUES (?, 0, 0, 0)'
      ).bind(decoded.id).run()

      wallet = await c.env.DB.prepare(
        'SELECT * FROM wallets WHERE user_id = ?'
      ).bind(decoded.id).first<any>()
    }

    // Get total sales count
    const salesCount = await c.env.DB.prepare(
      `SELECT COUNT(*) as count FROM purchases p
       JOIN tracks t ON p.track_id = t.id
       WHERE t.user_id = ? AND p.payment_status = 'completed'`
    ).bind(decoded.id).first<{ count: number }>()

    // Get recent sales (last 10)
    const recentSales = await c.env.DB.prepare(
      `SELECT 
        p.id, p.price, p.created_at,
        t.title as track_title,
        u.name as buyer_name
       FROM purchases p
       JOIN tracks t ON p.track_id = t.id
       LEFT JOIN users u ON p.user_id = u.id
       WHERE t.user_id = ?
       ORDER BY p.created_at DESC
       LIMIT 10`
    ).bind(decoded.id).all()

    return c.json({
      success: true,
      data: {
        wallet: {
          balance: parseFloat(wallet.balance || 0),
          total_earned: parseFloat(wallet.total_earned || 0),
          total_withdrawn: parseFloat(wallet.total_withdrawn || 0),
          currency: wallet.currency || 'USD',
        },
        sales: {
          total_count: salesCount?.count || 0,
          recent: recentSales.results,
        }
      }
    })
  } catch (error) {
    console.error('Get earnings error:', error)
    return c.json({ success: false, error: 'Failed to fetch earnings' }, 500)
  }
})

// Get user's tracks (for producers)
users.get('/me/tracks', async c => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Not authenticated' }, 401)
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const decoded = await verifyToken(token)

    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const offset = (page - 1) * limit

    // Get tracks
    const tracks = await c.env.DB.prepare(
      `SELECT * FROM tracks 
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`
    ).bind(decoded.id, limit, offset).all()

    // Get total count
    const countResult = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM tracks WHERE user_id = ?'
    ).bind(decoded.id).first<{ count: number }>()

    return c.json({
      success: true,
      data: tracks.results,
      pagination: {
        page,
        limit,
        total: countResult?.count || 0,
        totalPages: Math.ceil((countResult?.count || 0) / limit),
      }
    })
  } catch (error) {
    console.error('Get user tracks error:', error)
    return c.json({ success: false, error: 'Failed to fetch tracks' }, 500)
  }
})

// Get user's purchases (for listeners)
users.get('/me/purchases', async c => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Not authenticated' }, 401)
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const decoded = await verifyToken(token)

    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const offset = (page - 1) * limit

    // Get purchases with track details
    const purchases = await c.env.DB.prepare(
      `SELECT 
        p.id, p.price, p.payment_status, p.created_at,
        t.id as track_id, t.title, t.artist, t.cover_url, t.audio_url
       FROM purchases p
       JOIN tracks t ON p.track_id = t.id
       WHERE p.user_id = ?
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`
    ).bind(decoded.id, limit, offset).all()

    // Get total count
    const countResult = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM purchases WHERE user_id = ?'
    ).bind(decoded.id).first<{ count: number }>()

    return c.json({
      success: true,
      data: purchases.results,
      pagination: {
        page,
        limit,
        total: countResult?.count || 0,
        totalPages: Math.ceil((countResult?.count || 0) / limit),
      }
    })
  } catch (error) {
    console.error('Get purchases error:', error)
    return c.json({ success: false, error: 'Failed to fetch purchases' }, 500)
  }
})

// Request withdrawal (producers only)
users.post('/me/withdrawals', async c => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Not authenticated' }, 401)
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const decoded = await verifyToken(token)

    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    // Check if user is a producer
    const user = await c.env.DB.prepare(
      'SELECT is_producer FROM users WHERE id = ?'
    ).bind(decoded.id).first<{ is_producer: number }>()

    if (!user || user.is_producer !== 1) {
      return c.json({ success: false, error: 'Producer access required' }, 403)
    }

    const body = await c.req.json()
    const { amount, payment_method, payment_details } = body

    if (!amount || amount <= 0) {
      return c.json({ success: false, error: 'Invalid amount' }, 400)
    }

    // Get wallet
    const wallet = await c.env.DB.prepare(
      'SELECT balance FROM wallets WHERE user_id = ?'
    ).bind(decoded.id).first<{ balance: string }>()

    if (!wallet) {
      return c.json({ success: false, error: 'Wallet not found' }, 404)
    }

    const balance = parseFloat(wallet.balance)

    if (balance < amount) {
      return c.json({ success: false, error: 'Insufficient balance' }, 400)
    }

    // Create withdrawal request
    const result = await c.env.DB.prepare(
      `INSERT INTO withdrawals (user_id, amount, payment_method, payment_details, status)
       VALUES (?, ?, ?, ?, 'pending')`
    ).bind(
      decoded.id,
      amount,
      payment_method || null,
      payment_details || null
    ).run()

    return c.json({
      success: true,
      message: 'Withdrawal request submitted successfully',
      data: {
        id: result.meta.last_row_id,
        amount,
        status: 'pending',
      }
    }, 201)
  } catch (error) {
    console.error('Create withdrawal error:', error)
    return c.json({ success: false, error: 'Failed to create withdrawal request' }, 500)
  }
})

// Get withdrawal requests
users.get('/me/withdrawals', async c => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Not authenticated' }, 401)
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const decoded = await verifyToken(token)

    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    // Check if user is a producer
    const user = await c.env.DB.prepare(
      'SELECT is_producer FROM users WHERE id = ?'
    ).bind(decoded.id).first<{ is_producer: number }>()

    if (!user || user.is_producer !== 1) {
      return c.json({ success: false, error: 'Producer access required' }, 403)
    }

    const withdrawals = await c.env.DB.prepare(
      `SELECT 
        id, amount, status, payment_method, payment_details,
        requested_at, processed_at, admin_notes
       FROM withdrawals
       WHERE user_id = ?
       ORDER BY requested_at DESC`
    ).bind(decoded.id).all()

    return c.json({
      success: true,
      data: withdrawals.results,
    })
  } catch (error) {
    console.error('Get withdrawals error:', error)
    return c.json({ success: false, error: 'Failed to fetch withdrawals' }, 500)
  }
})

export default users
