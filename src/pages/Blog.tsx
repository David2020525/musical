import { useEffect, useState } from 'react'
import { useLocaleStore } from '../store'
import { t, localizedPath } from '../lib/i18n'
import { BlogPost } from '../types'

export function Blog() {
  const { locale } = useLocaleStore()
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(res => {
        if (res.success) setPosts(res.data)
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('blog.title', locale)}</h1>

      <div className="space-y-8">
        {posts.map(post => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="h-64 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              </div>
              <div className="p-8 md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  <a
                    href={localizedPath(`/blog/${post.slug}`, locale)}
                    className="hover:text-indigo-600"
                  >
                    {post.title}
                  </a>
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span>👤 {post.author_name}</span>
                  <span>📅 {new Date(post.created_at).toLocaleDateString()}</span>
                  <span>👁️ {post.views_count} views</span>
                </div>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a
                  href={localizedPath(`/blog/${post.slug}`, locale)}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  {t('blog.read_more', locale)} →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-500">No blog posts found</div>
      )}
    </div>
  )
}
