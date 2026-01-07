export const producerApplyHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Producer Application - MusicHub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="/en" class="text-xl font-bold text-indigo-600">
                        🎵 MusicHub
                    </a>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/en" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">Home</a>
                    <a href="/en/login" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">Login</a>
                </div>
            </div>
        </div>
    </nav>

    <div id="app" class="container mx-auto px-4 py-8 max-w-3xl">
        <div id="loading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p class="mt-4 text-gray-600">Loading...</p>
        </div>
        <div id="content" class="hidden"></div>
    </div>

    <script>
        const token = localStorage.getItem('token');
        
        if (!token) {
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('content').classList.remove('hidden');
            document.getElementById('content').innerHTML = \`
                <div class="bg-white rounded-lg shadow-md p-8 text-center">
                    <div class="text-6xl mb-4">🔒</div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
                    <p class="text-gray-600 mb-6">You need to log in to apply as a producer.</p>
                    <a href="/en/login" class="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
                        Go to Login
                    </a>
                </div>
            \`;
        } else {
            fetch('/api/producer/application', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(res => res.json())
            .then(data => {
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('content').classList.remove('hidden');
                
                if (data.data) {
                    const app = data.data;
                    const statusColors = {
                        pending: { badge: 'bg-yellow-100 text-yellow-800' },
                        approved: { badge: 'bg-green-100 text-green-800' },
                        rejected: { badge: 'bg-red-100 text-red-800' }
                    };
                    const colors = statusColors[app.status];
                    
                    document.getElementById('content').innerHTML = \`
                        <div class="bg-white rounded-lg shadow-md p-8">
                            <div class="flex justify-between items-center mb-6">
                                <h2 class="text-2xl font-bold text-gray-900">Application Status</h2>
                                <span class="px-3 py-1 rounded-full text-sm font-medium \${colors.badge}">
                                    \${app.status.toUpperCase()}
                                </span>
                            </div>
                            
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <p class="text-blue-900">
                                    \${app.status === 'pending' ? '⏳ Your application is under review.' :
                                      app.status === 'approved' ? '✅ Your application has been approved!' :
                                      '❌ Your application was not approved.'}
                                </p>
                            </div>
                            
                            <div class="space-y-4">
                                <div>
                                    <h3 class="font-semibold text-gray-900 mb-3">Application Details</h3>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p class="text-sm text-gray-500">Real Name</p>
                                            <p class="font-medium">\${app.real_name}</p>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-500">Phone</p>
                                            <p class="font-medium">\${app.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                \${app.admin_notes ? \`
                                    <div class="border-t pt-4">
                                        <p class="text-sm font-medium text-gray-700 mb-2">Admin Notes:</p>
                                        <p class="text-gray-600">\${app.admin_notes}</p>
                                    </div>
                                \` : ''}
                            </div>
                            
                            <div class="mt-8 flex gap-3">
                                <a href="/en" class="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
                                    Back to Home
                                </a>
                            </div>
                        </div>
                    \`;
                } else {
                    showApplicationForm();
                }
            })
            .catch(err => {
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('content').classList.remove('hidden');
                document.getElementById('content').innerHTML = \`
                    <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 class="text-red-900 font-semibold mb-2">Error</h3>
                        <p class="text-red-700">Failed to load. Please try again.</p>
                    </div>
                \`;
            });
        }
        
        function showApplicationForm() {
            let step = 1;
            let formData = {};
            
            document.getElementById('content').innerHTML = \`
                <div class="bg-white rounded-lg shadow-md p-8">
                    <div class="mb-8">
                        <div class="flex justify-between items-center">
                            <div class="text-center">
                                <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto font-bold">1</div>
                                <p class="text-xs mt-1">Personal</p>
                            </div>
                            <div class="flex-1 h-1 bg-gray-300 mx-2"></div>
                            <div class="text-center">
                                <div id="step2" class="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center mx-auto font-bold">2</div>
                                <p class="text-xs mt-1">Social</p>
                            </div>
                            <div class="flex-1 h-1 bg-gray-300 mx-2"></div>
                            <div class="text-center">
                                <div id="step3" class="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center mx-auto font-bold">3</div>
                                <p class="text-xs mt-1">Portfolio</p>
                            </div>
                        </div>
                    </div>
                    <div id="form"></div>
                    <div id="error" class="hidden mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"></div>
                </div>
            \`;
            
            renderStep1();
            
            function renderStep1() {
                document.getElementById('form').innerHTML = \`
                    <h3 class="text-xl font-bold mb-6">Personal Information</h3>
                    <form id="s1" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Real Name *</label>
                            <input type="text" id="real_name" class="w-full px-4 py-2 border rounded-lg" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Turkish ID *</label>
                            <input type="text" id="turkish_id" maxlength="11" class="w-full px-4 py-2 border rounded-lg" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                            <input type="tel" id="phone" class="w-full px-4 py-2 border rounded-lg" required>
                        </div>
                        <div class="flex justify-end pt-4">
                            <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Next →</button>
                        </div>
                    </form>
                \`;
                
                document.getElementById('s1').onsubmit = e => {
                    e.preventDefault();
                    formData.real_name = document.getElementById('real_name').value;
                    formData.turkish_id = document.getElementById('turkish_id').value;
                    formData.phone = document.getElementById('phone').value;
                    document.getElementById('step2').className = 'w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto font-bold';
                    step = 2;
                    renderStep2();
                };
            }
            
            function renderStep2() {
                document.getElementById('form').innerHTML = \`
                    <h3 class="text-xl font-bold mb-6">Social Links (Optional)</h3>
                    <form id="s2" class="space-y-4">
                        <input type="url" id="instagram" class="w-full px-4 py-2 border rounded-lg" placeholder="Instagram URL">
                        <input type="url" id="twitter" class="w-full px-4 py-2 border rounded-lg" placeholder="Twitter URL">
                        <input type="url" id="spotify" class="w-full px-4 py-2 border rounded-lg" placeholder="Spotify URL">
                        <div class="flex justify-between pt-4">
                            <button type="button" onclick="location.reload()" class="px-6 py-3 bg-gray-200 rounded-lg">← Back</button>
                            <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Next →</button>
                        </div>
                    </form>
                \`;
                
                document.getElementById('s2').onsubmit = e => {
                    e.preventDefault();
                    formData.instagram_url = document.getElementById('instagram').value;
                    formData.twitter_url = document.getElementById('twitter').value;
                    formData.spotify_url = document.getElementById('spotify').value;
                    document.getElementById('step3').className = 'w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto font-bold';
                    step = 3;
                    renderStep3();
                };
            }
            
            function renderStep3() {
                document.getElementById('form').innerHTML = \`
                    <h3 class="text-xl font-bold mb-6">Portfolio (Optional)</h3>
                    <form id="s3" class="space-y-4">
                        <input type="url" id="portfolio" class="w-full px-4 py-2 border rounded-lg" placeholder="Portfolio URL">
                        <input type="url" id="sample1" class="w-full px-4 py-2 border rounded-lg" placeholder="Sample Track 1 URL">
                        <input type="url" id="sample2" class="w-full px-4 py-2 border rounded-lg" placeholder="Sample Track 2 URL">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p class="text-sm text-blue-700">Your application will be reviewed within 2-3 business days.</p>
                        </div>
                        <div class="flex justify-between pt-4">
                            <button type="button" onclick="location.reload()" class="px-6 py-3 bg-gray-200 rounded-lg">← Back</button>
                            <button type="submit" id="submit" class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Submit</button>
                        </div>
                    </form>
                \`;
                
                document.getElementById('s3').onsubmit = e => {
                    e.preventDefault();
                    formData.portfolio_url = document.getElementById('portfolio').value;
                    formData.sample_track_1 = document.getElementById('sample1').value;
                    formData.sample_track_2 = document.getElementById('sample2').value;
                    
                    const btn = document.getElementById('submit');
                    btn.disabled = true;
                    btn.textContent = 'Submitting...';
                    
                    fetch('/api/producer/application', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify(formData)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            location.reload();
                        } else {
                            document.getElementById('error').textContent = data.error || 'Failed to submit';
                            document.getElementById('error').classList.remove('hidden');
                            btn.disabled = false;
                            btn.textContent = 'Submit';
                        }
                    })
                    .catch(err => {
                        document.getElementById('error').textContent = 'Failed to submit. Please try again.';
                        document.getElementById('error').classList.remove('hidden');
                        btn.disabled = false;
                        btn.textContent = 'Submit';
                    });
                };
            }
        }
    </script>
</body>
</html>
`;
