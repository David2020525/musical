import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';
import { t, Locale } from '../lib/i18n';

export function ultraModernBlogDetailHTML(locale: Locale = 'en') {
    const otherLocale = locale === 'en' ? 'tr' : 'en';
    
    return `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Article - MUSICAL</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <style>
        * { font-family: 'Inter', sans-serif; }
        
        body {
            background: #000;
            background-image: 
                radial-gradient(at 0% 0%, rgba(147, 51, 234, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.15) 0px, transparent 50%);
            color: #fff;
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
        
        .article-content {
            line-height: 1.8;
            font-size: 1.125rem;
        }
        
        .article-content p {
            margin-bottom: 1.5rem;
        }
        
        .article-content h2 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
        
        .article-content ul, .article-content ol {
            margin-left: 2rem;
            margin-bottom: 1.5rem;
        }
    </style>
</head>
<body class="min-h-screen">
    <!-- Navigation -->
    <nav class="glass-strong border-b border-white/10 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <a href="/${locale}" class="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    MUSICAL
                </a>
                <div class="flex items-center gap-6">
                    <a href="/${locale}" class="text-white/60 hover:text-white transition-colors">${t('nav.home', locale)}</a>
                    <a href="/${locale}/browse" class="text-white/60 hover:text-white transition-colors">${t('nav.browse', locale)}</a>
                    <a href="/${locale}/forum" class="text-white/60 hover:text-white transition-colors">${t('nav.forum', locale)}</a>
                    <a href="/${locale}/blog" class="text-white hover:text-white transition-colors">${t('nav.blog', locale)}</a>
                    <a href="/${otherLocale}/blog" class="px-3 py-1 rounded-lg glass text-sm">
                        ${otherLocale.toUpperCase()}
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Article Content -->
            <div class="lg:col-span-2">
                <!-- Loading State -->
                <div id="loading" class="glass-strong rounded-3xl p-8 animate-pulse">
                    <div class="h-8 bg-white/10 rounded mb-4 w-3/4"></div>
                    <div class="h-4 bg-white/5 rounded mb-8 w-1/2"></div>
                    <div class="space-y-3">
                        <div class="h-4 bg-white/5 rounded"></div>
                        <div class="h-4 bg-white/5 rounded"></div>
                        <div class="h-4 bg-white/5 rounded w-5/6"></div>
                    </div>
                </div>

                <!-- Article -->
                <article id="article" class="hidden glass-strong rounded-3xl p-8">
                    <!-- Article Header -->
                    <div class="mb-8">
                        <h1 id="article-title" class="text-4xl font-black mb-4"></h1>
                        <div class="flex items-center gap-6 text-sm text-gray-400">
                            <div class="flex items-center gap-2">
                                <i class="fas fa-user"></i>
                                <span id="article-author"></span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fas fa-calendar"></i>
                                <span id="article-date"></span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fas fa-eye"></i>
                                <span id="article-views"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Article Cover Image -->
                    <div id="article-cover" class="hidden aspect-video rounded-2xl overflow-hidden mb-8">
                        <img id="cover-img" src="" alt="" class="w-full h-full object-cover" />
                    </div>

                    <!-- Article Body -->
                    <div id="article-content" class="article-content text-gray-300">
                        <!-- Content loaded via JS -->
                    </div>

                    <!-- Tags -->
                    <div id="article-tags" class="mt-8 pt-8 border-t border-white/10">
                        <!-- Tags loaded via JS -->
                    </div>
                </article>

                <!-- Error State -->
                <div id="error" class="hidden glass-strong rounded-3xl p-8 text-center">
                    <i class="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>
                    <h3 class="text-2xl font-bold mb-2">Article Not Found</h3>
                    <p class="text-gray-400 mb-6">The article you're looking for doesn't exist or has been removed.</p>
                    <a href="/${locale}/blog" class="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold">
                        <i class="fas fa-arrow-left mr-2"></i>Back to Blog
                    </a>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
                <!-- Recent Articles -->
                <div class="glass-strong rounded-3xl p-6">
                    <h3 class="text-xl font-bold mb-4">
                        <i class="fas fa-clock mr-2 text-purple-400"></i>Recent Articles
                    </h3>
                    <div id="recent-articles" class="space-y-4">
                        <!-- Loading -->
                        ${Array(3).fill(0).map(() => `
                            <div class="animate-pulse">
                                <div class="h-4 bg-white/10 rounded mb-2"></div>
                                <div class="h-3 bg-white/5 rounded w-2/3"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Categories -->
                <div class="glass-strong rounded-3xl p-6">
                    <h3 class="text-xl font-bold mb-4">
                        <i class="fas fa-folder mr-2 text-purple-400"></i>Categories
                    </h3>
                    <div id="categories" class="space-y-2">
                        <a href="/${locale}/blog?category=production" class="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                            Production Tips
                        </a>
                        <a href="/${locale}/blog?category=news" class="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                            Industry News
                        </a>
                        <a href="/${locale}/blog?category=interviews" class="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                            Artist Interviews
                        </a>
                        <a href="/${locale}/blog?category=reviews" class="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                            Gear Reviews
                        </a>
                    </div>
                </div>

                <!-- Share -->
                <div class="glass-strong rounded-3xl p-6">
                    <h3 class="text-xl font-bold mb-4">
                        <i class="fas fa-share-alt mr-2 text-purple-400"></i>Share Article
                    </h3>
                    <div class="flex gap-2">
                        <button class="flex-1 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors">
                            <i class="fab fa-twitter"></i>
                        </button>
                        <button class="flex-1 px-4 py-2 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition-colors">
                            <i class="fab fa-facebook"></i>
                        </button>
                        <button class="flex-1 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors">
                            <i class="fab fa-reddit"></i>
                        </button>
                        <button class="flex-1 px-4 py-2 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors">
                            <i class="fas fa-link"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Get slug from URL
        const pathParts = window.location.pathname.split('/');
        const slug = pathParts[pathParts.length - 1];

        // Load article
        async function loadArticle() {
            try {
                const response = await fetch(\`/api/blog/\${slug}\`);
                const data = await response.json();

                if (!data.success) {
                    throw new Error('Article not found');
                }

                const article = data.data;

                // Hide loading, show article
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('article').classList.remove('hidden');

                // Set article data
                document.getElementById('article-title').textContent = article.title;
                document.getElementById('article-author').textContent = article.author_name || 'Admin';
                document.getElementById('article-views').textContent = (article.views_count || 0).toLocaleString() + ' views';
                
                // Format date
                const date = new Date(article.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                document.getElementById('article-date').textContent = date;

                // Set cover image if exists
                if (article.cover_image) {
                    document.getElementById('article-cover').classList.remove('hidden');
                    document.getElementById('cover-img').src = article.cover_image;
                    document.getElementById('cover-img').alt = article.title;
                }

                // Set content
                document.getElementById('article-content').innerHTML = article.content.replace(/\\n/g, '<br>');

                // Update page title
                document.title = article.title + ' - MUSICAL Blog';

                // Load related content
                loadRecentArticles();

            } catch (error) {
                console.error('Failed to load article:', error);
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('error').classList.remove('hidden');
            }
        }

        // Load recent articles
        async function loadRecentArticles() {
            try {
                const response = await fetch('/api/blog/posts?limit=5');
                const data = await response.json();

                if (data.success && data.data.length > 0) {
                    const html = data.data.filter(post => post.slug !== slug).slice(0, 3).map(post => {
                        const date = new Date(post.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        });

                        return \`
                            <a href="/${locale}/blog/\${post.slug}" class="block p-3 rounded-lg hover:bg-white/5 transition-colors">
                                <h4 class="font-semibold mb-1 line-clamp-2">\${post.title}</h4>
                                <div class="text-xs text-gray-500">
                                    <i class="fas fa-calendar mr-1"></i>\${date}
                                </div>
                            </a>
                        \`;
                    }).join('');

                    document.getElementById('recent-articles').innerHTML = html;
                }
            } catch (error) {
                console.error('Failed to load recent articles:', error);
            }
        }

        // Initialize
        loadArticle();
    </script>

    <!-- Global Audio Player -->
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
</body>
</html>`;
}
