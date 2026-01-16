/**
 * Email Templates for M3 Features
 */

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

/**
 * Producer Application Status Email
 */
export function getProducerApplicationEmailTemplate(options: {
  userName: string;
  status: 'approved' | 'rejected';
  reason?: string;
  locale?: 'en' | 'tr';
}): EmailTemplate {
  const { userName, status, reason, locale = 'en' } = options;

  if (status === 'approved') {
    const templates = {
      en: {
        subject: '🎉 Your Producer Application is Approved!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Welcome to MUSICAL Producers!</h1>
              </div>
              <div class="content">
                <p>Hi ${userName},</p>
                <p><strong>Congratulations!</strong> Your producer application has been approved.</p>
                <p>You can now upload tracks, set prices, and start selling your music to our community.</p>
                <p style="text-align: center;">
                  <a href="${process.env.APP_URL || 'https://musichub-4yq.pages.dev'}/en/dashboard" class="button">Go to Producer Dashboard</a>
                </p>
                <p><strong>Next Steps:</strong></p>
                <ul>
                  <li>Upload your first track</li>
                  <li>Set up your producer profile</li>
                  <li>Configure your bank details for payouts</li>
                  <li>Start promoting your music</li>
                </ul>
                <p>We're excited to have you on board!</p>
              </div>
              <div class="footer">
                <p>© 2026 MUSICAL. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Hi ${userName},

Congratulations! Your producer application has been approved.

You can now upload tracks, set prices, and start selling your music to our community.

Go to Producer Dashboard: ${process.env.APP_URL || 'https://musichub-4yq.pages.dev'}/en/dashboard

Next Steps:
- Upload your first track
- Set up your producer profile
- Configure your bank details for payouts
- Start promoting your music

We're excited to have you on board!

© 2026 MUSICAL. All rights reserved.
        `.trim(),
      },
      tr: {
        subject: '🎉 Prodüktör Başvurunuz Onaylandı!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 MUSICAL Prodüktörlerine Hoş Geldiniz!</h1>
              </div>
              <div class="content">
                <p>Merhaba ${userName},</p>
                <p><strong>Tebrikler!</strong> Prodüktör başvurunuz onaylandı.</p>
                <p>Artık parça yükleyebilir, fiyat belirleyebilir ve müziğinizi topluluğumuza satmaya başlayabilirsiniz.</p>
                <p style="text-align: center;">
                  <a href="${process.env.APP_URL || 'https://musichub-4yq.pages.dev'}/tr/dashboard" class="button">Prodüktör Panelinize Gidin</a>
                </p>
                <p><strong>Sonraki Adımlar:</strong></p>
                <ul>
                  <li>İlk parçanızı yükleyin</li>
                  <li>Prodüktör profilinizi oluşturun</li>
                  <li>Ödemeler için banka bilgilerinizi yapılandırın</li>
                  <li>Müziğinizi tanıtmaya başlayın</li>
                </ul>
                <p>Ekibimize katıldığınız için heyecanlıyız!</p>
              </div>
              <div class="footer">
                <p>© 2026 MUSICAL. Tüm hakları saklıdır.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Merhaba ${userName},

Tebrikler! Prodüktör başvurunuz onaylandı.

Artık parça yükleyebilir, fiyat belirleyebilir ve müziğinizi topluluğumuza satmaya başlayabilirsiniz.

Prodüktör Panelinize Gidin: ${process.env.APP_URL || 'https://musichub-4yq.pages.dev'}/tr/dashboard

Sonraki Adımlar:
- İlk parçanızı yükleyin
- Prodüktör profilinizi oluşturun
- Ödemeler için banka bilgilerinizi yapılandırın
- Müziğinizi tanıtmaya başlayın

Ekibimize katıldığınız için heyecanlıyız!

© 2026 MUSICAL. Tüm hakları saklıdır.
        `.trim(),
      },
    };
    return templates[locale];
  } else {
    // Rejected
    const templates = {
      en: {
        subject: 'Update on Your Producer Application',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Producer Application Update</h1>
              </div>
              <div class="content">
                <p>Hi ${userName},</p>
                <p>Thank you for your interest in becoming a MUSICAL producer.</p>
                <p>After reviewing your application, we're unable to approve it at this time.</p>
                ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
                <p>You're welcome to reapply in the future. Please ensure your application includes:</p>
                <ul>
                  <li>Valid government-issued ID</li>
                  <li>Links to your music portfol io</li>
                  <li>Accurate contact information</li>
                </ul>
                <p style="text-align: center;">
                  <a href="${process.env.APP_URL || 'https://musichub-4yq.pages.dev'}/en/producer-application" class="button">Reapply</a>
                </p>
              </div>
              <div class="footer">
                <p>© 2026 MUSICAL. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Hi ${userName},

Thank you for your interest in becoming a MUSICAL producer.

After reviewing your application, we're unable to approve it at this time.

${reason ? `Reason: ${reason}` : ''}

You're welcome to reapply in the future. Please ensure your application includes:
- Valid government-issued ID
- Links to your music portfolio
- Accurate contact information

Reapply: ${process.env.APP_URL || 'https://musichub-4yq.pages.dev'}/en/producer-application

© 2026 MUSICAL. All rights reserved.
        `.trim(),
      },
      tr: {
        subject: 'Prodüktör Başvurunuz Hakkında Güncelleme',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Prodüktör Başvurusu Güncellemesi</h1>
              </div>
              <div class="content">
                <p>Merhaba ${userName},</p>
                <p>MUSICAL prodüktörü olmak için gösterdiğiniz ilgi için teşekkür ederiz.</p>
                <p>Başvurunuzu inceledikten sonra, şu anda onaylayamıyoruz.</p>
                ${reason ? `<p><strong>Sebep:</strong> ${reason}</p>` : ''}
                <p>Gelecekte tekrar başvurabilirsiniz. Lütfen başvurunuzun şunları içerdiğinden emin olun:</p>
                <ul>
                  <li>Geçerli resmi kimlik belgesi</li>
                  <li>Müzik portföyünüze bağlantılar</li>
                  <li>Doğru iletişim bilgileri</li>
                </ul>
                <p style="text-align: center;">
                  <a href="${process.env.APP_URL || 'https://musichub-4yq.pages.dev'}/tr/producer-application" class="button">Tekrar Başvur</a>
                </p>
              </div>
              <div class="footer">
                <p>© 2026 MUSICAL. Tüm hakları saklıdır.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Merhaba ${userName},

MUSICAL prodüktörü olmak için gösterdiğiniz ilgi için teşekkür ederiz.

Başvurunuzu inceledikten sonra, şu anda onaylayamıyoruz.

${reason ? `Sebep: ${reason}` : ''}

Gelecekte tekrar başvurabilirsiniz. Lütfen başvurunuzun şunları içerdiğinden emin olun:
- Geçerli resmi kimlik belgesi
- Müzik portföyünüze bağlantılar
- Doğru iletişim bilgileri

Tekrar Başvur: ${process.env.APP_URL || 'https://musichub-4yq.pages.dev'}/tr/producer-application

© 2026 MUSICAL. Tüm hakları saklıdır.
        `.trim(),
      },
    };
    return templates[locale];
  }
}

