import React, { useEffect, useState } from 'react'
import { ProducerApplicationForm } from '../components/ProducerApplicationForm'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Loading } from '../components/ui/Loading'
import { useLocaleStore, useAuthStore } from '../store'
import { t, localizedPath } from '../lib/i18n'
import type { ProducerApplication } from '../types'

export const ProducerApplicationPage: React.FC = () => {
  const { locale } = useLocaleStore()
  const { user } = useAuthStore()
  const [application, setApplication] = useState<ProducerApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchApplication()
  }, [])

  const fetchApplication = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch('/api/producer/application', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()
      if (result.success && result.data) {
        setApplication(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch application:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccess = () => {
    setShowForm(false)
    fetchApplication()
  }

  if (isLoading) {
    return <Loading />
  }

  // User is already a producer
  if (user?.is_producer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              {t('producer.alreadyProducer', locale)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              {t('producer.alreadyProducerText', locale)}
            </p>
            <div className="flex gap-3">
              <Button onClick={() => (window.location.href = localizedPath('/dashboard', locale))}>
                {t('nav.dashboard', locale)}
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = localizedPath('/tracks/upload', locale))}
              >
                {t('producer.uploadTrack', locale)}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Has existing application
  if (application) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t('producer.applicationStatus', locale)}</span>
              <Badge
                variant={
                  application.status === 'approved'
                    ? 'success'
                    : application.status === 'rejected'
                    ? 'danger'
                    : 'warning'
                }
              >
                {t(`producer.status.${application.status}`, locale)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {application.status === 'pending' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-yellow-900 mb-2">
                  ⏳ {t('producer.pendingTitle', locale)}
                </h4>
                <p className="text-sm text-yellow-700">
                  {t('producer.pendingText', locale)}
                </p>
              </div>
            )}

            {application.status === 'approved' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-green-900 mb-2">
                  ✅ {t('producer.approvedTitle', locale)}
                </h4>
                <p className="text-sm text-green-700">
                  {t('producer.approvedText', locale)}
                </p>
                {application.reviewed_at && (
                  <p className="text-xs text-green-600 mt-2">
                    {t('producer.reviewedAt', locale)}: {new Date(application.reviewed_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            {application.status === 'rejected' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-red-900 mb-2">
                  ❌ {t('producer.rejectedTitle', locale)}
                </h4>
                <p className="text-sm text-red-700">
                  {t('producer.rejectedText', locale)}
                </p>
                {application.admin_notes && (
                  <div className="mt-3 p-3 bg-white rounded border border-red-200">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      {t('producer.adminNotes', locale)}:
                    </p>
                    <p className="text-sm text-gray-600">{application.admin_notes}</p>
                  </div>
                )}
                {application.reviewed_at && (
                  <p className="text-xs text-red-600 mt-2">
                    {t('producer.reviewedAt', locale)}: {new Date(application.reviewed_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">{t('producer.applicationDetails', locale)}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">{t('producer.realName', locale)}</p>
                  <p className="font-medium">{application.real_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('producer.phone', locale)}</p>
                  <p className="font-medium">{application.phone}</p>
                </div>
              </div>

              {(application.instagram_url ||
                application.twitter_url ||
                application.youtube_url ||
                application.spotify_url ||
                application.soundcloud_url) && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">{t('producer.socialLinks', locale)}</p>
                  <div className="flex flex-wrap gap-2">
                    {application.instagram_url && (
                      <a
                        href={application.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        📷 Instagram
                      </a>
                    )}
                    {application.twitter_url && (
                      <a
                        href={application.twitter_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        🐦 Twitter
                      </a>
                    )}
                    {application.youtube_url && (
                      <a
                        href={application.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        📺 YouTube
                      </a>
                    )}
                    {application.spotify_url && (
                      <a
                        href={application.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        🎵 Spotify
                      </a>
                    )}
                    {application.soundcloud_url && (
                      <a
                        href={application.soundcloud_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        🔊 SoundCloud
                      </a>
                    )}
                  </div>
                </div>
              )}

              {(application.portfolio_url ||
                application.sample_track_1 ||
                application.sample_track_2 ||
                application.sample_track_3) && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">{t('producer.portfolio', locale)}</p>
                  <div className="flex flex-col gap-1">
                    {application.portfolio_url && (
                      <a
                        href={application.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        🌐 {t('producer.portfolioUrl', locale)}
                      </a>
                    )}
                    {application.sample_track_1 && (
                      <a
                        href={application.sample_track_1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        🎵 {t('producer.sampleTrack', locale)} 1
                      </a>
                    )}
                    {application.sample_track_2 && (
                      <a
                        href={application.sample_track_2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        🎵 {t('producer.sampleTrack', locale)} 2
                      </a>
                    )}
                    {application.sample_track_3 && (
                      <a
                        href={application.sample_track_3}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        🎵 {t('producer.sampleTrack', locale)} 3
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500">{t('producer.submittedAt', locale)}</p>
                <p className="font-medium">{new Date(application.created_at).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show application form
  if (showForm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProducerApplicationForm
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      </div>
    )
  }

  // Initial state - show info and start button
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            🎵 {t('producer.becomeProducer', locale)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none mb-6">
            <h3 className="text-lg font-semibold mb-3">
              {t('producer.whatIsProducer', locale)}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('producer.whatIsProducerText', locale)}
            </p>

            <h3 className="text-lg font-semibold mb-3">
              {t('producer.benefits', locale)}
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>{t('producer.benefit1', locale)}</li>
              <li>{t('producer.benefit2', locale)}</li>
              <li>{t('producer.benefit3', locale)}</li>
              <li>{t('producer.benefit4', locale)}</li>
              <li>{t('producer.benefit5', locale)}</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">
              {t('producer.requirements', locale)}
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>{t('producer.requirement1', locale)}</li>
              <li>{t('producer.requirement2', locale)}</li>
              <li>{t('producer.requirement3', locale)}</li>
              <li>{t('producer.requirement4', locale)}</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-900 mb-2">
                ℹ️ {t('producer.applicationProcess', locale)}
              </h4>
              <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                <li>{t('producer.process1', locale)}</li>
                <li>{t('producer.process2', locale)}</li>
                <li>{t('producer.process3', locale)}</li>
                <li>{t('producer.process4', locale)}</li>
              </ol>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setShowForm(true)} size="lg">
              {t('producer.startApplication', locale)} →
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = localizedPath('/', locale))}
            >
              {t('common.cancel', locale)}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
