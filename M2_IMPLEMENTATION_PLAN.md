# MUSICAL M2 Implementation Plan

**Project**: MUSICAL Music Platform  
**Milestone**: M2 - Core Platform Features  
**Status**: Planning Phase  
**Created**: 2026-01-16

---

## 🎯 M2 Objectives

Transform MUSICAL from a frontend prototype into a **fully functional music platform** with:
- ✅ Real database backend (Cloudflare D1)
- ✅ User authentication & authorization
- ✅ Track upload & management system
- ✅ Payment processing (Iyzico/PayTR)
- ✅ File storage (Cloudflare R2)
- ✅ Email notifications
- ✅ Producer application workflow
- ✅ Wallet & withdrawal system

---

## 📊 Database Schema Design

### Technology Stack
- **Database**: Cloudflare D1 (SQLite-based, globally distributed)
- **ORM**: None (Direct SQL for performance)
- **Migrations**: Wrangler D1 migrations
- **Backup**: Automated D1 backups

### Core Entities

#### 1. **Users** Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'listener' CHECK(role IN ('listener', 'producer', 'admin')),
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'suspended', 'banned')),
  email_verified INTEGER DEFAULT 0,
  email_verification_token TEXT,
  password_reset_token TEXT,
  password_reset_expires INTEGER,
  avatar_url TEXT,
  bio TEXT,
  total_followers INTEGER DEFAULT 0,
  total_following INTEGER DEFAULT 0,
  total_plays INTEGER DEFAULT 0,
  locale TEXT DEFAULT 'en' CHECK(locale IN ('en', 'tr')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email_verified ON users(email_verified);
```

**Key Fields:**
- `role`: listener, producer, admin
- `email_verified`: 0 (pending) or 1 (verified)
- `locale`: User's preferred language

---

#### 2. **Producer Applications** Table
```sql
CREATE TABLE producer_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  real_name TEXT NOT NULL,
  turkish_id TEXT NOT NULL, -- TC Kimlik No
  phone TEXT NOT NULL,
  instagram_url TEXT,
  youtube_url TEXT,
  soundcloud_url TEXT,
  spotify_url TEXT,
  portfolio_url TEXT,
  sample_track_url TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  reviewed_by INTEGER, -- admin user_id
  reviewed_at DATETIME,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewed_by) REFERENCES users(id)
);

CREATE INDEX idx_producer_apps_user ON producer_applications(user_id);
CREATE INDEX idx_producer_apps_status ON producer_applications(status);
```

**Application Workflow:**
1. User submits application (status: pending)
2. Admin reviews (approve/reject with notes)
3. User role updated to 'producer' if approved
4. Email notification sent

---

#### 3. **Tracks** Table
```sql
CREATE TABLE tracks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  producer_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  genre TEXT NOT NULL,
  mood TEXT,
  bpm INTEGER,
  key TEXT,
  duration INTEGER NOT NULL, -- seconds
  audio_url TEXT NOT NULL, -- Full track on R2
  preview_url TEXT NOT NULL, -- 30s preview on R2
  cover_url TEXT NOT NULL, -- Cover artwork on R2
  waveform_url TEXT, -- Waveform visualization
  price REAL NOT NULL, -- Turkish Lira (TL)
  is_free INTEGER DEFAULT 0,
  tags TEXT, -- JSON array: ["electronic", "ambient"]
  total_plays INTEGER DEFAULT 0,
  total_likes INTEGER DEFAULT 0,
  total_purchases INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published', 'archived')),
  featured INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  published_at DATETIME,
  FOREIGN KEY (producer_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_tracks_producer ON tracks(producer_id);
CREATE INDEX idx_tracks_genre ON tracks(genre);
CREATE INDEX idx_tracks_status ON tracks(status);
CREATE INDEX idx_tracks_featured ON tracks(featured);
CREATE INDEX idx_tracks_published_at ON tracks(published_at);
CREATE INDEX idx_tracks_total_plays ON tracks(total_plays);
```

**File Storage (Cloudflare R2):**
- `audio_url`: Full track (up to 50MB)
- `preview_url`: 30-second auto-generated preview
- `cover_url`: Artwork (up to 5MB)
- `waveform_url`: SVG/JSON waveform data

---

#### 4. **Purchases** Table
```sql
CREATE TABLE purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  track_id INTEGER NOT NULL,
  amount REAL NOT NULL, -- Purchase price in TL
  platform_commission REAL NOT NULL, -- 15%
  producer_earnings REAL NOT NULL, -- 85%
  payment_method TEXT NOT NULL, -- 'iyzico' or 'paytr'
  payment_id TEXT NOT NULL, -- External payment ID
  payment_status TEXT DEFAULT 'pending' CHECK(
    payment_status IN ('pending', 'completed', 'failed', 'refunded')
  ),
  download_url TEXT, -- Signed R2 URL (expires in 1 hour)
  download_expires_at INTEGER,
  download_count INTEGER DEFAULT 0,
  purchased_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE
);

