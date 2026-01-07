# MusicHub - Full-Stack Music Community Platform

A complete music discovery and community platform built with Hono, Cloudflare Workers, and modern web technologies. Features internationalization (EN/TR), authentication with role-based access control, and a full database-backed system.

## 🚀 Project Overview

**Name**: MusicHub  
**Framework**: Hono + Cloudflare Workers/Pages  
**Status**: ✅ Active  
**Last Updated**: 2026-01-07

## ✨ Features Implemented

### Core Features
- ✅ **Multi-language Support (i18n)**: English and Turkish with `/en` and `/tr` routing
- ✅ **JWT Authentication**: Secure authentication with role-based access control (user, moderator, admin)
- ✅ **Database Integration**: Cloudflare D1 (SQLite) with migrations and seed data
- ✅ **State Management**: Zustand for global state (auth, locale, audio player)
- ✅ **Form Validation**: React Hook Form + Zod schemas
- ✅ **Responsive Design**: TailwindCSS with mobile-first approach
- ✅ **Persistent Audio Player**: Bottom player with play/pause, seek, volume control that persists across routes

### Pages Implemented

**Basic Pages**:
1. **Home** (`/`) - Landing page with featured tracks and recent blog posts
2. **Browse** (`/browse`) - Music catalog with search and genre filtering
3. **Track Detail** (`/tracks/:id`) - Individual track view with play statistics
4. **Forum** (`/forum`) - Community discussion forum with categories
5. **Blog** (`/blog`) - Blog posts listing and detail pages
6. **Dashboard** (`/dashboard`) - User profile and activity dashboard
7. **Admin Panel** (`/admin`) - Administrative interface (admin role only)
8. **Login/Register** - Authentication pages with form validation

**Enhanced UI Pages** (Professional Design):
1. **HomeEnhanced** - Hero slider, editor picks, trending chart, latest blog posts
2. **BrowseEnhanced** - Advanced filters sidebar, search, sort, pagination
3. **TrackDetail** - Audio player, buy button, producer card, tags, tabs
4. **Profile** - Banner, avatar, bio, tabs (tracks/playlists/liked/activity)
5. **ForumTopicDetail** - Full topic view with replies, mod controls
6. **BlogArticle** - Rich article page with sidebar, related posts

### UI Component Library
- ✅ **8 Reusable Components**: Button, Card, Badge, Tabs, Avatar, Input, Loading, EmptyState
- ✅ **Audio Components**: AudioPlayer (persistent bottom player), PlayButton (track card integration)
- ✅ **Professional Design**: Consistent styling, hover effects, transitions
- ✅ **Loading States**: Spinners and skeleton loaders
- ✅ **Empty States**: User-friendly messages with actions
- ✅ **Full Type Safety**: TypeScript types for all components

See [UI_COMPONENTS.md](./UI_COMPONENTS.md) for detailed component documentation.  
See [AUDIO_PLAYER.md](./AUDIO_PLAYER.md) for audio player implementation guide.

## 🏗️ Architecture

### Tech Stack
- **Backend**: Hono (lightweight web framework)
- **Runtime**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Frontend**: Server-rendered HTML with TailwindCSS
- **State Management**: Zustand
- **Validation**: Zod schemas
- **Authentication**: JWT with bcrypt password hashing

