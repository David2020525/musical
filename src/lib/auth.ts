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

// Fast password hashing using Web Crypto API (optimized for Cloudflare Workers)
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const encoder = new TextEncoder()
  const passwordData = encoder.encode(password + Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join(''))
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', passwordData)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')
  
  return `$sha256$${saltHex}$${hashHex}`
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  // Handle both bcrypt and SHA-256 hashes
  if (hash.startsWith('$2a$') || hash.startsWith('$2b$')) {
    // Legacy bcrypt hash - use bcryptjs
    try {
      const bcrypt = await import('bcryptjs')
      return bcrypt.compare(password, hash)
    } catch {
      return false
    }
  }
  
  // SHA-256 hash
  if (!hash.startsWith('$sha256$')) return false
  
  const parts = hash.split('$')
  if (parts.length !== 4) return false
  
  const saltHex = parts[2]
  const storedHashHex = parts[3]
  
  const encoder = new TextEncoder()
  const passwordData = encoder.encode(password + saltHex)
  const hashBuffer = await crypto.subtle.digest('SHA-256', passwordData)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const computedHashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return computedHashHex === storedHashHex
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
