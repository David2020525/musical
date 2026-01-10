import { Hono } from 'hono'
import { Bindings } from '../types'
import { createToken, hashPassword, comparePassword } from '../lib/auth'
import { loginSchema, registerSchema } from '../lib/validations'
import { getEmailService, getVerificationEmailTemplate } from '../lib/email'
import { createEmailVerificationToken, verifyEmailToken, getVerificationStatus } from '../lib/email-verification'

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

    // Create email verification token
    const { token: verificationToken } = await createEmailVerificationToken(
      c.env.DB,
      userWithoutPassword.id
    )

    // Send verification email
    const emailService = getEmailService(c.env)
    const verificationLink = `${c.req.url.split('/api')[0]}/en/verify-email?token=${verificationToken}`
    
    const emailTemplate = getVerificationEmailTemplate({
      userName: userWithoutPassword.name,
      verificationLink,
      locale: 'en', // TODO: Get from request
    })

    await emailService.send({
      to: userWithoutPassword.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    })

    // Create auth token
    const token = await createToken(userWithoutPassword)

    return c.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
        message: 'Please check your email to verify your account',
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

// Verify email endpoint
auth.post('/verify-email', async c => {
  try {
    const body = await c.req.json()
    const { token } = body

    if (!token) {
      return c.json({ success: false, error: 'Token is required' }, 400)
    }

    const result = await verifyEmailToken(c.env.DB, token)

    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }

    return c.json({
      success: true,
      message: 'Email verified successfully',
    })
  } catch (error: any) {
    return c.json({ success: false, error: 'Email verification failed' }, 500)
  }
})

// Resend verification email endpoint
auth.post('/resend-verification', async c => {
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

    // Get user
    const user = await c.env.DB.prepare('SELECT * FROM users WHERE id = ?')
      .bind(decoded.id)
      .first() as any

    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404)
    }

    // Check if already verified
    if (user.email_verified === 1) {
      return c.json({ success: false, error: 'Email already verified' }, 400)
    }

    // Check verification status
    const status = await getVerificationStatus(c.env.DB, user.id)
    
    // Rate limiting: Don't allow resend if token was created less than 1 minute ago
    if (status.hasPendingToken && status.tokenCreatedAt) {
      const tokenAge = Date.now() - new Date(status.tokenCreatedAt).getTime()
      if (tokenAge < 60 * 1000) { // 1 minute
        return c.json({ 
          success: false, 
          error: 'Please wait before requesting another verification email' 
        }, 429)
      }
    }

    // Create new verification token
    const { token: verificationToken } = await createEmailVerificationToken(
      c.env.DB,
      user.id
    )

    // Send verification email
    const emailService = getEmailService(c.env)
    const verificationLink = `${c.req.url.split('/api')[0]}/en/verify-email?token=${verificationToken}`
    
    const emailTemplate = getVerificationEmailTemplate({
      userName: user.name,
      verificationLink,
      locale: 'en', // TODO: Get from request
    })

    const emailResult = await emailService.send({
      to: user.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    })

    if (!emailResult.success) {
      return c.json({ success: false, error: 'Failed to send email' }, 500)
    }

    return c.json({
      success: true,
      message: 'Verification email sent successfully',
    })
  } catch (error: any) {
    return c.json({ success: false, error: 'Failed to resend verification email' }, 500)
  }
})

// Get verification status endpoint
auth.get('/verification-status', async c => {
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

    const status = await getVerificationStatus(c.env.DB, decoded.id)

    return c.json({
      success: true,
      data: status,
    })
  } catch (error: any) {
    return c.json({ success: false, error: 'Failed to get verification status' }, 500)
  }
})

export default auth
