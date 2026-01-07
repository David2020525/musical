import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { Bindings } from './types'
import { getLocaleFromPath, localizedPath, Locale, t } from './lib/i18n'

// Import routes
import authRoutes from './routes/auth'
import trackRoutes from './routes/tracks'
import blogRoutes from './routes/blog'
import forumRoutes from './routes/forum'

const app = new Hono<{ Bindings: Bindings }>()

// Middleware
app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))

// API Routes
app.route('/api/auth', authRoutes)
app.route('/api/tracks', trackRoutes)
app.route('/api/blog', blogRoutes)
app.route('/api/forum', forumRoutes)

// HTML template function
function renderHTML(locale: Locale, page: string) {
  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MusicHub - ${t('home.title', locale)}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex">
                    <a href="/${locale}" class="flex items-center px-2 text-xl font-bold text-indigo-600">
                        🎵 MusicHub
                    </a>
                    <div class="hidden md:ml-6 md:flex md:space-x-8">
                        <a href="/${locale}" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                            ${t('nav.home', locale)}
                        </a>
                        <a href="/${locale}/browse" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                            ${t('nav.browse', locale)}
                        </a>
                        <a href="/${locale}/forum" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                            ${t('nav.forum', locale)}
                        </a>
                        <a href="/${locale}/blog" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                            ${t('nav.blog', locale)}
                        </a>
                        <a href="/${locale}/dashboard" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                            ${t('nav.dashboard', locale)}
                        </a>
                        <a href="/${locale}/admin" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                            ${t('nav.admin', locale)}
                        </a>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <!-- Language Switcher -->
                    <div class="flex space-x-2">
                        <a href="/en${page}" class="px-2 py-1 text-sm font-medium rounded ${locale === 'en' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}">
                            EN
                        </a>
                        <a href="/tr${page}" class="px-2 py-1 text-sm font-medium rounded ${locale === 'tr' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}">
                            TR
                        </a>
                    </div>
                    <!-- Auth buttons -->
                    <div class="flex space-x-2">
                        <a href="/${locale}/login" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                            ${t('nav.login', locale)}
                        </a>
                        <a href="/${locale}/register" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                            ${t('nav.register', locale)}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main content -->
    <main id="app" class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center py-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">${t('home.title', locale)}</h1>
                <p class="text-xl text-gray-600">${t('home.subtitle', locale)}</p>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-20">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <p class="text-center text-gray-500 text-sm">
                © 2024 MusicHub. All rights reserved.
            </p>
        </div>
    </footer>
</body>
</html>`
}

// Routes for all localized paths
app.get('/', c => {
  return c.redirect('/en')
})

app.get('/:locale', c => {
  const locale = (c.req.param('locale') as Locale) || 'en'
  return c.html(renderHTML(locale, ''))
})

app.get('/:locale/*', c => {
  const locale = (c.req.param('locale') as Locale) || 'en'
  const path = c.req.path.replace(`/${locale}`, '')
  return c.html(renderHTML(locale, path))
})

export default app
