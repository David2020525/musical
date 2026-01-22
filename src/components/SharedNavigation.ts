import { Locale, t } from '../lib/i18n';

export interface NavConfig {
    currentPage?: string;
    showSearch?: boolean;
    showAuth?: boolean;
    showLogout?: boolean;  // For authenticated pages like dashboard
}

export function SharedNavigationHTML(locale: Locale, config: NavConfig = {}) {
    const {
        currentPage = 'home',
        showSearch = true,
        showAuth = true,
        showLogout = false
    } = config;
    
    const otherLocale = locale === 'en' ? 'tr' : 'en';
    const otherLocaleName = locale === 'en' ? 'Türkçeye geç' : 'Switch to English';
    
    // Build locale-switched URL based on current page
    const getLocaleSwitchUrl = () => {
        if (currentPage === 'home') {
            return `/${otherLocale}`;
        }
        return `/${otherLocale}/${currentPage}`;
    };
    
    return `
    <style>
        /* Glass-strong styling for navigation and dropdowns */
        .glass-strong {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(40px) saturate(200%);
            -webkit-backdrop-filter: blur(40px) saturate(200%);
            border: 1px solid rgba(255, 255, 255, 0.12);
        }
        
        /* User profile dropdown - ensure transparent glass effect */
        .user-dropdown {
            background: rgba(255, 255, 255, 0.08) !important;
            backdrop-filter: blur(40px) saturate(200%) !important;
            -webkit-backdrop-filter: blur(40px) saturate(200%) !important;
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
        }
        
        #authSection .user-dropdown {
            background: rgba(255, 255, 255, 0.08) !important;
            backdrop-filter: blur(40px) saturate(200%) !important;
            -webkit-backdrop-filter: blur(40px) saturate(200%) !important;
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
        }
        
        /* Override browser autofill/autocomplete background color */
        #navSearch:-webkit-autofill,
        #navSearch:-webkit-autofill:hover,
        #navSearch:-webkit-autofill:focus,
        #navSearch:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0.08) inset !important;
            -webkit-text-fill-color: #ffffff !important;
            background-color: rgba(255, 255, 255, 0.08) !important;
            background: rgba(255, 255, 255, 0.08) !important;
            transition: background-color 5000s ease-in-out 0s;
        }
    </style>
    <!-- Shared Navigation Component -->
    <nav class="fixed top-0 w-full z-50 glass-strong border-b border-white/5">
        <div class="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
            <!-- Logo -->
            <a href="/${locale}" class="flex items-center space-x-2">
                <img src="/logo.svg" alt="MUSICAL" class="h-11 drop-shadow-lg">
            </a>
            
            ${showSearch ? `
            <!-- Center Search -->
            <div class="hidden lg:flex flex-1 max-w-md mx-8">
                <div class="relative w-full">
                    <input 
                        type="text" 
                        id="navSearch"
                        placeholder="${t('home.search_placeholder', locale)}"
                        class="w-full px-4 py-2.5 pl-11 pr-4 glass-strong rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all border border-white/10 focus:border-purple-500/50 backdrop-blur-xl text-sm"
                    >
                    <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 focus-within:text-pink-400 transition-colors text-sm"></i>
                </div>
            </div>
            ` : ''}
            
            <!-- Navigation Links -->
            <div class="hidden lg:flex items-center space-x-6">
                <a href="/${locale}/browse" class="text-white/70 hover:text-white transition-colors ${currentPage === 'browse' ? 'text-white font-semibold' : ''}">${t('nav.browse', locale)}</a>
                <a href="/${locale}/forum" class="text-white/70 hover:text-white transition-colors ${currentPage === 'forum' ? 'text-white font-semibold' : ''}">${t('nav.forum', locale)}</a>
                <a href="/${locale}/blog" class="text-white/70 hover:text-white transition-colors ${currentPage === 'blog' ? 'text-white font-semibold' : ''}">${t('nav.blog', locale)}</a>
                <a href="/${locale}/dashboard" class="text-white/70 hover:text-white transition-colors ${currentPage === 'dashboard' ? 'text-white font-semibold' : ''}">${t('nav.dashboard', locale)}</a>
                
                <!-- Language Switcher -->
                <a 
                    href="${getLocaleSwitchUrl()}" 
                    class="px-3 py-1 glass-strong rounded-lg hover:bg-white/10 transition-all flex items-center space-x-2"
                    title="${otherLocaleName}">
                    <i class="fas fa-globe text-sm"></i>
                    <span>${otherLocale.toUpperCase()}</span>
                </a>
                
                ${showAuth ? `
                <!-- Auth Section -->
                <div id="authSection" class="hidden lg:block">
                    <a href="/${locale}/login" class="px-4 py-2 glass-strong rounded-xl hover:bg-white/10 transition-all text-sm">
                        ${t('nav.login', locale)}
                    </a>
                </div>
                ` : ''}
                
                ${showLogout ? `
                <!-- Logout Button (for authenticated pages) -->
                <button onclick="logout()" class="px-6 py-2.5 glass-strong rounded-xl hover:bg-white/10 transition-all text-sm">
                    ${t('nav.logout', locale)}
                </button>
                ` : ''}
            </div>
            
            <!-- Mobile Menu Toggle -->
            <button id="mobileMenuToggle" class="lg:hidden">
                <i class="fas fa-bars text-2xl"></i>
            </button>
        </div>
    </nav>
    `;
}

