import { Locale, t } from '../lib/i18n';
import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernForgotPasswordHTML = (locale: string = 'en') => `
<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('auth.forgot_password', locale)} - MUSICAL</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <style>
        * {
            font-family: 'Inter', sans-serif;
        }
        
        body {
            background: #000;
            color: #fff;
            overflow-x: hidden;
        }
        
        /* Gradient mesh background */
        .gradient-mesh {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            background: 
                radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(219, 39, 119, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
            animation: meshMove 20s ease infinite;
        }
        
        @keyframes meshMove {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
        
        .glass-strong {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .modern-input {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            transition: all 0.3s;
        }
        
        .modern-input:focus {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(147, 51, 234, 0.5);
            outline: none;
            box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
        }
        
        .modern-input::placeholder {
            color: rgba(255, 255, 255, 0.3);
        }
    </style>
</head>
<body>
    <div class="gradient-mesh"></div>
    
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <!-- Card -->
            <div class="glass-strong rounded-3xl shadow-2xl p-8 border border-white/10">
                
                <!-- Header -->
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
                        <i class="fas fa-key text-2xl text-white"></i>
                    </div>
                    <h1 class="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ${t('auth.forgot_password', locale)}
                    </h1>
                    <p class="text-gray-400 text-sm">
                        ${t('auth.reset_password_desc', locale)}
                    </p>
                </div>

                <!-- Content -->
                <div>
                    
                    <!-- Success Message (hidden by default) -->
                    <div id="successMessage" class="hidden mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <div class="flex items-start">
                            <i class="fas fa-check-circle text-emerald-400 text-xl mr-3 mt-0.5"></i>
                            <div>
                                <h3 class="font-semibold text-emerald-400 mb-1">
                                    ${t('auth.email_sent', locale)}
                                </h3>
                                <p class="text-emerald-300/80 text-sm" id="successText">
                                    ${t('auth.check_inbox', locale)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Error Message (hidden by default) -->
                    <div id="errorMessage" class="hidden mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                        <div class="flex items-start">
                            <i class="fas fa-exclamation-circle text-red-400 text-xl mr-3 mt-0.5"></i>
                            <div>
                                <h3 class="font-semibold text-red-400 mb-1">
                                    ${t('common.error', locale)}
                                </h3>
                                <p class="text-red-300/80 text-sm" id="errorText"></p>
                            </div>
                        </div>
                    </div>

                    <!-- Form -->
                    <form id="forgotPasswordForm" class="space-y-6">
                        
                        <!-- Email -->
                        <div>
                            <label class="block text-gray-300 font-medium mb-2 text-sm">
                                <i class="fas fa-envelope mr-2 text-purple-400"></i>
                                ${t('auth.email', locale)}
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                required
                                autocomplete="email"
                                placeholder="${t('auth.email_placeholder', locale)}"
                                class="w-full px-4 py-3 modern-input rounded-xl"
                            >
                        </div>

                        <!-- Submit Button -->
                        <button 
                            type="submit" 
                            id="submitBtn"
                            class="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105"
                        >
                            <i class="fas fa-paper-plane mr-2"></i>
                            <span id="btnText">
                                ${t('auth.send_reset_link', locale)}
                            </span>
                        </button>

                    </form>

                    <!-- Back to Login -->
                    <div class="mt-6 text-center">
                        <a href="/${locale}/login" class="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                            <i class="fas fa-arrow-left mr-2"></i>
                            ${t('auth.back_to_login', locale)}
                        </a>
                    </div>

                </div>

            </div>

            <!-- Additional Info -->
            <div class="mt-6 text-center text-gray-400 text-sm">
                <p>
                    <i class="fas fa-shield-alt mr-2 text-purple-400"></i>
                    ${locale === 'tr' 
                        ? 'E-postanız güvende ve asla üçüncü taraflarla paylaşılmaz' 
                        : 'Your email is safe and never shared with third parties'}
                </p>
            </div>
            
            <!-- Language Switcher -->
            <div class="flex justify-center items-center space-x-4 mt-6">
                <span class="text-sm text-gray-400">${t('auth.language', locale)}:</span>
                <div class="flex items-center space-x-2 glass-strong px-4 py-2 rounded-xl">
                    <a href="/en/forgot-password" class="px-3 py-1 rounded-lg text-sm font-medium ${locale === 'en' ? 'bg-purple-600' : 'hover:bg-white/5'}">
                        EN
                    </a>
                    <a href="/tr/forgot-password" class="px-3 py-1 rounded-lg text-sm font-medium ${locale === 'tr' ? 'bg-purple-600' : 'hover:bg-white/5'}">
                        TR
                    </a>
                </div>
            </div>
        </div>
    </div>

    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}

    <script>
        const locale = '${locale}';
        const form = document.getElementById('forgotPasswordForm');
        const emailInput = document.getElementById('email');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');

        // Translations
        const translations = {
            en: {
                sending: 'Sending...',
                sendLink: 'Send Reset Link',
                emailSent: 'Email Sent!',
                emailSentText: 'We\'ve sent a password reset link to your email.',
                error: 'Error',
                invalidEmail: 'Please enter a valid email address',
                userNotFound: 'No account found with this email address',
                genericError: 'Something went wrong. Please try again.',
            },
            tr: {
                sending: 'Gönderiliyor...',
                sendLink: 'Sıfırlama Bağlantısı Gönder',
                emailSent: 'E-posta Gönderildi!',
                emailSentText: 'Şifre sıfırlama bağlantısını e-posta adresinize gönderdik.',
                error: 'Hata',
                invalidEmail: 'Lütfen geçerli bir e-posta adresi girin',
                userNotFound: 'Bu e-posta adresiyle kayıtlı hesap bulunamadı',
                genericError: 'Bir şeyler yanlış gitti. Lütfen tekrar deneyin.',
            }
        };

        const t = translations[locale] || translations.en;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Hide messages
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');

            // Validate
            const email = emailInput.value.trim();
            if (!email || !email.includes('@')) {
                showError(t.invalidEmail);
                return;
            }

            // Disable button
            submitBtn.disabled = true;
            btnText.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + t.sending;

            try {
                const response = await fetch('/api/auth/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, locale }),
                });

                const data = await response.json();

                if (data.success) {
                    showSuccess();
                    emailInput.value = '';
                } else {
                    showError(data.error || t.genericError);
                }

            } catch (error) {
                console.error('Forgot password error:', error);
                showError(t.genericError);
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                btnText.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>' + t.sendLink;
            }
        });

        function showSuccess() {
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
        }

        function showError(message) {
            errorText.textContent = message;
            errorMessage.classList.remove('hidden');
            successMessage.classList.add('hidden');
        }
    </script>

</body>
</html>
`;
