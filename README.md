# MUSICAL - Music Distribution Platform

## ✅ Status: FULLY OPERATIONAL

### Production URLs
- **Live Site**: https://musical.david2020524.workers.dev
- **Login**: https://musical.david2020524.workers.dev/en/login
- **GitHub**: https://github.com/David2020525/musical

---

## 🚀 Quick Start

### Test Accounts
```
Admin Account:
Email: david2020524@gmail.com
Password: password123

Producer Account:
Email: producer@musichub.com
Password: password123

Listener Account:
Email: user@musichub.com
Password: password123
```

---

## 📋 Project Overview

### Features Implemented
- ✅ **User Authentication** - SHA-256 password hashing, JWT tokens, register/login
- ✅ **Producer System** - Application workflow, approval process, dashboard
- ✅ **Payment Integration** - Iyzico sandbox, checkout, commission splits (15%/85%)
- ✅ **File Storage** - Cloudflare R2 for audio files and cover images
- ✅ **Wallet System** - Balance tracking, earnings history, transaction logs
- ✅ **Withdrawal System** - Request withdrawals, bank details, admin approval
- ✅ **Track Management** - Upload, browse, purchase, download
- ✅ **Admin Panel** - User management, transactions, revenue tracking
- ✅ **Forum** - Topics, replies, likes, categories
- ✅ **Search** - Global search across tracks and forum posts
- ✅ **Email Notifications** - Bilingual (EN/TR) templates via Resend
- ✅ **Security** - Rate limiting, input validation, CSRF protection
- ✅ **Auto-Deployment** - GitHub Actions → Cloudflare Workers on every push

---

## 🗄️ Database

### Cloudflare D1 Database
- **Status**: ✅ Connected
- **Database Name**: `music`
- **Database ID**: `873f8f65-474c-490c-81dc-6dabc303dadb`
- **Current Users**: 4 (3 test accounts + 1 registered user)

### Core Tables
- `users` - User accounts with roles (admin, producer, listener)
- `sessions` - JWT authentication tokens
- `tracks` - Music tracks with metadata
- `purchases` - Track purchase records
- `wallets` - User wallet balances
- `transactions` - Financial transaction history
- `withdrawals` - Withdrawal requests
- `producer_applications` - Producer approval workflow
- `blog_posts` - Blog/news content
- `forum_categories` - Forum organization
- `forum_topics` - Forum discussions
- `forum_replies` - Forum responses
- `email_verifications` - Email verification tokens
- `password_resets` - Password reset tokens

---

## 🔐 Services Configuration

### Cloudflare R2 (File Storage)
- ✅ **Configured** and working
- Account ID: `8acb02437032e44576dc364343c04059`
- Bucket: `musichub-tracks`
- Public URL: `https://8acb02437032e44576dc364343c04059.r2.cloudflarestorage.com`

### Iyzico Payment Gateway
- ✅ **Sandbox configured**
- Base URL: `https://sandbox-api.iyzipay.com`
- Test Card: `5528 7900 0000 0008` (Exp: 12/30, CVV: 123)

### Resend Email Service
- ✅ **Configured** and working
- From Email: `va01@abgrouponline.com`
- Templates: 7 types × 2 languages (EN/TR) = 14 templates

---

## 🚀 Deployment Pipeline

### GitHub Actions Workflow
- **Trigger**: Every push to `main` branch
- **Build Time**: ~2-3 minutes
- **Auto-Deploy**: Yes, to Cloudflare Workers
- **Workflow File**: `.github/workflows/deploy-worker.yml`

### Manual Deployment
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Cloudflare
npx wrangler deploy
```

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server (sandbox/local machine)
npm run dev

# Build for production
npm run build

# Test deployment locally
npx wrangler pages dev dist --d1=music --local
```

---

## 📊 Technical Stack

- **Framework**: Hono (lightweight web framework for Cloudflare Workers)
- **Runtime**: Cloudflare Workers (edge computing)
- **Database**: Cloudflare D1 (SQLite, globally distributed)
- **Storage**: Cloudflare R2 (S3-compatible object storage)
- **Payments**: Iyzico (Turkish payment gateway)
- **Email**: Resend (transactional email service)
- **Frontend**: Vanilla JS + Tailwind CSS (CDN)
- **Languages**: TypeScript, SQL
- **CI/CD**: GitHub Actions

---

## 🔧 Database Commands

```bash
# Query production database
npx wrangler d1 execute music --remote --command="SELECT * FROM users"

# Query local database
npx wrangler d1 execute music --local --command="SELECT * FROM users"

# Apply migrations to production
npx wrangler d1 migrations apply music --remote

# Apply migrations to local
npx wrangler d1 migrations apply music --local

# Seed database
npx wrangler d1 execute music --remote --file=./seed.sql
```

---

## 📝 Project Structure

```
musical/
├── .github/
│   └── workflows/
│       └── deploy-worker.yml    # GitHub Actions deployment
├── dist/                        # Build output (auto-generated)
│   ├── _worker.js              # Compiled worker script
│   └── static/                 # Static assets
├── migrations/                  # D1 database migrations
├── public/                      # Static assets source
│   └── static/
├── src/                        # Source code
│   ├── index.tsx               # Main entry point
│   ├── routes/                 # API route handlers
│   └── types/                  # TypeScript definitions
├── .env                        # Local environment variables
├── .env.example                # Example environment file
├── ecosystem.config.cjs        # PM2 config (for sandbox dev)
├── package.json                # Dependencies and scripts
├── seed.sql                    # Database seed data
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
├── wrangler.json               # Cloudflare Workers config (JSON)
└── wrangler.jsonc              # Cloudflare Workers config (JSONC with comments)
```

---

## 📞 Support & Monitoring

### View Deployment Logs
```bash
# Tail live logs
npx wrangler tail musical

# View deployment list
npx wrangler deployments list
```

### Test API Endpoints
```bash
# Test login
curl -X POST https://musical.david2020524.workers.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"david2020524@gmail.com","password":"password123"}'

# Test registration
curl -X POST https://musical.david2020524.workers.dev/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"testpass123","name":"Test User"}'
```

---

## 🎯 Key Achievements

1. ✅ **SHA-256 Migration Complete** - All 3 test users migrated and verified
2. ✅ **Login/Authentication Working** - Tested with multiple accounts
3. ✅ **Registration Working** - New users can sign up successfully
4. ✅ **D1 Database Connected** - Production database fully operational
5. ✅ **Auto-Deployment Pipeline** - GitHub → Cloudflare Workers automated
6. ✅ **Clean Repository** - All temporary files and .MD docs removed

---

**Last Updated**: January 15, 2026  
**Deployment Status**: ✅ FULLY OPERATIONAL  
**Authentication**: ✅ Working with SHA-256  
**Database**: ✅ Connected and populated
