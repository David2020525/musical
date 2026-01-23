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
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
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
        
        /* Enhanced Card Hover Effects */
        .group {
            position: relative;
            transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .group::before {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            padding: 2px;
            background: linear-gradient(135deg, #9333EA, #EC4899, #3B82F6);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .group:hover::before {
            opacity: 0.6;
        }
        
        .group:hover {
            transform: translateY(-8px) scale(1.02);
        }
        
        .group::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            box-shadow: 
                0 20px 60px rgba(147, 51, 234, 0.3),
                0 10px 30px rgba(236, 72, 153, 0.2);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: -1;
        }
        
        .group:hover::after {
            opacity: 1;
        }
        
        /* Playing State - Cards */
        [data-track].playing {
            box-shadow: 0 0 30px rgba(147, 51, 234, 0.5), 0 0 60px rgba(236, 72, 153, 0.3);
            border: 1px solid rgba(147, 51, 234, 0.4) !important;
        }
        
        /* Modal Styles */
        .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            opacity: 0;
            animation: fadeIn 0.3s forwards;
        }
        
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .modal-content {
            background: rgba(20, 20, 30, 0.95);
            backdrop-filter: blur(40px) saturate(200%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: slideUp 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .modal-close {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            z-index: 10;
        }
        
        .modal-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }
        
        .modal-content::-webkit-scrollbar {
            width: 8px;
        }
        
        .modal-content::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
        }
        
        .modal-content::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #9333EA, #EC4899);
            border-radius: 4px;
        }
        
        /* Shimmer Effect */
        @keyframes shimmer {
            0% { background-position: -1000px; }
            100% { background-position: 1000px; }
        }
        
        /* Fade In Up Animation for Content */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-fade-in-up {
            animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
            opacity: 0;
        }
        
        /* Stagger animation delays for cards */
        .animate-fade-in-up:nth-child(1) { animation-delay: 0.1s; }
        .animate-fade-in-up:nth-child(2) { animation-delay: 0.2s; }
        .animate-fade-in-up:nth-child(3) { animation-delay: 0.3s; }
        .animate-fade-in-up:nth-child(4) { animation-delay: 0.4s; }
        .animate-fade-in-up:nth-child(5) { animation-delay: 0.5s; }
        .animate-fade-in-up:nth-child(6) { animation-delay: 0.6s; }
        .animate-fade-in-up:nth-child(7) { animation-delay: 0.7s; }
        .animate-fade-in-up:nth-child(8) { animation-delay: 0.8s; }
        
        /* Pulse animation for loading */
        @keyframes pulse-glow {
            0%, 100% {
                opacity: 1;
                box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
            }
            50% {
                opacity: 0.8;
                box-shadow: 0 0 40px rgba(236, 72, 153, 0.5);
            }
        }
        
        /* Animated Gradient Background */
        @keyframes gradient {
            0%, 100% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
        }
        
        .animate-gradient {
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
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
        
        /* Fallback: If JavaScript fails, show content after a delay */
        @media (prefers-reduced-motion: no-preference) {
            .reveal {
                animation: revealFallback 0.1s 0.5s forwards;
            }
        }
        
        @keyframes revealFallback {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
</head>
<body class="text-white min-h-screen overflow-x-hidden">
    
    ${SharedNavigationHTML(locale, { currentPage: 'home', showSearch: true, showAuth: true })}
    
    <!-- Hero Section with Gradient Mesh -->
    <div class="pt-32 pb-32 px-6 relative overflow-hidden">
        <!-- Animated Gradient Background -->
        <div class="absolute inset-0 -z-10">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20 animate-gradient"></div>
        </div>
        
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
    <div class="px-6 mb-24 mt-16">
        <div class="max-w-[1400px] mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="glass-strong rounded-3xl p-8 card-3d hover:bg-white/10 transition-all">
                    <div class="text-5xl font-black bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2" id="trackCount" style="min-height: 3rem;">
                        10
                    </div>
                    <div class="text-sm text-gray-400 font-medium uppercase tracking-wider">${t('home.stats_tracks', locale)}</div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8 card-3d hover:bg-white/10 transition-all">
                    <div class="text-5xl font-black bg-gradient-to-br from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2" id="userCount" style="min-height: 3rem;">
                        10
                    </div>
                    <div class="text-sm text-gray-400 font-medium uppercase tracking-wider">${t('home.stats_users', locale)}</div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8 card-3d hover:bg-white/10 transition-all">
                    <div class="text-5xl font-black bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2" id="playCount" style="min-height: 3rem;">
                        10
                    </div>
                    <div class="text-sm text-gray-400 font-medium uppercase tracking-wider">${t('home.stats_plays', locale)}</div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8 card-3d hover:bg-white/10 transition-all">
                    <div class="text-5xl font-black bg-gradient-to-br from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2" id="artistCount" style="min-height: 3rem;">
                        10
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
    <div class="px-6 mb-32 reveal">
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
        </div>
    </div>
    
    <!-- Featured Tracks - Advanced Grid -->
    <div class="px-6 mb-24 mt-32">
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
    // Debug: Verify script is loading
    console.log('Homepage script starting...');
    
    // Generate Play Button HTML (exposed to window)
    window.generatePlayButton = function(track, size = 'md') {
        const sizes = {
            sm: { btn: 'w-8 h-8 text-xs', icon: 'text-xs' },
            md: { btn: 'w-12 h-12 text-sm', icon: 'text-sm' },
            lg: { btn: 'w-16 h-16 text-lg', icon: 'text-base' }
        };
        
        const sizeClasses = sizes[size] || sizes.md;
        // Use safe JSON escaping function
        const trackJson = escapeJsonForAttribute(track);
        
        return \`
            <button 
                class="play-btn \${sizeClasses.btn} rounded-full bg-gradient-to-br from-purple-600 to-pink-600 
                       text-white flex items-center justify-center shadow-lg hover:shadow-xl 
                       hover:scale-110 transition-all duration-300 group relative overflow-hidden"
                data-track-id="\${track.id}"
                data-track="\${trackJson}"
                onclick="playTrack(this)"
                title="Play \${escapeHtml(track.title || 'Track')}"
            >
                <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <i class="fas fa-play \${sizeClasses.icon} relative z-10 play-icon"></i>
                <i class="fas fa-pause \${sizeClasses.icon} relative z-10 pause-icon hidden"></i>
                <div class="absolute inset-0 rounded-full animate-ping bg-purple-400 opacity-0 group-active:opacity-75"></div>
            </button>
            
            <style>
                .play-btn:active {
                    transform: scale(0.95);
                }
                
                .play-btn.playing {
                    box-shadow: 0 0 20px rgba(147, 51, 234, 0.6), 0 0 40px rgba(236, 72, 153, 0.4);
                }
                
                .play-btn.playing .play-icon {
                    display: none;
                }
                
                .play-btn.playing .pause-icon {
                    display: block;
                }
            </style>
        \`;
    };
    
    // Fetch and display tracks data
    const locale = '${locale}';
    
    // Play track from card click (replaces individual play buttons)
    window.playTrackFromCard = function(card) {
        try {
            const trackData = card.getAttribute('data-track');
            if (!trackData) return;
            
            const track = JSON.parse(trackData);
            
            // Check if Global Audio Player exists
            if (typeof window.GlobalAudioPlayer === 'undefined') {
                console.error('Global Audio Player not initialized');
                return;
            }
            
            // Get current state
            const currentTrack = window.GlobalAudioPlayer.getCurrentTrack();
            const isPlaying = window.GlobalAudioPlayer.isPlaying();
            
            // If same track, toggle play/pause
            if (currentTrack && currentTrack.id === track.id) {
                window.GlobalAudioPlayer.toggle();
            } else {
                // Play new track
                window.GlobalAudioPlayer.play(track);
            }
            
            // Update visual state
            updateCardStates();
        } catch (error) {
            console.error('Error playing track from card:', error);
        }
    };
    
    // Update all cards to show playing state
    window.updateCardStates = function() {
        if (typeof window.GlobalAudioPlayer === 'undefined') return;
        
        const currentTrack = window.GlobalAudioPlayer.getCurrentTrack();
        const isPlaying = window.GlobalAudioPlayer.isPlaying();
        
        // Update all track cards
        document.querySelectorAll('[data-track]').forEach(card => {
            try {
                const trackData = card.getAttribute('data-track');
                if (!trackData) return;
                
                const track = JSON.parse(trackData);
                
                if (currentTrack && track.id === currentTrack.id && isPlaying) {
                    card.classList.add('playing');
                } else {
                    card.classList.remove('playing');
                }
            } catch (e) {
                // Skip invalid cards
            }
        });
    };
    
    // Helper function to escape HTML entities
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Helper function to build track modal HTML
    function buildTrackModalHTML(trackData) {
        const demoBadge = trackData.is_demo ? '<span class="inline-block px-3 py-1 bg-purple-500/80 rounded-full text-xs font-bold mb-3">DEMO</span>' : '';
        const durationMinutes = Math.floor((trackData.duration || 0) / 60);
        const durationSeconds = String((trackData.duration || 0) % 60).padStart(2, '0');
        // Use safe JSON escaping function
        const trackJson = escapeJsonForAttribute(trackData);
        // Escape HTML entities for safe insertion
        const safeTitle = escapeHtml(trackData.title || 'Untitled');
        const safeArtist = escapeHtml(trackData.artist || trackData.producer_name || 'Unknown Artist');
        const safeGenre = escapeHtml(trackData.genre || 'Electronic');
        const safeProducerName = escapeHtml(trackData.producer_name || trackData.artist || 'Unknown');
        
        return '<div class="modal-content" onclick="event.stopPropagation()">' +
            '<button class="modal-close" onclick="closeModal()">' +
            '<i class="fas fa-times"></i>' +
            '</button>' +
            '<div class="p-8">' +
            '<div class="flex items-start space-x-6 mb-8">' +
            '<div class="w-48 h-48 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">' +
            '<i class="fas fa-music text-6xl text-white/30"></i>' +
            '</div>' +
            '<div class="flex-1">' +
            demoBadge +
            '<h2 class="text-4xl font-black mb-2">' + safeTitle + '</h2>' +
            '<p class="text-xl text-gray-400 mb-4">' + safeArtist + '</p>' +
            '<div class="flex items-center space-x-6 text-sm text-gray-500 mb-6">' +
            '<span><i class="fas fa-play mr-2"></i>' + (trackData.plays_count || 0) + ' plays</span>' +
            '<span><i class="fas fa-heart mr-2"></i>' + (trackData.likes_count || 0) + ' likes</span>' +
            '<span><i class="fas fa-clock mr-2"></i>' + durationMinutes + ':' + durationSeconds + '</span>' +
            '</div>' +
            '<button onclick="playTrackFromCard(this)" data-track="' + trackJson + '" class="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-xl hover:shadow-purple-500/50 transition-all flex items-center space-x-2">' +
            '<i class="fas fa-play"></i>' +
            '<span>Play Track</span>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">' +
            '<div class="glass p-6 rounded-xl">' +
            '<h3 class="text-lg font-bold mb-3"><i class="fas fa-info-circle mr-2 text-purple-400"></i>Track Information</h3>' +
            '<div class="space-y-2 text-sm">' +
            '<div class="flex justify-between"><span class="text-gray-400">Genre:</span><span class="font-semibold">' + safeGenre + '</span></div>' +
            '<div class="flex justify-between"><span class="text-gray-400">Duration:</span><span class="font-semibold">' + durationMinutes + ':' + durationSeconds + '</span></div>' +
            '<div class="flex justify-between"><span class="text-gray-400">BPM:</span><span class="font-semibold">120</span></div>' +
            '<div class="flex justify-between"><span class="text-gray-400">Key:</span><span class="font-semibold">C Minor</span></div>' +
            '</div>' +
            '</div>' +
            '<div class="glass p-6 rounded-xl">' +
            '<h3 class="text-lg font-bold mb-3"><i class="fas fa-user mr-2 text-purple-400"></i>Producer</h3>' +
            '<div class="space-y-2 text-sm">' +
            '<div class="flex justify-between"><span class="text-gray-400">Name:</span><span class="font-semibold">' + safeProducerName + '</span></div>' +
            '<div class="flex justify-between"><span class="text-gray-400">Tracks:</span><span class="font-semibold">15</span></div>' +
            '<div class="flex justify-between"><span class="text-gray-400">Followers:</span><span class="font-semibold">1.2K</span></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="glass p-6 rounded-xl mb-8">' +
            '<h3 class="text-lg font-bold mb-3"><i class="fas fa-align-left mr-2 text-purple-400"></i>Description</h3>' +
            '<p class="text-gray-400 leading-relaxed">' +
            'This is a demo track showcasing the MUSICAL platform\'s capabilities. ' +
            'In production, this section would contain the producer\'s detailed track description, ' +
            'usage rights, licensing information, and any special notes about the production.' +
            '</p>' +
            '</div>' +
            '<div class="mb-8">' +
            '<h3 class="text-lg font-bold mb-3"><i class="fas fa-tags mr-2 text-purple-400"></i>Tags</h3>' +
            '<div class="flex flex-wrap gap-2">' +
            '<span class="px-3 py-1 bg-white/5 rounded-full text-sm">' + genre + '</span>' +
            '<span class="px-3 py-1 bg-white/5 rounded-full text-sm">Chill</span>' +
            '<span class="px-3 py-1 bg-white/5 rounded-full text-sm">Ambient</span>' +
            '<span class="px-3 py-1 bg-white/5 rounded-full text-sm">Instrumental</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    
    // Modal functions
    window.showTrackModal = function(track) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.onclick = (e) => { if (e.target === modal) closeModal(); };
        
        const trackData = typeof track === 'string' ? JSON.parse(track) : track;
        
        modal.innerHTML = buildTrackModalHTML(trackData);
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    };
    
    window.showBlogModal = function(postIndex) {
        const demoPosts = [
            {
                title: locale === 'tr' ? 'Müzik Lisanslama Rehberi' : 'Music Licensing Guide for Beginners',
                excerpt: locale === 'tr' ? 'Müziğinizi lisanslamak hakkında bilmeniz gereken her şey...' : 'Everything you need to know about licensing your music...',
                content: locale === 'tr' 
                    ? 'Müzik lisanslama, müzisyenler için karmaşık ama önemli bir konudur. Bu rehberde, telif hakları, lisans türleri ve müziğinizi nasıl koruyacağınızı öğreneceksiniz...'
                    : 'Music licensing is a complex but crucial topic for musicians. In this guide, you will learn about copyrights, licensing types, and how to protect your music...',
                author: 'Admin',
                views: '1.5K',
                date: '2024-01-15',
                readTime: '5 min',
                category: locale === 'tr' ? 'Rehber' : 'Guide',
                icon: 'fa-book'
            },
            {
                title: locale === 'tr' ? 'Kaliteli Beat Yapım İpuçları' : 'Tips for Creating Quality Beats',
                excerpt: locale === 'tr' ? 'Profesyonel beatler oluşturmak için en iyi uygulamalar...' : 'Best practices for crafting professional beats...',
                content: locale === 'tr'
                    ? 'Kaliteli beat üretimi, teknik bilgi ve yaratıcılığın birleşimidir. Bu makalede, profesyonel prodüktörlerden ipuçları ve püf noktaları bulacaksınız...'
                    : 'Quality beat production is a combination of technical knowledge and creativity. In this article, you will find tips and tricks from professional producers...',
                author: 'Producer Team',
                views: '2.3K',
                date: '2024-01-12',
                readTime: '7 min',
                category: locale === 'tr' ? 'Prodüksiyon' : 'Production',
                icon: 'fa-music'
            },
            {
                title: locale === 'tr' ? 'Müzik Pazarlaması 101' : 'Music Marketing 101',
                excerpt: locale === 'tr' ? 'Müziğinizi etkili bir şekilde tanıtma stratejileri...' : 'Strategies for promoting your music effectively...',
                content: locale === 'tr'
                    ? 'Dijital çağda müzik pazarlaması, başarının anahtarıdır. Sosyal medya, streaming platformları ve diğer kanalları kullanarak kitlenizi nasıl büyütebileceğinizi keşfedin...'
                    : 'In the digital age, music marketing is key to success. Discover how to grow your audience using social media, streaming platforms, and other channels...',
                author: 'Marketing Team',
                views: '1.8K',
                date: '2024-01-10',
                readTime: '6 min',
                category: locale === 'tr' ? 'Pazarlama' : 'Marketing',
                icon: 'fa-chart-line'
            }
        ];
        
        const post = demoPosts[postIndex];
        if (!post) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.onclick = (e) => { if (e.target === modal) closeModal(); };
        
        modal.innerHTML = '<div class="modal-content" onclick="event.stopPropagation()">' +
            '<button class="modal-close" onclick="closeModal()">' +
            '<i class="fas fa-times"></i>' +
            '</button>' +
            '<div class="p-8">' +
            '<div class="mb-8">' +
            '<span class="inline-block px-3 py-1 bg-blue-500/80 rounded-full text-xs font-bold mb-4">' + post.category + '</span>' +
            '<h2 class="text-4xl font-black mb-4">' + post.title + '</h2>' +
            '<div class="flex items-center space-x-6 text-sm text-gray-400 mb-6">' +
            '<span><i class="fas fa-user mr-2"></i>' + post.author + '</span>' +
            '<span><i class="fas fa-calendar mr-2"></i>' + post.date + '</span>' +
            '<span><i class="fas fa-clock mr-2"></i>' + post.readTime + ' read</span>' +
            '<span><i class="fas fa-eye mr-2"></i>' + post.views + ' views</span>' +
            '</div>' +
            '</div>' +
            '<div class="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-8 relative overflow-hidden">' +
            '<div class="absolute inset-0 bg-black/40"></div>' +
            '<i class="fas ' + post.icon + ' text-6xl text-white/30 relative z-10"></i>' +
            '</div>' +
            '<div class="prose prose-invert max-w-none">' +
            '<p class="text-lg text-gray-300 leading-relaxed mb-6">' + post.content + '</p>' +
            '<p class="text-gray-400 leading-relaxed mb-6">' +
            'This is demo content. In production, this would be the full blog post with rich text formatting, ' +
            'images, code snippets, embedded media, and more. The blog system would support markdown or a ' +
            'rich text editor for content creation.' +
            '</p>' +
            '<h3 class="text-2xl font-bold mb-4 mt-8">Key Takeaways</h3>' +
            '<ul class="list-disc list-inside space-y-2 text-gray-400 mb-6">' +
            '<li>Professional advice from industry experts</li>' +
            '<li>Practical tips you can apply immediately</li>' +
            '<li>Step-by-step guidance for beginners</li>' +
            '<li>Real-world examples and case studies</li>' +
            '</ul>' +
            '<p class="text-gray-400 leading-relaxed">' +
            'Continue reading on the full blog page for more detailed information, ' +
            'downloadable resources, and community discussions.' +
            '</p>' +
            '</div>' +
            '<div class="flex items-center space-x-4 mt-8 pt-8 border-t border-white/10">' +
            '<button class="px-6 py-3 glass-strong rounded-xl hover:bg-white/10 transition-all flex items-center space-x-2">' +
            '<i class="fas fa-heart"></i>' +
            '<span>Like</span>' +
            '</button>' +
            '<button class="px-6 py-3 glass-strong rounded-xl hover:bg-white/10 transition-all flex items-center space-x-2">' +
            '<i class="fas fa-bookmark"></i>' +
            '<span>Save</span>' +
            '</button>' +
            '<button class="px-6 py-3 glass-strong rounded-xl hover:bg-white/10 transition-all flex items-center space-x-2">' +
            '<i class="fas fa-share"></i>' +
            '<span>Share</span>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>';
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    };
    
    window.closeModal = function() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    };
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Helper function to format numbers
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M+';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K+';
        }
        return num.toString();
    }
    
    // Safe JSON escaping for HTML attributes - handles all edge cases
    function escapeJsonForAttribute(obj) {
        try {
            // First stringify the object (JSON.stringify already escapes special chars in strings)
            let json = JSON.stringify(obj);
            // Then escape for HTML attribute (must escape & first to avoid double-escaping!)
            // Note: JSON.stringify already handles \n, \r, \t, etc. in strings as \n, \r, \t
            // But we need to ensure they don't break HTML attributes
            return json
                .replace(/&/g, '&amp;')      // Escape ampersands FIRST (critical!)
                .replace(/"/g, '&quot;')      // Escape double quotes
                .replace(/'/g, '&#39;')       // Escape single quotes  
                .replace(/</g, '&lt;')        // Escape less than
                .replace(/>/g, '&gt;')        // Escape greater than
                .replace(/\r\n/g, '\\r\\n')   // Ensure CRLF is escaped
                .replace(/\n/g, '\\n')        // Ensure newlines are escaped
                .replace(/\r/g, '\\r')         // Ensure carriage returns are escaped
                .replace(/\t/g, '\\t');        // Ensure tabs are escaped
        } catch (e) {
            console.error('Error escaping JSON for attribute:', e, obj);
            return '{}';
        }
    }
    
    // Load platform statistics
    async function loadStats() {
        console.log('loadStats() called');
        const trackCountEl = document.getElementById('trackCount');
        const userCountEl = document.getElementById('userCount');
        const playCountEl = document.getElementById('playCount');
        const artistCountEl = document.getElementById('artistCount');
        
        // Helper to safely update element
        function updateStatElement(el, value) {
            if (!el) {
                console.warn('updateStatElement: element is null');
                return;
            }
            
            console.log('Updating element:', el.id, 'with value:', value);
            
            // Remove ALL shimmer/loading elements - use querySelectorAll to get all
            const shimmers = el.querySelectorAll('.shimmer');
            console.log('Found', shimmers.length, 'shimmer elements');
            shimmers.forEach(shimmer => {
                console.log('Removing shimmer element:', shimmer);
                shimmer.remove();
            });
            
            // Also remove ANY child elements that might be loading placeholders
            // This is more aggressive - remove all children first
            const children = Array.from(el.children);
            console.log('Found', children.length, 'child elements');
            children.forEach(child => {
                // Remove any span, div, or other element that might be a placeholder
                if (child.classList.contains('shimmer') || 
                    child.classList.contains('glass') ||
                    child.tagName === 'SPAN' ||
                    (child.tagName === 'DIV' && (child.classList.contains('shimmer') || child.classList.contains('glass')))) {
                    console.log('Removing placeholder child:', child.tagName, child.className);
                    child.remove();
                }
            });
            
            // Clear ALL content first - this ensures we start fresh
            el.innerHTML = '';
            
            // Set the new value as text content
            // The gradient CSS classes are already on the element, so they'll apply to the text
            const formattedValue = formatNumber(value || 0);
            console.log('Setting textContent to:', formattedValue);
            el.textContent = formattedValue;
            
            // Verify the update worked
            const actualContent = el.textContent.trim();
            if (actualContent === formattedValue) {
                console.log('✅ Successfully updated', el.id, 'to', formattedValue);
            } else {
                console.error('❌ Failed to update', el.id, '- expected:', formattedValue, 'got:', actualContent);
                // Force update by clearing and setting again
                el.innerHTML = '';
                el.textContent = formattedValue;
                console.log('Retry: Set to', el.textContent);
            }
        }
        
        try {
            console.log('Fetching /api/tracks/stats...');
            
            // Add timeout to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            const response = await fetch('/api/tracks/stats', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            console.log('Stats response status:', response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error('Stats API returned ' + response.status + ': ' + response.statusText);
            }
            
            const data = await response.json();
            console.log('Stats data received:', data);
            
            if (data.success && data.data) {
                const stats = data.data;
                console.log('Updating stats UI with:', stats);
                console.log('Elements found:', {
                    trackCount: !!trackCountEl,
                    userCount: !!userCountEl,
                    playCount: !!playCountEl,
                    artistCount: !!artistCountEl
                });
                
                // Update all stats - ensure elements exist before updating
                if (trackCountEl) updateStatElement(trackCountEl, stats.tracks);
                if (userCountEl) updateStatElement(userCountEl, stats.users);
                if (playCountEl) updateStatElement(playCountEl, stats.plays);
                if (artistCountEl) updateStatElement(artistCountEl, stats.artists);
                
                console.log('Stats UI updated successfully');
            } else {
                console.warn('Stats API returned success:false or no data:', data);
                // Set default values
                if (trackCountEl) updateStatElement(trackCountEl, 0);
                if (userCountEl) updateStatElement(userCountEl, 0);
                if (playCountEl) updateStatElement(playCountEl, 0);
                if (artistCountEl) updateStatElement(artistCountEl, 0);
            }
        } catch (error) {
            console.error('Error loading stats:', error);
            console.error('Error details:', error.name, error.message);
            
            // Always set default values if stats fail to load
            // This ensures shimmer is removed even on error
            updateStatElement(trackCountEl, 0);
            updateStatElement(userCountEl, 0);
            updateStatElement(playCountEl, 0);
            updateStatElement(artistCountEl, 0);
        }
    }
    
    async function loadHomepageData() {
        console.log('loadHomepageData() called');
        
        // Load stats immediately (independent of tracks)
        // Call with explicit error handling to ensure it runs even if other code fails
        try {
            await loadStats();
        } catch (err) {
            console.error('Stats loading error:', err);
            // Even if loadStats fails, try to remove shimmer placeholders and show zeros
            ['trackCount', 'userCount', 'playCount', 'artistCount'].forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    // Remove all shimmer elements
                    const shimmers = el.querySelectorAll('.shimmer');
                    shimmers.forEach(shimmer => shimmer.remove());
                    // Remove any child divs that might be placeholders
                    Array.from(el.children).forEach(child => {
                        if (child.classList.contains('shimmer') || child.classList.contains('glass')) {
                            child.remove();
                        }
                    });
                    // Set to 0 if empty or still has shimmer
                    if (el.textContent.trim() === '' || el.querySelector('.shimmer')) {
                        el.textContent = '0';
                    }
                }
            });
        }
        
        // Flag to prevent multiple fallback triggers
        let fallbackTriggered = false;
        
        // Set a timeout to show demo content if API doesn't respond
        let timeoutId = setTimeout(() => {
            if (!fallbackTriggered) {
                console.warn('API request timed out after 5 seconds, showing demo content');
                fallbackTriggered = true;
                displayDemoTracks();
            }
        }, 5000); // 5 second timeout
        
        try {
            // Fetch tracks with AbortController for better timeout handling
            const controller = new AbortController();
            const timeoutAbort = setTimeout(() => controller.abort(), 5000);
            
            console.log('Fetching /api/tracks?limit=20...');
            const response = await fetch('/api/tracks?limit=20', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutAbort);
            clearTimeout(timeoutId); // Clear timeout if we got a response
            console.log('Response received:', response.status, response.statusText);
            
            // Handle non-OK responses
            if (!response.ok) {
                console.warn('API returned error status:', response.status);
                // Try to parse error response
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    errorData = { success: false, error: 'API error ' + response.status };
                }
                
                // If API explicitly says it failed, show demo content
                if (!errorData.success || response.status >= 500) {
                    console.log('API error detected, showing demo content');
                    if (!fallbackTriggered) {
                        fallbackTriggered = true;
                        displayDemoTracks();
                    }
                    return;
                }
            }
            
            const data = await response.json();
            console.log('Data received:', data);
            console.log('Data structure check:', {
                hasSuccess: !!data.success,
                hasData: !!data.data,
                dataIsArray: Array.isArray(data.data),
                dataLength: data.data ? data.data.length : 0,
                firstTrack: data.data && data.data.length > 0 ? data.data[0] : null
            });
            
            // Check if we have valid tracks data
            if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                const tracks = data.data;
                console.log('Tracks array:', tracks);
                console.log('First 3 tracks for Editors Picks:', tracks.slice(0, 3));
                
                // Display Editor's Picks (first 3 tracks)
                console.log('Calling displayEditorsPicks with tracks:', tracks.slice(0, 3));
                displayEditorsPicks(tracks.slice(0, 3));
                
                // Display Trending Chart (first 10 tracks)
                displayTrendingChart(tracks.slice(0, 10));
                
                // Display All Tracks Grid (first 8 tracks)
                displayTrackGrid(tracks.slice(0, 8));
                
                // Display Blog Preview (async - don't await, let it load independently)
                displayBlogPreview().catch(err => {
                    console.error('Error loading blog preview:', err);
                });
            } else {
                // No tracks available or API returned success:false - show demo tracks immediately
                console.log('No tracks from API (empty array or success:false), displaying demo content immediately');
                console.log('API response was:', {
                    success: data.success,
                    hasData: !!data.data,
                    dataType: typeof data.data,
                    dataIsArray: Array.isArray(data.data),
                    dataLength: data.data ? (Array.isArray(data.data) ? data.data.length : 'not array') : 0
                });
                if (!fallbackTriggered) {
                    fallbackTriggered = true;
                    displayDemoTracks();
                }
            }
        } catch (error) {
            clearTimeout(timeoutId); // Clear timeout on error
            console.error('Error loading homepage data:', error);
            console.error('Error details:', error.name, error.message);
            
            // Handle AbortError (timeout)
            if (error.name === 'AbortError') {
                console.warn('Request aborted (timeout), showing demo content');
            }
            
            // Always show demo content as fallback
            if (!fallbackTriggered) {
                fallbackTriggered = true;
                displayDemoTracks();
            }
        }
    }
        } catch (error) {
            clearTimeout(timeoutId); // Clear timeout on error
            console.error('Error loading homepage data:', error);
            console.error('Error details:', error.name, error.message);
            
            // Handle AbortError (timeout)
            if (error.name === 'AbortError') {
                console.warn('Request aborted (timeout), showing demo content');
            }
            
            // Always show demo content as fallback
            if (!fallbackTriggered) {
                fallbackTriggered = true;
                displayDemoTracks();
            }
        }
    }
    
    function displayDemoTracks() {
        // Demo tracks with real playable audio URLs
        // Using royalty-free music from various sources
        const demoTracks = [
            {
                id: 'demo-1',
                title: locale === 'tr' ? 'Elektronik Rüyalar' : 'Electronic Dreams',
                artist: locale === 'tr' ? 'Demo Sanatçı' : 'Demo Artist',
                producer_name: locale === 'tr' ? 'Demo Sanatçı' : 'Demo Artist',
                plays_count: 12543,
                likes_count: 892,
                audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                cover_url: '',
                duration: 210,
                genre: 'Electronic',
                is_demo: true
            },
            {
                id: 'demo-2',
                title: locale === 'tr' ? 'Gece Vibes' : 'Midnight Vibes',
                artist: locale === 'tr' ? 'Örnek Prodüktör' : 'Sample Producer',
                producer_name: locale === 'tr' ? 'Örnek Prodüktör' : 'Sample Producer',
                plays_count: 8921,
                likes_count: 654,
                audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                cover_url: '',
                duration: 195,
                genre: 'Ambient',
                is_demo: true
            },
            {
                id: 'demo-3',
                title: locale === 'tr' ? 'Şehir Ritmi' : 'Urban Rhythm',
                artist: locale === 'tr' ? 'Beat Yapımcısı' : 'Beat Maker',
                producer_name: locale === 'tr' ? 'Beat Yapımcısı' : 'Beat Maker',
                plays_count: 15234,
                likes_count: 1123,
                audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
                cover_url: '',
                duration: 225,
                genre: 'Hip Hop',
                is_demo: true
            },
            {
                id: 'demo-4',
                title: locale === 'tr' ? 'Sakin Dalgalar' : 'Chill Waves',
                artist: locale === 'tr' ? 'Ortam Sesleri' : 'Ambient Sounds',
                producer_name: locale === 'tr' ? 'Ortam Sesleri' : 'Ambient Sounds',
                plays_count: 6543,
                likes_count: 432,
                audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
                cover_url: '',
                duration: 180,
                genre: 'Ambient',
                is_demo: true
            },
            {
                id: 'demo-5',
                title: locale === 'tr' ? 'Bas Düşüşü' : 'Bass Drop',
                artist: locale === 'tr' ? 'EDM Prodüktör' : 'EDM Producer',
                producer_name: locale === 'tr' ? 'EDM Prodüktör' : 'EDM Producer',
                plays_count: 21098,
                likes_count: 1876,
                audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
                cover_url: '',
                duration: 240,
                genre: 'Electronic',
                is_demo: true
            },
            {
                id: 'demo-6',
                title: locale === 'tr' ? 'Akustik Yolculuk' : 'Acoustic Journey',
                artist: locale === 'tr' ? 'Indie Sanatçı' : 'Indie Artist',
                producer_name: locale === 'tr' ? 'Indie Sanatçı' : 'Indie Artist',
                plays_count: 4321,
                likes_count: 298,
                audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
                cover_url: '',
                duration: 205,
                genre: 'Acoustic',
                is_demo: true
            },
            {
                id: 'demo-7',
                title: locale === 'tr' ? 'Synth Cenneti' : 'Synth Paradise',
                artist: 'Retrowave',
                producer_name: 'Retrowave',
                plays_count: 9876,
                likes_count: 743,
                audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
                cover_url: '',
                duration: 215,
                genre: 'Electronic',
                is_demo: true
            },
            {
                id: 'demo-8',
                title: locale === 'tr' ? 'Lo-Fi Çalışma' : 'Lo-Fi Study',
                artist: locale === 'tr' ? 'Sakin Beats' : 'Chill Beats',
                producer_name: locale === 'tr' ? 'Sakin Beats' : 'Chill Beats',
                plays_count: 34567,
                likes_count: 2543,
                audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
                cover_url: '',
                duration: 190,
                genre: 'Lo-Fi',
                is_demo: true
            },
            {
                id: 'demo-9',
                title: locale === 'tr' ? 'Caz Füzyon' : 'Jazz Fusion',
                artist: locale === 'tr' ? 'Yumuşak Caz' : 'Smooth Jazz',
                producer_name: locale === 'tr' ? 'Yumuşak Caz' : 'Smooth Jazz',
                plays_count: 7654,
                likes_count: 567,
                audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
                cover_url: '',
                duration: 230,
                genre: 'Jazz',
                is_demo: true
            },
            {
                id: 'demo-10',
                title: locale === 'tr' ? 'Hip Hop Ritmi' : 'Hip Hop Beat',
                artist: locale === 'tr' ? 'Sokak Prodüktörü' : 'Street Producer',
                producer_name: locale === 'tr' ? 'Sokak Prodüktörü' : 'Street Producer',
                plays_count: 18765,
                likes_count: 1432,
                audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
                cover_url: '',
                duration: 220,
                genre: 'Hip Hop',
                is_demo: true
            }
        ];
        
        // Track count will be updated by loadStats() if available
        // Otherwise keep loading state or show demo count
        
        // Display Editor's Picks (first 3 demo tracks)
        displayEditorsPicks(demoTracks.slice(0, 3));
        
        // Display Trending Chart (all 10 demo tracks)
        displayTrendingChart(demoTracks);
        
        // Display All Tracks Grid (8 tracks)
        displayTrackGrid(demoTracks.slice(0, 8));
        
        // Display Blog Preview (3 demo posts)
        displayBlogPreview();
    }
    
    function displayEditorsPicks(tracks) {
        console.log('displayEditorsPicks called with tracks:', tracks);
        console.log('Tracks type:', typeof tracks, 'Is array:', Array.isArray(tracks));
        
        const container = document.getElementById('editorsPicks');
        
        if (!container) {
            console.error('Editors Picks container not found!');
            console.error('Available elements with "editors" in id:', Array.from(document.querySelectorAll('[id*="editors" i]')).map(el => el.id));
            return;
        }
        
        console.log('Container found:', container);
        
        if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
            console.warn('No tracks provided to displayEditorsPicks. Tracks:', tracks);
            // Clear loading skeleton and show empty state
            container.innerHTML = '<div class="col-span-2 text-center py-12 text-gray-400">No tracks available</div>';
            return;
        }
        
        try {
            const [featured, ...rest] = tracks;
            
            console.log('Featured track:', featured);
            console.log('Rest tracks:', rest);
            
            if (!featured || typeof featured !== 'object') {
                console.error('Featured track is missing or invalid:', featured);
                container.innerHTML = '<div class="col-span-2 text-center py-12 text-gray-400">No tracks available</div>';
                return;
            }
            
            // Build featured track HTML with card-level click (no play button overlay)
            // Use safe JSON escaping function
            const trackJson = escapeJsonForAttribute(featured);
            let html = '<div class="glass-strong rounded-3xl overflow-hidden card-3d group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20" onclick="playTrackFromCard(this)" data-track="' + trackJson + '">';
            html += '<div class="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center relative overflow-hidden">';
            html += '<div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>';
            
            // Just the music icon, no play button overlay
            html += '<i class="fas fa-music text-6xl text-white/30 relative z-10 group-hover:text-white/50 transition-colors"></i>';
            
            // Add DEMO badge if this is a demo track
            if (featured.is_demo) {
                const demoBadge = locale === 'tr' ? 'DEMO' : 'DEMO';
                html += '<div class="absolute top-4 left-4 z-20 px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-xs font-bold">' + demoBadge + '</div>';
            }
            
            html += '</div>';
            html += '<div class="p-8">';
            html += '<h3 class="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-1">' + (featured.title || 'Untitled') + '</h3>';
            html += '<p class="text-gray-400 line-clamp-1">' + (featured.artist || featured.producer_name || 'Unknown Artist') + '</p>';
            html += '<div class="flex items-center space-x-4 mt-4 text-sm text-gray-500">';
            html += '<span><i class="fas fa-play mr-1"></i> ' + (featured.plays_count || 0) + '</span>';
            html += '<span><i class="fas fa-heart mr-1"></i> ' + (featured.likes_count || 0) + '</span>';
            html += '</div></div></div>';
            
            // Build other tracks HTML with card-level click
            if (rest.length > 0) {
                html += '<div class="grid grid-rows-2 gap-6">';
                rest.forEach(track => {
                    if (!track) return;
                    // Use safe JSON escaping function
                    const trackJson = escapeJsonForAttribute(track);
                    html += '<div class="glass-strong rounded-3xl p-6 card-3d group cursor-pointer flex items-center space-x-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10" onclick="playTrackFromCard(this)" data-track="' + trackJson + '">';
                    html += '<div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 relative overflow-hidden">';
                    
                    // Subtle hover effect on background, no play button
                    html += '<div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>';
                    html += '<i class="fas fa-music text-3xl text-white/30 relative z-10 group-hover:text-white/50 transition-colors"></i>';
                    
                    // Add DEMO badge if this is a demo track
                    if (track.is_demo) {
                        html += '<div class="absolute top-1 left-1 px-2 py-0.5 bg-purple-500/80 backdrop-blur-sm rounded text-xs font-bold">DEMO</div>';
                    }
                    
                    html += '</div>';
                    html += '<div class="flex-1 min-w-0">';
                    // Escape HTML entities for safe insertion
                    const safeTrackTitle = escapeHtml(track.title || 'Untitled');
                    const safeTrackArtist = escapeHtml(track.artist || track.producer_name || 'Unknown Artist');
                    html += '<h4 class="font-bold group-hover:text-purple-400 transition-colors line-clamp-1">' + safeTrackTitle + '</h4>';
                    html += '<p class="text-sm text-gray-400 line-clamp-1">' + safeTrackArtist + '</p>';
                    html += '<div class="flex items-center space-x-3 mt-2 text-xs text-gray-500">';
                    html += '<span><i class="fas fa-play mr-1"></i> ' + (track.plays_count || 0) + '</span>';
                    html += '</div></div></div>';
                });
                html += '</div>';
            } else {
                // If only one track, add empty grid to maintain layout
                html += '<div class="grid grid-rows-2 gap-6"></div>';
            }
            
            container.innerHTML = html;
            console.log('Editors Picks displayed successfully');
        } catch (error) {
            console.error('Error in displayEditorsPicks:', error);
            container.innerHTML = '<div class="col-span-2 text-center py-12 text-gray-400">Error loading tracks</div>';
        }
    }
    
    function displayTrendingChart(tracks) {
        const container = document.getElementById('trendingChart');
        if (!container || tracks.length === 0) return;
        
        let html = '';
        tracks.forEach((track, index) => {
            // Gradient hierarchy for rankings
            let rankClass;
            if (index < 3) {
                // Top 3: Gold gradient
                rankClass = 'bg-gradient-to-br from-yellow-400 to-orange-400 bg-clip-text text-transparent';
            } else if (index < 6) {
                // 4-6: Purple-pink gradient
                rankClass = 'bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent';
            } else {
                // 7-10: Subtle blue-purple gradient
                rankClass = 'bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent opacity-70';
            }
            
            // Use safe JSON escaping function
            const trackJson = escapeJsonForAttribute(track);
            html += '<div class="flex items-center space-x-4 p-4 glass rounded-2xl hover:bg-white/5 transition-all group cursor-pointer hover:scale-[1.01]" onclick="playTrackFromCard(this)" data-track="' + trackJson + '">';
            html += '<div class="text-3xl font-black ' + rankClass + ' w-12 text-center flex-shrink-0">' + (index + 1) + '</div>';
            html += '<div class="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex-shrink-0 flex items-center justify-center relative overflow-hidden">';
            
            // Subtle hover effect, no play button
            html += '<div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>';
            html += '<i class="fas fa-music text-2xl text-white/30 relative z-10 group-hover:text-white/50 transition-colors"></i>';
            html += '</div>';
            html += '<div class="flex-1 min-w-0">';
            // Escape HTML entities for safe insertion
            const safeTrendingTitle = escapeHtml(track.title || 'Untitled');
            const safeTrendingArtist = escapeHtml(track.artist || track.producer_name || 'Unknown Artist');
            html += '<h4 class="font-bold group-hover:text-purple-400 transition-colors line-clamp-1">' + safeTrendingTitle + '</h4>';
            html += '<p class="text-sm text-gray-400 line-clamp-1">' + safeTrendingArtist + '</p>';
            html += '</div>';
            html += '<div class="text-right text-gray-500 text-sm space-y-1 flex-shrink-0">';
            html += '<div><i class="fas fa-play mr-2"></i>' + (track.plays_count || 0) + '</div>';
            html += '<div><i class="fas fa-heart mr-2"></i>' + (track.likes_count || 0) + '</div>';
            html += '</div></div>';
        });
        
        container.innerHTML = html;
    }
    
    function displayTrackGrid(tracks) {
        const container = document.getElementById('trackGrid');
        if (!container || tracks.length === 0) return;
        
        let html = '';
        tracks.forEach(track => {
            // Use safe JSON escaping function
            const trackJson = escapeJsonForAttribute(track);
            html += '<div class="glass-strong rounded-3xl overflow-hidden card-3d group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 relative">';
            html += '<div class="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center relative overflow-hidden cursor-pointer" onclick="playTrackFromCard(this)" data-track="' + trackJson + '">';
            html += '<div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>';
            html += '<i class="fas fa-music text-5xl text-white/30 relative z-10 group-hover:text-white/50 transition-colors"></i>';
            
            // DEMO badge
            if (track.is_demo) {
                html += '<div class="absolute top-3 left-3 px-2 py-1 bg-purple-500/80 backdrop-blur-sm rounded text-xs font-bold">DEMO</div>';
            }
            
            // Info button - removed to avoid escaping complexity
            // Users can click on the card itself to play the track
            
            html += '</div>';
            html += '<div class="p-4">';
            // Escape HTML entities for safe insertion
            const safeGridTitle = escapeHtml(track.title || 'Untitled');
            const safeGridArtist = escapeHtml(track.artist || track.producer_name || 'Unknown Artist');
            html += '<h3 class="font-bold mb-1 group-hover:text-purple-400 transition-colors line-clamp-1">' + safeGridTitle + '</h3>';
            html += '<p class="text-sm text-gray-400 line-clamp-1">' + safeGridArtist + '</p>';
            html += '<div class="flex items-center justify-between mt-3 text-xs text-gray-500">';
            html += '<span><i class="fas fa-play mr-1"></i> ' + (track.plays_count || 0) + '</span>';
            html += '<span><i class="fas fa-heart mr-1"></i> ' + (track.likes_count || 0) + '</span>';
            html += '</div></div></div>';
        });
        
        container.innerHTML = html;
    }
    
    async function displayBlogPreview() {
        const container = document.getElementById('blogPreview');
        if (!container) return;
        
        // Try to fetch real blog posts from API
        try {
            const response = await fetch('/api/blog/posts?limit=3');
            const data = await response.json();
            
            if (data.success && data.data && data.data.length > 0) {
                const posts = data.data.slice(0, 3);
                const categoryIcons = {
                    'Guide': 'fa-book',
                    'Production': 'fa-music',
                    'Marketing': 'fa-chart-line',
                    'Tutorial': 'fa-graduation-cap',
                    'News': 'fa-newspaper',
                    'Review': 'fa-star'
                };
                
                let html = '';
                posts.forEach((post, index) => {
                    const category = post.category || 'News';
                    const icon = categoryIcons[category] || 'fa-newspaper';
                    const views = post.views_count ? (post.views_count >= 1000 ? (post.views_count / 1000).toFixed(1) + 'K' : post.views_count.toString()) : '0';
                    const author = post.author_name || post.author_username || 'Admin';
                    const excerpt = post.excerpt || (post.content ? post.content.substring(0, 100) + '...' : '');
                    const slug = post.slug || '';
                    
                    html += '<div class="glass-strong rounded-3xl overflow-hidden card-3d group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10" onclick="window.location.href=\'/' + locale + '/blog/' + slug + '\'">';
                    html += '<div class="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center relative overflow-hidden">';
                    html += '<div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>';
                    html += '<i class="fas ' + icon + ' text-5xl text-white/30 relative z-10 group-hover:text-white/50 transition-colors"></i>';
                    html += '<div class="absolute top-3 left-3 px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-xs font-bold">' + category + '</div>';
                    html += '</div>';
                    html += '<div class="p-6">';
                    html += '<h3 class="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">' + post.title + '</h3>';
                    html += '<p class="text-gray-400 text-sm mb-4 line-clamp-2">' + excerpt + '</p>';
                    html += '<div class="flex items-center justify-between text-sm text-gray-500">';
                    html += '<span><i class="fas fa-user mr-2"></i>' + author + '</span>';
                    html += '<span><i class="fas fa-eye mr-2"></i>' + views + ' views</span>';
                    html += '</div></div></div>';
                });
                
                container.innerHTML = html;
                return;
            }
        } catch (error) {
            console.error('Failed to load blog posts:', error);
        }
        
        // Fallback to demo posts if API fails or returns no posts
        const demoPosts = [
            {
                title: locale === 'tr' ? 'Müzik Lisanslama Rehberi' : 'Music Licensing Guide for Beginners',
                excerpt: locale === 'tr' ? 'Müziğinizi lisanslamak hakkında bilmeniz gereken her şey...' : 'Everything you need to know about licensing your music...',
                author: 'Admin',
                views: '1.5K',
                category: locale === 'tr' ? 'Rehber' : 'Guide',
                icon: 'fa-book'
            },
            {
                title: locale === 'tr' ? 'Kaliteli Beat Yapım İpuçları' : 'Tips for Creating Quality Beats',
                excerpt: locale === 'tr' ? 'Profesyonel beatler oluşturmak için en iyi uygulamalar...' : 'Best practices for crafting professional beats...',
                author: 'Producer Team',
                views: '2.3K',
                category: locale === 'tr' ? 'Prodüksiyon' : 'Production',
                icon: 'fa-music'
            },
            {
                title: locale === 'tr' ? 'Müzik Pazarlaması 101' : 'Music Marketing 101',
                excerpt: locale === 'tr' ? 'Müziğinizi etkili bir şekilde tanıtma stratejileri...' : 'Strategies for promoting your music effectively...',
                author: 'Marketing Team',
                views: '1.8K',
                category: locale === 'tr' ? 'Pazarlama' : 'Marketing',
                icon: 'fa-chart-line'
            }
        ];
        
        let html = '';
        demoPosts.forEach((post, index) => {
            html += '<div class="glass-strong rounded-3xl overflow-hidden card-3d group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10" onclick="showBlogModal(' + index + ')">';
            html += '<div class="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center relative overflow-hidden">';
            html += '<div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>';
            html += '<i class="fas ' + post.icon + ' text-5xl text-white/30 relative z-10 group-hover:text-white/50 transition-colors"></i>';
            html += '<div class="absolute top-3 left-3 px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-xs font-bold">' + post.category + '</div>';
            html += '</div>';
            html += '<div class="p-6">';
            html += '<h3 class="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">' + post.title + '</h3>';
            html += '<p class="text-gray-400 text-sm mb-4 line-clamp-2">' + post.excerpt + '</p>';
            html += '<div class="flex items-center justify-between text-sm text-gray-500">';
            html += '<span><i class="fas fa-user mr-2"></i>' + post.author + '</span>';
            html += '<span><i class="fas fa-eye mr-2"></i>' + post.views + ' views</span>';
            html += '</div></div></div>';
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
    
    // Immediately reveal elements that are already in view (don't wait for scroll)
    function revealOnLoad() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            // If element is already in viewport, reveal it immediately
            if (elementTop < windowHeight + 200) {
                element.classList.add('active');
            }
        });
    }
    
    // Initialize function
    function initializeHomepage() {
        console.log('Homepage script loaded, initializing...');
        try {
            // Reveal sections immediately if they're in view
            revealOnLoad();
            // Load homepage data (includes stats)
            loadHomepageData().catch(error => {
                console.error('loadHomepageData failed:', error);
                // If loadHomepageData fails, show demo tracks as fallback
                console.log('Falling back to demo tracks due to loadHomepageData error');
                displayDemoTracks();
            });
            // Set up scroll reveal
            revealOnScroll();
        } catch (error) {
            console.error('Critical error in homepage initialization:', error);
            // Even on error, try to load stats independently
            try {
                loadStats().catch(e => console.error('Stats failed in error handler:', e));
            } catch (statsError) {
                console.error('Stats loading failed in error handler:', statsError);
            }
            // Fallback: show demo content if everything fails
            try {
                displayDemoTracks();
                revealOnLoad(); // Still try to reveal sections
            } catch (fallbackError) {
                console.error('Even fallback failed:', fallbackError);
            }
        }
    }
    
    // Ensure demo tracks are displayed if API fails or times out
    // Set a timeout to show demo tracks if loadHomepageData takes too long
    setTimeout(() => {
        const editorsPicksContainer = document.getElementById('editorsPicks');
        if (editorsPicksContainer && editorsPicksContainer.querySelector('.animate-pulse')) {
            // Still showing loading skeleton, API likely failed - show demo tracks
            console.log('Timeout: API took too long, showing demo tracks');
            displayDemoTracks();
        }
    }, 5000); // 5 second timeout
    
    // Load stats immediately on script load (before DOM ready if possible)
    // This ensures stats load even if other JavaScript has errors
    (function loadStatsImmediately() {
        try {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(loadStats, 100); // Small delay to ensure elements exist
                });
            } else {
                setTimeout(loadStats, 100);
            }
        } catch (e) {
            console.error('Failed to set up immediate stats loader:', e);
        }
    })();
    
    // Listen for audio events to update card states
    const audio = document.getElementById('global-audio-element');
    if (audio) {
        audio.addEventListener('play', () => {
            if (typeof window.updateCardStates === 'function') {
                window.updateCardStates();
            }
        });
        audio.addEventListener('pause', () => {
            if (typeof window.updateCardStates === 'function') {
                window.updateCardStates();
            }
        });
        audio.addEventListener('ended', () => {
            if (typeof window.updateCardStates === 'function') {
                window.updateCardStates();
            }
        });
    }
    
    // Update periodically (for cross-page sync)
    setInterval(() => {
        if (typeof window.updateCardStates === 'function') {
            window.updateCardStates();
        }
    }, 1000);
    
    // Load data when page loads - handle both cases
    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', initializeHomepage);
    } else {
        // DOM already loaded, execute immediately
        initializeHomepage();
    }
    
    // Scroll reveal
    window.addEventListener('scroll', revealOnScroll);
    </script>
</body>
</html>`;
}
