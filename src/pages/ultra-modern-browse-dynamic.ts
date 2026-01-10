import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';
import { t } from '../lib/i18n';

export const ultraModernBrowseDynamicHTML = (locale: string = 'en') => `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('browse.title', locale)} - MusicHub</title>
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
        
        .card-3d {
            transform-style: preserve-3d;
            transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .card-3d:hover {
            transform: translateY(-12px) rotateX(2deg);
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
    <nav class="fixed top-0 w-full z-50 glass-strong border-b border-white/5">
        <div class="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
            <a href="/${locale}" class="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform">
                MusicHub
            </a>
            <div class="flex items-center gap-6">
                <a href="/${locale}" class="text-white/60 hover:text-white transition-colors">${t('nav.home', locale)}</a>
                <a href="/${locale}/browse" class="text-white hover:text-white transition-colors font-semibold">${t('nav.browse', locale)}</a>
                <a href="/${locale}/forum" class="text-white/60 hover:text-white transition-colors">${t('nav.forum', locale)}</a>
                <a href="/${locale}/blog" class="text-white/60 hover:text-white transition-colors">${t('nav.blog', locale)}</a>
                <a href="/${locale}/dashboard" class="text-white/60 hover:text-white transition-colors">${t('nav.dashboard', locale)}</a>
                <a href="/${locale}/login" class="px-6 py-2.5 rounded-xl glass hover:glass-strong transition-all">${t('nav.login', locale)}</a>
                <a href="/${locale}/register" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all font-semibold">${t('nav.register', locale)}</a>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="pt-32 px-6 max-w-[1400px] mx-auto">
        <!-- Header -->
        <div class="mb-12">
            <h1 class="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                ${t('browse.title', locale)}
            </h1>
            <p class="text-xl text-white/60">${t('browse.subtitle', locale)}</p>
        </div>

        <!-- Search & Filters -->
        <div class="mb-8 flex flex-col md:flex-row gap-4">
            <!-- Search Bar -->
            <div class="flex-1 relative">
                <input 
                    type="text" 
                    id="search-input"
                    placeholder="${t('browse.search', locale)}"
                    class="w-full px-6 py-4 rounded-2xl glass-strong text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <i class="fas fa-search absolute right-6 top-1/2 -translate-y-1/2 text-white/40"></i>
            </div>

            <!-- Genre Filter -->
            <select 
                id="genre-filter"
                class="px-6 py-4 rounded-2xl glass-strong text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
            >
                <option value="">${t('browse.all_genres', locale)}</option>
                <option value="Electronic">Electronic</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Rock">Rock</option>
                <option value="Jazz">Jazz</option>
                <option value="Classical">Classical</option>
                <option value="Pop">Pop</option>
                <option value="R&B">R&B</option>
                <option value="Country">Country</option>
            </select>
        </div>

        <!-- Loading State -->
        <div id="loading-state" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            ${Array(8).fill(0).map(() => `
                <div class="glass rounded-2xl p-6 skeleton">
                    <div class="aspect-square rounded-xl bg-white/5 mb-4"></div>
                    <div class="h-6 bg-white/5 rounded mb-2"></div>
                    <div class="h-4 bg-white/5 rounded w-2/3"></div>
                </div>
            `).join('')}
        </div>

        <!-- Empty State -->
        <div id="empty-state" class="hidden text-center py-20">
            <i class="fas fa-music text-6xl text-white/20 mb-6"></i>
            <h3 class="text-2xl font-bold text-white/60 mb-2">${t('browse.no_tracks', locale)}</h3>
            <p class="text-white/40">${t('browse.try_different_search', locale)}</p>
        </div>

        <!-- Tracks Grid -->
        <div id="tracks-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"></div>

        <!-- Load More Button -->
        <div id="load-more-container" class="text-center hidden">
            <button 
                id="load-more-btn"
                class="px-8 py-4 rounded-xl glass-strong hover:bg-white/10 transition-all font-semibold"
            >
                <i class="fas fa-chevron-down mr-2"></i>
                ${t('browse.load_more', locale)}
            </button>
        </div>
    </div>

    ${GlobalAudioPlayerHTML}

    <script>
        ${PlayButtonScript}

        // State
        let currentPage = 1;
        let currentGenre = '';
        let currentSearch = '';
        let hasMore = true;
        let isLoading = false;

        const loadingState = document.getElementById('loading-state');
        const emptyState = document.getElementById('empty-state');
        const tracksGrid = document.getElementById('tracks-grid');
        const loadMoreContainer = document.getElementById('load-more-container');
        const loadMoreBtn = document.getElementById('load-more-btn');
        const searchInput = document.getElementById('search-input');
        const genreFilter = document.getElementById('genre-filter');

        // Fetch tracks
        async function loadTracks(append = false) {
            if (isLoading) return;
            isLoading = true;

            try {
                // Show loading
                if (!append) {
                    loadingState.classList.remove('hidden');
                    tracksGrid.classList.add('hidden');
                    emptyState.classList.add('hidden');
                }

                // Build query params
                const params = new URLSearchParams({
                    page: currentPage.toString(),
                    limit: '12'
                });

                if (currentGenre) params.append('genre', currentGenre);
                if (currentSearch) params.append('search', currentSearch);

                // Fetch from API
                const response = await fetch(\`/api/tracks?\${params}\`);
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Failed to load tracks');
                }

                const tracks = result.data || [];

                // Hide loading
                loadingState.classList.add('hidden');
                tracksGrid.classList.remove('hidden');

                // Clear grid if not appending
                if (!append) {
                    tracksGrid.innerHTML = '';
                }

                // Check if empty
                if (tracks.length === 0 && !append) {
                    emptyState.classList.remove('hidden');
                    loadMoreContainer.classList.add('hidden');
                    return;
                } else {
                    emptyState.classList.add('hidden');
                }

                // Render tracks
                tracks.forEach(track => {
                    const trackCard = createTrackCard(track);
                    tracksGrid.insertAdjacentHTML('beforeend', trackCard);
                });

                // Update load more button
                hasMore = tracks.length === 12;
                if (hasMore) {
                    loadMoreContainer.classList.remove('hidden');
                } else {
                    loadMoreContainer.classList.add('hidden');
                }

            } catch (error) {
                console.error('Error loading tracks:', error);
                loadingState.classList.add('hidden');
                emptyState.classList.remove('hidden');
            } finally {
                isLoading = false;
            }
        }

        // Create track card HTML
        function createTrackCard(track) {
            const coverUrl = track.cover_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop';
            const price = track.price ? \`$\${track.price}\` : '${t('common.free', locale)}';
            
            return \`
                <div class="card-3d glass rounded-2xl p-6 cursor-pointer hover:bg-white/5 transition-all group">
                    <a href="/${locale}/tracks/\${track.id}">
                        <div class="aspect-square rounded-xl overflow-hidden mb-4 relative">
                            <img src="\${coverUrl}" alt="\${track.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <button 
                                class="play-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                data-audio-url="\${track.audio_url}"
                                data-title="\${track.title}"
                                data-artist="\${track.artist}"
                                data-cover="\${coverUrl}"
                            >
                                <i class="fas fa-play text-white text-xl ml-1"></i>
                            </button>
                        </div>
                        <h3 class="font-bold text-lg mb-1 text-white group-hover:text-purple-400 transition-colors truncate">
                            \${track.title}
                        </h3>
                        <p class="text-white/60 text-sm mb-2 truncate">\${track.artist}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-white/40">\${track.genre || 'Unknown'}</span>
                            <span class="text-sm font-semibold text-purple-400">\${price}</span>
                        </div>
                    </a>
                </div>
            \`;
        }

        // Event listeners
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            currentPage = 1;
            setTimeout(() => loadTracks(), 300); // Debounce
        });

        genreFilter.addEventListener('change', (e) => {
            currentGenre = e.target.value;
            currentPage = 1;
            loadTracks();
        });

        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            loadTracks(true);
        });

        // Initial load
        loadTracks();
    </script>
</body>
</html>
`;
