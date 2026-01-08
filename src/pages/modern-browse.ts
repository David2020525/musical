export const modernBrowseHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Browse Music - MusicHub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .track-card { transition: all 0.3s ease; }
        .track-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.2); }
    </style>
</head>
<body class="bg-gray-900 text-white">
    <!-- Navigation (same as home) -->
    <nav class="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center space-x-8">
                    <a href="/en" class="flex items-center space-x-2">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                            <i class="fas fa-music text-white text-xl"></i>
                        </div>
                        <span class="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">MusicHub</span>
                    </a>
                    <div class="hidden md:block">
                        <input type="text" id="searchInput" placeholder="Search tracks, artists..." 
                            class="w-80 px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" style="margin-left: 12rem; margin-top: 0.5rem;"></i>
                    </div>
                </div>
                <div class="hidden md:flex items-center space-x-6">
                    <a href="/en" class="text-gray-300 hover:text-white transition">Home</a>
                    <a href="/en/browse" class="text-white">Browse</a>
                    <a href="/en/producer/apply" class="text-gray-300 hover:text-white transition">Become Producer</a>
                    <div id="authButtons">
                        <a href="/en/login" class="px-4 py-2 text-sm text-gray-300 hover:text-white transition">Login</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <div class="pt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Page Header -->
            <div class="mb-8">
                <h1 class="text-4xl font-bold mb-2">Browse Music</h1>
                <p class="text-gray-400">Discover your next favorite track</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Filters Sidebar -->
                <div class="lg:col-span-1">
                    <div class="bg-gray-800 rounded-xl p-6 sticky top-24">
                        <h2 class="text-xl font-bold mb-6">Filters</h2>
                        
                        <!-- Genre Filter -->
                        <div class="mb-6">
                            <label class="block text-sm font-medium mb-3">Genre</label>
                            <div class="space-y-2">
                                <label class="flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded">
                                    <input type="checkbox" class="genre-filter w-4 h-4 text-purple-600 rounded" value="Pop">
                                    <span class="ml-2 text-sm">Pop</span>
                                </label>
                                <label class="flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded">
                                    <input type="checkbox" class="genre-filter w-4 h-4 text-purple-600 rounded" value="Electronic">
                                    <span class="ml-2 text-sm">Electronic</span>
                                </label>
                                <label class="flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded">
                                    <input type="checkbox" class="genre-filter w-4 h-4 text-purple-600 rounded" value="Hip Hop">
                                    <span class="ml-2 text-sm">Hip Hop</span>
                                </label>
                                <label class="flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded">
                                    <input type="checkbox" class="genre-filter w-4 h-4 text-purple-600 rounded" value="Folk">
                                    <span class="ml-2 text-sm">Folk</span>
                                </label>
                                <label class="flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded">
                                    <input type="checkbox" class="genre-filter w-4 h-4 text-purple-600 rounded" value="Classical">
                                    <span class="ml-2 text-sm">Classical</span>
                                </label>
                            </div>
                        </div>

                        <!-- Sort By -->
                        <div class="mb-6">
                            <label class="block text-sm font-medium mb-3">Sort By</label>
                            <select id="sortBy" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                                <option value="newest">Newest First</option>
                                <option value="popular">Most Popular</option>
                                <option value="plays">Most Played</option>
                                <option value="likes">Most Liked</option>
                            </select>
                        </div>

                        <button onclick="applyFilters()" class="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition">
                            Apply Filters
                        </button>
                        <button onclick="clearFilters()" class="w-full px-4 py-2 mt-2 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition">
                            Clear All
                        </button>
                    </div>
                </div>

                <!-- Tracks Grid -->
                <div class="lg:col-span-3">
                    <!-- Results Header -->
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <span id="resultsCount" class="text-lg font-semibold">Loading...</span>
                            <span class="text-gray-400"> results</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button onclick="setView('grid')" id="gridView" class="p-2 bg-gray-800 rounded hover:bg-gray-700 transition">
                                <i class="fas fa-th"></i>
                            </button>
                            <button onclick="setView('list')" id="listView" class="p-2 bg-gray-700 rounded hover:bg-gray-600 transition">
                                <i class="fas fa-list"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Tracks Container -->
                    <div id="tracksContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Loading skeleton -->
                        ${Array(6).fill(0).map(() => `
                            <div class="animate-pulse">
                                <div class="bg-gray-800 h-48 rounded-xl mb-4"></div>
                                <div class="bg-gray-800 h-4 rounded w-3/4 mb-2"></div>
                                <div class="bg-gray-800 h-3 rounded w-1/2"></div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Pagination -->
                    <div id="pagination" class="mt-8 flex justify-center space-x-2">
                        <!-- Will be populated by JS -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let allTracks = [];
        let filteredTracks = [];
        let currentPage = 1;
        const tracksPerPage = 12;
        let currentView = 'grid';

        // Check auth
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (token && user) {
            document.getElementById('authButtons').innerHTML = \`
                <div class="flex items-center space-x-2">
                    <a href="/en/dashboard" class="text-gray-300 hover:text-white">Dashboard</a>
                    <button onclick="logout()" class="px-4 py-2 text-sm bg-red-600 rounded-full hover:bg-red-700">Logout</button>
                </div>
            \`;
        }

        function logout() {
            localStorage.clear();
            window.location.href = '/en/login';
        }

        async function loadTracks() {
            try {
                const response = await fetch('/api/tracks');
                const data = await response.json();
                
                if (data.success && data.data) {
                    allTracks = data.data;
                    filteredTracks = [...allTracks];
                    applyFilters();
                }
            } catch (error) {
                console.error('Failed to load tracks:', error);
                document.getElementById('tracksContainer').innerHTML = '<p class="text-gray-400 col-span-full text-center py-12">Failed to load tracks</p>';
            }
        }

        function applyFilters() {
            const selectedGenres = Array.from(document.querySelectorAll('.genre-filter:checked')).map(cb => cb.value);
            const sortBy = document.getElementById('sortBy').value;
            const searchQuery = document.getElementById('searchInput').value.toLowerCase();

            // Filter by genre
            filteredTracks = allTracks.filter(track => {
                const genreMatch = selectedGenres.length === 0 || selectedGenres.includes(track.genre);
                const searchMatch = !searchQuery || 
                    track.title.toLowerCase().includes(searchQuery) || 
                    track.artist.toLowerCase().includes(searchQuery);
                return genreMatch && searchMatch;
            });

            // Sort
            switch(sortBy) {
                case 'popular':
                    filteredTracks.sort((a, b) => (b.plays_count + b.likes_count) - (a.plays_count + a.likes_count));
                    break;
                case 'plays':
                    filteredTracks.sort((a, b) => b.plays_count - a.plays_count);
                    break;
                case 'likes':
                    filteredTracks.sort((a, b) => b.likes_count - a.likes_count);
                    break;
                case 'newest':
                default:
                    filteredTracks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }

            currentPage = 1;
            renderTracks();
        }

        function renderTracks() {
            const start = (currentPage - 1) * tracksPerPage;
            const end = start + tracksPerPage;
            const paginatedTracks = filteredTracks.slice(start, end);

            document.getElementById('resultsCount').textContent = filteredTracks.length;

            if (currentView === 'grid') {
                const tracksHTML = paginatedTracks.map(track => \`
                    <div class="track-card bg-gray-800 rounded-xl overflow-hidden group cursor-pointer" onclick="playTrack(\${track.id})">
                        <div class="relative">
                            <div class="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                <i class="fas fa-music text-white text-5xl opacity-50"></i>
                            </div>
                            <button class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                                <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <i class="fas fa-play text-purple-600 text-xl ml-1"></i>
                                </div>
                            </button>
                            <div class="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs">
                                \${track.genre || 'Music'}
                            </div>
                        </div>
                        <div class="p-4">
                            <h3 class="font-semibold text-white mb-1 truncate">\${track.title}</h3>
                            <p class="text-sm text-gray-400 truncate">\${track.artist}</p>
                            <div class="flex items-center justify-between mt-3 text-xs text-gray-500">
                                <span><i class="fas fa-play mr-1"></i>\${track.plays_count?.toLocaleString() || 0}</span>
                                <span><i class="fas fa-heart mr-1"></i>\${track.likes_count?.toLocaleString() || 0}</span>
                            </div>
                        </div>
                    </div>
                \`).join('');
                document.getElementById('tracksContainer').innerHTML = tracksHTML || '<p class="text-gray-400 col-span-full text-center py-12">No tracks found</p>';
                document.getElementById('tracksContainer').className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
            } else {
                const tracksHTML = paginatedTracks.map(track => \`
                    <div class="track-card bg-gray-800 rounded-xl p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-750" onclick="playTrack(\${track.id})">
                        <div class="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-music text-white text-xl"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="font-semibold text-white truncate">\${track.title}</h3>
                            <p class="text-sm text-gray-400 truncate">\${track.artist}</p>
                        </div>
                        <div class="text-sm text-gray-400 text-right">
                            <div><i class="fas fa-play mr-1"></i>\${track.plays_count?.toLocaleString() || 0}</div>
                            <div><i class="fas fa-heart mr-1"></i>\${track.likes_count?.toLocaleString() || 0}</div>
                        </div>
                        <button class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition">
                            <i class="fas fa-play text-white ml-1"></i>
                        </button>
                    </div>
                \`).join('');
                document.getElementById('tracksContainer').innerHTML = tracksHTML || '<p class="text-gray-400 text-center py-12">No tracks found</p>';
                document.getElementById('tracksContainer').className = 'space-y-4';
            }

            renderPagination();
        }

        function renderPagination() {
            const totalPages = Math.ceil(filteredTracks.length / tracksPerPage);
            if (totalPages <= 1) {
                document.getElementById('pagination').innerHTML = '';
                return;
            }

            let paginationHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                paginationHTML += \`
                    <button onclick="goToPage(\${i})" class="px-4 py-2 \${i === currentPage ? 'bg-purple-600' : 'bg-gray-800'} rounded-lg hover:bg-purple-700 transition">
                        \${i}
                    </button>
                \`;
            }
            document.getElementById('pagination').innerHTML = paginationHTML;
        }

        function goToPage(page) {
            currentPage = page;
            renderTracks();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function setView(view) {
            currentView = view;
            document.getElementById('gridView').className = view === 'grid' ? 'p-2 bg-purple-600 rounded' : 'p-2 bg-gray-800 rounded hover:bg-gray-700 transition';
            document.getElementById('listView').className = view === 'list' ? 'p-2 bg-purple-600 rounded' : 'p-2 bg-gray-800 rounded hover:bg-gray-700 transition';
            renderTracks();
        }

        function clearFilters() {
            document.querySelectorAll('.genre-filter').forEach(cb => cb.checked = false);
            document.getElementById('sortBy').value = 'newest';
            document.getElementById('searchInput').value = '';
            applyFilters();
        }

        function playTrack(id) {
            window.location.href = \`/en/tracks/\${id}\`;
        }

        // Search on enter
        document.getElementById('searchInput').addEventListener('keyup', (e) => {
            if (e.key === 'Enter' || e.target.value.length > 2 || e.target.value.length === 0) {
                applyFilters();
            }
        });

        // Listen to filter changes
        document.querySelectorAll('.genre-filter').forEach(cb => {
            cb.addEventListener('change', applyFilters);
        });

        document.getElementById('sortBy').addEventListener('change', applyFilters);

        loadTracks();
    </script>
</body>
</html>`;
