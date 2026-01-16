# M3 Production Deployment Checklist

## ⚠️ Prerequisites
Before deploying to production, you need to configure your **Cloudflare API Key**:
1. Go to **Deploy** tab in the sidebar
2. Create a Cloudflare API token with the following permissions:
   - Account > D1 > Edit
   - Account > Cloudflare Pages > Edit
   - Account > R2 Storage > Edit
3. Save the API key in the Deploy tab

---

## 🚀 Deployment Steps

### Step 1: Verify Cloudflare Authentication
```bash
cd /home/user/webapp
npx wrangler whoami
```
**Expected**: Should show your account email and account ID

---

### Step 2: Create/Verify R2 Bucket for Track Uploads
```bash
# Check if bucket exists
npx wrangler r2 bucket list

# If "musical-tracks" doesn't exist, create it:
npx wrangler r2 bucket create musical-tracks
```

---

### Step 3: Apply D1 Database Migrations to Production
```bash
# Apply all migrations to production database
npx wrangler d1 migrations apply music

# Verify tables created
npx wrangler d1 execute music --command="SELECT name FROM sqlite_master WHERE type='table';"
```

**Expected**: Should create all 28 tables (users, tracks, purchases, producer_applications, etc.)

---

### Step 4: Seed Production Database (Optional)
```bash
# Run seed script for test data
npx wrangler d1 execute music --file=./seed.sql
```

**Note**: Only if you want test users/tracks in production. Skip for clean production start.

---

### Step 5: Configure Production Secrets
Set these environment variables in Cloudflare Pages dashboard or via CLI:

```bash
# JWT Secret (generate a random 32-character string)
npx wrangler pages secret put JWT_SECRET --project-name musical

# Iyzico Payment Gateway (get from https://sandbox-merchant.iyzipay.com)
npx wrangler pages secret put IYZICO_API_KEY --project-name musical
npx wrangler pages secret put IYZICO_SECRET_KEY --project-name musical

# Resend Email Service (get from https://resend.com/api-keys)
npx wrangler pages secret put RESEND_API_KEY --project-name musical

# R2 Storage (already configured in wrangler.jsonc)
# R2_ACCOUNT_ID, R2_BUCKET_NAME, R2_PUBLIC_URL are in vars
```

**Example JWT_SECRET generation**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Step 6: Build and Deploy to Cloudflare Pages
```bash
# Build production bundle
npm run build

# Deploy to Cloudflare Pages (production)
npx wrangler pages deploy dist --project-name musical --branch main

# Alternative: Use npm script
npm run deploy:prod
```

**Expected Output**:
```
✨ Success! Uploaded 15 files
✨ Deployment complete! Take a peek over at https://musical.pages.dev
```

---

### Step 7: Update Production URL in wrangler.jsonc
After deployment, Cloudflare gives you a URL like `https://musical.pages.dev` or `https://[hash].musical.pages.dev`.

Update `wrangler.jsonc`:
```jsonc
"vars": {
  "APP_URL": "https://your-actual-production-url.pages.dev",
  ...
}
```

Then redeploy:
```bash
npm run build
npx wrangler pages deploy dist --project-name musical
```

---

### Step 8: Test Production Endpoints

#### 8.1 Test Authentication
```bash
PROD_URL="https://musical.pages.dev"

# Register a new user
curl -X POST "$PROD_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "Password123!",
    "name": "Test User"
  }'

# Login
curl -X POST "$PROD_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!"
  }'
```

**Expected**: Should return `success: true` with user data and JWT token

---

#### 8.2 Test Producer Application
```bash
# Get token from login response
TOKEN="your-jwt-token-here"

# Submit producer application
curl -X POST "$PROD_URL/api/producer/application" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "real_name": "John Producer",
    "turkish_id": "11111111110",
    "phone": "05551234567",
    "instagram_url": "https://instagram.com/johnproducer",
    "portfolio_url": "https://soundcloud.com/johnproducer"
  }'
```

---

#### 8.3 Test Track Upload (for producers)
```bash
# Upload track audio to R2
curl -X POST "$PROD_URL/api/tracks" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Track",
    "genre": "Electronic",
    "price": 29.99,
    "audio_url": "https://example.com/track.mp3",
    "cover_url": "https://example.com/cover.jpg"
  }'
```

---

#### 8.4 Test Wallet
```bash
# Get wallet balance
curl "$PROD_URL/api/wallet" \
  -H "Authorization: Bearer $TOKEN"
```

---

### Step 9: Monitor and Debug
```bash
# View deployment logs
npx wrangler pages deployment tail --project-name musical

# Check D1 database
npx wrangler d1 execute music --command="SELECT COUNT(*) FROM users;"
```

---

## 🔒 Production Security Checklist
- [ ] JWT_SECRET is strong random string (32+ characters)
- [ ] Iyzico credentials are **production** keys (not sandbox)
- [ ] Resend API key is configured
- [ ] R2 bucket has proper CORS settings
- [ ] Database migrations applied successfully
- [ ] No test/debug code in production build
- [ ] All API endpoints require authentication
- [ ] Rate limiting configured (optional)

---

## 📊 Success Criteria
- ✅ Production URL accessible: `https://musical.pages.dev`
- ✅ User registration works
- ✅ User login returns JWT token
- ✅ Producer application submission works
- ✅ Email notifications sent (verification, producer status)
- ✅ Track upload to R2 works
- ✅ Payment checkout redirects to Iyzico
- ✅ Wallet balance displays correctly

---

## 🐛 Troubleshooting

### Issue: "Authentication error [code: 10000]"
**Solution**: Your Cloudflare API token lacks permissions. Create a new token with:
- D1 Edit, Pages Edit, R2 Edit permissions

### Issue: "R2 bucket not found"
**Solution**: Create the bucket manually:
```bash
npx wrangler r2 bucket create musical-tracks
```

### Issue: "Database table not found"
**Solution**: Migrations not applied. Run:
```bash
npx wrangler d1 migrations apply music
```

### Issue: "Email not sending"
**Solution**: Check Resend API key:
```bash
npx wrangler pages secret list --project-name musical
```

---

## 📝 Post-Deployment Tasks
1. Update `README.md` with production URL
2. Create first admin user manually in database
3. Test complete purchase flow (register → login → buy track → download)
4. Monitor error logs for 24 hours
5. Set up custom domain (optional): `npx wrangler pages domain add yourdomain.com`

---

## 🎉 Deployment Complete!
Once all steps are done, your MUSICAL platform will be live at:
- **Production**: https://musical.pages.dev
- **GitHub**: https://github.com/David2020525/musical
- **Admin Panel**: https://musical.pages.dev/en/admin
- **API Docs**: [See API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

**Last Updated**: 2026-01-16
**M3 Status**: Ready for deployment (pending Cloudflare API key configuration)
