import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Loading } from '../components/ui/Loading'
import { Tabs } from '../components/ui/Tabs'
import { useLocaleStore } from '../store'
import { t } from '../lib/i18n'
import type { ProducerApplication } from '../types'

interface ApplicationWithUser extends ProducerApplication {
  email?: string
  username?: string
  user_name?: string
  reviewer_name?: string
}

export const AdminProducerApplications: React.FC = () => {
  const { locale } = useLocaleStore()
  const [applications, setApplications] = useState<ApplicationWithUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [selectedApp, setSelectedApp] = useState<ApplicationWithUser | null>(null)
  const [reviewNotes, setReviewNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchApplications(activeTab)
  }, [activeTab])

  const fetchApplications = async (status: string) => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(`/api/producer/admin/applications?status=${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()
      if (result.success) {
        setApplications(result.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReview = async (applicationId: number, status: 'approved' | 'rejected') => {
    if (!reviewNotes.trim() && status === 'rejected') {
      alert('Please provide a reason for rejection')
      return
    }

    setIsSubmitting(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(`/api/producer/admin/applications/${applicationId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status,
          admin_notes: reviewNotes.trim() || null,
        }),
      })

      const result = await response.json()
      if (result.success) {
        alert(`Application ${status} successfully!`)
        setSelectedApp(null)
        setReviewNotes('')
        fetchApplications(activeTab)
      } else {
        alert(result.error || 'Failed to review application')
      }
    } catch (error) {
      console.error('Review error:', error)
      alert('Failed to review application')
    } finally {
      setIsSubmitting(false)
    }
  }

  const tabs = [
    { id: 'pending', label: `${t('producer.status.pending', locale)} (${applications.length})` },
    { id: 'approved', label: t('producer.status.approved', locale) },
    { id: 'rejected', label: t('producer.status.rejected', locale) },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Producer Applications Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as 'pending' | 'approved' | 'rejected')}
          />

          {isLoading ? (
            <Loading />
          ) : applications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No {activeTab} applications found
            </div>
          ) : (
            <div className="space-y-4 mt-6">
              {applications.map((app) => (
                <Card key={app.id} className="border-l-4 border-blue-500">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{app.real_name}</h3>
                        <p className="text-sm text-gray-600">
                          @{app.username} ({app.email})
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Applied: {new Date(app.created_at).toLocaleString()}
                        </p>
                      </div>
                      <Badge
                        variant={
                          app.status === 'approved'
                            ? 'success'
                            : app.status === 'rejected'
                            ? 'danger'
                            : 'warning'
                        }
                      >
                        {app.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Turkish ID</p>
                        <p className="text-sm text-gray-900">{app.turkish_id}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Phone</p>
                        <p className="text-sm text-gray-900">{app.phone}</p>
                      </div>
                    </div>

                    {(app.instagram_url ||
                      app.twitter_url ||
                      app.youtube_url ||
                      app.spotify_url ||
                      app.soundcloud_url) && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Social Links</p>
                        <div className="flex flex-wrap gap-2">
                          {app.instagram_url && (
                            <a
                              href={app.instagram_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded hover:bg-pink-200"
                            >
                              📷 Instagram
                            </a>
                          )}
                          {app.twitter_url && (
                            <a
                              href={app.twitter_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                            >
                              🐦 Twitter
                            </a>
                          )}
                          {app.youtube_url && (
                            <a
                              href={app.youtube_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                            >
                              📺 YouTube
                            </a>
                          )}
                          {app.spotify_url && (
                            <a
                              href={app.spotify_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                            >
                              🎵 Spotify
                            </a>
                          )}
                          {app.soundcloud_url && (
                            <a
                              href={app.soundcloud_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200"
                            >
                              🔊 SoundCloud
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {(app.portfolio_url ||
                      app.sample_track_1 ||
                      app.sample_track_2 ||
                      app.sample_track_3) && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Portfolio & Samples
                        </p>
                        <div className="flex flex-col gap-1">
                          {app.portfolio_url && (
                            <a
                              href={app.portfolio_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              🌐 Portfolio Website
                            </a>
                          )}
                          {app.sample_track_1 && (
                            <a
                              href={app.sample_track_1}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              🎵 Sample Track 1
                            </a>
                          )}
                          {app.sample_track_2 && (
                            <a
                              href={app.sample_track_2}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              🎵 Sample Track 2
                            </a>
                          )}
                          {app.sample_track_3 && (
                            <a
                              href={app.sample_track_3}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              🎵 Sample Track 3
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {app.status === 'pending' && (
                      <div className="mt-4 pt-4 border-t">
                        {selectedApp?.id === app.id ? (
                          <div className="space-y-3">
                            <textarea
                              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                              rows={3}
                              placeholder="Add review notes (required for rejection)..."
                              value={reviewNotes}
                              onChange={(e) => setReviewNotes(e.target.value)}
                            />
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleReview(app.id, 'approved')}
                                disabled={isSubmitting}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                ✅ Approve
                              </Button>
                              <Button
                                onClick={() => handleReview(app.id, 'rejected')}
                                disabled={isSubmitting}
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                ❌ Reject
                              </Button>
                              <Button
                                onClick={() => {
                                  setSelectedApp(null)
                                  setReviewNotes('')
                                }}
                                variant="outline"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            onClick={() => setSelectedApp(app)}
                            variant="outline"
                          >
                            Review Application
                          </Button>
                        )}
                      </div>
                    )}

                    {(app.status === 'approved' || app.status === 'rejected') && (
                      <div className="mt-4 pt-4 border-t">
                        {app.admin_notes && (
                          <div className="mb-2">
                            <p className="text-sm font-medium text-gray-700">Admin Notes:</p>
                            <p className="text-sm text-gray-600">{app.admin_notes}</p>
                          </div>
                        )}
                        {app.reviewer_name && (
                          <p className="text-xs text-gray-500">
                            Reviewed by {app.reviewer_name} on{' '}
                            {app.reviewed_at && new Date(app.reviewed_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