/**
 * Track Sold Notification Email (to Producer)
 */
export function getTrackSoldEmailTemplate(options: {
  producerName: string;
  trackTitle: string;
  amount: number;
  commission: number;
  netEarnings: number;
  buyerName: string;
  locale?: 'en' | 'tr';
}): EmailTemplate {
  const { producerName, trackTitle, amount, commission, netEarnings, buyerName, locale = 'en' } = options;

  const templates = {
    en: {
      subject: `🎉 Your track "${trackTitle}" was just sold!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
            .stats { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .stat { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .stat:last-child { border-bottom: none; }
            .stat-label { color: #6b7280; }
            .stat-value { font-weight: 600; }
            .earnings { font-size: 24px; color: #10b981; font-weight: 700; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Sale Notification!</h1>
            </div>
            <div class="content">
              <p>Hi ${producerName},</p>
              <p><strong>Great news!</strong> Your track has been purchased.</p>
              <div class="stats">
                <div class="stat">
                  <span class="stat-label">Track:</span>
                  <span class="stat-value">${trackTitle}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Buyer:</span>
                  <span class="stat-value">${buyerName}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Sale Price:</span>
                  <span class="stat-value">₺${amount.toFixed(2)}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Platform Fee (15%):</span>
                  <span class="stat-value">-₺${commission.toFixed(2)}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Your Earnings (85%):</span>
                  <span class="earnings">₺${netEarnings.toFixed(2)}</span>
                </div>
              </div>
              <p>The earnings have been added to your wallet. You can request a withdrawal at any time.</p>
              <p style="text-align: center;">
                <a href="${process.env.APP_URL || 'https://musichub-4yq.pages.dev'}/en/dashboard/wallet" class="button">View Wallet</a>
              </p>
            </div>
            <div class="footer">
              <p>© 2026 MUSICAL. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi ${producerName},

Great news! Your track has been purchased.

Track: ${trackTitle}
Buyer: ${buyerName}
Sale Price: ₺${amount.toFixed(2)}
Platform Fee (15%): -₺${commission.toFixed(2)}
Your Earnings (85%): ₺${netEarnings.toFixed(2)}

The earnings have been added to your wallet. You can request a withdrawal at any time.

View Wallet: ${process.env.APP_URL || 'https://musichub-4yq.pages.dev'}/en/dashboard/wallet

© 2026 MUSICAL. All rights reserved.
      `.trim(),
    },
    tr: {
      subject: `🎉 Parçanız "${trackTitle}" az önce satıldı!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
            .stats { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .stat { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .stat:last-child { border-bottom: none; }
            .stat-label { color: #6b7280; }
            .stat-value { font-weight: 600; }
            .earnings { font-size: 24px; color: #10b981; font-weight: 700; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Satış Bildirimi!</h1>
            </div>
            <div class="content">
              <p>Merhaba ${producerName},</p>
              <p><strong>Harika haber!</strong> Parçanız satın alındı.</p>
              <div class="stats">
                <div class="stat">
                  <span class="stat-label">Parça:</span>
                  <span class="stat-value">${trackTitle}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Alıcı:</span>
                  <span class="stat-value">${buyerName}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Satış Fiyatı:</span>
                  <span class="stat-value">₺${amount.toFixed(2)}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Platform Ücreti (15%):</span>
                  <span class="stat-value">-₺${commission.toFixed(2)}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Kazancınız (85%):</span>
                  <span class="earnings">₺${netEarnings.toFixed(2)}</span>
                </div>
              </div>
              <p>Kazancınız cüzdanınıza eklendi. İstediğiniz zaman para çekme talebi oluşturabilirsiniz.</p>
              <p style="text-align: center;">
                <a href="${process.env.APP_URL || 'https://musichub-4yq.pages.dev'}/tr/dashboard/wallet" class="button">Cüzdanı Görüntüle</a>
              </p>
            </div>
            <div class="footer">
              <p>© 2026 MUSICAL. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Merhaba ${producerName},

Harika haber! Parçanız satın alındı.

Parça: ${trackTitle}
Alıcı: ${buyerName}
Satış Fiyatı: ₺${amount.toFixed(2)}
Platform Ücreti (15%): -₺${commission.toFixed(2)}
Kazancınız (85%): ₺${netEarnings.toFixed(2)}

Kazancınız cüzdanınıza eklendi. İstediğiniz zaman para çekme talebi oluşturabilirsiniz.

Cüzdanı Görüntüle: ${process.env.APP_URL || 'https://musichub-4yq.pages.dev'}/tr/dashboard/wallet

© 2026 MUSICAL. Tüm hakları saklıdır.
      `.trim(),
    },
  };

  return templates[locale];
}

