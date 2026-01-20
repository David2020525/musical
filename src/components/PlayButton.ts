// PlayButton Component - Integrates with Global Audio Player

export function generatePlayButton(track: any, size: 'sm' | 'md' | 'lg' = 'md') {
    const sizes = {
        sm: { btn: 'w-8 h-8 text-xs', icon: 'text-xs' },
        md: { btn: 'w-12 h-12 text-sm', icon: 'text-sm' },
        lg: { btn: 'w-16 h-16 text-lg', icon: 'text-base' }
    };
    
    const sizeClasses = sizes[size];
    
    return `
        <button 
            class="play-btn ${sizeClasses.btn} rounded-full bg-gradient-to-br from-purple-600 to-pink-600 
                   text-white flex items-center justify-center shadow-lg hover:shadow-xl 
                   hover:scale-110 transition-all duration-300 group relative overflow-hidden"
            data-track-id="${track.id}"
            data-track='${JSON.stringify(track).replace(/'/g, '&apos;')}'
            onclick="playTrack(this)"
        >
            <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <i class="fas fa-play ${sizeClasses.icon} relative z-10 play-icon"></i>
            <i class="fas fa-pause ${sizeClasses.icon} relative z-10 pause-icon hidden"></i>
            <div class="absolute inset-0 rounded-full animate-ping bg-purple-400 opacity-0 group-active:opacity-75"></div>
        </button>
        
        <style>
            .play-btn:active {
                transform: scale(0.95);
            }
            
            .play-btn.playing {
                box-shadow: 0 0 20px rgba(147, 51, 234, 0.6), 0 0 40px rgba(236, 72, 153, 0.4);
            }
            
            .play-btn.playing .play-icon {
                display: none;
            }
            
            .play-btn.playing .pause-icon {
                display: block;
            }
        </style>
    `;
}

// Global function for playing tracks
export const PlayButtonScript = `
<script>
async function playTrack(button) {
    try {
        const trackData = button.getAttribute('data-track');
        const track = JSON.parse(trackData);
        
        // Check purchase status for paid tracks
        const price = parseFloat(track.price || 0);
        const isPurchased = track.is_purchased === 1 || track.is_purchased === true;
        const token = localStorage.getItem('token');
        
        // If track requires purchase and not purchased
        if (price > 0 && !isPurchased) {
            // Check if user is logged in
            if (!token) {
                // Redirect to login
                const locale = window.location.pathname.split('/')[1] || 'en';
                if (confirm('You need to purchase this track to play it. Would you like to log in?')) {
                    window.location.href = \`/\${locale}/login?redirect=\${window.location.pathname}\`;
                }
                return;
            }
            
            // Show purchase prompt and redirect to track detail page
            if (confirm(\`This track costs $\${price.toFixed(2)}. Would you like to purchase it?\`)) {
                const locale = window.location.pathname.split('/')[1] || 'en';
                window.location.href = \`/\${locale}/tracks/\${track.id}\`;
            }
            return;
        }
        
        // Check if Global Audio Player exists
        if (typeof window.GlobalAudioPlayer === 'undefined') {
            console.error('Global Audio Player not initialized');
            return;
        }
        
        // Get current state
        const currentTrack = window.GlobalAudioPlayer.getCurrentTrack();
        const isPlaying = window.GlobalAudioPlayer.isPlaying();
        
        // If same track, toggle play/pause
        if (currentTrack && currentTrack.id === track.id) {
            window.GlobalAudioPlayer.toggle();
        } else {
            // Play new track
            window.GlobalAudioPlayer.play(track);
        }
        
        // Update all play buttons
        updatePlayButtons();
    } catch (error) {
        console.error('Error playing track:', error);
    }
}

function updatePlayButtons() {
    if (typeof window.GlobalAudioPlayer === 'undefined') return;
    
    const currentTrack = window.GlobalAudioPlayer.getCurrentTrack();
    const isPlaying = window.GlobalAudioPlayer.isPlaying();
    
    // Update all play buttons
    document.querySelectorAll('.play-btn').forEach(btn => {
        const trackId = btn.getAttribute('data-track-id');
        
        if (currentTrack && trackId === String(currentTrack.id)) {
            if (isPlaying) {
                btn.classList.add('playing');
            } else {
                btn.classList.remove('playing');
            }
        } else {
            btn.classList.remove('playing');
        }
    });
}

// Update buttons when player state changes
if (typeof window.GlobalAudioPlayer !== 'undefined') {
    // Listen for audio events
    const audio = document.getElementById('global-audio-element');
    if (audio) {
        audio.addEventListener('play', updatePlayButtons);
        audio.addEventListener('pause', updatePlayButtons);
        audio.addEventListener('ended', updatePlayButtons);
    }
}

// Update on page load
document.addEventListener('DOMContentLoaded', updatePlayButtons);

// Update periodically (for cross-page sync)
setInterval(updatePlayButtons, 1000);
</script>
`;
