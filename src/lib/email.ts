/**
 * Email Service
 * 
 * Mock implementation for development that logs emails to console.
 * In production, replace with real email service (Resend.com, SendGrid, etc.)
 */

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export interface EmailService {
  send(options: EmailOptions): Promise<{ success: boolean; error?: string }>
}

/**
 * Get email service instance
 */
export function getEmailService(env: any): EmailService {
  const apiKey = env.RESEND_API_KEY || 're_2GYfsV9V_3jKPpLg5iG7BwSd9vVqnfzRs';
  const fromEmail = env.RESEND_FROM_EMAIL || 'va01@abgrouponline.com';
  const useMock = !env.RESEND_API_KEY; // Use mock if no API key configured

  return {
    async send(options: EmailOptions) {
      // Mock mode for development
      if (useMock) {
        console.log('\n📧 ===== EMAIL SENT (MOCK) =====')
        console.log(`To: ${options.to}`)
        console.log(`Subject: ${options.subject}`)
        console.log('HTML Content:')
        console.log(options.html)
        console.log('==============================\n')
        
        await new Promise(resolve => setTimeout(resolve, 100))
        return { success: true }
      }

      // Production mode with Resend API
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            from: `MusicHub <${fromEmail}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          console.error('Resend API error:', error);
          return { success: false, error: `Failed to send email: ${error}` };
        }

        const data = await response.json();
        console.log('✅ Email sent successfully:', data.id);
        return { success: true };
      } catch (error) {
        console.error('Email send error:', error);
        return { success: false, error: 'Failed to send email' };
      }
    }
  }
}

/**
 * Email Templates
 */

export function getVerificationEmailTemplate(options: {
  userName: string
  verificationLink: string
  locale?: 'en' | 'tr'
}): { subject: string; html: string; text: string } {
  const { userName: name, verificationLink: verificationUrl, locale = 'en' } = options
  const templates = {
    en: {
      subject: 'Verify your MusicHub email address',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .link { color: #667eea; word-break: break-all; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎵 Welcome to MusicHub!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thanks for signing up! Please verify your email address to activate your account and start exploring thousands of tracks.</p>
              <p style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </p>
              <p>Or copy and paste this link into your browser:</p>
              <p><a href="${verificationUrl}" class="link">${verificationUrl}</a></p>
              <p><strong>This link expires in 24 hours.</strong></p>
              <p>If you didn't create this account, you can safely ignore this email.</p>
            </div>
            <div class="footer">
              <p>© 2026 MusicHub. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi ${name},

Thanks for signing up for MusicHub!

Please verify your email address by clicking the link below:
${verificationUrl}

This link expires in 24 hours.

If you didn't create this account, you can safely ignore this email.

© 2026 MusicHub. All rights reserved.
      `.trim()
    },
    tr: {
      subject: 'MusicHub e-posta adresinizi doğrulayın',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .link { color: #667eea; word-break: break-all; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎵 MusicHub'a Hoş Geldiniz!</h1>
            </div>
            <div class="content">
              <p>Merhaba ${name},</p>
              <p>Kaydınız için teşekkürler! Hesabınızı aktifleştirmek ve binlerce parçayı keşfetmeye başlamak için lütfen e-posta adresinizi doğrulayın.</p>
              <p style="text-align: center;">
                <a href="${verificationUrl}" class="button">E-posta Adresini Doğrula</a>
              </p>
              <p>Veya bu bağlantıyı tarayıcınıza kopyalayıp yapıştırın:</p>
              <p><a href="${verificationUrl}" class="link">${verificationUrl}</a></p>
              <p><strong>Bu bağlantı 24 saat içinde geçerliliğini yitirecektir.</strong></p>
              <p>Bu hesabı siz oluşturmadıysanız, bu e-postayı güvenle yok sayabilirsiniz.</p>
            </div>
            <div class="footer">
              <p>© 2026 MusicHub. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Merhaba ${name},

MusicHub'a kaydolduğunuz için teşekkürler!

Lütfen aşağıdaki bağlantıya tıklayarak e-posta adresinizi doğrulayın:
${verificationUrl}

Bu bağlantı 24 saat içinde geçerliliğini yitirecektir.

Bu hesabı siz oluşturmadıysanız, bu e-postayı güvenle yok sayabilirsiniz.

© 2026 MusicHub. Tüm hakları saklıdır.
      `.trim()
    }
  }
  
  return templates[locale]
}

export function getPasswordResetEmailTemplate(
  resetUrl: string,
  locale: 'en' | 'tr' = 'en'
): { subject: string; html: string; text: string } {
  const name = 'User' // Generic name since we don't pass it from auth routes
  const templates = {
    en: {
      subject: 'Reset your MusicHub password',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .link { color: #667eea; word-break: break-all; }
            .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 20px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>We received a request to reset your password for your MusicHub account.</p>
              <p style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </p>
              <p>Or copy and paste this link into your browser:</p>
              <p><a href="${resetUrl}" class="link">${resetUrl}</a></p>
              <div class="warning">
                <strong>⚠️ Important:</strong> This link expires in 1 hour for security reasons.
              </div>
              <p><strong>If you didn't request this password reset, please ignore this email.</strong> Your password will remain unchanged.</p>
            </div>
            <div class="footer">
              <p>© 2026 MusicHub. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi ${name},

We received a request to reset your password for your MusicHub account.

Click the link below to reset your password:
${resetUrl}

This link expires in 1 hour for security reasons.

If you didn't request this password reset, please ignore this email. Your password will remain unchanged.

© 2026 MusicHub. All rights reserved.
      `.trim()
    },
    tr: {
      subject: 'MusicHub şifrenizi sıfırlayın',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .link { color: #667eea; word-break: break-all; }
            .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 20px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Şifre Sıfırlama</h1>
            </div>
            <div class="content">
              <p>Merhaba ${name},</p>
              <p>MusicHub hesabınız için şifre sıfırlama talebi aldık.</p>
              <p style="text-align: center;">
                <a href="${resetUrl}" class="button">Şifreyi Sıfırla</a>
              </p>
              <p>Veya bu bağlantıyı tarayıcınıza kopyalayıp yapıştırın:</p>
              <p><a href="${resetUrl}" class="link">${resetUrl}</a></p>
              <div class="warning">
                <strong>⚠️ Önemli:</strong> Bu bağlantı güvenlik nedeniyle 1 saat içinde geçerliliğini yitirecektir.
              </div>
              <p><strong>Bu şifre sıfırlama talebini siz yapmadıysanız, lütfen bu e-postayı yok sayın.</strong> Şifreniz değişmeden kalacaktır.</p>
            </div>
            <div class="footer">
              <p>© 2026 MusicHub. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Merhaba ${name},

MusicHub hesabınız için şifre sıfırlama talebi aldık.

Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:
${resetUrl}

Bu bağlantı güvenlik nedeniyle 1 saat içinde geçerliliğini yitirecektir.

Bu şifre sıfırlama talebini siz yapmadıysanız, lütfen bu e-postayı yok sayın. Şifreniz değişmeden kalacaktır.

© 2026 MusicHub. Tüm hakları saklıdır.
      `.trim()
    }
  }
  
  return templates[locale]
}