CREATE INDEX idx_purchases_user ON purchases(user_id);
CREATE INDEX idx_purchases_track ON purchases(track_id);
CREATE INDEX idx_purchases_status ON purchases(payment_status);
CREATE UNIQUE INDEX idx_purchases_unique ON purchases(user_id, track_id);
```

**Payment Flow:**
1. User clicks "Buy Now"
2. Purchase record created (status: pending)
3. Redirect to Iyzico/PayTR
4. Webhook updates status to 'completed'
5. Generate signed download URL
6. Email sent with download link

---

#### 5. **Wallets** Table
```sql
CREATE TABLE wallets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER UNIQUE NOT NULL,
  balance REAL DEFAULT 0, -- Available balance in TL
  total_earned REAL DEFAULT 0, -- Lifetime earnings
  total_withdrawn REAL DEFAULT 0, -- Total withdrawals
  pending_balance REAL DEFAULT 0, -- Pending from recent sales
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_wallets_user ON wallets(user_id);
```

**Wallet Logic:**
- Sales go to `pending_balance` (7-day hold)
- After 7 days, moved to `balance`
- Producers request withdrawals from `balance`

---

#### 6. **Transactions** Table
```sql
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wallet_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('earning', 'withdrawal', 'refund')),
  amount REAL NOT NULL,
  description TEXT,
  reference_id INTEGER, -- purchase_id or withdrawal_id
  status TEXT DEFAULT 'completed' CHECK(
    status IN ('pending', 'completed', 'failed')
  ),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE
);

CREATE INDEX idx_transactions_wallet ON transactions(wallet_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
```

---

#### 7. **Withdrawals** Table
```sql
CREATE TABLE withdrawals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  bank_name TEXT NOT NULL,
  bank_account_name TEXT NOT NULL,
  bank_iban TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(
    status IN ('pending', 'processing', 'completed', 'rejected')
  ),
  admin_notes TEXT,
  processed_by INTEGER, -- admin user_id
  requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  processed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (processed_by) REFERENCES users(id)
);

CREATE INDEX idx_withdrawals_user ON withdrawals(user_id);
CREATE INDEX idx_withdrawals_status ON withdrawals(status);
```

---

#### 8. **Likes** Table
```sql
CREATE TABLE likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  track_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE,
  UNIQUE(user_id, track_id)
);

CREATE INDEX idx_likes_user ON likes(user_id);
CREATE INDEX idx_likes_track ON likes(track_id);
```

---

#### 9. **Play History** Table
```sql
CREATE TABLE play_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  track_id INTEGER NOT NULL,
  played_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE
);

CREATE INDEX idx_play_history_user ON play_history(user_id);
CREATE INDEX idx_play_history_track ON play_history(track_id);
CREATE INDEX idx_play_history_played_at ON play_history(played_at);
```

---

#### 10. **Forum Posts** Table
```sql
CREATE TABLE forum_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned INTEGER DEFAULT 0,
  is_locked INTEGER DEFAULT 0,
  total_replies INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0,
  last_reply_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_forum_posts_user ON forum_posts(user_id);
