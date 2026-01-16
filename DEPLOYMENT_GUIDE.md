# 🚀 MusicHub Production Deployment Guide

**Version**: 1.0.0  
**Platform**: Cloudflare Pages + Workers  
**Database**: Cloudflare D1  
**Storage**: Cloudflare R2

---

## 📋 Prerequisites

### Required Accounts
- ✅ Cloudflare account with Pages enabled
- ✅ GitHub repository (https://github.com/David2020525/musical.git)
- ⏳ Iyzico merchant account (for production payments)
- ⏳ Resend account (for production emails)

### Required Tools
- ✅ Node.js 18+ installed
- ✅ npm or yarn installed
- ✅ Wrangler CLI installed (`npm install -g wrangler`)
- ✅ Git configured

---

## 🔧 Step 1: Cloudflare Authentication

### Setup Cloudflare API Token

1. **Call the setup script:**
```bash
# This configures CLOUDFLARE_API_TOKEN from your Cloudflare account
# If not set up, you'll be guided to the Deploy tab
```

2. **Verify authentication:**
```bash
npx wrangler whoami
```

Expected output:
```
 ⛅️ wrangler 3.x.x
--------------------
Getting User settings...
👋 You are logged in with an API Token, associated with the email 'your-email@example.com'!
```

---

## 🗄️ Step 2: Production Database Setup

### Create Production D1 Database

**Note**: Database already exists with ID `873f8f65-474c-490c-81dc-6dabc303dadb`

Verify it exists:
```bash
npx wrangler d1 list
```

### Apply Migrations to Production

```bash
# Apply all migrations to production
npx wrangler d1 migrations apply music

# Verify migrations
npx wrangler d1 execute music --command="SELECT COUNT(*) FROM users;"
```

Expected output: Should return count of users (0 for fresh database, or seed data count)

### Optional: Load Seed Data

```bash
# Load seed data to production (for testing)
npx wrangler d1 execute music --file=./seed.sql
```

**⚠️ Warning:** Only load seed data if you want test accounts in production!

---

## 📦 Step 3: Cloudflare R2 Setup

### Verify R2 Bucket

Bucket already configured: `musichub-tracks`

```bash
# List R2 buckets
npx wrangler r2 bucket list

# Verify bucket exists
npx wrangler r2 bucket list | grep musichub-tracks
```

If bucket doesn't exist:
```bash
npx wrangler r2 bucket create musichub-tracks
```

---

## 🔐 Step 4: Configure Production Secrets

### Required Secrets

Set these using `wrangler secret put`:

```bash
# JWT Secret (generate a strong random secret)
npx wrangler pages secret put JWT_SECRET --project-name musichub
# Enter: your-super-secret-jwt-key-min-32-chars-random-string

# Iyzico Production Keys (get from Iyzico merchant panel)
npx wrangler pages secret put IYZICO_API_KEY --project-name musichub
# Enter: your-production-iyzico-api-key

npx wrangler pages secret put IYZICO_SECRET_KEY --project-name musichub
# Enter: your-production-iyzico-secret-key

# Resend Email API Key (get from Resend dashboard)
npx wrangler pages secret put RESEND_API_KEY --project-name musichub
# Enter: re_your-resend-api-key

npx wrangler pages secret put RESEND_FROM_EMAIL --project-name musichub
# Enter: noreply@yourdomain.com
```

### List Configured Secrets

```bash
npx wrangler pages secret list --project-name musichub
```

Expected output:
```
JWT_SECRET (set)
IYZICO_API_KEY (set)
IYZICO_SECRET_KEY (set)
RESEND_API_KEY (set)
RESEND_FROM_EMAIL (set)
```

---

## 🏗️ Step 5: Build for Production

### Update Environment Variables

Edit `wrangler.jsonc` to update production URLs:

```jsonc
{
  "vars": {
    "APP_URL": "https://your-production-domain.com",
    "IYZICO_BASE_URL": "https://api.iyzipay.com" // Production URL
  }
}
```

### Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

Expected output:
```
✓ 238 modules transformed.
dist/_worker.js  667.20 kB
✓ built in 2.5s
```

---

## 🚀 Step 6: Deploy to Cloudflare Pages

### Create Cloudflare Pages Project

If not created yet:
```bash
npx wrangler pages project create musichub \
  --production-branch main \
  --compatibility-date 2026-01-14
```

### Deploy to Production

```bash
# Deploy dist directory
npx wrangler pages deploy dist --project-name musichub
```

Expected output:
```
🌎 Deploying...
✨ Success! Uploaded 1 files
✅ Deployment complete!

URL: https://musichub-xxx.pages.dev
Production: https://musichub.pages.dev
```

### Verify Deployment

```bash
# Test the deployment
curl https://your-deployment-url.pages.dev/api/tracks
```

---

## 🔍 Step 7: Production Testing

### Test Checklist

#### 1. Health Check
```bash
curl https://your-domain.com/en
# Should return HTML page
```

#### 2. API Endpoints
```bash
# Test public endpoint
curl https://your-domain.com/api/tracks

# Test authentication
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

#### 3. Database Connection
```bash
# Should return track list from database
curl https://your-domain.com/api/tracks?limit=5
```

#### 4. File Upload (with auth token)
```bash
# Test R2 upload
curl -X POST https://your-domain.com/api/tracks/upload/cover \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@test-image.jpg"
```

#### 5. Email System
```bash
# Submit a producer application to trigger email
curl -X POST https://your-domain.com/api/producer/application \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

Check your email inbox for the notification.

---

## 🎛️ Step 8: Custom Domain (Optional)

### Add Custom Domain

1. Go to Cloudflare Pages dashboard
2. Select your project (musichub)
3. Go to "Custom domains"
4. Click "Set up a custom domain"
5. Enter your domain: `musichub.com`
6. Follow DNS configuration instructions

### Update APP_URL

After custom domain is configured:

```bash
npx wrangler pages secret put APP_URL --project-name musichub
# Enter: https://musichub.com
```

Redeploy:
```bash
npm run deploy
```

---

## 📊 Step 9: Monitoring & Logs

### View Deployment Logs

```bash
# View real-time logs
npx wrangler pages deployment tail --project-name musichub
```

### Check Analytics

Visit Cloudflare Pages dashboard:
- Request analytics
- Error rates
- Geographic distribution
- Performance metrics

---

## 🔒 Step 10: Security Checklist

### Production Security Review

- ✅ JWT_SECRET is strong and unique (min 32 chars)
- ✅ All secrets stored in Cloudflare (not in code)
- ✅ CORS configured properly
- ✅ Database using prepared statements (SQL injection safe)
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Rate limiting considered (implement if needed)
- ✅ Input validation on all endpoints (Zod schemas)
- ✅ RBAC enforced for protected routes

### Additional Security Measures

1. **Enable Cloudflare Bot Protection**
2. **Configure WAF Rules**
3. **Set up DDoS protection**
4. **Enable HTTPS only**
5. **Configure CSP headers**

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: Deployment fails with "Unknown binding"
**Solution:** Verify D1 database is bound in `wrangler.jsonc`

#### Issue: 500 errors on API calls
**Solution:** Check logs with `npx wrangler pages deployment tail`

#### Issue: Database queries failing
**Solution:** Ensure migrations are applied: `npx wrangler d1 migrations list music`

#### Issue: File uploads failing
**Solution:** Verify R2 bucket binding in `wrangler.jsonc`

#### Issue: Emails not sending
**Solution:** Verify `RESEND_API_KEY` is set and valid

---

## 📈 Performance Optimization

### Recommendations

1. **Enable Cloudflare Caching**
   - Cache static assets
   - Cache GET API responses (with proper TTL)

2. **Database Optimization**
   - Already have indexes (45+)
   - Monitor slow queries

3. **R2 Optimization**
   - Use CDN for file delivery
   - Set proper cache headers

4. **Bundle Optimization**
   - Already optimized (667KB worker)
   - Consider code splitting for larger apps

---

## 🔄 CI/CD Setup (Optional)

### GitHub Actions Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: musichub
          directory: dist
```

Set secrets in GitHub:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

---

## 📋 Post-Deployment Checklist

### Immediate Actions
- [ ] Test all API endpoints in production
- [ ] Verify database queries working
- [ ] Test file upload functionality
- [ ] Verify email sending works
- [ ] Test payment flow (with sandbox first)
- [ ] Check all authentication flows
- [ ] Monitor error rates

### Within 24 Hours
- [ ] Set up monitoring alerts
- [ ] Configure backups
- [ ] Review performance metrics
- [ ] Test with real users
- [ ] Switch Iyzico to production mode (when ready)

### Within 1 Week
- [ ] Implement rate limiting if needed
- [ ] Set up automated backups
- [ ] Configure CDN for R2 assets
- [ ] Performance optimization
- [ ] Security audit

---

## 📞 Support Resources

### Documentation
- Cloudflare Pages: https://developers.cloudflare.com/pages
- Cloudflare D1: https://developers.cloudflare.com/d1
- Cloudflare R2: https://developers.cloudflare.com/r2
- Wrangler CLI: https://developers.cloudflare.com/workers/wrangler

### Community
- Cloudflare Discord: https://discord.gg/cloudflaredev
- GitHub Issues: https://github.com/David2020525/musical/issues

---

## 🎉 Success!

Your MusicHub API is now live in production! 🚀

**Next Steps:**
1. Monitor the deployment for 24 hours
2. Test thoroughly with real users
3. Gather feedback and iterate
4. Plan next features

---

**Last Updated**: January 16, 2026  
**Version**: 1.0.0  
**Status**: Production Deployment Ready ✅
