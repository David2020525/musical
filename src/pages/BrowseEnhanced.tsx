import { useEffect, useState } from 'react'
import { useLocaleStore } from '../store'
import { t, localizedPath } from '../lib/i18n'
import { Track } from '../types'
import { Card, CardContent, Button, Badge, Input, Loading, EmptyState } from '../components/ui'

const ITEMS_PER_PAGE = 12

export function BrowseEnhanced() {
  const { locale } = useLocaleStore()
  const [tracks, setTracks] = useState<Track[]>([])
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([])
  const [genres, setGenres] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'trending'>('popular')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    Promise.all([
      fetch('/api/tracks').then(r => r.json()),
      fetch('/api/tracks/genres/list').then(r => r.json()),
    ])
      .then(([tracksRes, genresRes]) => {
        if (tracksRes.success) {
          setTracks(tracksRes.data)
          setFilteredTracks(tracksRes.data)
        }
        if (genresRes.success) {
          setGenres(genresRes.data.map((g: any) => g.genre))
        }
      })
      .finally(() => setLoading(false))
  }, [])

  // Apply filters
  useEffect(() => {
    let result = [...tracks]

    // Search filter
    if (searchTerm) {
      result = result.filter(
        track =>
          track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          track.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Genre filter
    if (selectedGenre) {
      result = result.filter(track => track.genre === selectedGenre)
    }

    // Sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.plays_count - a.plays_count)
    } else if (sortBy === 'trending') {
      result.sort((a, b) => b.likes_count - a.likes_count)
    }

    setFilteredTracks(result)
    setCurrentPage(1)
  }, [searchTerm, selectedGenre, sortBy, tracks])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedGenre('')
    setSortBy('popular')
  }

  // Pagination
  const totalPages = Math.ceil(filteredTracks.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedTracks = filteredTracks.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Loading size="lg" text={t('common.loading', locale)} />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('browse.title', locale)}</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <Card>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('browse.filters', locale)}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="w-full mb-4"
                >
                  {t('browse.clear_filters', locale)}
                </Button>
              </div>

              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.search', locale)}
                </label>
                <Input
                  type="text"
                  placeholder="Search tracks..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  icon={<span>🔍</span>}
                />
              </div>

              {/* Genre Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('browse.genres', locale)}
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedGenre('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedGenre === ''
                        ? 'bg-indigo-100 text-indigo-800 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {t('browse.all', locale)}
                  </button>
                  {genres.map(genre => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedGenre === genre
                          ? 'bg-indigo-100 text-indigo-800 font-medium'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('browse.sort', locale)}
                </label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="newest">{t('browse.sort_newest', locale)}</option>
                  <option value="popular">{t('browse.sort_popular', locale)}</option>
                  <option value="trending">{t('browse.sort_trending', locale)}</option>
                </select>
              </div>
            </div>
          </Card>
        </aside>

        {/* Results */}
        <div className="flex-1">
          {/* Results count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              {filteredTracks.length} {t('browse.results', locale)}
            </p>
            {selectedGenre && (
              <Badge variant="info">
                {selectedGenre}
                <button
                  onClick={() => setSelectedGenre('')}
                  className="ml-2 hover:text-blue-900"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>

          {/* Tracks Grid */}
          {paginatedTracks.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {paginatedTracks.map(track => (
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
                        {track.genre && (
                          <Badge variant="info" size="sm" className="mb-3">
                            {track.genre}
                          </Badge>
                        )}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>▶️ {track.plays_count.toLocaleString()}</span>
                          <span>❤️ {track.likes_count}</span>
                        </div>
                      </CardContent>
                    </a>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    ← Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next →
                  </Button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon={<span className="text-6xl">🔍</span>}
              title={t('browse.no_results', locale)}
              description="Try adjusting your filters or search term"
              action={{
                label: t('browse.clear_filters', locale),
                onClick: clearFilters,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