CREATE INDEX idx_forum_posts_category ON forum_posts(category);
CREATE INDEX idx_forum_posts_pinned ON forum_posts(is_pinned);
CREATE INDEX idx_forum_posts_created_at ON forum_posts(created_at);
```

---

#### 11. **Forum Replies** Table
```sql
CREATE TABLE forum_replies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_forum_replies_post ON forum_replies(post_id);
CREATE INDEX idx_forum_replies_user ON forum_replies(user_id);
CREATE INDEX idx_forum_replies_created_at ON forum_replies(created_at);
```

---

#### 12. **Blog Posts** Table
```sql
CREATE TABLE blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image_url TEXT,
  category TEXT,
  tags TEXT, -- JSON array
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
  total_views INTEGER DEFAULT 0,
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
```

---

#### 13. **Followers** Table
```sql
CREATE TABLE followers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  follower_id INTEGER NOT NULL, -- User who follows
  following_id INTEGER NOT NULL, -- User being followed
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(follower_id, following_id)
);

CREATE INDEX idx_followers_follower ON followers(follower_id);
CREATE INDEX idx_followers_following ON followers(following_id);
```

---

### Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────┐
│                         MUSICHUB DATABASE                       │
└─────────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │    USERS     │
                    ├──────────────┤
                    │ id (PK)      │
                    │ username     │
                    │ email        │
                    │ role         │
                    │ status       │
                    └──────┬───────┘
                           │
          ┌────────────────┼────────────────────────────┐
          │                │                            │
          │                │                            │
    ┌─────▼───────┐  ┌────▼────────┐           ┌──────▼─────────┐
    │   TRACKS    │  │ PRODUCER    │           │   WALLETS      │
    ├─────────────┤  │ APPS        │           ├────────────────┤
    │ id (PK)     │  ├─────────────┤           │ id (PK)        │
    │ producer_id │  │ user_id (FK)│           │ user_id (FK)   │
    │ title       │  │ status      │           │ balance        │
    │ price       │  │ admin_notes │           │ total_earned   │
    └─────┬───────┘  └─────────────┘           └────────┬───────┘
          │                                              │
          │                                              │
    ┌─────▼───────┐                              ┌──────▼─────────┐
    │ PURCHASES   │                              │ TRANSACTIONS   │
    ├─────────────┤                              ├────────────────┤
    │ id (PK)     │                              │ wallet_id (FK) │
    │ user_id (FK)│                              │ type           │
    │ track_id    │                              │ amount         │
    │ amount      │                              └────────────────┘
    └─────────────┘
          │
    ┌─────▼───────┐
    │ WITHDRAWALS │
    ├─────────────┤
    │ user_id (FK)│
    │ amount      │
    │ status      │
    └─────────────┘

    ┌─────────────┐      ┌──────────────┐      ┌─────────────┐
    │ FORUM_POSTS │      │ FORUM_REPLIES│      │  BLOG_POSTS │
    ├─────────────┤      ├──────────────┤      ├─────────────┤
    │ user_id (FK)│◄─────┤ post_id (FK) │      │author_id(FK)│
    │ category    │      │ user_id (FK) │      │ slug        │
    └─────────────┘      └──────────────┘      └─────────────┘

    ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
    │   LIKES     │      │PLAY_HISTORY │      │  FOLLOWERS  │
    ├─────────────┤      ├─────────────┤      ├─────────────┤
    │ user_id (FK)│      │ user_id (FK)│      │follower_id  │
    │ track_id(FK)│      │ track_id(FK)│      │following_id │
    └─────────────┘      └─────────────┘      └─────────────┘
```

---

## 🔐 Authentication & Authorization

### JWT Token System

**Implementation:**
```typescript
// Generate JWT token
const token = await sign(
  {
    userId: user.id,
    email: user.email,
    role: user.role
  },
  c.env.JWT_SECRET,
  { expiresIn: '7d' }
)
```

**Token Storage:**
- Client: `localStorage.setItem('token', token)`
- HTTP-Only Cookie (optional): More secure

**Protected Routes:**
```typescript
// Middleware
async function authMiddleware(c, next) {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return c.json({ error: 'Unauthorized' }, 401)
  
  try {
    const payload = await verify(token, c.env.JWT_SECRET)
    c.set('user', payload)
    await next()
  } catch (err) {
    return c.json({ error: 'Invalid token' }, 401)
  }
}

// Usage
app.get('/api/me', authMiddleware, async (c) => {
  const user = c.get('user')
  return c.json({ user })
})
```

---

## 📁 File Upload Architecture (Cloudflare R2)

### Upload Flow

1. **Client-Side:**
   - User selects files (audio + cover)
   - Validate: Audio (50MB max), Cover (5MB max)
   - Show upload progress

