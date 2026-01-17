// Global Audio Player Component - Persistent bottom player
// Uses Zustand store for state management

export const GlobalAudioPlayerHTML = `
<style>
/* Global Audio Player Styles */
#global-audio-player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(40px) saturate(200%);
    -webkit-backdrop-filter: blur(40px) saturate(200%);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    transform: translateY(100%);
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease;
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.6);
}

/* Animated gradient border on top when playing */
#global-audio-player::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #9333EA 0%, #EC4899 50%, #3B82F6 100%);
    background-size: 200% 100%;
    animation: gradientFlow 3s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease;
}

#global-audio-player.visible::before {
    opacity: 0.6;
}

@keyframes gradientFlow {
    0% { background-position: 0% 0%; }
    100% { background-position: 200% 0%; }
}

#global-audio-player.visible {
    transform: translateY(0);
}

#global-audio-player.auto-hidden {
    transform: translateY(calc(100% - 8px));
    opacity: 0.3;
    pointer-events: auto;
}

#global-audio-player.auto-hidden:hover {
    transform: translateY(0);
    opacity: 1;
}

.player-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 2rem;
    align-items: center;
}

/* Track Info */
.player-track-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.player-artwork {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
}

.player-artwork img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.player-artwork .playing-animation {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
}

.playing-animation .vinyl-disc {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, #9333EA 0%, #EC4899 25%, #3B82F6 50%, #EC4899 75%, #9333EA 100%);
    position: relative;
    box-shadow: 
        0 0 20px rgba(147, 51, 234, 0.6),
        0 0 40px rgba(236, 72, 153, 0.3),
        inset 0 0 15px rgba(0, 0, 0, 0.7),
        inset 0 2px 4px rgba(255, 255, 255, 0.1);
    transform-style: preserve-3d;
}

.playing-animation .vinyl-disc.spinning {
    animation: spin 3s linear infinite, pulse 2s ease-in-out infinite alternate;
}

@keyframes pulse {
    0% { box-shadow: 
        0 0 20px rgba(147, 51, 234, 0.6),
        0 0 40px rgba(236, 72, 153, 0.3),
        inset 0 0 15px rgba(0, 0, 0, 0.7);
    }
    100% { box-shadow: 
        0 0 30px rgba(147, 51, 234, 0.8),
        0 0 60px rgba(236, 72, 153, 0.5),
        inset 0 0 15px rgba(0, 0, 0, 0.7);
    }
}

.vinyl-disc::before {
    content: '';
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    background: #000;
    box-shadow: 
        0 0 8px rgba(147, 51, 234, 0.8),
        inset 0 0 10px rgba(147, 51, 234, 0.3);
    /* Vinyl grooves effect */
    background-image: 
        repeating-radial-gradient(circle at center, 
            transparent 0px, 
            transparent 1px, 
            rgba(255, 255, 255, 0.03) 1px, 
            rgba(255, 255, 255, 0.03) 2px);
}

.vinyl-disc::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: radial-gradient(circle, #EC4899 0%, #9333EA 100%);
    box-shadow: 
        0 0 10px rgba(236, 72, 153, 0.8),
        inset 0 1px 2px rgba(255, 255, 255, 0.3);
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.player-metadata {
    flex: 1;
    min-width: 0;
}

.player-track-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #fff;
    margin: 0 0 0.25rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.player-track-artist {
    font-size: 0.75rem;
    color: #9CA3AF;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Controls */
.player-controls {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.player-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.player-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    overflow: hidden;
}

.player-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.player-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
}

.player-btn:hover::before {
    opacity: 1;
}

.player-btn:active {
    transform: scale(0.95);
}

.player-btn-play {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #9333EA, #EC4899);
    box-shadow: 0 4px 16px rgba(147, 51, 234, 0.4);
}

.player-btn-play::before {
    background: radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, transparent 70%);
}

.player-btn-play:hover {
    box-shadow: 0 6px 24px rgba(147, 51, 234, 0.6), 0 0 40px rgba(236, 72, 153, 0.3);
    transform: scale(1.15);
}

.player-progress {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.player-time {
    font-size: 0.75rem;
    color: #9CA3AF;
    font-variant-numeric: tabular-nums;
    min-width: 40px;
}

.player-progress-bar {
    flex: 1;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    position: relative;
    cursor: pointer;
}

.player-progress-filled {
    height: 100%;
    background: linear-gradient(90deg, #9333EA, #EC4899);
    border-radius: 3px;
    position: relative;
    transition: width 0.1s linear;
}

.player-progress-handle {
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.2s;
}

.player-progress-bar:hover .player-progress-handle {
    opacity: 1;
}

/* Volume */
.player-volume {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    justify-content: flex-end;
}

.player-volume-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
}

.player-volume-btn:hover {
    background: rgba(255, 255, 255, 0.12);
}

.player-volume-slider {
    width: 100px;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    position: relative;
    cursor: pointer;
}

.player-volume-filled {
    height: 100%;
    background: linear-gradient(90deg, #9333EA, #EC4899);
    border-radius: 2px;
    transition: width 0.1s;
}

/* Responsive */
@media (max-width: 1024px) {
    .player-content {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .player-volume {
        justify-content: center;
    }
}

@media (max-width: 640px) {
    .player-content {
        padding: 0.75rem 1rem;
    }
    
    .player-track-info {
        gap: 0.75rem;
    }
    
    .player-artwork {
        width: 48px;
        height: 48px;
    }
    
    .player-buttons {
        gap: 0.5rem;
    }
    
    .player-btn {
        width: 36px;
        height: 36px;
    }
    
    .player-btn-play {
        width: 44px;
        height: 44px;
    }
    
    .player-volume-slider {
        width: 80px;
    }
}
</style>

<div id="global-audio-player" class="hidden">
    <div class="player-content">
        <!-- Track Info -->
        <div class="player-track-info">
            <div class="player-artwork">
                <img id="player-artwork" src="" alt="Track artwork">
                <div class="playing-animation" id="playing-animation" style="display: none;">
                    <div class="vinyl-disc"></div>
                </div>
            </div>
            <div class="player-metadata">
                <span class="player-track-label" style="font-size: 10px; font-weight: 700; letter-spacing: 1.5px; color: rgba(147, 51, 234, 0.8); margin-bottom: 2px; display: block;">NOW PLAYING</span>
                <h3 class="player-track-title" id="player-title">No track selected</h3>
                <p class="player-track-artist" id="player-artist">Select a track to play</p>
            </div>
        </div>
        
        <!-- Controls -->
        <div class="player-controls">
            <div class="player-buttons">
                <button class="player-btn" id="player-btn-prev" title="Previous">
                    <i class="fas fa-step-backward"></i>
                </button>
                <button class="player-btn player-btn-play" id="player-btn-play" title="Play">
                    <i class="fas fa-play"></i>
                </button>
                <button class="player-btn" id="player-btn-next" title="Next">
                    <i class="fas fa-step-forward"></i>
                </button>
                <button class="player-btn" id="player-btn-shuffle" title="Shuffle">
                    <i class="fas fa-random"></i>
                </button>
                <button class="player-btn" id="player-btn-repeat" title="Repeat">
                    <i class="fas fa-redo"></i>
                </button>
            </div>
            <div class="player-progress">
                <span class="player-time" id="player-time-current">0:00</span>
                <div class="player-progress-bar" id="player-progress-bar">
                    <div class="player-progress-filled" id="player-progress-filled">
                        <div class="player-progress-handle"></div>
                    </div>
                </div>
                <span class="player-time" id="player-time-total">0:00</span>
            </div>
        </div>
        
        <!-- Volume -->
        <div class="player-volume">
            <button class="player-volume-btn" id="player-volume-btn" title="Mute">
                <i class="fas fa-volume-up"></i>
            </button>
            <div class="player-volume-slider" id="player-volume-slider">
                <div class="player-volume-filled" id="player-volume-filled"></div>
            </div>
        </div>
    </div>
</div>

<audio id="global-audio-element" preload="metadata"></audio>

<script>
// Global Audio Player Logic
(function() {
    'use strict';
    
    // Audio element
    const audio = document.getElementById('global-audio-element');
    
    // Player elements
    const player = document.getElementById('global-audio-player');
    const artwork = document.getElementById('player-artwork');
    const title = document.getElementById('player-title');
    const artist = document.getElementById('player-artist');
    const playingAnimation = document.getElementById('playing-animation');
    
    // Control buttons
    const btnPlay = document.getElementById('player-btn-play');
    const btnPrev = document.getElementById('player-btn-prev');
    const btnNext = document.getElementById('player-btn-next');
    const btnShuffle = document.getElementById('player-btn-shuffle');
    const btnRepeat = document.getElementById('player-btn-repeat');
    
    // Progress
    const progressBar = document.getElementById('player-progress-bar');
    const progressFilled = document.getElementById('player-progress-filled');
    const timeCurrent = document.getElementById('player-time-current');
    const timeTotal = document.getElementById('player-time-total');
    
    // Volume
    const volumeBtn = document.getElementById('player-volume-btn');
    const volumeSlider = document.getElementById('player-volume-slider');
    const volumeFilled = document.getElementById('player-volume-filled');
    
    // State (using localStorage for persistence)
    let state = {
        currentTrack: null,
        isPlaying: false,
        volume: 0.8,
        isMuted: false,
        shuffle: false,
        repeat: 'off', // 'off', 'all', 'one'
        queue: [],
        queueIndex: -1
    };
    
    // Load state from localStorage
    function loadState() {
        const saved = localStorage.getItem('audioPlayerState');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                state = { ...state, ...parsed, isPlaying: false }; // Don't auto-play
                audio.volume = state.volume;
                updateVolumeUI();
            } catch (e) {
                console.error('Failed to load player state:', e);
            }
        }
    }
    
    // Save state to localStorage
    function saveState() {
        const toSave = {
            currentTrack: state.currentTrack,
            volume: state.volume,
            isMuted: state.isMuted,
            shuffle: state.shuffle,
            repeat: state.repeat,
            queue: state.queue,
            queueIndex: state.queueIndex
        };
        localStorage.setItem('audioPlayerState', JSON.stringify(toSave));
    }
    
    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
        if (!isFinite(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }
    
    // Update UI
    function updateUI() {
        if (state.currentTrack) {
            player.classList.remove('hidden');
            player.classList.add('visible');
            artwork.src = state.currentTrack.artwork || '/static/default-artwork.jpg';
            title.textContent = state.currentTrack.title;
            artist.textContent = state.currentTrack.artist;
        }
        
        // Play/Pause button
        const playIcon = btnPlay.querySelector('i');
        const vinylDisc = playingAnimation.querySelector('.vinyl-disc');
        
        if (state.isPlaying) {
            playIcon.className = 'fas fa-pause';
            playingAnimation.style.display = 'flex';
            if (vinylDisc) vinylDisc.classList.add('spinning');
        } else {
            playIcon.className = 'fas fa-play';
            // Always show vinyl disc, but don't spin when paused
            playingAnimation.style.display = state.currentTrack ? 'flex' : 'none';
            if (vinylDisc) vinylDisc.classList.remove('spinning');
        }
        
        // Shuffle button
        btnShuffle.style.opacity = state.shuffle ? '1' : '0.5';
        
        // Repeat button
        const repeatIcon = btnRepeat.querySelector('i');
        if (state.repeat === 'one') {
            repeatIcon.className = 'fas fa-redo';
            btnRepeat.style.opacity = '1';
            btnRepeat.innerHTML = '<i class="fas fa-redo"></i><span style="position: absolute; font-size: 8px; bottom: 8px;">1</span>';
        } else if (state.repeat === 'all') {
            repeatIcon.className = 'fas fa-redo';
            btnRepeat.style.opacity = '1';
        } else {
            repeatIcon.className = 'fas fa-redo';
            btnRepeat.style.opacity = '0.5';
        }
    }
    
    // Update progress
    function updateProgress() {
        const percent = (audio.currentTime / audio.duration) * 100 || 0;
        progressFilled.style.width = percent + '%';
        timeCurrent.textContent = formatTime(audio.currentTime);
        timeTotal.textContent = formatTime(audio.duration);
    }
    
    // Update volume UI
    function updateVolumeUI() {
        const volumeIcon = volumeBtn.querySelector('i');
        if (state.isMuted || state.volume === 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (state.volume < 0.5) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
        volumeFilled.style.width = (state.volume * 100) + '%';
    }
    
    // Play track
    function playTrack(track) {
        state.currentTrack = track;
        audio.src = track.audio_url;
        audio.play().then(() => {
            state.isPlaying = true;
            updateUI();
            saveState();
        }).catch(err => {
            console.error('Playback failed:', err);
            state.isPlaying = false;
            updateUI();
        });
    }
    
    // Toggle play/pause
    function togglePlay() {
        if (!state.currentTrack) return;
        
        if (state.isPlaying) {
            audio.pause();
            state.isPlaying = false;
        } else {
            audio.play().then(() => {
                state.isPlaying = true;
            }).catch(err => {
                console.error('Playback failed:', err);
                state.isPlaying = false;
            });
        }
        updateUI();
        saveState();
    }
    
    // Next track
    function nextTrack() {
        if (state.queue.length === 0) return;
        
        let nextIndex;
        if (state.shuffle) {
            nextIndex = Math.floor(Math.random() * state.queue.length);
        } else {
            nextIndex = (state.queueIndex + 1) % state.queue.length;
        }
        
        state.queueIndex = nextIndex;
        playTrack(state.queue[nextIndex]);
    }
    
    // Previous track
    function prevTrack() {
        if (state.queue.length === 0) return;
        
        // If > 3 seconds played, restart current track
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
            return;
        }
        
        let prevIndex = (state.queueIndex - 1 + state.queue.length) % state.queue.length;
        state.queueIndex = prevIndex;
        playTrack(state.queue[prevIndex]);
    }
    
    // Toggle shuffle
    function toggleShuffle() {
        state.shuffle = !state.shuffle;
        updateUI();
        saveState();
    }
    
    // Toggle repeat
    function toggleRepeat() {
        if (state.repeat === 'off') {
            state.repeat = 'all';
        } else if (state.repeat === 'all') {
            state.repeat = 'one';
        } else {
            state.repeat = 'off';
        }
        updateUI();
        saveState();
    }
    
    // Toggle mute
    function toggleMute() {
        state.isMuted = !state.isMuted;
        audio.muted = state.isMuted;
        updateVolumeUI();
        saveState();
    }
    
    // Seek
    function seek(e) {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    }
    
    // Set volume
    function setVolume(e) {
        const rect = volumeSlider.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        state.volume = percent;
        audio.volume = percent;
        state.isMuted = false;
        audio.muted = false;
        updateVolumeUI();
        saveState();
    }
    
    // Event listeners
    btnPlay.addEventListener('click', togglePlay);
    btnNext.addEventListener('click', nextTrack);
    btnPrev.addEventListener('click', prevTrack);
    btnShuffle.addEventListener('click', toggleShuffle);
    btnRepeat.addEventListener('click', toggleRepeat);
    volumeBtn.addEventListener('click', toggleMute);
    progressBar.addEventListener('click', seek);
    volumeSlider.addEventListener('click', setVolume);
    
    // Audio events
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
        if (state.repeat === 'one') {
            audio.currentTime = 0;
            audio.play();
        } else if (state.repeat === 'all' || state.queueIndex < state.queue.length - 1) {
            nextTrack();
        } else {
            state.isPlaying = false;
            updateUI();
        }
    });
    
    audio.addEventListener('play', () => {
        state.isPlaying = true;
        updateUI();
    });
    
    audio.addEventListener('pause', () => {
        state.isPlaying = false;
        updateUI();
    });
    
    // Global API for other components to use
    window.GlobalAudioPlayer = {
        play: function(track, queue = []) {
            state.queue = queue.length > 0 ? queue : [track];
            state.queueIndex = state.queue.findIndex(t => t.id === track.id);
            if (state.queueIndex === -1) {
                state.queue.push(track);
                state.queueIndex = state.queue.length - 1;
            }
            playTrack(track);
        },
        
        pause: function() {
            audio.pause();
        },
        
        toggle: function() {
            togglePlay();
        },
        
        getCurrentTrack: function() {
            return state.currentTrack;
        },
        
        isPlaying: function() {
            return state.isPlaying;
        }
    };
    
    // Initialize
    loadState();
    if (state.currentTrack) {
        updateUI();
    }
    
    // Auto-hide functionality
    let autoHideTimer = null;
    let isPlayerHovered = false;
    
    function showPlayer() {
        if (player) {
            player.classList.remove('auto-hidden');
            if (autoHideTimer) clearTimeout(autoHideTimer);
            // Restart timer if playing
            if (state.isPlaying && player.classList.contains('visible')) {
                autoHideTimer = setTimeout(() => {
                    hidePlayer();
                }, 3000);
            }
        }
    }
    
    function hidePlayer() {
        if (player && player.classList.contains('visible') && !isPlayerHovered && state.isPlaying) {
            player.classList.add('auto-hidden');
        }
    }
    
    function resetAutoHideTimer() {
        if (autoHideTimer) clearTimeout(autoHideTimer);
        if (state.isPlaying && player.classList.contains('visible')) {
            autoHideTimer = setTimeout(() => {
                hidePlayer();
            }, 3000);
        }
    }
    
    // Show player when cursor moves to bottom of screen
    document.addEventListener('mousemove', (e) => {
        if (!player || !state.isPlaying) return;
        
        const windowHeight = window.innerHeight;
        const bottomThreshold = 150; // Show when within 150px of bottom
        const distanceFromBottom = windowHeight - e.clientY;
        
        if (distanceFromBottom < bottomThreshold) {
            showPlayer();
        }
    });
    
    // Show player when hovering over it
    if (player) {
        player.addEventListener('mouseenter', () => {
            isPlayerHovered = true;
            showPlayer();
        });
        
        player.addEventListener('mouseleave', () => {
            isPlayerHovered = false;
            resetAutoHideTimer();
        });
    }
    
    // Start auto-hide timer when playback starts
    audio.addEventListener('play', () => {
        resetAutoHideTimer();
    });
    
    // Show player when paused
    audio.addEventListener('pause', () => {
        if (autoHideTimer) clearTimeout(autoHideTimer);
        showPlayer();
    });
    
    // Update UI on visibility change
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateUI();
        }
    });
})();
</script>
`;
