import { useAuthStore, useLocaleStore } from '../store'
import { t } from '../lib/i18n'

export function Admin() {
  const { locale } = useLocaleStore()
  const { user } = useAuthStore()

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">Access denied. Admin only.</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('admin.title', locale)}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-3xl mb-2">👥</div>
          <h3 className="text-lg font-semibold text-gray-900">Users</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-3xl mb-2">🎵</div>
          <h3 className="text-lg font-semibold text-gray-900">Tracks</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-3xl mb-2">📝</div>
          <h3 className="text-lg font-semibold text-gray-900">Blog Posts</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-3xl mb-2">💬</div>
          <h3 className="text-lg font-semibold text-gray-900">Forum Topics</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-2">0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('admin.users', locale)}</h2>
          <p className="text-gray-600 mb-4">Manage users, roles, and permissions</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Manage Users
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t('admin.content', locale)}
          </h2>
          <p className="text-gray-600 mb-4">Moderate tracks, posts, and forum content</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Manage Content
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t('admin.settings', locale)}
          </h2>
          <p className="text-gray-600 mb-4">Configure site settings and preferences</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Site Settings
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics</h2>
          <p className="text-gray-600 mb-4">View site statistics and analytics</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  )
}
