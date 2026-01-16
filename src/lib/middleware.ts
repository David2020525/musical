/**
 * Authentication Middleware for MusicHub
 * 
 * Provides middleware functions for protecting API routes
 * and enforcing role-based access control.
 */

import type { Context, Next } from 'hono'
import type { Bindings } from '../types'
import type { User } from '../types/database'
import { verifyToken, extractTokenFromHeader, AuthErrors, hasRole } from './auth'

// Extend Hono context with user
export interface AuthContext extends Context<{ Bindings: Bindings }> {
  var: {
    user: Omit<User, 'password_hash'>
  }
}

// ============================================================================
// REQUIRE AUTHENTICATION
// ============================================================================

/**
 * Middleware to require authentication
 * Verifies JWT token and loads user data
 */
export async function requireAuth(c: Context<{ Bindings: Bindings }>, next: Next) {
  const authHeader = c.req.header('Authorization')
  const token = extractTokenFromHeader(authHeader)

  if (!token) {
    return c.json({
      success: false,
      error: AuthErrors.UNAUTHORIZED,
    }, 401)
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    return c.json({
      success: false,
      error: AuthErrors.TOKEN_INVALID,
    }, 401)
  }

  // Get fresh user data
  const user = await c.env.DB.prepare(
    'SELECT * FROM users WHERE id = ?'
  ).bind(decoded.userId).first() as User | null

  if (!user) {
    return c.json({
      success: false,
      error: AuthErrors.USER_NOT_FOUND,
    }, 404)
  }

  // Remove password hash
  const { password_hash, ...userWithoutPassword } = user

  // Store user in context
  c.set('user', userWithoutPassword)

  await next()
}

// ============================================================================
// REQUIRE ROLE
// ============================================================================

/**
 * Middleware to require specific role(s)
 * Must be used after requireAuth middleware
 */
export function requireRole(allowedRoles: User['role'][]) {
  return async (c: Context<{ Bindings: Bindings }>, next: Next) => {
    const user = c.get('user') as Omit<User, 'password_hash'> | undefined

    if (!user) {
      return c.json({
        success: false,
        error: AuthErrors.UNAUTHORIZED,
      }, 401)
    }

    if (!hasRole(user.role, allowedRoles)) {
      return c.json({
        success: false,
        error: AuthErrors.FORBIDDEN,
      }, 403)
    }

    await next()
  }
}

// ============================================================================
// REQUIRE ADMIN
// ============================================================================

/**
 * Middleware to require admin role
 * Must be used after requireAuth middleware
 */
export async function requireAdmin(c: Context<{ Bindings: Bindings }>, next: Next) {
  const user = c.get('user') as Omit<User, 'password_hash'> | undefined

  if (!user) {
    return c.json({
      success: false,
      error: AuthErrors.UNAUTHORIZED,
    }, 401)
  }

  if (user.role !== 'admin') {
    return c.json({
      success: false,
      error: AuthErrors.FORBIDDEN,
    }, 403)
  }

  await next()
}

// ============================================================================
// REQUIRE PRODUCER
// ============================================================================

/**
 * Middleware to require producer status
 * Must be used after requireAuth middleware
 */
export async function requireProducer(c: Context<{ Bindings: Bindings }>, next: Next) {
  const user = c.get('user') as Omit<User, 'password_hash'> | undefined

  if (!user) {
    return c.json({
      success: false,
      error: AuthErrors.UNAUTHORIZED,
    }, 401)
  }

  if (user.is_producer !== 1) {
    return c.json({
      success: false,
      error: 'Producer status required',
    }, 403)
  }

  await next()
}

// ============================================================================
// REQUIRE EMAIL VERIFIED
// ============================================================================

/**
 * Middleware to require verified email
 * Must be used after requireAuth middleware
 */
export async function requireEmailVerified(c: Context<{ Bindings: Bindings }>, next: Next) {
  const user = c.get('user') as Omit<User, 'password_hash'> | undefined

  if (!user) {
    return c.json({
      success: false,
      error: AuthErrors.UNAUTHORIZED,
    }, 401)
  }

  if (user.email_verified !== 1) {
    return c.json({
      success: false,
      error: AuthErrors.EMAIL_NOT_VERIFIED,
    }, 403)
  }

  await next()
}

// ============================================================================
// OPTIONAL AUTH
// ============================================================================

/**
 * Middleware for optional authentication
 * Loads user if token is present, but doesn't require it
 */
export async function optionalAuth(c: Context<{ Bindings: Bindings }>, next: Next) {
  const authHeader = c.req.header('Authorization')
  const token = extractTokenFromHeader(authHeader)

  if (token) {
    const decoded = verifyToken(token)

    if (decoded) {
      // Get user data
      const user = await c.env.DB.prepare(
        'SELECT * FROM users WHERE id = ?'
      ).bind(decoded.userId).first() as User | null

      if (user) {
        const { password_hash, ...userWithoutPassword } = user
        c.set('user', userWithoutPassword)
      }
    }
  }

  await next()
}

// ============================================================================
// RATE LIMITING (Simple implementation)
// ============================================================================

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

/**
 * Simple rate limiting middleware
 * @param maxRequests - Maximum requests allowed
 * @param windowMs - Time window in milliseconds
 */
export function rateLimit(maxRequests: number = 100, windowMs: number = 60000) {
  return async (c: Context<{ Bindings: Bindings }>, next: Next) => {
    // Get client identifier (IP or user ID)
    const user = c.get('user') as Omit<User, 'password_hash'> | undefined
    const identifier = user?.id.toString() || c.req.header('cf-connecting-ip') || 'anonymous'

    const now = Date.now()
    const record = rateLimitStore.get(identifier)

    if (record) {
      if (now > record.resetAt) {
        // Reset window
        rateLimitStore.set(identifier, { count: 1, resetAt: now + windowMs })
      } else if (record.count >= maxRequests) {
        // Rate limit exceeded
        return c.json({
          success: false,
          error: 'Too many requests. Please try again later.',
        }, 429)
      } else {
        // Increment count
        record.count++
      }
    } else {
      // First request
      rateLimitStore.set(identifier, { count: 1, resetAt: now + windowMs })
    }

    await next()
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get current user from context (typed helper)
 */
export function getCurrentUser(c: Context<{ Bindings: Bindings }>): Omit<User, 'password_hash'> | undefined {
  return c.get('user') as Omit<User, 'password_hash'> | undefined
}

/**
 * Check if current user owns resource
 */
export function isResourceOwner(
  c: Context<{ Bindings: Bindings }>,
  resourceOwnerId: number
): boolean {
  const user = getCurrentUser(c)
  if (!user) return false
  return user.id === resourceOwnerId || user.role === 'admin'
}
