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

export default admin