2. **Server-Side:**
   - Generate unique filename: `${userId}_${timestamp}_${uuid}.mp3`
   - Upload to R2 bucket: `musichub-tracks`
   - Generate 30s preview using FFmpeg (Workers limitation: use external service)
   - Store URLs in database

3. **Preview Generation:**
   - Option A: Use external service (e.g., AWS Lambda)
   - Option B: Cloudflare Workers + FFmpeg WASM (experimental)
   - Option C: Client-side preview generation

### R2 Bucket Structure
```
musichub-tracks/
├── audio/
│   ├── full/
│   │   └── {userId}_{timestamp}_{uuid}.mp3
│   └── preview/
│       └── {userId}_{timestamp}_{uuid}_preview.mp3
├── covers/
│   └── {userId}_{timestamp}_{uuid}.jpg
└── waveforms/
    └── {userId}_{timestamp}_{uuid}.json
```

### Signed URLs for Downloads
```typescript
// Generate signed download URL (expires in 1 hour)
const downloadUrl = await generateSignedUrl(
  c.env.R2_BUCKET,
  audioKey,
  3600 // 1 hour
)
```

---

## 💳 Payment Integration (Iyzico)

### Iyzico Setup

**Why Iyzico:**
- Turkish market leader
- Supports Turkish Lira (TL)
- Credit/debit cards
- Installment options
- Easy integration

### Payment Flow

1. **Initiate Payment:**
```typescript
POST /api/payments/init
Body: { trackId, amount }

Response: { paymentPageUrl, token }
```

2. **User Redirected to Iyzico:**
   - Enters card details
   - Completes 3D Secure

3. **Webhook Callback:**
```typescript
POST /api/payments/webhook
Body: { status, token, paymentId, ... }

- Verify signature
- Update purchase status
- Credit producer wallet
- Send confirmation email
```

4. **Generate Download:**
   - Create signed R2 URL
   - Email to user
   - Update purchase record

### Commission Split
- **Platform**: 15% (0.15 * amount)
- **Producer**: 85% (0.85 * amount)

```sql
INSERT INTO purchases (
  user_id, track_id, amount,
  platform_commission, producer_earnings
) VALUES (
  ?, ?, ?,
  amount * 0.15,
  amount * 0.85
);
```

---

## 📧 Email Notifications

### Email Service: Resend (Recommended)

**Why Resend:**
- Modern API
- React Email templates
- Good deliverability
- Affordable pricing
- Vercel integration

### Email Templates Needed

1. **Welcome Email** (after registration)
2. **Email Verification** (with token link)
3. **Password Reset** (with token link)
4. **Producer Application Submitted** (confirmation)
5. **Producer Application Approved** (congratulations)
6. **Producer Application Rejected** (with admin notes)
7. **Track Uploaded** (confirmation to producer)
8. **Purchase Confirmation** (with download link)
9. **Producer Sale Notification** (you earned X TL)
10. **Withdrawal Requested** (confirmation)
11. **Withdrawal Processed** (money sent)
12. **Forum Reply** (someone replied to your post)

### Example: Purchase Confirmation
```typescript
await resend.emails.send({
  from: 'MUSICAL <noreply@musichub.com>',
  to: user.email,
  subject: locale === 'tr' 
    ? 'Satın Alma Onayı - MUSICAL'
    : 'Purchase Confirmation - MUSICAL',
  html: `
    <h1>${locale === 'tr' ? 'Teşekkürler!' : 'Thank You!'}</h1>
    <p>${track.title} ${locale === 'tr' ? 'satın aldınız' : 'purchased'}</p>
    <a href="${downloadUrl}">
      ${locale === 'tr' ? 'İndir' : 'Download'}
    </a>
  `
})
```

---

## 🔒 Security Considerations

### 1. **Input Validation**
```typescript
// Use Zod for validation
import { z } from 'zod'

const trackSchema = z.object({
  title: z.string().min(3).max(100),
  price: z.number().min(0).max(10000),
  genre: z.enum(['electronic', 'pop', 'hiphop', ...])
})
```

### 2. **SQL Injection Prevention**
```typescript
// ✅ CORRECT: Parameterized queries
db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first()

// ❌ WRONG: String concatenation
db.prepare(`SELECT * FROM users WHERE email = '${email}'`).first()
```

