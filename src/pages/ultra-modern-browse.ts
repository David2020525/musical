import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernBrowseHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Browse Music - MusicHub</title>
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
        
        /* Glassmorphism */
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
        
        /* Neon Glow */
        .neon-glow {
            box-shadow: 
                0 0 20px rgba(147, 51, 234, 0.5),
                0 0 40px rgba(236, 72, 153, 0.3),
                0 0 60px rgba(147, 51, 234, 0.2);
        }
        
        /* Button Micro-interaction */
        .btn-micro {
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .btn-micro:active {
            transform: scale(0.95) translateY(2px);
        }
        
        /* Shimmer Loading */
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
        
        /* Play button styles */
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
        
        /* Filter checkbox custom */
        .filter-checkbox {
            appearance: none;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.05);
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .filter-checkbox:checked {
            background: linear-gradient(135deg, #9333EA, #EC4899);
            border-color: #EC4899;
        }
        
        .filter-checkbox:checked::after {
            content: '✓';
            display: block;
            color: white;
            text-align: center;
            line-height: 16px;
            font-size: 14px;
        }
    </style>
</head>
<body class="text-white pb-32">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 glass-strong border-b border-white/5">
        <div class="max-w-[1400px] mx-auto px-6">
            <div class="flex items-center justify-between h-20">
                <div class="flex items-center space-x-12">
                    <a href="/en" class="flex items-center space-x-3 group">
                        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center neon-glow group-hover:scale-110 transition-transform">
                            <i class="fas fa-music text-white text-xl"></i>
                        </div>
                        <span class="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">MusicHub</span>
                    </a>
                    
                    <div class="hidden md:block relative">
                        <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input 
                            type="text" 
                            id="navSearch" 
                            placeholder="Search tracks, artists... (⌘K)" 
                            class="w-96 px-12 py-3 glass-strong rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder-gray-500"
                        >
                    </div>
                </div>
                
                <div class="flex items-center space-x-6">
                    <a href="/en" class="text-gray-300 hover:text-white transition-colors">Home</a>
                    <a href="/en/browse" class="text-white font-semibold">Browse</a>
                    <a href="/en/dashboard" class="text-gray-300 hover:text-white transition-colors">Dashboard</a>
                    <div id="authButtons">
                        <a href="/en/login" class="px-6 py-2.5 glass rounded-xl hover:bg-white/10 transition-all text-sm">Login</a>
                        <a href="/en/register" class="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all text-sm font-semibold">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    
    <!-- Main Content -->
    <div class="pt-28 px-6">
        <div class="max-w-[1400px] mx-auto">
            <!-- Header -->
            <div class="mb-12 reveal">
                <h1 class="text-6xl md:text-7xl font-black mb-4 neon-text">Explore Music</h1>
                <p class="text-xl text-gray-400">Discover your next favorite track from thousands of producers</p>
            </div>
            
            <!-- Filters + Results Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Filters Sidebar -->
                <div class="lg:col-span-1 space-y-6 reveal">
                    <!-- Genre Filter -->
                    <div class="glass-strong rounded-3xl p-6">
                        <h3 class="text-lg font-bold mb-4 flex items-center justify-between">
                            <span>Genres</span>
                            <button onclick="clearFilters()" class="text-xs text-gray-400 hover:text-white transition-colors">Clear</button>
                        </h3>
                        <div class="space-y-3" id="genreFilters">
                            <label class="flex items-center space-x-3 cursor-pointer group">
                                <input type="checkbox" value="Electronic" class="filter-checkbox genre-filter">
                                <span class="text-sm group-hover:text-white transition-colors">Electronic</span>
                            </label>
                            <label class="flex items-center space-x-3 cursor-pointer group">
                                <input type="checkbox" value="Hip Hop" class="filter-checkbox genre-filter">
                                <span class="text-sm group-hover:text-white transition-colors">Hip Hop</span>
                            </label>
                            <label class="flex items-center space-x-3 cursor-pointer group">
                                <input type="checkbox" value="Pop" class="filter-checkbox genre-filter">
                                <span class="text-sm group-hover:text-white transition-colors">Pop</span>
                            </label>
                            <label class="flex items-center space-x-3 cursor-pointer group">
                                <input type="checkbox" value="Rock" class="filter-checkbox genre-filter">
                                <span class="text-sm group-hover:text-white transition-colors">Rock</span>
                            </label>
                            <label class="flex items-center space-x-3 cursor-pointer group">
                                <input type="checkbox" value="Jazz" class="filter-checkbox genre-filter">
                                <span class="text-sm group-hover:text-white transition-colors">Jazz</span>
                            </label>
                            <label class="flex items-center space-x-3 cursor-pointer group">
                                <input type="checkbox" value="Classical" class="filter-checkbox genre-filter">
                                <span class="text-sm group-hover:text-white transition-colors">Classical</span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Sort Options -->
                    <div class="glass-strong rounded-3xl p-6">
                        <h3 class="text-lg font-bold mb-4">Sort By</h3>
                        <select id="sortSelect" class="w-full px-4 py-3 glass rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer">
                            <option value="newest">Newest First</option>
                            <option value="popular">Most Popular</option>
                            <option value="plays">Most Played</option>
                            <option value="likes">Most Liked</option>
                        </select>
                    </div>
                    
                    <!-- View Toggle -->
                    <div class="glass-strong rounded-3xl p-6">
                        <h3 class="text-lg font-bold mb-4">View</h3>
                        <div class="flex space-x-2">
                            <button onclick="setViewMode('grid')" id="gridViewBtn" class="flex-1 px-4 py-3 glass rounded-xl hover:bg-white/10 transition-all">
                                <i class="fas fa-th"></i>
                            </button>
                            <button onclick="setViewMode('list')" id="listViewBtn" class="flex-1 px-4 py-3 glass rounded-xl hover:bg-white/10 transition-all">
                                <i class="fas fa-list"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Results Grid -->
                <div class="lg:col-span-3">
                    <!-- Results Header -->
                    <div class="flex items-center justify-between mb-6 reveal">
                        <p class="text-gray-400">
                            <span id="resultsCount">0</span> tracks found
                        </p>
                    </div>
                    
                    <!-- Tracks Grid -->
                    <div id="tracksGrid" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        <!-- Loading State -->
                        ${Array(12).fill(0).map(() => `
                            <div class="glass-strong rounded-3xl overflow-hidden card-3d">
                                <div class="aspect-square shimmer glass"></div>
                                <div class="p-6 space-y-3">
                                    <div class="shimmer h-6 w-3/4 glass rounded-xl"></div>
                                    <div class="shimmer h-4 w-1/2 glass rounded-xl"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Pagination -->
                    <div class="flex items-center justify-center space-x-4 mt-12 reveal">
                        <button id="prevPage" class="px-6 py-3 glass-strong rounded-xl hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            <i class="fas fa-chevron-left mr-2"></i>Previous
                        </button>
                        <div class="flex items-center space-x-2">
                            <span class="text-gray-400">Page</span>
                            <span id="currentPage" class="px-4 py-2 glass-strong rounded-xl font-bold">1</span>
                            <span class="text-gray-400">of</span>
                            <span id="totalPages" class="px-4 py-2 glass-strong rounded-xl">1</span>
                        </div>
                        <button id="nextPage" class="px-6 py-3 glass-strong rounded-xl hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            Next<i class="fas fa-chevron-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // State
        let allTracks = [];
        let filteredTracks = [];
        let currentPage = 1;
        const tracksPerPage = 12;
        let viewMode = 'grid';
        
        // Load tracks with filters
        async function loadTracks() {
            try {
                // Build query string from filters
                const params = new URLSearchParams();
                
                const searchQuery = document.getElementById('navSearch')?.value;
                if (searchQuery) {
                    params.append('search', searchQuery);
                }
                
                const selectedGenres = Array.from(document.querySelectorAll('.genre-filter:checked')).map(cb => cb.value);
                if (selectedGenres.length === 1) {
                    params.append('genre', selectedGenres[0]);
                }
                
                const sortBy = document.getElementById('sortSelect')?.value;
                if (sortBy) {
                    params.append('sort', sortBy);
                }
                
                const url = '/api/tracks' + (params.toString() ? '?' + params.toString() : '');
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.success) {
                    allTracks = data.data;
                    filteredTracks = data.data; // Server-side filtering, so filtered = all
                    currentPage = 1;
                    renderTracks();
                }
            } catch (error) {
                console.error('Failed to load tracks:', error);
                document.getElementById('tracksGrid').innerHTML = '<div class="col-span-full text-center py-12 text-gray-400">Failed to load tracks</div>';
            }
        }
        
        // Apply filters (now uses server-side filtering)
        function applyFilters() {
            loadTracks(); // Reload tracks with current filter settings
        }
        
        // Render tracks
        function renderTracks() {
            const start = (currentPage - 1) * tracksPerPage;
            const end = start + tracksPerPage;
            const pageTracks = filteredTracks.slice(start, end);
            const totalPages = Math.ceil(filteredTracks.length / tracksPerPage);
            
            // Update results count
            document.getElementById('resultsCount').textContent = filteredTracks.length;
            
            // Render tracks
            const gridClass = viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4';
            document.getElementById('tracksGrid').className = gridClass;
            
            const tracksHTML = pageTracks.map(track => {
                // Ensure track has audio_url for player
                const trackWithAudio = {
                    ...track,
                    audio_url: track.audio_url || '/static/sample.mp3',
                    artwork: track.cover_url || \`https://picsum.photos/seed/track\${track.id}/300/300\`
                };
                
                return \`
                <div class="glass-strong rounded-3xl overflow-hidden card-3d group relative">
                    <div class="relative aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center overflow-hidden cursor-pointer" onclick="window.location.href='/en/tracks/\${track.id}'">
                        <i class="fas fa-music text-6xl text-white/20"></i>
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <button 
                                class="play-btn w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 relative overflow-hidden z-10"
                                data-track-id="\${track.id}"
                                data-track='\${JSON.stringify(trackWithAudio).replace(/'/g, "&apos;")}'
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
            \`;
            }).join('');
            
            document.getElementById('tracksGrid').innerHTML = tracksHTML || '<div class="col-span-full text-center py-12 text-gray-400">No tracks found</div>';
            
            // Update pagination
            document.getElementById('currentPage').textContent = currentPage;
            document.getElementById('totalPages').textContent = totalPages || 1;
            document.getElementById('prevPage').disabled = currentPage === 1;
            document.getElementById('nextPage').disabled = currentPage >= totalPages;
            
            // Scroll reveal
            document.querySelectorAll('.reveal').forEach((el, i) => {
                setTimeout(() => el.classList.add('active'), i * 100);
            });
        }
        
        // Clear filters
        function clearFilters() {
            document.querySelectorAll('.genre-filter').forEach(cb => cb.checked = false);
            document.getElementById('sortSelect').value = 'newest';
            document.getElementById('navSearch').value = '';
            applyFilters();
        }
        
        // Set view mode
        function setViewMode(mode) {
            viewMode = mode;
            document.getElementById('gridViewBtn').classList.toggle('bg-white/10', mode === 'grid');
            document.getElementById('listViewBtn').classList.toggle('bg-white/10', mode === 'list');
            renderTracks();
        }
        
        // Event listeners
        document.getElementById('navSearch').addEventListener('input', applyFilters);
        document.getElementById('sortSelect').addEventListener('change', applyFilters);
        document.querySelectorAll('.genre-filter').forEach(cb => {
            cb.addEventListener('change', applyFilters);
        });
        
        document.getElementById('prevPage').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTracks();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        
        document.getElementById('nextPage').addEventListener('click', () => {
            const totalPages = Math.ceil(filteredTracks.length / tracksPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderTracks();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        
        // Search shortcut
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('navSearch').focus();
            }
        });
        
        // Initialize
        setViewMode('grid');
        loadTracks();
    </script>
    
    <!-- Global Audio Player -->
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
</body>
</html>`;
