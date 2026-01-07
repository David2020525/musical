import { useAuthStore, useLocaleStore } from '../store'
import { t, localizedPath, Locale, locales } from '../lib/i18n'

interface LayoutProps {
  children: React.ReactNode
  currentPath: string
}

export function Layout({ children, currentPath }: LayoutProps) {
  const { user, logout } = useAuthStore()
  const { locale, setLocale } = useLocaleStore()

  const handleLogout = () => {
    logout()
    window.location.href = localizedPath('/', locale)
  }

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale)
    const newPath = localizedPath(currentPath, newLocale)
    window.location.href = newPath
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <a
                href={localizedPath('/', locale)}
                className="flex items-center px-2 text-xl font-bold text-indigo-600"
              >
                🎵 MusicHub
              </a>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a
                  href={localizedPath('/', locale)}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  {t('nav.home', locale)}
                </a>
                <a
                  href={localizedPath('/browse', locale)}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {t('nav.browse', locale)}
                </a>
                <a
                  href={localizedPath('/forum', locale)}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {t('nav.forum', locale)}
                </a>
                <a
                  href={localizedPath('/blog', locale)}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {t('nav.blog', locale)}
                </a>
                {user && (
                  <a
                    href={localizedPath('/dashboard', locale)}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    {t('nav.dashboard', locale)}
                  </a>
                )}
                {user?.role === 'admin' && (
                  <a
                    href={localizedPath('/admin', locale)}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    {t('nav.admin', locale)}
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="flex space-x-2">
                {locales.map(loc => (
                  <button
                    key={loc}
                    onClick={() => handleLanguageChange(loc)}
                    className={`px-2 py-1 text-sm font-medium rounded ${
                      locale === loc
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Auth buttons */}
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    {t('nav.logout', locale)}
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <a
                    href={localizedPath('/login', locale)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    {t('nav.login', locale)}
                  </a>
                  <a
                    href={localizedPath('/register', locale)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    {t('nav.register', locale)}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="py-10">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 MusicHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
