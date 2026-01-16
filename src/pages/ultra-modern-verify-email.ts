import { Locale, t } from '../lib/i18n'

export function ultraModernVerifyEmailHTML(locale: Locale = 'en') {
  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('auth.verify_email', locale)} - MusicHub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        
        body {
            background: #000000;
            background-image: 
                radial-gradient(at 0% 0%, rgba(147, 51, 234, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.15) 0px, transparent 50%);
            background-attachment: fixed;
        }
        
        .glass {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .glass-strong {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(40px) saturate(200%);
            -webkit-backdrop-filter: blur(40px) saturate(200%);
            border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top: 4px solid #9333EA;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body class="text-white min-h-screen flex items-center justify-center p-6">
    <!-- Verification Container -->
    <div class="max-w-md w-full">
        <div class="glass-strong rounded-3xl p-8 text-center">
            <!-- Logo -->
            <div class="mb-8">
                <div class="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto">
                    <i class="fas fa-music text-white text-3xl"></i>
                </div>
            </div>

            <!-- Verifying State -->
            <div id="verifying-state">
                <div class="spinner mx-auto mb-6"></div>
                <h2 class="text-2xl font-bold mb-2">${locale === 'tr' ? 'E-posta Doğrulanıyor' : 'Verifying Email'}</h2>
                <p class="text-gray-400">${locale === 'tr' ? 'Lütfen bekleyin...' : 'Please wait...'}</p>
            </div>

            <!-- Success State -->
            <div id="success-state" class="hidden">
                <div class="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-check text-green-500 text-4xl"></i>
                </div>
                <h2 class="text-2xl font-bold mb-2">${t('auth.verification_success', locale)}</h2>
                <p class="text-gray-400 mb-6">
                    ${t('auth.account_verified', locale)}
                </p>
                <a href="/${locale}/dashboard" 
                   class="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                    ${t('auth.goto_dashboard', locale)}
                </a>
            </div>

            <!-- Error State -->
            <div id="error-state" class="hidden">
                <div class="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-times text-red-500 text-4xl"></i>
                </div>
                <h2 class="text-2xl font-bold mb-2">${t('auth.verification_failed', locale)}</h2>
                <p class="text-gray-400 mb-6" id="error-message">
                    ${t('auth.invalid_token', locale)}
                </p>
                <button onclick="resendVerification()" 
                        class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:opacity-90 transition-opacity mb-3">
                    ${t('auth.resend_verification', locale)}
                </button>
                <br>
                <a href="/${locale}" class="text-gray-400 hover:text-white transition-colors text-sm">
                    ${t('auth.goto_home', locale)}
                </a>
            </div>

            <!-- Resend Success State -->
            <div id="resend-success-state" class="hidden">
                <div class="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-envelope text-blue-500 text-4xl"></i>
                </div>
                <h2 class="text-2xl font-bold mb-2">${locale === 'tr' ? 'E-posta Gönderildi' : 'Email Sent'}</h2>
                <p class="text-gray-400 mb-6">
                    ${locale === 'tr' ? 'Yeni doğrulama bağlantısı e-postanıza gönderildi.' : 'A new verification link has been sent to your email.'}
                </p>
                <a href="/${locale}" class="text-gray-400 hover:text-white transition-colors text-sm">
                    ${t('auth.goto_home', locale)}
                </a>
            </div>
        </div>
    </div>

    <script>
        // Get token from URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        // Show/hide states
        function showState(stateId) {
            document.getElementById('verifying-state').classList.add('hidden');
            document.getElementById('success-state').classList.add('hidden');
            document.getElementById('error-state').classList.add('hidden');
            document.getElementById('resend-success-state').classList.add('hidden');
            document.getElementById(stateId).classList.remove('hidden');
        }

        // Verify email
        async function verifyEmail() {
            if (!token) {
                showState('error-state');
                document.getElementById('error-message').textContent = 
                    '${locale === 'tr' ? 'Doğrulama kodu bulunamadı.' : 'Verification token not found.'}';
                return;
            }

            try {
                const response = await fetch('/api/auth/verify-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                const data = await response.json();

                if (data.success) {
                    showState('success-state');
                    
                    // Update user data in localStorage if logged in
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        const user = JSON.parse(storedUser);
                        user.email_verified = 1;
                        localStorage.setItem('user', JSON.stringify(user));
                    }
                } else {
                    showState('error-state');
                    document.getElementById('error-message').textContent = 
                        data.error || '${locale === 'tr' ? 'Doğrulama başarısız oldu.' : 'Verification failed.'}';
                }
            } catch (error) {
                console.error('Verification error:', error);
                showState('error-state');
                document.getElementById('error-message').textContent = 
                    '${locale === 'tr' ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.'}';
            }
        }

        // Resend verification
        async function resendVerification() {
            const authToken = localStorage.getItem('token');
            
            if (!authToken) {
                alert('${locale === 'tr' ? 'Lütfen önce giriş yapın.' : 'Please log in first.'}');
                window.location.href = '/${locale}/login';
                return;
            }

            showState('verifying-state');

            try {
                const response = await fetch('/api/auth/resend-verification', {
                    method: 'POST',
                    headers: {
                        'Authorization': \`Bearer \${authToken}\`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (data.success) {
                    showState('resend-success-state');
                } else {
                    showState('error-state');
                    document.getElementById('error-message').textContent = 
                        data.error || '${locale === 'tr' ? 'E-posta gönderilemedi.' : 'Failed to send email.'}';
                }
            } catch (error) {
                console.error('Resend error:', error);
                showState('error-state');
                document.getElementById('error-message').textContent = 
                    '${locale === 'tr' ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.'}';
            }
        }

        // Auto-verify on page load
        verifyEmail();
    </script>
</body>
</html>`
}
