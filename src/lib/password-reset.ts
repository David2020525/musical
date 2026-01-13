/**
 * Password Reset Helper Functions
 */

import { D1Database } from '@cloudflare/workers-types'

/**
 * Generate a random reset token
 */
function generateToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Create password reset token
 */
export async function createResetToken(
  db: D1Database,
  userId: number
): Promise<string> {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
  
  await db.prepare(`
    INSERT INTO password_reset_tokens (user_id, token, expires_at)
    VALUES (?, ?, ?)
  `).bind(userId, token, expiresAt.toISOString()).run()
  
  return token
}

/**
 * Verify reset token
 */
export async function verifyResetToken(
  db: D1Database,
  token: string
): Promise<{ valid: boolean; error?: string; userId?: number }> {
  // Get token from database
  const tokenRecord = await db.prepare(`
    SELECT * FROM password_reset_tokens
    WHERE token = ? AND used = 0
  `).bind(token).first() as any
  
  if (!tokenRecord) {
    return { valid: false, error: 'Invalid or expired reset token' }
  }
  
  // Check if token is expired
  const now = new Date()
  const expiresAt = new Date(tokenRecord.expires_at)
  
  if (now > expiresAt) {
    return { valid: false, error: 'Reset token has expired' }
  }
  
  return { valid: true, userId: tokenRecord.user_id }
}

/**
 * Mark reset token as used
 */
export async function markTokenAsUsed(
  db: D1Database,
  token: string
): Promise<void> {
  await db.prepare(`
    UPDATE password_reset_tokens
    SET used = 1
    WHERE token = ?
  `).bind(token).run()
}

/**
 * Delete old/expired reset tokens
 */
export async function cleanupExpiredTokens(db: D1Database): Promise<number> {
  const result = await db.prepare(`
    DELETE FROM password_reset_tokens
    WHERE expires_at < CURRENT_TIMESTAMP
  `).run()
  
  return result.meta.changes || 0
}

/**
 * Check if user has recent reset request (rate limiting)
 */
export async function hasRecentResetRequest(
  db: D1Database,
  userId: number,
  minutesAgo: number = 5
): Promise<boolean> {
  const since = new Date(Date.now() - minutesAgo * 60 * 1000)
  
  const token = await db.prepare(`
    SELECT id FROM password_reset_tokens
    WHERE user_id = ? AND created_at > ?
    LIMIT 1
  `).bind(userId, since.toISOString()).first()
  
  return !!token
}
