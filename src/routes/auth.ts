import { Hono } from 'hono'
import { Bindings } from '../types'
import { createToken, hashPassword, comparePassword } from '../lib/auth'
import { loginSchema, registerSchema } from '../lib/validations'

const auth = new Hono<{ Bindings: Bindings }>()

// Register endpoint
auth.post('/register', async c => {
  try {
    const body = await c.req.json()
    const validated = registerSchema.parse(body)

    // Check if user already exists
    const existing = await c.env.DB.prepare(
      'SELECT id FROM users WHERE email = ? OR username = ?'
    )
      .bind(validated.email, validated.username)
      .first()

    if (existing) {
      return c.json({ success: false, error: 'User already exists' }, 400)
    }

    // Hash password
    const passwordHash = await hashPassword(validated.password)

    // Insert user
    const result = await c.env.DB.prepare(
      'INSERT INTO users (email, username, password_hash, name, role) VALUES (?, ?, ?, ?, ?)'
    )
      .bind(validated.email, validated.username, passwordHash, validated.name, 'user')
      .run()

    // Get the created user
    const user = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?')
      .bind(result.meta.last_row_id)
      .first()

    if (!user) {
      return c.json({ success: false, error: 'Failed to create user' }, 500)
    }

    // Remove password from response
    const { password_hash, ...userWithoutPassword } = user as any

    // Create token
    const token = await createToken(userWithoutPassword)

    return c.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
    })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return c.json({ success: false, error: error.errors[0].message }, 400)
    }
    return c.json({ success: false, error: 'Registration failed' }, 500)
  }
})

// Login endpoint
auth.post('/login', async c => {
  try {
    const body = await c.req.json()
    const validated = loginSchema.parse(body)

    // Get user by email
    const user = await c.env.DB.prepare('SELECT * FROM users WHERE email = ?')
      .bind(validated.email)
      .first()

    if (!user) {
      return c.json({ success: false, error: 'Invalid credentials' }, 401)
    }

    // Verify password
    const userRecord = user as any
    const isValidPassword = await comparePassword(validated.password, userRecord.password_hash)

    if (!isValidPassword) {
      return c.json({ success: false, error: 'Invalid credentials' }, 401)
    }

    // Remove password from response
    const { password_hash, ...userWithoutPassword } = userRecord

    // Create token
    const token = await createToken(userWithoutPassword)

    return c.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
    })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return c.json({ success: false, error: error.errors[0].message }, 400)
    }
    return c.json({ success: false, error: 'Login failed' }, 500)
  }
})

// Get current user
auth.get('/me', async c => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) {
    return c.json({ success: false, error: 'Not authenticated' }, 401)
  }

  try {
    const { verifyToken } = await import('../lib/auth')
    const token = authHeader.replace('Bearer ', '')
    const decoded = await verifyToken(token)

    if (!decoded) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }

    // Get fresh user data
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

export default auth
