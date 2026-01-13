/**
 * Email Verification Helper Functions
 */

import { D1Database } from '@cloudflare/workers-types'

/**
 * Generate a random verification token
 */
function generateToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Create email verification token
 */
export async function createEmailVerificationToken(
  db: D1Database,
  userId: number
): Promise<{ token: string; expiresAt: string }> {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  
  await db.prepare(`
    INSERT INTO email_verification_tokens (user_id, token, expires_at)
    VALUES (?, ?, ?)
  `).bind(userId, token, expiresAt.toISOString()).run()
  
  return { token, expiresAt: expiresAt.toISOString() }
}

/**
 * Verify email token and mark user as verified
 */
export async function verifyEmailToken(
  db: D1Database,
  token: string
): Promise<{ success: boolean; error?: string; userId?: number }> {
  // Get token from database
  const tokenRecord = await db.prepare(`
    SELECT * FROM email_verification_tokens
    WHERE token = ? AND verified = 0
  `).bind(token).first() as any
  
  if (!tokenRecord) {
    return { success: false, error: 'Invalid or expired verification token' }
  }
  
  // Check if token is expired
  const now = new Date()
  const expiresAt = new Date(tokenRecord.expires_at)
  
  if (now > expiresAt) {
    return { success: false, error: 'Verification token has expired' }
  }
  
  // Mark token as verified
  await db.prepare(`
    UPDATE email_verification_tokens
    SET verified = 1
    WHERE token = ?
  `).bind(token).run()
  
  // Mark user email as verified
  await db.prepare(`
    UPDATE users
    SET email_verified = 1, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(tokenRecord.user_id).run()
  
  return { success: true, userId: tokenRecord.user_id }
}

/**
 * Get verification status for a user
 */
export async function getVerificationStatus(
  db: D1Database,
  userId: number
): Promise<{
  isVerified: boolean
  hasPendingToken: boolean
  tokenCreatedAt?: string
}> {
  // Check if user email is verified
  const user = await db.prepare(`
    SELECT email_verified FROM users WHERE id = ?
  `).bind(userId).first() as any
  
  if (!user) {
    return { isVerified: false, hasPendingToken: false }
  }
  
  if (user.email_verified === 1) {
    return { isVerified: true, hasPendingToken: false }
  }
  
  // Check for pending tokens
  const token = await db.prepare(`
    SELECT created_at FROM email_verification_tokens
    WHERE user_id = ? AND verified = 0
    ORDER BY created_at DESC
    LIMIT 1
  `).bind(userId).first() as any
  
  if (token) {
    return {
      isVerified: false,
      hasPendingToken: true,
      tokenCreatedAt: token.created_at
    }
  }
  
  return { isVerified: false, hasPendingToken: false }
}

/**
 * Delete old/expired verification tokens
 */
export async function cleanupExpiredTokens(db: D1Database): Promise<number> {
  const result = await db.prepare(`
    DELETE FROM email_verification_tokens
    WHERE expires_at < CURRENT_TIMESTAMP
  `).run()
  
  return result.meta.changes || 0
}
