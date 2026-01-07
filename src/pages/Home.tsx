import { useEffect, useState } from 'react'
import { useLocaleStore } from '../store'
import { t } from '../lib/i18n'
import { Track, BlogPost } from '../types'

export function Home() {
  const { locale } = useLocaleStore()
  const [tracks, setTracks] = useState<Track[]>([])
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/tracks').then(r => r.json()),
      fetch('/api/blog').then(r => r.json()),
    ])
      .then(([tracksRes, postsRes]) => {
        if (tracksRes.success) setTracks(tracksRes.data.slice(0, 6))
        if (postsRes.success) setPosts(postsRes.data.slice(0, 3))
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">{t('common.loading', locale)}</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('home.title', locale)}</h1>
        <p className="text-xl text-gray-600">{t('home.subtitle', locale)}</p>
      </div>

      {/* Featured Tracks */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('home.featured', locale)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map(track => (
            <div key={track.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">🎵</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{track.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{track.artist}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>▶️ {track.plays_count}</span>
                <span>❤️ {track.likes_count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('home.recent', locale)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.author_name}</span>
                  <span className="text-sm text-gray-500">👁️ {post.views_count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
