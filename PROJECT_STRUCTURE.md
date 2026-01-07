# MusicHub - Complete Project Structure

## 📁 File Tree

```
webapp/
├── .git/                           # Git repository
├── .gitignore                      # Git ignore patterns
├── .eslintrc.json                  # ESLint configuration
├── .prettierrc.json                # Prettier configuration
├── .prettierignore                 # Prettier ignore patterns
│
├── package.json                    # Dependencies and scripts
├── package-lock.json               # Locked dependencies
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
├── wrangler.jsonc                  # Cloudflare Workers config
├── ecosystem.config.cjs            # PM2 process manager config
│
├── README.md                       # Main documentation
├── PROJECT_STRUCTURE.md            # This file
│
├── migrations/                     # Database migrations
│   └── 0001_initial_schema.sql    # Initial database schema
│
├── seed.sql                        # Sample data for development
│
├── public/                         # Static assets
│   └── static/
│       ├── style.css              # Custom styles
│       ├── app.tsx                # Client-side React app (for reference)
│       └── client.html            # Alternative client implementation
│
├── src/                            # Source code
│   ├── index.tsx                  # Main Hono app entry point
│   ├── renderer.tsx               # HTML page renderer
│   │
│   ├── types/                     # TypeScript type definitions
│   │   └── index.ts               # All type definitions
│   │
│   ├── lib/                       # Utility libraries
│   │   ├── auth.ts                # JWT authentication utilities
│   │   ├── i18n.ts                # Internationalization (TR/EN)
│   │   └── validations.ts         # Zod validation schemas
│   │
│   ├── store/                     # State management
│   │   └── index.ts               # Zustand stores (auth, locale, UI)
│   │
│   ├── routes/                    # API route handlers
│   │   ├── auth.ts                # Authentication endpoints
│   │   ├── tracks.ts              # Music tracks endpoints
│   │   ├── blog.ts                # Blog posts endpoints
│   │   └── forum.ts               # Forum endpoints
│   │
│   ├── components/                # Reusable components
│   │   └── Layout.tsx             # Main layout with nav and footer
│   │
│   └── pages/                     # Page components
│       ├── Home.tsx               # Landing page
│       ├── Browse.tsx             # Music catalog browser
│       ├── Login.tsx              # Login page
│       ├── Forum.tsx              # Forum listing
│       ├── Blog.tsx               # Blog listing
│       ├── Dashboard.tsx          # User dashboard
│       └── Admin.tsx              # Admin panel
│
└── dist/                           # Build output (generated)
    ├── _worker.js                 # Compiled Cloudflare Worker
    ├── _routes.json               # Routing configuration
    └── static/                    # Static assets
```

## 🗂️ Key File Descriptions

### Configuration Files

**package.json**
- Project metadata and dependencies
- Custom scripts for dev, build, deploy, and database management
- Dependencies: hono, zustand, zod, react-hook-form, bcryptjs, jose

**wrangler.jsonc**
- Cloudflare Workers configuration
- D1 database binding configuration
- Compatibility settings

**tsconfig.json**
- TypeScript compiler options
- Module resolution settings

**vite.config.ts**
- Vite build configuration
- Hono Cloudflare Pages plugin

**ecosystem.config.cjs**
- PM2 process manager configuration
- Wrangler dev server settings

### Source Code

**src/index.tsx**
- Main Hono application
- API route mounting
- Page rendering logic
- Internationalization routing

**src/types/index.ts**
- User, Session, Track types
- Blog, Forum, Category types
- API response types
- Cloudflare bindings

**src/lib/auth.ts**
- JWT token creation and verification
- Password hashing utilities
- Role-based access control helpers

**src/lib/i18n.ts**
- Translation dictionaries (EN/TR)
- Locale detection and path helpers
- Translation function

**src/lib/validations.ts**
- Zod schemas for forms
- Login, register, blog, forum validations
- Type exports for TypeScript

**src/store/index.ts**
- Zustand stores with persistence
- Auth store (user, token)
- Locale store (language preference)
- UI store (sidebar state)

### API Routes

**src/routes/auth.ts**
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/auth/me - Get current user

**src/routes/tracks.ts**
- GET /api/tracks - List tracks (with filters)
- GET /api/tracks/:id - Get single track
- GET /api/tracks/genres/list - List genres

**src/routes/blog.ts**
- GET /api/blog - List blog posts
- GET /api/blog/:slug - Get post by slug

