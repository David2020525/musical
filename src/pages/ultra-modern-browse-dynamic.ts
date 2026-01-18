import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';
import { SharedNavigationHTML, SharedNavigationScript } from '../components/SharedNavigation';
import { t } from '../lib/i18n';

export const ultraModernBrowseDynamicHTML = (locale: string = 'en') => {
    const otherLocale = locale === 'en' ? 'tr' : 'en';
    return `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('browse.title', locale)} - MUSICAL</title>
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

        /* Fix select dropdown styling */
        select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' opacity='0.6'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            padding-right: 3rem;
        }

        /* Ensure proper text rendering in inputs */
        input, select, textarea {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* Fix checkbox styling */
        input[type="checkbox"] {
            cursor: pointer;
            accent-color: #a855f7;
        }

        /* Prevent layout shift */
        * {
            box-sizing: border-box;
        }
    </style>
</head>
<body class="text-white pb-32">
    <!-- Navigation -->
    ${SharedNavigationHTML(locale, { currentPage: 'browse', showSearch: true, showAuth: true })}

    <!-- Main Content -->
    <div class="pt-32 px-6 pb-32 max-w-[1400px] mx-auto">
        <!-- Header -->
        <div class="mb-12">
            <h1 class="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                ${t('browse.title', locale)}
            </h1>
            <p class="text-xl text-white/60">${t('browse.subtitle', locale)}</p>
        </div>

        <!-- Search & Filters -->
        <div class="mb-8 flex flex-col lg:flex-row gap-4">
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
                class="min-w-[200px] px-6 py-4 rounded-2xl glass-strong text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
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

            <!-- Sort Filter -->
            <select 
                id="sort-filter"
                class="min-w-[200px] px-6 py-4 rounded-2xl glass-strong text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
            >
                <option value="newest">${t('browse.sort_newest', locale)}</option>
                <option value="popular">${t('browse.sort_popular', locale)}</option>
                <option value="trending">${t('browse.sort_trending', locale)}</option>
                <option value="oldest">Oldest</option>
            </select>
        </div>

        <!-- Advanced Filters -->
        <div class="mb-8 glass-strong rounded-2xl p-6">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-bold text-white">Advanced Filters</h3>
                <button id="reset-filters" class="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2">
                    <i class="fas fa-redo"></i>
                    <span>Reset All</span>
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Price Range -->
                <div class="space-y-3">
                    <label class="block text-sm font-medium text-gray-400">
                        <i class="fas fa-dollar-sign mr-2"></i>Price Range
                    </label>
                    <div class="flex items-center gap-3">
                        <input 
                            type="number" 
                            id="price-min" 
                            placeholder="Min" 
                            min="0"
                            class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                        <span class="text-gray-500 shrink-0">-</span>
                        <input 
                            type="number" 
                            id="price-max" 
                            placeholder="Max" 
                            min="0"
                            class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <div class="flex items-center gap-2 mt-3">
                        <input type="checkbox" id="free-only" class="w-4 h-4 rounded border-white/10 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 bg-white/5">
                        <label for="free-only" class="text-sm text-gray-400 cursor-pointer">Free only</label>
                    </div>
                </div>

                <!-- Date Range -->
                <div class="space-y-3">
                    <label class="block text-sm font-medium text-gray-400">
                        <i class="fas fa-calendar mr-2"></i>Upload Date
                    </label>
                    <select 
                        id="date-filter"
                        class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
                    >
                        <option value="">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>
                </div>

                <!-- Producer Filter -->
                <div class="space-y-3">
                    <label class="block text-sm font-medium text-gray-400">
                        <i class="fas fa-user-music mr-2"></i>Producer
                    </label>
                    <input 
                        type="text" 
                        id="producer-filter" 
                        placeholder="Search by producer..." 
                        class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>
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
    // Play Button Functions
    ${PlayButtonScript}
    </script>

    <script>
        // i18n constants
        const locale = '${locale}';
        const i18nFree = '${t('common.free', locale)}';

        // State
        let currentPage = 1;
        let currentGenre = '';
        let currentSearch = '';
        let currentSort = 'newest';
        let currentPriceMin = '';
        let currentPriceMax = '';
        let currentFreeOnly = false;
        let currentDateFilter = '';
        let currentProducer = '';
        let hasMore = true;
        let isLoading = false;

        const loadingState = document.getElementById('loading-state');
        const emptyState = document.getElementById('empty-state');
        const tracksGrid = document.getElementById('tracks-grid');
        const loadMoreContainer = document.getElementById('load-more-container');
        const loadMoreBtn = document.getElementById('load-more-btn');
        const searchInput = document.getElementById('search-input');
        const genreFilter = document.getElementById('genre-filter');

        // Read search query from URL on page load
        const urlParams = new URLSearchParams(window.location.search);
        const urlQuery = urlParams.get('q');
        if (urlQuery) {
            currentSearch = urlQuery;
            if (searchInput) {
                searchInput.value = urlQuery;
            }
        }

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
                    limit: '12'
                });

                if (currentGenre) params.append('genre', currentGenre);
                if (currentSearch) params.append('search', currentSearch);
                if (currentSort) params.append('sort', currentSort);
                if (currentPriceMin) params.append('price_min', currentPriceMin);
                if (currentPriceMax) params.append('price_max', currentPriceMax);
                if (currentFreeOnly) params.append('free_only', 'true');
                if (currentDateFilter) params.append('date', currentDateFilter);
                if (currentProducer) params.append('producer', currentProducer);

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
            const price = track.price ? '$' + track.price : i18nFree;
            
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

        // Sort filter
        const sortFilter = document.getElementById('sort-filter');
        sortFilter.addEventListener('change', (e) => {
            currentSort = e.target.value;
            currentPage = 1;
            loadTracks();
        });

        // Price filters
        const priceMin = document.getElementById('price-min');
        const priceMax = document.getElementById('price-max');
        const freeOnly = document.getElementById('free-only');

        priceMin.addEventListener('input', (e) => {
            currentPriceMin = e.target.value;
            currentPage = 1;
            setTimeout(() => loadTracks(), 500); // Debounce
        });

        priceMax.addEventListener('input', (e) => {
            currentPriceMax = e.target.value;
            currentPage = 1;
            setTimeout(() => loadTracks(), 500); // Debounce
        });

        freeOnly.addEventListener('change', (e) => {
            currentFreeOnly = e.target.checked;
            currentPage = 1;
            loadTracks();
        });

        // Date filter
        const dateFilter = document.getElementById('date-filter');
        dateFilter.addEventListener('change', (e) => {
            currentDateFilter = e.target.value;
            currentPage = 1;
            loadTracks();
        });

        // Producer filter
        const producerFilter = document.getElementById('producer-filter');
        producerFilter.addEventListener('input', (e) => {
            currentProducer = e.target.value;
            currentPage = 1;
            setTimeout(() => loadTracks(), 500); // Debounce
        });

        // Reset filters
        const resetFilters = document.getElementById('reset-filters');
        resetFilters.addEventListener('click', () => {
            // Reset all filter values
            currentGenre = '';
            currentSearch = '';
            currentSort = 'newest';
            currentPriceMin = '';
            currentPriceMax = '';
            currentFreeOnly = false;
            currentDateFilter = '';
            currentProducer = '';
            currentPage = 1;

            // Reset UI
            document.getElementById('search-input').value = '';
            genreFilter.value = '';
            sortFilter.value = 'newest';
            priceMin.value = '';
            priceMax.value = '';
            freeOnly.checked = false;
            dateFilter.value = '';
            producerFilter.value = '';

            loadTracks();
        });

        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            loadTracks(true);
        });

        // Initial load
        loadTracks();
    ${SharedNavigationScript(locale)}
        </script>
</body>
</html>
`;
}
