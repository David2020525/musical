# Deployment Troubleshooting Guide

## Issue: GitHub Push Not Deploying to Cloudflare

### Step 1: Check GitHub Actions Status

1. Go to: `https://github.com/David2020525/musical/actions`
2. Look for the most recent workflow run
3. Check if it:
   - ✅ **Completed successfully** (green checkmark)
   - ❌ **Failed** (red X)
   - ⏳ **In progress** (yellow circle)
   - ⚪ **Not triggered** (no run visible)

### Step 2: If Workflow Didn't Run

**Check:**
- Did you push to the `main` branch? (not `master` or another branch)
- Is the workflow file present? Check: `.github/workflows/deploy-worker.yml`
- Are GitHub Actions enabled? Go to: Settings → Actions → General

**Fix:**
- Ensure you're pushing to `main` branch
- Verify the workflow file exists in the repository
- Enable GitHub Actions if disabled

### Step 3: If Workflow Failed

**Common Errors:**

#### Error: "CLOUDFLARE_API_TOKEN secret is not set"
**Solution:**
1. Go to: `https://github.com/David2020525/musical/settings/secrets/actions`
2. Click "New repository secret"
3. Name: `CLOUDFLARE_API_TOKEN`
4. Value: Your Cloudflare API token (get from Cloudflare Dashboard → My Profile → API Tokens)
5. Click "Add secret"

#### Error: "dist/_worker.js not found"
**Solution:**
- Check if `npm run build` is completing successfully
- Verify `vite.config.ts` is configured correctly
- Check build logs for TypeScript errors

#### Error: "Wrangler deployment failed"
**Solution:**
- Verify `wrangler.json` is valid JSON
- Check Cloudflare API token permissions (needs Workers:Edit)
- Ensure account has Workers access enabled

### Step 4: Manual Deployment (If Needed)

If GitHub Actions isn't working, deploy manually:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Cloudflare
npx wrangler deploy
```

### Step 5: Verify Deployment

After deployment, check:
1. **Cloudflare Dashboard**: Workers & Pages → musical → Deployments
2. **Worker URL**: `https://musical.david2020524.workers.dev`
3. **Test endpoint**: `https://musical.david2020524.workers.dev/api/health`

### Step 6: Force Re-deploy

If deployment seems stuck:
1. Go to GitHub Actions
2. Click "Deploy to Cloudflare Workers" workflow
3. Click "Run workflow" → "Run workflow" (manual trigger)

---

## Quick Checklist

- [ ] Pushed to `main` branch
- [ ] GitHub Actions workflow exists
- [ ] `CLOUDFLARE_API_TOKEN` secret is set
- [ ] Workflow ran (check Actions tab)
- [ ] Workflow completed successfully
- [ ] Worker URL shows updated content
- [ ] Deployment appears in Cloudflare Dashboard

---

## Still Not Working?

1. Check GitHub Actions logs for specific error messages
2. Verify Cloudflare API token is valid and has correct permissions
3. Try manual deployment to isolate the issue
4. Check Cloudflare Dashboard for deployment status