export function SharedNavigationScript(locale: Locale) {
    return `
    <script>
        (function() {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user') || 'null');
            
            if (token && user) {
                const authSection = document.getElementById('authSection');
                if (authSection) {
                    // Escape user data to prevent XSS
                    function escapeHtml(text) {
                        if (!text) return '';
                        const div = document.createElement('div');
                        div.textContent = text;
                        return div.innerHTML;
                    }
                    const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U';
                    const safeUserName = escapeHtml(user.name || 'User');
                    authSection.innerHTML = '<div class="relative group">' +
                        '<button class="flex items-center space-x-2 px-2.5 py-1.5 glass-strong rounded-lg hover:bg-white/10 transition-all">' +
                        '<div class="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-xs">' +
                        userInitial +
                        '</div>' +
                        '<span class="hidden md:block text-xs font-normal text-white/80">' + safeUserName + '</span>' +
                        '<i class="fas fa-chevron-down text-[10px] text-white/60"></i>' +
                        '</button>' +
                        '<div class="hidden group-hover:block absolute right-0 mt-2 w-36 rounded-lg py-1.5 z-50 shadow-xl user-dropdown" style="background: rgba(255, 255, 255, 0.08) !important; backdrop-filter: blur(40px) saturate(200%) !important; -webkit-backdrop-filter: blur(40px) saturate(200%) !important; border: 1px solid rgba(255, 255, 255, 0.12) !important;">' +
                        '<a href="/${locale}/dashboard" class="block px-3 py-2 hover:bg-white/10 transition-all text-xs text-white/90 hover:text-white whitespace-nowrap">' +
                        '<i class="fas fa-chart-line mr-2 text-purple-400 text-xs"></i>${t('nav.dashboard', locale)}' +
                        '</a>' +
                        '<a href="/${locale}/profile" class="block px-3 py-2 hover:bg-white/10 transition-all text-xs text-white/90 hover:text-white whitespace-nowrap">' +
                        '<i class="fas fa-user mr-2 text-blue-400 text-xs"></i>${t('profile.edit', locale)}' +
                        '</a>' +
                        '<div class="border-t border-white/10 my-1"></div>' +
                        '<button onclick="logout()" class="block w-full text-left px-3 py-2 hover:bg-white/10 transition-all text-xs text-red-400 whitespace-nowrap">' +
                        '<i class="fas fa-sign-out-alt mr-2 text-xs"></i>${t('nav.logout', locale)}' +
                        '</button>' +
                        '</div>' +
                        '</div>';
                }
            }
            
            window.logout = function() {
                localStorage.clear();
                window.location.href = '/${locale}';
            };
            
            // Search functionality
            const navSearchInput = document.getElementById('navSearch');
            if (navSearchInput) {
                navSearchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        const query = e.target.value.trim();
                        if (query.length >= 2) {
                            window.location.href = '/${locale}/browse?q=' + encodeURIComponent(query);
                        }
                    }
                });
                
                // Keyboard shortcut (Cmd/Ctrl + K) to focus search
                document.addEventListener('keydown', (e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                        e.preventDefault();
                        navSearchInput.focus();
                    }
                });
            }
        })();
    </script>
    `;
}
