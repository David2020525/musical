import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export function ultraModernTrackDetailHTML(trackId: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Track Details - MusicHub</title>
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
        
        .neon-glow {
            box-shadow: 
                0 0 20px rgba(147, 51, 234, 0.5),
                0 0 40px rgba(236, 72, 153, 0.3),
                0 0 60px rgba(147, 51, 234, 0.2);
        }
        
        .play-btn.playing {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.6), 0 0 40px rgba(236, 72, 153, 0.4);
        }
        
        .play-btn.playing .play-icon { display: none; }
        .play-btn.playing .pause-icon { display: block; }
        
        .waveform-bar {
            background: linear-gradient(to top, #9333EA, #EC4899);
            transition: height 0.3s ease;
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
                </div>
                
                <div class="flex items-center space-x-6">
                    <a href="/en" class="text-gray-300 hover:text-white transition-colors">Home</a>
                    <a href="/en/browse" class="text-gray-300 hover:text-white transition-colors">Browse</a>
                    <a href="/en/dashboard" class="text-gray-300 hover:text-white transition-colors">Dashboard</a>
                    <a href="/en/login" class="px-6 py-2.5 glass rounded-xl hover:bg-white/10 transition-all text-sm">Login</a>
                </div>
            </div>
        </div>
    </nav>
    
    <!-- Main Content -->
    <div class="pt-28 px-6">
        <div class="max-w-[1400px] mx-auto">
            <!-- Back Button -->
            <a href="/en/browse" class="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8">
                <i class="fas fa-arrow-left"></i>
                <span>Back to Browse</span>
            </a>
            
            <!-- Track Header -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                <!-- Artwork -->
                <div class="lg:col-span-1">
                    <div class="glass-strong rounded-3xl overflow-hidden card-3d relative group">
                        <div class="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center" id="trackArtwork">
                            <i class="fas fa-music text-8xl text-white/20"></i>
                        </div>
                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <button 
                                id="mainPlayButton"
                                class="play-btn w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 neon-glow"
                                onclick="playCurrentTrack()"
                            >
                                <i class="fas fa-play text-3xl ml-2 play-icon"></i>
                                <i class="fas fa-pause text-3xl pause-icon hidden"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Track Info -->
                <div class="lg:col-span-2 space-y-6">
                    <div>
                        <div class="flex items-center space-x-3 mb-3">
                            <span class="px-4 py-1.5 glass-strong rounded-full text-sm" id="trackGenre">Loading...</span>
                            <span class="px-4 py-1.5 glass-strong rounded-full text-sm" id="trackBpm">-- BPM</span>
                        </div>
                        <h1 class="text-5xl md:text-6xl font-black mb-4" id="trackTitle">Loading Track...</h1>
                        <p class="text-2xl text-gray-400 mb-6" id="trackArtist">Artist</p>
                    </div>
                    
                    <div class="flex items-center space-x-6">
                        <button 
                            onclick="playCurrentTrack()"
                            class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all neon-glow"
                        >
                            <i class="fas fa-play mr-2"></i>Play Now
                        </button>
                        <button class="px-8 py-4 glass-strong rounded-2xl hover:bg-white/10 transition-all">
                            <i class="fas fa-heart mr-2"></i><span id="likesCount">0</span>
                        </button>
                        <button class="px-8 py-4 glass-strong rounded-2xl hover:bg-white/10 transition-all">
                            <i class="fas fa-share-alt mr-2"></i>Share
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-4">
                        <div class="glass-strong rounded-2xl p-6 text-center">
                            <div class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2" id="playsCount">0</div>
                            <div class="text-sm text-gray-400">Plays</div>
                        </div>
                        <div class="glass-strong rounded-2xl p-6 text-center">
                            <div class="text-3xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2" id="likesCountStat">0</div>
                            <div class="text-sm text-gray-400">Likes</div>
                        </div>
                        <div class="glass-strong rounded-2xl p-6 text-center">
                            <div class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">$<span id="trackPrice">0</span></div>
                            <div class="text-sm text-gray-400">Price</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Waveform Visualization -->
            <div class="glass-strong rounded-3xl p-8 mb-12">
                <h3 class="text-xl font-bold mb-6">Audio Waveform</h3>
                <div class="flex items-end justify-between h-32 gap-1" id="waveform">
                    ${Array(80).fill(0).map(() => `<div class="waveform-bar flex-1 rounded-t" style="height: ${Math.random() * 100}%"></div>`).join('')}
                </div>
            </div>
            
            <!-- Tabs -->
            <div class="mb-12">
                <div class="flex space-x-2 mb-6 border-b border-white/10">
                    <button onclick="switchTab('overview')" id="tab-overview" class="px-6 py-3 font-semibold border-b-2 border-purple-500 text-white">Overview</button>
                    <button onclick="switchTab('licensing')" id="tab-licensing" class="px-6 py-3 font-semibold border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">Licensing</button>
                    <button onclick="switchTab('comments')" id="tab-comments" class="px-6 py-3 font-semibold border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">Comments</button>
                </div>
                
                <div id="tab-content">
                    <div id="content-overview">
                        <div class="glass-strong rounded-3xl p-8">
                            <h3 class="text-2xl font-bold mb-4">About This Track</h3>
                            <p class="text-gray-400 leading-relaxed mb-6" id="trackDescription">Loading description...</p>
                            
                            <h4 class="text-lg font-bold mb-3">Tags</h4>
                            <div class="flex flex-wrap gap-2" id="trackTags">
                                <span class="px-4 py-2 glass rounded-full text-sm">Loading...</span>
                            </div>
                        </div>
                    </div>
                    
                    <div id="content-licensing" class="hidden">
                        <div class="glass-strong rounded-3xl p-8">
                            <h3 class="text-2xl font-bold mb-6">Licensing Options</h3>
                            <div class="space-y-4">
                                <div class="glass rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer">
                                    <div class="flex items-center justify-between mb-2">
                                        <h4 class="text-lg font-bold">Personal License</h4>
                                        <span class="text-2xl font-bold">$29</span>
                                    </div>
                                    <p class="text-gray-400 text-sm">For personal projects, YouTube videos, podcasts</p>
                                </div>
                                <div class="glass rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer">
                                    <div class="flex items-center justify-between mb-2">
                                        <h4 class="text-lg font-bold">Commercial License</h4>
                                        <span class="text-2xl font-bold">$99</span>
                                    </div>
                                    <p class="text-gray-400 text-sm">For commercial use, advertising, broadcasting</p>
                                </div>
                                <div class="glass rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer border-2 border-purple-500">
                                    <div class="flex items-center justify-between mb-2">
                                        <h4 class="text-lg font-bold">Exclusive Rights</h4>
                                        <span class="text-2xl font-bold">$499</span>
                                    </div>
                                    <p class="text-gray-400 text-sm">Full exclusive rights, track removed from store</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="content-comments" class="hidden">
                        <div class="glass-strong rounded-3xl p-8">
                            <h3 class="text-2xl font-bold mb-6">Comments</h3>
                            <div class="text-center py-12 text-gray-400">
                                <i class="fas fa-comments text-4xl mb-4"></i>
                                <p>No comments yet. Be the first to comment!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Producer Card -->
            <div class="glass-strong rounded-3xl p-8 mb-12">
                <h3 class="text-2xl font-bold mb-6">About the Producer</h3>
                <div class="flex items-center space-x-6">
                    <div class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold">
                        <span id="producerInitials">?</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="text-xl font-bold mb-1" id="producerName">Artist Name</h4>
                        <p class="text-gray-400 mb-3">Producer since 2020</p>
                        <div class="flex items-center space-x-4 text-sm">
                            <span><i class="fas fa-music mr-2"></i>24 Tracks</span>
                            <span><i class="fas fa-users mr-2"></i>1.2K Followers</span>
                        </div>
                    </div>
                    <button class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg transition-all">
                        Follow
                    </button>
                </div>
            </div>
            
            <!-- Related Tracks -->
            <div class="mb-12">
                <h3 class="text-3xl font-bold mb-6">More from this Artist</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="relatedTracks">
                    ${Array(4).fill(0).map(() => `
                        <div class="glass-strong rounded-3xl overflow-hidden card-3d">
                            <div class="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                <i class="fas fa-music text-4xl text-white/20"></i>
                            </div>
                            <div class="p-4">
                                <div class="h-4 bg-white/10 rounded mb-2"></div>
                                <div class="h-3 bg-white/5 rounded w-2/3"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>
    
    <script>
        let currentTrack = null;
        
        async function loadTrack() {
            try {
                const response = await fetch('/api/tracks/${trackId}');
                const data = await response.json();
                
                if (data.success) {
                    currentTrack = data.data;
                    
                    // Update UI
                    document.getElementById('trackTitle').textContent = currentTrack.title;
                    document.getElementById('trackArtist').textContent = currentTrack.artist;
                    document.getElementById('trackGenre').textContent = currentTrack.genre || 'Music';
                    document.getElementById('trackBpm').textContent = (currentTrack.bpm || '120') + ' BPM';
                    document.getElementById('playsCount').textContent = (currentTrack.plays_count || 0).toLocaleString();
                    document.getElementById('likesCount').textContent = (currentTrack.likes_count || 0).toLocaleString();
                    document.getElementById('likesCountStat').textContent = (currentTrack.likes_count || 0).toLocaleString();
                    document.getElementById('trackPrice').textContent = currentTrack.price || '29';
                    document.getElementById('trackDescription').textContent = currentTrack.description || 'No description available.';
                    document.getElementById('producerName').textContent = currentTrack.artist;
                    document.getElementById('producerInitials').textContent = currentTrack.artist.substring(0, 2).toUpperCase();
                    
                    // Tags
                    if (currentTrack.tags) {
                        const tags = currentTrack.tags.split(',').map(tag => 
                            \`<span class="px-4 py-2 glass rounded-full text-sm hover:bg-white/10 transition-all cursor-pointer">\${tag.trim()}</span>\`
                        ).join('');
                        document.getElementById('trackTags').innerHTML = tags;
                    }
                    
                    // Update title
                    document.title = \`\${currentTrack.title} - \${currentTrack.artist} | MusicHub\`;
                }
            } catch (error) {
                console.error('Failed to load track:', error);
            }
        }
        
        function playCurrentTrack() {
            if (!currentTrack) return;
            
            if (typeof window.GlobalAudioPlayer !== 'undefined') {
                window.GlobalAudioPlayer.play(currentTrack);
            } else {
                console.error('Global audio player not available');
            }
        }
        
        function switchTab(tabName) {
            // Update tab buttons
            ['overview', 'licensing', 'comments'].forEach(tab => {
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
        
        // Load track data
        loadTrack();
    </script>
    
    <!-- Global Audio Player -->
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
</body>
</html>`;
}
