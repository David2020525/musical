# How to Check Cloudflare Workers Logs

## Step-by-Step Guide

### 1. Check if Secrets are Set

In the Cloudflare Dashboard:
- Go to **Workers & Pages** → **musical** → **Settings** tab
- Scroll to **"Variables and Secrets"** section
- Look for these entries in the table:
  - `IYZICO_API_KEY` (Type should be "Secret")
  - `IYZICO_SECRET_KEY` (Type should be "Secret")

**Important:** If you don't see these two entries, they're not set. You need to:
1. Click **"+ Add"** button
2. Select **"Secret"** as the type (not "Plain text")
3. Enter the name: `IYZICO_API_KEY`
4. Enter the value: `sandbox-noviqVlRF6oY7obkTgHoXlbfKIhQWPqz`
5. Click **Save**
6. Repeat for `IYZICO_SECRET_KEY` with value: `sandbox-lFRZTg7O0MK8q7svquRoJfdXyKt9MPAI`

### 2. View Real-Time Logs

**Method 1: Real-Time Logs (Easiest)**
1. Go to **Workers & Pages** → **musical**
2. Click the **"Logs"** tab (next to Settings)
3. Click **"Start streaming"** or **"View logs"**
4. Try purchasing a track in your browser
5. Watch the logs appear in real-time

**Method 2: Observability Tab**
1. Go to **Workers & Pages** → **musical**
2. Click the **"Observability"** tab
3. Click **"Logs"** in the left sidebar
4. You'll see logs from your worker

### 3. What to Look For

When you try to purchase, look for these log messages:
- `"Iyzico Environment Check:"` - Shows if keys are being read
- `"Payment checkout - Environment check:"` - Shows environment access
- `"Initializing Iyzico checkout with request:"` - Shows the payment request
- `"Iyzico API error response:"` - Shows the actual error from Iyzico

### 4. About the Red Box

The red box you saw is just a suggestion to update your local `wrangler.jsonc` file to match the dashboard settings. It's not critical - it just helps keep local development in sync. You can:
- Click **"Cancel"** to ignore it
- Or click **"Deploy"** if you want to sync the settings

### 5. After Setting Secrets

**Important:** After adding secrets in the Dashboard:
1. The worker will automatically redeploy
2. Wait 1-2 minutes for the deployment to complete
3. Then try purchasing again
4. Check the logs to see if the keys are being read

## Troubleshooting

**If secrets don't appear in the list:**
- Make sure you selected **"Secret"** type, not "Plain text"
- Refresh the page and check again
- Make sure you clicked "Save" after entering each secret

**If logs don't show up:**
- Make sure "Include Invocation logs" is checked (you already have this enabled)
- Try the purchase again to generate new logs
- Check the "Observability" → "Logs" tab instead

**If you still see "Invalid signature":**
- Check the logs to see if `hasApiKey: false` or `hasSecretKey: false`
- If false, the secrets aren't being read - verify they're set correctly
- If true but still failing, the issue is with the signature format itself
