// Mobile Navigation Component
// Responsive hamburger menu with touch-optimized design

export const MobileNavigationHTML = `
<style>
/* Mobile Navigation Styles */
#mobile-menu-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 9998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

#mobile-menu-overlay.active {
    opacity: 1;
    pointer-events: auto;
}

#mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 85%;
    max-width: 320px;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(40px) saturate(200%);
    -webkit-backdrop-filter: blur(40px) saturate(200%);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 9999;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    overflow-y: auto;
}

#mobile-menu.active {
    transform: translateX(0);
}

.mobile-menu-item {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    color: #fff;
    text-decoration: none;
    transition: all 0.3s;
    border-left: 3px solid transparent;
    font-size: 1.125rem;
    min-height: 44px; /* Touch target size */
}

.mobile-menu-item:hover,
.mobile-menu-item:active {
    background: rgba(255, 255, 255, 0.05);
    border-left-color: rgb(147, 51, 234);
}

.mobile-menu-item i {
    width: 24px;
    margin-right: 1rem;
    font-size: 1.25rem;
}

#mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    cursor: pointer;
    transition: all 0.3s;
}

#mobile-menu-btn:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: scale(1.05);
}

#mobile-menu-btn:active {
    transform: scale(0.95);
}

.hamburger-icon {
    position: relative;
    width: 20px;
    height: 14px;
}

.hamburger-icon span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: #fff;
    border-radius: 2px;
    transition: all 0.3s;
}

.hamburger-icon span:nth-child(1) {
    top: 0;
}

.hamburger-icon span:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
}

.hamburger-icon span:nth-child(3) {
    bottom: 0;
}

#mobile-menu-btn.active .hamburger-icon span:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
}

#mobile-menu-btn.active .hamburger-icon span:nth-child(2) {
    opacity: 0;
}

#mobile-menu-btn.active .hamburger-icon span:nth-child(3) {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
}

/* Responsive: Hide on desktop */
@media (min-width: 1024px) {
    #mobile-menu-btn {
        display: none;
    }
}
</style>

<!-- Mobile Menu Button -->
<button id="mobile-menu-btn" class="lg:hidden" aria-label="Toggle menu">
    <div class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
    </div>
</button>

<!-- Mobile Menu Overlay -->
<div id="mobile-menu-overlay"></div>

<!-- Mobile Menu -->
<div id="mobile-menu">
    <div class="p-6 border-b border-white/10">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Menu
            </h2>
            <button id="mobile-menu-close" class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <i class="fas fa-times text-xl"></i>
            </button>
        </div>
        
        <!-- Mobile Search -->
        <div class="relative">
            <input 
                type="text" 
                id="mobile-search"
                placeholder="Search..."
                class="w-full px-4 py-3 pl-11 bg-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
    </div>
    
    <nav class="py-4">
        <a href="/en" class="mobile-menu-item">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </a>
        <a href="/en/browse" class="mobile-menu-item">
            <i class="fas fa-music"></i>
            <span>Browse</span>
        </a>
        <a href="/en/forum" class="mobile-menu-item">
            <i class="fas fa-comments"></i>
            <span>Forum</span>
        </a>
        <a href="/en/blog" class="mobile-menu-item">
            <i class="fas fa-blog"></i>
            <span>Blog</span>
        </a>
        <a href="/en/dashboard" class="mobile-menu-item">
            <i class="fas fa-th-large"></i>
            <span>Dashboard</span>
        </a>
        <a href="/en/producer/apply" class="mobile-menu-item">
            <i class="fas fa-user-music"></i>
            <span>Become Producer</span>
        </a>
    </nav>
    
    <div class="border-t border-white/10 p-4">
        <div class="space-y-2">
            <a href="/en/login" class="block w-full px-6 py-3 text-center bg-white/10 rounded-xl hover:bg-white/20 transition-colors font-semibold">
                Login
            </a>
            <a href="/en/register" class="block w-full px-6 py-3 text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:opacity-90 transition-opacity font-semibold">
                Sign Up
            </a>
        </div>
        
        <!-- Language Switcher -->
        <div class="mt-4 flex gap-2">
            <a href="/en" class="flex-1 px-4 py-2 text-center text-sm bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                🇬🇧 EN
            </a>
            <a href="/tr" class="flex-1 px-4 py-2 text-center text-sm bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                🇹🇷 TR
            </a>
        </div>
    </div>
</div>

<script>
(function() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuClose = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const mobileSearch = document.getElementById('mobile-search');
    
    function openMenu() {
        menu.classList.add('active');
        overlay.classList.add('active');
        menuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        menuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    menuBtn.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Mobile search
    mobileSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = mobileSearch.value;
            window.location.href = \`/en/browse?q=\${encodeURIComponent(query)}\`;
        }
    });
    
    // Close menu when clicking menu items
    document.querySelectorAll('.mobile-menu-item').forEach(item => {
        item.addEventListener('click', closeMenu);
    });
    
    // Escape key closes menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            closeMenu();
        }
    });
})();
</script>
`;
