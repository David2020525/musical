import { Hono } from 'hono'
import type { Bindings } from '../types'
import type { User } from '../types/database'
import {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  extractTokenFromHeader,
  generateVerificationToken,
  getTokenExpiration,
  isValidEmail,
  isValidUsername,
  isValidPassword,
  sanitizeUser,
  AuthErrors,
} from '../lib/auth'

const auth = new Hono<{ Bindings: Bindings }>()

// ============================================================================
// REGISTER
// ============================================================================

auth.post('/register', async (c) => {
  try {
    const body = await c.req.json()
    const { email, username, password, name, is_producer } = body

    // Validation
    if (!email || !username || !password || !name) {
      return c.json({ 
        success: false, 
        error: 'Email, username, password, and name are required' 
      }, 400)
    }

    if (!isValidEmail(email)) {
      return c.json({ success: false, error: AuthErrors.INVALID_EMAIL }, 400)
    }

    if (!isValidUsername(username)) {
      return c.json({ success: false, error: AuthErrors.INVALID_USERNAME }, 400)
    }

    if (!isValidPassword(password)) {
      return c.json({ success: false, error: AuthErrors.INVALID_PASSWORD }, 400)
    }

    // Check if user already exists
    const existing = await c.env.DB.prepare(
      'SELECT id FROM users WHERE email = ? OR username = ?'
    ).bind(email, username).first()

    if (existing) {
      return c.json({ 
        success: false, 
        error: 'Email or username already exists' 
      }, 400)
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Insert user
    const result = await c.env.DB.prepare(`
      INSERT INTO users (
        email, username, password_hash, name, role, is_producer, email_verified
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      email,
      username,
      passwordHash,
      name,
      'user',
      is_producer ? 1 : 0,
      0 // Not verified yet
    ).run()

    // Get the created user
    const user = await c.env.DB.prepare(
      'SELECT * FROM users WHERE id = ?'
    ).bind(result.meta.last_row_id).first() as User | null

    if (!user) {
      return c.json({ 
        success: false, 
        error: 'Failed to create user' 
      }, 500)
    }

    // Create email verification token
    const verificationToken = generateVerificationToken()
    const tokenExpiration = getTokenExpiration(24) // 24 hours

    await c.env.DB.prepare(`
      INSERT INTO email_verification_tokens (user_id, token, expires_at)
      VALUES (?, ?, ?)
    `).bind(user.id, verificationToken, tokenExpiration).run()

    // Generate JWT token
    const token = generateToken(user)

    // Return sanitized user (without password)
    const userWithoutPassword = sanitizeUser(user)

    return c.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
        verificationToken, // For dev/testing (remove in production)
      },
      message: 'Registration successful. Please verify your email.',
    }, 201)

  } catch (error: any) {
    console.error('Register error:', error)
    return c.json({ 
      success: false, 
      error: 'Registration failed' 
    }, 500)
  }
})

// ============================================================================
// LOGIN
// ============================================================================

auth.post('/login', async (c) => {
  try {
    const body = await c.req.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return c.json({ 
        success: false, 
        error: 'Email and password are required' 
      }, 400)
    }

    // Get user by email
    const user = await c.env.DB.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email).first() as User | null

    if (!user) {
      return c.json({ 
        success: false, 
        error: AuthErrors.INVALID_CREDENTIALS 
      }, 401)
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password_hash)

    if (!isValidPassword) {
      return c.json({ 
        success: false, 
        error: AuthErrors.INVALID_CREDENTIALS 
      }, 401)
    }

    // Note: We allow login even if email is not verified
    // Frontend can check email_verified and show a banner

    // Generate JWT token
    const token = generateToken(user)

    // Create session in database
    const sessionToken = generateVerificationToken(64)
    const sessionExpiration = getTokenExpiration(24 * 7) // 7 days

    await c.env.DB.prepare(`
      INSERT INTO sessions (user_id, token, expires_at)
      VALUES (?, ?, ?)
    `).bind(user.id, sessionToken, sessionExpiration).run()

    // Return sanitized user
    const userWithoutPassword = sanitizeUser(user)

    return c.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
    })

  } catch (error: any) {
    console.error('Login error:', error)
    return c.json({ 
      success: false, 
      error: 'Login failed' 
    }, 500)
  }
})

// ============================================================================
// GET CURRENT USER
// ============================================================================

auth.get('/me', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token) {
      return c.json({ 
        success: false, 
        error: AuthErrors.UNAUTHORIZED 
      }, 401)
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return c.json({ 
        success: false, 
        error: AuthErrors.TOKEN_INVALID 
      }, 401)
    }

    // Get fresh user data
    const user = await c.env.DB.prepare(
      'SELECT * FROM users WHERE id = ?'
    ).bind(decoded.userId).first() as User | null

    if (!user) {
      return c.json({ 
        success: false, 
        error: AuthErrors.USER_NOT_FOUND 
      }, 404)
    }

    const userWithoutPassword = sanitizeUser(user)

    return c.json({
      success: true,
      data: userWithoutPassword,
    })

  } catch (error: any) {
    console.error('Get me error:', error)
    return c.json({ 
      success: false, 
      error: AuthErrors.UNAUTHORIZED 
    }, 401)
  }
})

// ============================================================================
// VERIFY EMAIL
// ============================================================================

auth.post('/verify-email', async (c) => {
  try {
    const body = await c.req.json()
    const { token } = body

    if (!token) {
      return c.json({ 
        success: false, 
        error: 'Token is required' 
      }, 400)
    }

    // Find verification token
    const tokenRecord = await c.env.DB.prepare(`
      SELECT * FROM email_verification_tokens 
      WHERE token = ? AND verified = 0
    `).bind(token).first()

    if (!tokenRecord) {
      return c.json({ 
        success: false, 
        error: AuthErrors.TOKEN_INVALID 
      }, 400)
    }

    // Check if token is expired
    const expiresAt = new Date(tokenRecord.expires_at as string)
    if (expiresAt < new Date()) {
      return c.json({ 
        success: false, 
        error: AuthErrors.TOKEN_EXPIRED 
      }, 400)
    }

    // Mark user as verified
    await c.env.DB.prepare(`
      UPDATE users SET email_verified = 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(tokenRecord.user_id).run()

    // Mark token as used
    await c.env.DB.prepare(`
      UPDATE email_verification_tokens SET verified = 1
      WHERE id = ?
    `).bind(tokenRecord.id).run()

    return c.json({
      success: true,
      message: 'Email verified successfully',
    })

  } catch (error: any) {
    console.error('Verify email error:', error)
    return c.json({ 
      success: false, 
      error: 'Email verification failed' 
    }, 500)
  }
})

// ============================================================================
// LOGOUT
// ============================================================================

auth.post('/logout', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token) {
      return c.json({ 
        success: false, 
        error: AuthErrors.UNAUTHORIZED 
      }, 401)
    }

    const decoded = verifyToken(token)

    if (decoded) {
      // Delete user's sessions
      await c.env.DB.prepare(`
        DELETE FROM sessions WHERE user_id = ?
      `).bind(decoded.userId).run()
    }

    return c.json({
      success: true,
      message: 'Logged out successfully',
    })

  } catch (error: any) {
    console.error('Logout error:', error)
    return c.json({ 
      success: false, 
      error: 'Logout failed' 
    }, 500)
  }
})

