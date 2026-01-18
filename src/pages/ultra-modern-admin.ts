import { Locale, t } from '../lib/i18n';
import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernAdminHTML = (locale: Locale = 'en') => `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('admin.title', locale)} - MUSICAL</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
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
        
        .glass-strong {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(40px) saturate(200%);
            -webkit-backdrop-filter: blur(40px) saturate(200%);
            border: 1px solid rgba(255, 255, 255, 0.12);
        }
        
        .stat-card {
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .stat-card:hover {
            transform: translateY(-4px);
            border-color: rgba(147, 51, 234, 0.5);
        }
    </style>
</head>
<body class="min-h-screen">
    <!-- Admin Navigation -->
    <nav class="glass-strong border-b border-white/10 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-8">
                    <h1 class="text-2xl font-bold flex items-center gap-2">
                        <i class="fas fa-shield-alt text-purple-500"></i>
                        Admin Panel
                    </h1>
                    <div class="hidden md:flex gap-6 text-sm">
                        <a href="/${locale}/admin" class="text-white hover:text-purple-400 transition-colors">
                            <i class="fas fa-th-large mr-2"></i>${t('admin.dashboard', locale)}
                        </a>
                        <a href="/${locale}/admin/users" class="text-gray-400 hover:text-purple-400 transition-colors">
                            <i class="fas fa-users mr-2"></i>${t('admin.users', locale)}
                        </a>
                        <a href="/${locale}/admin/producers" class="text-gray-400 hover:text-purple-400 transition-colors">
                            <i class="fas fa-user-music mr-2"></i>${t('admin.applications', locale)}
                        </a>
                        <a href="/${locale}/admin/content" class="text-gray-400 hover:text-purple-400 transition-colors">
                            <i class="fas fa-layer-group mr-2"></i>${t('admin.content', locale)}
                        </a>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-sm text-gray-400" id="admin-name">Admin</span>
                    <a href="/${locale}" class="text-sm text-gray-400 hover:text-white transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i>Back to Site
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-12">
        <!-- Loading State -->
        <div id="loading" class="text-center py-20">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            <p class="mt-4 text-gray-400">Loading admin dashboard...</p>
        </div>

        <!-- Dashboard Content -->
        <div id="dashboard" class="hidden">
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                <!-- Total Users -->
                <div class="glass-strong rounded-2xl p-6 stat-card">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <i class="fas fa-users text-2xl text-blue-400"></i>
                        </div>
                        <span class="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">Total</span>
                    </div>
                    <div class="text-3xl font-bold mb-1" id="stat-users">...</div>
                    <div class="text-sm text-gray-400">Total Users</div>
                </div>

                <!-- Total Tracks -->
                <div class="glass-strong rounded-2xl p-6 stat-card">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                            <i class="fas fa-music text-2xl text-purple-400"></i>
                        </div>
                        <span class="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">Music</span>
                    </div>
                    <div class="text-3xl font-bold mb-1" id="stat-tracks">...</div>
                    <div class="text-sm text-gray-400">Total Tracks</div>
                </div>

                <!-- Pending Applications -->
                <div class="glass-strong rounded-2xl p-6 stat-card">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                            <i class="fas fa-clock text-2xl text-yellow-400"></i>
                        </div>
                        <span class="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300">Pending</span>
                    </div>
                    <div class="text-3xl font-bold mb-1" id="stat-pending">...</div>
                    <div class="text-sm text-gray-400">Producer Applications</div>
                </div>

                <!-- Forum Topics -->
                <div class="glass-strong rounded-2xl p-6 stat-card">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                            <i class="fas fa-comments text-2xl text-pink-400"></i>
                        </div>
                        <span class="text-xs px-2 py-1 rounded-full bg-pink-500/20 text-pink-300">Community</span>
                    </div>
                    <div class="text-3xl font-bold mb-1" id="stat-topics">...</div>
                    <div class="text-sm text-gray-400">Forum Topics</div>
                </div>
            </div>

            <!-- Recent Activity & Quick Actions -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Recent Activity -->
                <div class="lg:col-span-2 glass-strong rounded-2xl p-6">
                    <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                        <i class="fas fa-history text-purple-400"></i>
                        Recent Activity
                    </h2>
                    <div id="activity-feed" class="space-y-3">
                        <!-- Activity items loaded via JS -->
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="glass-strong rounded-2xl p-6">
                    <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                        <i class="fas fa-bolt text-yellow-400"></i>
                        Quick Actions
                    </h2>
                    <div class="space-y-3">
                        <a href="/en/admin/users" class="block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                            <i class="fas fa-user-plus text-blue-400 mr-3"></i>
                            <span class="font-medium">Manage Users</span>
                        </a>
                        <a href="/en/admin/producers" class="block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                            <i class="fas fa-check-circle text-green-400 mr-3"></i>
                            <span class="font-medium">Review Applications</span>
                        </a>
                        <a href="/en/admin/content" class="block p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                            <i class="fas fa-shield-alt text-purple-400 mr-3"></i>
                            <span class="font-medium">Moderate Content</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Check authentication
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/en/login';
        }

        // Verify admin role
        async function checkAdminAccess() {
            try {
                const res = await fetch('/api/auth/me', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await res.json();
                
                if (!data.success || data.data.role !== 'admin') {
                    alert('Access denied. Admin role required.');
                    window.location.href = '/en/dashboard';
                    return false;
                }
                
                document.getElementById('admin-name').textContent = data.data.name || 'Admin';
                return true;
            } catch (error) {
                console.error('Auth check failed:', error);
                window.location.href = '/en/login';
                return false;
            }
        }

        // Load admin stats
        async function loadAdminStats() {
            try {
                const res = await fetch('/api/admin/stats', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await res.json();
                
                if (data.success) {
                    document.getElementById('stat-users').textContent = data.data.users.toLocaleString();
                    document.getElementById('stat-tracks').textContent = data.data.tracks.toLocaleString();
                    document.getElementById('stat-pending').textContent = data.data.pendingApplications.toLocaleString();
                    document.getElementById('stat-topics').textContent = data.data.forumTopics.toLocaleString();
                    
                    // Show dashboard
                    document.getElementById('loading').classList.add('hidden');
                    document.getElementById('dashboard').classList.remove('hidden');
                    
                    loadRecentActivity();
                }
            } catch (error) {
                console.error('Failed to load admin stats:', error);
                document.getElementById('loading').innerHTML = \`
                    <div class="text-center py-20">
                        <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                        <p class="text-gray-400">Failed to load admin dashboard</p>
                    </div>
                \`;
            }
        }

        // Load recent activity
        async function loadRecentActivity() {
            // Mock activity for now
            const activities = [
                { icon: 'fa-user-plus', color: 'blue', text: 'New user registered: john@example.com', time: '2 minutes ago' },
                { icon: 'fa-music', color: 'purple', text: 'Track uploaded: "Summer Vibes"', time: '15 minutes ago' },
                { icon: 'fa-check-circle', color: 'green', text: 'Producer application approved', time: '1 hour ago' },
                { icon: 'fa-comment', color: 'pink', text: 'New forum topic created', time: '2 hours ago' },
                { icon: 'fa-blog', color: 'indigo', text: 'Blog post published', time: '3 hours ago' },
            ];
            
            const activityHTML = activities.map(act => \`
                <div class="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div class="w-8 h-8 rounded-lg bg-\${act.color}-500/20 flex items-center justify-center flex-shrink-0">
                        <i class="fas \${act.icon} text-\${act.color}-400 text-sm"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm">\${act.text}</p>
                        <p class="text-xs text-gray-500 mt-1">\${act.time}</p>
                    </div>
                </div>
            \`).join('');
            
            document.getElementById('activity-feed').innerHTML = activityHTML;
        }

        // Initialize
        (async () => {
            const hasAccess = await checkAdminAccess();
            if (hasAccess) {
                await loadAdminStats();
            }
        })();
    </script>

    <!-- Global Audio Player -->
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
</body>
</html>
`;
