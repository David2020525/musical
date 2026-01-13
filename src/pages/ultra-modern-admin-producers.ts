import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernAdminProducersHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Producer Applications - Admin - MusicHub</title>
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
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            backdrop-filter: blur(10px);
        }
        
        .modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
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
                        <a href="/en/admin" class="text-gray-400 hover:text-purple-400 transition-colors">
                            <i class="fas fa-th-large mr-2"></i>Dashboard
                        </a>
                        <a href="/en/admin/users" class="text-gray-400 hover:text-purple-400 transition-colors">
                            <i class="fas fa-users mr-2"></i>Users
                        </a>
                        <a href="/en/admin/producers" class="text-white hover:text-purple-400 transition-colors">
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
            <h2 class="text-3xl font-bold">Producer Applications</h2>
            <div class="flex gap-2">
                <button id="filterPending" class="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 text-sm font-medium">
                    Pending
                </button>
                <button id="filterApproved" class="px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm font-medium">
                    Approved
                </button>
                <button id="filterRejected" class="px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm font-medium">
                    Rejected
                </button>
                <button id="filterAll" class="px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm font-medium">
                    All
                </button>
            </div>
        </div>

        <!-- Loading State -->
        <div id="loading" class="text-center py-20">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            <p class="mt-4 text-gray-400">Loading applications...</p>
        </div>

        <!-- Applications List -->
        <div id="applications" class="hidden space-y-4">
            <!-- Applications loaded via JS -->
        </div>

        <!-- Empty State -->
        <div id="empty" class="hidden text-center py-20">
            <i class="fas fa-inbox text-6xl text-gray-600 mb-4"></i>
            <p class="text-xl text-gray-400">No applications found</p>
        </div>
    </div>

    <!-- Application Detail Modal -->
    <div id="detailModal" class="modal">
        <div class="glass-strong rounded-3xl p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-start mb-6">
                <h3 class="text-2xl font-bold">Application Details</h3>
                <button id="closeModal" class="text-gray-400 hover:text-white">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>

            <div id="modalContent">
                <!-- Content loaded dynamically -->
            </div>

            <div id="modalActions" class="flex gap-4 mt-8">
                <button id="approveBtn" class="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold hover:shadow-lg transition-all">
                    <i class="fas fa-check mr-2"></i>Approve Application
                </button>
                <button id="rejectBtn" class="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg transition-all">
                    <i class="fas fa-times mr-2"></i>Reject Application
                </button>
            </div>
        </div>
    </div>

    <script>
        const token = localStorage.getItem('token');
        let currentStatus = 'pending';
        let currentApplication = null;

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

        // Load applications
        async function loadApplications(status = 'pending') {
            currentStatus = status;
            
            // Update filter buttons
            ['Pending', 'Approved', 'Rejected', 'All'].forEach(s => {
                const btn = document.getElementById(\`filter\${s}\`);
                if (s.toLowerCase() === status) {
                    btn.className = 'px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 text-sm font-medium';
                } else {
                    btn.className = 'px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm font-medium';
                }
            });

            document.getElementById('loading').classList.remove('hidden');
            document.getElementById('applications').classList.add('hidden');
            document.getElementById('empty').classList.add('hidden');

            try {
                const res = await fetch(\`/api/admin/applications?status=\${status}\`, {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await res.json();

                document.getElementById('loading').classList.add('hidden');

                if (data.success && data.data.length > 0) {
                    renderApplications(data.data);
                    document.getElementById('applications').classList.remove('hidden');
                } else {
                    document.getElementById('empty').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Failed to load applications:', error);
                document.getElementById('loading').innerHTML = \`
                    <div class="text-center py-20">
                        <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                        <p class="text-gray-400">Failed to load applications</p>
                    </div>
                \`;
            }
        }

        // Render applications list
        function renderApplications(applications) {
            const statusColors = {
                pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', icon: 'fa-clock' },
                approved: { bg: 'bg-green-500/20', text: 'text-green-300', icon: 'fa-check-circle' },
                rejected: { bg: 'bg-red-500/20', text: 'text-red-300', icon: 'fa-times-circle' }
            };

            const html = applications.map(app => {
                const status = statusColors[app.status] || statusColors.pending;
                const date = new Date(app.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });

                return \`
                    <div class="glass-strong rounded-2xl p-6 hover:border-purple-500/50 transition-all cursor-pointer" onclick="showApplicationDetail(\${app.id})">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <div class="flex items-center gap-3 mb-2">
                                    <h3 class="text-xl font-bold">\${app.real_name}</h3>
                                    <span class="px-3 py-1 rounded-full text-xs font-medium \${status.bg} \${status.text}">
                                        <i class="fas \${status.icon} mr-1"></i>\${app.status}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-400 mb-3">
                                    <i class="fas fa-user mr-2"></i>\${app.user_name} (\${app.user_email})
                                </p>
                                <div class="flex gap-4 text-sm text-gray-400">
                                    <span><i class="fas fa-id-card mr-2"></i>ID: \${app.turkish_id}</span>
                                    <span><i class="fas fa-phone mr-2"></i>\${app.phone}</span>
                                    <span><i class="fas fa-calendar mr-2"></i>\${date}</span>
                                </div>
                            </div>
                            <button class="text-purple-400 hover:text-purple-300">
                                <i class="fas fa-chevron-right text-xl"></i>
                            </button>
                        </div>
                    </div>
                \`;
            }).join('');

            document.getElementById('applications').innerHTML = html;
        }

        // Show application detail modal
        window.showApplicationDetail = async function(appId) {
            try {
                const res = await fetch(\`/api/admin/applications?status=all\`, {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
                const data = await res.json();

                if (data.success) {
                    currentApplication = data.data.find(app => app.id === appId);
                    
                    if (!currentApplication) return;

                    const isPending = currentApplication.status === 'pending';
                    
                    const modalContent = \`
                        <div class="space-y-6">
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <label class="text-sm text-gray-400 mb-2 block">Real Name</label>
                                    <div class="text-lg font-medium">\${currentApplication.real_name}</div>
                                </div>
                                <div>
                                    <label class="text-sm text-gray-400 mb-2 block">Turkish ID</label>
                                    <div class="text-lg font-medium">\${currentApplication.turkish_id}</div>
                                </div>
                                <div>
                                    <label class="text-sm text-gray-400 mb-2 block">Phone</label>
                                    <div class="text-lg font-medium">\${currentApplication.phone}</div>
                                </div>
                                <div>
                                    <label class="text-sm text-gray-400 mb-2 block">User</label>
                                    <div class="text-lg font-medium">\${currentApplication.user_name}</div>
                                    <div class="text-sm text-gray-400">\${currentApplication.user_email}</div>
                                </div>
                            </div>

                            <div>
                                <label class="text-sm text-gray-400 mb-2 block">Social Links</label>
                                <div class="space-y-2">
                                    \${currentApplication.instagram_url ? \`<a href="\${currentApplication.instagram_url}" target="_blank" class="block text-purple-400 hover:text-purple-300"><i class="fab fa-instagram mr-2"></i>\${currentApplication.instagram_url}</a>\` : ''}
                                    \${currentApplication.twitter_url ? \`<a href="\${currentApplication.twitter_url}" target="_blank" class="block text-purple-400 hover:text-purple-300"><i class="fab fa-twitter mr-2"></i>\${currentApplication.twitter_url}</a>\` : ''}
                                    \${currentApplication.spotify_url ? \`<a href="\${currentApplication.spotify_url}" target="_blank" class="block text-purple-400 hover:text-purple-300"><i class="fab fa-spotify mr-2"></i>\${currentApplication.spotify_url}</a>\` : ''}
                                    \${currentApplication.soundcloud_url ? \`<a href="\${currentApplication.soundcloud_url}" target="_blank" class="block text-purple-400 hover:text-purple-300"><i class="fab fa-soundcloud mr-2"></i>\${currentApplication.soundcloud_url}</a>\` : ''}
                                </div>
                            </div>

                            \${currentApplication.portfolio_url ? \`
                                <div>
                                    <label class="text-sm text-gray-400 mb-2 block">Portfolio</label>
                                    <a href="\${currentApplication.portfolio_url}" target="_blank" class="block text-purple-400 hover:text-purple-300">
                                        <i class="fas fa-briefcase mr-2"></i>\${currentApplication.portfolio_url}
                                    </a>
                                </div>
                            \` : ''}

                            <div>
                                <label class="text-sm text-gray-400 mb-2 block">Sample Tracks</label>
                                <div class="space-y-2">
                                    \${currentApplication.sample_track_1 ? \`<a href="\${currentApplication.sample_track_1}" target="_blank" class="block text-purple-400 hover:text-purple-300"><i class="fas fa-music mr-2"></i>Sample 1</a>\` : ''}
                                    \${currentApplication.sample_track_2 ? \`<a href="\${currentApplication.sample_track_2}" target="_blank" class="block text-purple-400 hover:text-purple-300"><i class="fas fa-music mr-2"></i>Sample 2</a>\` : ''}
                                    \${currentApplication.sample_track_3 ? \`<a href="\${currentApplication.sample_track_3}" target="_blank" class="block text-purple-400 hover:text-purple-300"><i class="fas fa-music mr-2"></i>Sample 3</a>\` : ''}
                                </div>
                            </div>

                            \${currentApplication.admin_notes ? \`
                                <div class="p-4 rounded-xl bg-white/5">
                                    <label class="text-sm text-gray-400 mb-2 block">Admin Notes</label>
                                    <div class="text-sm">\${currentApplication.admin_notes}</div>
                                </div>
                            \` : ''}

                            <div id="notesSection" class="\${isPending ? '' : 'hidden'}">
                                <label class="text-sm text-gray-400 mb-2 block">Add Notes (Optional)</label>
                                <textarea id="adminNotes" rows="3" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none" placeholder="Add notes about this decision..."></textarea>
                            </div>
                        </div>
                    \`;

                    document.getElementById('modalContent').innerHTML = modalContent;
                    
                    // Show/hide action buttons based on status
                    const modalActions = document.getElementById('modalActions');
                    if (isPending) {
                        modalActions.classList.remove('hidden');
                    } else {
                        modalActions.classList.add('hidden');
                    }

                    document.getElementById('detailModal').classList.add('active');
                }
            } catch (error) {
                console.error('Failed to load application details:', error);
            }
        };

        // Approve application
        document.getElementById('approveBtn').addEventListener('click', async () => {
            if (!currentApplication) return;

            if (!confirm(\`Approve application for \${currentApplication.real_name}?\`)) {
                return;
            }

            const notes = document.getElementById('adminNotes')?.value || '';

            try {
                const res = await fetch(\`/api/admin/applications/\${currentApplication.id}/approve\`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ notes })
                });

                const data = await res.json();

                if (data.success) {
                    alert('Application approved successfully!');
                    document.getElementById('detailModal').classList.remove('active');
                    loadApplications(currentStatus);
                } else {
                    alert('Failed to approve application: ' + data.error);
                }
            } catch (error) {
                console.error('Approve error:', error);
                alert('Failed to approve application');
            }
        });

        // Reject application
        document.getElementById('rejectBtn').addEventListener('click', async () => {
            if (!currentApplication) return;

            if (!confirm(\`Reject application for \${currentApplication.real_name}?\`)) {
                return;
            }

            const notes = document.getElementById('adminNotes')?.value || '';

            try {
                const res = await fetch(\`/api/admin/applications/\${currentApplication.id}/reject\`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ notes })
                });

                const data = await res.json();

                if (data.success) {
                    alert('Application rejected');
                    document.getElementById('detailModal').classList.remove('active');
                    loadApplications(currentStatus);
                } else {
                    alert('Failed to reject application: ' + data.error);
                }
            } catch (error) {
                console.error('Reject error:', error);
                alert('Failed to reject application');
            }
        });

        // Close modal
        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('detailModal').classList.remove('active');
        });

        // Filter buttons
        document.getElementById('filterPending').addEventListener('click', () => loadApplications('pending'));
        document.getElementById('filterApproved').addEventListener('click', () => loadApplications('approved'));
        document.getElementById('filterRejected').addEventListener('click', () => loadApplications('rejected'));
        document.getElementById('filterAll').addEventListener('click', () => loadApplications('all'));

        // Initialize
        (async () => {
            const hasAccess = await checkAdminAccess();
            if (hasAccess) {
                await loadApplications('pending');
            }
        })();
    </script>

    <!-- Global Audio Player -->
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
</body>
</html>
`;
