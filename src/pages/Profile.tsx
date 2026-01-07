import { useEffect, useState } from 'react'
import { useLocaleStore } from '../store'
import { t, localizedPath } from '../lib/i18n'
import { User } from '../types'
import {
  Card,
  CardContent,
  Button,
  Badge,
  Avatar,
  Loading,
  Tabs,
  EmptyState,
} from '../components/ui'

interface ProfileProps {
  username: string
}

export function Profile({ username }: ProfileProps) {
  const { locale } = useLocaleStore()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    // Mock user data - in production, fetch from API
    setTimeout(() => {
      setUser({
        id: 1,
        email: 'john@example.com',
        username: 'johndoe',
        name: 'John Doe',
        role: 'user',
        bio: 'Music enthusiast and producer from Los Angeles. Sharing my journey through sound and creativity. 🎵',
        avatar_url: undefined,
        email_verified: true,
        created_at: '2023-01-15T10:00:00Z',
        updated_at: '2024-01-01T10:00:00Z',
      })
      setLoading(false)
    }, 500)
  }, [username])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Loading size="lg" text={t('common.loading', locale)} />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmptyState
          icon={<span className="text-6xl">👤</span>}
          title="User not found"
          description="The profile you're looking for doesn't exist."
        />
      </div>
    )
  }

  const mockStats = {
    followers: 1234,
    following: 567,
    tracks: 42,
    playlists: 12,
  }

  const mockTracks = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Track ${i + 1}`,
    artist: user.name,
    plays_count: Math.floor(Math.random() * 10000),
    likes_count: Math.floor(Math.random() * 1000),
  }))

  const mockActivity = [
    { type: 'liked', item: 'Summer Vibes', time: '2 hours ago' },
    { type: 'commented', item: 'Forum: Best DAW for Beginners?', time: '5 hours ago' },
    { type: 'followed', item: 'Jane Smith', time: '1 day ago' },
    { type: 'uploaded', item: 'New Track: Midnight Drive', time: '2 days ago' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg mb-4" />
        
        {/* Profile Header */}
        <div className="relative -mt-20 px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar
                src={user.avatar_url}
                alt={user.name}
                size="xl"
                fallback={user.name[0]}
                className="border-4 border-white shadow-lg"
              />
              <Badge
                variant="success"
                className="absolute bottom-2 right-2 border-2 border-white"
              >
                Online
              </Badge>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{user.name}</h1>
                    <p className="text-gray-600">@{user.username}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={isFollowing ? 'outline' : 'primary'}
                      onClick={() => setIsFollowing(!isFollowing)}
                    >
                      {isFollowing ? t('profile.unfollow', locale) : t('profile.follow', locale)}
                    </Button>
                    <Button variant="outline" icon={<span>💬</span>}>
                      {t('profile.message', locale)}
                    </Button>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-700 mb-4">{user.bio}</p>

                {/* Stats */}
                <div className="flex items-center space-x-8">
                  <div>
                    <span className="text-2xl font-bold text-indigo-600">
                      {mockStats.followers}
                    </span>
                    <p className="text-sm text-gray-600">{t('profile.followers', locale)}</p>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-indigo-600">
                      {mockStats.following}
                    </span>
                    <p className="text-sm text-gray-600">{t('profile.following', locale)}</p>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-indigo-600">{mockStats.tracks}</span>
                    <p className="text-sm text-gray-600">{t('profile.tracks', locale)}</p>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-indigo-600">
                      {mockStats.playlists}
                    </span>
                    <p className="text-sm text-gray-600">{t('profile.playlists', locale)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="mt-8">
        <Tabs
          tabs={[
            {
              id: 'tracks',
              label: t('profile.tracks', locale),
              icon: <span>🎵</span>,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockTracks.map(track => (
                    <Card key={track.id} hover className="p-0">
                      <a href={localizedPath(`/tracks/${track.id}`, locale)}>
                        <div className="aspect-square bg-gradient-to-br from-indigo-400 to-purple-500 rounded-t-lg flex items-center justify-center">
                          <span className="text-6xl">🎵</span>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-1 truncate">
                            {track.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 truncate">{track.artist}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>▶️ {track.plays_count.toLocaleString()}</span>
                            <span>❤️ {track.likes_count}</span>
                          </div>
                        </CardContent>
                      </a>
                    </Card>
                  ))}
                </div>
              ),
            },
            {
              id: 'playlists',
              label: t('profile.playlists', locale),
              icon: <span>📋</span>,
              content: (
                <EmptyState
                  icon={<span className="text-6xl">📋</span>}
                  title="No playlists yet"
                  description="This user hasn't created any playlists yet."
                />
              ),
            },
            {
              id: 'liked',
              label: t('profile.liked', locale),
              icon: <span>❤️</span>,
              content: (
                <EmptyState
                  icon={<span className="text-6xl">❤️</span>}
                  title="No liked tracks"
                  description="This user hasn't liked any tracks yet."
                />
              ),
            },
            {
              id: 'activity',
              label: t('profile.activity', locale),
              icon: <span>📊</span>,
              content: (
                <Card>
                  <div className="space-y-4">
                    {mockActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 pb-4 border-b last:border-b-0"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          {activity.type === 'liked' && '❤️'}
                          {activity.type === 'commented' && '💬'}
                          {activity.type === 'followed' && '👤'}
                          {activity.type === 'uploaded' && '🎵'}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900">
                            <span className="font-medium">{user.name}</span>{' '}
                            <span className="text-gray-600">{activity.type}</span>{' '}
                            <span className="font-medium">{activity.item}</span>
                          </p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}
