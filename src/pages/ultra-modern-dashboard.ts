import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernDashboardHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - MusicHub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Inter', sans-serif; }
        body {
            background: #000000;
            background-image: 
                radial-gradient(at 0% 0%, rgba(147, 51, 234, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.15) 0px, transparent 50%);
            background-attachment: fixed;
        }
        .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.08); }
        .glass-strong { background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(40px); border: 1px solid rgba(255, 255, 255, 0.12); }
        .card-3d { transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .card-3d:hover { transform: translateY(-12px) rotateX(2deg); }
    </style>
</head>
<body class="text-white pb-32">
    <nav class="fixed top-0 w-full z-50 glass-strong border-b border-white/5">
        <div class="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
            <a href="/en" class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <i class="fas fa-music text-white text-xl"></i>
                </div>
                <span class="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">MusicHub</span>
            </a>
            <div class="flex items-center space-x-6">
                <a href="/en" class="text-gray-300 hover:text-white">Home</a>
                <a href="/en/browse" class="text-gray-300 hover:text-white">Browse</a>
                <a href="/en/dashboard" class="text-white font-semibold">Dashboard</a>
                <button onclick="logout()" class="px-6 py-2.5 glass rounded-xl hover:bg-white/10">Logout</button>
            </div>
        </div>
    </nav>
    
    <div class="pt-28 px-6">
        <div class="max-w-[1400px] mx-auto">
            <div class="mb-12">
                <h1 class="text-6xl font-black mb-4">My Dashboard</h1>
                <p class="text-xl text-gray-400">Manage your music and profile</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                <div class="glass-strong rounded-3xl p-8 card-3d text-center">
                    <div class="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2" id="stat-tracks">...</div>
                    <div class="text-sm text-gray-400">Total Tracks</div>
                </div>
                <div class="glass-strong rounded-3xl p-8 card-3d text-center">
                    <div class="text-5xl font-black bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2" id="stat-plays">...</div>
                    <div class="text-sm text-gray-400">Total Plays</div>
                </div>
                <div class="glass-strong rounded-3xl p-8 card-3d text-center">
                    <div class="text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2" id="stat-followers">...</div>
                    <div class="text-sm text-gray-400">Followers</div>
                </div>
                <div class="glass-strong rounded-3xl p-8 card-3d text-center">
                    <div class="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2" id="stat-following">...</div>
                    <div class="text-sm text-gray-400">Following</div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-8">
                    <div class="glass-strong rounded-3xl p-8">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold">My Tracks</h2>
                            <button class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold">
                                <i class="fas fa-plus mr-2"></i>Upload New
                            </button>
                        </div>
                        <div class="space-y-4" id="userTracks">
                            <div class="flex items-center space-x-4 glass rounded-2xl p-4 hover:bg-white/10 cursor-pointer">
                                <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                    <i class="fas fa-music text-2xl text-white/40"></i>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-bold">Summer Vibes</h4>
                                    <p class="text-sm text-gray-400">Electronic • 320 plays</p>
                                </div>
                                <button class="w-10 h-10 rounded-full glass hover:bg-white/10"><i class="fas fa-play text-sm"></i></button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="glass-strong rounded-3xl p-8">
                        <h2 class="text-2xl font-bold mb-6">Recent Activity</h2>
                        <div class="space-y-4">
                            <div class="flex items-start space-x-4">
                                <div class="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                                <div>
                                    <p class="text-sm">New follower: <span class="font-semibold">Alex_Music</span></p>
                                    <p class="text-xs text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="space-y-8">
                    <div class="glass-strong rounded-3xl p-8">
                        <h2 class="text-2xl font-bold mb-6">Quick Actions</h2>
                        <div class="space-y-3">
                            <button class="w-full px-6 py-3 glass rounded-xl hover:bg-white/10 text-left">
                                <i class="fas fa-upload mr-3"></i>Upload Track
                            </button>
                            <button class="w-full px-6 py-3 glass rounded-xl hover:bg-white/10 text-left">
                                <i class="fas fa-user mr-3"></i>Edit Profile
                            </button>
                            <button class="w-full px-6 py-3 glass rounded-xl hover:bg-white/10 text-left">
                                <i class="fas fa-chart-line mr-3"></i>View Analytics
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Load user stats
        async function loadUserStats() {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/en/login';
                return;
            }

            try {
                const res = await fetch('/api/users/me/stats', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await res.json();
                
                if (data.success) {
                    document.getElementById('stat-tracks').textContent = data.data.tracks.toLocaleString();
                    document.getElementById('stat-plays').textContent = data.data.plays.toLocaleString();
                    document.getElementById('stat-followers').textContent = data.data.followers.toLocaleString();
                    document.getElementById('stat-following').textContent = data.data.following.toLocaleString();
                } else {
                    console.error('Failed to load stats:', data.error);
                }
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }

        function logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/en/login';
        }

        // Load stats on page load
        loadUserStats();
    </script>
    
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
</body>
</html>`;
