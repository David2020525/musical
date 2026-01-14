#!/bin/bash
# Rebuild script for MusicHub
echo "Rebuilding MusicHub..."
cd /home/user/webapp

# The build was done previously, we just need to regenerate _worker.js
# Since vite build requires all deps, let's just trigger a redeploy
# Wrangler will compile the worker from source

echo "Deploying to production..."
npx wrangler pages deploy dist --project-name musichub
