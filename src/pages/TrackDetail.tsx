import { useEffect, useState } from 'react'
import { useLocaleStore } from '../store'
import { t, localizedPath } from '../lib/i18n'
import { Track } from '../types'
import {
  Card,
  CardContent,
  Button,
  Badge,
  Avatar,
  Loading,
  Tabs,
} from '../components/ui'
import { PlayButton } from '../components/PlayButton'

interface TrackDetailProps {
  trackId: string
}

export function TrackDetail({ trackId }: TrackDetailProps) {
  const { locale } = useLocaleStore()
  const [track, setTrack] = useState<Track | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    fetch(`/api/tracks/${trackId}`)
      .then(r => r.json())
      .then(res => {
        if (res.success) setTrack(res.data)
      })
      .finally(() => setLoading(false))
  }, [trackId])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Loading size="lg" text={t('common.loading', locale)} />
      </div>
    )
  }

  if (!track) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p>Track not found</p>
      </div>
    )
  }

  const mockProducer = {
    name: track.artist,
    bio: 'Independent music producer and artist',
    followers: 1234,
    tracks: 42,
  }

  const mockTags = ['electronic', 'ambient', 'chill', 'instrumental', 'beats']
  const mockSimilarTracks = Array.from({ length: 4 }, (_, i) => ({
    ...track,
    id: track.id + i + 1,
    title: `Similar Track ${i + 1}`,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Track Header */}
          <Card>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Artwork */}
              <div className="md:w-64 md:h-64 w-full aspect-square bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-9xl">🎵</span>
              </div>

              {/* Track Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{track.title}</h1>
                    <p className="text-xl text-gray-600">{track.artist}</p>
                  </div>
                  <Badge variant="info">{track.genre}</Badge>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 mb-6 text-gray-600">
                  <span className="flex items-center">
                    <span className="mr-2">▶️</span>
                    {track.plays_count.toLocaleString()} {t('track.plays', locale)}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-2">❤️</span>
                    {track.likes_count} {t('track.likes', locale)}
                  </span>
                  {track.duration && (
                    <span className="flex items-center">
                      <span className="mr-2">⏱️</span>
                      {Math.floor(track.duration / 60)}:
                      {(track.duration % 60).toString().padStart(2, '0')}
                    </span>
                  )}
                </div>

                {/* Player Controls */}
                <div className="mb-6">
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    {/* Progress bar */}
                    <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '0%' }} />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>0:00</span>
                      <span>
                        {track.duration &&
                          `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <PlayButton
                      track={track}
                      size="lg"
                      showIcon={true}
                      className="min-w-[160px]"
                    />
                    <Button
                      variant={isLiked ? 'primary' : 'outline'}
                      onClick={() => setIsLiked(!isLiked)}
                      icon={<span>❤️</span>}
                    >
                      {isLiked ? t('track.unlike', locale) : t('track.like', locale)}
                    </Button>
                    <Button variant="outline" icon={<span>🔗</span>}>
                      {t('track.share', locale)}
                    </Button>
                  </div>
                </div>

                {/* Buy/Download */}
                <div className="flex items-center space-x-3">
                  <Button variant="primary" size="lg" disabled className="flex-1">
                    <span className="mr-2">💳</span>
                    {t('track.buy', locale)} - $2.99
                  </Button>
                  <Button variant="secondary" disabled icon={<span>⬇️</span>}>
                    {t('track.download', locale)}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  * Purchase and download features coming soon
                </p>
              </div>
            </div>
          </Card>

          {/* Tabs Section */}
          <div className="mt-8">
            <Tabs
              tabs={[
                {
                  id: 'description',
                  label: t('track.description', locale),
                  content: (
                    <Card>
                      <h3 className="text-lg font-semibold mb-4">About this track</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {track.description ||
                          'This is an amazing track that showcases the unique sound and style of the artist. With carefully crafted melodies and production, this piece takes listeners on a sonic journey that is both captivating and memorable.'}
                      </p>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        {track.release_year && (
                          <div>
                            <span className="text-sm text-gray-500">{t('track.released', locale)}</span>
                            <p className="font-medium">{track.release_year}</p>
                          </div>
                        )}
                        {track.genre && (
                          <div>
                            <span className="text-sm text-gray-500">{t('track.genre', locale)}</span>
                            <p className="font-medium">{track.genre}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-sm text-gray-500">BPM</span>
                          <p className="font-medium">120</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Key</span>
                          <p className="font-medium">C Minor</p>
                        </div>
                      </div>
                    </Card>
                  ),
                },
                {
                  id: 'comments',
                  label: `${t('track.comments', locale)} (0)`,
                  content: (
                    <Card>
                      <p className="text-gray-600 text-center py-8">
                        No comments yet. Be the first to comment!
                      </p>
                    </Card>
                  ),
                },
              ]}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Producer Card */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">{t('track.producer', locale)}</h3>
            <div className="flex items-center space-x-3 mb-4">
              <Avatar size="lg" fallback={mockProducer.name[0]} />
              <div>
                <h4 className="font-semibold text-gray-900">{mockProducer.name}</h4>
                <p className="text-sm text-gray-600">{mockProducer.followers} followers</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">{mockProducer.bio}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">{mockProducer.tracks}</p>
                <p className="text-sm text-gray-600">{t('profile.tracks', locale)}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">{mockProducer.followers}</p>
                <p className="text-sm text-gray-600">{t('profile.followers', locale)}</p>
              </div>
            </div>
            <Button variant="primary" className="w-full">
              {t('profile.follow', locale)}
            </Button>
          </Card>

          {/* Tags */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">{t('track.tags', locale)}</h3>
            <div className="flex flex-wrap gap-2">
              {mockTags.map(tag => (
                <Badge key={tag} variant="default">
                  #{tag}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Similar Tracks */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">{t('track.similar', locale)}</h3>
            <div className="space-y-3">
              {mockSimilarTracks.map(similar => (
                <a
                  key={similar.id}
                  href={localizedPath(`/tracks/${similar.id}`, locale)}
                  className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🎵</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{similar.title}</p>
                    <p className="text-sm text-gray-600 truncate">{similar.artist}</p>
                  </div>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
