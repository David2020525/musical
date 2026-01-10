/**
 * Email Service for MusicHub
 * Supports multiple email providers (Resend, test mode)
 * 
 * To use in production:
 * 1. Sign up for Resend.com (free tier)
 * 2. Get API key from https://resend.com/api-keys
 * 3. Add to wrangler.jsonc: RESEND_API_KEY in secrets
 * 4. Or use .dev.vars for local development
 */

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export interface EmailService {
  send(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }>
}

/**
 * Resend Email Service (Production)
 * Requires RESEND_API_KEY in environment
 */
export class ResendEmailService implements EmailService {
  constructor(private apiKey: string) {}

  async send(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'MusicHub <noreply@musichub.app>',
          to: options.to,
          subject: options.subject,
          html: options.html,
          text: options.text || stripHtml(options.html),
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        return { success: false, error: `Resend API error: ${error}` }
      }

      const data = await response.json() as { id: string }
      return { success: true, messageId: data.id }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

/**
 * Test Email Service (Development)
 * Logs emails to console instead of sending
 */
export class TestEmailService implements EmailService {
  async send(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    console.log('📧 TEST EMAIL SERVICE - Email would be sent:')
    console.log('To:', options.to)
    console.log('Subject:', options.subject)
    console.log('HTML:', options.html.substring(0, 200) + '...')
    console.log('Text:', options.text?.substring(0, 200) + '...')
    
    // Simulate successful send
    return { 
      success: true, 
      messageId: `test-${Date.now()}-${Math.random().toString(36).substring(7)}` 
    }
  }
}

/**
 * Get email service based on environment
 */
export function getEmailService(env: any): EmailService {
  // Check if Resend API key is available
  if (env.RESEND_API_KEY) {
    return new ResendEmailService(env.RESEND_API_KEY)
  }
  
  // Fallback to test service for development
  console.warn('⚠️ Using test email service - emails will not be sent')
  console.warn('To use real emails, add RESEND_API_KEY to your environment')
  return new TestEmailService()
}

/**
 * Helper function to strip HTML tags (basic implementation)
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim()
}

/**
 * Email Templates
 */

export function getVerificationEmailTemplate(params: {
  userName: string
  verificationLink: string
  locale?: 'en' | 'tr'
}): { subject: string; html: string; text: string } {
  const isEnglish = params.locale !== 'tr'
  
  if (isEnglish) {
    return {
      subject: 'Verify your MusicHub email address',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify your email</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #9333EA, #EC4899); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎵 MusicHub</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hi ${params.userName}! 👋</h2>
            
            <p>Welcome to MusicHub! We're excited to have you join our community of music lovers and creators.</p>
            
            <p>To get started, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${params.verificationLink}" 
                 style="background: linear-gradient(135deg, #9333EA, #EC4899); 
                        color: white; 
                        padding: 15px 40px; 
                        text-decoration: none; 
                        border-radius: 8px; 
                        display: inline-block;
                        font-weight: bold;
                        font-size: 16px;">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
            <p style="background: white; padding: 15px; border-radius: 5px; word-break: break-all; font-size: 12px; color: #9333EA;">
              ${params.verificationLink}
            </p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              This link will expire in 24 hours. If you didn't create an account on MusicHub, you can safely ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>© 2026 MusicHub. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
      text: `
Hi ${params.userName}!

Welcome to MusicHub! We're excited to have you join our community of music lovers and creators.

To get started, please verify your email address by clicking this link:
${params.verificationLink}

This link will expire in 24 hours. If you didn't create an account on MusicHub, you can safely ignore this email.

© 2026 MusicHub. All rights reserved.
      `.trim(),
    }
  } else {
    return {
      subject: 'MusicHub e-posta adresinizi doğrulayın',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>E-postanızı doğrulayın</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #9333EA, #EC4899); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎵 MusicHub</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Merhaba ${params.userName}! 👋</h2>
            
            <p>MusicHub'a hoş geldiniz! Müzik severler ve yaratıcılar topluluğumuza katıldığınız için çok mutluyuz.</p>
            
            <p>Başlamak için lütfen aşağıdaki butona tıklayarak e-posta adresinizi doğrulayın:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${params.verificationLink}" 
                 style="background: linear-gradient(135deg, #9333EA, #EC4899); 
                        color: white; 
                        padding: 15px 40px; 
                        text-decoration: none; 
                        border-radius: 8px; 
                        display: inline-block;
                        font-weight: bold;
                        font-size: 16px;">
                E-postayı Doğrula
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">Veya bu bağlantıyı tarayıcınıza kopyalayıp yapıştırın:</p>
            <p style="background: white; padding: 15px; border-radius: 5px; word-break: break-all; font-size: 12px; color: #9333EA;">
              ${params.verificationLink}
            </p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Bu bağlantı 24 saat içinde geçerliliğini yitirecektir. MusicHub'da bir hesap oluşturmadıysanız, bu e-postayı güvenle yok sayabilirsiniz.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>© 2026 MusicHub. Tüm hakları saklıdır.</p>
          </div>
        </body>
        </html>
      `,
      text: `
Merhaba ${params.userName}!

MusicHub'a hoş geldiniz! Müzik severler ve yaratıcılar topluluğumuza katıldığınız için çok mutluyuz.

Başlamak için lütfen bu bağlantıya tıklayarak e-posta adresinizi doğrulayın:
${params.verificationLink}

Bu bağlantı 24 saat içinde geçerliliğini yitirecektir. MusicHub'da bir hesap oluşturmadıysanız, bu e-postayı güvenle yok sayabilirsiniz.

© 2026 MusicHub. Tüm hakları saklıdır.
      `.trim(),
    }
  }
}
