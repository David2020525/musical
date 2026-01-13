/**
 * Security Middleware and Utilities
 */

import { Context, Next } from 'hono';

/**
 * Simple in-memory rate limiter
 * For production, use a distributed solution like Redis or Cloudflare Rate Limiting API
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];

    // Clean up old requests
    const validRequests = requests.filter(time => now - time < this.windowMs);

    if (validRequests.length >= this.maxRequests) {
      return true;
    }

    // Add current request
    validRequests.push(now);
    this.requests.set(identifier, validRequests);

    // Cleanup old identifiers periodically
    if (Math.random() < 0.01) {
      this.cleanup();
    }

    return false;
  }

  private cleanup() {
    const now = Date.now();
    for (const [identifier, requests] of this.requests.entries()) {
      const validRequests = requests.filter(time => now - time < this.windowMs);
      if (validRequests.length === 0) {
        this.requests.delete(identifier);
      } else {
        this.requests.set(identifier, validRequests);
      }
    }
  }
}

// Global rate limiter instances
const apiLimiter = new RateLimiter(60000, 100); // 100 requests per minute
const uploadLimiter = new RateLimiter(3600000, 10); // 10 uploads per hour
const authLimiter = new RateLimiter(900000, 5); // 5 auth attempts per 15 minutes

/**
 * Rate limiting middleware
 */
export function rateLimitMiddleware(type: 'api' | 'upload' | 'auth' = 'api') {
  return async (c: Context, next: Next) => {
    const limiter = type === 'upload' ? uploadLimiter : type === 'auth' ? authLimiter : apiLimiter;
    
    // Use IP address as identifier
    const ip = c.req.header('CF-Connecting-IP') || 
               c.req.header('X-Forwarded-For')?.split(',')[0] ||
               'unknown';

    if (limiter.isRateLimited(ip)) {
      return c.json({
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
      }, 429);
    }

    await next();
  };
}

/**
 * CORS headers middleware
 */
export function corsHeaders() {
  return async (c: Context, next: Next) => {
    // Set security headers
    c.header('X-Content-Type-Options', 'nosniff');
    c.header('X-Frame-Options', 'DENY');
    c.header('X-XSS-Protection', '1; mode=block');
    c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // CSP header
    c.header(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; img-src 'self' data: https: blob:; font-src 'self' https://cdn.jsdelivr.net; connect-src 'self'"
    );

    await next();
  };
}

/**
 * Input sanitization utilities
 */

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitize string for SQL (although we use parameterized queries)
 */
export function sanitizeSql(input: string): string {
  return input.replace(/['";\\]/g, '');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate Turkish ID number (TC Kimlik No)
 */
export function isValidTurkishId(id: string): boolean {
  if (id.length !== 11) return false;
  if (!/^\d+$/.test(id)) return false;
  if (id[0] === '0') return false;

  const digits = id.split('').map(Number);
  
  // Check 10th digit
  const sum1 = (digits[0] + digits[2] + digits[4] + digits[6] + digits[8]) * 7;
  const sum2 = digits[1] + digits[3] + digits[5] + digits[7];
  const digit10 = (sum1 - sum2) % 10;
  if (digit10 !== digits[9]) return false;

  // Check 11th digit
  const sum3 = digits.slice(0, 10).reduce((a, b) => a + b, 0);
  const digit11 = sum3 % 10;
  if (digit11 !== digits[10]) return false;

  return true;
}

/**
 * Validate IBAN format (basic check)
 */
export function isValidIban(iban: string): boolean {
  // Remove spaces and convert to uppercase
  const cleanIban = iban.replace(/\s/g, '').toUpperCase();
  
  // Check length (TR IBAN is 26 characters)
  if (cleanIban.startsWith('TR') && cleanIban.length !== 26) {
    return false;
  }
  
  // Check format (starts with country code and check digits)
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(cleanIban)) {
    return false;
  }

  return true;
}

/**
 * Generate CSRF token
 */
export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify CSRF token
 */
export function verifyCsrfToken(token: string, sessionToken: string): boolean {
  return token === sessionToken;
}

/**
 * Password strength validator
 */
export function isStrongPassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate file upload
 */
export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFileType(filename: string, allowedExtensions: string[]): FileValidationResult {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  if (!ext || !allowedExtensions.includes(ext)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${allowedExtensions.join(', ')}`,
    };
  }

  return { valid: true };
}

export function validateFileSize(size: number, maxSizeBytes: number): FileValidationResult {
  if (size > maxSizeBytes) {
    const maxSizeMB = (maxSizeBytes / (1024 * 1024)).toFixed(0);
    return {
      valid: false,
      error: `File too large. Maximum size: ${maxSizeMB}MB`,
    };
  }

  return { valid: true };
}

/**
 * Escape regex special characters
 */
export function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Generate random string
 */
export function generateRandomString(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }
  
  return result;
}

/**
 * Hash data for integrity check
 */
export async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify data integrity
 */
export async function verifyDataIntegrity(data: string, hash: string): Promise<boolean> {
  const computedHash = await hashData(data);
  return computedHash === hash;
}

export default {
  rateLimitMiddleware,
  corsHeaders,
  sanitizeHtml,
  sanitizeSql,
  isValidEmail,
  isValidUrl,
  isValidTurkishId,
  isValidIban,
  generateCsrfToken,
  verifyCsrfToken,
  isStrongPassword,
  validateFileType,
  validateFileSize,
  escapeRegex,
  generateRandomString,
  hashData,
  verifyDataIntegrity,
};
