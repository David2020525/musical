import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Bindings } from './types'
import { getLocaleFromPath, localizedPath, Locale, t } from './lib/i18n'
import { ultraModernHomeHTML } from './pages/ultra-modern-home'
import { ultraModernBrowseDynamicHTML } from './pages/ultra-modern-browse-dynamic'
import { ultraModernTrackDetailDynamicHTML } from './pages/ultra-modern-track-detail-dynamic'
import { ultraModernDashboardDynamicHTML } from './pages/ultra-modern-dashboard-dynamic'
import { ultraModernRegisterHTML } from './pages/ultra-modern-register'
import { ultraModernLoginHTML } from './pages/ultra-modern-login'
import { ultraModernProfileDynamicHTML } from './pages/ultra-modern-profile-dynamic'
import { ultraModernForumDynamicHTML } from './pages/ultra-modern-forum-dynamic'
import { ultraModernBlogHTML } from './pages/ultra-modern-blog'
import { ultraModernBlogDetailHTML } from './pages/ultra-modern-blog-detail'
import { ultraModernProducerApplicationHTML } from './pages/ultra-modern-producer-application'
import { ultraModernAdminHTML } from './pages/ultra-modern-admin'
import { ultraModernAdminProducersHTML } from './pages/ultra-modern-admin-producers'
import { ultraModernAdminUsersHTML } from './pages/ultra-modern-admin-users'
import { ultraModernVerifyEmailHTML } from './pages/ultra-modern-verify-email'
import { ultraModernForgotPasswordHTML } from './pages/ultra-modern-forgot-password'
import { ultraModernResetPasswordHTML } from './pages/ultra-modern-reset-password'
import { GlobalAudioPlayerHTML } from './components/GlobalAudioPlayer'
import { PlayButtonScript } from './components/PlayButton'

// Import routes
import authRoutes from './routes/auth'
import trackRoutes from './routes/tracks'
import blogRoutes from './routes/blog'
import forumRoutes from './routes/forum'
import producerRoutes from './routes/producer'
import userRoutes from './routes/users'
import adminRoutes from './routes/admin'
import paymentRoutes from './routes/payments'
import walletRoutes from './routes/wallet'
import searchRoutes from './routes/search'

const app = new Hono<{ Bindings: Bindings }>()

// Middleware
app.use('/api/*', cors())

// Serve SVG files directly from Worker
app.get('/logo.svg', c => {
  return c.body(`<svg width="140" height="40" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#9333EA;stop-opacity:1" /><stop offset="50%" style="stop-color:#EC4899;stop-opacity:1" /><stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" /></linearGradient><linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#9333EA;stop-opacity:0.4" /><stop offset="50%" style="stop-color:#EC4899;stop-opacity:0.4" /><stop offset="100%" style="stop-color:#3B82F6;stop-opacity:0.4" /></linearGradient></defs><circle cx="20" cy="20" r="18" fill="url(#glowGradient)" opacity="0.3"/><circle cx="20" cy="20" r="14" fill="url(#glowGradient)" opacity="0.2"/><g transform="translate(20, 20)"><path d="M -8 0 Q -8 -10, 0 -10 Q 8 -10, 8 0" stroke="url(#logoGradient)" stroke-width="2.5" stroke-linecap="round" fill="none"/><rect x="-10" y="-2" width="4" height="8" rx="2" fill="url(#logoGradient)"/><rect x="-9" y="0" width="2" height="4" rx="1" fill="#1a1a2e" opacity="0.5"/><rect x="6" y="-2" width="4" height="8" rx="2" fill="url(#logoGradient)"/><rect x="7" y="0" width="2" height="4" rx="1" fill="#1a1a2e" opacity="0.5"/><path d="M -4 0 L -4 -3 L -2 3 L 0 -4 L 2 4 L 4 -2 L 4 0" stroke="url(#logoGradient)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.8"/></g><text x="44" y="26" font-family="'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" font-size="20" font-weight="800" letter-spacing="0.5" fill="url(#logoGradient)">MUSICAL</text><line x1="44" y1="30" x2="134" y2="30" stroke="url(#logoGradient)" stroke-width="1" stroke-linecap="round" opacity="0.4"/></svg>`, 200, {'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=31536000'})
})

app.get('/favicon.svg', c => {
  return c.body(`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="faviconGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#9333EA;stop-opacity:1" /><stop offset="50%" style="stop-color:#EC4899;stop-opacity:1" /><stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" /></linearGradient><linearGradient id="faviconGlow" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#9333EA;stop-opacity:0.6" /><stop offset="50%" style="stop-color:#EC4899;stop-opacity:0.6" /><stop offset="100%" style="stop-color:#3B82F6;stop-opacity:0.6" /></linearGradient></defs><circle cx="16" cy="16" r="15" fill="url(#faviconGlow)" opacity="0.3"/><circle cx="16" cy="16" r="12" fill="url(#faviconGlow)" opacity="0.2"/><g transform="translate(16, 16)"><path d="M -6 0 Q -6 -8, 0 -8 Q 6 -8, 6 0" stroke="url(#faviconGradient)" stroke-width="2" stroke-linecap="round" fill="none"/><rect x="-8" y="-2" width="3" height="6" rx="1.5" fill="url(#faviconGradient)"/><rect x="-7.5" y="0" width="2" height="3" rx="1" fill="#1a1a2e" opacity="0.4"/><rect x="5" y="-2" width="3" height="6" rx="1.5" fill="url(#faviconGradient)"/><rect x="5.5" y="0" width="2" height="3" rx="1" fill="#1a1a2e" opacity="0.4"/><path d="M -3 0 L -3 -2 L -1.5 2.5 L 0 -3 L 1.5 3 L 3 -1.5 L 3 0" stroke="url(#faviconGradient)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.9"/></g></svg>`, 200, {'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=31536000'})
})

