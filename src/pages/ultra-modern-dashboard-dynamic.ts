import { Locale, t } from '../lib/i18n';
import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernDashboardDynamicHTML = (locale: Locale) => {
  const _ = (key: string) => t(key, locale);
  const otherLocale = locale === 'en' ? 'tr' : 'en';
  
  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${_('dashboard.title')} - MusicHub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Inter', sans-serif; }
        body {
            background: #000000;
            background-image: 
                radial-gradient(at 0% 0%, rgba(147, 51, 234, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.15) 0px, transparent 50%);
            background-attachment: fixed;
        }
        .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.08); }
        .glass-strong { background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(40px); border: 1px solid rgba(255, 255, 255, 0.12); }
        .card-3d { transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .card-3d:hover { transform: translateY(-8px); }
        .skeleton { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
        }
    </style>
</head>
<body class="text-white pb-32">
    <nav class="fixed top-0 w-full z-50 glass-strong border-b border-white/5">
        <div class="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
            <a href="/${locale}" class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <i class="fas fa-music text-white text-xl"></i>
                </div>
                <span class="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">MusicHub</span>
            </a>
            <div class="flex items-center space-x-6">
                <a href="/${locale}" class="text-gray-300 hover:text-white">${_('nav.home')}</a>
                <a href="/${locale}/browse" class="text-gray-300 hover:text-white">${_('nav.browse')}</a>
                <a href="/${locale}/forum" class="text-gray-300 hover:text-white">${_('nav.forum')}</a>
                <a href="/${locale}/blog" class="text-gray-300 hover:text-white">${_('nav.blog')}</a>
                <a href="/${locale}/dashboard" class="text-white font-semibold">${_('nav.dashboard')}</a>
                <!-- Language Switcher -->
                <a 
                    href="/${otherLocale}/dashboard" 
                    class="px-4 py-2 rounded-xl glass hover:glass-strong transition-all font-semibold flex items-center gap-2"
                    title="${locale === 'en' ? 'Türkçeye geç' : 'Switch to English'}"
                >
                    <i class="fas fa-globe"></i>
                    <span class="hidden sm:inline">${otherLocale.toUpperCase()}</span>
                </a>
                <button onclick="logout()" class="px-6 py-2.5 glass rounded-xl hover:bg-white/10">${_('auth.logout')}</button>
            </div>
        </div>
    </nav>
    
    <div class="pt-28 px-6 pb-32">
        <div class="max-w-[1400px] mx-auto">
            <!-- User Info -->
            <div class="mb-12">
                <h1 class="text-6xl font-black mb-2" id="userName">${_('dashboard.title')}</h1>
                <p class="text-xl text-gray-400" id="userRole">${_('common.loading')}</p>
            </div>
            
            <!-- Producer Application Status Banner -->
            <div id="applicationStatusBanner" class="hidden mb-8">
                <!-- Will be dynamically populated -->
            </div>
            
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div class="glass-strong rounded-3xl p-8 card-3d text-center">
                    <div class="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2" id="stat-tracks">...</div>
                    <div class="text-sm text-gray-400">${_('dashboard.total_tracks')}</div>
                </div>
                <div class="glass-strong rounded-3xl p-8 card-3d text-center">
                    <div class="text-5xl font-black bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2" id="stat-plays">...</div>
                    <div class="text-sm text-gray-400">${_('dashboard.total_plays')}</div>
                </div>
                <div class="glass-strong rounded-3xl p-8 card-3d text-center">
                    <div class="text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2" id="stat-followers">...</div>
                    <div class="text-sm text-gray-400">${_('dashboard.followers')}</div>
                </div>
                <div class="glass-strong rounded-3xl p-8 card-3d text-center">
                    <div class="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2" id="stat-likes">...</div>
                    <div class="text-sm text-gray-400">${_('dashboard.total_likes')}</div>
                </div>
            </div>
            
            <!-- Producer Section (shown only for producers) -->
            <div id="producerSection" class="hidden">
                <!-- Earnings Card -->
                <div class="glass-strong rounded-3xl p-8 mb-8">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-3xl font-bold">${_('dashboard.earnings')}</h2>
                        <button id="withdrawBtn" class="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold hover:shadow-lg">
                            <i class="fas fa-wallet mr-2"></i>${_('dashboard.withdraw')}
                        </button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="text-center">
                            <div class="text-4xl font-black text-green-400 mb-2" id="wallet-balance">$0.00</div>
                            <div class="text-sm text-gray-400">${_('dashboard.available_balance')}</div>
                        </div>
                        <div class="text-center">
                            <div class="text-4xl font-black text-blue-400 mb-2" id="wallet-earned">$0.00</div>
                            <div class="text-sm text-gray-400">${_('dashboard.total_earned')}</div>
                        </div>
                        <div class="text-center">
                            <div class="text-4xl font-black text-purple-400 mb-2" id="wallet-withdrawn">$0.00</div>
                            <div class="text-sm text-gray-400">${_('dashboard.total_withdrawn')}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Main Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- My Tracks -->
                <div class="lg:col-span-2 space-y-8">
                    <div class="glass-strong rounded-3xl p-8">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold">${_('dashboard.my_tracks')}</h2>
                            <button id="uploadBtn" class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg hidden">
                                <i class="fas fa-plus mr-2"></i>${_('dashboard.upload_new')}
                            </button>
                        </div>
                        
                        <!-- Tracks Loading -->
                        <div id="tracksLoading" class="space-y-4">
                            ${Array(3).fill(0).map(() => `
                                <div class="glass rounded-2xl p-4 skeleton">
                                    <div class="flex items-center space-x-4">
                                        <div class="w-16 h-16 rounded-xl bg-gray-700"></div>
                                        <div class="flex-1">
                                            <div class="h-5 bg-gray-700 rounded mb-2 w-3/4"></div>
                                            <div class="h-4 bg-gray-700 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- Tracks List -->
                        <div id="tracksList" class="space-y-4 hidden"></div>
                        
                        <!-- Empty State -->
                        <div id="tracksEmpty" class="hidden text-center py-12">
                            <i class="fas fa-music text-6xl text-gray-600 mb-4"></i>
                            <h3 class="text-2xl font-bold mb-2">${_('dashboard.no_tracks')}</h3>
                            <p class="text-gray-400 mb-6">${_('dashboard.upload_first_track')}</p>
                            <button class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg" onclick="document.getElementById('uploadModal').classList.remove('hidden')">
                                <i class="fas fa-upload mr-2"></i>${_('dashboard.upload_track')}
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Sidebar -->
                <div class="space-y-8">
                    <!-- Quick Actions -->
                    <div class="glass-strong rounded-3xl p-8">
                        <h2 class="text-2xl font-bold mb-6">${_('dashboard.quick_actions')}</h2>
                        <div class="space-y-3">
                            <button id="uploadBtnSidebar" class="w-full px-6 py-3 glass rounded-xl hover:bg-white/10 text-left hidden">
                                <i class="fas fa-upload mr-3"></i>${_('dashboard.upload_track')}
                            </button>
                            <a href="/${locale}/profile" class="block w-full px-6 py-3 glass rounded-xl hover:bg-white/10 text-left">
                                <i class="fas fa-user mr-3"></i>${_('dashboard.edit_profile')}
                            </a>
                            <a href="/${locale}/producer/apply" id="applyProducerBtn" class="block w-full px-6 py-3 glass rounded-xl hover:bg-white/10 text-left">
                                <i class="fas fa-star mr-3"></i>${_('dashboard.become_producer')}
                            </a>
                        </div>
                    </div>
                    
                    <!-- Producer Stats (shown only for producers) -->
                    <div id="producerStats" class="glass-strong rounded-3xl p-8 hidden">
                        <h2 class="text-2xl font-bold mb-6">${_('dashboard.producer_stats')}</h2>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <span class="text-gray-400">${_('dashboard.total_sales')}</span>
                                <span class="font-bold" id="total-sales">0</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-400">${_('dashboard.avg_price')}</span>
                                <span class="font-bold" id="avg-price">$0.00</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-400">${_('dashboard.conversion_rate')}</span>
                                <span class="font-bold" id="conversion-rate">0%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Listener Section (shown only for non-producers) -->
    <div id="listenerSection" class="hidden">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- My Purchases -->
            <div class="lg:col-span-2">
                <div class="glass-strong rounded-3xl p-8">
                    <h2 class="text-2xl font-bold mb-6">${_('dashboard.my_purchases')}</h2>
                    
                    <!-- Purchases Loading -->
                    <div id="purchasesLoading" class="space-y-4">
                        ${Array(3).fill(0).map(() => `
                            <div class="glass rounded-2xl p-4 skeleton">
                                <div class="flex items-center space-x-4">
                                    <div class="w-16 h-16 rounded-xl bg-gray-700"></div>
                                    <div class="flex-1">
                                        <div class="h-5 bg-gray-700 rounded mb-2 w-3/4"></div>
                                        <div class="h-4 bg-gray-700 rounded w-1/2"></div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Purchases List -->
                    <div id="purchasesList" class="space-y-4 hidden"></div>
                    
                    <!-- Empty State -->
                    <div id="purchasesEmpty" class="hidden text-center py-12">
                        <i class="fas fa-shopping-bag text-6xl text-gray-600 mb-4"></i>
                        <h3 class="text-2xl font-bold mb-2">${_('dashboard.no_purchases')}</h3>
                        <p class="text-gray-400 mb-6">${_('dashboard.browse_tracks_message')}</p>
                        <a href="/${locale}/browse" class="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg">
                            <i class="fas fa-search mr-2"></i>${_('dashboard.browse_tracks')}
                        </a>
                    </div>
                </div>
                
                <!-- Recently Played -->
                <div class="glass-strong rounded-3xl p-8 mt-8">
                    <h2 class="text-2xl font-bold mb-6">${_('dashboard.recently_played')}</h2>
                    
                    <!-- Recently Played Loading -->
                    <div id="recentlyPlayedLoading" class="space-y-3">
                        ${Array(5).fill(0).map(() => `
                            <div class="glass rounded-xl p-3 skeleton">
                                <div class="flex items-center space-x-3">
                                    <div class="w-12 h-12 rounded-lg bg-gray-700"></div>
                                    <div class="flex-1">
                                        <div class="h-4 bg-gray-700 rounded mb-1 w-2/3"></div>
                                        <div class="h-3 bg-gray-700 rounded w-1/3"></div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Recently Played List -->
                    <div id="recentlyPlayedList" class="space-y-3 hidden"></div>
                    
                    <!-- Empty State -->
                    <div id="recentlyPlayedEmpty" class="hidden text-center py-8">
                        <i class="fas fa-headphones text-5xl text-gray-600 mb-3"></i>
                        <h3 class="text-xl font-bold mb-2">${_('dashboard.no_history')}</h3>
                        <p class="text-gray-400 text-sm">${_('dashboard.start_listening_message')}</p>
                    </div>
                </div>
            </div>
            
            <!-- Sidebar -->
            <div class="space-y-8">
                <!-- Quick Actions -->
                <div class="glass-strong rounded-3xl p-8">
                    <h2 class="text-2xl font-bold mb-6">${_('dashboard.quick_actions')}</h2>
                    <div class="space-y-3">
                        <a href="/${locale}/browse" class="block w-full px-6 py-3 glass rounded-xl hover:bg-white/10 text-left">
                            <i class="fas fa-search mr-3"></i>${_('dashboard.browse_tracks')}
                        </a>
                        <a href="/${locale}/profile" class="block w-full px-6 py-3 glass rounded-xl hover:bg-white/10 text-left">
                            <i class="fas fa-user mr-3"></i>${_('dashboard.edit_profile')}
                        </a>
                        <a href="/${locale}/producer/apply" id="applyProducerBtnListener" class="block w-full px-6 py-3 glass rounded-xl hover:bg-white/10 text-left">
                            <i class="fas fa-star mr-3"></i>${_('dashboard.become_producer')}
                        </a>
                    </div>
                </div>
                
                <!-- Listener Stats -->
                <div class="glass-strong rounded-3xl p-8">
                    <h2 class="text-2xl font-bold mb-6">${_('dashboard.your_stats')}</h2>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <span class="text-gray-400">${_('dashboard.total_purchases')}</span>
                            <span class="font-bold" id="total-purchases">0</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-400">${_('dashboard.total_listens')}</span>
                            <span class="font-bold" id="total-listens">0</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-400">${_('dashboard.member_since')}</span>
                            <span class="font-bold text-sm" id="member-since">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Upload Track Modal -->
    <div id="uploadModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
        <div class="glass-strong rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-3xl font-bold">${_('dashboard.upload_track')}</h2>
                <button id="closeUploadModal" class="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <form id="uploadForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-semibold mb-2">${_('track.title')}</label>
                        <input type="text" id="trackTitle" required class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">${_('track.artist')}</label>
                        <input type="text" id="trackArtist" required class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500">
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label class="block text-sm font-semibold mb-2">${_('track.genre')}</label>
                        <input type="text" id="trackGenre" required class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">${_('track.bpm')}</label>
                        <input type="number" id="trackBpm" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">${_('track.duration')} (s)</label>
                        <input type="number" id="trackDuration" required class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500">
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-semibold mb-2">${_('track.mood')}</label>
                        <input type="text" id="trackMood" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">${_('track.price')} ($)</label>
                        <input type="number" step="0.01" id="trackPrice" required class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500">
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">${_('track.tags')}</label>
                    <input type="text" id="trackTags" placeholder="${_('track.tags_placeholder')}" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500">
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">${_('track.description')}</label>
                    <textarea id="trackDescription" rows="4" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 resize-none"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">${_('track.audio_url')}</label>
                    <input type="url" id="trackAudioUrl" required placeholder="https://example.com/track.mp3" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500">
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">${_('track.cover_url')}</label>
                    <input type="url" id="trackCoverUrl" required placeholder="https://example.com/cover.jpg" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500">
                </div>
                
                <div id="uploadError" class="hidden bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400"></div>
                
                <div class="flex items-center justify-end space-x-4">
                    <button type="button" id="cancelUploadBtn" class="px-6 py-3 rounded-xl font-semibold hover:bg-white/5">${_('common.cancel')}</button>
                    <button type="submit" class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg">
                        <span id="uploadSubmitText">${_('dashboard.upload_track')}</span>
                        <span id="uploadSubmitLoading" class="hidden"><i class="fas fa-spinner fa-spin mr-2"></i>${_('common.loading')}</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
    
    <script>
        const locale = '${locale}';
        let currentUser = null;
        let userTracks = [];
        
        // Check authentication
        async function checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/${locale}/login?redirect=' + encodeURIComponent(window.location.pathname);
                return false;
            }
            
            try {
                const response = await fetch('/api/auth/me', {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    currentUser = data.data || data;
                    updateUserInfo();
                    return true;
                } else {
                    localStorage.removeItem('token');
                    window.location.href = '/${locale}/login';
                    return false;
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                return false;
            }
        }
        
        // Update user info display
        function updateUserInfo() {
            if (!currentUser) return;
            
            document.getElementById('userName').textContent = currentUser.name + "'s \`${_('dashboard.title')}\`";
            
            let roleText = currentUser.is_producer ? \`${_('dashboard.producer')}\` : \`${_('dashboard.listener')}\`;
            if (currentUser.role === 'admin') roleText = \`${_('dashboard.admin')}\`;
            document.getElementById('userRole').textContent = roleText;
            
            // Show producer sections
            if (currentUser.is_producer) {
                document.getElementById('producerSection')?.classList.remove('hidden');
                document.getElementById('producerStats')?.classList.remove('hidden');
                document.getElementById('uploadBtn')?.classList.remove('hidden');
                document.getElementById('uploadBtnSidebar')?.classList.remove('hidden');
                document.getElementById('applyProducerBtn')?.classList.add('hidden');
                loadEarnings();
            } else {
                // Show listener sections
                document.getElementById('listenerSection')?.classList.remove('hidden');
                document.getElementById('applyProducerBtnListener')?.classList.remove('hidden');
                loadPurchases();
                loadRecentlyPlayed();
                
                // Set member since
                if (currentUser.created_at) {
                    const memberDate = new Date(currentUser.created_at);
                    document.getElementById('member-since').textContent = memberDate.toLocaleDateString('${locale}', { year: 'numeric', month: 'short' });
                }
            }
            
            // Check producer application status
            loadProducerApplicationStatus();
        }
        
        // Load producer application status
        async function loadProducerApplicationStatus() {
            const token = localStorage.getItem('token');
            if (!token) return;
            
            try {
                const response = await fetch('/api/producer/application', {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.data) {
                        const app = data.data;
                        const banner = document.getElementById('applicationStatusBanner');
                        
                        if (app.status === 'pending') {
                            banner.innerHTML = \`
                                <div class="glass-strong rounded-3xl p-6 border-2 border-yellow-500/30">
                                    <div class="flex items-start space-x-4">
                                        <div class="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                            <i class="fas fa-clock text-2xl text-yellow-400"></i>
                                        </div>
                                        <div class="flex-1">
                                            <h3 class="text-2xl font-bold mb-2 text-yellow-300">${_('dashboard.application_pending')}</h3>
                                            <p class="text-gray-300 mb-4">${_('dashboard.application_pending_message')}</p>
                                            <div class="flex items-center space-x-4 text-sm">
                                                <span class="text-gray-400"><i class="fas fa-calendar mr-2"></i>Applied: \${new Date(app.created_at).toLocaleDateString('${locale}')}</span>
                                                <a href="/${locale}/producer/apply" class="text-purple-400 hover:text-purple-300"><i class="fas fa-eye mr-2"></i>View Application</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            \`;
                            banner.classList.remove('hidden');
                        } else if (app.status === 'rejected') {
                            banner.innerHTML = \`
                                <div class="glass-strong rounded-3xl p-6 border-2 border-red-500/30">
                                    <div class="flex items-start space-x-4">
                                        <div class="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                            <i class="fas fa-times-circle text-2xl text-red-400"></i>
                                        </div>
                                        <div class="flex-1">
                                            <h3 class="text-2xl font-bold mb-2 text-red-300">${_('dashboard.application_rejected')}</h3>
                                            <p class="text-gray-300 mb-2">${_('dashboard.application_rejected_message')}</p>
                                            \${app.admin_notes ? \`<p class="text-sm text-gray-400 mb-4"><strong>Admin Notes:</strong> \${app.admin_notes}</p>\` : ''}
                                            <a href="/${locale}/producer/apply" class="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg">
                                                <i class="fas fa-redo mr-2"></i>Re-apply
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            \`;
                            banner.classList.remove('hidden');
                        } else if (app.status === 'approved') {
                            // Don't show banner for approved producers - they see full producer dashboard
                            banner.classList.add('hidden');
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to load producer application status:', error);
            }
        }
        
        // Load user stats
        async function loadUserStats() {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('/api/users/me/stats', {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });
                const data = await response.json();
                
                if (data.success) {
                    document.getElementById('stat-tracks').textContent = data.data.tracks.toLocaleString();
                    document.getElementById('stat-plays').textContent = data.data.plays.toLocaleString();
                    document.getElementById('stat-followers').textContent = data.data.followers.toLocaleString();
                    document.getElementById('stat-likes').textContent = data.data.likes.toLocaleString();
                }
            } catch (error) {
                console.error('Failed to load stats:', error);
            }
        }
        
        // Load user tracks
        async function loadTracks() {
            const token = localStorage.getItem('token');
            document.getElementById('tracksLoading').classList.remove('hidden');
            document.getElementById('tracksList').classList.add('hidden');
            document.getElementById('tracksEmpty').classList.add('hidden');
            
            try {
                const response = await fetch('/api/users/me/tracks', {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });
                const data = await response.json();
                
                if (data.success && data.data) {
                    userTracks = data.data;
                    renderTracks();
                }
            } catch (error) {
                console.error('Failed to load tracks:', error);
            }
        }
        
        // Render tracks
        function renderTracks() {
            document.getElementById('tracksLoading').classList.add('hidden');
            
            if (userTracks.length === 0) {
                document.getElementById('tracksEmpty').classList.remove('hidden');
                return;
            }
            
            const list = document.getElementById('tracksList');
            list.classList.remove('hidden');
            
            list.innerHTML = userTracks.map(track => \`
                <div class="glass rounded-2xl p-4 hover:bg-white/10 transition-all">
                    <div class="flex items-center space-x-4">
                        <img src="\${track.cover_url}" alt="\${track.title}" class="w-16 h-16 rounded-xl object-cover">
                        <div class="flex-1 min-w-0">
                            <h4 class="font-bold truncate">\${track.title}</h4>
                            <p class="text-sm text-gray-400 truncate">\${track.genre} • \${track.plays_count || 0} ${_('dashboard.plays')}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="w-10 h-10 rounded-xl glass hover:bg-white/10 flex items-center justify-center" onclick="playTrack(\${track.id})">
                                <i class="fas fa-play text-sm"></i>
                            </button>
                            <button class="w-10 h-10 rounded-xl glass hover:bg-white/10 flex items-center justify-center" onclick="editTrack(\${track.id})">
                                <i class="fas fa-edit text-sm"></i>
                            </button>
                            <button class="w-10 h-10 rounded-xl glass hover:bg-white/10 flex items-center justify-center text-red-400" onclick="deleteTrack(\${track.id})">
                                <i class="fas fa-trash text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
            \`).join('');
        }
        
        // Load earnings
        async function loadEarnings() {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('/api/users/me/earnings', {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });
                const data = await response.json();
                
                if (data.success && data.data) {
                    const wallet = data.data.wallet;
                    document.getElementById('wallet-balance').textContent = \`$\${wallet.balance.toFixed(2)}\`;
                    document.getElementById('wallet-earned').textContent = \`$\${wallet.total_earned.toFixed(2)}\`;
                    document.getElementById('wallet-withdrawn').textContent = \`$\${wallet.total_withdrawn.toFixed(2)}\`;
                    
                    const sales = data.data.sales;
                    document.getElementById('total-sales').textContent = sales.total_count;
                }
            } catch (error) {
                console.error('Failed to load earnings:', error);
            }
        }
        
        // Load purchases (for listeners)
        async function loadPurchases() {
            const token = localStorage.getItem('token');
            document.getElementById('purchasesLoading').classList.remove('hidden');
            document.getElementById('purchasesList').classList.add('hidden');
            document.getElementById('purchasesEmpty').classList.add('hidden');
            
            try {
                const response = await fetch('/api/users/me/purchases', {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });
                const data = await response.json();
                
                document.getElementById('purchasesLoading').classList.add('hidden');
                
                if (data.success && data.data && data.data.length > 0) {
                    const purchases = data.data;
                    const html = purchases.map(purchase => \`
                        <div class="glass rounded-2xl p-4 hover:bg-white/5 transition-all">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-4 flex-1">
                                    <img src="\${purchase.cover_url || 'https://via.placeholder.com/64'}" 
                                         alt="\${purchase.title}" 
                                         class="w-16 h-16 rounded-xl object-cover">
                                    <div class="flex-1">
                                        <h3 class="font-bold text-lg">\${purchase.title}</h3>
                                        <p class="text-sm text-gray-400">\${purchase.artist}</p>
                                        <p class="text-xs text-gray-500 mt-1">Purchased: \${new Date(purchase.created_at).toLocaleDateString('${locale}')}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <span class="text-green-400 font-bold">$\${purchase.price.toFixed(2)}</span>
                                    <button onclick="playTrack('\${purchase.audio_url}', '\${purchase.title}', '\${purchase.artist}')" 
                                            class="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center hover:shadow-lg">
                                        <i class="fas fa-play text-sm"></i>
                                    </button>
                                    <a href="\${purchase.audio_url}" 
                                       download 
                                       class="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10"
                                       title="Download">
                                        <i class="fas fa-download text-sm"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    \`).join('');
                    
                    document.getElementById('purchasesList').innerHTML = html;
                    document.getElementById('purchasesList').classList.remove('hidden');
                    
                    // Update stats
                    document.getElementById('total-purchases').textContent = purchases.length;
                } else {
                    document.getElementById('purchasesEmpty').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Failed to load purchases:', error);
                document.getElementById('purchasesLoading').classList.add('hidden');
                document.getElementById('purchasesEmpty').classList.remove('hidden');
            }
        }
        
        // Load recently played (for listeners)
        async function loadRecentlyPlayed() {
            const token = localStorage.getItem('token');
            document.getElementById('recentlyPlayedLoading').classList.remove('hidden');
            document.getElementById('recentlyPlayedList').classList.add('hidden');
            document.getElementById('recentlyPlayedEmpty').classList.add('hidden');
            
            try {
                const response = await fetch('/api/users/me/play-history?limit=10', {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });
                const data = await response.json();
                
                document.getElementById('recentlyPlayedLoading').classList.add('hidden');
                
                if (data.success && data.data && data.data.length > 0) {
                    const history = data.data;
                    const html = history.map(item => \`
                        <div class="glass rounded-xl p-3 hover:bg-white/5 transition-all cursor-pointer"
                             onclick="playTrack('\${item.audio_url}', '\${item.title}', '\${item.artist}')">
                            <div class="flex items-center space-x-3">
                                <img src="\${item.cover_url || 'https://via.placeholder.com/48'}" 
                                     alt="\${item.title}" 
                                     class="w-12 h-12 rounded-lg object-cover">
                                <div class="flex-1 min-w-0">
                                    <h4 class="font-semibold text-sm truncate">\${item.title}</h4>
                                    <p class="text-xs text-gray-400 truncate">\${item.artist}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-xs text-gray-500">\${formatTimeAgo(item.played_at)}</p>
                                </div>
                            </div>
                        </div>
                    \`).join('');
                    
                    document.getElementById('recentlyPlayedList').innerHTML = html;
                    document.getElementById('recentlyPlayedList').classList.remove('hidden');
                    
                    // Update stats
                    document.getElementById('total-listens').textContent = history.length;
                } else {
                    document.getElementById('recentlyPlayedEmpty').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Failed to load play history:', error);
                document.getElementById('recentlyPlayedLoading').classList.add('hidden');
                document.getElementById('recentlyPlayedEmpty').classList.remove('hidden');
            }
        }
        
        // Helper function to format time ago
        function formatTimeAgo(date) {
            const now = new Date();
            const past = new Date(date);
            const diffMs = now - past;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);
            
            if (diffMins < 60) return \`\${diffMins}m ago\`;
            if (diffHours < 24) return \`\${diffHours}h ago\`;
            if (diffDays < 7) return \`\${diffDays}d ago\`;
            return past.toLocaleDateString('${locale}');
        }
        
        // Load purchases for listeners
        async function loadPurchases() {
            const token = localStorage.getItem('token');
            document.getElementById('purchasesLoading').classList.remove('hidden');
            document.getElementById('purchasesList').classList.add('hidden');
            document.getElementById('purchasesEmpty').classList.add('hidden');
            
            try {
                const response = await fetch('/api/users/me/purchases', {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });
                const data = await response.json();
                
                document.getElementById('purchasesLoading').classList.add('hidden');
                
                if (data.success && data.data && data.data.length > 0) {
                    const purchasesList = document.getElementById('purchasesList');
                    purchasesList.innerHTML = data.data.map(purchase => \`
                        <div class="glass rounded-2xl p-4 hover:bg-white/5 transition-all">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-4 flex-1">
                                    <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                                        <i class="fas fa-music text-2xl text-white/60"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-bold text-lg">\${purchase.title}</h4>
                                        <p class="text-sm text-gray-400">\${purchase.artist}</p>
                                        <p class="text-xs text-gray-500 mt-1">Purchased: \${new Date(purchase.created_at).toLocaleDateString('${locale}')}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div class="text-right mr-4">
                                        <div class="text-xl font-bold text-green-400">$\${purchase.price}</div>
                                        <div class="text-xs text-gray-500">\${purchase.payment_status}</div>
                                    </div>
                                    <a href="\${purchase.audio_url}" download class="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg text-sm">
                                        <i class="fas fa-download mr-2"></i>Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    \`).join('');
                    purchasesList.classList.remove('hidden');
                    
                    // Update stats
                    document.getElementById('total-purchases').textContent = data.data.length;
                } else {
                    document.getElementById('purchasesEmpty').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Failed to load purchases:', error);
                document.getElementById('purchasesLoading').classList.add('hidden');
                document.getElementById('purchasesEmpty').classList.remove('hidden');
            }
        }
        
        // Load recently played for listeners
        async function loadRecentlyPlayed() {
            const token = localStorage.getItem('token');
            document.getElementById('recentlyPlayedLoading').classList.remove('hidden');
            document.getElementById('recentlyPlayedList').classList.add('hidden');
            document.getElementById('recentlyPlayedEmpty').classList.add('hidden');
            
            try {
                const response = await fetch('/api/users/me/play-history?limit=10', {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });
                const data = await response.json();
                
                document.getElementById('recentlyPlayedLoading').classList.add('hidden');
                
                if (data.success && data.data && data.data.length > 0) {
                    const recentlyPlayedList = document.getElementById('recentlyPlayedList');
                    recentlyPlayedList.innerHTML = data.data.map(item => \`
                        <a href="/${locale}/tracks/\${item.track_id}" class="block glass rounded-xl p-3 hover:bg-white/10 transition-all">
                            <div class="flex items-center space-x-3">
                                <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                                    <i class="fas fa-play text-sm text-white/60"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h5 class="font-semibold truncate">\${item.track_title || 'Unknown Track'}</h5>
                                    <p class="text-xs text-gray-400 truncate">\${item.artist || 'Unknown Artist'}</p>
                                </div>
                                <div class="text-xs text-gray-500">
                                    \${new Date(item.played_at).toLocaleDateString('${locale}', { month: 'short', day: 'numeric' })}
                                </div>
                            </div>
                        </a>
                    \`).join('');
                    recentlyPlayedList.classList.remove('hidden');
                    
                    // Update stats
                    document.getElementById('total-listens').textContent = data.pagination?.total || data.data.length;
                } else {
                    document.getElementById('recentlyPlayedEmpty').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Failed to load recently played:', error);
                document.getElementById('recentlyPlayedLoading').classList.add('hidden');
                document.getElementById('recentlyPlayedEmpty').classList.add('hidden');
            }
        }
        
        // Upload track
        document.getElementById('uploadForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = e.target.querySelector('[type="submit"]');
            const submitText = document.getElementById('uploadSubmitText');
            const submitLoading = document.getElementById('uploadSubmitLoading');
            const errorDiv = document.getElementById('uploadError');
            
            submitText.classList.add('hidden');
            submitLoading.classList.remove('hidden');
            submitBtn.disabled = true;
            errorDiv.classList.add('hidden');
            
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/tracks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': \`Bearer \${token}\`
                    },
                    body: JSON.stringify({
                        title: document.getElementById('trackTitle').value,
                        artist: document.getElementById('trackArtist').value,
                        genre: document.getElementById('trackGenre').value,
                        duration: parseInt(document.getElementById('trackDuration').value),
                        bpm: parseInt(document.getElementById('trackBpm').value) || null,
                        mood: document.getElementById('trackMood').value || null,
                        tags: document.getElementById('trackTags').value || null,
                        description: document.getElementById('trackDescription').value || null,
                        audio_url: document.getElementById('trackAudioUrl').value,
                        cover_url: document.getElementById('trackCoverUrl').value,
                        price: parseFloat(document.getElementById('trackPrice').value)
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    document.getElementById('uploadModal').classList.add('hidden');
                    e.target.reset();
                    loadTracks();
                    loadUserStats();
                } else {
                    errorDiv.textContent = data.error || '${_('common.error')}';
                    errorDiv.classList.remove('hidden');
                }
            } catch (error) {
                errorDiv.textContent = \`${_('common.network_error')}\`;
                errorDiv.classList.remove('hidden');
            } finally {
                submitText.classList.remove('hidden');
                submitLoading.classList.add('hidden');
                submitBtn.disabled = false;
            }
        });
        
        // Modal controls
        document.getElementById('uploadBtn')?.addEventListener('click', () => {
            document.getElementById('uploadModal').classList.remove('hidden');
        });
        
        document.getElementById('uploadBtnSidebar')?.addEventListener('click', () => {
            document.getElementById('uploadModal').classList.remove('hidden');
        });
        
        document.getElementById('closeUploadModal')?.addEventListener('click', () => {
            document.getElementById('uploadModal').classList.add('hidden');
        });
        
        document.getElementById('cancelUploadBtn')?.addEventListener('click', () => {
            document.getElementById('uploadModal').classList.add('hidden');
        });
        
        // Track actions
        function playTrack(trackId) {
            const track = userTracks.find(t => t.id === trackId);
            if (track) {
                console.log('Playing track:', track.title);
                // Integrate with global audio player here
            }
        }
        
        function editTrack(trackId) {
            console.log('Edit track:', trackId);
            // TODO: Implement edit modal
        }
        
        async function deleteTrack(trackId) {
            if (!confirm('${_('dashboard.confirm_delete')}')) return;
            
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(\`/api/tracks/\${trackId}\`, {
                    method: 'DELETE',
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });
                
                if (response.ok) {
                    loadTracks();
                    loadUserStats();
                }
            } catch (error) {
                console.error('Failed to delete track:', error);
            }
        }
        
        function logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/${locale}/login';
        }
        
        // Initialize
        async function init() {
            const authenticated = await checkAuth();
            if (authenticated) {
                loadUserStats();
                loadTracks();
            }
        }
        
        init();
    </script>
</body>
</html>`;
};
