import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernForumHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forum - MusicHub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Inter', sans-serif; }
        body {
            background: #000000;
            background-image: 
                radial-gradient(at 0% 0%, rgba(147, 51, 234, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.15) 0px, transparent 50%);
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
                <a href="/en/forum" class="text-white font-semibold">Forum</a>
                <a href="/en/blog" class="text-gray-300 hover:text-white">Blog</a>
            </div>
        </div>
    </nav>
    
    <div class="pt-28 px-6">
        <div class="max-w-[1400px] mx-auto">
            <div class="mb-12">
                <h1 class="text-6xl font-black mb-4">Community Forum</h1>
                <p class="text-xl text-gray-400">Connect with fellow music producers and artists</p>
            </div>
            
            <!-- Categories Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div class="glass-strong rounded-3xl p-8 card-3d cursor-pointer hover:bg-white/5">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6">
                        <i class="fas fa-music text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">Music Production</h3>
                    <p class="text-gray-400 mb-4">Tips, tricks, and techniques for producing music</p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span><i class="fas fa-comments mr-2"></i>245 topics</span>
                        <span><i class="fas fa-comment mr-2"></i>1.2K posts</span>
                    </div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8 card-3d cursor-pointer hover:bg-white/5">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-6">
                        <i class="fas fa-sliders-h text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">Mixing & Mastering</h3>
                    <p class="text-gray-400 mb-4">Get your tracks radio-ready with expert advice</p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span><i class="fas fa-comments mr-2"></i>189 topics</span>
                        <span><i class="fas fa-comment mr-2"></i>890 posts</span>
                    </div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8 card-3d cursor-pointer hover:bg-white/5">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center mb-6">
                        <i class="fas fa-users text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">Collaborations</h3>
                    <p class="text-gray-400 mb-4">Find partners for your next music project</p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span><i class="fas fa-comments mr-2"></i>156 topics</span>
                        <span><i class="fas fa-comment mr-2"></i>678 posts</span>
                    </div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8 card-3d cursor-pointer hover:bg-white/5">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center mb-6">
                        <i class="fas fa-microphone text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">Equipment & Gear</h3>
                    <p class="text-gray-400 mb-4">Discuss hardware, software, and plugins</p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span><i class="fas fa-comments mr-2"></i>312 topics</span>
                        <span><i class="fas fa-comment mr-2"></i>1.5K posts</span>
                    </div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8 card-3d cursor-pointer hover:bg-white/5">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center mb-6">
                        <i class="fas fa-lightbulb text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">Feedback & Reviews</h3>
                    <p class="text-gray-400 mb-4">Share your tracks and get constructive feedback</p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span><i class="fas fa-comments mr-2"></i>428 topics</span>
                        <span><i class="fas fa-comment mr-2"></i>2.1K posts</span>
                    </div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8 card-3d cursor-pointer hover:bg-white/5">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center mb-6">
                        <i class="fas fa-question text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">General Discussion</h3>
                    <p class="text-gray-400 mb-4">Everything else music-related</p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span><i class="fas fa-comments mr-2"></i>567 topics</span>
                        <span><i class="fas fa-comment mr-2"></i>3.2K posts</span>
                    </div>
                </div>
            </div>
            
            <!-- Recent Topics -->
            <div class="glass-strong rounded-3xl p-8">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-3xl font-bold">Recent Topics</h2>
                    <button class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg">
                        <i class="fas fa-plus mr-2"></i>New Topic
                    </button>
                </div>
                
                <div class="space-y-4">
                    ${Array(10).fill(0).map((_, i) => `
                        <div class="glass rounded-2xl p-6 hover:bg-white/10 cursor-pointer flex items-center space-x-6">
                            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-comment text-xl text-white/60"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h4 class="font-bold mb-1 truncate">How to get better at mixing electronic music?</h4>
                                <p class="text-sm text-gray-400 truncate">Started by User${i + 1} in Music Production</p>
                            </div>
                            <div class="hidden md:flex items-center space-x-8 text-sm text-gray-500">
                                <span><i class="fas fa-comment mr-2"></i>${Math.floor(Math.random() * 50)}</span>
                                <span><i class="fas fa-eye mr-2"></i>${Math.floor(Math.random() * 500)}</span>
                                <span>${Math.floor(Math.random() * 24)}h ago</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>
    
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
</body>
</html>`;
