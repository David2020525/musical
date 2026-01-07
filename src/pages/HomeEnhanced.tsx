import { useEffect, useState } from 'react'
import { useLocaleStore } from '../store'
import { t, localizedPath } from '../lib/i18n'
import { Track, BlogPost } from '../types'
import { Card, CardContent, Button, Badge, Loading } from '../components/ui'
import { PlayButton } from '../components/PlayButton'

// Mock data for hero slider
const heroSlides = [
  {
    id: 1,
    title: 'Discover Independent Artists',
    description: 'Stream millions of tracks from creators worldwide',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cta: 'Start Exploring',
  },
  {
    id: 2,
    title: 'Support Your Favorite Creators',
    description: 'Buy exclusive tracks and support independent music',
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cta: 'Browse Catalog',
  },
  {
    id: 3,
    title: 'Join Our Community',
    description: 'Connect with music lovers and discuss your favorite tracks',
    image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    cta: 'Join Forum',
  },
]

export function HomeEnhanced() {
  const { locale } = useLocaleStore()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [tracks, setTracks] = useState<Track[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/tracks').then(r => r.json()),
      fetch('/api/blog').then(r => r.json()),
    ])
      .then(([tracksRes, postsRes]) => {
        if (tracksRes.success) setTracks(tracksRes.data)
        if (postsRes.success) setPosts(postsRes.data)
      })
      .finally(() => setLoading(false))
  }, [])

  // Auto-advance hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Loading size="lg" text={t('common.loading', locale)} />
      </div>
    )
  }

  // Sort tracks for different sections
  const editorPicks = tracks.slice(0, 4)
  const trending = tracks.sort((a, b) => b.plays_count - a.plays_count).slice(0, 10)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Slider */}
      <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ background: slide.image }}
          >
            <div className="h-full flex items-center justify-center text-center text-white p-8">
              <div className="max-w-3xl">
                <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl mb-8 opacity-90">{slide.description}</p>
                <Button size="lg" variant="secondary">
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Editor's Picks */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{t('home.editor_picks', locale)}</h2>
          <a
            href={localizedPath('/browse', locale)}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {t('home.view_all', locale)} →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {editorPicks.map(track => (
            <Card key={track.id} hover className="p-0">
              <div className="aspect-square bg-gradient-to-br from-indigo-400 to-purple-500 rounded-t-lg flex items-center justify-center">
                <span className="text-6xl">🎵</span>
              </div>
              <CardContent className="p-4">
                <a href={localizedPath(`/tracks/${track.id}`, locale)}>
                  <h3 className="font-semibold text-gray-900 mb-1 truncate hover:text-indigo-600">
                    {track.title}
                  </h3>
                </a>
                <p className="text-sm text-gray-600 mb-3 truncate">{track.artist}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <span className="mr-1">▶️</span>
                    {track.plays_count.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">❤️</span>
                    {track.likes_count}
                  </span>
                </div>
                <PlayButton track={track} variant="outline" size="sm" className="w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trending Chart */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{t('home.trending', locale)}</h2>
        </div>
        <Card>
          <div className="divide-y">
            {trending.slice(0, 10).map((track, index) => (
              <div
                key={track.id}
                className="py-4 flex items-center hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <span className="text-2xl font-bold text-gray-400 w-8 text-center">
                    {index + 1}
                  </span>
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded flex items-center justify-center">
                    <span className="text-2xl">🎵</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{track.title}</h4>
                    <p className="text-sm text-gray-600 truncate">{track.artist}</p>
                  </div>
                  {track.genre && (
                    <Badge variant="info" size="sm">
                      {track.genre}
                    </Badge>
                  )}
                  <div className="text-sm text-gray-500 hidden md:block">
                    ▶️ {track.plays_count.toLocaleString()}
                  </div>
                  <PlayButton track={track} size="sm" variant="ghost" showIcon={false} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Latest Blog Posts */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{t('home.recent', locale)}</h2>
          <a
            href={localizedPath('/blog', locale)}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {t('home.view_all', locale)} →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post: any) => (
            <Card key={post.id} hover className="p-0">
              <a href={localizedPath(`/blog/${post.slug}`, locale)}>
                <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.author_name}</span>
                    <span>👁️ {post.views_count}</span>
                  </div>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
