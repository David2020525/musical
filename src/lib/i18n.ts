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
    'home.hero': 'Discover Your Next Favorite Track',
    'home.hero_desc': 'Stream millions of songs from independent artists worldwide',
    'home.editor_picks': 'Editor\'s Picks',
    'home.trending': 'Trending Now',
    'home.featured': 'Featured Tracks',
    'home.recent': 'Recent Blog Posts',
    'home.view_all': 'View All',
    'home.explore': 'Explore',

    // Browse page
    'browse.title': 'Browse Music',
    'browse.all': 'All Tracks',
    'browse.genres': 'Genres',
    'browse.artists': 'Artists',
    'browse.filters': 'Filters',
    'browse.sort': 'Sort By',
    'browse.sort_newest': 'Newest',
    'browse.sort_popular': 'Most Popular',
    'browse.sort_trending': 'Trending',
    'browse.price': 'Price Range',
    'browse.duration': 'Duration',
    'browse.results': 'Results',
    'browse.no_results': 'No tracks found',
    'browse.clear_filters': 'Clear Filters',
    'browse.page': 'Page',

    // Track detail
    'track.play': 'Play',
    'track.pause': 'Pause',
    'track.like': 'Like',
    'track.unlike': 'Unlike',
    'track.share': 'Share',
    'track.download': 'Download',
    'track.buy': 'Buy Now',
    'track.add_cart': 'Add to Cart',
    'track.plays': 'Plays',
    'track.likes': 'Likes',
    'track.duration': 'Duration',
    'track.released': 'Released',
    'track.genre': 'Genre',
    'track.bpm': 'BPM',
    'track.key': 'Key',
    'track.description': 'Description',
    'track.producer': 'Producer',
    'track.tags': 'Tags',
    'track.similar': 'Similar Tracks',
    'track.comments': 'Comments',

    // Forum
    'forum.title': 'Community Forum',
    'forum.categories': 'Categories',
    'forum.topics': 'Topics',
    'forum.replies': 'Replies',
    'forum.views': 'Views',
    'forum.last_post': 'Last Post',
    'forum.new_topic': 'New Topic',
    'forum.reply': 'Reply',
    'forum.post_reply': 'Post Reply',
    'forum.edit': 'Edit',
    'forum.delete': 'Delete',
    'forum.pin': 'Pin',
    'forum.lock': 'Lock',
    'forum.unlock': 'Unlock',
    'forum.pinned': 'Pinned',
    'forum.locked': 'Locked',
    'forum.author': 'Author',
    'forum.posted_on': 'Posted on',
    'forum.no_topics': 'No topics yet',
    'forum.no_replies': 'No replies yet',

    // Blog
    'blog.title': 'Blog',
    'blog.recent': 'Recent Posts',
    'blog.read_more': 'Read More',
    'blog.by': 'By',
    'blog.published': 'Published',
    'blog.minutes_read': 'min read',
    'blog.share': 'Share',
    'blog.related': 'Related Posts',
    'blog.categories': 'Categories',
    'blog.tags': 'Tags',

    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.username': 'Username',
    'auth.name': 'Full Name',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.logout': 'Logout',
    'auth.forgot_password': 'Forgot Password?',

    // Dashboard / Profile
    'dashboard.title': 'Dashboard',
    'dashboard.profile': 'Profile',
    'dashboard.settings': 'Settings',
    'profile.bio': 'Bio',
    'profile.joined': 'Joined',
    'profile.followers': 'Followers',
    'profile.following': 'Following',
    'profile.tracks': 'Tracks',
    'profile.playlists': 'Playlists',
    'profile.liked': 'Liked',
    'profile.activity': 'Activity',
    'profile.edit': 'Edit Profile',
    'profile.follow': 'Follow',
    'profile.unfollow': 'Unfollow',
    'profile.message': 'Message',

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
    'home.hero': 'Bir Sonraki Favori Parçanızı Keşfedin',
    'home.hero_desc': 'Dünya çapında bağımsız sanatçılardan milyonlarca şarkı dinleyin',
    'home.editor_picks': 'Editörün Seçtikleri',
    'home.trending': 'Trendler',
    'home.featured': 'Öne Çıkan Parçalar',
    'home.recent': 'Son Blog Yazıları',
    'home.view_all': 'Tümünü Gör',
    'home.explore': 'Keşfet',

    // Browse page
    'browse.title': 'Müzik Gözat',
    'browse.all': 'Tüm Parçalar',
    'browse.genres': 'Türler',
    'browse.artists': 'Sanatçılar',
    'browse.filters': 'Filtreler',
    'browse.sort': 'Sırala',
    'browse.sort_newest': 'En Yeni',
    'browse.sort_popular': 'En Popüler',
    'browse.sort_trending': 'Trend',
    'browse.price': 'Fiyat Aralığı',
    'browse.duration': 'Süre',
    'browse.results': 'Sonuç',
    'browse.no_results': 'Parça bulunamadı',
    'browse.clear_filters': 'Filtreleri Temizle',
    'browse.page': 'Sayfa',

    // Track detail
    'track.play': 'Oynat',
    'track.pause': 'Duraklat',
    'track.like': 'Beğen',
    'track.unlike': 'Beğeniyi Kaldır',
    'track.share': 'Paylaş',
    'track.download': 'İndir',
    'track.buy': 'Şimdi Satın Al',
    'track.add_cart': 'Sepete Ekle',
    'track.plays': 'Dinlenme',
    'track.likes': 'Beğeni',
    'track.duration': 'Süre',
    'track.released': 'Yayın Tarihi',
    'track.genre': 'Tür',
    'track.bpm': 'BPM',
    'track.key': 'Anahtar',
    'track.description': 'Açıklama',
    'track.producer': 'Yapımcı',
    'track.tags': 'Etiketler',
    'track.similar': 'Benzer Parçalar',
    'track.comments': 'Yorumlar',

    // Forum
    'forum.title': 'Topluluk Forumu',
    'forum.categories': 'Kategoriler',
    'forum.topics': 'Konular',
    'forum.replies': 'Yanıtlar',
    'forum.views': 'Görüntülenme',
    'forum.last_post': 'Son Gönderi',
    'forum.new_topic': 'Yeni Konu',
    'forum.reply': 'Yanıtla',
    'forum.post_reply': 'Yanıt Gönder',
    'forum.edit': 'Düzenle',
    'forum.delete': 'Sil',
    'forum.pin': 'Sabitle',
    'forum.lock': 'Kilitle',
    'forum.unlock': 'Kilidi Aç',
    'forum.pinned': 'Sabitlenmiş',
    'forum.locked': 'Kilitli',
    'forum.author': 'Yazar',
    'forum.posted_on': 'Gönderim Tarihi',
    'forum.no_topics': 'Henüz konu yok',
    'forum.no_replies': 'Henüz yanıt yok',

    // Blog
    'blog.title': 'Blog',
    'blog.recent': 'Son Yazılar',
    'blog.read_more': 'Devamını Oku',
    'blog.by': 'Yazar',
    'blog.published': 'Yayınlandı',
    'blog.minutes_read': 'dk okuma',
    'blog.share': 'Paylaş',
    'blog.related': 'İlgili Yazılar',
    'blog.categories': 'Kategoriler',
    'blog.tags': 'Etiketler',

    // Auth
    'auth.email': 'E-posta',
    'auth.password': 'Şifre',
    'auth.username': 'Kullanıcı Adı',
    'auth.name': 'Ad Soyad',
    'auth.login': 'Giriş Yap',
    'auth.register': 'Kayıt Ol',
    'auth.logout': 'Çıkış Yap',
    'auth.forgot_password': 'Şifremi Unuttum?',

    // Dashboard / Profile
    'dashboard.title': 'Kontrol Paneli',
    'dashboard.profile': 'Profil',
    'dashboard.settings': 'Ayarlar',
    'profile.bio': 'Biyografi',
    'profile.joined': 'Katılım',
    'profile.followers': 'Takipçi',
    'profile.following': 'Takip',
    'profile.tracks': 'Parçalar',
    'profile.playlists': 'Çalma Listeleri',
    'profile.liked': 'Beğenilenler',
    'profile.activity': 'Aktivite',
    'profile.edit': 'Profili Düzenle',
    'profile.follow': 'Takip Et',
    'profile.unfollow': 'Takibi Bırak',
    'profile.message': 'Mesaj',

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
