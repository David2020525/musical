import { Locale, t } from '../lib/i18n';
import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernRegisterHTML = (locale: Locale = 'en') => `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('auth.register', locale)} - MusicHub</title>
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
                    MusicHub
                </span>
            </a>
            
            <!-- Register Form -->
            <div class="glass-strong rounded-3xl p-8 neon-glow">
                <h2 class="text-3xl font-bold mb-2">${locale === 'tr' ? 'Hesap Oluştur' : 'Create Account'}</h2>
                <p class="text-gray-400 mb-8">${locale === 'tr' ? 'MusicHub topluluğuna katılın' : 'Join the MusicHub community'}</p>
                
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
                
                <form id="register-form" class="space-y-6">
                    <!-- Full Name -->
                    <div>
                        <label class="block text-sm font-semibold text-purple-300 mb-2">
                            <i class="fas fa-user mr-2"></i>${locale === 'tr' ? 'Ad Soyad' : 'Full Name'} *
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            required
                            minlength="2"
                            class="w-full px-4 py-3 modern-input rounded-xl"
                            placeholder="${locale === 'tr' ? 'Adınız ve soyadınız' : 'John Doe'}"
                        >
                    </div>
                    
                    <!-- Username -->
                    <div>
                        <label class="block text-sm font-semibold text-purple-300 mb-2">
                            <i class="fas fa-at mr-2"></i>${locale === 'tr' ? 'Kullanıcı Adı' : 'Username'} *
                        </label>
                        <input 
                            type="text" 
                            id="username" 
                            required
                            minlength="3"
                            maxlength="20"
                            pattern="[a-zA-Z0-9_]+"
                            class="w-full px-4 py-3 modern-input rounded-xl"
                            placeholder="${locale === 'tr' ? 'kullanici_adi' : 'johndoe'}"
                        >
                        <p class="mt-2 text-xs text-gray-400">
                            <i class="fas fa-info-circle mr-1"></i>
                            ${t('auth.username_requirements', locale)}
                        </p>
                    </div>
                    
                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-semibold text-purple-300 mb-2">
                            <i class="fas fa-envelope mr-2"></i>${locale === 'tr' ? 'E-posta' : 'Email'} *
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            required
                            class="w-full px-4 py-3 modern-input rounded-xl"
                            placeholder="${locale === 'tr' ? 'eposta@ornek.com' : 'your@email.com'}"
                        >
                    </div>
                    
                    <!-- Password -->
                    <div>
                        <label class="block text-sm font-semibold text-purple-300 mb-2">
                            <i class="fas fa-lock mr-2"></i>${locale === 'tr' ? 'Şifre' : 'Password'} *
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            required
                            minlength="6"
                            class="w-full px-4 py-3 modern-input rounded-xl"
                            placeholder="••••••••"
                        >
                        <p class="mt-2 text-xs text-gray-400">
                            <i class="fas fa-info-circle mr-1"></i>
                            ${t('auth.password_requirements', locale)}
                        </p>
                    </div>
                    
                    <!-- Producer Checkbox -->
                    <div class="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-4">
                        <label class="flex items-start cursor-pointer group">
                            <input 
                                type="checkbox" 
                                id="is-producer" 
                                class="mt-1 w-5 h-5 rounded border-purple-500 text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 bg-black/50"
                            >
                            <div class="ml-3">
                                <div class="text-sm font-semibold text-purple-300 group-hover:text-purple-200 transition-colors">
                                    <i class="fas fa-microphone mr-2"></i>
                                    ${t('auth.im_producer', locale)}
                                </div>
                                <p class="text-xs text-gray-400 mt-1">
                                    ${t('auth.producer_info', locale)}
                                </p>
                            </div>
                        </label>
                    </div>
                    
                    <!-- Submit Button -->
                    <button 
                        type="submit" 
                        id="submit-btn"
                        class="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105"
                    >
                        <i class="fas fa-user-plus mr-2"></i>${t('auth.create_account', locale)}
                    </button>
                    
                    <!-- Login Link -->
                    <p class="text-center text-sm text-gray-400">
                        ${t('auth.already_have_account', locale)}
                        <a href="/${locale}/login" class="text-purple-400 hover:text-purple-300 font-semibold">
                            ${t('auth.login', locale)}
                        </a>
                    </p>
                </form>
            </div>
            
            <!-- Language Switcher -->
            <div class="flex justify-center items-center space-x-4 mt-8">
                <span class="text-sm text-gray-400">${t('auth.language', locale)}:</span>
                <div class="flex items-center space-x-2 glass-strong px-4 py-2 rounded-xl">
                    <a href="/en/register" class="px-3 py-1 rounded-lg text-sm font-medium ${locale === 'en' ? 'bg-purple-600' : 'hover:bg-white/5'}">
                        EN
                    </a>
                    <a href="/tr/register" class="px-3 py-1 rounded-lg text-sm font-medium ${locale === 'tr' ? 'bg-purple-600' : 'hover:bg-white/5'}">
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
                registering: 'Creating account...',
                success: 'Registration successful! Redirecting to login...',
                userExists: 'User already exists',
                invalidUsername: 'Username can only contain letters, numbers and underscores',
                usernameTooShort: 'Username must be at least 3 characters',
                usernameTooLong: 'Username must be less than 20 characters',
                invalidEmail: 'Invalid email address',
                passwordTooShort: 'Password must be at least 6 characters',
                nameTooShort: 'Name must be at least 2 characters',
                registrationFailed: 'Registration failed. Please try again.',
                networkError: 'Network error. Please check your connection.'
            },
            tr: {
                registering: 'Hesap oluşturuluyor...',
                success: 'Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...',
                userExists: 'Kullanıcı zaten mevcut',
                invalidUsername: 'Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir',
                usernameTooShort: 'Kullanıcı adı en az 3 karakter olmalı',
                usernameTooLong: 'Kullanıcı adı 20 karakterden az olmalı',
                invalidEmail: 'Geçersiz e-posta adresi',
                passwordTooShort: 'Şifre en az 6 karakter olmalı',
                nameTooShort: 'Ad en az 2 karakter olmalı',
                registrationFailed: 'Kayıt başarısız. Lütfen tekrar deneyin.',
                networkError: 'Ağ hatası. Lütfen bağlantınızı kontrol edin.'
            }
        };
        
        const t = translations[locale];
        
        const form = document.getElementById('register-form');
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
            
            const name = document.getElementById('name').value.trim();
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const isProducer = document.getElementById('is-producer').checked;
            
            // Client-side validation
            if (name.length < 2) {
                showError(t.nameTooShort);
                return;
            }
            
            if (username.length < 3) {
                showError(t.usernameTooShort);
                return;
            }
            
            if (username.length > 20) {
                showError(t.usernameTooLong);
                return;
            }
            
            if (!/^[a-zA-Z0-9_]+$/.test(username)) {
                showError(t.invalidUsername);
                return;
            }
            
            if (password.length < 6) {
                showError(t.passwordTooShort);
                return;
            }
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + t.registering;
            
            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        name, 
                        username, 
                        email, 
                        password 
                    })
                });
                
                const data = await res.json();
                
                if (data.success) {
                    // Store token and user data
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('user', JSON.stringify(data.data.user));
                    
                    // Show success message
                    if (isProducer) {
                        showSuccess(locale === 'tr' 
                            ? 'Kayıt başarılı! Üretici başvuru sayfasına yönlendiriliyorsunuz...' 
                            : 'Registration successful! Redirecting to producer application...');
                    } else {
                        showSuccess(t.success);
                    }
                    
                    // Redirect after 1.5 seconds
                    setTimeout(() => {
                        if (isProducer) {
                            window.location.href = '/' + locale + '/producer/apply';
                        } else {
                            window.location.href = '/' + locale + '/login';
                        }
                    }, 1500);
                } else {
                    // Show server error
                    let errorMsg = data.error || t.registrationFailed;
                    
                    // Translate common errors
                    if (errorMsg.includes('already exists')) {
                        errorMsg = t.userExists;
                    } else if (errorMsg.includes('Username')) {
                        if (errorMsg.includes('at least 3')) errorMsg = t.usernameTooShort;
                        else if (errorMsg.includes('less than 20')) errorMsg = t.usernameTooLong;
                        else if (errorMsg.includes('only contain')) errorMsg = t.invalidUsername;
                    } else if (errorMsg.includes('email')) {
                        errorMsg = t.invalidEmail;
                    } else if (errorMsg.includes('Password')) {
                        errorMsg = t.passwordTooShort;
                    } else if (errorMsg.includes('Name')) {
                        errorMsg = t.nameTooShort;
                    }
                    
                    showError(errorMsg);
                    
                    // Re-enable submit button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-user-plus mr-2"></i>' + 
                        (locale === 'tr' ? 'Hesap Oluştur' : 'Create Account');
                }
            } catch (error) {
                console.error('Registration error:', error);
                showError(t.networkError);
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-user-plus mr-2"></i>' + 
                    (locale === 'tr' ? 'Hesap Oluştur' : 'Create Account');
            }
        });
    </script>
    
    <!-- Global Audio Player -->
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
</body>
</html>
`;
