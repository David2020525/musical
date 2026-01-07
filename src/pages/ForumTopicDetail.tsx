import { useEffect, useState } from 'react'
import { useLocaleStore, useAuthStore } from '../store'
import { t } from '../lib/i18n'
import {
  Card,
  CardContent,
  Button,
  Badge,
  Avatar,
  Loading,
  TextArea,
  EmptyState,
} from '../components/ui'

interface ForumTopicDetailProps {
  slug: string
}

export function ForumTopicDetail({ slug }: ForumTopicDetailProps) {
  const { locale } = useLocaleStore()
  const { user } = useAuthStore()
  const [topic, setTopic] = useState<any>(null)
  const [replies, setReplies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [replyContent, setReplyContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch(`/api/forum/topics/${slug}`)
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          setTopic(res.data.topic)
          setReplies(res.data.replies)
        }
      })
      .finally(() => setLoading(false))
  }, [slug])

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyContent.trim()) return

    setSubmitting(true)
    // In production, POST to /api/forum/topics/:slug/replies
    setTimeout(() => {
      setReplyContent('')
      setSubmitting(false)
      // Refresh replies
    }, 1000)
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Loading size="lg" text={t('common.loading', locale)} />
      </div>
    )
  }

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p>Topic not found</p>
      </div>
    )
  }

  const isModerator = user?.role === 'moderator' || user?.role === 'admin'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
        <a href={`/${locale}/forum`} className="hover:text-indigo-600">
          {t('forum.title', locale)}
        </a>
        <span>/</span>
        <span>{topic.category_name}</span>
        <span>/</span>
        <span className="text-gray-900">{topic.title}</span>
      </div>

      {/* Topic Header */}
      <Card className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{topic.title}</h1>
              {topic.pinned && <Badge variant="warning">📌 {t('forum.pinned', locale)}</Badge>}
              {topic.locked && <Badge variant="danger">🔒 {t('forum.locked', locale)}</Badge>}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>
                {t('forum.author', locale)}: {topic.author_name}
              </span>
              <span>•</span>
              <span>
                {t('forum.posted_on', locale)}: {new Date(topic.created_at).toLocaleDateString()}
              </span>
              <span>•</span>
              <span>
                👁️ {topic.views_count} {t('forum.views', locale)}
              </span>
              <span>•</span>
              <span>
                💬 {topic.replies_count} {t('forum.replies', locale)}
              </span>
            </div>
          </div>

          {/* Moderator Controls */}
          {isModerator && (
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" icon={<span>📌</span>}>
                {topic.pinned ? t('forum.unlock', locale) : t('forum.pin', locale)}
              </Button>
              <Button size="sm" variant="outline" icon={<span>🔒</span>}>
                {topic.locked ? t('forum.unlock', locale) : t('forum.lock', locale)}
              </Button>
              <Button size="sm" variant="danger" icon={<span>🗑️</span>}>
                {t('forum.delete', locale)}
              </Button>
            </div>
          )}
        </div>

        {/* Original Post */}
        <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
          <Avatar size="md" fallback={topic.author_name[0]} />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-gray-900">{topic.author_name}</span>
              <Badge variant="default" size="sm">
                OP
              </Badge>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">{topic.content}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Replies */}
      <div className="space-y-4 mb-6">
        {replies.length > 0 ? (
          replies.map((reply: any) => (
            <Card key={reply.id}>
              <div className="flex items-start space-x-4">
                <Avatar size="md" fallback={reply.author_name[0]} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{reply.author_name}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(reply.created_at).toLocaleString()}
                      </span>
                    </div>
                    {(isModerator || user?.id === reply.author_id) && (
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" icon={<span>✏️</span>}>
                          {t('forum.edit', locale)}
                        </Button>
                        <Button size="sm" variant="ghost" icon={<span>🗑️</span>}>
                          {t('forum.delete', locale)}
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700">{reply.content}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <EmptyState
            icon={<span className="text-6xl">💬</span>}
            title={t('forum.no_replies', locale)}
            description="Be the first to reply to this topic!"
          />
        )}
      </div>

      {/* Reply Form */}
      {!topic.locked && user ? (
        <Card>
          <h3 className="text-lg font-semibold mb-4">{t('forum.post_reply', locale)}</h3>
          <form onSubmit={handleReplySubmit}>
            <TextArea
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
              placeholder="Write your reply..."
              rows={6}
              className="mb-4"
            />
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setReplyContent('')}
              >
                {t('common.cancel', locale)}
              </Button>
              <Button type="submit" loading={submitting} disabled={!replyContent.trim()}>
                {t('forum.post_reply', locale)}
              </Button>
            </div>
          </form>
        </Card>
      ) : topic.locked ? (
        <Card>
          <p className="text-center text-gray-600 py-4">
            🔒 This topic is locked. No more replies can be posted.
          </p>
        </Card>
      ) : (
        <Card>
          <p className="text-center text-gray-600 py-4">
            Please <a href={`/${locale}/login`} className="text-indigo-600 hover:underline">login</a> to reply to this topic.
          </p>
        </Card>
      )}
    </div>
  )
}
