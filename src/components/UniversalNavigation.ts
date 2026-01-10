import { t, Locale } from '../lib/i18n';

export function UniversalNavigationHTML(locale: Locale = 'en', currentPage: string = 'home') {
    const otherLocale = locale === 'en' ? 'tr' : 'en';
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const pathWithoutLocale = currentPath.replace(/^\/(en|tr)/, '');
    
    return `
    <nav class="fixed top-0 w-full z-50 glass-strong border-b border-white/5">
        <div class="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
            <!-- Logo -->
            <a href="/${locale}" class="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform">
                MusicHub
            </a>
            
            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center gap-6">
                <a href="/${locale}" class="${currentPage === 'home' ? 'text-white font-semibold' : 'text-white/60'} hover:text-white transition-colors">
                    ${t('nav.home', locale)}
                </a>
                <a href="/${locale}/browse" class="${currentPage === 'browse' ? 'text-white font-semibold' : 'text-white/60'} hover:text-white transition-colors">
                    ${t('nav.browse', locale)}
                </a>
                <a href="/${locale}/forum" class="${currentPage === 'forum' ? 'text-white font-semibold' : 'text-white/60'} hover:text-white transition-colors">
                    ${t('nav.forum', locale)}
                </a>
                <a href="/${locale}/blog" class="${currentPage === 'blog' ? 'text-white font-semibold' : 'text-white/60'} hover:text-white transition-colors">
                    ${t('nav.blog', locale)}
                </a>
                <a href="/${locale}/dashboard" class="${currentPage === 'dashboard' ? 'text-white font-semibold' : 'text-white/60'} hover:text-white transition-colors">
                    ${t('nav.dashboard', locale)}
                </a>
            </div>
            
            <!-- Right Actions -->
            <div class="flex items-center gap-4">
                <!-- Language Switcher -->
                <a 
                    href="/${otherLocale}${pathWithoutLocale || '/'}" 
                    class="px-4 py-2 rounded-xl glass hover:glass-strong transition-all font-semibold flex items-center gap-2"
                    title="${locale === 'en' ? 'Türkçe\'ye geç' : 'Switch to English'}"
                >
                    <i class="fas fa-globe"></i>
                    <span class="hidden sm:inline">${otherLocale.toUpperCase()}</span>
                </a>
                
                <!-- Auth Section -->
                <div id="auth-nav" class="hidden"></div>
                
                <a href="/${locale}/login" id="login-link" class="px-6 py-2.5 rounded-xl glass hover:glass-strong transition-all">
                    ${t('nav.login', locale)}
                </a>
                <a href="/${locale}/register" id="register-link" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all font-semibold">
                    ${t('nav.register', locale)}
                </a>
            </div>
        </div>
    </nav>
    
    <script>
        // Check authentication and update nav
        (function() {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user') || 'null');
            
            if (token && user) {
                // User is logged in
                const authNav = document.getElementById('auth-nav');
                const loginLink = document.getElementById('login-link');
                const registerLink = document.getElementById('register-link');
                
                if (authNav && loginLink && registerLink) {
                    authNav.classList.remove('hidden');
                    authNav.innerHTML = \`
                        <div class="flex items-center gap-3">
                            <a href="/${locale}/dashboard" class="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:glass-strong transition-all">
                                <i class="fas fa-user-circle"></i>
                                <span class="hidden sm:inline">\${user.username || user.email.split('@')[0]}</span>
                            </a>
                            <button 
                                onclick="logout()" 
                                class="px-4 py-2 rounded-xl glass hover:glass-strong transition-all"
                                title="${t('nav.logout', locale)}"
                            >
                                <i class="fas fa-sign-out-alt"></i>
                            </button>
                        </div>
                    \`;
                    
                    loginLink.style.display = 'none';
                    registerLink.style.display = 'none';
                }
            }
        })();
        
        function logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/${locale}';
        }
    </script>
    `;
}
