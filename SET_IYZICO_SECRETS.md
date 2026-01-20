# How to Set Iyzico API Keys in Cloudflare Workers

## Option 1: Using Wrangler CLI (Recommended)

Open your terminal/command prompt in the project directory (`C:\Users\Tiger\Desktop\musical`) and run these commands:

### Step 1: Set the API Key
```bash
npx wrangler secret put IYZICO_API_KEY
```
When prompted, paste: `sandbox-noviqVlRF6oY7obkTgHoXlbfKIhQWPqz`

### Step 2: Set the Secret Key
```bash
npx wrangler secret put IYZICO_SECRET_KEY
```
When prompted, paste: `sandbox-lFRZTg7O0MK8q7svquRoJfdXyKt9MPAI`

### Step 3: Verify the secrets are set
```bash
npx wrangler secret list
```

### Step 4: Redeploy your worker
```bash
npm run deploy
```
or
```bash
npx wrangler deploy
```

## Option 2: Using Cloudflare Dashboard

1. Go to https://dash.cloudflare.com/
2. Select your account
3. Go to **Workers & Pages** in the left sidebar
4. Click on your worker name: **musical**
5. Go to **Settings** tab
6. Scroll down to **Environment Variables** section
7. Click **Add variable** for each:
   - **Variable name**: `IYZICO_API_KEY`
   - **Value**: `sandbox-noviqVlRF6oY7obkTgHoXlbfKIhQWPqz`
   - **Type**: Secret (encrypted)
   
   - **Variable name**: `IYZICO_SECRET_KEY`
   - **Value**: `sandbox-lFRZTg7O0MK8q7svquRoJfdXyKt9MPAI`
   - **Type**: Secret (encrypted)

8. Click **Save**
9. The worker will automatically redeploy

## Important Notes

- Secrets are encrypted and only visible when set, not when retrieved
- After setting secrets, your worker needs to be redeployed for changes to take effect
- These are **sandbox** keys for testing. For production, get keys from https://merchant.iyzipay.com
- Never commit secrets to git or expose them in client-side code

## Troubleshooting

If you still get "Invalid signature" after setting secrets:
1. Make sure you're setting them for the correct environment (production, not preview)
2. Wait a few minutes after setting secrets before testing
3. Check the worker logs in Cloudflare Dashboard to see if keys are being read correctly
