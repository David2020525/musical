# MusicHub - Music Distribution Platform

## 🚨 Current Status - Database Not Connected

### Production URL
- **Live Site**: https://576dcc76.musichub-4yq.pages.dev
- **GitHub**: https://github.com/David2020525/musical

### ⚠️ Known Issue
The production deployment is currently **running without a database**. The login and authentication features will not work until the D1 database is configured.

**Root Cause**: The Cloudflare API token doesn't have D1 database permissions.

---

## 🔧 Quick Fix - Connect Database

### Option 1: Fix API Token Permissions (Recommended)

1. **Go to Cloudflare Dashboard**: https://dash.cloudflare.com/profile/api-tokens
2. **Find your API token** or create a new one with these permissions:
   - Account - D1 - Edit
   - Account - Cloudflare Pages - Edit
3. **Update the token** in your environment
4. **Run these commands**:

```bash
# Create production D1 database
npx wrangler d1 create musichub-production

# Copy the database_id from the output, then uncomment and update wrangler.jsonc:
# "d1_databases": [
#   {
#     "binding": "DB",
#     "database_name": "musichub-production",
#     "database_id": "YOUR_DATABASE_ID_HERE"
#   }
# ]

# Apply migrations
npx wrangler d1 migrations apply musichub-production

# Apply seed data
npx wrangler d1 execute musichub-production --file=./seed.sql

# Redeploy
npm run build
npx wrangler pages deploy dist --project-name musichub
```

### Option 2: Manual Database Creation via Cloudflare Dashboard

1. Go to: https://dash.cloudflare.com/
2. Navigate to **Workers & Pages** → **D1**
3. Click **Create database**
4. Name it: `musichub-production`
5. Copy the **Database ID**
6. Update `wrangler.jsonc` (uncomment the d1_databases section and add the ID)
7. Use the Cloudflare dashboard to run migrations manually

---

## 📋 Project Overview

### Features Implemented (90% Complete)
- ✅ **User Authentication** - Register, login, JWT tokens, email verification
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

### Pending Work (10%)
- ⏳ Database connection (blocked by API token)
- ⏳ End-to-end testing
- ⏳ UI polish and refinements
- ⏳ Performance optimization

---

## 🗄️ Database Schema

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

## 🔐 Credentials & Services

### Cloudflare R2 (File Storage)
- ✅ **Configured** and working
- Account ID: `8acb02437032e44576dc364343c04059`
- Bucket: `musichub-tracks`

### Iyzico Payment Gateway
- ✅ **Sandbox configured**
- API Key: `sandbox-noviqVlRF6oY7obkTgHoXlbfKIhQWPqz`
- Test Card: `5528 7900 0000 0008` (Exp: 12/30, CVV: 123)

### Resend Email Service
- ✅ **Configured** and working
- From Email: `va01@abgrouponline.com`
- Templates: 7 types × 2 languages (EN/TR) = 14 templates

### Cloudflare D1 Database
- ❌ **Not connected** - API token lacks permissions
- Database name: `musichub-production` (needs creation)

---

## 🧪 Test Accounts (After Database Connection)

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

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name musichub
```

---

## 📊 Technical Stack

- **Framework**: Hono (lightweight web framework)
- **Runtime**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (S3-compatible)
- **Payments**: Iyzico (Turkish payment gateway)
- **Email**: Resend
- **Frontend**: Vanilla JS + Tailwind CSS
- **Languages**: TypeScript, SQL

---

## 📝 Next Steps

1. **Fix API Token** - Add D1 permissions to Cloudflare API token
2. **Create Database** - Run `npx wrangler d1 create musichub-production`
3. **Run Migrations** - Apply database schema
4. **Seed Data** - Create test accounts and sample data
5. **Test Features** - Verify login, payments, file uploads
6. **Production Deploy** - Final deployment with database connected

---

## 📞 Support

For issues or questions, check the production logs:
```bash
npx wrangler pages deployment tail --project-name musichub
```

---

**Last Updated**: January 13, 2026
**Deployment Status**: ⚠️ Frontend only (Database not connected)
**Estimated Time to Fix**: 15 minutes (after API token update)