### Project Structure
```
webapp/
├── src/
│   ├── index.tsx              # Main Hono app with routes
│   ├── renderer.tsx           # HTML renderer
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   ├── lib/
│   │   ├── auth.ts            # JWT auth utilities
│   │   ├── i18n.ts            # Internationalization
│   │   └── validations.ts    # Zod schemas
│   ├── store/
│   │   ├── index.ts           # Zustand stores (auth, locale)
│   │   └── audioPlayerStore.ts # Audio player store
│   ├── routes/
│   │   ├── auth.ts            # Auth API routes
│   │   ├── tracks.ts          # Tracks API routes
│   │   ├── blog.ts            # Blog API routes
│   │   └── forum.ts           # Forum API routes
│   ├── pages/                 # Page components
│   │   ├── Home.tsx
│   │   ├── Browse.tsx
│   │   ├── Login.tsx
│   │   ├── Forum.tsx
│   │   ├── Blog.tsx
│   │   ├── Dashboard.tsx
│   │   └── Admin.tsx
│   └── components/
│       ├── Layout.tsx         # Main layout with navigation
│       ├── AudioPlayer.tsx    # Persistent bottom audio player
│       ├── PlayButton.tsx     # Reusable play button
│       └── ui/                # UI component library
│           ├── Button.tsx
│           ├── Card.tsx
│           ├── Badge.tsx
│           ├── Tabs.tsx
│           ├── Avatar.tsx
│           ├── Input.tsx
│           ├── Loading.tsx
│           └── EmptyState.tsx
├── migrations/
│   └── 0001_initial_schema.sql
├── public/static/
├── seed.sql
├── wrangler.jsonc             # Cloudflare configuration
├── ecosystem.config.cjs       # PM2 configuration
└── package.json
```

## 📊 Database Schema

### Tables
- **users**: User accounts with roles (user/moderator/admin)
- **sessions**: JWT session storage
- **tracks**: Music track catalog
- **blog_posts**: Blog articles
- **forum_categories**: Forum categories
- **forum_topics**: Discussion topics
- **forum_replies**: Topic replies
- **user_track_likes**: User likes for tracks

### Sample Data
- 3 users (admin, regular user, moderator)
- 5 music tracks across different genres
- 4 forum categories
- 3 forum topics with replies
- 3 blog posts

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires auth)

### Tracks
- `GET /api/tracks` - List all tracks (with optional genre/search filters)
- `GET /api/tracks/:id` - Get track by ID
- `GET /api/tracks/genres/list` - List all genres

### Blog
- `GET /api/blog` - List all blog posts
- `GET /api/blog/:slug` - Get blog post by slug

### Forum
- `GET /api/forum/categories` - List forum categories
- `GET /api/forum/topics` - List topics (with optional category filter)
- `GET /api/forum/topics/:slug` - Get topic with replies

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Install dependencies (already done)
npm install

# Apply database migrations
npm run db:migrate:local

# Seed database with sample data
npm run db:seed

# Build the project
npm run build

