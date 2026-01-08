import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernProfileHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile - MusicHub</title>
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
        .card-3d:hover { transform: translateY(-8px); }
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
                <a href="/en/dashboard" class="text-gray-300 hover:text-white">Dashboard</a>
                <a href="/en/profile" class="text-white font-semibold">Profile</a>
            </div>
        </div>
    </nav>
    
    <div class="pt-20">
        <!-- Banner -->
        <div class="relative h-80 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-3xl"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        
        <!-- Profile Header -->
        <div class="px-6 -mt-32 relative z-10">
            <div class="max-w-[1400px] mx-auto">
                <div class="flex flex-col md:flex-row items-start md:items-end space-y-6 md:space-y-0 md:space-x-8 mb-12">
                    <div class="w-40 h-40 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-6xl font-black border-4 border-black shadow-2xl">
                        JD
                    </div>
                    
                    <div class="flex-1">
                        <h1 class="text-5xl font-black mb-2">John Doe</h1>
                        <p class="text-xl text-gray-400 mb-4">Music Producer & DJ</p>
                        <p class="text-gray-300 max-w-2xl mb-6">
                            Creating electronic music since 2018. Specializing in deep house, techno, and ambient soundscapes. 
                            Available for collaborations and custom productions.
                        </p>
                        
                        <div class="flex items-center space-x-6 text-sm">
                            <div>
                                <span class="font-bold text-2xl">24</span>
                                <span class="text-gray-400 ml-2">Tracks</span>
                            </div>
                            <div>
                                <span class="font-bold text-2xl">1.2K</span>
                                <span class="text-gray-400 ml-2">Followers</span>
                            </div>
                            <div>
                                <span class="font-bold text-2xl">328</span>
                                <span class="text-gray-400 ml-2">Following</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                        <button class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold hover:shadow-lg transition-all">
                            <i class="fas fa-user-plus mr-2"></i>Follow
                        </button>
                        <button class="px-8 py-4 glass-strong rounded-2xl hover:bg-white/10 transition-all">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="px-8 py-4 glass-strong rounded-2xl hover:bg-white/10 transition-all">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Tabs -->
                <div class="flex space-x-2 border-b border-white/10 mb-8">
                    <button onclick="switchTab('tracks')" id="tab-tracks" class="px-6 py-4 font-semibold border-b-2 border-purple-500 text-white transition-all">
                        <i class="fas fa-music mr-2"></i>Tracks
                    </button>
                    <button onclick="switchTab('playlists')" id="tab-playlists" class="px-6 py-4 font-semibold border-b-2 border-transparent text-gray-400 hover:text-white transition-all">
                        <i class="fas fa-list mr-2"></i>Playlists
                    </button>
                    <button onclick="switchTab('liked')" id="tab-liked" class="px-6 py-4 font-semibold border-b-2 border-transparent text-gray-400 hover:text-white transition-all">
                        <i class="fas fa-heart mr-2"></i>Liked
                    </button>
                    <button onclick="switchTab('activity')" id="tab-activity" class="px-6 py-4 font-semibold border-b-2 border-transparent text-gray-400 hover:text-white transition-all">
                        <i class="fas fa-chart-line mr-2"></i>Activity
                    </button>
                </div>
                
                <!-- Tab Content -->
                <div id="tab-content">
                    <!-- Tracks Tab -->
                    <div id="content-tracks">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            ${Array(8).fill(0).map((_, i) => `
                                <div class="glass-strong rounded-3xl overflow-hidden card-3d group relative">
                                    <div class="relative aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                        <i class="fas fa-music text-6xl text-white/20"></i>
                                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                            <button class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                                <i class="fas fa-play text-xl ml-1"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="p-6">
                                        <h3 class="font-bold mb-1">My Track ${i + 1}</h3>
                                        <p class="text-sm text-gray-400 mb-3">Electronic</p>
                                        <div class="flex items-center justify-between text-xs text-gray-500">
                                            <span><i class="fas fa-play mr-1"></i>${Math.floor(Math.random() * 5000)}</span>
                                            <span><i class="fas fa-heart mr-1"></i>${Math.floor(Math.random() * 500)}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Playlists Tab -->
                    <div id="content-playlists" class="hidden">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            ${Array(6).fill(0).map((_, i) => `
                                <div class="glass-strong rounded-3xl p-6 card-3d hover:bg-white/10 cursor-pointer">
                                    <div class="flex items-center space-x-4 mb-4">
                                        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                                            <i class="fas fa-list text-2xl text-white/40"></i>
                                        </div>
                                        <div class="flex-1">
                                            <h4 class="font-bold mb-1">Playlist ${i + 1}</h4>
                                            <p class="text-sm text-gray-400">${Math.floor(Math.random() * 20) + 5} tracks</p>
                                        </div>
                                    </div>
                                    <button class="w-full px-4 py-2 glass rounded-xl hover:bg-white/10 text-sm">
                                        <i class="fas fa-play mr-2"></i>Play All
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Liked Tab -->
                    <div id="content-liked" class="hidden">
                        <div class="space-y-4">
                            ${Array(10).fill(0).map((_, i) => `
                                <div class="glass-strong rounded-2xl p-6 flex items-center space-x-4 hover:bg-white/10 cursor-pointer">
                                    <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center">
                                        <i class="fas fa-music text-xl text-white/40"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-bold">Liked Track ${i + 1}</h4>
                                        <p class="text-sm text-gray-400">Artist Name</p>
                                    </div>
                                    <div class="text-sm text-gray-500">3:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}</div>
                                    <button class="w-10 h-10 rounded-full glass hover:bg-white/10">
                                        <i class="fas fa-play text-sm"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Activity Tab -->
                    <div id="content-activity" class="hidden">
                        <div class="glass-strong rounded-3xl p-8">
                            <h3 class="text-2xl font-bold mb-6">Recent Activity</h3>
                            <div class="space-y-6">
                                <div class="flex items-start space-x-4">
                                    <div class="w-3 h-3 rounded-full bg-purple-500 mt-2"></div>
                                    <div>
                                        <p class="font-semibold mb-1">Uploaded a new track</p>
                                        <p class="text-sm text-gray-400 mb-2">Summer Vibes 2024</p>
                                        <p class="text-xs text-gray-500">2 days ago</p>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-4">
                                    <div class="w-3 h-3 rounded-full bg-pink-500 mt-2"></div>
                                    <div>
                                        <p class="font-semibold mb-1">Liked a track</p>
                                        <p class="text-sm text-gray-400 mb-2">Midnight Dreams by DJ Neon</p>
                                        <p class="text-xs text-gray-500">3 days ago</p>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-4">
                                    <div class="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>
                                    <div>
                                        <p class="font-semibold mb-1">Followed</p>
                                        <p class="text-sm text-gray-400 mb-2">Alex_Music</p>
                                        <p class="text-xs text-gray-500">5 days ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        function switchTab(tabName) {
            ['tracks', 'playlists', 'liked', 'activity'].forEach(tab => {
                const button = document.getElementById(\`tab-\${tab}\`);
                const content = document.getElementById(\`content-\${tab}\`);
                
                if (tab === tabName) {
                    button.classList.add('border-purple-500', 'text-white');
                    button.classList.remove('border-transparent', 'text-gray-400');
                    content.classList.remove('hidden');
                } else {
                    button.classList.remove('border-purple-500', 'text-white');
                    button.classList.add('border-transparent', 'text-gray-400');
                    content.classList.add('hidden');
                }
            });
        }
    </script>
    
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
</body>
</html>`;