### 3. **Rate Limiting**
```typescript
// 100 requests per minute per IP
const rateLimiter = new RateLimiter({
  limit: 100,
  window: 60000 // 1 minute
})
```

### 4. **File Upload Validation**
```typescript
// Validate file type and size
const allowedAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/flac']
const maxAudioSize = 50 * 1024 * 1024 // 50MB

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp']
const maxImageSize = 5 * 1024 * 1024 // 5MB
```

### 5. **CORS Configuration**
```typescript
app.use('/*', cors({
  origin: ['https://musichub.com'],
  credentials: true
}))
```

### 6. **Environment Variables**
Never commit secrets! Use `.dev.vars` and `wrangler secret`:
```bash
# Development
echo "JWT_SECRET=your-secret-key" >> .dev.vars

# Production
wrangler secret put JWT_SECRET
wrangler secret put IYZICO_API_KEY
wrangler secret put RESEND_API_KEY
```

---

## 🛣️ API Endpoints Design

### Authentication (`/api/auth`)
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login
POST   /api/auth/logout            - Logout
POST   /api/auth/verify-email      - Verify email
POST   /api/auth/resend-verification - Resend verification
POST   /api/auth/forgot-password   - Request password reset
POST   /api/auth/reset-password    - Reset password
GET    /api/auth/me                - Get current user
```

### Users (`/api/users`)
```
GET    /api/users/:id              - Get user profile
PUT    /api/users/:id              - Update profile (auth)
GET    /api/users/:id/tracks       - Get user's tracks
GET    /api/users/:id/followers    - Get followers
POST   /api/users/:id/follow       - Follow user (auth)
DELETE /api/users/:id/follow       - Unfollow user (auth)
```

### Tracks (`/api/tracks`)
```
GET    /api/tracks                 - List tracks (paginated)
GET    /api/tracks/:id             - Get track details
POST   /api/tracks                 - Upload track (producer)
PUT    /api/tracks/:id             - Update track (producer)
DELETE /api/tracks/:id             - Delete track (producer)
POST   /api/tracks/:id/like        - Like track (auth)
DELETE /api/tracks/:id/like        - Unlike track (auth)
POST   /api/tracks/:id/play        - Record play
```

### Producer Applications (`/api/producer`)
```
POST   /api/producer/apply         - Submit application (auth)
GET    /api/producer/status        - Check application status (auth)
```

### Purchases & Payments (`/api/payments`)
```
POST   /api/payments/init          - Initiate payment (auth)
POST   /api/payments/webhook       - Payment webhook (Iyzico)
GET    /api/purchases              - List user purchases (auth)
GET    /api/purchases/:id/download - Get download URL (auth)
```

### Wallet (`/api/wallet`)
```
GET    /api/wallet                 - Get wallet balance (producer)
GET    /api/wallet/transactions    - List transactions (producer)
POST   /api/wallet/withdraw        - Request withdrawal (producer)
```

### Admin (`/api/admin`)
```
GET    /api/admin/stats            - Dashboard stats (admin)
GET    /api/admin/applications     - List producer apps (admin)
PUT    /api/admin/applications/:id - Approve/reject (admin)
GET    /api/admin/users            - List users (admin)
PUT    /api/admin/users/:id/role   - Update user role (admin)
DELETE /api/admin/users/:id        - Delete user (admin)
GET    /api/admin/withdrawals      - List withdrawals (admin)
PUT    /api/admin/withdrawals/:id  - Process withdrawal (admin)
```

### Forum (`/api/forum`)
```
GET    /api/forum/posts            - List posts
POST   /api/forum/posts            - Create post (auth)
GET    /api/forum/posts/:id        - Get post with replies
POST   /api/forum/posts/:id/reply  - Reply to post (auth)
PUT    /api/forum/posts/:id        - Edit post (auth)
DELETE /api/forum/posts/:id        - Delete post (auth/admin)
```

### Blog (`/api/blog`)
```
GET    /api/blog/posts             - List blog posts
GET    /api/blog/posts/:slug       - Get post by slug
POST   /api/blog/posts             - Create post (admin)
PUT    /api/blog/posts/:id         - Update post (admin)
DELETE /api/blog/posts/:id         - Delete post (admin)
```

---

## 📅 M2 Implementation Timeline

### Week 1-2: Database & Authentication (40 hours)
- [ ] Set up Cloudflare D1 database
- [ ] Create migration files
- [ ] Implement authentication (JWT)
- [ ] User registration & login
- [ ] Email verification system
- [ ] Password reset flow
- [ ] API endpoints: `/api/auth/*`

### Week 3: Producer Applications (15 hours)
- [ ] Producer application form backend
- [ ] Admin approval/rejection
- [ ] Email notifications
- [ ] API endpoints: `/api/producer/*`
- [ ] Admin endpoints: `/api/admin/applications/*`

### Week 4-5: Track Upload & Management (30 hours)
- [ ] Cloudflare R2 setup
- [ ] File upload API
- [ ] Preview generation
- [ ] Track CRUD operations
- [ ] Track listing & filtering
- [ ] Track detail page backend
- [ ] API endpoints: `/api/tracks/*`

### Week 6: Payment Integration (20 hours)
- [ ] Iyzico account setup
- [ ] Payment initiation
- [ ] Webhook handling
- [ ] Purchase records
- [ ] Download URL generation
- [ ] Email confirmations
- [ ] API endpoints: `/api/payments/*`

### Week 7: Wallet & Withdrawals (15 hours)
- [ ] Wallet system
- [ ] Transaction tracking
- [ ] Withdrawal requests
- [ ] Admin withdrawal processing
- [ ] Email notifications
- [ ] API endpoints: `/api/wallet/*`

### Week 8: Forum & Blog (10 hours)
- [ ] Forum posts & replies
- [ ] Blog post management
- [ ] Admin CMS
- [ ] API endpoints: `/api/forum/*`, `/api/blog/*`

### Week 9: Testing & Bug Fixes (20 hours)
- [ ] End-to-end testing
- [ ] Payment flow testing
- [ ] File upload testing
- [ ] Security audit
- [ ] Performance optimization

### Week 10: Polish & Launch (10 hours)
- [ ] Final UI adjustments
- [ ] Documentation updates
- [ ] Production deployment
- [ ] Monitoring setup

**Total Estimated Time: 160 hours (4 weeks full-time or 8 weeks part-time)**

---

## 🎯 Success Criteria

### Functional Requirements
- ✅ Users can register, login, verify email
- ✅ Producers can apply and get approved
- ✅ Producers can upload tracks with metadata
- ✅ Users can browse, search, and filter tracks
- ✅ Users can purchase tracks with Iyzico
- ✅ Users receive download links via email
- ✅ Producers see earnings in wallet
- ✅ Producers can request withdrawals
- ✅ Admins can manage applications & withdrawals
- ✅ Forum posts and replies work
- ✅ Blog posts can be created/edited

### Non-Functional Requirements
- ✅ API response time < 200ms (average)
- ✅ File uploads < 30s (50MB files)
- ✅ 99.9% uptime
- ✅ Secure (HTTPS, JWT, rate limiting)
- ✅ Scalable (handles 1000+ concurrent users)

---

## 🔄 Migration Strategy

### From Prototype to Production

1. **Phase 1: Set up D1 database**
   - Create production database
   - Run migrations
   - Seed initial data (test users, genres, categories)

2. **Phase 2: Deploy API endpoints**
   - Deploy authentication
   - Test with frontend
   - Gradual rollout

3. **Phase 3: Enable payments**
   - Test in Iyzico sandbox
   - Switch to production
   - Monitor transactions

4. **Phase 4: Enable uploads**
   - Set up R2 buckets
   - Test upload flow
   - Monitor storage usage

---

## 📚 Documentation Needed

- [ ] API documentation (OpenAPI/Swagger)
- [ ] Database schema documentation
- [ ] Payment integration guide
- [ ] File upload guide
- [ ] Admin user guide
- [ ] Producer user guide
- [ ] Deployment guide

---

## 🚀 Next Steps

1. **Review this plan** with stakeholders
2. **Set up development environment** (D1, R2, etc.)
3. **Start Week 1 tasks** (Database & Authentication)
4. **Create API documentation** template
5. **Set up testing framework**

---

**Status**: ✅ Planning Complete - Ready for Implementation!  
**Next Document**: `M2_WEEK1_IMPLEMENTATION.md`
