import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';
import { SharedNavigationHTML, SharedNavigationScript } from '../components/SharedNavigation';
import { SharedFooterHTML } from '../components/SharedFooter';
import { t, Locale } from '../lib/i18n';

export function ultraModernHomeHTML(locale: Locale = 'en') {
    const otherLocale = locale === 'en' ? 'tr' : 'en';
    
    return `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MUSICAL - Discover the Future of Music</title>
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
    
    ${SharedNavigationHTML(locale, { currentPage: 'home', showSearch: true, showAuth: true })}
    
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
                        ${t('home.now_playing', locale)}
                    </span>
                </div>
                
                <h1 class="text-6xl md:text-8xl font-black mb-8 leading-tight">
                    <span class="inline-block neon-text bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                        ${t('home.hero_title_1', locale)}
                    </span>
                    <br/>
                    <span class="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        ${t('home.hero_title_2', locale)}
                    </span>
                </h1>
                
                <p class="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
                    ${t('home.hero_subtitle', locale)}
                </p>
                
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onclick="document.getElementById('trendingChart').scrollIntoView({behavior: 'smooth', block: 'center'})" class="px-10 py-5 btn-micro bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl font-bold text-lg neon-glow hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center space-x-3 bg-[length:200%_100%] hover:bg-right cursor-pointer" style="transition: background-position 0.5s;">
                        <i class="fas fa-play"></i>
                        <span>${t('home.start_listening', locale)}</span>
                    </button>
                    <a href="/${locale}/browse" class="px-10 py-5 btn-micro glass-strong rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center space-x-3">
                        <i class="fas fa-compass"></i>
                        <span>${t('home.explore_genres', locale)}</span>
                    </a>
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
                    <div class="text-sm text-gray-400 font-medium uppercase tracking-wider">${t('home.stats_tracks', locale)}</div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8 card-3d hover:bg-white/10 transition-all">
                    <div class="text-5xl font-black bg-gradient-to-br from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
                        150K+
                    </div>
                    <div class="text-sm text-gray-400 font-medium uppercase tracking-wider">${t('home.stats_users', locale)}</div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8 card-3d hover:bg-white/10 transition-all">
                    <div class="text-5xl font-black bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                        5.2M+
                    </div>
                    <div class="text-sm text-gray-400 font-medium uppercase tracking-wider">${t('home.stats_plays', locale)}</div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8 card-3d hover:bg-white/10 transition-all">
                    <div class="text-5xl font-black bg-gradient-to-br from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                        2.5K+
                    </div>
                    <div class="text-sm text-gray-400 font-medium uppercase tracking-wider">${t('home.stats_artists', locale)}</div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Editor Picks Section -->
    <div class="px-6 mb-24 reveal">
        <div class="max-w-[1400px] mx-auto">
            <div class="mb-12">
                <h2 class="text-4xl md:text-5xl font-black mb-2">${t('home.editors_picks', locale)}</h2>
                <p class="text-gray-400">${t('home.editors_picks_desc', locale)}</p>
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
                <h2 class="text-4xl md:text-5xl font-black mb-2">${t('home.top_10', locale)}</h2>
                <p class="text-gray-400">${t('home.top_10_desc', locale)}</p>
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
                    <h2 class="text-4xl md:text-5xl font-black mb-2">${t('home.latest_blog', locale)}</h2>
                    <p class="text-gray-400">${t('home.latest_blog_desc', locale)}</p>
                </div>
                <a href="/${locale}/blog" class="hidden md:flex items-center space-x-2 px-6 py-3 glass-strong rounded-xl hover:bg-white/10 transition-all">
                    <span>${t('home.view_all_blog', locale)}</span>
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
                    <h2 class="text-4xl md:text-5xl font-black mb-2">${t('home.all_tracks', locale)}</h2>
                    <p class="text-gray-400">${t('home.all_tracks_desc', locale)}</p>
                </div>
                <a href="/${locale}/browse" class="hidden md:flex items-center space-x-2 px-6 py-3 glass-strong rounded-xl hover:bg-white/10 transition-all">
                    <span>${t('home.view_all_tracks', locale)}</span>
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
            <h2 class="text-4xl md:text-5xl font-black mb-12">${t('home.explore_vibe', locale)}</h2>
            
            <div class="bento-grid">
                <!-- Large Featured Genre -->
                <div class="bento-item-2 glass-strong rounded-3xl p-12 card-3d cursor-pointer group overflow-hidden relative">
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all"></div>
                    <div class="relative z-10">
                        <i class="fas fa-fire text-6xl mb-6 text-orange-400"></i>
                        <h3 class="text-3xl font-bold mb-2">${t('genre.electronic', locale)}</h3>
                        <p class="text-gray-400">2.3K ${t('home.tracks_count', locale)}</p>
                    </div>
                </div>
                
                <div class="bento-item-2 glass-strong rounded-3xl p-12 card-3d cursor-pointer group overflow-hidden relative">
                    <div class="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-all"></div>
                    <div class="relative z-10">
                        <i class="fas fa-heart text-6xl mb-6 text-pink-400"></i>
                        <h3 class="text-3xl font-bold mb-2">${t('genre.pop', locale)}</h3>
                        <p class="text-gray-400">1.8K ${t('home.tracks_count', locale)}</p>
                    </div>
                </div>
                
                <div class="bento-item-3 glass-strong rounded-3xl p-8 card-3d cursor-pointer group">
                    <i class="fas fa-drum text-4xl mb-4 text-blue-400"></i>
                    <h3 class="text-xl font-bold">${t('genre.hiphop', locale)}</h3>
                    <p class="text-gray-400 text-sm">956 ${t('home.tracks_count', locale)}</p>
                </div>
                
                <div class="bento-item-3 glass-strong rounded-3xl p-8 card-3d cursor-pointer group">
                    <i class="fas fa-guitar text-4xl mb-4 text-yellow-400"></i>
                    <h3 class="text-xl font-bold">${t('genre.rock', locale)}</h3>
                    <p class="text-gray-400 text-sm">1.2K ${t('home.tracks_count', locale)}</p>
                </div>
                
                <div class="bento-item-3 glass-strong rounded-3xl p-8 card-3d cursor-pointer group">
                    <i class="fas fa-leaf text-4xl mb-4 text-green-400"></i>
                    <h3 class="text-xl font-bold">${t('genre.ambient', locale)}</h3>
                    <p class="text-gray-400 text-sm">687 ${t('home.tracks_count', locale)}</p>
                </div>
                
                <div class="bento-item-3 glass-strong rounded-3xl p-8 card-3d cursor-pointer group">
                    <i class="fas fa-compact-disc text-4xl mb-4 text-purple-400"></i>
                    <h3 class="text-xl font-bold">${t('genre.jazz', locale)}</h3>
                    <p class="text-gray-400 text-sm">543 ${t('home.tracks_count', locale)}</p>
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
                    <h2 class="text-4xl md:text-6xl font-black mb-6">${t('home.cta_title', locale)}</h2>
                    <p class="text-xl text-gray-300 mb-12">
                        ${t('home.cta_desc', locale)}
                    </p>
                    <a href="/${locale}/producer/apply" class="inline-flex items-center space-x-3 px-12 py-6 btn-micro bg-white text-black rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all">
                        <i class="fas fa-rocket"></i>
                        <span>${t('home.cta_button', locale)}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    
    ${SharedFooterHTML(locale, { showNewsletter: true })}
    
    ${SharedNavigationScript(locale)}
    
    <!-- Global Audio Player -->
    ${GlobalAudioPlayerHTML}
    
    ${PlayButtonScript}
    
    <script>
    // Fetch and display tracks data
    const locale = '${locale}';
    
    async function loadHomepageData() {
        try {
            // Fetch tracks
            const response = await fetch('/api/tracks?limit=20');
            const data = await response.json();
            
            if (data.success && data.data && data.data.length > 0) {
                const tracks = data.data;
                
                // Update track count
                const trackCountEl = document.getElementById('trackCount');
                if (trackCountEl) {
                    trackCountEl.innerHTML = tracks.length + '+';
                }
                
                // Display Editor's Picks (first 3 tracks)
                displayEditorsPicks(tracks.slice(0, 3));
                
                // Display Trending Chart (first 10 tracks)
                displayTrendingChart(tracks.slice(0, 10));
            } else {
                // No tracks available - show demo tracks
                console.log('No tracks from API, displaying demo content');
                displayDemoTracks();
            }
        } catch (error) {
            console.error('Error loading homepage data:', error);
            displayDemoTracks();
        }
    }
    
    function displayDemoTracks() {
        // Demo tracks to show when database is empty
        const demoTracks = [
            {
                id: 'demo-1',
                title: 'Electronic Dreams',
                artist: 'Demo Artist',
                producer_name: 'Demo Artist',
                plays_count: 12543,
                likes_count: 892
            },
            {
                id: 'demo-2',
                title: 'Midnight Vibes',
                artist: 'Sample Producer',
                producer_name: 'Sample Producer',
                plays_count: 8921,
                likes_count: 654
            },
            {
                id: 'demo-3',
                title: 'Urban Rhythm',
                artist: 'Beat Maker',
                producer_name: 'Beat Maker',
                plays_count: 15234,
                likes_count: 1123
            },
            {
                id: 'demo-4',
                title: 'Chill Waves',
                artist: 'Ambient Sounds',
                producer_name: 'Ambient Sounds',
                plays_count: 6543,
                likes_count: 432
            },
            {
                id: 'demo-5',
                title: 'Bass Drop',
                artist: 'EDM Producer',
                producer_name: 'EDM Producer',
                plays_count: 21098,
                likes_count: 1876
            },
            {
                id: 'demo-6',
                title: 'Acoustic Journey',
                artist: 'Indie Artist',
                producer_name: 'Indie Artist',
                plays_count: 4321,
                likes_count: 298
            },
            {
                id: 'demo-7',
                title: 'Synth Paradise',
                artist: 'Retrowave',
                producer_name: 'Retrowave',
                plays_count: 9876,
                likes_count: 743
            },
            {
                id: 'demo-8',
                title: 'Lo-Fi Study',
                artist: 'Chill Beats',
                producer_name: 'Chill Beats',
                plays_count: 34567,
                likes_count: 2543
            },
            {
                id: 'demo-9',
                title: 'Jazz Fusion',
                artist: 'Smooth Jazz',
                producer_name: 'Smooth Jazz',
                plays_count: 7654,
                likes_count: 567
            },
            {
                id: 'demo-10',
                title: 'Hip Hop Beat',
                artist: 'Street Producer',
                producer_name: 'Street Producer',
                plays_count: 18765,
                likes_count: 1432
            }
        ];
        
        // Update track count
        const trackCountEl = document.getElementById('trackCount');
        if (trackCountEl) {
            trackCountEl.innerHTML = demoTracks.length + '+';
        }
        
        // Display Editor's Picks (first 3 demo tracks)
        displayEditorsPicks(demoTracks.slice(0, 3));
        
        // Display Trending Chart (all 10 demo tracks)
        displayTrendingChart(demoTracks);
    }
    
    function displayEditorsPicks(tracks) {
        const container = document.getElementById('editorsPicks');
        if (!container || tracks.length === 0) return;
        
        const [featured, ...rest] = tracks;
        
        // Build featured track HTML
        let html = '<div class="glass-strong rounded-3xl overflow-hidden card-3d group cursor-pointer">';
        html += '<div class="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center relative overflow-hidden">';
        html += '<div class="absolute inset-0 bg-black/40"></div>';
        html += '<i class="fas fa-music text-6xl text-white/30 relative z-10"></i>';
        html += '<div class="absolute bottom-4 right-4 z-20">';
        html += window.generatePlayButton ? window.generatePlayButton(featured, 'lg') : '';
        html += '</div></div>';
        html += '<div class="p-8">';
        html += '<h3 class="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-1">' + featured.title + '</h3>';
        html += '<p class="text-gray-400 line-clamp-1">' + (featured.artist || featured.producer_name || 'Unknown Artist') + '</p>';
        html += '<div class="flex items-center space-x-4 mt-4 text-sm text-gray-500">';
        html += '<span><i class="fas fa-play mr-1"></i> ' + (featured.plays_count || 0) + '</span>';
        html += '<span><i class="fas fa-heart mr-1"></i> ' + (featured.likes_count || 0) + '</span>';
        html += '</div></div></div>';
        
        // Build other tracks HTML
        html += '<div class="grid grid-rows-2 gap-6">';
        rest.forEach(track => {
            html += '<div class="glass-strong rounded-3xl p-6 card-3d group cursor-pointer flex items-center space-x-4">';
            html += '<div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 relative">';
            html += '<i class="fas fa-music text-3xl text-white/30"></i>';
            html += '<div class="absolute inset-0 flex items-center justify-center">';
            html += window.generatePlayButton ? window.generatePlayButton(track, 'sm') : '';
            html += '</div></div>';
            html += '<div class="flex-1 min-w-0">';
            html += '<h4 class="font-bold group-hover:text-purple-400 transition-colors line-clamp-1">' + track.title + '</h4>';
            html += '<p class="text-sm text-gray-400 line-clamp-1">' + (track.artist || track.producer_name || 'Unknown Artist') + '</p>';
            html += '<div class="flex items-center space-x-3 mt-2 text-xs text-gray-500">';
            html += '<span><i class="fas fa-play mr-1"></i> ' + (track.plays_count || 0) + '</span>';
            html += '</div></div></div>';
        });
        html += '</div>';
        
        container.innerHTML = html;
    }
    
    function displayTrendingChart(tracks) {
        const container = document.getElementById('trendingChart');
        if (!container || tracks.length === 0) return;
        
        let html = '';
        tracks.forEach((track, index) => {
            const isTop3 = index < 3;
            const rankClass = isTop3 ? 'bg-gradient-to-br from-yellow-400 to-orange-400 bg-clip-text text-transparent' : 'text-gray-600';
            
            html += '<div class="flex items-center space-x-4 p-4 glass rounded-2xl hover:bg-white/5 transition-all group cursor-pointer">';
            html += '<div class="text-3xl font-black ' + rankClass + ' w-12 text-center">' + (index + 1) + '</div>';
            html += '<div class="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex-shrink-0 flex items-center justify-center relative">';
            html += '<i class="fas fa-music text-2xl text-white/30"></i>';
            html += '<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">';
            html += window.generatePlayButton ? window.generatePlayButton(track, 'sm') : '';
            html += '</div></div>';
            html += '<div class="flex-1 min-w-0">';
            html += '<h4 class="font-bold group-hover:text-purple-400 transition-colors line-clamp-1">' + track.title + '</h4>';
            html += '<p class="text-sm text-gray-400 line-clamp-1">' + (track.artist || track.producer_name || 'Unknown Artist') + '</p>';
            html += '</div>';
            html += '<div class="text-right text-gray-500 text-sm space-y-1">';
            html += '<div><i class="fas fa-play mr-2"></i>' + (track.plays_count || 0) + '</div>';
            html += '<div><i class="fas fa-heart mr-2"></i>' + (track.likes_count || 0) + '</div>';
            html += '</div></div>';
        });
        
        container.innerHTML = html;
    }
    
    // Scroll reveal animation
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Load data when page loads
    window.addEventListener('DOMContentLoaded', () => {
        loadHomepageData();
        revealOnScroll();
    });
    
    // Scroll reveal
    window.addEventListener('scroll', revealOnScroll);
    </script>
</body>
</html>`;
}
