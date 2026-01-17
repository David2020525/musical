import { Locale } from '../lib/i18n';
import { SharedNavigationHTML, SharedNavigationScript } from '../components/SharedNavigation';
import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernBlogHTML = (locale: Locale = 'en') => `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - MUSICAL</title>
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
        .card-3d:hover { transform: translateY(-12px); }
    </style>
</head>
<body class="text-white pb-32">
    ${SharedNavigationHTML(locale, { currentPage: 'blog', showSearch: true, showAuth: true })}
    
    <div class="pt-28 px-6 pb-32">
        <div class="max-w-[1400px] mx-auto">
            <div class="mb-12">
                <h1 class="text-6xl font-black mb-4">Music Blog</h1>
                <p class="text-xl text-gray-400">Industry news, tips, tutorials, and interviews</p>
            </div>
            
            <!-- Featured Post -->
            <div class="glass-strong rounded-3xl overflow-hidden card-3d mb-12 cursor-pointer group">
                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <div class="aspect-video lg:aspect-auto bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                        <i class="fas fa-newspaper text-8xl text-white/20"></i>
                    </div>
                    <div class="p-12">
                        <div class="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-bold mb-4">
                            Featured
                        </div>
                        <h2 class="text-4xl font-black mb-4 group-hover:text-purple-400 transition-colors">
                            The Future of Music Production in 2026
                        </h2>
                        <p class="text-gray-400 text-lg mb-6">
                            Explore the latest technologies, AI tools, and production techniques that are shaping 
                            the future of music creation. From cloud-based DAWs to neural processing...
                        </p>
                        <div class="flex items-center space-x-6 text-sm text-gray-500">
                            <span><i class="fas fa-user mr-2"></i>Admin</span>
                            <span><i class="fas fa-calendar mr-2"></i>Jan 8, 2026</span>
                            <span><i class="fas fa-eye mr-2"></i>5.2K views</span>
                            <span><i class="fas fa-clock mr-2"></i>8 min read</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Blog Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${Array(9).fill(0).map((_, i) => {
                    const categories = ['Production', 'Mixing', 'Marketing', 'Gear', 'Tutorial', 'Interview'];
                    const colors = [
                        'from-purple-600/20 to-pink-600/20',
                        'from-blue-600/20 to-cyan-600/20',
                        'from-green-600/20 to-emerald-600/20',
                        'from-orange-600/20 to-red-600/20',
                        'from-pink-600/20 to-purple-600/20',
                        'from-yellow-600/20 to-orange-600/20'
                    ];
                    const category = categories[i % categories.length];
                    const color = colors[i % colors.length];
                    
                    return `
                        <div class="glass-strong rounded-3xl overflow-hidden card-3d group cursor-pointer">
                            <div class="aspect-video bg-gradient-to-br ${color} flex items-center justify-center relative overflow-hidden">
                                <i class="fas fa-newspaper text-6xl text-white/20"></i>
                                <div class="absolute top-4 right-4 px-3 py-1 glass-strong rounded-full text-xs">
                                    ${category}
                                </div>
                            </div>
                            <div class="p-6">
                                <div class="text-xs text-gray-500 mb-3">
                                    <i class="fas fa-calendar mr-2"></i>Jan ${7 - Math.floor(i / 3)}, 2026
                                </div>
                                <h3 class="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                                    ${category === 'Production' ? 'Advanced Production Techniques' : 
                                      category === 'Mixing' ? 'Mixing Secrets from Top Engineers' :
                                      category === 'Marketing' ? 'Marketing Your Music Effectively' :
                                      category === 'Gear' ? 'Best Studio Gear Under $500' :
                                      category === 'Tutorial' ? 'Step-by-Step Mastering Tutorial' :
                                      'Interview with Industry Legend'}
                                </h3>
                                <p class="text-gray-400 text-sm mb-4 line-clamp-2">
                                    Discover professional tips and tricks that will take your music production 
                                    to the next level. Learn from experts...
                                </p>
                                <div class="flex items-center justify-between text-xs text-gray-500">
                                    <span><i class="fas fa-user mr-2"></i>Admin</span>
                                    <span><i class="fas fa-eye mr-2"></i>${(Math.random() * 3 + 1).toFixed(1)}K views</span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <!-- Pagination -->
            <div class="flex items-center justify-center space-x-4 mt-12">
                <button class="px-6 py-3 glass-strong rounded-xl hover:bg-white/10 transition-all">
                    <i class="fas fa-chevron-left mr-2"></i>Previous
                </button>
                <div class="flex items-center space-x-2">
                    <button class="w-10 h-10 glass-strong rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold">1</button>
                    <button class="w-10 h-10 glass-strong rounded-xl hover:bg-white/10">2</button>
                    <button class="w-10 h-10 glass-strong rounded-xl hover:bg-white/10">3</button>
                    <span class="text-gray-500">...</span>
                    <button class="w-10 h-10 glass-strong rounded-xl hover:bg-white/10">10</button>
                </div>
                <button class="px-6 py-3 glass-strong rounded-xl hover:bg-white/10 transition-all">
                    Next<i class="fas fa-chevron-right ml-2"></i>
                </button>
            </div>
        </div>
    </div>
    
    ${GlobalAudioPlayerHTML}
    
    ${SharedNavigationScript(locale)}
    
    <script>
    // Play Button Functions
    ${PlayButtonScript}
    </script>
</body>
</html>`;