/**
 * Purchase Confirmation Email (to Buyer)
 */
export function getPurchaseConfirmationEmailTemplate(options: {
  buyerName: string;
  trackTitle: string;
  artistName: string;
  amount: number;
  downloadUrl: string;
  receiptUrl: string;
  locale?: 'en' | 'tr';
}): EmailTemplate {
  const { buyerName, trackTitle, artistName, amount, downloadUrl, receiptUrl, locale = 'en' } = options;

  const templates = {
    en: {
      subject: `✅ Your purchase of "${trackTitle}" is confirmed!`,
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
            .button { display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 10px 5px; font-weight: 600; }
            .button-secondary { background: #6b7280; }
            .purchase-info { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Purchase Successful!</h1>
            </div>
            <div class="content">
              <p>Hi ${buyerName},</p>
              <p>Thank you for your purchase! Your payment has been processed successfully.</p>
              <div class="purchase-info">
                <h3 style="margin-top: 0;">Purchase Details</h3>
                <p><strong>Track:</strong> ${trackTitle}</p>
                <p><strong>Artist:</strong> ${artistName}</p>
                <p><strong>Amount Paid:</strong> ₺${amount.toFixed(2)}</p>
              </div>
              <p style="text-align: center;">
                <a href="${downloadUrl}" class="button">Download Track</a>
                <a href="${receiptUrl}" class="button button-secondary">View Receipt</a>
              </p>
              <p><small><strong>Note:</strong> Download link expires in 1 hour. The track is available in your dashboard anytime.</small></p>
            </div>
            <div class="footer">
              <p>© 2026 MUSICAL. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi ${buyerName},

Thank you for your purchase! Your payment has been processed successfully.

Purchase Details:
Track: ${trackTitle}
Artist: ${artistName}
Amount Paid: ₺${amount.toFixed(2)}

Download Track: ${downloadUrl}
View Receipt: ${receiptUrl}

Note: Download link expires in 1 hour. The track is available in your dashboard anytime.

© 2026 MUSICAL. All rights reserved.
      `.trim(),
    },
    tr: {
      subject: `✅ "${trackTitle}" satın alımınız onaylandı!`,
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
            .button { display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 10px 5px; font-weight: 600; }
            .button-secondary { background: #6b7280; }
            .purchase-info { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Satın Alma Başarılı!</h1>
            </div>
            <div class="content">
              <p>Merhaba ${buyerName},</p>
              <p>Satın alımınız için teşekkürler! Ödemeniz başarıyla işlendi.</p>
              <div class="purchase-info">
                <h3 style="margin-top: 0;">Satın Alma Detayları</h3>
                <p><strong>Parça:</strong> ${trackTitle}</p>
                <p><strong>Sanatçı:</strong> ${artistName}</p>
                <p><strong>Ödenen Tutar:</strong> ₺${amount.toFixed(2)}</p>
              </div>
              <p style="text-align: center;">
                <a href="${downloadUrl}" class="button">Parçayı İndir</a>
                <a href="${receiptUrl}" class="button button-secondary">Fişi Görüntüle</a>
              </p>
              <p><small><strong>Not:</strong> İndirme bağlantısı 1 saat içinde sona erer. Parça, istediğiniz zaman panonuzdan erişilebilir.</small></p>
            </div>
            <div class="footer">
              <p>© 2026 MUSICAL. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Merhaba ${buyerName},

Satın alımınız için teşekkürler! Ödemeniz başarıyla işlendi.

Satın Alma Detayları:
Parça: ${trackTitle}
Sanatçı: ${artistName}
Ödenen Tutar: ₺${amount.toFixed(2)}

Parçayı İndir: ${downloadUrl}
Fişi Görüntüle: ${receiptUrl}

Not: İndirme bağlantısı 1 saat içinde sona erer. Parça, istediğiniz zaman panonuzdan erişilebilir.

© 2026 MUSICAL. Tüm hakları saklıdır.
      `.trim(),
    },
  };

  return templates[locale];
}

/**
 * Withdrawal Processed Email
 */
export function getWithdrawalEmailTemplate(options: {
  producerName: string;
  amount: number;
  bankName: string;
  lastFourDigits: string;
  locale?: 'en' | 'tr';
}): EmailTemplate {
  const { producerName, amount, bankName, lastFourDigits, locale = 'en' } = options;

  const templates = {
    en: {
      subject: '💰 Your withdrawal has been processed',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .amount { font-size: 32px; font-weight: 700; color: #10b981; text-align: center; margin: 20px 0; }
            .info { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💰 Withdrawal Processed</h1>
            </div>
            <div class="content">
              <p>Hi ${producerName},</p>
              <p>Your withdrawal request has been processed successfully!</p>
              <div class="amount">₺${amount.toFixed(2)}</div>
              <div class="info">
                <p><strong>Bank:</strong> ${bankName}</p>
                <p><strong>Account:</strong> **** **** **** ${lastFourDigits}</p>
                <p><strong>Processing Time:</strong> 1-3 business days</p>
              </div>
              <p>The funds will be transferred to your bank account within 1-3 business days.</p>
              <p>If you have any questions, please contact our support team.</p>
            </div>
            <div class="footer">
              <p>© 2026 MUSICAL. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi ${producerName},

Your withdrawal request has been processed successfully!

Amount: ₺${amount.toFixed(2)}
Bank: ${bankName}
Account: **** **** **** ${lastFourDigits}
Processing Time: 1-3 business days

The funds will be transferred to your bank account within 1-3 business days.

If you have any questions, please contact our support team.

© 2026 MUSICAL. All rights reserved.
      `.trim(),
    },
    tr: {
      subject: '💰 Para çekme işleminiz tamamlandı',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .amount { font-size: 32px; font-weight: 700; color: #10b981; text-align: center; margin: 20px 0; }
            .info { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💰 Para Çekme İşlendi</h1>
            </div>
            <div class="content">
              <p>Merhaba ${producerName},</p>
              <p>Para çekme talebiniz başarıyla işlendi!</p>
              <div class="amount">₺${amount.toFixed(2)}</div>
              <div class="info">
                <p><strong>Banka:</strong> ${bankName}</p>
                <p><strong>Hesap:</strong> **** **** **** ${lastFourDigits}</p>
                <p><strong>İşlem Süresi:</strong> 1-3 iş günü</p>
              </div>
              <p>Tutar 1-3 iş günü içinde banka hesabınıza aktarılacaktır.</p>
              <p>Sorularınız varsa, lütfen destek ekibimizle iletişime geçin.</p>
            </div>
            <div class="footer">
              <p>© 2026 MUSICAL. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Merhaba ${producerName},

Para çekme talebiniz başarıyla işlendi!

Tutar: ₺${amount.toFixed(2)}
Banka: ${bankName}
Hesap: **** **** **** ${lastFourDigits}
İşlem Süresi: 1-3 iş günü

Tutar 1-3 iş günü içinde banka hesabınıza aktarılacaktır.

Sorularınız varsa, lütfen destek ekibimizle iletişime geçin.

© 2026 MUSICAL. Tüm hakları saklıdır.
      `.trim(),
    },
  };

  return templates[locale];
}

/**
 * Forum Reply Notification Email
 */
export function getForumReplyEmailTemplate(options: {
  userName: string;
  topicTitle: string;
  replyAuthor: string;
  replyPreview: string;
  topicUrl: string;
  locale?: 'en' | 'tr';
}): EmailTemplate {
  const { userName, topicTitle, replyAuthor, replyPreview, topicUrl, locale = 'en' } = options;

  const templates = {
    en: {
      subject: `💬 New reply to "${topicTitle}"`,
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
            .reply { background: white; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💬 New Reply</h1>
            </div>
            <div class="content">
              <p>Hi ${userName},</p>
              <p><strong>${replyAuthor}</strong> replied to your topic:</p>
              <h3>"${topicTitle}"</h3>
              <div class="reply">
                <p>${replyPreview}${replyPreview.length > 200 ? '...' : ''}</p>
              </div>
              <p style="text-align: center;">
                <a href="${topicUrl}" class="button">View Reply</a>
              </p>
            </div>
            <div class="footer">
              <p>© 2026 MUSICAL. All rights reserved.</p>
              <p><small><a href="#">Unsubscribe from forum notifications</a></small></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi ${userName},

${replyAuthor} replied to your topic:

"${topicTitle}"

${replyPreview}${replyPreview.length > 200 ? '...' : ''}

View Reply: ${topicUrl}

© 2026 MUSICAL. All rights reserved.
      `.trim(),
    },
    tr: {
      subject: `💬 "${topicTitle}" konusuna yeni yanıt`,
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
            .reply { background: white; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💬 Yeni Yanıt</h1>
            </div>
            <div class="content">
              <p>Merhaba ${userName},</p>
              <p><strong>${replyAuthor}</strong> konunuza yanıt verdi:</p>
              <h3>"${topicTitle}"</h3>
              <div class="reply">
                <p>${replyPreview}${replyPreview.length > 200 ? '...' : ''}</p>
              </div>
              <p style="text-align: center;">
                <a href="${topicUrl}" class="button">Yanıtı Görüntüle</a>
              </p>
            </div>
            <div class="footer">
              <p>© 2026 MUSICAL. Tüm hakları saklıdır.</p>
              <p><small><a href="#">Forum bildirimlerinden çık</a></small></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Merhaba ${userName},

${replyAuthor} konunuza yanıt verdi:

"${topicTitle}"

${replyPreview}${replyPreview.length > 200 ? '...' : ''}

Yanıtı Görüntüle: ${topicUrl}

© 2026 MUSICAL. Tüm hakları saklıdır.
      `.trim(),
    },
  };

  return templates[locale];
}
