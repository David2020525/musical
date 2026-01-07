import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CurrentTrack {
  id: number
  title: string
  artist: string
  album?: string
  cover_url?: string
  audio_url: string
  duration?: number
}

interface AudioPlayerState {
  // Current track
  currentTrack: CurrentTrack | null
  
  // Playback state
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  isLoading: boolean
  
  // Audio element reference (not persisted)
  audioElement: HTMLAudioElement | null
  
  // Actions
  setAudioElement: (element: HTMLAudioElement | null) => void
  loadTrack: (track: CurrentTrack) => void
  play: () => void
  pause: () => void
  togglePlayPause: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setIsLoading: (loading: boolean) => void
  reset: () => void
}

export const useAudioPlayerStore = create<AudioPlayerState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentTrack: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 0.7,
      isMuted: false,
      isLoading: false,
      audioElement: null,

      // Set audio element reference
      setAudioElement: (element) => {
        set({ audioElement: element })
        if (element) {
          element.volume = get().volume
        }
      },

      // Load a new track
      loadTrack: (track) => {
        const { audioElement } = get()
        
        set({
          currentTrack: track,
          isPlaying: false,
          currentTime: 0,
          isLoading: true,
        })

        if (audioElement) {
          audioElement.src = track.audio_url
          audioElement.load()
        }
      },

      // Play audio
      play: () => {
        const { audioElement } = get()
        if (audioElement) {
          audioElement.play().then(() => {
            set({ isPlaying: true, isLoading: false })
          }).catch((error) => {
            console.error('Playback error:', error)
            set({ isLoading: false })
          })
        }
      },

      // Pause audio
      pause: () => {
        const { audioElement } = get()
        if (audioElement) {
          audioElement.pause()
          set({ isPlaying: false })
        }
      },

      // Toggle play/pause
      togglePlayPause: () => {
        const { isPlaying, currentTrack } = get()
        
        if (!currentTrack) return
        
        if (isPlaying) {
          get().pause()
        } else {
          get().play()
        }
      },

      // Seek to specific time
      seek: (time) => {
        const { audioElement } = get()
        if (audioElement) {
          audioElement.currentTime = time
          set({ currentTime: time })
        }
      },

      // Set volume
      setVolume: (volume) => {
        const { audioElement } = get()
        const clampedVolume = Math.max(0, Math.min(1, volume))
        
        set({ volume: clampedVolume, isMuted: clampedVolume === 0 })
        
        if (audioElement) {
          audioElement.volume = clampedVolume
        }
      },

      // Toggle mute
      toggleMute: () => {
        const { audioElement, isMuted, volume } = get()
        
        if (audioElement) {
          if (isMuted) {
            audioElement.volume = volume
            set({ isMuted: false })
          } else {
            audioElement.volume = 0
            set({ isMuted: true })
          }
        }
      },

      // Update current time (called by audio element)
      setCurrentTime: (time) => {
        set({ currentTime: time })
      },

      // Set duration (called when metadata loads)
      setDuration: (duration) => {
        set({ duration })
      },

      // Set loading state
      setIsLoading: (loading) => {
        set({ isLoading: loading })
      },

      // Reset player
      reset: () => {
        const { audioElement } = get()
        if (audioElement) {
          audioElement.pause()
          audioElement.src = ''
        }
        
        set({
          currentTrack: null,
          isPlaying: false,
          currentTime: 0,
          duration: 0,
          isLoading: false,
        })
      },
    }),
    {
      name: 'audio-player-storage',
      // Don't persist audio element and temporary states
      partialize: (state) => ({
        currentTrack: state.currentTrack,
        volume: state.volume,
        isMuted: state.isMuted,
      }),
    }
  )
)
