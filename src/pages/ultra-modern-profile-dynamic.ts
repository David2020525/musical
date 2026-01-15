import { Locale, t } from '../lib/i18n';
import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernProfileDynamicHTML = (locale: Locale) => {
  const _ = (key: string) => t(key, locale);
  const otherLocale = locale === 'en' ? 'tr' : 'en';
  
  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${_('profile.edit')} - MusicHub</title>
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
                <a href="/${locale}/forum" class="text-gray-300 hover:text-white">${_('nav.forum')}</a>
                <a href="/${locale}/blog" class="text-gray-300 hover:text-white">${_('nav.blog')}</a>
                <a href="/${locale}/dashboard" class="text-gray-300 hover:text-white">${_('nav.dashboard')}</a>
                <a href="/${locale}/profile" class="text-white font-semibold">${_('dashboard.profile')}</a>
                <!-- Language Switcher -->
                <a 
                    href="/${otherLocale}/profile" 
                    class="px-4 py-2 rounded-xl glass hover:glass-strong transition-all font-semibold flex items-center gap-2"
                    title="${locale === 'en' ? 'Türkçeye geç' : 'Switch to English'}"
                >
                    <i class="fas fa-globe"></i>
                    <span class="hidden sm:inline">${otherLocale.toUpperCase()}</span>
                </a>
                <button onclick="logout()" class="px-6 py-2.5 glass rounded-xl hover:bg-white/10">${_('auth.logout')}</button>
            </div>
        </div>
    </nav>
    
    <div class="pt-28 px-6 pb-32">
        <div class="max-w-[1400px] mx-auto">
            <!-- Loading State -->
            <div id="loading" class="text-center py-20">
                <div class="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mb-4"></div>
                <p class="text-xl text-gray-400">${_('common.loading')}</p>
            </div>
            
            <!-- Profile Content -->
            <div id="profileContent" class="hidden">
                <!-- Header -->
                <div class="mb-12">
                    <h1 class="text-6xl font-black mb-4">${_('profile.edit')}</h1>
                    <p class="text-xl text-gray-400">${_('profile.edit_description') || 'Manage your profile information'}</p>
                </div>
                
                <!-- Profile Form -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Main Form -->
                    <div class="lg:col-span-2 space-y-6">
                        <div class="glass-strong rounded-3xl p-8">
                            <h2 class="text-2xl font-bold mb-6">${_('profile.personal_info') || 'Personal Information'}</h2>
                            
                            <form id="profileForm" class="space-y-6">
                                <div>
                                    <label class="block text-sm font-semibold mb-2">${_('auth.name')}</label>
                                    <input type="text" id="userName" required class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold mb-2">${_('auth.username')}</label>
                                    <input type="text" id="userUsername" readonly disabled class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl opacity-50 cursor-not-allowed">
                                    <p class="text-xs text-gray-500 mt-1">${_('profile.username_readonly') || 'Username cannot be changed'}</p>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold mb-2">${_('auth.email')}</label>
                                    <input type="email" id="userEmail" readonly disabled class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl opacity-50 cursor-not-allowed">
                                    <p class="text-xs text-gray-500 mt-1">${_('profile.email_readonly') || 'Email cannot be changed'}</p>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold mb-2">${_('profile.bio')}</label>
                                    <textarea id="userBio" rows="4" maxlength="500" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 resize-none" placeholder="${_('profile.bio_placeholder') || 'Tell us about yourself...'}"></textarea>
                                    <p class="text-xs text-gray-500 mt-1"><span id="bioCount">0</span>/500</p>
                                </div>
                                
                                <div id="formError" class="hidden bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400"></div>
                                <div id="formSuccess" class="hidden bg-green-500/10 border border-green-500/50 rounded-xl p-4 text-green-400"></div>
                                
                                <div class="flex items-center justify-end space-x-4">
                                    <a href="/${locale}/dashboard" class="px-6 py-3 rounded-xl font-semibold hover:bg-white/5">${_('common.cancel')}</a>
                                    <button type="submit" class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg">
                                        <span id="saveText">${_('common.save')}</span>
                                        <span id="saveLoading" class="hidden"><i class="fas fa-spinner fa-spin mr-2"></i>${_('common.loading')}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <!-- Sidebar -->
                    <div class="space-y-6">
                        <!-- Profile Stats -->
                        <div class="glass-strong rounded-3xl p-8">
                            <h2 class="text-2xl font-bold mb-6">${_('profile.stats') || 'Your Stats'}</h2>
                            <div class="space-y-4">
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-400">${_('dashboard.total_tracks')}</span>
                                    <span class="font-bold text-2xl" id="statTracks">0</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-400">${_('dashboard.total_plays')}</span>
                                    <span class="font-bold text-2xl" id="statPlays">0</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-400">${_('dashboard.followers')}</span>
                                    <span class="font-bold text-2xl" id="statFollowers">0</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-gray-400">${_('dashboard.total_likes')}</span>
                                    <span class="font-bold text-2xl" id="statLikes">0</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Account Info -->
                        <div class="glass-strong rounded-3xl p-8">
                            <h2 class="text-2xl font-bold mb-6">${_('profile.account') || 'Account'}</h2>
                            <div class="space-y-4">
                                <div>
                                    <p class="text-sm text-gray-400">${_('profile.role') || 'Role'}</p>
                                    <p class="font-semibold" id="userRole">-</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-400">${_('profile.joined')}</p>
                                    <p class="font-semibold" id="userJoined">-</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-400">${_('profile.status') || 'Status'}</p>
                                    <p class="font-semibold">
                                        <span id="emailVerified" class="hidden text-green-400">
                                            <i class="fas fa-check-circle mr-1"></i>${_('auth.email_verified')}
                                        </span>
                                        <span id="emailNotVerified" class="hidden text-yellow-400">
                                            <i class="fas fa-exclamation-circle mr-1"></i>${_('auth.email_not_verified')}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
    
    <script>
        const locale = '${locale}';
        const i18nAdmin = '${_('dashboard.admin')}';
        const i18nProfileSaved = '${_('profile.saved') || 'Profile updated successfully!'}';
        const i18nNetworkError = '${_('common.network_error')}';
        let currentUser = null;
        
        // Check authentication
        async function checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/${locale}/login?redirect=' + encodeURIComponent(window.location.pathname);
                return false;
            }
            
            try {
                const response = await fetch('/api/auth/me', {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    currentUser = data.data || data;
                    return true;
                } else {
                    localStorage.removeItem('token');
                    window.location.href = '/${locale}/login';
                    return false;
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                return false;
            }
        }
        
        // Load profile data
        async function loadProfile() {
            document.getElementById('loading').classList.remove('hidden');
            document.getElementById('profileContent').classList.add('hidden');
            
            try {
                const authenticated = await checkAuth();
                if (!authenticated) return;
                
                // Load stats
                await loadStats();
                
                // Populate form
                document.getElementById('userName').value = currentUser.name || '';
                document.getElementById('userUsername').value = currentUser.username || '';
                document.getElementById('userEmail').value = currentUser.email || '';
                document.getElementById('userBio').value = currentUser.bio || '';
                updateBioCount();
                
                // Populate sidebar
                let roleText = currentUser.is_producer ? '${_('dashboard.producer')}' : '${_('dashboard.listener')}';
                if (currentUser.role === 'admin') roleText = i18nAdmin;
                document.getElementById('userRole').textContent = roleText;
                
                const joinedDate = new Date(currentUser.created_at);
                document.getElementById('userJoined').textContent = joinedDate.toLocaleDateString();
                
                if (currentUser.email_verified) {
                    document.getElementById('emailVerified').classList.remove('hidden');
                } else {
                    document.getElementById('emailNotVerified').classList.remove('hidden');
                }
                
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('profileContent').classList.remove('hidden');
            } catch (error) {
                console.error('Failed to load profile:', error);
            }
        }
        
        // Load stats
        async function loadStats() {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('/api/users/me/stats', {
                    headers: { 'Authorization': \`Bearer \${token}\` }
                });
                const data = await response.json();
                
                if (data.success) {
                    document.getElementById('statTracks').textContent = data.data.tracks.toLocaleString();
                    document.getElementById('statPlays').textContent = data.data.plays.toLocaleString();
                    document.getElementById('statFollowers').textContent = data.data.followers.toLocaleString();
                    document.getElementById('statLikes').textContent = data.data.likes.toLocaleString();
                }
            } catch (error) {
                console.error('Failed to load stats:', error);
            }
        }
        
        // Update bio character count
        function updateBioCount() {
            const bio = document.getElementById('userBio').value;
            document.getElementById('bioCount').textContent = bio.length;
        }
        
        document.getElementById('userBio')?.addEventListener('input', updateBioCount);
        
        // Save profile
        document.getElementById('profileForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const saveBtn = e.target.querySelector('[type="submit"]');
            const saveText = document.getElementById('saveText');
            const saveLoading = document.getElementById('saveLoading');
            const errorDiv = document.getElementById('formError');
            const successDiv = document.getElementById('formSuccess');
            
            saveText.classList.add('hidden');
            saveLoading.classList.remove('hidden');
            saveBtn.disabled = true;
            errorDiv.classList.add('hidden');
            successDiv.classList.add('hidden');
            
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/users/me', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': \`Bearer \${token}\`
                    },
                    body: JSON.stringify({
                        name: document.getElementById('userName').value,
                        bio: document.getElementById('userBio').value
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    successDiv.textContent = i18nProfileSaved;
                    successDiv.classList.remove('hidden');
                    
                    // Reload after 1 second
                    setTimeout(() => {
                        loadProfile();
                    }, 1000);
                } else {
                    errorDiv.textContent = data.error || '${_('common.error')}';
                    errorDiv.classList.remove('hidden');
                }
            } catch (error) {
                errorDiv.textContent = i18nNetworkError;
                errorDiv.classList.remove('hidden');
            } finally {
                saveText.classList.remove('hidden');
                saveLoading.classList.add('hidden');
                saveBtn.disabled = false;
            }
        });
        
        function logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/${locale}/login';
        }
        
        // Initialize
        loadProfile();
    </script>
</body>
</html>`;
};