# Start development server
pm2 start ecosystem.config.cjs
```

### Available Scripts
```bash
npm run dev                 # Vite dev server
npm run dev:sandbox         # Wrangler dev server (sandbox)
npm run build               # Build for production
npm run deploy              # Deploy to Cloudflare Pages
npm run db:migrate:local    # Apply migrations (local)
npm run db:migrate:prod     # Apply migrations (production)
npm run db:seed             # Seed database
npm run db:reset            # Reset database
npm run lint                # Run ESLint
npm run format              # Format with Prettier
npm run clean-port          # Kill process on port 3000
```

## 🌍 Internationalization

The app supports two languages with dedicated routes:
- English: `/en/*`
- Turkish: `/tr/*`

Language switcher is available in the navigation bar. Translations are managed in `src/lib/i18n.ts`.

## 🎵 Persistent Audio Player

### Features
- **Global Playback**: Bottom player that persists across all route changes
- **Full Controls**: Play/Pause, Seek bar, Volume slider, Time display
- **Track Metadata**: Shows current track artwork, title, and artist
- **Integration**: PlayButton component on track cards and detail pages
- **State Management**: Zustand store for global player state

### Usage
```typescript
// Play a track from any page
import { PlayButton } from '../components/PlayButton'

<PlayButton 
  track={track} 
  variant="primary" 
  size="md" 
  showIcon={true}
/>
```

### Sample Audio
All tracks include sample MP3 files from SoundHelix.com (CC0 License):
- Track 1: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
- Track 2-5: Additional sample tracks

**See [AUDIO_PLAYER.md](./AUDIO_PLAYER.md) for complete implementation guide.**

## 🔐 Authentication & Authorization

### User Roles
- **user**: Regular user with basic permissions
- **moderator**: Can moderate forum and content
- **admin**: Full system access including admin panel

### Default Credentials (from seed data)
- **Admin**: admin@webapp.com / password123
- **User**: john@example.com / password123
- **Moderator**: jane@example.com / password123

### JWT Implementation
- Token expires in 7 days
- Stored in Zustand store with localStorage persistence
- Role-based access control helpers available

## 🛠️ Development

### Database Management
```bash
# Reset database completely
npm run db:reset

# Check database contents
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM users"

# Run custom SQL
npx wrangler d1 execute webapp-production --local --file=./custom.sql
```

### Testing API Endpoints
```bash
# Test tracks endpoint
curl http://localhost:3000/api/tracks

# Test authentication
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@webapp.com","password":"password123"}'
```

## 📦 Deployment

### Local Development
```bash
# Clean port and restart
npm run clean-port
pm2 restart webapp

# View logs
pm2 logs webapp --nostream
```

### Cloudflare Pages Production
```bash
# 1. Create D1 database (production)
npx wrangler d1 create webapp-production

# 2. Update database_id in wrangler.jsonc

# 3. Apply migrations to production
npm run db:migrate:prod

# 4. Deploy to Cloudflare Pages
npm run deploy
```

## 🎨 Styling

- **Framework**: TailwindCSS (via CDN)
- **Icons**: Font Awesome 6.4.0
- **Theme**: Gray/Indigo color scheme
- **Responsive**: Mobile-first design

## 📝 Code Quality

### Tools Configured
- **TypeScript**: Full type safety
- **ESLint**: Code linting with React rules
- **Prettier**: Code formatting
- **Git**: Version control with comprehensive .gitignore

### Code Standards
- Functional components with hooks
- TypeScript strict mode
- Zod validation for all forms
- Error handling on all API calls

## 🔮 Features Not Yet Implemented

1. **Track Detail Page**: Full implementation with audio player
2. **User Profile Editing**: Update user information
3. **Forum Topic Creation**: Create new forum topics
4. **Blog Post Creation**: Admin interface for blog posts
5. **Track Upload**: Upload and manage music tracks
6. **Password Reset**: Forgot password functionality
7. **Email Verification**: Email verification system
8. **Social Features**: Follow users, comments, likes
9. **Search**: Global search functionality
10. **Analytics**: Admin dashboard analytics

## 🚧 Recommended Next Steps

1. **Enhance Frontend**: Build React-based SPA with proper routing
2. **Add Real-time Features**: WebSocket for notifications (via external service)
3. **Implement File Uploads**: R2 integration for track/image uploads
4. **Add Testing**: Unit and integration tests
5. **Improve SEO**: Meta tags, Open Graph, sitemap
6. **Add Analytics**: Track user behavior and content engagement
7. **Implement Caching**: KV storage for frequently accessed data
8. **Add Rate Limiting**: Protect API endpoints
9. **Email Integration**: SendGrid/Mailgun for notifications
10. **Mobile App**: React Native mobile client

## 📖 Documentation

### For Developers
- [Hono Documentation](https://hono.dev/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Zod](https://zod.dev/)

### Project-Specific Docs
- All types: `src/types/index.ts`
- API routes: `src/routes/*`
- Validation schemas: `src/lib/validations.ts`
- i18n translations: `src/lib/i18n.ts`

## 🤝 Contributing

This is a template project. To extend:
1. Add new migrations in `migrations/`
2. Create new API routes in `src/routes/`
3. Add new pages in `src/pages/`
4. Update translations in `src/lib/i18n.ts`
5. Add new Zod schemas in `src/lib/validations.ts`

## 📄 License

This project is built for demonstration purposes.

---

**Built with ❤️ using Hono, Cloudflare Workers, and modern web technologies**
