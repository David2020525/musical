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

export default users
