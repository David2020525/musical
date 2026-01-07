import { useEffect, useState } from 'react'
import { useLocaleStore } from '../store'
import { t, localizedPath } from '../lib/i18n'
import {
  Card,
  CardContent,
  Button,
  Badge,
  Avatar,
  Loading,
} from '../components/ui'

interface BlogArticleProps {
  slug: string
}

export function BlogArticle({ slug }: BlogArticleProps) {
  const { locale } = useLocaleStore()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then(r => r.json())
      .then(res => {
        if (res.success) setPost(res.data)
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Loading size="lg" text={t('common.loading', locale)} />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p>Article not found</p>
      </div>
    )
  }

  const mockRelatedPosts = [
    { id: 1, title: 'Getting Started with Music Production', slug: 'getting-started' },
    { id: 2, title: '10 Tips for Better Mixing', slug: 'mixing-tips' },
    { id: 3, title: 'Best Plugins for Electronic Music', slug: 'best-plugins' },
  ]

  const mockTags = ['music production', 'tips', 'tutorial', 'beginner']
  const readingTime = 5

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <article className="lg:col-span-2">
          {/* Hero Image */}
          <div className="h-96 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl mb-8" />

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="info">Category</Badge>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{readingTime} {t('blog.minutes_read', locale)}</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

            {/* Author & Date */}
            <div className="flex items-center space-x-4 mb-6">
              <Avatar size="md" fallback={post.author_name[0]} />
              <div>
                <p className="font-medium text-gray-900">
                  {t('blog.by', locale)} {post.author_name}
                </p>
                <p className="text-sm text-gray-600">
                  {t('blog.published', locale)}: {new Date(post.created_at).toLocaleDateString()} • 👁️ {post.views_count} views
                </p>
              </div>
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 italic border-l-4 border-indigo-500 pl-4 mb-6">
                {post.excerpt}
              </p>
            )}

            {/* Social Share */}
            <div className="flex items-center space-x-3 pb-6 border-b">
              <span className="text-gray-600">{t('blog.share', locale)}:</span>
              <Button size="sm" variant="outline" icon={<span>🐦</span>}>
                Twitter
              </Button>
              <Button size="sm" variant="outline" icon={<span>📘</span>}>
                Facebook
              </Button>
              <Button size="sm" variant="outline" icon={<span>🔗</span>}>
                Copy Link
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Music production has evolved dramatically over the years. What once required expensive studio equipment can now be achieved with a laptop and the right software. In this comprehensive guide, we'll explore the essential tools and techniques you need to get started on your music production journey.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Essential Equipment</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before diving into production, you'll need some basic equipment:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li className="mb-2">A reliable computer (Mac or PC)</li>
              <li className="mb-2">Digital Audio Workstation (DAW) software</li>
              <li className="mb-2">Quality headphones or studio monitors</li>
              <li className="mb-2">Audio interface (optional but recommended)</li>
              <li className="mb-2">MIDI controller for easier workflow</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Getting Started</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The journey of music production begins with understanding the basics. Start by familiarizing yourself with your chosen DAW, learning about arrangement, mixing, and mastering fundamentals. Don't be afraid to experiment and make mistakes – that's how you learn and develop your unique sound.
            </p>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 my-8 rounded-r-lg">
              <p className="text-indigo-900 font-medium">
                💡 Pro Tip: Start with simple projects and gradually increase complexity. Focus on finishing tracks rather than making them perfect.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Music production is a rewarding journey that combines creativity with technical skills. With dedication and practice, you can create professional-sounding tracks from the comfort of your home. Remember, every producer started as a beginner, so don't get discouraged and keep creating!
            </p>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t('blog.tags', locale)}</h3>
            <div className="flex flex-wrap gap-2">
              {mockTags.map(tag => (
                <Badge key={tag} variant="default">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Author Card */}
          <Card>
            <div className="flex items-start space-x-4">
              <Avatar size="lg" fallback={post.author_name[0]} />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{post.author_name}</h4>
                <p className="text-gray-600 mb-4">
                  Music blogger and producer sharing insights about the creative process and industry trends.
                </p>
                <Button size="sm" variant="outline">
                  View Profile
                </Button>
              </div>
            </div>
          </Card>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Related Posts */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">{t('blog.related', locale)}</h3>
            <div className="space-y-4">
              {mockRelatedPosts.map(related => (
                <a
                  key={related.id}
                  href={localizedPath(`/blog/${related.slug}`, locale)}
                  className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
                >
                  <h4 className="font-medium text-gray-900 mb-1">{related.title}</h4>
                  <p className="text-sm text-gray-600">5 {t('blog.minutes_read', locale)}</p>
                </a>
              ))}
            </div>
          </Card>

          {/* Categories */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">{t('blog.categories', locale)}</h3>
            <div className="space-y-2">
              {['Production', 'Tutorials', 'Industry News', 'Reviews', 'Interviews'].map(category => (
                <a
                  key={category}
                  href={`/${locale}/blog?category=${category.toLowerCase()}`}
                  className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                >
                  {category}
                </a>
              ))}
            </div>
          </Card>

          {/* Newsletter */}
          <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <h3 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h3>
            <p className="text-indigo-100 text-sm mb-4">
              Get the latest articles and updates delivered to your inbox.
            </p>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-lg mb-3 text-gray-900"
            />
            <Button variant="secondary" className="w-full">
              Subscribe
            </Button>
          </Card>
        </aside>
      </div>
    </div>
  )
}
