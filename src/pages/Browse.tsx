import { useEffect, useState } from 'react'
import { useLocaleStore } from '../store'
import { t, localizedPath } from '../lib/i18n'
import { Track } from '../types'

export function Browse() {
  const { locale } = useLocaleStore()
  const [tracks, setTracks] = useState<Track[]>([])
  const [genres, setGenres] = useState<string[]>([])
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/tracks/genres/list').then(r => r.json()),
      fetchTracks(),
    ]).finally(() => setLoading(false))
  }, [])

  const fetchTracks = (genre = '', searchTerm = '') => {
    const params = new URLSearchParams()
    if (genre) params.append('genre', genre)
    if (searchTerm) params.append('search', searchTerm)

    fetch(`/api/tracks?${params}`)
      .then(r => r.json())
      .then(res => {
        if (res.success) setTracks(res.data)
      })
  }

  const handleGenreFilter = (genre: string) => {
    setSelectedGenre(genre)
    fetchTracks(genre, search)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchTracks(selectedGenre, search)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">{t('common.loading', locale)}</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('browse.title', locale)}</h1>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('common.search', locale)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </form>
        <select
          value={selectedGenre}
          onChange={e => handleGenreFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">{t('browse.all', locale)}</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tracks.map(track => (
          <a
            key={track.id}
            href={localizedPath(`/tracks/${track.id}`, locale)}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-5xl">🎵</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{track.title}</h3>
            <p className="text-sm text-gray-600 mb-2 truncate">{track.artist}</p>
            {track.genre && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded">
                {track.genre}
              </span>
            )}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <span>▶️ {track.plays_count}</span>
              <span>❤️ {track.likes_count}</span>
            </div>
          </a>
        ))}
      </div>

      {tracks.length === 0 && (
        <div className="text-center py-12 text-gray-500">No tracks found</div>
      )}
    </div>
  )
}
