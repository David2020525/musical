import { SignJWT, jwtVerify } from 'jose'
import { User, Session } from '../types'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

// JWT token generation
export async function createToken(user: User): Promise<string> {
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  return token
}

// JWT token verification
export async function verifyToken(token: string): Promise<Session['user'] | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as unknown as Session['user']
  } catch {
    return null
  }
}

// Extract token from Authorization header
export function extractToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

// Password hashing utilities (for reference - actual hashing done server-side)
export async function hashPassword(password: string): Promise<string> {
  // In a real implementation, use bcryptjs or similar
  // This is a placeholder - actual implementation would use bcryptjs
  const bcrypt = await import('bcryptjs')
  return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  const bcrypt = await import('bcryptjs')
  return bcrypt.compare(password, hash)
}

// Role-based access control
export function hasRole(user: User | null, roles: string[]): boolean {
  if (!user) return false
  return roles.includes(user.role)
}

export function isAdmin(user: User | null): boolean {
  return hasRole(user, ['admin'])
}

export function isModerator(user: User | null): boolean {
  return hasRole(user, ['admin', 'moderator'])
}
