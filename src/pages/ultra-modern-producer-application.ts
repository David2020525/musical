import { Locale, t } from '../lib/i18n';
import { GlobalAudioPlayerHTML } from '../components/GlobalAudioPlayer';
import { PlayButtonScript } from '../components/PlayButton';

export const ultraModernProducerApplicationHTML = (locale: Locale = 'en') => `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t('producer.pageTitle', locale)} - MUSICAL</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <style>
        * {
            font-family: 'Inter', sans-serif;
        }
        
        body {
            background: #000;
            color: #fff;
            overflow-x: hidden;
        }
        
        /* Ultra-modern glassmorphism */
        .glass-strong {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glass-button {
            background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(219, 39, 119, 0.1) 100%);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(147, 51, 234, 0.3);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-button:hover {
            background: linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(219, 39, 119, 0.2) 100%);
            border-color: rgba(147, 51, 234, 0.5);
            transform: translateY(-2px);
        }
        
        /* Gradient mesh background */
        .gradient-mesh {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            background: 
                radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(219, 39, 119, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
            animation: meshMove 20s ease infinite;
        }
        
        @keyframes meshMove {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
        
        /* Neon glow effects */
        .neon-glow {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.3),
                        0 0 40px rgba(147, 51, 234, 0.1);
        }
        
        .neon-text {
            text-shadow: 0 0 20px rgba(147, 51, 234, 0.5),
                        0 0 40px rgba(147, 51, 234, 0.3),
                        0 0 60px rgba(147, 51, 234, 0.1);
        }
        
        /* Step indicator */
        .step-active {
            background: linear-gradient(135deg, #9333EA 0%, #DB2777 100%);
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
        }
        
        .step-inactive {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .step-line-active {
            background: linear-gradient(90deg, #9333EA 0%, #DB2777 100%);
        }
        
        .step-line-inactive {
            background: rgba(255, 255, 255, 0.1);
        }
        
        /* Input fields */
        .modern-input {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #fff;
            transition: all 0.3s ease;
        }
        
        .modern-input:focus {
            outline: none;
            border-color: rgba(147, 51, 234, 0.5);
            background: rgba(255, 255, 255, 0.05);
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.2);
        }
        
        .modern-input::placeholder {
            color: rgba(255, 255, 255, 0.3);
        }
        
        /* Shimmer loading */
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }
        
        .shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            background-size: 1000px 100%;
            animation: shimmer 2s infinite;
        }
    </style>
</head>
<body>
    <div class="gradient-mesh"></div>
    
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <a href="/${locale}" class="flex items-center space-x-3 group">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center neon-glow">
                        <i class="fas fa-music text-white text-xl"></i>
                    </div>
                    <span class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        MUSICAL
                    </span>
                </a>
                
                <div class="flex items-center space-x-4">
                    <a href="/${locale}" class="glass-button px-4 py-2 rounded-xl text-sm font-medium">
                        <i class="fas fa-home mr-2"></i>${t('nav.home', locale)}
                    </a>
                    <a href="/${locale}/browse" class="glass-button px-4 py-2 rounded-xl text-sm font-medium">
                        <i class="fas fa-compass mr-2"></i>${t('nav.browse', locale)}
                    </a>
                    
                    <!-- Language Switcher -->
                    <div class="flex items-center space-x-2 glass-strong px-3 py-2 rounded-xl">
                        <a href="/en/producer/apply" class="px-3 py-1 rounded-lg text-sm font-medium ${locale === 'en' ? 'bg-purple-600' : 'hover:bg-white/5'}">
                            EN
                        </a>
                        <a href="/tr/producer/apply" class="px-3 py-1 rounded-lg text-sm font-medium ${locale === 'tr' ? 'bg-purple-600' : 'hover:bg-white/5'}">
                            TR
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    
    <div class="min-h-screen pt-32 pb-20">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Loading State -->
            <div id="loading" class="text-center py-12">
                <div class="inline-block">
                    <div class="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                </div>
                <p class="mt-4 text-gray-400">${t('producer.loading', locale)}</p>
            </div>
            
            <!-- Content Container -->
            <div id="content" class="hidden"></div>
        </div>
    </div>
    
    <script>
        const locale = '${locale}';
        const token = localStorage.getItem('token');
        
        const translations = {
            en: {
                authRequired: 'Authentication Required',
                authMessage: 'You need to log in to apply as a producer.',
                goToLogin: 'Go to Login',
                applicationStatus: 'Application Status',
                pending: 'PENDING',
                approved: 'APPROVED',
                rejected: 'REJECTED',
                pendingMessage: '⏳ Your application is under review.',
                approvedMessage: '✅ Your application has been approved!',
                rejectedMessage: '❌ Your application was not approved.',
                applicationDetails: 'Application Details',
                realName: 'Real Name',
                phone: 'Phone',
                adminNotes: 'Admin Notes',
                backToHome: 'Back to Home',
                personalInfo: 'Personal Information',
                socialLinks: 'Social Links (Optional)',
                portfolio: 'Portfolio (Optional)',
                next: 'Next',
                back: 'Back',
                submit: 'Submit Application',
                submitting: 'Submitting...',
                reviewMessage: 'Your application will be reviewed within 2-3 business days.',
                realNameLabel: 'Real Name *',
                turkishIdLabel: 'Turkish ID (11 digits) *',
                phoneLabel: 'Phone Number *',
                instagramLabel: 'Instagram URL',
                twitterLabel: 'Twitter/X URL',
                spotifyLabel: 'Spotify Artist URL',
                portfolioLabel: 'Portfolio Website URL',
                sample1Label: 'Sample Track 1 URL',
                sample2Label: 'Sample Track 2 URL',
                error: 'Error',
                errorMessage: 'Failed to load. Please try again.',
                submitError: 'Failed to submit. Please try again.'
            },
            tr: {
                authRequired: 'Kimlik Doğrulama Gerekli',
                authMessage: 'Prodüktör başvurusu yapmak için giriş yapmanız gerekiyor.',
                goToLogin: 'Giriş Yap',
                applicationStatus: 'Başvuru Durumu',
                pending: 'BEKLİYOR',
                approved: 'ONAYLANDI',
                rejected: 'REDDEDİLDİ',
                pendingMessage: '⏳ Başvurunuz inceleniyor.',
                approvedMessage: '✅ Başvurunuz onaylandı!',
                rejectedMessage: '❌ Başvurunuz onaylanmadı.',
                applicationDetails: 'Başvuru Detayları',
                realName: 'Gerçek Ad Soyad',
                phone: 'Telefon',
                adminNotes: 'Yönetici Notları',
                backToHome: 'Ana Sayfaya Dön',
                personalInfo: 'Kişisel Bilgiler',
                socialLinks: 'Sosyal Medya Linkleri (İsteğe Bağlı)',
                portfolio: 'Portfolyo (İsteğe Bağlı)',
                next: 'İleri',
                back: 'Geri',
                submit: 'Başvuruyu Gönder',
                submitting: 'Gönderiliyor...',
                reviewMessage: 'Başvurunuz 2-3 iş günü içinde değerlendirilecektir.',
                realNameLabel: 'Gerçek Ad Soyad *',
                turkishIdLabel: 'T.C. Kimlik No (11 hane) *',
                phoneLabel: 'Telefon Numarası *',
                instagramLabel: 'Instagram URL',
                twitterLabel: 'Twitter/X URL',
                spotifyLabel: 'Spotify Sanatçı URL',
                portfolioLabel: 'Portfolyo Web Sitesi URL',
                sample1Label: 'Örnek Parça 1 URL',
                sample2Label: 'Örnek Parça 2 URL',
                error: 'Hata',
                errorMessage: 'Yükleme başarısız. Lütfen tekrar deneyin.',
                submitError: 'Gönderme başarısız. Lütfen tekrar deneyin.'
            }
        };
        
        const t = translations[locale];
        
        if (!token) {
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('content').classList.remove('hidden');
            document.getElementById('content').innerHTML = \`
                <div class="glass-strong rounded-3xl p-12 text-center neon-glow">
                    <div class="text-8xl mb-6">🔒</div>
                    <h2 class="text-3xl font-bold neon-text mb-4">\${t.authRequired}</h2>
                    <p class="text-gray-400 text-lg mb-8">\${t.authMessage}</p>
                    <a href="/\${locale}/login" class="inline-block glass-button px-8 py-4 rounded-xl font-medium text-lg">
                        <i class="fas fa-sign-in-alt mr-2"></i>\${t.goToLogin}
                    </a>
                </div>
            \`;
        } else {
            fetch('/api/producer/application', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(res => res.json())
            .then(data => {
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('content').classList.remove('hidden');
                
                if (data.data) {
                    const app = data.data;
                    const statusMap = {
                        pending: { 
                            badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
                            icon: 'fa-clock',
                            message: t.pendingMessage
                        },
                        approved: { 
                            badge: 'bg-green-500/20 text-green-300 border-green-500/30',
                            icon: 'fa-check-circle',
                            message: t.approvedMessage
                        },
                        rejected: { 
                            badge: 'bg-red-500/20 text-red-300 border-red-500/30',
                            icon: 'fa-times-circle',
                            message: t.rejectedMessage
                        }
                    };
                    const status = statusMap[app.status];
                    
                    document.getElementById('content').innerHTML = \`
                        <div class="glass-strong rounded-3xl p-8 neon-glow">
                            <div class="flex justify-between items-center mb-8">
                                <h2 class="text-3xl font-bold neon-text">\${t.applicationStatus}</h2>
                                <span class="px-4 py-2 rounded-xl text-sm font-bold border \${status.badge}">
                                    <i class="fas \${status.icon} mr-2"></i>\${t[app.status]}
                                </span>
                            </div>
                            
                            <div class="glass-button rounded-2xl p-6 mb-8 border-l-4 border-purple-500">
                                <p class="text-lg">\${status.message}</p>
                            </div>
                            
                            <div class="space-y-6">
                                <div>
                                    <h3 class="text-xl font-semibold mb-4 text-purple-300">\${t.applicationDetails}</h3>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div class="glass-strong rounded-xl p-4">
                                            <p class="text-sm text-gray-400 mb-1">\${t.realName}</p>
                                            <p class="font-semibold text-lg">\${app.real_name}</p>
                                        </div>
                                        <div class="glass-strong rounded-xl p-4">
                                            <p class="text-sm text-gray-400 mb-1">\${t.phone}</p>
                                            <p class="font-semibold text-lg">\${app.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                \${app.admin_notes ? \`
                                    <div class="glass-strong rounded-xl p-6 border-t-2 border-purple-500/30">
                                        <p class="text-sm font-semibold text-purple-300 mb-2">\${t.adminNotes}:</p>
                                        <p class="text-gray-300">\${app.admin_notes}</p>
                                    </div>
                                \` : ''}
                            </div>
                            
                            <div class="mt-8 flex gap-4">
                                <a href="/\${locale}" class="flex-1 glass-button px-8 py-4 rounded-xl font-medium text-center">
                                    <i class="fas fa-home mr-2"></i>\${t.backToHome}
                                </a>
                            </div>
                        </div>
                    \`;
                } else {
                    showApplicationForm();
                }
            })
            .catch(err => {
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('content').classList.remove('hidden');
                document.getElementById('content').innerHTML = \`
                    <div class="glass-strong rounded-3xl p-8 border-red-500/30 border-2">
                        <div class="flex items-center space-x-4">
                            <div class="text-5xl">⚠️</div>
                            <div>
                                <h3 class="text-xl font-bold text-red-400 mb-2">\${t.error}</h3>
                                <p class="text-gray-300">\${t.errorMessage}</p>
                            </div>
                        </div>
                    </div>
                \`;
            });
        }
        
        function showApplicationForm() {
            let step = 1;
            let formData = {};
            
            document.getElementById('content').innerHTML = \`
                <div class="glass-strong rounded-3xl p-8 neon-glow">
                    <div class="mb-12">
                        <h1 class="text-4xl font-bold text-center mb-2 neon-text">
                            <i class="fas fa-user-music mr-3"></i>${t('producer.title', locale)}
                        </h1>
                        <p class="text-center text-gray-400 text-lg">${t('producer.subtitle', locale)}</p>
                    </div>
                    
                    <!-- Step Indicator -->
                    <div class="mb-12">
                        <div class="flex items-center justify-between max-w-2xl mx-auto">
                            <div class="flex flex-col items-center">
                                <div id="step-circle-1" class="w-14 h-14 rounded-full step-active flex items-center justify-center font-bold text-lg mb-2 transition-all duration-300">
                                    1
                                </div>
                                <p class="text-sm font-medium">\${t.personalInfo}</p>
                            </div>
                            <div id="step-line-1" class="flex-1 h-1 mx-4 step-line-inactive transition-all duration-300"></div>
                            <div class="flex flex-col items-center">
                                <div id="step-circle-2" class="w-14 h-14 rounded-full step-inactive flex items-center justify-center font-bold text-lg mb-2 transition-all duration-300">
                                    2
                                </div>
                                <p class="text-sm font-medium">\${t.socialLinks}</p>
                            </div>
                            <div id="step-line-2" class="flex-1 h-1 mx-4 step-line-inactive transition-all duration-300"></div>
                            <div class="flex flex-col items-center">
                                <div id="step-circle-3" class="w-14 h-14 rounded-full step-inactive flex items-center justify-center font-bold text-lg mb-2 transition-all duration-300">
                                    3
                                </div>
                                <p class="text-sm font-medium">\${t.portfolio}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="form" class="max-w-2xl mx-auto"></div>
                    <div id="error" class="hidden mt-6 p-4 glass-strong rounded-xl border-red-500/30 border-2 text-red-300 max-w-2xl mx-auto"></div>
                </div>
            \`;
            
            renderStep1();
            
            function activateStep(stepNum) {
                for (let i = 1; i <= 3; i++) {
                    const circle = document.getElementById(\`step-circle-\${i}\`);
                    if (i <= stepNum) {
                        circle.className = 'w-14 h-14 rounded-full step-active flex items-center justify-center font-bold text-lg mb-2 transition-all duration-300';
                    } else {
                        circle.className = 'w-14 h-14 rounded-full step-inactive flex items-center justify-center font-bold text-lg mb-2 transition-all duration-300';
                    }
                }
                for (let i = 1; i <= 2; i++) {
                    const line = document.getElementById(\`step-line-\${i}\`);
                    if (i < stepNum) {
                        line.className = 'flex-1 h-1 mx-4 step-line-active transition-all duration-300';
                    } else {
                        line.className = 'flex-1 h-1 mx-4 step-line-inactive transition-all duration-300';
                    }
                }
            }
            
            function renderStep1() {
                document.getElementById('form').innerHTML = \`
                    <form id="s1" class="space-y-6">
                        <div>
                            <label class="block text-sm font-semibold text-purple-300 mb-2">
                                <i class="fas fa-user mr-2"></i>\${t.realNameLabel}
                            </label>
                            <input type="text" id="real_name" class="w-full px-6 py-4 modern-input rounded-xl text-lg" required>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-purple-300 mb-2">
                                <i class="fas fa-id-card mr-2"></i>\${t.turkishIdLabel}
                            </label>
                            <input type="text" id="turkish_id" maxlength="11" class="w-full px-6 py-4 modern-input rounded-xl text-lg" required>
                            <p class="mt-2 text-sm text-gray-400">
                                <i class="fas fa-info-circle mr-1"></i>
                                ${locale === 'tr' ? '11 haneli T.C. kimlik numaranızı girin' : 'Enter your 11-digit Turkish ID number'}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-purple-300 mb-2">
                                <i class="fas fa-phone mr-2"></i>\${t.phoneLabel}
                            </label>
                            <input type="tel" id="phone" class="w-full px-6 py-4 modern-input rounded-xl text-lg" placeholder="+90 555 123 4567" required>
                        </div>
                        <div class="flex justify-end pt-4">
                            <button type="submit" class="glass-button px-8 py-4 rounded-xl font-medium text-lg">
                                \${t.next} <i class="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </form>
                \`;
                
                document.getElementById('s1').onsubmit = e => {
                    e.preventDefault();
                    formData.real_name = document.getElementById('real_name').value;
                    formData.turkish_id = document.getElementById('turkish_id').value;
                    formData.phone = document.getElementById('phone').value;
                    activateStep(2);
                    step = 2;
                    renderStep2();
                };
            }
            
            function renderStep2() {
                document.getElementById('form').innerHTML = \`
                    <form id="s2" class="space-y-6">
                        <div>
                            <label class="block text-sm font-semibold text-purple-300 mb-2">
                                <i class="fab fa-instagram mr-2"></i>\${t.instagramLabel}
                            </label>
                            <input type="url" id="instagram" class="w-full px-6 py-4 modern-input rounded-xl text-lg" placeholder="https://instagram.com/yourusername">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-purple-300 mb-2">
                                <i class="fab fa-twitter mr-2"></i>\${t.twitterLabel}
                            </label>
                            <input type="url" id="twitter" class="w-full px-6 py-4 modern-input rounded-xl text-lg" placeholder="https://twitter.com/yourusername">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-purple-300 mb-2">
                                <i class="fab fa-spotify mr-2"></i>\${t.spotifyLabel}
                            </label>
                            <input type="url" id="spotify" class="w-full px-6 py-4 modern-input rounded-xl text-lg" placeholder="https://open.spotify.com/artist/...">
                        </div>
                        <div class="flex justify-between pt-4">
                            <button type="button" id="back2" class="glass-button px-8 py-4 rounded-xl font-medium text-lg">
                                <i class="fas fa-arrow-left mr-2"></i>\${t.back}
                            </button>
                            <button type="submit" class="glass-button px-8 py-4 rounded-xl font-medium text-lg">
                                \${t.next} <i class="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </form>
                \`;
                
                document.getElementById('back2').onclick = () => {
                    activateStep(1);
                    step = 1;
                    renderStep1();
                };
                
                document.getElementById('s2').onsubmit = e => {
                    e.preventDefault();
                    formData.instagram_url = document.getElementById('instagram').value;
                    formData.twitter_url = document.getElementById('twitter').value;
                    formData.spotify_url = document.getElementById('spotify').value;
                    activateStep(3);
                    step = 3;
                    renderStep3();
                };
            }
            
            function renderStep3() {
                document.getElementById('form').innerHTML = \`
                    <form id="s3" class="space-y-6">
                        <div>
                            <label class="block text-sm font-semibold text-purple-300 mb-2">
                                <i class="fas fa-globe mr-2"></i>\${t.portfolioLabel}
                            </label>
                            <input type="url" id="portfolio" class="w-full px-6 py-4 modern-input rounded-xl text-lg" placeholder="https://yourportfolio.com">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-purple-300 mb-2">
                                <i class="fas fa-music mr-2"></i>\${t.sample1Label}
                            </label>
                            <input type="url" id="sample1" class="w-full px-6 py-4 modern-input rounded-xl text-lg" placeholder="https://soundcloud.com/yourtrack1">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-purple-300 mb-2">
                                <i class="fas fa-music mr-2"></i>\${t.sample2Label}
                            </label>
                            <input type="url" id="sample2" class="w-full px-6 py-4 modern-input rounded-xl text-lg" placeholder="https://soundcloud.com/yourtrack2">
                        </div>
                        <div class="glass-button rounded-2xl p-6 border-l-4 border-purple-500">
                            <p class="text-sm">
                                <i class="fas fa-clock mr-2"></i>\${t.reviewMessage}
                            </p>
                        </div>
                        <div class="flex justify-between pt-4">
                            <button type="button" id="back3" class="glass-button px-8 py-4 rounded-xl font-medium text-lg">
                                <i class="fas fa-arrow-left mr-2"></i>\${t.back}
                            </button>
                            <button type="submit" id="submit" class="glass-button px-8 py-4 rounded-xl font-medium text-lg bg-gradient-to-r from-purple-600 to-pink-600">
                                <i class="fas fa-paper-plane mr-2"></i>\${t.submit}
                            </button>
                        </div>
                    </form>
                \`;
                
                document.getElementById('back3').onclick = () => {
                    activateStep(2);
                    step = 2;
                    renderStep2();
                };
                
                document.getElementById('s3').onsubmit = e => {
                    e.preventDefault();
                    formData.portfolio_url = document.getElementById('portfolio').value;
                    formData.sample_track_1 = document.getElementById('sample1').value;
                    formData.sample_track_2 = document.getElementById('sample2').value;
                    
                    const btn = document.getElementById('submit');
                    btn.disabled = true;
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>' + t.submitting;
                    
                    fetch('/api/producer/application', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify(formData)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            location.reload();
                        } else {
                            document.getElementById('error').textContent = data.error || t.submitError;
                            document.getElementById('error').classList.remove('hidden');
                            btn.disabled = false;
                            btn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>' + t.submit;
                        }
                    })
                    .catch(err => {
                        document.getElementById('error').textContent = t.submitError;
                        document.getElementById('error').classList.remove('hidden');
                        btn.disabled = false;
                        btn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>' + t.submit;
                    });
                };
            }
        }
    </script>
    
    <!-- Global Audio Player -->
    ${GlobalAudioPlayerHTML}
    ${PlayButtonScript}
</body>
</html>
`;
