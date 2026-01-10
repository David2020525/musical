import { Bindings } from '../types'

/**
 * Generate a random verification token
 */
export function generateVerificationToken(): string {
  // Generate a secure random token (32 characters)
  const array = new Uint8Array(24)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Create email verification token in database
 */
export async function createEmailVerificationToken(
  db: D1Database,
  userId: number
): Promise<{ token: string; expiresAt: Date }> {
  const token = generateVerificationToken()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now

  await db.prepare(`
    INSERT INTO email_verification_tokens (user_id, token, expires_at)
    VALUES (?, ?, ?)
  `).bind(userId, token, expiresAt.toISOString()).run()

  return { token, expiresAt }
}

/**
 * Verify email with token
 */
export async function verifyEmailToken(
  db: D1Database,
  token: string
): Promise<{ success: boolean; userId?: number; error?: string }> {
  // Find token
  const tokenRecord = await db.prepare(`
    SELECT * FROM email_verification_tokens 
    WHERE token = ? AND verified = 0
  `).bind(token).first() as any

  if (!tokenRecord) {
    return { success: false, error: 'Invalid or expired verification token' }
  }

  // Check if expired
  const expiresAt = new Date(tokenRecord.expires_at)
  if (expiresAt < new Date()) {
    return { success: false, error: 'Verification token has expired' }
  }

  // Mark token as verified
  await db.prepare(`
    UPDATE email_verification_tokens 
    SET verified = 1 
    WHERE id = ?
  `).bind(tokenRecord.id).run()

  // Mark user email as verified
  await db.prepare(`
    UPDATE users 
    SET email_verified = 1 
    WHERE id = ?
  `).bind(tokenRecord.user_id).run()

  return { success: true, userId: tokenRecord.user_id }
}

/**
 * Check if user has verified email
 */
export async function isEmailVerified(db: D1Database, userId: number): Promise<boolean> {
  const user = await db.prepare(`
    SELECT email_verified FROM users WHERE id = ?
  `).bind(userId).first() as any

  return user?.email_verified === 1
}

/**
 * Get verification status for user
 */
export async function getVerificationStatus(
  db: D1Database,
  userId: number
): Promise<{
  isVerified: boolean
  hasPendingToken: boolean
  tokenCreatedAt?: string
}> {
  const user = await db.prepare(`
    SELECT email_verified FROM users WHERE id = ?
  `).bind(userId).first() as any

  const isVerified = user?.email_verified === 1

  if (isVerified) {
    return { isVerified: true, hasPendingToken: false }
  }

  // Check for pending token
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
      tokenCreatedAt: token.created_at,
    }
  }

  return { isVerified: false, hasPendingToken: false }
}
