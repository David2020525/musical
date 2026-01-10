import type { D1Database } from '@cloudflare/workers-types';

interface PasswordResetToken {
  id: number;
  user_id: number;
  token: string;
  expires_at: string;
  used: number;
  created_at: string;
}

/**
 * Generate a password reset token
 */
export function generateResetToken(): string {
  const array = new Uint8Array(32);
  // Use Web Crypto API available in Cloudflare Workers
  globalThis.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Create a password reset token in the database
 */
export async function createResetToken(
  db: D1Database,
  userId: number
): Promise<string> {
  const token = generateResetToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  await db.prepare(`
    INSERT INTO password_reset_tokens (user_id, token, expires_at)
    VALUES (?, ?, ?)
  `).bind(userId, token, expiresAt.toISOString()).run();

  return token;
}

/**
 * Get password reset email template
 */
export function getPasswordResetEmailTemplate(
  resetUrl: string,
  locale: string = 'en'
): { subject: string; html: string } {
  const subject = locale === 'tr' 
    ? 'MusicHub Şifre Sıfırlama'
    : 'Reset your MusicHub password';

  const heading = locale === 'tr'
    ? 'Şifre Sıfırlama İsteği'
    : 'Password Reset Request';

  const greeting = locale === 'tr'
    ? 'Merhaba,'
    : 'Hello,';

  const message = locale === 'tr'
    ? 'MusicHub hesabınız için şifre sıfırlama talebinde bulundunuz. Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:'
    : 'You requested to reset your password for your MusicHub account. Click the button below to reset your password:';

  const buttonText = locale === 'tr'
    ? 'Şifreyi Sıfırla'
    : 'Reset Password';

  const expiry = locale === 'tr'
    ? 'Bu bağlantı 24 saat içinde geçerliliğini yitirecektir.'
    : 'This link will expire in 24 hours.';

  const ignore = locale === 'tr'
    ? 'Eğer bu talebi siz yapmadıysanız, bu e-postayı güvenle yok sayabilirsiniz.'
    : 'If you did not request this, please ignore this email and your password will remain unchanged.';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin: 0; padding: 20px;">
        <tr>
          <td align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background: white; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden;">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                    🎵 MusicHub
                  </h1>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                    ${heading}
                  </h2>
                  
                  <p style="margin: 0 0 15px; color: #4a5568; font-size: 16px; line-height: 1.6;">
                    ${greeting}
                  </p>
                  
                  <p style="margin: 0 0 30px; color: #4a5568; font-size: 16px; line-height: 1.6;">
                    ${message}
                  </p>

                  <!-- Button -->
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" style="padding: 0 0 30px;">
                        <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: transform 0.2s;">
                          ${buttonText}
                        </a>
                      </td>
                    </tr>
                  </table>

                  <p style="margin: 0 0 15px; color: #718096; font-size: 14px; line-height: 1.6;">
                    <strong>${expiry}</strong>
                  </p>

                  <p style="margin: 0; color: #718096; font-size: 14px; line-height: 1.6;">
                    ${ignore}
                  </p>

                  <!-- URL fallback -->
                  <div style="margin-top: 30px; padding: 20px; background: #f7fafc; border-radius: 8px; border-left: 4px solid #667eea;">
                    <p style="margin: 0 0 10px; color: #4a5568; font-size: 12px; font-weight: 600;">
                      ${locale === 'tr' ? 'Veya bu bağlantıyı kopyalayın:' : 'Or copy this link:'}
                    </p>
                    <p style="margin: 0; color: #667eea; font-size: 12px; word-break: break-all;">
                      ${resetUrl}
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #a0aec0; font-size: 14px;">
                    © 2026 MusicHub. ${locale === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return { subject, html };
}

/**
 * Verify a password reset token
 */
export async function verifyResetToken(
  db: D1Database,
  token: string
): Promise<{ valid: boolean; userId?: number; error?: string }> {
  const result = await db.prepare(`
    SELECT id, user_id, expires_at, used
    FROM password_reset_tokens
    WHERE token = ?
  `).bind(token).first<PasswordResetToken>();

  if (!result) {
    return { valid: false, error: 'Invalid token' };
  }

  if (result.used === 1) {
    return { valid: false, error: 'Token already used' };
  }

  const expiresAt = new Date(result.expires_at);
  if (expiresAt < new Date()) {
    return { valid: false, error: 'Token expired' };
  }

  return { valid: true, userId: result.user_id };
}

/**
 * Mark a password reset token as used
 */
export async function markTokenAsUsed(
  db: D1Database,
  token: string
): Promise<void> {
  await db.prepare(`
    UPDATE password_reset_tokens
    SET used = 1
    WHERE token = ?
  `).bind(token).run();
}
