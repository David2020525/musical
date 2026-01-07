import { useAudioPlayerStore, CurrentTrack } from '../store'
import { Button } from './ui'

interface PlayButtonProps {
  track: {
    id: number
    title: string
    artist: string
    album?: string
    audio_url?: string
    duration?: number
  }
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

export function PlayButton({
  track,
  variant = 'primary',
  size = 'md',
  showIcon = true,
  className = '',
}: PlayButtonProps) {
  const { currentTrack, isPlaying, loadTrack, togglePlayPause } = useAudioPlayerStore()

  const isCurrentTrack = currentTrack?.id === track.id
  const isCurrentlyPlaying = isCurrentTrack && isPlaying

  const handleClick = () => {
    if (!track.audio_url) {
      alert('Audio preview not available for this track')
      return
    }

    if (isCurrentTrack) {
      // Toggle play/pause for current track
      togglePlayPause()
    } else {
      // Load and play new track
      const trackToLoad: CurrentTrack = {
        id: track.id,
        title: track.title,
        artist: track.artist,
        album: track.album,
        audio_url: track.audio_url,
        duration: track.duration,
      }
      loadTrack(trackToLoad)
      // Small delay to ensure track is loaded
      setTimeout(() => {
        useAudioPlayerStore.getState().play()
      }, 100)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
      icon={
        showIcon ? (
          <span className="text-lg">
            {isCurrentlyPlaying ? '⏸️' : '▶️'}
          </span>
        ) : undefined
      }
    >
      {isCurrentlyPlaying ? 'Pause' : 'Play Preview'}
    </Button>
  )
}
