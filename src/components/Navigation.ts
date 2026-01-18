import { Locale } from '../lib/i18n';

export function NavigationHTML(currentPage: string = 'home') {
    return `
    <!-- Navigation Bar - Shared Component -->
    <nav class="fixed top-0 w-full z-50 glass-strong border-b border-white/5">
        <div class="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
            <!-- Logo -->
            <a href="/" class="flex items-center space-x-3" data-i18n-link="home">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <i class="fas fa-music text-white text-xl"></i>
                </div>
                <span class="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">MUSICAL</span>
            </a>
            
            <!-- Center Search -->
            <div class="hidden lg:flex flex-1 max-w-md mx-8">
                <div class="relative w-full group">
                    <input 
                        type="text" 
                        id="navSearch"
                        data-i18n-placeholder="home.search_placeholder"
                        placeholder="Search tracks, artists..."
                        class="w-full px-4 py-2.5 pl-11 pr-4 glass-strong rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all border border-white/10 hover:border-purple-500/30 focus:border-purple-500/50 backdrop-blur-xl text-sm"
                    >
                    <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-pink-400 transition-colors text-sm"></i>
                </div>
            </div>
            
            <!-- Navigation Links -->
            <div class="hidden lg:flex items-center space-x-6">
                <a href="/browse" data-i18n-link="browse" data-i18n="nav.browse" class="text-white/70 hover:text-white transition-colors ${currentPage === 'browse' ? 'text-white font-semibold' : ''}">Browse</a>
                <a href="/forum" data-i18n-link="forum" data-i18n="nav.forum" class="text-white/70 hover:text-white transition-colors ${currentPage === 'forum' ? 'text-white font-semibold' : ''}">Forum</a>
                <a href="/blog" data-i18n-link="blog" data-i18n="nav.blog" class="text-white/70 hover:text-white transition-colors ${currentPage === 'blog' ? 'text-white font-semibold' : ''}">Blog</a>
                <a href="/dashboard" data-i18n-link="dashboard" data-i18n="nav.dashboard" class="text-white/70 hover:text-white transition-colors ${currentPage === 'dashboard' ? 'text-white font-semibold' : ''}">Dashboard</a>
                
                <!-- Language Switcher -->
                <button 
                    id="languageSwitcher"
                    class="px-3 py-1 glass-strong rounded-lg hover:bg-white/10 transition-all flex items-center space-x-2"
                    title="Switch language">
                    <i class="fas fa-globe text-sm"></i>
                    <span id="currentLangLabel">EN</span>
                </button>
                
                <!-- Auth Section -->
                <div id="authSection" class="hidden lg:block">
                    <!-- Will be populated by JavaScript -->
                    <a href="/login" data-i18n-link="login" class="px-4 py-2 glass-strong rounded-xl hover:bg-white/10 transition-all text-sm" data-i18n="nav.login">
                        Login
                    </a>
                </div>
            </div>
            
            <!-- Mobile Menu Toggle -->
            <button id="mobileMenuToggle" class="lg:hidden">
                <i class="fas fa-bars text-2xl"></i>
            </button>
        </div>
    </nav>
    `;
}

export function NavigationScript() {
    return `
    <script>
        // Navigation i18n and auth handler
        (function() {
            // Get current locale from localStorage or URL
            let currentLocale = localStorage.getItem('locale') || 'en';
            const pathMatch = window.location.pathname.match(/^\\/(en|tr)/);
            if (pathMatch) {
                currentLocale = pathMatch[1];
                localStorage.setItem('locale', currentLocale);
            }
            
            // Update language label
            document.getElementById('currentLangLabel').textContent = currentLocale.toUpperCase();
            
            // Language switcher handler
            document.getElementById('languageSwitcher').addEventListener('click', function() {
                const newLocale = currentLocale === 'en' ? 'tr' : 'en';
                localStorage.setItem('locale', newLocale);
                
                // Update URL with new locale
                const path = window.location.pathname;
                const newPath = path.replace(/^\\/(en|tr)/, '/' + newLocale).replace(/^\\/\\//, '/');
                window.location.href = newPath || '/' + newLocale;
            });
            
            // Update all i18n links with current locale
            document.querySelectorAll('[data-i18n-link]').forEach(link => {
                const page = link.getAttribute('data-i18n-link');
                let href = link.getAttribute('href');
                
                // Add locale prefix if not present
                if (!href.match(/^\\/(en|tr)/)) {
                    if (href === '/') {
                        href = '/' + currentLocale;
                    } else {
                        href = '/' + currentLocale + href;
                    }
                    link.setAttribute('href', href);
                }
            });
            
            // Auth check
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user') || 'null');
            
            if (token && user) {
                // Load translations for auth menu
                fetch('/api/translations/' + currentLocale)
                    .then(r => r.json())
                    .catch(() => ({}))
                    .then(translations => {
                        const t = (key) => translations[key] || key.split('.').pop();
                        
                        document.getElementById('authSection').innerHTML = \`
                            <div class="relative group">
                                <button class="flex items-center space-x-2 px-2.5 py-1.5 glass-strong rounded-lg hover:bg-white/10 transition-all">
                                    <div class="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-xs">
                                        \${user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span class="hidden md:block text-xs font-normal text-white/80">\${user.name}</span>
                                    <i class="fas fa-chevron-down text-[10px] text-white/60"></i>
                                </button>
                                <div class="hidden group-hover:block absolute right-0 mt-2 w-36 glass-strong rounded-lg py-1.5 z-50 shadow-xl border border-white/10">
                                    <a href="/\${currentLocale}/dashboard" class="block px-3 py-2 hover:bg-white/10 transition-all text-xs text-white/90 hover:text-white whitespace-nowrap">
                                        <i class="fas fa-chart-line mr-2 text-purple-400 text-xs"></i>\${t('nav.dashboard')}
                                    </a>
                                    <a href="/\${currentLocale}/profile" class="block px-3 py-2 hover:bg-white/10 transition-all text-xs text-white/90 hover:text-white whitespace-nowrap">
                                        <i class="fas fa-user mr-2 text-blue-400 text-xs"></i>\${t('home.profile')}
                                    </a>
                                    <div class="border-t border-white/10 my-1"></div>
                                    <button onclick="logout()" class="block w-full text-left px-3 py-2 hover:bg-white/10 transition-all text-xs text-red-400 whitespace-nowrap">
                                        <i class="fas fa-sign-out-alt mr-2 text-xs"></i>\${t('home.logout')}
                                    </button>
                                </div>
                            </div>
                        \`;
                    });
            }
            
            function logout() {
                localStorage.clear();
                window.location.href = '/' + currentLocale;
            }
            
            window.logout = logout;
        })();
    </script>
    `;
}
