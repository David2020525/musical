export const modernHomeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MusicHub - Discover Amazing Music</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .track-card {
            transition: all 0.3s ease;
        }
        
        .track-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        
        .play-button {
            transition: all 0.3s ease;
        }
        
        .play-button:hover {
            transform: scale(1.1);
        }
        
        .genre-chip {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .genre-chip:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .stat-card {
            background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
        }
    </style>
</head>
<body class="bg-gray-900 text-white">
    <!-- Modern Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex items-center space-x-8">
                    <a href="/en" class="flex items-center space-x-2">
                        <div class="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                            <i class="fas fa-music text-white text-xl"></i>
                        </div>
                        <span class="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">MusicHub</span>
                    </a>
                    
                    <!-- Search Bar -->
                    <div class="hidden md:block">
                        <div class="relative">
                            <input type="text" id="searchInput" placeholder="Search tracks, artists..." 
                                class="w-80 px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Nav Links -->
                <div class="hidden md:flex items-center space-x-6">
                    <a href="/en" class="text-white hover:text-purple-400 transition">Home</a>
                    <a href="/en/browse" class="text-gray-300 hover:text-white transition">Browse</a>
                    <a href="/en/producer/apply" class="text-gray-300 hover:text-white transition">Become Producer</a>
                    
                    <!-- Auth Buttons -->
                    <div id="authButtons">
                        <a href="/en/login" class="px-4 py-2 text-sm text-gray-300 hover:text-white transition">Login</a>
                        <a href="/en/register" class="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="pt-16">
        <div class="gradient-bg relative overflow-hidden">
            <div class="absolute inset-0 opacity-20">
                <div class="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
                <div class="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 1s"></div>
            </div>
            
            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div class="text-center">
                    <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                        Discover Amazing<br/>
                        <span class="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Music</span>
                    </h1>
                    <p class="text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl mx-auto">
                        Explore thousands of tracks from independent artists worldwide
                    </p>
                    <div class="flex items-center justify-center space-x-4">
                        <button class="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition transform hover:scale-105">
                            <i class="fas fa-play mr-2"></i>Start Listening
                        </button>
                        <button class="px-8 py-3 glass-effect text-white rounded-full font-semibold hover:bg-white/20 transition">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Stats Section -->
        <div class="bg-gray-900 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="stat-card p-6 rounded-2xl text-center">
                        <div class="text-3xl font-bold text-purple-400 mb-2" id="trackCount">Loading...</div>
                        <div class="text-gray-400 text-sm">Total Tracks</div>
                    </div>
                    <div class="stat-card p-6 rounded-2xl text-center">
                        <div class="text-3xl font-bold text-pink-400 mb-2">50K+</div>
                        <div class="text-gray-400 text-sm">Active Users</div>
                    </div>
                    <div class="stat-card p-6 rounded-2xl text-center">
                        <div class="text-3xl font-bold text-blue-400 mb-2">1M+</div>
                        <div class="text-gray-400 text-sm">Monthly Plays</div>
                    </div>
                    <div class="stat-card p-6 rounded-2xl text-center">
                        <div class="text-3xl font-bold text-green-400 mb-2">200+</div>
                        <div class="text-gray-400 text-sm">Producers</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Featured Tracks -->
        <div class="bg-gray-900 py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-3xl font-bold">Featured Tracks</h2>
                    <a href="/en/browse" class="text-purple-400 hover:text-purple-300 transition">
                        View All <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                
                <div id="featuredTracks" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <!-- Loading skeleton -->
                    <div class="animate-pulse">
                        <div class="bg-gray-800 h-48 rounded-xl mb-4"></div>
                        <div class="bg-gray-800 h-4 rounded w-3/4 mb-2"></div>
                        <div class="bg-gray-800 h-3 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Genres Section -->
        <div class="bg-gray-900 py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-bold mb-8">Browse by Genre</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div class="genre-chip bg-gradient-to-br from-red-500 to-pink-500 p-6 rounded-xl text-center">
                        <i class="fas fa-guitar text-3xl mb-2"></i>
                        <div class="font-semibold">Rock</div>
                    </div>
                    <div class="genre-chip bg-gradient-to-br from-purple-500 to-indigo-500 p-6 rounded-xl text-center">
                        <i class="fas fa-drum text-3xl mb-2"></i>
                        <div class="font-semibold">Electronic</div>
                    </div>
                    <div class="genre-chip bg-gradient-to-br from-yellow-500 to-orange-500 p-6 rounded-xl text-center">
                        <i class="fas fa-microphone text-3xl mb-2"></i>
                        <div class="font-semibold">Pop</div>
                    </div>
                    <div class="genre-chip bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-xl text-center">
                        <i class="fas fa-compact-disc text-3xl mb-2"></i>
                        <div class="font-semibold">Hip Hop</div>
                    </div>
                    <div class="genre-chip bg-gradient-to-br from-green-500 to-teal-500 p-6 rounded-xl text-center">
                        <i class="fas fa-leaf text-3xl mb-2"></i>
                        <div class="font-semibold">Folk</div>
                    </div>
                    <div class="genre-chip bg-gradient-to-br from-pink-500 to-rose-500 p-6 rounded-xl text-center">
                        <i class="fas fa-heart text-3xl mb-2"></i>
                        <div class="font-semibold">Jazz</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA Section -->
        <div class="bg-gradient-to-r from-purple-900 to-pink-900 py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl font-bold mb-4">Ready to Share Your Music?</h2>
                <p class="text-xl text-purple-200 mb-8">Join thousands of producers and start earning from your tracks</p>
                <a href="/en/producer/apply" class="inline-block px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition transform hover:scale-105">
                    <i class="fas fa-microphone-alt mr-2"></i>Become a Producer
                </a>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-950 border-t border-gray-800 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <div class="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                            <i class="fas fa-music text-white"></i>
                        </div>
                        <span class="font-bold text-lg">MusicHub</span>
                    </div>
                    <p class="text-gray-400 text-sm">Discover and share amazing music from independent artists worldwide.</p>
                </div>
                <div>
                    <h3 class="font-semibold mb-4">Platform</h3>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="/en/browse" class="hover:text-white transition">Browse Music</a></li>
                        <li><a href="/en/producer/apply" class="hover:text-white transition">Become Producer</a></li>
                        <li><a href="#" class="hover:text-white transition">Pricing</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-semibold mb-4">Support</h3>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-white transition">Help Center</a></li>
                        <li><a href="#" class="hover:text-white transition">Contact Us</a></li>
                        <li><a href="#" class="hover:text-white transition">Terms of Service</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-semibold mb-4">Connect</h3>
                    <div class="flex space-x-4">
                        <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition">
                            <i class="fab fa-facebook"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
                © 2024 MusicHub. All rights reserved.
            </div>
        </div>
    </footer>

    <script>
        // Check authentication
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        
        if (token && user) {
            document.getElementById('authButtons').innerHTML = \`
                <div class="flex items-center space-x-4">
                    <a href="/en/dashboard" class="text-gray-300 hover:text-white transition">Dashboard</a>
                    <div class="relative group">
                        <button class="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
                            <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold">
                                \${user.name.charAt(0).toUpperCase()}
                            </div>
                            <span>\${user.name}</span>
                            <i class="fas fa-chevron-down text-xs"></i>
                        </button>
                        <div class="hidden group-hover:block absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl py-2 z-50">
                            <a href="/en/dashboard" class="block px-4 py-2 hover:bg-gray-700 transition">
                                <i class="fas fa-user mr-2"></i>Profile
                            </a>
                            <a href="/en/producer/apply" class="block px-4 py-2 hover:bg-gray-700 transition">
                                <i class="fas fa-music mr-2"></i>My Music
                            </a>
                            <hr class="my-2 border-gray-700">
                            <button onclick="logout()" class="block w-full text-left px-4 py-2 hover:bg-gray-700 transition text-red-400">
                                <i class="fas fa-sign-out-alt mr-2"></i>Logout
                            </button>
                        </div>
                    </div>
                </div>
            \`;
        }
        
        function logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.reload();
        }
        
        // Load tracks
        async function loadTracks() {
            try {
                const response = await fetch('/api/tracks');
                const data = await response.json();
                
                if (data.success && data.data) {
                    document.getElementById('trackCount').textContent = data.data.length + '+';
                    
                    const tracksHTML = data.data.slice(0, 8).map(track => \`
                        <div class="track-card bg-gray-800 rounded-xl overflow-hidden group cursor-pointer">
                            <div class="relative">
                                <div class="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                    <i class="fas fa-music text-white text-5xl opacity-50"></i>
                                </div>
                                <button class="play-button absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                                    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <i class="fas fa-play text-purple-600 text-xl ml-1"></i>
                                    </div>
                                </button>
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
                    
                    document.getElementById('featuredTracks').innerHTML = tracksHTML;
                }
            } catch (error) {
                console.error('Failed to load tracks:', error);
                document.getElementById('featuredTracks').innerHTML = '<p class="text-gray-400 col-span-full text-center">Failed to load tracks</p>';
            }
        }
        
        loadTracks();
        
        // Search functionality
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value;
                window.location.href = \`/en/browse?q=\${encodeURIComponent(query)}\`;
            }
        });
    </script>
</body>
</html>`;
