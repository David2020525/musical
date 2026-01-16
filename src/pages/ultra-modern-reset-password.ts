import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernResetPasswordHTML = (locale: string = 'en') => `
<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('auth.reset_password', locale)} - MUSICAL</title>
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
        .password-strength {
            height: 4px;
            border-radius: 2px;
            transition: all 0.3s ease;
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
                    🔑
                </div>
                <h1 class="text-3xl font-bold text-white mb-2">
                    ${t('auth.set_new_password', locale)}
                </h1>
                <p class="text-white text-opacity-90">
                    ${t('auth.choose_strong_password', locale)}
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
                                ${t('auth.verification_success', locale)}
                            </h3>
                            <p class="text-green-700 text-sm">
                                ${locale === 'tr' 
                                    ? 'Şifreniz başarıyla değiştirildi. Giriş sayfasına yönlendiriliyorsunuz...' 
                                    : 'Your password has been changed successfully. Redirecting to login...'}
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
                                ${locale === 'tr' ? 'Hata' : 'Error'}
                            </h3>
                            <p class="text-red-700 text-sm" id="errorText"></p>
                        </div>
                    </div>
                </div>

                <!-- Form -->
                <form id="resetPasswordForm" class="space-y-6">
                    
                    <!-- New Password -->
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">
                            <i class="fas fa-lock mr-2 text-purple-600"></i>
                            ${t('auth.new_password', locale)}
                        </label>
                        <div class="relative">
                            <input 
                                type="password" 
                                id="password" 
                                required
                                minlength="8"
                                placeholder="${locale === 'tr' ? 'En az 8 karakter' : 'At least 8 characters'}"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none input-focus transition-all pr-12"
                            >
                            <button 
                                type="button" 
                                id="togglePassword"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                <i class="fas fa-eye" id="eyeIcon"></i>
                            </button>
                        </div>
                        <!-- Password Strength -->
                        <div class="mt-2">
                            <div class="password-strength bg-gray-200" id="strengthBar"></div>
                            <p class="text-xs text-gray-600 mt-1" id="strengthText"></p>
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div>
                        <label class="block text-gray-700 font-medium mb-2">
                            <i class="fas fa-lock mr-2 text-purple-600"></i>
                            ${t('auth.confirm_password', locale)}
                        </label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            required
                            placeholder="${locale === 'tr' ? 'Şifrenizi tekrar girin' : 'Re-enter your password'}"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none input-focus transition-all"
                        >
                    </div>

                    <!-- Submit Button -->
                    <button 
                        type="submit" 
                        id="submitBtn"
                        class="w-full btn-gradient text-white font-semibold py-3 rounded-lg shadow-lg"
                    >
                        <i class="fas fa-check mr-2"></i>
                        <span id="btnText">
                            ${t('auth.reset_password', locale)}
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
    </div>

    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}

    <script>
        const locale = '${locale}';
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        const form = document.getElementById('resetPasswordForm');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        const togglePassword = document.getElementById('togglePassword');
        const eyeIcon = document.getElementById('eyeIcon');

        // Translations
        const translations = {
            en: {
                changing: 'Changing...',
                changePassword: 'Change Password',
                passwordChanged: 'Password Changed!',
                weak: 'Weak',
                fair: 'Fair',
                good: 'Good',
                strong: 'Strong',
                noToken: 'Invalid or missing reset token',
                passwordMismatch: 'Passwords do not match',
                passwordTooShort: 'Password must be at least 8 characters',
                genericError: 'Something went wrong. Please try again.',
            },
            tr: {
                changing: 'Değiştiriliyor...',
                changePassword: 'Şifreyi Değiştir',
                passwordChanged: 'Şifre Değiştirildi!',
                weak: 'Zayıf',
                fair: 'Orta',
                good: 'İyi',
                strong: 'Güçlü',
                noToken: 'Geçersiz veya eksik sıfırlama tokeni',
                passwordMismatch: 'Şifreler eşleşmiyor',
                passwordTooShort: 'Şifre en az 8 karakter olmalıdır',
                genericError: 'Bir şeyler yanlış gitti. Lütfen tekrar deneyin.',
            }
        };

        const t = translations[locale] || translations.en;

        // Check if token exists
        if (!token) {
            showError(t.noToken);
            submitBtn.disabled = true;
        }

        // Toggle password visibility
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            eyeIcon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        });

        // Password strength checker
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const strength = calculatePasswordStrength(password);
            
            // Update strength bar
            strengthBar.style.width = (strength.score * 25) + '%';
            strengthBar.style.backgroundColor = strength.color;
            strengthText.textContent = strength.text;
        });

        function calculatePasswordStrength(password) {
            let score = 0;
            if (!password) return { score: 0, text: '', color: '#e2e8f0' };

            // Length
            if (password.length >= 8) score++;
            if (password.length >= 12) score++;

            // Contains numbers
            if (/\d/.test(password)) score++;

            // Contains special characters or uppercase
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password) || /[A-Z]/.test(password)) score++;

            const levels = [
                { text: t.weak, color: '#ef4444' },
                { text: t.fair, color: '#f59e0b' },
                { text: t.good, color: '#10b981' },
                { text: t.strong, color: '#059669' }
            ];

            return { score, ...levels[Math.min(score, 3)] };
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Hide messages
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');

            // Validate
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (password.length < 8) {
                showError(t.passwordTooShort);
                return;
            }

            if (password !== confirmPassword) {
                showError(t.passwordMismatch);
                return;
            }

            // Disable button
            submitBtn.disabled = true;
            btnText.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + t.changing;

            try {
                const response = await fetch('/api/auth/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, password }),
                });

                const data = await response.json();

                if (data.success) {
                    showSuccess();
                    // Redirect to login after 2 seconds
                    setTimeout(() => {
                        window.location.href = '/${locale}/login';
                    }, 2000);
                } else {
                    showError(data.error || t.genericError);
                    submitBtn.disabled = false;
                    btnText.innerHTML = '<i class="fas fa-check mr-2"></i>' + t.changePassword;
                }

            } catch (error) {
                console.error('Reset password error:', error);
                showError(t.genericError);
                submitBtn.disabled = false;
                btnText.innerHTML = '<i class="fas fa-check mr-2"></i>' + t.changePassword;
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
