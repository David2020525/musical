import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';
import { t } from '../lib/i18n';
import { SharedNavigationHTML, SharedNavigationScript } from '../components/SharedNavigation';

export function ultraModernTrackDetailDynamicHTML(trackId: string, locale: string = 'en') {
    const otherLocale = locale === 'en' ? 'tr' : 'en';
    
    return `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('track.details', locale)} - MUSICAL</title>
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
        
        .neon-glow {
            box-shadow: 
                0 0 20px rgba(147, 51, 234, 0.5),
                0 0 40px rgba(236, 72, 153, 0.3),
                0 0 60px rgba(147, 51, 234, 0.2);
        }

        /* Loading skeleton */
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }
        
        .skeleton {
            background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%);
            background-size: 1000px 100%;
            animation: shimmer 2s infinite;
        }
    </style>
</head>
<body class="text-white pb-32">
    <!-- Navigation -->
    ${SharedNavigationHTML(locale, { currentPage: 'track-detail', showSearch: false, showAuth: true, showLogout: false })}

    <!-- Loading State -->
    <div id="loading-state" class="pt-32 px-6 pb-32 max-w-[1400px] mx-auto">
        <div class="flex gap-8 mb-8">
            <div class="w-96 h-96 rounded-3xl skeleton"></div>
            <div class="flex-1">
                <div class="h-12 bg-white/5 rounded mb-4 skeleton"></div>
                <div class="h-6 bg-white/5 rounded w-1/3 mb-8 skeleton"></div>
                <div class="flex gap-4 mb-8">
                    <div class="w-32 h-12 rounded-xl skeleton"></div>
                    <div class="w-32 h-12 rounded-xl skeleton"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Error State -->
    <div id="error-state" class="hidden pt-32 px-6 max-w-[1400px] mx-auto text-center">
        <i class="fas fa-exclamation-circle text-6xl text-white/20 mb-6"></i>
        <h2 class="text-3xl font-bold text-white/60 mb-4">${t('track.not_found', locale)}</h2>
        <p class="text-white/40 mb-8">${t('track.not_found_description', locale)}</p>
        <a href="/${locale}/browse" class="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all font-semibold">
            ${t('browse.title', locale)}
        </a>
    </div>

    <!-- Track Content -->
    <div id="track-content" class="hidden pt-32 px-6 pb-32 max-w-[1400px] mx-auto">
        <!-- Track Header -->
        <div class="flex flex-col lg:flex-row gap-8 mb-12">
            <!-- Cover Art -->
            <div class="lg:w-96 lg:h-96 aspect-square rounded-3xl overflow-hidden relative group">
                <img id="track-cover" src="" alt="" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <button 
                    id="main-play-btn"
                    class="play-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center hover:scale-110 transition-all neon-glow"
                >
                    <i class="fas fa-play text-white text-3xl ml-1"></i>
                </button>
            </div>

            <!-- Track Info -->
            <div class="flex-1">
                <h1 id="track-title" class="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    ${t('common.loading', locale)}
                </h1>
                <p class="text-2xl text-white/60 mb-8">
                    ${t('track.by', locale)} <span id="track-artist" class="text-white">...</span>
                </p>

                <!-- Stats -->
                <div class="flex items-center gap-6 mb-8">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-play text-purple-400"></i>
                        <span id="plays-count">0</span> ${t('track.plays', locale)}
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-heart text-pink-400"></i>
                        <span id="likes-count">0</span> ${t('track.likes', locale)}
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-music text-blue-400"></i>
                        <span id="track-genre">...</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center gap-4 mb-8">
                    <button 
                        id="purchase-btn"
                        class="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all font-semibold text-lg neon-glow"
                    >
                        <i class="fas fa-shopping-cart mr-2"></i>
                        ${t('track.purchase', locale)} <span id="track-price">$0</span>
                    </button>
                    <button class="px-8 py-4 rounded-xl glass-strong hover:bg-white/10 transition-all font-semibold">
                        <i class="fas fa-heart mr-2"></i>
                        ${t('track.like', locale)}
                    </button>
                    <button class="px-8 py-4 rounded-xl glass-strong hover:bg-white/10 transition-all font-semibold">
                        <i class="fas fa-share-alt mr-2"></i>
                        ${t('track.share', locale)}
                    </button>
                </div>

                <!-- Track Details -->
                <div class="glass-strong rounded-2xl p-6">
                    <h3 class="text-xl font-bold mb-4">${t('track.details', locale)}</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-white/40 text-sm">${t('track.genre', locale)}</p>
                            <p id="track-genre-detail" class="font-semibold">...</p>
                        </div>
                        <div>
                            <p class="text-white/40 text-sm">${t('track.bpm', locale)}</p>
                            <p id="track-bpm">...</p>
                        </div>
                        <div>
                            <p class="text-white/40 text-sm">${t('track.duration', locale)}</p>
                            <p id="track-duration">...</p>
                        </div>
                        <div>
                            <p class="text-white/40 text-sm">${t('track.mood', locale)}</p>
                            <p id="track-mood">...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Description -->
        <div class="glass-strong rounded-2xl p-8 mb-8">
            <h3 class="text-2xl font-bold mb-4">${t('track.description', locale)}</h3>
            <p id="track-description" class="text-white/60 leading-relaxed">...</p>
        </div>

        <!-- Tags -->
        <div class="glass-strong rounded-2xl p-8 mb-8">
            <h3 class="text-2xl font-bold mb-4">${t('track.tags', locale)}</h3>
            <div id="track-tags" class="flex flex-wrap gap-3">
                <!-- Tags will be inserted here -->
            </div>
        </div>

        <!-- Producer Info -->
        <div class="glass-strong rounded-2xl p-8">
            <h3 class="text-2xl font-bold mb-6">${t('track.producer', locale)}</h3>
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold">
                    <span id="producer-initials">AA</span>
                </div>
                <div class="flex-1">
                    <p id="producer-name" class="text-xl font-bold">...</p>
                    <p class="text-white/60">${t('track.producer', locale)}</p>
                </div>
                <a href="#" class="px-6 py-3 rounded-xl glass hover:bg-white/10 transition-all">
                    ${t('profile.view', locale)}
                </a>
            </div>
        </div>
    </div>

    ${GlobalAudioPlayerHTML}

    <script>
    // Play Button Functions
    ${PlayButtonScript}
    </script>

    <script>
        const trackId = '${trackId}';
        const locale = '${locale}';
        const i18nFree = '${t('common.free', locale)}';
        const i18nNoDescription = '${t('track.no_description', locale)}';
        const i18nNoTags = '${t('track.no_tags', locale)}';
        let currentTrack = null;

        const loadingState = document.getElementById('loading-state');
        const errorState = document.getElementById('error-state');
        const trackContent = document.getElementById('track-content');
        const mainPlayBtn = document.getElementById('main-play-btn');

        // Load track data
        async function loadTrack() {
            try {
                const response = await fetch(\`/api/tracks/\${trackId}\`);
                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result.error || 'Track not found');
                }

                currentTrack = result.data;

                // Hide loading, show content
                loadingState.classList.add('hidden');
                trackContent.classList.remove('hidden');

                // Update UI
                const coverUrl = currentTrack.cover_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=800&fit=crop';
                
                document.getElementById('track-cover').src = coverUrl;
                document.getElementById('track-cover').alt = currentTrack.title;
                document.getElementById('track-title').textContent = currentTrack.title;
                document.getElementById('track-artist').textContent = currentTrack.artist;
                document.getElementById('track-genre').textContent = currentTrack.genre || 'Music';
                document.getElementById('track-genre-detail').textContent = currentTrack.genre || 'Unknown';
                document.getElementById('plays-count').textContent = (currentTrack.plays_count || 0).toLocaleString();
                document.getElementById('likes-count').textContent = (currentTrack.likes_count || 0).toLocaleString();
                
                const bpm = currentTrack.bpm || 120;
                document.getElementById('track-bpm').textContent = bpm + ' BPM';
                
                const durationSeconds = currentTrack.duration || 180;
                const minutes = Math.floor(durationSeconds / 60);
                const seconds = durationSeconds % 60;
                document.getElementById('track-duration').textContent = minutes + ':' + seconds.toString().padStart(2, '0');
                
                document.getElementById('track-mood').textContent = currentTrack.mood || 'Unknown';
                
                const price = currentTrack.price || 0;
                document.getElementById('track-price').textContent = price > 0 ? '$' + price : i18nFree;
                
                document.getElementById('track-description').textContent = currentTrack.description || i18nNoDescription;
                
                document.getElementById('producer-name').textContent = currentTrack.artist;
                const initials = currentTrack.artist.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                document.getElementById('producer-initials').textContent = initials;

                // Tags
                if (currentTrack.tags) {
                    const tags = currentTrack.tags.split(',').map(tag => 
                        '<span class="px-4 py-2 glass rounded-full text-sm hover:bg-white/10 transition-all cursor-pointer">' + tag.trim() + '</span>'
                    ).join('');
                    document.getElementById('track-tags').innerHTML = tags;
                } else {
                    document.getElementById('track-tags').innerHTML = '<span class="text-white/40">' + i18nNoTags + '</span>';
                }

                // Setup play button
                mainPlayBtn.addEventListener('click', () => {
                    if (window.globalAudioPlayer) {
                        window.globalAudioPlayer.loadTrack(
                            currentTrack.audio_url,
                            currentTrack.title,
                            currentTrack.artist,
                            coverUrl
                        );
                    }
                });

                // Purchase button
                document.getElementById('purchase-btn').addEventListener('click', handlePurchase);

            } catch (error) {
                console.error('Error loading track:', error);
                loadingState.classList.add('hidden');
                errorState.classList.remove('hidden');
            }
        }

        async function handlePurchase() {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = \`/\${locale}/login?redirect=/\${locale}/tracks/\${trackId}\`;
                return;
            }

            try {
                const response = await fetch('/api/purchases', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': \`Bearer \${token}\`
                    },
                    body: JSON.stringify({ track_id: parseInt(trackId) })
                });

                const result = await response.json();

                if (result.success) {
                    alert('${t('track.purchase_success', locale)}');
                } else {
                    alert(result.error || '${t('track.purchase_error', locale)}');
                }
            } catch (error) {
                console.error('Purchase error:', error);
                alert('${t('track.purchase_error', locale)}');
            }
        }

        // Initial load
        loadTrack();
    </script>
</body>
</html>
`;
}
