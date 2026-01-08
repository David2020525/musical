export const modernTrackDetailHTML = (trackId: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Track Details - MusicHub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .waveform-bar {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .waveform-bar:hover {
            background: linear-gradient(to top, #ec4899, #a855f7);
        }
        .progress-bar {
            transition: width 0.1s linear;
        }
    </style>
</head>
<body class="bg-gray-900 text-white">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center space-x-8">
                    <a href="/en" class="flex items-center space-x-2">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                            <i class="fas fa-music text-white text-xl"></i>
                        </div>
                        <span class="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">MusicHub</span>
                    </a>
                </div>
                <div class="flex items-center space-x-6">
                    <a href="/en" class="text-gray-300 hover:text-white transition">Home</a>
                    <a href="/en/browse" class="text-gray-300 hover:text-white transition">Browse</a>
                    <div id="authButtons">
                        <a href="/en/login" class="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">Login</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <div class="pt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Loading State -->
            <div id="loadingState" class="text-center py-20">
                <div class="animate-spin inline-block w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"></div>
                <p class="mt-4 text-gray-400">Loading track...</p>
            </div>

            <!-- Track Content -->
            <div id="trackContent" class="hidden">
                <!-- Back Button -->
                <button onclick="history.back()" class="mb-6 text-gray-400 hover:text-white transition">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Browse
                </button>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Main Content -->
                    <div class="lg:col-span-2">
                        <!-- Track Header -->
                        <div class="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-8 mb-8">
                            <div class="flex items-start space-x-6">
                                <!-- Cover Art -->
                                <div class="w-48 h-48 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2xl">
                                    <i class="fas fa-music text-white text-6xl opacity-50"></i>
                                </div>
                                
                                <!-- Track Info -->
                                <div class="flex-1">
                                    <div class="text-sm text-purple-300 mb-2" id="trackGenre">Loading...</div>
                                    <h1 class="text-4xl font-bold mb-3" id="trackTitle">Loading...</h1>
                                    <p class="text-xl text-gray-300 mb-4" id="trackArtist">Loading...</p>
                                    
                                    <!-- Stats -->
                                    <div class="flex items-center space-x-6 text-sm text-gray-400 mb-6">
                                        <span><i class="fas fa-play mr-2"></i><span id="trackPlays">0</span> plays</span>
                                        <span><i class="fas fa-heart mr-2"></i><span id="trackLikes">0</span> likes</span>
                                        <span><i class="fas fa-clock mr-2"></i><span id="trackDuration">0:00</span></span>
                                    </div>

                                    <!-- Action Buttons -->
                                    <div class="flex items-center space-x-3">
                                        <button id="playButton" class="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition flex items-center space-x-2">
                                            <i class="fas fa-play"></i>
                                            <span>Play</span>
                                        </button>
                                        <button id="likeButton" class="px-6 py-3 bg-gray-800 rounded-full hover:bg-gray-700 transition">
                                            <i class="far fa-heart"></i>
                                        </button>
                                        <button class="px-6 py-3 bg-gray-800 rounded-full hover:bg-gray-700 transition">
                                            <i class="fas fa-share-alt"></i>
                                        </button>
                                        <button class="px-6 py-3 bg-gray-800 rounded-full hover:bg-gray-700 transition">
                                            <i class="fas fa-download"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Audio Player -->
                        <div class="bg-gray-800 rounded-2xl p-6 mb-8">
                            <audio id="audioPlayer" class="hidden"></audio>
                            
                            <!-- Waveform -->
                            <div class="mb-4">
                                <div id="waveform" class="flex items-end space-x-1 h-24 bg-gray-900 rounded-lg p-2">
                                    <!-- Will be populated by JS -->
                                </div>
                                <div class="flex items-center justify-between mt-2 text-sm text-gray-400">
                                    <span id="currentTime">0:00</span>
                                    <span id="totalTime">0:00</span>
                                </div>
                            </div>

                            <!-- Player Controls -->
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-4">
                                    <button id="playPauseBtn" class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition">
                                        <i class="fas fa-play text-white ml-1"></i>
                                    </button>
                                    <button class="text-gray-400 hover:text-white transition">
                                        <i class="fas fa-step-forward"></i>
                                    </button>
                                </div>
                                
                                <div class="flex items-center space-x-3">
                                    <i class="fas fa-volume-up text-gray-400"></i>
                                    <input type="range" id="volumeSlider" min="0" max="100" value="80" 
                                        class="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer">
                                </div>
                            </div>
                        </div>

                        <!-- Track Description -->
                        <div class="bg-gray-800 rounded-2xl p-6 mb-8">
                            <h2 class="text-xl font-bold mb-4">About This Track</h2>
                            <p class="text-gray-300 leading-relaxed" id="trackDescription">Loading...</p>
                        </div>

                        <!-- Comments Section -->
                        <div class="bg-gray-800 rounded-2xl p-6">
                            <h2 class="text-xl font-bold mb-6">Comments</h2>
                            
                            <!-- Comment Form -->
                            <div class="mb-6">
                                <textarea id="commentInput" rows="3" placeholder="Add a comment..." 
                                    class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                                <button class="mt-3 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                                    Post Comment
                                </button>
                            </div>

                            <!-- Comments List -->
                            <div class="space-y-4">
                                <div class="text-gray-400 text-center py-8">
                                    No comments yet. Be the first to comment!
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <div class="lg:col-span-1">
                        <!-- Producer Info -->
                        <div class="bg-gray-800 rounded-2xl p-6 mb-6">
                            <h3 class="font-semibold mb-4">Producer</h3>
                            <div class="flex items-center space-x-3 mb-4">
                                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg font-bold">
                                    A
                                </div>
                                <div>
                                    <div class="font-semibold" id="producerName">Artist Name</div>
                                    <div class="text-sm text-gray-400">Producer</div>
                                </div>
                            </div>
                            <button class="w-full px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                                <i class="fas fa-user-plus mr-2"></i>Follow
                            </button>
                        </div>

                        <!-- Track Info -->
                        <div class="bg-gray-800 rounded-2xl p-6 mb-6">
                            <h3 class="font-semibold mb-4">Track Info</h3>
                            <div class="space-y-3 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-gray-400">Release Year</span>
                                    <span id="releaseYear">-</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-400">Genre</span>
                                    <span id="genreInfo">-</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-400">Duration</span>
                                    <span id="durationInfo">-</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-400">Album</span>
                                    <span id="albumInfo">-</span>
                                </div>
                            </div>
                        </div>

                        <!-- Similar Tracks -->
                        <div class="bg-gray-800 rounded-2xl p-6">
                            <h3 class="font-semibold mb-4">Similar Tracks</h3>
                            <div id="similarTracks" class="space-y-3">
                                <div class="text-gray-400 text-sm">Loading...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const trackId = '${trackId}';
        let audioPlayer;
        let isPlaying = false;
        let currentTrack = null;

        // Check auth
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (token && user) {
            document.getElementById('authButtons').innerHTML = \`
                <a href="/en/dashboard" class="text-gray-300 hover:text-white mr-4">Dashboard</a>
                <button onclick="logout()" class="px-4 py-2 text-sm bg-red-600 rounded-full">Logout</button>
            \`;
        }

        function logout() {
            localStorage.clear();
            window.location.href = '/en/login';
        }

        async function loadTrack() {
            try {
                const response = await fetch(\`/api/tracks/\${trackId}\`);
                const data = await response.json();

                if (data.success && data.data) {
                    currentTrack = data.data;
                    displayTrack(currentTrack);
                    loadSimilarTracks(currentTrack.genre);
                } else {
                    showError('Track not found');
                }
            } catch (error) {
                console.error('Failed to load track:', error);
                showError('Failed to load track');
            }
        }

        function displayTrack(track) {
            document.getElementById('loadingState').classList.add('hidden');
            document.getElementById('trackContent').classList.remove('hidden');

            document.getElementById('trackTitle').textContent = track.title;
            document.getElementById('trackArtist').textContent = track.artist;
            document.getElementById('trackGenre').textContent = track.genre || 'Music';
            document.getElementById('trackPlays').textContent = (track.plays_count || 0).toLocaleString();
            document.getElementById('trackLikes').textContent = (track.likes_count || 0).toLocaleString();
            document.getElementById('trackDuration').textContent = formatTime(track.duration || 0);
            document.getElementById('trackDescription').textContent = track.description || 'No description available.';
            
            document.getElementById('releaseYear').textContent = track.release_year || '-';
            document.getElementById('genreInfo').textContent = track.genre || '-';
            document.getElementById('durationInfo').textContent = formatTime(track.duration || 0);
            document.getElementById('albumInfo').textContent = track.album || '-';
            document.getElementById('producerName').textContent = track.artist;

            // Setup audio
            if (track.audio_url) {
                audioPlayer = document.getElementById('audioPlayer');
                audioPlayer.src = track.audio_url;
                setupAudioPlayer();
                generateWaveform();
            }
        }

        function setupAudioPlayer() {
            const playPauseBtn = document.getElementById('playPauseBtn');
            const volumeSlider = document.getElementById('volumeSlider');

            playPauseBtn.onclick = togglePlay;
            
            volumeSlider.oninput = (e) => {
                audioPlayer.volume = e.target.value / 100;
            };

            audioPlayer.addEventListener('timeupdate', updateProgress);
            audioPlayer.addEventListener('loadedmetadata', () => {
                document.getElementById('totalTime').textContent = formatTime(audioPlayer.duration);
            });
        }

        function togglePlay() {
            if (isPlaying) {
                audioPlayer.pause();
                document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play text-white ml-1"></i>';
            } else {
                audioPlayer.play();
                document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause text-white"></i>';
            }
            isPlaying = !isPlaying;
        }

        function updateProgress() {
            const currentTime = audioPlayer.currentTime;
            const duration = audioPlayer.duration;
            const progress = (currentTime / duration) * 100;

            document.getElementById('currentTime').textContent = formatTime(currentTime);
            
            // Update waveform progress
            const bars = document.querySelectorAll('.waveform-bar');
            bars.forEach((bar, index) => {
                const barProgress = (index / bars.length) * 100;
                if (barProgress <= progress) {
                    bar.style.background = 'linear-gradient(to top, #ec4899, #a855f7)';
                } else {
                    bar.style.background = '#374151';
                }
            });
        }

        function generateWaveform() {
            const waveform = document.getElementById('waveform');
            const bars = 80;
            let waveformHTML = '';

            for (let i = 0; i < bars; i++) {
                const height = Math.random() * 80 + 20;
                waveformHTML += \`
                    <div class="waveform-bar flex-1 bg-gray-700 rounded-t transition-all" 
                         style="height: \${height}%"
                         onclick="seekTo(\${i / bars})">
                    </div>
                \`;
            }
            waveform.innerHTML = waveformHTML;
        }

        function seekTo(percent) {
            if (audioPlayer) {
                audioPlayer.currentTime = audioPlayer.duration * percent;
            }
        }

        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return \`\${mins}:\${secs.toString().padStart(2, '0')}\`;
        }

        async function loadSimilarTracks(genre) {
            try {
                const response = await fetch(\`/api/tracks?genre=\${genre}&limit=5\`);
                const data = await response.json();

                if (data.success && data.data) {
                    const similar = data.data.filter(t => t.id !== parseInt(trackId)).slice(0, 5);
                    displaySimilarTracks(similar);
                }
            } catch (error) {
                console.error('Failed to load similar tracks:', error);
            }
        }

        function displaySimilarTracks(tracks) {
            if (tracks.length === 0) {
                document.getElementById('similarTracks').innerHTML = '<div class="text-gray-400 text-sm">No similar tracks found</div>';
                return;
            }

            const html = tracks.map(track => \`
                <a href="/en/tracks/\${track.id}" class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition">
                    <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-music text-white"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="text-sm font-medium truncate">\${track.title}</div>
                        <div class="text-xs text-gray-400 truncate">\${track.artist}</div>
                    </div>
                </a>
            \`).join('');

            document.getElementById('similarTracks').innerHTML = html;
        }

        function showError(message) {
            document.getElementById('loadingState').innerHTML = \`
                <div class="text-center py-20">
                    <i class="fas fa-exclamation-circle text-5xl text-red-500 mb-4"></i>
                    <p class="text-gray-400">\${message}</p>
                    <a href="/en/browse" class="mt-4 inline-block px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                        Back to Browse
                    </a>
                </div>
            \`;
        }

        loadTrack();
    </script>
</body>
</html>`;
