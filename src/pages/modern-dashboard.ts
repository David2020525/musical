export const modernDashboardHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - MusicHub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .stat-card {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
            border: 1px solid rgba(139, 92, 246, 0.2);
        }
    </style>
</head>
<body class="bg-gray-900 text-white">
    <!-- Navigation -->
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
                </div>
                <div class="flex items-center space-x-6">
                    <a href="/en" class="text-gray-300 hover:text-white transition">Home</a>
                    <a href="/en/browse" class="text-gray-300 hover:text-white transition">Browse</a>
                    <a href="/en/dashboard" class="text-white">Dashboard</a>
                    <button onclick="logout()" class="px-4 py-2 text-sm bg-red-600 rounded-full hover:bg-red-700 transition">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <div class="pt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Welcome Section -->
            <div class="mb-8">
                <h1 class="text-4xl font-bold mb-2">Welcome back, <span id="userName">User</span>!</h1>
                <p class="text-gray-400">Here's what's happening with your music</p>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div class="stat-card rounded-2xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                            <i class="fas fa-music text-purple-400 text-xl"></i>
                        </div>
                        <span class="text-xs text-gray-400">Total Tracks</span>
                    </div>
                    <div class="text-3xl font-bold text-purple-400">0</div>
                    <div class="text-sm text-gray-400 mt-1">Uploaded</div>
                </div>

                <div class="stat-card rounded-2xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-pink-600/20 rounded-xl flex items-center justify-center">
                            <i class="fas fa-play text-pink-400 text-xl"></i>
                        </div>
                        <span class="text-xs text-gray-400">Total Plays</span>
                    </div>
                    <div class="text-3xl font-bold text-pink-400">0</div>
                    <div class="text-sm text-gray-400 mt-1">All Time</div>
                </div>

                <div class="stat-card rounded-2xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                            <i class="fas fa-heart text-blue-400 text-xl"></i>
                        </div>
                        <span class="text-xs text-gray-400">Total Likes</span>
                    </div>
                    <div class="text-3xl font-bold text-blue-400">0</div>
                    <div class="text-sm text-gray-400 mt-1">Received</div>
                </div>

                <div class="stat-card rounded-2xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
                            <i class="fas fa-users text-green-400 text-xl"></i>
                        </div>
                        <span class="text-xs text-gray-400">Followers</span>
                    </div>
                    <div class="text-3xl font-bold text-green-400">0</div>
                    <div class="text-sm text-gray-400 mt-1">People</div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Main Content -->
                <div class="lg:col-span-2 space-y-8">
                    <!-- Quick Actions -->
                    <div class="bg-gray-800 rounded-2xl p-6">
                        <h2 class="text-2xl font-bold mb-6">Quick Actions</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a href="/en/producer/apply" class="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transition">
                                <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-microphone-alt text-white text-xl"></i>
                                </div>
                                <div>
                                    <div class="font-semibold">Become Producer</div>
                                    <div class="text-sm text-purple-100">Apply now</div>
                                </div>
                            </a>
                            
                            <button class="flex items-center space-x-4 p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition">
                                <div class="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-upload text-purple-400 text-xl"></i>
                                </div>
                                <div>
                                    <div class="font-semibold">Upload Track</div>
                                    <div class="text-sm text-gray-400">Add new music</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- My Tracks -->
                    <div class="bg-gray-800 rounded-2xl p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold">My Tracks</h2>
                            <button class="text-purple-400 hover:text-purple-300 transition text-sm">
                                View All <i class="fas fa-arrow-right ml-1"></i>
                            </button>
                        </div>
                        
                        <div id="myTracks" class="space-y-3">
                            <div class="text-center py-12 text-gray-400">
                                <i class="fas fa-music text-5xl mb-4 opacity-20"></i>
                                <p>You haven't uploaded any tracks yet</p>
                                <button class="mt-4 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                                    Upload Your First Track
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="bg-gray-800 rounded-2xl p-6">
                        <h2 class="text-2xl font-bold mb-6">Recent Activity</h2>
                        <div class="space-y-4">
                            <div class="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-xl">
                                <div class="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-user-plus text-purple-400"></i>
                                </div>
                                <div class="flex-1">
                                    <p class="text-sm">You joined MusicHub</p>
                                    <p class="text-xs text-gray-400" id="joinDate">Just now</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="lg:col-span-1 space-y-8">
                    <!-- Profile Card -->
                    <div class="bg-gray-800 rounded-2xl p-6">
                        <div class="text-center">
                            <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4" id="userAvatar">
                                U
                            </div>
                            <h3 class="text-xl font-bold mb-1" id="profileName">User</h3>
                            <p class="text-sm text-gray-400 mb-4" id="userEmail">user@email.com</p>
                            
                            <div class="flex items-center justify-center space-x-4 mb-6 text-sm">
                                <div class="text-center">
                                    <div class="font-bold">0</div>
                                    <div class="text-gray-400">Tracks</div>
                                </div>
                                <div class="w-px h-8 bg-gray-700"></div>
                                <div class="text-center">
                                    <div class="font-bold">0</div>
                                    <div class="text-gray-400">Followers</div>
                                </div>
                                <div class="w-px h-8 bg-gray-700"></div>
                                <div class="text-center">
                                    <div class="font-bold">0</div>
                                    <div class="text-gray-400">Following</div>
                                </div>
                            </div>

                            <button class="w-full px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition mb-2">
                                <i class="fas fa-edit mr-2"></i>Edit Profile
                            </button>
                            <button class="w-full px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                                <i class="fas fa-cog mr-2"></i>Settings
                            </button>
                        </div>
                    </div>

                    <!-- Producer Status -->
                    <div id="producerStatus" class="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-700/50">
                        <div class="text-center">
                            <i class="fas fa-crown text-yellow-400 text-3xl mb-3"></i>
                            <h3 class="text-lg font-bold mb-2">Become a Producer</h3>
                            <p class="text-sm text-gray-300 mb-4">Start uploading and selling your music</p>
                            <a href="/en/producer/apply" class="block px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                                Apply Now
                            </a>
                        </div>
                    </div>

                    <!-- Recommendations -->
                    <div class="bg-gray-800 rounded-2xl p-6">
                        <h3 class="font-bold mb-4">Recommended for You</h3>
                        <div class="space-y-3">
                            <a href="/en/browse" class="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition">
                                <i class="fas fa-compass text-purple-400"></i>
                                <span class="text-sm">Discover New Music</span>
                            </a>
                            <a href="/en/forum" class="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition">
                                <i class="fas fa-comments text-pink-400"></i>
                                <span class="text-sm">Join Community</span>
                            </a>
                            <a href="/en/blog" class="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition">
                                <i class="fas fa-newspaper text-blue-400"></i>
                                <span class="text-sm">Read Blog</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Check authentication
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');

        if (!token || !user) {
            window.location.href = '/en/login';
        }

        // Display user info
        if (user) {
            document.getElementById('userName').textContent = user.name;
            document.getElementById('profileName').textContent = user.name;
            document.getElementById('userEmail').textContent = user.email;
            document.getElementById('userAvatar').textContent = user.name.charAt(0).toUpperCase();
            
            // Format join date
            if (user.created_at) {
                const joinDate = new Date(user.created_at);
                document.getElementById('joinDate').textContent = joinDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
            }

            // Check producer status
            if (user.is_producer) {
                document.getElementById('producerStatus').innerHTML = \`
                    <div class="text-center">
                        <i class="fas fa-check-circle text-green-400 text-3xl mb-3"></i>
                        <h3 class="text-lg font-bold mb-2">Producer Account</h3>
                        <p class="text-sm text-gray-300 mb-4">You're a verified producer</p>
                        <button class="block w-full px-4 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition">
                            Upload Track
                        </button>
                    </div>
                \`;
            }
        }

        function logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/en/login';
        }

        // Load user tracks (if producer)
        async function loadMyTracks() {
            if (!user.is_producer) return;

            try {
                const response = await fetch('/api/tracks', {
                    headers: {
                        'Authorization': \`Bearer \${token}\`
                    }
                });
                const data = await response.json();

                if (data.success && data.data) {
                    // Filter user's tracks (would need user_id in tracks table)
                    // For now, show all tracks as placeholder
                    const myTracks = data.data.slice(0, 5);
                    
                    if (myTracks.length > 0) {
                        displayMyTracks(myTracks);
                    }
                }
            } catch (error) {
                console.error('Failed to load tracks:', error);
            }
        }

        function displayMyTracks(tracks) {
            const html = tracks.map(track => \`
                <div class="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition">
                    <div class="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-music text-white"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="font-semibold truncate">\${track.title}</div>
                        <div class="text-sm text-gray-400">\${track.plays_count || 0} plays • \${track.likes_count || 0} likes</div>
                    </div>
                    <button class="text-gray-400 hover:text-white transition">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                </div>
            \`).join('');

            document.getElementById('myTracks').innerHTML = html;
        }

        loadMyTracks();
    </script>
</body>
</html>`;
