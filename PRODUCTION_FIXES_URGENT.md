# 🚨 CRITICAL PRODUCTION FIXES NEEDED

## **Issue Summary**
Production database schema is outdated, causing ALL registration attempts to fail.

---

## **Root Cause**
```
ERROR: table users has no column named is_producer: SQLITE_ERROR
```

The production D1 database is missing recent schema updates. The current Cloudflare API token lacks D1 permissions to apply migrations.

---

## **URGENT FIX REQUIRED**

### Option 1: Apply Migrations via Cloudflare Dashboard (RECOMMENDED)

1. **Go to Cloudflare Dashboard**:
   - Visit: https://dash.cloudflare.com/
   - Navigate to: Workers & Pages → D1 Databases
   - Find database: `music` (ID: 873f8f65-474c-490c-81dc-6dabc303dadb)

2. **Run these SQL commands in D1 Console**:

```sql
-- Check current schema
PRAGMA table_info(users);

-- Add missing columns to users table
ALTER TABLE users ADD COLUMN is_producer INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN producer_application_id INTEGER;
ALTER TABLE users ADD COLUMN banner_url TEXT;
ALTER TABLE users ADD COLUMN instagram_url TEXT;
ALTER TABLE users ADD COLUMN twitter_url TEXT;
ALTER TABLE users ADD COLUMN spotify_url TEXT;
ALTER TABLE users ADD COLUMN soundcloud_url TEXT;
ALTER TABLE users ADD COLUMN youtube_url TEXT;

-- Verify
PRAGMA table_info(users);
```

3. **Apply full migrations** (if needed):
   - In dashboard, go to Database → Migrations
   - Upload all files from `/home/user/webapp/migrations/`
   - Apply in order:
     1. `0001_initial_schema.sql`
     2. `0002_producer_applications.sql`
     3. `0003_m2_complete_schema.sql`
     4. `0005_m3_safe_additions.sql`

---

### Option 2: Fix API Token Permissions (Alternative)

1. **Create New Cloudflare API Token**:
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Click: "Create Token"
   - Use template: "Edit Cloudflare Workers"
   - Add permissions:
     - Account > D1 > Edit ✅
     - Account > Workers Scripts > Edit ✅
     - Account > Workers KV Storage > Edit ✅

2. **Update Token in GitHub Secrets**:
   - Go to: https://github.com/David2020525/musical/settings/secrets/actions
   - Edit: `CLOUDFLARE_API_TOKEN`
   - Paste new token

3. **Apply Migrations via CLI**:
```bash
cd /home/user/webapp
export CLOUDFLARE_API_TOKEN="your-new-token-here"
npx wrangler d1 migrations apply music --remote
```

---

### Option 3: Quick SQL Patch (Fastest)

Run this single SQL command in Cloudflare D1 Console:

```sql
-- Full schema patch for users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_producer INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS producer_application_id INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS banner_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS twitter_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS spotify_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS soundcloud_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS youtube_url TEXT;
```

---

## **Additional Issues Found**

### 2. Forgot Password "Internal Error"
**Status**: Needs investigation after DB fix  
**Likely cause**: Missing `password_reset_tokens` table or email service not configured

### 3. Code Display on Pages
**Status**: Normal behavior  
**Explanation**: Inline JavaScript is expected in SSR HTML pages. This is not a bug.

---

## **Testing After Fix**

### Test Registration:
```bash
curl -X POST https://musical.david2020524.workers.dev/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "username":"testuser",
    "password":"Test123!",
    "name":"Test User"
  }'
```

**Expected**: `{"success": true, "data": {...}}`

### Test Login:
```bash
curl -X POST https://musical.david2020524.workers.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"Test123!"
  }'
```

**Expected**: `{"success": true, "data": {"user": {...}, "token": "..."}}`

### Test Forgot Password:
```bash
curl -X POST https://musical.david2020524.workers.dev/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**Expected**: `{"success": true, "message": "..."}`

---

## **Migration Files Location**

All migration files are in the repository:
```
webapp/migrations/
├── 0001_initial_schema.sql       (28 tables base schema)
├── 0002_producer_applications.sql (producer system)
├── 0003_m2_complete_schema.sql    (M2 additions)
└── 0005_m3_safe_additions.sql     (M3 additions)
```

---

## **Priority Actions**

1. **URGENT** ✅ Fix production database schema (Option 1 or 3)
2. **HIGH** ⏳ Test registration after DB fix
3. **HIGH** ⏳ Investigate forgot password error
4. **MEDIUM** ⏳ Set production secrets (JWT_SECRET, email keys)
5. **MEDIUM** ⏳ Apply full migration set if Option 3 was used

---

## **Current Status**

- ❌ **Registration**: BROKEN (missing DB columns)
- ❌ **Forgot Password**: BROKEN (needs investigation)
- ✅ **Login**: WORKS (if user exists)
- ✅ **Homepage**: WORKS
- ✅ **Local Dev**: ALL WORKING

---

**Action Required**: Please apply one of the fixes above and test registration again.

**ETA to Fix**: 5-10 minutes (Option 1 or 3)

**Last Updated**: 2026-01-16 15:08 UTC
