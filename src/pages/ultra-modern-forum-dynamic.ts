import { Locale, t } from '../lib/i18n';
import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernForumDynamicHTML = (locale: Locale) => {
  const _ = (key: string) => t(key, locale);
  const otherLocale = locale === 'en' ? 'tr' : 'en';
  
  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${_('forum.title')} - MusicHub</title>
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
        .skeleton { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
        }
    </style>
</head>
<body class="text-white pb-32">
    <nav class="fixed top-0 w-full z-50 glass-strong border-b border-white/5">
        <div class="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
            <a href="/${locale}" class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <i class="fas fa-music text-white text-xl"></i>
                </div>
                <span class="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">MusicHub</span>
            </a>
            <div class="flex items-center space-x-6">
                <a href="/${locale}" class="text-gray-300 hover:text-white">${_('nav.home')}</a>
                <a href="/${locale}/browse" class="text-gray-300 hover:text-white">${_('nav.browse')}</a>
                <a href="/${locale}/forum" class="text-white font-semibold">${_('nav.forum')}</a>
                <a href="/${locale}/blog" class="text-gray-300 hover:text-white">${_('nav.blog')}</a>
                <a href="/${locale}/dashboard" class="text-gray-300 hover:text-white" id="dashboardLink">${_('nav.dashboard')}</a>
                <!-- Language Switcher -->
                <a 
                    href="/${otherLocale}/forum" 
                    class="px-4 py-2 rounded-xl glass hover:glass-strong transition-all font-semibold flex items-center gap-2"
                    title="${locale === 'en' ? 'Türkçeye geç' : 'Switch to English'}"
                >
                    <i class="fas fa-globe"></i>
                    <span class="hidden sm:inline">${otherLocale.toUpperCase()}</span>
                </a>
            </div>
        </div>
    </nav>
    
    <div class="pt-28 px-6">
        <div class="max-w-[1400px] mx-auto">
            <div class="mb-12">
                <h1 class="text-6xl font-black mb-4">${_('forum.community')}</h1>
                <p class="text-xl text-gray-400">${_('forum.subtitle')}</p>
            </div>
            
            <!-- Loading State -->
            <div id="loadingState" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                ${Array(6).fill(0).map(() => `
                    <div class="glass-strong rounded-3xl p-8 skeleton">
                        <div class="w-16 h-16 rounded-2xl bg-gray-700 mb-6"></div>
                        <div class="h-6 bg-gray-700 rounded mb-2"></div>
                        <div class="h-4 bg-gray-700 rounded mb-4"></div>
                        <div class="flex items-center justify-between">
                            <div class="h-4 w-20 bg-gray-700 rounded"></div>
                            <div class="h-4 w-20 bg-gray-700 rounded"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Categories Grid -->
            <div id="categoriesGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 hidden">
                <!-- Categories will be loaded here -->
            </div>
            
            <!-- Recent Topics -->
            <div class="glass-strong rounded-3xl p-8">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-3xl font-bold">${_('forum.recent_topics')}</h2>
                    <button id="newTopicBtn" class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg">
                        <i class="fas fa-plus mr-2"></i>${_('forum.new_topic')}
                    </button>
                </div>
                
                <!-- Topics Loading -->
                <div id="topicsLoading" class="space-y-4">
                    ${Array(5).fill(0).map(() => `
                        <div class="glass rounded-2xl p-6 skeleton">
                            <div class="flex items-center space-x-6">
                                <div class="w-12 h-12 rounded-xl bg-gray-700 flex-shrink-0"></div>
                                <div class="flex-1">
                                    <div class="h-5 bg-gray-700 rounded mb-2 w-3/4"></div>
                                    <div class="h-4 bg-gray-700 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Topics List -->
                <div id="topicsList" class="space-y-4 hidden">
                    <!-- Topics will be loaded here -->
                </div>
                
                <!-- Empty State -->
                <div id="emptyState" class="hidden text-center py-12">
                    <i class="fas fa-comments text-6xl text-gray-600 mb-4"></i>
                    <h3 class="text-2xl font-bold mb-2">${_('forum.no_topics')}</h3>
                    <p class="text-gray-400">${_('forum.be_first')}</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- New Topic Modal -->
    <div id="newTopicModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
        <div class="glass-strong rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-3xl font-bold">${_('forum.create_topic')}</h2>
                <button id="closeModal" class="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <form id="newTopicForm" class="space-y-6">
                <div>
                    <label class="block text-sm font-semibold mb-2">${_('forum.category')}</label>
                    <select id="categorySelect" required class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500">
                        <option value="">${_('forum.select_category')}</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">${_('forum.title')}</label>
                    <input type="text" id="topicTitle" required maxlength="200" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500" placeholder="${_('forum.title_placeholder')}">
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">${_('forum.content')}</label>
                    <textarea id="topicContent" required rows="8" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 resize-none" placeholder="${_('forum.content_placeholder')}"></textarea>
                </div>
                
                <div id="formError" class="hidden bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400"></div>
                
                <div class="flex items-center justify-end space-x-4">
                    <button type="button" id="cancelBtn" class="px-6 py-3 rounded-xl font-semibold hover:bg-white/5">${_('common.cancel')}</button>
                    <button type="submit" class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg">
                        <span id="submitText">${_('forum.post_topic')}</span>
                        <span id="submitLoading" class="hidden"><i class="fas fa-spinner fa-spin mr-2"></i>${_('common.loading')}</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
    
    <script>
        const locale = '${locale}';
        let currentUser = null;
        let categories = [];
        let topics = [];
        
        // Icon mapping for categories
        const categoryIcons = {
            'general': 'fa-question',
            'production': 'fa-music',
            'mixing': 'fa-sliders-h',
            'gear': 'fa-microphone',
            'feedback': 'fa-lightbulb',
            'collab': 'fa-users'
        };
        
        const colorGradients = [
            'from-purple-600 to-pink-600',
            'from-blue-600 to-cyan-600',
            'from-green-600 to-emerald-600',
            'from-orange-600 to-red-600',
            'from-pink-600 to-purple-600',
            'from-yellow-600 to-orange-600'
        ];
        
        // Check authentication
        async function checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                document.getElementById('dashboardLink').style.display = 'none';
                return;
            }
            
            try {
                const response = await fetch('/api/auth/me', {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });
                
                if (response.ok) {
                    currentUser = await response.json();
                    currentUser = currentUser.data || currentUser;
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            }
        }
        
        // Load categories
        async function loadCategories() {
            try {
                const response = await fetch('/api/forum/categories');
                const data = await response.json();
                
                if (data.success && data.data) {
                    categories = data.data;
                    renderCategories();
                    populateCategorySelect();
                }
            } catch (error) {
                console.error('Failed to load categories:', error);
            }
        }
        
        // Render categories
        function renderCategories() {
            const grid = document.getElementById('categoriesGrid');
            document.getElementById('loadingState').classList.add('hidden');
            grid.classList.remove('hidden');
            
            grid.innerHTML = categories.map((cat, index) => {
                const icon = categoryIcons[cat.slug] || 'fa-folder';
                const gradient = colorGradients[index % colorGradients.length];
                
                return \`
                    <div class="glass-strong rounded-3xl p-8 card-3d cursor-pointer hover:bg-white/5" onclick="filterTopics(\${cat.id})">
                        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br \${gradient} flex items-center justify-center mb-6">
                            <i class="fas \${icon} text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">\${cat.name}</h3>
                        <p class="text-gray-400 mb-4">\${cat.description || ''}</p>
                        <div class="flex items-center justify-between text-sm text-gray-500">
                            <span><i class="fas fa-comment mr-2"></i>\${cat.posts_count || 0} posts</span>
                        </div>
                    </div>
                \`;
            }).join('');
        }
        
        // Populate category select
        function populateCategorySelect() {
            const select = document.getElementById('categorySelect');
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.id;
                option.textContent = cat.name;
                select.appendChild(option);
            });
        }
        
        // Load topics
        async function loadTopics(categoryId = null) {
            document.getElementById('topicsLoading').classList.remove('hidden');
            document.getElementById('topicsList').classList.add('hidden');
            document.getElementById('emptyState').classList.add('hidden');
            
            try {
                let url = '/api/forum/topics';
                if (categoryId) url += \`?category_id=\${categoryId}\`;
                
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.success && data.data) {
                    topics = data.data;
                    renderTopics();
                }
            } catch (error) {
                console.error('Failed to load topics:', error);
            }
        }
        
        // Render topics
        function renderTopics() {
            document.getElementById('topicsLoading').classList.add('hidden');
            
            if (topics.length === 0) {
                document.getElementById('emptyState').classList.remove('hidden');
                return;
            }
            
            const list = document.getElementById('topicsList');
            list.classList.remove('hidden');
            
            list.innerHTML = topics.map(topic => \`
                <a href="/${locale}/forum/\${topic.slug}" class="block">
                    <div class="glass rounded-2xl p-6 hover:bg-white/10 cursor-pointer flex items-center space-x-6 transition-all">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center flex-shrink-0">
                            \${topic.pinned ? '<i class="fas fa-thumbtack text-xl text-yellow-400"></i>' : '<i class="fas fa-comment text-xl text-white/60"></i>'}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center space-x-2 mb-1">
                                <h4 class="font-bold truncate">\${topic.title}</h4>
                                \${topic.locked ? '<i class="fas fa-lock text-sm text-gray-500"></i>' : ''}
                            </div>
                            <p class="text-sm text-gray-400 truncate">
                                ${_('forum.started_by')} \${topic.author_name || topic.author_username} ${_('forum.in')} \${topic.category_name}
                            </p>
                        </div>
                        <div class="hidden md:flex items-center space-x-8 text-sm text-gray-500">
                            <span><i class="fas fa-comment mr-2"></i>\${topic.replies_count || 0}</span>
                            <span><i class="fas fa-eye mr-2"></i>\${topic.views_count || 0}</span>
                            <span>\${formatDate(topic.created_at)}</span>
                        </div>
                    </div>
                </a>
            \`).join('');
        }
        
        // Filter topics by category
        function filterTopics(categoryId) {
            loadTopics(categoryId);
        }
        
        // Format date
        function formatDate(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diff = now - date;
            const hours = Math.floor(diff / 1000 / 60 / 60);
            
            if (hours < 1) return '${_('common.just_now')}';
            if (hours < 24) return \`\${hours}h ${_('common.ago')}\`;
            
            const days = Math.floor(hours / 24);
            if (days < 7) return \`\${days}d ${_('common.ago')}\`;
            
            return date.toLocaleDateString();
        }
        
        // Modal controls
        document.getElementById('newTopicBtn').addEventListener('click', () => {
            if (!currentUser) {
                window.location.href = '/${locale}/login?redirect=' + encodeURIComponent(window.location.pathname);
                return;
            }
            document.getElementById('newTopicModal').classList.remove('hidden');
        });
        
        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('newTopicModal').classList.add('hidden');
        });
        
        document.getElementById('cancelBtn').addEventListener('click', () => {
            document.getElementById('newTopicModal').classList.add('hidden');
        });
        
        // Submit new topic
        document.getElementById('newTopicForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = e.target.querySelector('[type="submit"]');
            const submitText = document.getElementById('submitText');
            const submitLoading = document.getElementById('submitLoading');
            const formError = document.getElementById('formError');
            
            submitText.classList.add('hidden');
            submitLoading.classList.remove('hidden');
            submitBtn.disabled = true;
            formError.classList.add('hidden');
            
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/forum/topics', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': \`Bearer \${token}\`
                    },
                    body: JSON.stringify({
                        category_id: parseInt(document.getElementById('categorySelect').value),
                        title: document.getElementById('topicTitle').value,
                        content: document.getElementById('topicContent').value
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    window.location.href = \`/${locale}/forum/\${data.data.slug}\`;
                } else {
                    formError.textContent = data.error || '${_('common.error')}';
                    formError.classList.remove('hidden');
                }
            } catch (error) {
                formError.textContent = \`${_('common.network_error')}\`;
                formError.classList.remove('hidden');
            } finally {
                submitText.classList.remove('hidden');
                submitLoading.classList.add('hidden');
                submitBtn.disabled = false;
            }
        });
        
        // Initialize
        checkAuth();
        loadCategories();
        loadTopics();
    </script>
</body>
</html>`;
};
