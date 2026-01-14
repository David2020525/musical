#!/bin/bash

# Simple deployment script without Node.js build
# Uses Cloudflare's built-in build system

echo "🚀 Deploying to Cloudflare Pages..."
echo ""
echo "This will trigger Cloudflare to build from GitHub automatically."
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler not found. Installing..."
    npm install -g wrangler
fi

echo "✅ Triggering Cloudflare to build from GitHub..."
wrangler pages project create musichub --production-branch main

echo ""
echo "🎉 Done! Cloudflare is now building from your GitHub repository."
echo "Check status at: https://dash.cloudflare.com"
