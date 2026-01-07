import { useEffect, useState } from 'react'
import { useLocaleStore } from '../store'
import { t, localizedPath } from '../lib/i18n'
import { ForumCategory, ForumTopic } from '../types'

export function Forum() {
  const { locale } = useLocaleStore()
  const [categories, setCategories] = useState<ForumCategory[]>([])
  const [topics, setTopics] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/forum/categories').then(r => r.json()),
      fetch('/api/forum/topics').then(r => r.json()),
    ])
      .then(([catRes, topicsRes]) => {
        if (catRes.success) setCategories(catRes.data)
        if (topicsRes.success) setTopics(topicsRes.data)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId)
    const params = categoryId ? `?category_id=${categoryId}` : ''
    fetch(`/api/forum/topics${params}`)
      .then(r => r.json())
      .then(res => {
        if (res.success) setTopics(res.data)
      })
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('forum.title', locale)}</h1>

      {/* Categories */}
      <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => handleCategoryFilter(null)}
          className={`p-4 rounded-lg border-2 ${
            selectedCategory === null
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-2xl mb-2">📋</div>
          <div className="font-medium">All Categories</div>
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryFilter(category.id)}
            className={`p-4 rounded-lg border-2 ${
              selectedCategory === category.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-2">{category.icon || '📁'}</div>
            <div className="font-medium">{category.name}</div>
            <div className="text-sm text-gray-500">{category.posts_count} topics</div>
          </button>
        ))}
      </div>

      {/* Topics */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {topics.map(topic => (
          <a
            key={topic.id}
            href={localizedPath(`/forum/${topic.slug}`, locale)}
            className="block p-6 border-b hover:bg-gray-50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>👤 {topic.author_name}</span>
                  <span>💬 {topic.replies_count} replies</span>
                  <span>👁️ {topic.views_count} views</span>
                  <span>📂 {topic.category_name}</span>
                </div>
              </div>
              {topic.pinned && (
                <span className="ml-4 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                  Pinned
                </span>
              )}
            </div>
          </a>
        ))}
      </div>

      {topics.length === 0 && (
        <div className="text-center py-12 text-gray-500">No topics found</div>
      )}
    </div>
  )
}
