import { Locale, t } from '../lib/i18n';

export interface FooterConfig {
    showNewsletter?: boolean;
}

export function SharedFooterHTML(locale: Locale, config: FooterConfig = {}) {
    const { showNewsletter = true } = config;
    
    return `
    <!-- Shared Footer Component -->
    <footer class="px-6 py-16 border-t border-white/5">
        <div class="max-w-[1400px] mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <!-- Brand Section -->
                <div>
                    <div class="flex items-center space-x-3 mb-6">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <i class="fas fa-music text-white"></i>
                        </div>
                        <span class="text-xl font-bold">MusicHub</span>
                    </div>
                    <p class="text-gray-400 text-sm leading-relaxed">
                        ${t('footer.tagline', locale)}
                    </p>
                </div>
                
                <!-- Platform Links -->
                <div>
                    <h3 class="font-bold mb-4">${t('footer.platform', locale)}</h3>
                    <ul class="space-y-3 text-sm text-gray-400">
                        <li><a href="/${locale}/browse" class="hover:text-white transition">${t('footer.browse_music', locale)}</a></li>
                        <li><a href="/${locale}/producer/apply" class="hover:text-white transition">${t('footer.for_artists', locale)}</a></li>
                        <li><a href="/${locale}/pricing" class="hover:text-white transition">${t('footer.pricing', locale)}</a></li>
                    </ul>
                </div>
                
                <!-- Company Links -->
                <div>
                    <h3 class="font-bold mb-4">${t('footer.company', locale)}</h3>
                    <ul class="space-y-3 text-sm text-gray-400">
                        <li><a href="/${locale}/about" class="hover:text-white transition">${t('footer.about', locale)}</a></li>
                        <li><a href="/${locale}/careers" class="hover:text-white transition">${t('footer.careers', locale)}</a></li>
                        <li><a href="/${locale}/contact" class="hover:text-white transition">${t('footer.contact', locale)}</a></li>
                    </ul>
                </div>
                
                <!-- Social Links -->
                <div>
                    <h3 class="font-bold mb-4">${t('footer.connect', locale)}</h3>
                    <div class="flex space-x-4">
                        <a href="#" class="w-10 h-10 rounded-lg glass-strong flex items-center justify-center hover:bg-white/10 transition">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="w-10 h-10 rounded-lg glass-strong flex items-center justify-center hover:bg-white/10 transition">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="w-10 h-10 rounded-lg glass-strong flex items-center justify-center hover:bg-white/10 transition">
                            <i class="fab fa-youtube"></i>
                        </a>
                        <a href="#" class="w-10 h-10 rounded-lg glass-strong flex items-center justify-center hover:bg-white/10 transition">
                            <i class="fab fa-discord"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            ${showNewsletter ? `
            <!-- Newsletter Section -->
            <div class="mb-12 p-8 glass-strong rounded-2xl">
                <div class="max-w-2xl mx-auto text-center">
                    <h3 class="text-2xl font-bold mb-2">${t('footer.newsletter_title', locale)}</h3>
                    <p class="text-gray-400 mb-6">${t('footer.newsletter_desc', locale)}</p>
                    <form class="flex gap-3 max-w-md mx-auto" onsubmit="return handleNewsletter(event)">
                        <input 
                            type="email" 
                            placeholder="${t('footer.newsletter_placeholder', locale)}"
                            class="flex-1 px-4 py-3 glass-strong rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        >
                        <button type="submit" class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
                            ${t('footer.newsletter_button', locale)}
                        </button>
                    </form>
                </div>
            </div>
            ` : ''}
            
            <!-- Bottom Bar -->
            <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                <p>${t('footer.rights', locale)}</p>
                <div class="flex space-x-6 mt-4 md:mt-0">
                    <a href="/${locale}/privacy" class="hover:text-white transition">${t('footer.privacy', locale)}</a>
                    <a href="/${locale}/terms" class="hover:text-white transition">${t('footer.terms', locale)}</a>
                    <a href="/${locale}/cookies" class="hover:text-white transition">${t('footer.cookies', locale)}</a>
                </div>
            </div>
        </div>
    </footer>
    
    <script>
        function handleNewsletter(event) {
            event.preventDefault();
            const email = event.target.querySelector('input[type="email"]').value;
            // TODO: Send to newsletter API in M2
            alert('Newsletter signup: ' + email + ' (Will be implemented in M2)');
            return false;
        }
    </script>
    `;
}
