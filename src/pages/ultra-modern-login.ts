import { Locale, t } from '../lib/i18n';
import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernLoginHTML = (locale: Locale = 'en') => `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('auth.login', locale)} - MUSICAL</title>
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
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .modern-input {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #fff;
            transition: all 0.3s ease;
        }
        
        .modern-input:focus {
            outline: none;
            border-color: rgba(147, 51, 234, 0.5);
            background: rgba(255, 255, 255, 0.05);
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.2);
        }
        
        .modern-input::placeholder {
            color: rgba(255, 255, 255, 0.3);
        }
        
        .neon-glow {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.3),
                        0 0 40px rgba(147, 51, 234, 0.1);
        }
        
        .error-message {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 0.75rem;
            padding: 1rem;
            color: #fca5a5;
        }
        
        .success-message {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
            border-radius: 0.75rem;
            padding: 1rem;
            color: #86efac;
        }
    </style>
</head>
<body>
    <div class="gradient-mesh"></div>
    
    <div class="min-h-screen flex items-center justify-center p-6">
        <div class="w-full max-w-md">
            <!-- Logo -->
            <a href="/${locale}" class="flex items-center justify-center space-x-3 mb-12">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center neon-glow">
                    <i class="fas fa-music text-white text-2xl"></i>
                </div>
                <span class="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    MUSICAL
                </span>
            </a>
            
            <!-- Login Form -->
            <div class="glass-strong rounded-3xl p-8 neon-glow">
                <h2 class="text-3xl font-bold mb-2">${t('auth.welcome_back', locale)}</h2>
                <p class="text-gray-400 mb-8">${t('auth.login_to_account', locale)}</p>
                
                <!-- Error/Success Messages -->
                <div id="error-message" class="hidden error-message mb-6">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-exclamation-circle"></i>
                        <span id="error-text"></span>
                    </div>
                </div>
                
                <div id="success-message" class="hidden success-message mb-6">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-check-circle"></i>
                        <span id="success-text"></span>
                    </div>
                </div>
                
                <form id="login-form" class="space-y-6">
                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-semibold text-purple-300 mb-2">
                            <i class="fas fa-envelope mr-2"></i>${t('auth.email', locale)}
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            required
                            class="w-full px-4 py-3 modern-input rounded-xl"
                            placeholder="${t('auth.email_placeholder', locale)}"
                        >
                    </div>
                    
                    <!-- Password -->
                    <div>
                        <label class="block text-sm font-semibold text-purple-300 mb-2">
                            <i class="fas fa-lock mr-2"></i>${t('auth.password', locale)}
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            required
                            class="w-full px-4 py-3 modern-input rounded-xl"
                            placeholder="••••••••"
                        >
                    </div>
                    
                    <!-- Forgot Password Link -->
                    <div class="flex justify-end">
                        <a href="/${locale}/forgot-password" class="text-sm text-purple-400 hover:text-purple-300">
                            ${t('auth.forgot_password', locale)}
                        </a>
                    </div>
                    
                    <!-- Submit Button -->
                    <button 
                        type="submit" 
                        id="submit-btn"
                        class="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105"
                    >
                        <i class="fas fa-sign-in-alt mr-2"></i>${t('auth.login', locale)}
                    </button>
                    
                    <!-- Register Link -->
                    <p class="text-center text-sm text-gray-400">
                        ${t('auth.dont_have_account', locale)}
                        <a href="/${locale}/register" class="text-purple-400 hover:text-purple-300 font-semibold">
                            ${t('auth.register', locale)}
                        </a>
                    </p>
                </form>
                
            </div>
            
            <!-- Language Switcher -->
            <div class="flex justify-center items-center space-x-4 mt-8">
                <span class="text-sm text-gray-400">${t('auth.language', locale)}:</span>
                <div class="flex items-center space-x-2 glass-strong px-4 py-2 rounded-xl">
                    <a href="/en/login" class="px-3 py-1 rounded-lg text-sm font-medium ${locale === 'en' ? 'bg-purple-600' : 'hover:bg-white/5'}">
                        EN
                    </a>
                    <a href="/tr/login" class="px-3 py-1 rounded-lg text-sm font-medium ${locale === 'tr' ? 'bg-purple-600' : 'hover:bg-white/5'}">
                        TR
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        const locale = '${locale}';
        
        const translations = {
            en: {
                loggingIn: 'Logging in...',
                success: 'Login successful! Redirecting...',
                invalidCredentials: 'Invalid email or password',
                emailRequired: 'Email is required',
                passwordRequired: 'Password is required',
                loginFailed: 'Login failed. Please try again.',
                networkError: 'Network error. Please check your connection.'
            },
            tr: {
                loggingIn: 'Giriş yapılıyor...',
                success: 'Giriş başarılı! Yönlendiriliyor...',
                invalidCredentials: 'Geçersiz e-posta veya şifre',
                emailRequired: 'E-posta gerekli',
                passwordRequired: 'Şifre gerekli',
                loginFailed: 'Giriş başarısız. Lütfen tekrar deneyin.',
                networkError: 'Ağ hatası. Lütfen bağlantınızı kontrol edin.'
            }
        };
        
        const t = translations[locale];
        
        const form = document.getElementById('login-form');
        const submitBtn = document.getElementById('submit-btn');
        const errorMessage = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');
        const successMessage = document.getElementById('success-message');
        const successText = document.getElementById('success-text');
        
        function showError(message) {
            errorText.textContent = message;
            errorMessage.classList.remove('hidden');
            successMessage.classList.add('hidden');
        }
        
        function showSuccess(message) {
            successText.textContent = message;
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
        }
        
        function hideMessages() {
            errorMessage.classList.add('hidden');
            successMessage.classList.add('hidden');
        }
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideMessages();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            // Client-side validation
            if (!email) {
                showError(t.emailRequired);
                return;
            }
            
            if (!password) {
                showError(t.passwordRequired);
                return;
            }
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + t.loggingIn;
            
            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        email, 
                        password 
                    })
                });
                
                const data = await res.json();
                
                if (data.success) {
                    // Store token and user data
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('user', JSON.stringify(data.data.user));
                    
                    showSuccess(t.success);
                    
                    // Redirect after 1 second
                    setTimeout(() => {
                        window.location.href = '/' + locale + '/dashboard';
                    }, 1000);
                } else {
                    // Show server error
                    let errorMsg = data.error || t.loginFailed;
                    
                    // Translate common errors
                    if (errorMsg.includes('Invalid credentials') || errorMsg.includes('Invalid')) {
                        errorMsg = t.invalidCredentials;
                    }
                    
                    showError(errorMsg);
                    
                    // Re-enable submit button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>' + 
                        (locale === 'tr' ? 'Giriş Yap' : 'Login');
                }
            } catch (error) {
                console.error('Login error:', error);
                showError(t.networkError);
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>' + 
                    (locale === 'tr' ? 'Giriş Yap' : 'Login');
            }
        });
    </script>
    
    <!-- Global Audio Player -->
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
</body>
</html>
`;
