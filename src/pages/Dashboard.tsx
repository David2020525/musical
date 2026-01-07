import { useAuthStore, useLocaleStore } from '../store'
import { t } from '../lib/i18n'

export function Dashboard() {
  const { locale } = useLocaleStore()
  const { user } = useAuthStore()

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">Please login to access the dashboard</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('dashboard.title', locale)}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t('dashboard.profile', locale)}
          </h2>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Name:</span>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Email:</span>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Username:</span>
              <p className="font-medium">@{user.username}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Role:</span>
              <p className="font-medium capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Forum Posts</span>
              <span className="text-2xl font-bold text-indigo-600">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Liked Tracks</span>
              <span className="text-2xl font-bold text-indigo-600">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Comments</span>
              <span className="text-2xl font-bold text-indigo-600">0</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 text-left text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
              📝 Create Forum Topic
            </button>
            <button className="w-full px-4 py-2 text-left text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
              ⚙️ Edit Profile
            </button>
            <button className="w-full px-4 py-2 text-left text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">
              🎵 Browse Tracks
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