// Health check endpoint - Database connection test
app.get('/api/health', async (c) => {
  try {
    const db = c.env.DB
    
    // Test database connection with a simple query
    const result = await db.prepare('SELECT 1 as test').first()
    
    // Get database info
    const [tablesResult, usersCount, tracksCount] = await Promise.all([
      db.prepare(`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%'
        ORDER BY name
      `).all(),
      db.prepare('SELECT COUNT(*) as count FROM users').first(),
      db.prepare('SELECT COUNT(*) as count FROM tracks').first(),
    ])
    
    return c.json({
      success: true,
      status: 'healthy',
      database: {
        connected: true,
        database_id: '873f8f65-474c-490c-81dc-6dabc303dadb',
        database_name: 'muscial',
        tables_count: tablesResult.results?.length || 0,
        tables: tablesResult.results?.map((t: any) => t.name) || [],
        users: (usersCount as any)?.count || 0,
        tracks: (tracksCount as any)?.count || 0,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json({
      success: false,
      status: 'unhealthy',
      error: error.message || 'Database connection failed',
      database: {
        connected: false,
        database_id: '873f8f65-474c-490c-81dc-6dabc303dadb',
        database_name: 'muscial',
      },
      timestamp: new Date().toISOString(),
    }, 500)
  }
})

// API Routes
app.route('/api/auth', authRoutes)
app.route('/api/tracks', trackRoutes)
app.route('/api/blog', blogRoutes)
app.route('/api/forum', forumRoutes)
app.route('/api/producer', producerRoutes)
app.route('/api/users', userRoutes)
app.route('/api/admin', adminRoutes)
app.route('/api/payments', paymentRoutes)
app.route('/api/wallet', walletRoutes)
app.route('/api/search', searchRoutes)

// HTML template function
function renderHTML(locale: Locale, page: string) {
  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MUSICAL - ${t('home.title', locale)}</title>
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
                        🎵 MUSICAL
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
                © 2024 MUSICAL. All rights reserved.
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

// Home page
app.get('/:locale', c => {
  const locale = c.req.param('locale') as Locale
  return c.html(ultraModernHomeHTML(locale))
})

// Browse page
app.get('/:locale/browse', c => {
  const locale = c.req.param('locale') as Locale
  return c.html(ultraModernBrowseDynamicHTML(locale))
})

// Login page
app.get('/:locale/login', c => {
  const locale = c.req.param('locale') as Locale
  return c.html(ultraModernLoginHTML(locale))
})

// Producer application page
app.get('/:locale/producer/apply', c => {
  const locale = c.req.param('locale') as Locale
  return c.html(ultraModernProducerApplicationHTML(locale))
})

// Register page
app.get('/:locale/register', c => {
  const locale = c.req.param('locale') as Locale
  return c.html(ultraModernRegisterHTML(locale))
})

// Email verification page
app.get('/:locale/verify-email', c => {
  const locale = c.req.param('locale') as Locale
  return c.html(ultraModernVerifyEmailHTML(locale))
})

// Forgot password page
app.get('/:locale/forgot-password', c => {
  const locale = c.req.param('locale') as Locale
  return c.html(ultraModernForgotPasswordHTML(locale))
})

// Reset password page
app.get('/:locale/reset-password', c => {
  const locale = c.req.param('locale') as Locale
  return c.html(ultraModernResetPasswordHTML(locale))
})

// Dashboard page
app.get('/:locale/dashboard', c => {
  const locale = c.req.param('locale') as Locale
  return c.html(ultraModernDashboardDynamicHTML(locale))
})

// Track detail page
app.get('/:locale/tracks/:id', c => {
  const locale = c.req.param('locale') as Locale
  const trackId = c.req.param('id')
  return c.html(ultraModernTrackDetailDynamicHTML(trackId, locale))
})

// Profile page
app.get('/:locale/profile', c => {
  const locale = c.req.param('locale') as Locale
  return c.html(ultraModernProfileDynamicHTML(locale))
})

// Forum page
app.get('/:locale/forum', c => {
  const locale = c.req.param('locale') as Locale
  return c.html(ultraModernForumDynamicHTML(locale))
})

// Forum topic detail page
app.get('/:locale/forum/:slug', c => {
  const locale = c.req.param('locale') as Locale
  // For now, use the same page - it will handle both views
  return c.html(ultraModernForumDynamicHTML(locale))
})

// Blog page
app.get('/:locale/blog', c => {
  const locale = c.req.param('locale') as Locale
  return c.html(ultraModernBlogHTML(locale))
})

// Blog article detail page
app.get('/:locale/blog/:slug', c => {
  const locale = (c.req.param('locale') as Locale) || 'en'
  return c.html(ultraModernBlogDetailHTML(locale))
})

// Admin page
app.get('/:locale/admin', c => {
  const locale = (c.req.param('locale') as Locale) || 'en'
  return c.html(ultraModernAdminHTML(locale))
})

// Admin producer applications page
app.get('/:locale/admin/producers', c => {
  const locale = (c.req.param('locale') as Locale) || 'en'
  return c.html(ultraModernAdminProducersHTML(locale))
})

// Admin users management page
app.get('/:locale/admin/users', c => {
  const locale = (c.req.param('locale') as Locale) || 'en'
  return c.html(ultraModernAdminUsersHTML(locale))
})

// Catch-all for other pages (fallback to basic template)
app.get('/:locale/*', c => {
  const locale = (c.req.param('locale') as Locale) || 'en'
  const path = c.req.path.replace(`/${locale}`, '')
  return c.html(renderHTML(locale, path))
})

export default app