**src/routes/forum.ts**
- GET /api/forum/categories - List categories
- GET /api/forum/topics - List topics
- GET /api/forum/topics/:slug - Get topic with replies

### Database

**migrations/0001_initial_schema.sql**
- Creates all database tables
- Adds indexes for performance
- Sets up foreign key relationships

**seed.sql**
- Sample users (admin, user, moderator)
- Sample tracks across genres
- Forum categories and topics
- Blog posts

## 🎯 Code Organization Principles

### 1. Separation of Concerns
- **Routes**: Handle HTTP requests/responses
- **Lib**: Reusable utilities and business logic
- **Types**: Centralized type definitions
- **Store**: Client-side state management
- **Pages**: UI components

### 2. Type Safety
- All functions have proper TypeScript types
- Zod for runtime validation
- Cloudflare bindings typed

### 3. Modularity
- Each route in separate file
- Reusable validation schemas
- Shared components

### 4. Scalability
- Database migrations for schema evolution
- API versioning ready
- Modular route structure

## 🔄 Data Flow

### Request Flow
1. Client makes request to `/en/browse`
2. Hono routes to main handler
3. Locale extracted from URL path
4. HTML rendered with translations
5. API calls made from client-side

### API Request Flow
1. Client calls `/api/tracks`
2. CORS middleware applied
3. Route handler executes
4. D1 database queried
5. JSON response returned

### Authentication Flow
1. User submits login form
2. POST to `/api/auth/login`
3. Password verified with bcrypt
4. JWT token created
5. Token returned to client
6. Zustand store updated
7. Token used in subsequent requests

## 📊 Database Schema Summary

### Core Tables
- **users**: User accounts with roles
- **sessions**: Active JWT sessions
- **tracks**: Music catalog
- **blog_posts**: Blog content
- **forum_categories**: Forum organization
- **forum_topics**: Discussion threads
- **forum_replies**: Topic responses
- **user_track_likes**: User preferences

### Relationships
- Users → Blog Posts (author)
- Users → Forum Topics (author)
- Users → Forum Replies (author)
- Topics → Categories (category)
- Replies → Topics (parent)
- Likes → Users + Tracks (many-to-many)

## 🌐 URL Structure

### Public Routes
- `/` → Redirect to `/en`
- `/en` → English home page
- `/tr` → Turkish home page
- `/en/browse` → Browse tracks (EN)
- `/tr/browse` → Browse tracks (TR)
- `/en/forum` → Forum (EN)
- `/tr/forum` → Forum (TR)
- `/en/blog` → Blog (EN)
- `/tr/blog` → Blog (TR)

### Protected Routes
- `/en/dashboard` → User dashboard
- `/en/admin` → Admin panel (admin only)

### API Routes
- `/api/auth/*` → Authentication
- `/api/tracks/*` → Music tracks
- `/api/blog/*` → Blog posts
- `/api/forum/*` → Forum content

## 🔐 Security Features

1. **Password Security**: bcrypt hashing
2. **JWT Tokens**: Signed with HS256
3. **CORS**: Configured for API routes
4. **Input Validation**: Zod schemas
5. **SQL Injection**: Prepared statements
6. **Role-Based Access**: Admin/moderator/user roles

## 🚀 Performance Optimizations

1. **Edge Computing**: Cloudflare Workers
2. **Database Indexes**: All foreign keys indexed
3. **CDN Assets**: TailwindCSS, FontAwesome via CDN
4. **Lazy Loading**: Page-based code splitting ready
5. **Caching**: LocalStorage for auth/locale

## 📦 Dependencies Overview

### Production
- **hono**: Web framework
- **zustand**: State management
- **zod**: Schema validation
- **react-hook-form**: Form handling
- **bcryptjs**: Password hashing
- **jose**: JWT operations

### Development
- **typescript**: Type checking
- **vite**: Build tool
- **wrangler**: Cloudflare CLI
- **eslint**: Code linting
- **prettier**: Code formatting

## 🎨 Styling Approach

- **Framework**: TailwindCSS (via CDN)
- **Methodology**: Utility-first CSS
- **Theme**: Gray/Indigo palette
- **Icons**: Font Awesome
- **Responsive**: Mobile-first breakpoints

---

This structure provides a solid foundation for a production-ready music community platform. All code is modular, typed, and ready for extension.
