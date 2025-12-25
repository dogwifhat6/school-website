# Quick Fix: No API Request in Network Tab

## Problem
Network tab shows no request to `/api/data` or backend URL.

## Solution (3 Steps)

### ✅ Step 1: Add Environment Variable
1. Vercel → Your Project → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://your-backend.onrender.com`
3. Enable for: Production, Preview, Development

### ✅ Step 2: Redeploy (IMPORTANT!)
1. Vercel → Deployments tab
2. Click "⋯" → "Redeploy"
3. Wait for build (~2-3 minutes)

### ✅ Step 3: Test
1. Refresh website
2. Open Network tab
3. Look for: `/api/data` request
4. Should see status `200 OK`

## After Fix
Network tab should show:
- ✅ Request to `https://your-backend.onrender.com/api/data`
- ✅ Status: `200 OK`
- ✅ Response: JSON with your data