// ============================================================================
// FORGOT PASSWORD
// ============================================================================

auth.post('/forgot-password', async (c) => {
  try {
    const body = await c.req.json()
    const { email } = body

    if (!email) {
      return c.json({ 
        success: false, 
        error: 'Email is required' 
      }, 400)
    }

    // Get user by email
    const user = await c.env.DB.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email).first() as User | null

    // Always return success (don't reveal if user exists for security)
    if (user) {
      // Create reset token
      const resetToken = generateVerificationToken()
      const tokenExpiration = getTokenExpiration(1) // 1 hour

      await c.env.DB.prepare(`
        INSERT INTO password_reset_tokens (user_id, token, expires_at)
        VALUES (?, ?, ?)
      `).bind(user.id, resetToken, tokenExpiration).run()

      // TODO: Send email with reset link
      // For now, we'll return the token (remove in production)
      console.log(`Password reset token for ${email}: ${resetToken}`)
    }

    return c.json({
      success: true,
      message: 'If an account exists, a password reset link has been sent',
    })

  } catch (error: any) {
    console.error('Forgot password error:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to process request' 
    }, 500)
  }
})

// ============================================================================
// RESET PASSWORD
// ============================================================================

auth.post('/reset-password', async (c) => {
  try {
    const body = await c.req.json()
    const { token, password } = body

    if (!token || !password) {
      return c.json({ 
        success: false, 
        error: 'Token and password are required' 
      }, 400)
    }

    if (!isValidPassword(password)) {
      return c.json({ 
        success: false, 
        error: AuthErrors.INVALID_PASSWORD 
      }, 400)
    }

    // Find reset token
    const tokenRecord = await c.env.DB.prepare(`
      SELECT * FROM password_reset_tokens 
      WHERE token = ? AND used = 0
    `).bind(token).first()

    if (!tokenRecord) {
      return c.json({ 
        success: false, 
        error: AuthErrors.TOKEN_INVALID 
      }, 400)
    }

    // Check if token is expired
    const expiresAt = new Date(tokenRecord.expires_at as string)
    if (expiresAt < new Date()) {
      return c.json({ 
        success: false, 
        error: AuthErrors.TOKEN_EXPIRED 
      }, 400)
    }

    // Hash new password
    const passwordHash = await hashPassword(password)

    // Update user password
    await c.env.DB.prepare(`
      UPDATE users 
      SET password_hash = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(passwordHash, tokenRecord.user_id).run()

    // Mark token as used
    await c.env.DB.prepare(`
      UPDATE password_reset_tokens SET used = 1
      WHERE id = ?
    `).bind(tokenRecord.id).run()

    return c.json({
      success: true,
      message: 'Password reset successfully',
    })

  } catch (error: any) {
    console.error('Reset password error:', error)
    return c.json({ 
      success: false, 
      error: 'Failed to reset password' 
    }, 500)
  }
})

export default auth
