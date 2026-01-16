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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        * {
            font-family: 'Inter', sans-serif;
        }
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .glass {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .glass-strong {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .btn-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: all 0.3s ease;
        }
        .btn-gradient:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }
        .input-focus:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
    </style>
</head>
<body class="flex items-center justify-center p-4">
    
    <div class="w-full max-w-md">
        <!-- Card -->
        <div class="glass-strong rounded-2xl shadow-2xl overflow-hidden">
            
            <!-- Header -->
            <div class="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-center">
                <div class="text-white text-5xl mb-4">
                    🔐
                </div>
                <h1 class="text-3xl font-bold text-white mb-2">
                    ${t('auth.forgot_password', locale)}
                </h1>
                <p class="text-white text-opacity-90">
                    ${t('auth.reset_password_desc', locale)}
                </p>
            </div>

            <!-- Content -->
            <div class="p-8">
                
                <!-- Success Message (hidden by default) -->
                <div id="successMessage" class="hidden mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div class="flex items-start">
                        <i class="fas fa-check-circle text-green-500 text-xl mr-3 mt-0.5"></i>
                        <div>
                            <h3 class="font-semibold text-green-900 mb-1">
                                ${t('auth.email_sent', locale)}
                            </h3>
                            <p class="text-green-700 text-sm" id="successText">
                                ${t('auth.check_inbox', locale)}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Error Message (hidden by default) -->
                <div id="errorMessage" class="hidden mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div class="flex items-start">
                        <i class="fas fa-exclamation-circle text-red-500 text-xl mr-3 mt-0.5"></i>
                        <div>
                            <h3 class="font-semibold text-red-900 mb-1">
                                ${t('common.error', locale)}
                            </h3>
                            <p class="text-red-700 text-sm" id="errorText"></p>
                        </div>
                    </div>
                </div>

                <!-- Form -->
                <form id="forgotPasswordForm" class="space-y-6">
                    
                    <!-- Email -->
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">
                            <i class="fas fa-envelope mr-2 text-purple-600"></i>
                            ${t('auth.email', locale)}
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            required
                            placeholder="${t('auth.email_placeholder', locale)}"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none input-focus transition-all"
                        >
                    </div>

                    <!-- Submit Button -->
                    <button 
                        type="submit" 
                        id="submitBtn"
                        class="w-full btn-gradient text-white font-semibold py-3 rounded-lg shadow-lg"
                    >
                        <i class="fas fa-paper-plane mr-2"></i>
                        <span id="btnText">
                            ${t('auth.send_reset_link', locale)}
                        </span>
                    </button>

                </form>

                <!-- Back to Login -->
                <div class="mt-6 text-center">
                    <a href="/${locale}/login" class="text-purple-600 hover:text-purple-700 font-medium">
                        <i class="fas fa-arrow-left mr-2"></i>
                        ${t('auth.back_to_login', locale)}
                    </a>
                </div>

            </div>

        </div>

        <!-- Additional Info -->
        <div class="mt-6 text-center text-white text-sm">
            <p class="opacity-90">
                ${locale === 'tr' 
                    ? '🔒 E-postanız güvende ve asla üçüncü taraflarla paylaşılmaz' 
                    : '🔒 Your email is safe and never shared with third parties'}
            </p>
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
