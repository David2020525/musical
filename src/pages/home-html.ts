export const homeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MusicHub - Discover & Share Music</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="/en" class="text-xl font-bold text-indigo-600">🎵 MusicHub</a>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/en" class="px-4 py-2 text-sm font-medium text-gray-900">Home</a>
                    <a href="/en/producer/apply" class="px-4 py-2 text-sm font-medium text-gray-700">Become Producer</a>
                    <span id="authButtons">
                        <a href="/en/login" class="px-4 py-2 text-sm font-medium text-gray-700">Login</a>
                        <a href="/en/register" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded">Register</a>
                    </span>
                </div>
            </div>
        </div>
    </nav>

    <main class="py-12">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center mb-12">
                <h1 class="text-5xl font-bold text-gray-900 mb-4">Welcome to MusicHub</h1>
                <p class="text-xl text-gray-600">Discover, share, and discuss your favorite music</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="text-4xl mb-4">🎵</div>
                    <h3 class="text-xl font-semibold mb-2">Browse Music</h3>
                    <p class="text-gray-600">Explore thousands of tracks from independent artists worldwide</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="text-4xl mb-4">🎤</div>
                    <h3 class="text-xl font-semibold mb-2">Become a Producer</h3>
                    <p class="text-gray-600">Upload and monetize your own music as a verified producer</p>
                    <a href="/en/producer/apply" class="inline-block mt-4 text-indigo-600 hover:text-indigo-800">Apply Now →</a>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="text-4xl mb-4">💬</div>
                    <h3 class="text-xl font-semibold mb-2">Join Community</h3>
                    <p class="text-gray-600">Connect with other music lovers in our forum</p>
                </div>
            </div>

            <div id="userInfo" class="hidden bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <h3 class="text-xl font-semibold mb-2">Welcome back!</h3>
                <p id="userName" class="text-gray-700 mb-4"></p>
                <button onclick="logout()" class="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700">Logout</button>
            </div>

            <div class="bg-white rounded-lg shadow-md p-8 mt-12">
                <h2 class="text-2xl font-bold mb-6">Latest Tracks</h2>
                <div id="tracks" class="space-y-4">
                    <p class="text-gray-500">Loading tracks...</p>
                </div>
            </div>
        </div>
    </main>

    <footer class="bg-white border-t mt-20">
        <div class="max-w-7xl mx-auto py-12 px-4 text-center">
            <p class="text-gray-500">© 2024 MusicHub. All rights reserved.</p>
        </div>
    </footer>

    <script>
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        
        if (token && user) {
            document.getElementById('authButtons').innerHTML = \`
                <span class="px-4 py-2 text-sm font-medium text-gray-700">Hi, \${user.name}!</span>
                <button onclick="logout()" class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700">Logout</button>
            \`;
            
            document.getElementById('userInfo').classList.remove('hidden');
            document.getElementById('userName').textContent = \`Logged in as \${user.email}\`;
        }
        
        function logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.reload();
        }
        
        // Load tracks
        fetch('/api/tracks')
            .then(res => res.json())
            .then(data => {
                const tracksDiv = document.getElementById('tracks');
                if (data.success && data.data && data.data.length > 0) {
                    tracksDiv.innerHTML = data.data.slice(0, 5).map(track => \`
                        <div class="flex items-center justify-between p-4 border rounded hover:bg-gray-50">
                            <div>
                                <h4 class="font-semibold">\${track.title}</h4>
                                <p class="text-sm text-gray-600">\${track.artist}</p>
                            </div>
                            <div class="text-sm text-gray-500">
                                <span>▶️ \${track.plays_count || 0}</span>
                                <span class="ml-4">❤️ \${track.likes_count || 0}</span>
                            </div>
                        </div>
                    \`).join('');
                } else {
                    tracksDiv.innerHTML = '<p class="text-gray-500">No tracks available</p>';
                }
            })
            .catch(err => {
                document.getElementById('tracks').innerHTML = '<p class="text-red-500">Failed to load tracks</p>';
            });
    </script>
</body>
</html>`;
