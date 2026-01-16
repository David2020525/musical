import { Locale, t } from '../lib/i18n';
import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernAdminUsersHTML = (locale: Locale = 'en') => `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('admin.users', locale)} - ${t('admin.title', locale)} - MUSICAL</title>
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
        
        .role-badge {
            font-size: 0.75rem;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-weight: 600;
        }
        
        .role-admin { background: rgba(239, 68, 68, 0.2); color: rgb(248, 113, 113); }
        .role-producer { background: rgba(168, 85, 247, 0.2); color: rgb(196, 181, 253); }
        .role-user { background: rgba(59, 130, 246, 0.2); color: rgb(147, 197, 253); }
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
                        <a href="/en/admin" class="text-gray-400 hover:text-purple-400 transition-colors">
                            <i class="fas fa-th-large mr-2"></i>Dashboard
                        </a>
                        <a href="/en/admin/users" class="text-white hover:text-purple-400 transition-colors">
                            <i class="fas fa-users mr-2"></i>Users
                        </a>
                        <a href="/en/admin/producers" class="text-gray-400 hover:text-purple-400 transition-colors">
                            <i class="fas fa-user-music mr-2"></i>Producer Applications
                        </a>
                        <a href="/en/admin/content" class="text-gray-400 hover:text-purple-400 transition-colors">
                            <i class="fas fa-layer-group mr-2"></i>Content
                        </a>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-sm text-gray-400" id="admin-name">Admin</span>
                    <a href="/en" class="text-sm text-gray-400 hover:text-white transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i>Back to Site
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold">Users Management</h2>
            <div class="flex gap-3">
                <select id="roleFilter" class="px-4 py-2 rounded-lg glass-strong text-sm">
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="producer">Producer</option>
                    <option value="user">User</option>
                </select>
                <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="Search users..." 
                    class="px-4 py-2 rounded-lg glass-strong text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
        </div>

        <!-- Loading State -->
        <div id="loading" class="text-center py-20">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            <p class="mt-4 text-gray-400">Loading users...</p>
        </div>

        <!-- Users Table -->
        <div id="usersTable" class="hidden glass-strong rounded-2xl overflow-hidden">
            <table class="w-full">
                <thead class="bg-white/5">
                    <tr>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                        <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Joined</th>
                        <th class="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody id="usersBody" class="divide-y divide-white/10">
                    <!-- Users loaded via JS -->
                </tbody>
            </table>
        </div>

        <!-- Empty State -->
        <div id="empty" class="hidden text-center py-20">
            <i class="fas fa-users-slash text-6xl text-gray-600 mb-4"></i>
            <p class="text-xl text-gray-400">No users found</p>
        </div>

        <!-- Pagination -->
        <div id="pagination" class="hidden mt-6 flex items-center justify-between">
            <div class="text-sm text-gray-400">
                Showing <span id="showingFrom">1</span> to <span id="showingTo">50</span> of <span id="totalUsers">0</span> users
            </div>
            <div class="flex gap-2">
                <button id="prevPage" class="px-4 py-2 rounded-lg glass-strong hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <span id="currentPage" class="px-4 py-2">Page 1</span>
                <button id="nextPage" class="px-4 py-2 rounded-lg glass-strong hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </div>

    <script>
        const token = localStorage.getItem('token');
        let currentPage = 1;
        let currentRole = '';
        let currentSearch = '';
        let totalUsers = 0;

        if (!token) {
            window.location.href = '/en/login';
        }

        // Check admin access
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

        // Load users
        async function loadUsers() {
            document.getElementById('loading').classList.remove('hidden');
            document.getElementById('usersTable').classList.add('hidden');
            document.getElementById('empty').classList.add('hidden');

            try {
                const params = new URLSearchParams({
                    page: currentPage.toString()
                });

                const res = await fetch(\`/api/admin/users?\${params}\`, {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await res.json();

                document.getElementById('loading').classList.add('hidden');

                if (data.success && data.data.users.length > 0) {
                    renderUsers(data.data.users);
                    updatePagination(data.data.pagination);
                    document.getElementById('usersTable').classList.remove('hidden');
                    document.getElementById('pagination').classList.remove('hidden');
                } else {
                    document.getElementById('empty').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Failed to load users:', error);
                document.getElementById('loading').innerHTML = \`
                    <div class="text-center py-20">
                        <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                        <p class="text-gray-400">Failed to load users</p>
                    </div>
                \`;
            }
        }

        // Render users
        function renderUsers(users) {
            const filteredUsers = users.filter(user => {
                const matchesRole = !currentRole || user.role === currentRole;
                const matchesSearch = !currentSearch || 
                    user.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                    user.email.toLowerCase().includes(currentSearch.toLowerCase()) ||
                    user.username.toLowerCase().includes(currentSearch.toLowerCase());
                return matchesRole && matchesSearch;
            });

            if (filteredUsers.length === 0) {
                document.getElementById('usersTable').classList.add('hidden');
                document.getElementById('empty').classList.remove('hidden');
                return;
            }

            const html = filteredUsers.map(user => {
                const date = new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });

                const roleClass = \`role-\${user.role || 'user'}\`;
                const roleName = user.role || 'user';

                return \`
                    <tr class="hover:bg-white/5 transition-colors">
                        <td class="px-6 py-4">
                            <div>
                                <div class="font-semibold">\${user.name}</div>
                                <div class="text-sm text-gray-400">@\${user.username}</div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <span class="text-sm text-gray-300">\${user.email}</span>
                        </td>
                        <td class="px-6 py-4">
                            <span class="role-badge \${roleClass}">\${roleName.toUpperCase()}</span>
                        </td>
                        <td class="px-6 py-4">
                            <span class="text-sm text-gray-400">\${date}</span>
                        </td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <select 
                                    class="px-3 py-1 rounded-lg bg-white/5 text-xs border border-white/10 focus:outline-none focus:border-purple-500"
                                    onchange="updateUserRole(\${user.id}, this.value)"
                                >
                                    <option value="user" \${user.role === 'user' ? 'selected' : ''}>User</option>
                                    <option value="producer" \${user.role === 'producer' ? 'selected' : ''}>Producer</option>
                                    <option value="moderator" \${user.role === 'moderator' ? 'selected' : ''}>Moderator</option>
                                    <option value="admin" \${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                                </select>
                                <button 
                                    onclick="deleteUser(\${user.id}, '\${user.name}')"
                                    class="px-3 py-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 text-xs"
                                >
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                \`;
            }).join('');

            document.getElementById('usersBody').innerHTML = html;
        }

        // Update pagination
        function updatePagination(pagination) {
            totalUsers = pagination.total;
            document.getElementById('showingFrom').textContent = ((pagination.page - 1) * pagination.limit + 1);
            document.getElementById('showingTo').textContent = Math.min(pagination.page * pagination.limit, pagination.total);
            document.getElementById('totalUsers').textContent = pagination.total;
            document.getElementById('currentPage').textContent = \`Page \${pagination.page}\`;
            
            document.getElementById('prevPage').disabled = pagination.page === 1;
            document.getElementById('nextPage').disabled = pagination.page >= pagination.totalPages;
        }

        // Update user role
        window.updateUserRole = async function(userId, newRole) {
            if (!confirm(\`Change user role to \${newRole}?\`)) {
                loadUsers(); // Reset dropdown
                return;
            }

            try {
                const res = await fetch(\`/api/admin/users/\${userId}/role\`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ role: newRole })
                });

                const data = await res.json();

                if (data.success) {
                    alert('User role updated successfully');
                    loadUsers();
                } else {
                    alert('Failed to update role: ' + data.error);
                    loadUsers();
                }
            } catch (error) {
                console.error('Update role error:', error);
                alert('Failed to update role');
                loadUsers();
            }
        };

        // Delete user
        window.deleteUser = async function(userId, userName) {
            if (!confirm(\`Are you sure you want to delete user "\${userName}"? This action cannot be undone.\`)) {
                return;
            }

            try {
                const res = await fetch(\`/api/admin/users/\${userId}\`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                const data = await res.json();

                if (data.success) {
                    alert('User deleted successfully');
                    loadUsers();
                } else {
                    alert('Failed to delete user: ' + data.error);
                }
            } catch (error) {
                console.error('Delete user error:', error);
                alert('Failed to delete user');
            }
        };

        // Search and filter
        document.getElementById('searchInput').addEventListener('input', (e) => {
            currentSearch = e.target.value;
            loadUsers();
        });

        document.getElementById('roleFilter').addEventListener('change', (e) => {
            currentRole = e.target.value;
            loadUsers();
        });

        // Pagination
        document.getElementById('prevPage').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadUsers();
            }
        });

        document.getElementById('nextPage').addEventListener('click', () => {
            currentPage++;
            loadUsers();
        });

        // Initialize
        (async () => {
            const hasAccess = await checkAdminAccess();
            if (hasAccess) {
                await loadUsers();
            }
        })();
    </script>

    <!-- Global Audio Player -->
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
</body>
</html>
`;
