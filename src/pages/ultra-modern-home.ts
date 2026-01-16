import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';
import { t, Locale } from '../lib/i18n';

export function ultraModernHomeHTML(locale: Locale = 'en') {
    const otherLocale = locale === 'en' ? 'tr' : 'en';
    
    return `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MusicHub - Discover the Future of Music</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        
        body {
            background: #000000;
            background-image: 
                radial-gradient(at 0% 0%, rgba(147, 51, 234, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
                radial-gradient(at 0% 100%, rgba(147, 51, 234, 0.15) 0px, transparent 50%);
            background-attachment: fixed;
        }
        
        /* Advanced Glassmorphism */
        .glass {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .glass-strong {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(40px) saturate(200%);
            -webkit-backdrop-filter: blur(40px) saturate(200%);
            border: 1px solid rgba(255, 255, 255, 0.12);
        }
        
        /* 3D Card Effect */
        .card-3d {
            transform-style: preserve-3d;
            transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .card-3d:hover {
            transform: translateY(-12px) rotateX(2deg);
        }
        
        .card-3d::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1px;
            background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05));
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.6s;
        }
        
        .card-3d:hover::before {
            opacity: 1;
        }
        
        /* Gradient Mesh */
        .gradient-mesh {
            background: 
                radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                linear-gradient(135deg, #9333EA, #EC4899, #3B82F6);
            background-size: 200% 200%;
            animation: gradientShift 15s ease infinite;
        }
        
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        /* Floating Animation */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        .float {
            animation: float 6s ease-in-out infinite;
        }
        
        /* Shimmer Effect */
        @keyframes shimmer {
            0% { background-position: -1000px; }
            100% { background-position: 1000px; }
        }
        
        .shimmer {
            background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(255,255,255,0.1) 50%, 
                transparent 100%);
            background-size: 1000px 100%;
            animation: shimmer 3s infinite;
        }
        
        /* Neon Glow */
        .neon-glow {
            box-shadow: 
                0 0 20px rgba(147, 51, 234, 0.5),
                0 0 40px rgba(236, 72, 153, 0.3),
                0 0 60px rgba(147, 51, 234, 0.2);
        }
        
        .neon-text {
            text-shadow: 
                0 0 10px rgba(147, 51, 234, 0.8),
                0 0 20px rgba(236, 72, 153, 0.6),
                0 0 30px rgba(147, 51, 234, 0.4);
        }
        
        /* Micro-interaction: Button Press */
        .btn-micro {
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .btn-micro:active {
            transform: scale(0.95) translateY(2px);
        }
        
        /* Bento Box Grid */
        .bento-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 1.5rem;
        }
        
        .bento-item-1 { grid-column: span 12; }
        .bento-item-2 { grid-column: span 6; }
        .bento-item-3 { grid-column: span 4; }
        
        @media (max-width: 768px) {
            .bento-item-2, .bento-item-3 { grid-column: span 12; }
        }
        
        /* Scroll Reveal */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body class="text-white min-h-screen overflow-x-hidden">
    
    <!-- Ultra-Modern Navigation -->
    <nav class="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <!-- Logo -->
                <a href="/${locale}" class="flex items-center space-x-3 group">
                    <div class="relative">
                        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center neon-glow">
                            <i class="fas fa-wave-square text-white text-xl"></i>
                        </div>
                        <div class="absolute -inset-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-20 blur group-hover:opacity-40 transition-opacity"></div>
                    </div>
                    <span class="text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                        MusicHub
                    </span>
                </a>
                
                <!-- Center Search - Compact Version -->
                <div class="hidden lg:flex flex-1 max-w-md mx-8">
                    <div class="relative w-full group">
                        <input 
                            type="text" 
                            id="navSearch"
                            placeholder="Search tracks, artists..."
                            class="w-full px-4 py-2.5 pl-11 pr-4 glass-strong rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all border border-white/10 hover:border-purple-500/30 focus:border-purple-500/50 backdrop-blur-xl text-sm"
                        >
                        <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-pink-400 transition-colors text-sm"></i>
                    </div>
                </div>
                
                <!-- Navigation Links - Match Dashboard Style -->
                <div class="hidden lg:flex items-center space-x-6">
                    <a href="/${locale}/browse" class="text-white/70 hover:text-white transition-colors">${t('nav.browse', locale)}</a>
                    <a href="/${locale}/forum" class="text-white/70 hover:text-white transition-colors">${t('nav.forum', locale)}</a>
                    <a href="/${locale}/blog" class="text-white/70 hover:text-white transition-colors">${t('nav.blog', locale)}</a>
                    <a href="/${locale}/dashboard" class="text-white font-semibold">${t('nav.dashboard', locale)}</a>
                </div>
                
                <!-- Right Actions -->
                <div class="flex items-center space-x-4">
                    <!-- Language Switcher -->
                    <a 
                        href="/${otherLocale}" 
                        class="px-3 py-2 rounded-xl glass hover:glass-strong transition-all font-semibold flex items-center gap-2 text-sm"
                        title="${locale === 'en' ? 'Türkçeye geç' : 'Switch to English'}"
                    >
                        <i class="fas fa-globe text-sm"></i>
                        <span>${otherLocale.toUpperCase()}</span>
                    </a>
                    
                    <div id="authSection" class="hidden lg:block">
                        <a href="/${locale}/login" class="px-4 py-2 glass rounded-xl hover:bg-white/10 text-sm">
                            ${t('nav.login', locale)}
                        </a>
                    </div>
                    
                    <!-- Mobile Menu Toggle (hidden for now - can be added later) -->
                </div>
            </div>
        </div>
    </nav>
    
    <!-- Hero Section with Gradient Mesh -->
    <div class="pt-32 pb-24 px-6 relative overflow-hidden">
        <!-- Floating Orbs -->
        <div class="absolute top-20 left-[10%] w-72 h-72 bg-purple-500/30 rounded-full blur-3xl float" style="animation-delay: 0s;"></div>
        <div class="absolute top-40 right-[15%] w-96 h-96 bg-pink-500/30 rounded-full blur-3xl float" style="animation-delay: 1s;"></div>
        <div class="absolute bottom-20 left-[20%] w-80 h-80 bg-blue-500/20 rounded-full blur-3xl float" style="animation-delay: 2s;"></div>
        
        <div class="max-w-[1400px] mx-auto relative z-10">
            <div class="text-center max-w-4xl mx-auto reveal active">
                <div class="inline-block px-4 py-2 glass-strong rounded-full mb-6">
                    <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                        ✨ Now Playing: The Future of Music
                    </span>
                </div>
                
                <h1 class="text-6xl md:text-8xl font-black mb-8 leading-tight">
                    <span class="inline-block neon-text bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                        Discover Music
                    </span>
                    <br/>
                    <span class="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        Beyond Boundaries
                    </span>
                </h1>
                
                <p class="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
                    Experience a revolutionary platform where artists and fans connect through the universal language of sound
                </p>
                
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button class="px-10 py-5 btn-micro bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl font-bold text-lg neon-glow hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center space-x-3 bg-[length:200%_100%] hover:bg-right" style="transition: background-position 0.5s;">
                        <i class="fas fa-play"></i>
                        <span>Start Listening</span>
                    </button>
                    <button class="px-10 py-5 btn-micro glass-strong rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center space-x-3">
                        <i class="fas fa-compass"></i>
                        <span>Explore Genres</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Stats Section - Bento Style -->
    <div class="px-6 mb-24">
        <div class="max-w-[1400px] mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="glass-strong rounded-3xl p-8 card-3d hover:bg-white/10 transition-all">
                    <div class="text-5xl font-black bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2" id="trackCount">
                        <div class="shimmer h-12 w-20 glass rounded-xl"></div>
                    </div>
                    <div class="text-sm text-gray-400 font-medium uppercase tracking-wider">Total Tracks</div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8 card-3d hover:bg-white/10 transition-all">
                    <div class="text-5xl font-black bg-gradient-to-br from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
                        150K+
                    </div>
                    <div class="text-sm text-gray-400 font-medium uppercase tracking-wider">Active Users</div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8 card-3d hover:bg-white/10 transition-all">
                    <div class="text-5xl font-black bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                        5.2M+
                    </div>
                    <div class="text-sm text-gray-400 font-medium uppercase tracking-wider">Monthly Plays</div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8 card-3d hover:bg-white/10 transition-all">
                    <div class="text-5xl font-black bg-gradient-to-br from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                        2.5K+
                    </div>
                    <div class="text-sm text-gray-400 font-medium uppercase tracking-wider">Artists</div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Editor Picks Section -->
    <div class="px-6 mb-24 reveal">
        <div class="max-w-[1400px] mx-auto">
            <div class="mb-12">
                <h2 class="text-4xl md:text-5xl font-black mb-2">Editor's Picks</h2>
                <p class="text-gray-400">Handpicked by our music experts</p>
            </div>
            
            <div id="editorsPicks" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Loading skeleton -->
                <div class="glass-strong rounded-3xl overflow-hidden animate-pulse">
                    <div class="aspect-video bg-white/5"></div>
                    <div class="p-8">
                        <div class="h-6 bg-white/10 rounded mb-2"></div>
                        <div class="h-4 bg-white/5 rounded w-2/3"></div>
                    </div>
                </div>
                <div class="grid grid-rows-2 gap-6">
                    <div class="glass-strong rounded-3xl p-6 animate-pulse">
                        <div class="w-24 h-24 rounded-2xl bg-white/5"></div>
                    </div>
                    <div class="glass-strong rounded-3xl p-6 animate-pulse">
                        <div class="w-24 h-24 rounded-2xl bg-white/5"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Trending Chart - Top 10 -->
    <div class="px-6 mb-24 reveal">
        <div class="max-w-[1400px] mx-auto">
            <div class="mb-12">
                <h2 class="text-4xl md:text-5xl font-black mb-2">Top 10 This Week</h2>
                <p class="text-gray-400">The most popular tracks right now</p>
            </div>
            
            <div class="glass-strong rounded-3xl p-8">
                <div class="space-y-4" id="trendingChart">
                    <!-- Loading skeletons -->
                    ${Array(10).fill(0).map((_, i) => `
                        <div class="flex items-center space-x-4 p-4 glass rounded-2xl animate-pulse">
                            <div class="text-3xl font-black text-gray-600 w-12 text-center">
                                ${i + 1}
                            </div>
                            <div class="w-16 h-16 rounded-xl bg-white/5 flex-shrink-0"></div>
                            <div class="flex-1 min-w-0">
                                <div class="h-4 bg-white/10 rounded mb-2 w-32"></div>
                                <div class="h-3 bg-white/5 rounded w-24"></div>
                            </div>
                            <div class="hidden md:block w-20 h-4 bg-white/5 rounded"></div>
                            <div class="w-10 h-10 rounded-full bg-white/5"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>
    
    <!-- Latest Blog Posts -->
    <div class="px-6 mb-24 reveal">
        <div class="max-w-[1400px] mx-auto">
            <div class="flex items-center justify-between mb-12">
                <div>
                    <h2 class="text-4xl md:text-5xl font-black mb-2">Latest from Blog</h2>
                    <p class="text-gray-400">Music news, tips, and industry insights</p>
                </div>
                <a href="/en/blog" class="hidden md:flex items-center space-x-2 px-6 py-3 glass-strong rounded-xl hover:bg-white/10 transition-all">
                    <span>View All</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            
            <div id="blogPreview" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Loading skeletons -->
                ${Array(3).fill(0).map(() => `
                <div class="glass-strong rounded-3xl overflow-hidden animate-pulse">
                    <div class="aspect-video bg-white/5"></div>
                    <div class="p-6">
                        <div class="h-3 bg-white/5 rounded w-24 mb-2"></div>
                        <div class="h-5 bg-white/10 rounded mb-2"></div>
                        <div class="h-4 bg-white/5 rounded w-full mb-1"></div>
                        <div class="h-4 bg-white/5 rounded w-2/3"></div>
                    </div>
                </div>
                `).join('')}
                        </div>
                        <h3 class="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                            Music Licensing Guide for Beginners
                        </h3>
                        <p class="text-gray-400 text-sm mb-4">
                            Everything you need to know about licensing your music...
                        </p>
                        <div class="flex items-center justify-between text-sm text-gray-500">
                            <span><i class="fas fa-user mr-2"></i>Admin</span>
                            <span><i class="fas fa-eye mr-2"></i>1.5K views</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Featured Tracks - Advanced Grid -->
    <div class="px-6 mb-24">
        <div class="max-w-[1400px] mx-auto">
            <div class="flex items-center justify-between mb-12">
                <div>
                    <h2 class="text-4xl md:text-5xl font-black mb-2">All Tracks</h2>
                    <p class="text-gray-400">Browse our complete catalog</p>
                </div>
                <a href="/en/browse" class="hidden md:flex items-center space-x-2 px-6 py-3 glass-strong rounded-xl hover:bg-white/10 transition-all">
                    <span>View All</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            
            <div id="trackGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Loading State -->
                ${Array(8).fill(0).map((_, i) => `
                    <div class="glass-strong rounded-3xl overflow-hidden card-3d">
                        <div class="aspect-square shimmer"></div>
                        <div class="p-6">
                            <div class="h-6 shimmer glass rounded-xl mb-3"></div>
                            <div class="h-4 shimmer glass rounded-xl w-2/3"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
    
    <!-- Genre Explorer - Bento Layout -->
    <div class="px-6 mb-24">
        <div class="max-w-[1400px] mx-auto">
            <h2 class="text-4xl md:text-5xl font-black mb-12">Explore by Vibe</h2>
            
            <div class="bento-grid">
                <!-- Large Featured Genre -->
                <div class="bento-item-2 glass-strong rounded-3xl p-12 card-3d cursor-pointer group overflow-hidden relative">
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all"></div>
                    <div class="relative z-10">
                        <i class="fas fa-fire text-6xl mb-6 text-orange-400"></i>
                        <h3 class="text-3xl font-bold mb-2">Electronic</h3>
                        <p class="text-gray-400">2.3K tracks</p>
                    </div>
                </div>
                
                <div class="bento-item-2 glass-strong rounded-3xl p-12 card-3d cursor-pointer group overflow-hidden relative">
                    <div class="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-all"></div>
                    <div class="relative z-10">
                        <i class="fas fa-heart text-6xl mb-6 text-pink-400"></i>
                        <h3 class="text-3xl font-bold mb-2">Pop Hits</h3>
                        <p class="text-gray-400">1.8K tracks</p>
                    </div>
                </div>
                
                <div class="bento-item-3 glass-strong rounded-3xl p-8 card-3d cursor-pointer group">
                    <i class="fas fa-drum text-4xl mb-4 text-blue-400"></i>
                    <h3 class="text-xl font-bold">Hip Hop</h3>
                    <p class="text-gray-400 text-sm">956 tracks</p>
                </div>
                
                <div class="bento-item-3 glass-strong rounded-3xl p-8 card-3d cursor-pointer group">
                    <i class="fas fa-guitar text-4xl mb-4 text-yellow-400"></i>
                    <h3 class="text-xl font-bold">Rock</h3>
                    <p class="text-gray-400 text-sm">1.2K tracks</p>
                </div>
                
                <div class="bento-item-3 glass-strong rounded-3xl p-8 card-3d cursor-pointer group">
                    <i class="fas fa-leaf text-4xl mb-4 text-green-400"></i>
                    <h3 class="text-xl font-bold">Ambient</h3>
                    <p class="text-gray-400 text-sm">687 tracks</p>
                </div>
                
                <div class="bento-item-3 glass-strong rounded-3xl p-8 card-3d cursor-pointer group">
                    <i class="fas fa-compact-disc text-4xl mb-4 text-purple-400"></i>
                    <h3 class="text-xl font-bold">Jazz</h3>
                    <p class="text-gray-400 text-sm">543 tracks</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- CTA Section -->
    <div class="px-6 mb-24">
        <div class="max-w-[1400px] mx-auto">
            <div class="glass-strong rounded-[3rem] p-16 md:p-24 relative overflow-hidden">
                <div class="absolute inset-0 gradient-mesh opacity-20"></div>
                <div class="relative z-10 text-center max-w-3xl mx-auto">
                    <i class="fas fa-microphone-alt text-6xl mb-8 text-purple-400"></i>
                    <h2 class="text-4xl md:text-6xl font-black mb-6">Ready to Share Your Sound?</h2>
                    <p class="text-xl text-gray-300 mb-12">
                        Join thousands of artists earning from their passion. Apply to become a producer today.
                    </p>
                    <a href="/en/producer/apply" class="inline-flex items-center space-x-3 px-12 py-6 btn-micro bg-white text-black rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all">
                        <i class="fas fa-rocket"></i>
                        <span>Become a Producer</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Footer -->
    <footer class="px-6 py-16 border-t border-white/5">
        <div class="max-w-[1400px] mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div>
                    <div class="flex items-center space-x-3 mb-6">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <i class="fas fa-wave-square text-white"></i>
                        </div>
                        <span class="text-xl font-bold">MusicHub</span>
                    </div>
                    <p class="text-gray-400 text-sm leading-relaxed">
                        Discover, stream, and support independent artists from around the world.
                    </p>
                </div>
                
                <div>
                    <h3 class="font-bold mb-4">Platform</h3>
                    <ul class="space-y-3 text-sm text-gray-400">
                        <li><a href="/en/browse" class="hover:text-white transition">Browse Music</a></li>
                        <li><a href="/en/producer/apply" class="hover:text-white transition">For Artists</a></li>
                        <li><a href="#" class="hover:text-white transition">Pricing</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="font-bold mb-4">Company</h3>
                    <ul class="space-y-3 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-white transition">About Us</a></li>
                        <li><a href="#" class="hover:text-white transition">Careers</a></li>
                        <li><a href="#" class="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="font-bold mb-4">Connect</h3>
                    <div class="flex space-x-3">
                        <a href="#" class="w-10 h-10 glass-strong rounded-xl flex items-center justify-center hover:bg-white/10 transition">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="w-10 h-10 glass-strong rounded-xl flex items-center justify-center hover:bg-white/10 transition">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="w-10 h-10 glass-strong rounded-xl flex items-center justify-center hover:bg-white/10 transition">
                            <i class="fab fa-discord"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                <p>© 2026 MusicHub. All rights reserved.</p>
                <div class="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" class="hover:text-white transition">Privacy</a>
                    <a href="#" class="hover:text-white transition">Terms</a>
                    <a href="#" class="hover:text-white transition">Cookies</a>
                </div>
            </div>
        </div>
    </footer>
    
    <script>
        // Authentication Check
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        
        if (token && user) {
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
                        <a href="/en/dashboard" class="block px-3 py-2 hover:bg-white/10 transition-all text-xs text-white/90 hover:text-white">
                            <i class="fas fa-chart-line mr-2 text-purple-400 text-xs"></i>Dashboard
                        </a>
                        <a href="/en/profile" class="block px-3 py-2 hover:bg-white/10 transition-all text-xs text-white/90 hover:text-white">
                            <i class="fas fa-user mr-2 text-blue-400 text-xs"></i>Profile
                        </a>
                        <div class="border-t border-white/10 my-1"></div>
                        <button onclick="logout()" class="block w-full text-left px-3 py-2 hover:bg-white/10 transition-all text-xs text-red-400">
                            <i class="fas fa-sign-out-alt mr-2 text-xs"></i>Logout
                        </button>
                    </div>
                </div>
            \`;
        }
        
        function logout() {
            localStorage.clear();
            window.location.reload();
        }
        
        // Load Blog Posts
        async function loadBlogPosts() {
            try {
                const response = await fetch('/api/blog/posts?limit=3');
                const data = await response.json();
                
                if (data.success && data.data && data.data.length > 0) {
                    const gradients = [
                        'from-orange-500/20 to-red-500/20',
                        'from-blue-500/20 to-purple-500/20',
                        'from-green-500/20 to-cyan-500/20'
                    ];
                    
                    const html = data.data.map((post, i) => {
                        const date = new Date(post.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        });
                        
                        return \`
                            <div class="glass-strong rounded-3xl overflow-hidden card-3d group cursor-pointer" onclick="window.location.href='/${locale}/blog/\${post.slug}'">
                                <div class="aspect-video bg-gradient-to-br \${gradients[i]} flex items-center justify-center">
                                    <i class="fas fa-newspaper text-6xl text-white/20"></i>
                                </div>
                                <div class="p-6">
                                    <div class="text-xs text-gray-500 mb-2">
                                        <i class="fas fa-calendar mr-2"></i>\${date}
                                    </div>
                                    <h3 class="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                                        \${post.title}
                                    </h3>
                                    <p class="text-gray-400 text-sm mb-4 line-clamp-2">
                                        \${post.excerpt || post.content.substring(0, 100) + '...'}
                                    </p>
                                    <div class="flex items-center justify-between text-sm text-gray-500">
                                        <span><i class="fas fa-user mr-2"></i>\${post.author_name}</span>
                                        <span><i class="fas fa-eye mr-2"></i>\${(post.views_count || 0).toLocaleString()} views</span>
                                    </div>
                                </div>
                            </div>
                        \`;
                    }).join('');
                    
                    document.getElementById('blogPreview').innerHTML = html;
                }
            } catch (error) {
                console.error('Failed to load blog posts:', error);
            }
        }
        
        // Load Editor's Picks
        async function loadEditorsPicks() {
            try {
                const response = await fetch('/api/tracks?featured=true&limit=6');
                const data = await response.json();
                
                if (data.success && data.data && data.data.length > 0) {
                    const tracks = data.data;
                    const gradients = [
                        'from-purple-500/30 to-pink-500/30',
                        'from-blue-500/30 to-cyan-500/30',
                        'from-green-500/30 to-emerald-500/30',
                        'from-orange-500/30 to-red-500/30',
                        'from-indigo-500/30 to-purple-500/30',
                        'from-pink-500/30 to-rose-500/30'
                    ];
                    
                    const mainTrack = tracks[0];
                    const sideTracksHTML = tracks.slice(1, 3).map((track, i) => \`
                        <div class="glass-strong rounded-3xl p-6 flex items-center space-x-4 card-3d group cursor-pointer hover:bg-white/10 transition-all" onclick="window.location.href='/${locale}/tracks/\${track.id}'">
                            <div class="w-24 h-24 rounded-2xl bg-gradient-to-br \${gradients[i + 1]} flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-music text-3xl text-white/40"></i>
                            </div>
                            <div class="flex-1">
                                <h4 class="text-lg font-bold mb-1 truncate">\${track.title}</h4>
                                <p class="text-sm text-gray-400 mb-2 truncate">\${track.artist}</p>
                                <span class="text-xs text-gray-500"><i class="fas fa-play mr-1"></i>\${(track.plays_count || 0).toLocaleString()} plays</span>
                            </div>
                            <button 
                                class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all play-btn"
                                data-track-id="\${track.id}"
                                data-track='\${JSON.stringify(track).replace(/'/g, "&apos;")}'
                                onclick="event.stopPropagation(); playTrack(this);"
                            >
                                <i class="fas fa-play text-sm ml-1 play-icon"></i>
                                <i class="fas fa-pause text-sm pause-icon hidden"></i>
                            </button>
                        </div>
                    \`).join('');
                    
                    const html = \`
                        <div class="glass-strong rounded-3xl overflow-hidden card-3d group cursor-pointer" onclick="window.location.href='/${locale}/tracks/\${mainTrack.id}'">
                            <div class="aspect-video bg-gradient-to-br \${gradients[0]} relative flex items-center justify-center">
                                <i class="fas fa-music text-8xl text-white/20"></i>
                                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                    <button 
                                        class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center neon-glow play-btn"
                                        data-track-id="\${mainTrack.id}"
                                        data-track='\${JSON.stringify(mainTrack).replace(/'/g, "&apos;")}'
                                        onclick="event.stopPropagation(); playTrack(this);"
                                    >
                                        <i class="fas fa-play text-2xl ml-2 text-white play-icon"></i>
                                        <i class="fas fa-pause text-2xl pause-icon hidden"></i>
                                    </button>
                                </div>
                                <div class="absolute top-4 left-4 px-4 py-2 glass-strong rounded-full text-sm font-bold">
                                    <i class="fas fa-star text-yellow-400 mr-2"></i>Editor's Choice
                                </div>
                            </div>
                            <div class="p-8">
                                <h3 class="text-2xl font-bold mb-2 truncate">\${mainTrack.title}</h3>
                                <p class="text-gray-400 mb-4 truncate">\${mainTrack.description || mainTrack.genre || 'Featured track'}</p>
                                <div class="flex items-center justify-between text-sm text-gray-500">
                                    <span><i class="fas fa-user mr-2"></i>\${mainTrack.artist}</span>
                                    <span><i class="fas fa-play mr-2"></i>\${(mainTrack.plays_count || 0).toLocaleString()} plays</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="grid grid-rows-2 gap-6">
                            \${sideTracksHTML}
                        </div>
                    \`;
                    
                    document.getElementById('editorsPicks').innerHTML = html;
                }
            } catch (error) {
                console.error('Failed to load editor picks:', error);
            }
        }
        
        // Load Trending Tracks
        async function loadTrending() {
            try {
                const response = await fetch('/api/tracks?sort=trending&limit=10');
                const data = await response.json();
                
                if (data.success && data.data && data.data.length > 0) {
                    const html = data.data.map((track, i) => \`
                        <div class="flex items-center space-x-4 p-4 glass rounded-2xl hover:bg-white/10 transition-all cursor-pointer group" onclick="window.location.href='/${locale}/tracks/\${track.id}'">
                            <div class="text-3xl font-black \${i < 3 ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent' : 'text-gray-500'} w-12 text-center">
                                \${i + 1}
                            </div>
                            <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-music text-xl text-white/40"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h4 class="font-bold truncate">\${track.title}</h4>
                                <p class="text-sm text-gray-400 truncate">\${track.artist}</p>
                            </div>
                            <div class="hidden md:block text-sm text-gray-500">
                                \${(track.plays_count || 0).toLocaleString()} plays
                            </div>
                            <button 
                                class="w-10 h-10 rounded-full glass hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all play-btn"
                                data-track-id="\${track.id}"
                                data-track='\${JSON.stringify(track).replace(/'/g, "&apos;")}'
                                onclick="event.stopPropagation(); playTrack(this);"
                            >
                                <i class="fas fa-play text-sm play-icon"></i>
                                <i class="fas fa-pause text-sm pause-icon hidden"></i>
                            </button>
                        </div>
                    \`).join('');
                    
                    document.getElementById('trendingChart').innerHTML = html;
                }
            } catch (error) {
                console.error('Failed to load trending:', error);
            }
        }
        
        // Load Tracks
        async function loadTracks() {
            try {
                const response = await fetch('/api/tracks');
                const data = await response.json();
                
                if (data.success && data.data) {
                    document.getElementById('trackCount').innerHTML = \`
                        <div class="text-5xl font-black bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            \${data.data.length}+
                        </div>
                    \`;
                    
                    const tracksHTML = data.data.slice(0, 8).map(track => \`
                        <div class="glass-strong rounded-3xl overflow-hidden card-3d group relative">
                            <div class="relative aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center overflow-hidden cursor-pointer" onclick="window.location.href='/en/tracks/\${track.id}'">
                                <i class="fas fa-music text-6xl text-white/20"></i>
                                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                    <button 
                                        class="play-btn w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 relative overflow-hidden z-10"
                                        data-track-id="\${track.id}"
                                        data-track='\${JSON.stringify(track).replace(/'/g, "&apos;")}'
                                        onclick="event.stopPropagation(); playTrack(this);"
                                    >
                                        <i class="fas fa-play text-xl ml-1 play-icon"></i>
                                        <i class="fas fa-pause text-xl pause-icon hidden"></i>
                                    </button>
                                </div>
                                <div class="absolute top-4 right-4 px-3 py-1 glass-strong rounded-full text-xs">
                                    \${track.genre || 'Music'}
                                </div>
                            </div>
                            <div class="p-6 cursor-pointer" onclick="window.location.href='/en/tracks/\${track.id}'">
                                <h3 class="font-bold text-lg mb-1 truncate">\${track.title}</h3>
                                <p class="text-gray-400 text-sm truncate mb-4">\${track.artist}</p>
                                <div class="flex items-center justify-between text-xs text-gray-500">
                                    <span><i class="fas fa-play mr-1"></i>\${(track.plays_count || 0).toLocaleString()}</span>
                                    <span><i class="fas fa-heart mr-1"></i>\${(track.likes_count || 0).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    \`).join('');
                    
                    document.getElementById('trackGrid').innerHTML = tracksHTML;
                }
            } catch (error) {
                console.error('Failed to load tracks:', error);
            }
        }
        
        // Search Functionality
        document.getElementById('navSearch')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value;
                window.location.href = \`/en/browse?q=\${encodeURIComponent(query)}\`;
            }
        });
        
        // Keyboard Shortcut (Cmd/Ctrl + K)
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('navSearch')?.focus();
            }
        });
        
        // Scroll Reveal Animation
        const reveals = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        
        reveals.forEach(el => revealObserver.observe(el));
        
        // Load all homepage data
        loadBlogPosts();
        loadEditorsPicks();
        loadTrending();
        loadTracks();
    </script>
    
    <!-- Global Audio Player -->
    ${GlobalAudioPlayerHTML}
    
    <script>
    // Play Button Functions
    ${PlayButtonScript}
    </script>
</body>
</html>`;
}
