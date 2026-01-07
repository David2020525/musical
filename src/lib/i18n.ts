export type Locale = 'en' | 'tr'

export const locales: Locale[] = ['en', 'tr']
export const defaultLocale: Locale = 'en'

// Translation dictionaries
export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.browse': 'Browse',
    'nav.forum': 'Forum',
    'nav.blog': 'Blog',
    'nav.dashboard': 'Dashboard',
    'nav.admin': 'Admin',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.register': 'Register',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.search': 'Search',
    'common.filter': 'Filter',

    // Home page
    'home.title': 'Welcome to MusicHub',
    'home.subtitle': 'Discover, share, and discuss your favorite music',
    'home.featured': 'Featured Tracks',
    'home.recent': 'Recent Blog Posts',

    // Browse page
    'browse.title': 'Browse Music',
    'browse.all': 'All Tracks',
    'browse.genres': 'Genres',
    'browse.artists': 'Artists',

    // Track detail
    'track.play': 'Play',
    'track.like': 'Like',
    'track.share': 'Share',
    'track.plays': 'Plays',
    'track.likes': 'Likes',

    // Forum
    'forum.title': 'Community Forum',
    'forum.categories': 'Categories',
    'forum.topics': 'Topics',
    'forum.replies': 'Replies',
    'forum.new_topic': 'New Topic',
    'forum.reply': 'Reply',

    // Blog
    'blog.title': 'Blog',
    'blog.recent': 'Recent Posts',
    'blog.read_more': 'Read More',

    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.username': 'Username',
    'auth.name': 'Full Name',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.logout': 'Logout',
    'auth.forgot_password': 'Forgot Password?',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.profile': 'Profile',
    'dashboard.settings': 'Settings',

    // Admin
    'admin.title': 'Admin Panel',
    'admin.users': 'Users',
    'admin.content': 'Content',
    'admin.settings': 'Settings',
  },
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.browse': 'Gözat',
    'nav.forum': 'Forum',
    'nav.blog': 'Blog',
    'nav.dashboard': 'Kontrol Paneli',
    'nav.admin': 'Yönetim',
    'nav.login': 'Giriş Yap',
    'nav.logout': 'Çıkış Yap',
    'nav.register': 'Kayıt Ol',

    // Common
    'common.loading': 'Yükleniyor...',
    'common.error': 'Hata',
    'common.success': 'Başarılı',
    'common.cancel': 'İptal',
    'common.save': 'Kaydet',
    'common.delete': 'Sil',
    'common.edit': 'Düzenle',
    'common.search': 'Ara',
    'common.filter': 'Filtrele',

    // Home page
    'home.title': 'MusicHub\'a Hoş Geldiniz',
    'home.subtitle': 'Favori müziklerinizi keşfedin, paylaşın ve tartışın',
    'home.featured': 'Öne Çıkan Parçalar',
    'home.recent': 'Son Blog Yazıları',

    // Browse page
    'browse.title': 'Müzik Gözat',
    'browse.all': 'Tüm Parçalar',
    'browse.genres': 'Türler',
    'browse.artists': 'Sanatçılar',

    // Track detail
    'track.play': 'Oynat',
    'track.like': 'Beğen',
    'track.share': 'Paylaş',
    'track.plays': 'Dinlenme',
    'track.likes': 'Beğeni',

    // Forum
    'forum.title': 'Topluluk Forumu',
    'forum.categories': 'Kategoriler',
    'forum.topics': 'Konular',
    'forum.replies': 'Yanıtlar',
    'forum.new_topic': 'Yeni Konu',
    'forum.reply': 'Yanıtla',

    // Blog
    'blog.title': 'Blog',
    'blog.recent': 'Son Yazılar',
    'blog.read_more': 'Devamını Oku',

    // Auth
    'auth.email': 'E-posta',
    'auth.password': 'Şifre',
    'auth.username': 'Kullanıcı Adı',
    'auth.name': 'Ad Soyad',
    'auth.login': 'Giriş Yap',
    'auth.register': 'Kayıt Ol',
    'auth.logout': 'Çıkış Yap',
    'auth.forgot_password': 'Şifremi Unuttum?',

    // Dashboard
    'dashboard.title': 'Kontrol Paneli',
    'dashboard.profile': 'Profil',
    'dashboard.settings': 'Ayarlar',

    // Admin
    'admin.title': 'Yönetim Paneli',
    'admin.users': 'Kullanıcılar',
    'admin.content': 'İçerik',
    'admin.settings': 'Ayarlar',
  },
}

// Translation function
export function t(key: string, locale: Locale = defaultLocale): string {
  return translations[locale][key] || key
}

// Get locale from URL path
export function getLocaleFromPath(path: string): Locale {
  const match = path.match(/^\/(en|tr)/)
  return match ? (match[1] as Locale) : defaultLocale
}

// Build localized path
export function localizedPath(path: string, locale: Locale): string {
  // Remove any existing locale prefix
  const cleanPath = path.replace(/^\/(en|tr)/, '')
  // Add new locale prefix
  return `/${locale}${cleanPath || '/'}`
}
