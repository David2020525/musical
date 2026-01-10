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

    // const db = c.env.DB

    // TODO: Tracks table doesn't have user_id column yet
    // For now, return zeros until database schema is updated
    // Future migration needed to add:
    // - ALTER TABLE tracks ADD COLUMN user_id INTEGER REFERENCES users(id)
    // - CREATE TABLE user_followers (...)
    
    return c.json({
      success: true,
      data: {
        tracks: 0,    // TODO: Count tracks WHERE user_id = decoded.id
        plays: 0,     // TODO: SUM plays_count WHERE user_id = decoded.id
        followers: 0, // TODO: Add user_followers table
        following: 0, // TODO: Add user_followers table
      }
    })
  } catch (error) {
    console.error('Get user stats error:', error)
    return c.json({ success: false, error: 'Failed to fetch stats' }, 500)
  }
})

export default users
