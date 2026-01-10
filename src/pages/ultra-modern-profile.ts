import { Locale, t } from '../lib/i18n';
import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernProfileHTML = (locale: Locale = 'en') => `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('profile.edit', locale)} - MusicHub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        * { font-family: 'Inter', sans-serif; }
        body { background: #000; color: #fff; }
        .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.08); }
        .glass-strong { background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(40px); border: 1px solid rgba(255, 255, 255, 0.12); }
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
                <a href="/${locale}" class="text-gray-300 hover:text-white">${t('nav.home', locale)}</a>
                <a href="/${locale}/browse" class="text-gray-300 hover:text-white">${t('nav.browse', locale)}</a>
                <a href="/${locale}/dashboard" class="text-gray-300 hover:text-white">${t('nav.dashboard', locale)}</a>
                <a href="/${locale}/profile" class="text-white font-semibold">${t('dashboard.profile', locale)}</a>
            </div>
        </div>
    </nav>
    
    <div id="loading" class="pt-32 text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p class="mt-4 text-gray-400">${locale === 'tr' ? 'Yükleniyor...' : 'Loading...'}</p>
    </div>
    
    <div id="not-logged-in" class="hidden pt-32 px-6">
        <div class="max-w-md mx-auto glass-strong rounded-3xl p-8 text-center">
            <div class="text-6xl mb-4">🔒</div>
            <h2 class="text-2xl font-bold mb-4">${locale === 'tr' ? 'Giriş Gerekli' : 'Login Required'}</h2>
            <p class="text-gray-400 mb-6">${locale === 'tr' ? 'Profilinizi görüntülemek için giriş yapın.' : 'Please login to view your profile.'}</p>
            <a href="/${locale}/login" class="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold">${t('auth.login', locale)}</a>
        </div>
    </div>
    
    <div id="profile-content" class="hidden pt-20">
        <div class="relative h-80 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-filter-3xl"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        
        <div class="px-6 -mt-32 relative z-10">
            <div class="max-w-[1400px] mx-auto">
                <div class="flex flex-col md:flex-row items-start md:items-end space-y-6 md:space-y-0 md:space-x-8 mb-12">
                    <div id="avatar" class="w-40 h-40 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-6xl font-black border-4 border-black shadow-2xl"></div>
                    
                    <div class="flex-1">
                        <h1 id="user-name" class="text-5xl font-black mb-2"></h1>
                        <p id="user-email" class="text-xl text-gray-400 mb-4"></p>
                        <p id="user-bio" class="text-gray-300 max-w-2xl mb-6"></p>
                        
                        <div class="flex items-center space-x-6 text-sm">
                            <div>
                                <span id="track-count" class="font-bold text-2xl">0</span>
                                <span class="text-gray-400 ml-2">${locale === 'tr' ? 'Parça' : 'Tracks'}</span>
                            </div>
                            <div>
                                <span id="follower-count" class="font-bold text-2xl">0</span>
                                <span class="text-gray-400 ml-2">${locale === 'tr' ? 'Takipçi' : 'Followers'}</span>
                            </div>
                            <div>
                                <span id="following-count" class="font-bold text-2xl">0</span>
                                <span class="text-gray-400 ml-2">${locale === 'tr' ? 'Takip' : 'Following'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div id="view-mode-buttons" class="flex items-center space-x-4">
                        <button onclick="enableEdit()" class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold">
                            <i class="fas fa-edit mr-2"></i>${locale === 'tr' ? 'Düzenle' : 'Edit Profile'}
                        </button>
                    </div>
                    
                    <div id="edit-mode-buttons" class="hidden items-center space-x-4">
                        <button onclick="saveProfile()" class="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl font-bold">
                            <i class="fas fa-save mr-2"></i>${locale === 'tr' ? 'Kaydet' : 'Save'}
                        </button>
                        <button onclick="cancelEdit()" class="px-8 py-4 glass-strong rounded-2xl">
                            ${locale === 'tr' ? 'İptal' : 'Cancel'}
                        </button>
                    </div>
                </div>
                
                <div id="edit-form" class="hidden glass-strong rounded-3xl p-8 mb-8 max-w-2xl">
                    <h3 class="text-2xl font-bold mb-6">${locale === 'tr' ? 'Profili Düzenle' : 'Edit Profile'}</h3>
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-semibold text-purple-300 mb-2">${locale === 'tr' ? 'Ad Soyad' : 'Full Name'}</label>
                            <input type="text" id="edit-name" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-purple-300 mb-2">${locale === 'tr' ? 'Biyografi' : 'Bio'}</label>
                            <textarea id="edit-bio" rows="4" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"></textarea>
                        </div>
                    </div>
                </div>
                
                <div class="glass-strong rounded-3xl p-8">
                    <h3 class="text-2xl font-bold mb-6">${locale === 'tr' ? 'Son Aktivite' : 'Recent Activity'}</h3>
                    <div id="activity" class="space-y-4">
                        <p class="text-gray-400">${locale === 'tr' ? 'Henüz aktivite yok' : 'No recent activity'}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        const locale = '${locale}';
        let userData = null;
        
        async function loadProfile() {
            const token = localStorage.getItem('token');
            if (!token) {
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('not-logged-in').classList.remove('hidden');
                return;
            }
            
            try {
                const res = await fetch('/api/auth/me', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                
                const data = await res.json();
                if (!data.success) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    document.getElementById('loading').classList.add('hidden');
                    document.getElementById('not-logged-in').classList.remove('hidden');
                    return;
                }
                
                userData = data.data;
                displayProfile(userData);
                loadStats();
                
            } catch (error) {
                console.error('Failed to load profile:', error);
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('not-logged-in').classList.remove('hidden');
            }
        }
        
        function displayProfile(user) {
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('profile-content').classList.remove('hidden');
            
            const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
            document.getElementById('avatar').textContent = initials;
            document.getElementById('user-name').textContent = user.name;
            document.getElementById('user-email').textContent = user.email;
            document.getElementById('user-bio').textContent = user.bio || (locale === 'tr' ? 'Henüz biyografi eklenmedi' : 'No bio yet');
        }
        
        async function loadStats() {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('/api/tracks', {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await res.json();
                
                if (data.success) {
                    const userTracks = data.data.filter(t => t.user_id === userData.id);
                    document.getElementById('track-count').textContent = userTracks.length;
                    
                    const totalPlays = userTracks.reduce((sum, t) => sum + (t.plays_count || 0), 0);
                }
            } catch (error) {
                console.error('Failed to load stats:', error);
            }
        }
        
        function enableEdit() {
            document.getElementById('edit-form').classList.remove('hidden');
            document.getElementById('view-mode-buttons').classList.add('hidden');
            document.getElementById('edit-mode-buttons').classList.remove('hidden');
            document.getElementById('edit-mode-buttons').classList.add('flex');
            
            document.getElementById('edit-name').value = userData.name;
            document.getElementById('edit-bio').value = userData.bio || '';
        }
        
        function cancelEdit() {
            document.getElementById('edit-form').classList.add('hidden');
            document.getElementById('view-mode-buttons').classList.remove('hidden');
            document.getElementById('edit-mode-buttons').classList.add('hidden');
            document.getElementById('edit-mode-buttons').classList.remove('flex');
        }
        
        async function saveProfile() {
            const name = document.getElementById('edit-name').value;
            const bio = document.getElementById('edit-bio').value;
            const token = localStorage.getItem('token');
            
            try {
                const res = await fetch('/api/users/me', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ name, bio })
                });
                
                const data = await res.json();
                if (data.success) {
                    userData = data.data;
                    displayProfile(userData);
                    cancelEdit();
                    alert(locale === 'tr' ? 'Profil güncellendi!' : 'Profile updated!');
                } else {
                    alert(locale === 'tr' ? 'Güncelleme başarısız' : 'Update failed');
                }
            } catch (error) {
                console.error('Failed to save:', error);
                alert(locale === 'tr' ? 'Kaydetme hatası' : 'Save error');
            }
        }
        
        loadProfile();
    </script>
    
    <!-- Global Audio Player -->
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
</body>
</html>
`;
