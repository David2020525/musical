/**
 * Authentication Utilities for MusicHub
 * 
 * Provides password hashing, JWT token generation/validation,
 * and helper functions for user authentication.
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { User } from '../types/database';

// ============================================================================
// CONFIGURATION
// ============================================================================

const JWT_SECRET = process.env.JWT_SECRET || 'musichub-dev-secret-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const BCRYPT_SALT_ROUNDS = 10;

// ============================================================================
// PASSWORD HASHING
// ============================================================================

/**
 * Hash a plain text password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

/**
 * Compare a plain text password with a hashed password
 * @param password - Plain text password
 * @param hashedPassword - Hashed password from database
 * @returns True if passwords match
 */
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// ============================================================================
// JWT TOKEN MANAGEMENT
// ============================================================================

export interface JWTPayload {
  userId: number;
  email: string;
  username: string;
  role: 'user' | 'moderator' | 'admin';
  isProducer: boolean;
  iat?: number;
  exp?: number;
}

/**
 * Generate a JWT token for a user
 * @param user - User object from database
 * @returns JWT token string
 */
export function generateToken(user: User): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    isProducer: user.is_producer === 1,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Verify and decode a JWT token
 * @param token - JWT token string
 * @returns Decoded payload or null if invalid
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Extract JWT token from Authorization header
 * @param authHeader - Authorization header value
 * @returns Token string or null
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7); // Remove 'Bearer ' prefix
}

// ============================================================================
// VERIFICATION TOKENS
// ============================================================================

/**
 * Generate a random verification token
 * @param length - Token length (default: 32)
 * @returns Random hex string
 */
export function generateVerificationToken(length: number = 32): string {
  const chars = '0123456789abcdef';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

/**
 * Calculate token expiration timestamp
 * @param hours - Hours until expiration
 * @returns ISO datetime string
 */
export function getTokenExpiration(hours: number = 24): string {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + hours);
  return expiration.toISOString();
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate username format (3-20 chars, alphanumeric + underscore)
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

/**
 * Validate password strength (min 6 chars)
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

/**
 * Sanitize user object (remove sensitive data)
 */
export function sanitizeUser(user: User): Omit<User, 'password_hash'> {
  const { password_hash, ...sanitized } = user;
  return sanitized;
}

// ============================================================================
// SESSION HELPERS
// ============================================================================

/**
 * Generate session token
 */
export function generateSessionToken(): string {
  return generateVerificationToken(64);
}

/**
 * Get session expiration (7 days)
 */
export function getSessionExpiration(): string {
  return getTokenExpiration(24 * 7); // 7 days
}

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const AuthErrors = {
  INVALID_EMAIL: 'Invalid email format',
  INVALID_USERNAME: 'Username must be 3-20 characters (letters, numbers, underscore only)',
  INVALID_PASSWORD: 'Password must be at least 6 characters',
  EMAIL_EXISTS: 'Email already registered',
  USERNAME_EXISTS: 'Username already taken',
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_NOT_VERIFIED: 'Please verify your email before logging in',
  TOKEN_EXPIRED: 'Verification token has expired',
  TOKEN_INVALID: 'Invalid verification token',
  UNAUTHORIZED: 'Authentication required',
  FORBIDDEN: 'Insufficient permissions',
  USER_NOT_FOUND: 'User not found',
  SESSION_EXPIRED: 'Session has expired',
};

// ============================================================================
// ROLE CHECKS
// ============================================================================

/**
 * Check if user has required role
 */
export function hasRole(
  userRole: User['role'],
  requiredRoles: User['role'][]
): boolean {
  return requiredRoles.includes(userRole);
}

/**
 * Check if user is admin
 */
export function isAdmin(userRole: User['role']): boolean {
  return userRole === 'admin';
}

/**
 * Check if user is producer
 */
export function isProducer(user: User): boolean {
  return user.is_producer === 1;
}

/**
 * Check if user can edit resource
 */
export function canEdit(userId: number, resourceOwnerId: number, userRole: User['role']): boolean {
  return userId === resourceOwnerId || userRole === 'admin';
}
