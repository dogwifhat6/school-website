# How to Connect Frontend to Backend

This guide will help you connect your Vercel-deployed frontend to your backend API.

---

## Prerequisites

✅ Backend deployed (Render/Railway) and you have the URL  
✅ Frontend deployed on Vercel  
✅ Backend URL looks like: `https://your-backend.onrender.com` or `https://your-backend.railway.app`

---

## Step 1: Get Your Backend URL

1. **Go to your backend deployment**:
   - **Render**: Go to [render.com](https://render.com) → Your service → Copy the URL
   - **Railway**: Go to [railway.app](https://railway.app) → Your project → Settings → Domains → Copy the URL

2. **Test your backend**:
   - Open your backend URL in a browser: `https://your-backend.onrender.com/api/health`
   - You should see: `{"ok": true}`
   - If you see this, your backend is working! ✅

3. **Copy the full URL** (without trailing slash):
   - ✅ Good: `https://school-website-api.onrender.com`
   - ❌ Bad: `https://school-website-api.onrender.com/`

---

## Step 2: Add Environment Variable in Vercel

### Method 1: Using Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com)
   - Log in and select your **school-website** project

2. **Navigate to Environment Variables**:
   - Click on your project
   - Go to **Settings** tab (top navigation)
   - Click **Environment Variables** in the left sidebar

3. **Add New Variable**:
   - Click **"Add New"** button
   - **Key**: `VITE_API_URL`
   - **Value**: Your backend URL (e.g., `https://school-website-api.onrender.com`)
   - **Environment**: Select all three:
     - ☑️ Production
     - ☑️ Preview
     - ☑️ Development
   - Click **"Save"**

4. **Redeploy Your Frontend**:
   - Go to **Deployments** tab
   - Find your latest deployment
   - Click the **"⋯"** (three dots) menu
   - Click **"Redeploy"**
   - Confirm redeployment
   - Wait for build to complete (~2-3 minutes)

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Add environment variable
vercel env add VITE_API_URL

# When prompted, enter your backend URL
# Select all environments (Production, Preview, Development)

# Redeploy
vercel --prod
```

---

## Step 3: Verify the Connection

### Test in Browser

1. **Visit your website**: `https://your-website.vercel.app`

2. **Open Browser Console**:
   - Press `F12` (or `Cmd + Option + I` on Mac)
   - Go to **Console** tab
   - Look for any errors

3. **Check Network Requests**:
   - Go to **Network** tab in DevTools
   - Refresh the page
   - Look for requests to your backend URL
   - You should see:
     - `GET https://your-backend.onrender.com/api/data` (Status: 200)

4. **Test Admin Login**:
   - Go to `/admin/login`
   - Log in with: `Admin` / `Halisa123`
   - Make a change (e.g., update school name)
   - Check Network tab - you should see:
     - `PUT https://your-backend.onrender.com/api/data` (Status: 200)

### Test Data Sharing

1. **Make a change as admin**:
   - Log in to admin dashboard
   - Add a faculty member or update school name
   - Save the change

2. **Open in Incognito/Another Browser**:
   - Open your website in incognito mode
   - The changes should be visible!
   - This proves data is shared across all users ✅

---

## Step 4: Troubleshooting

### Issue: Frontend can't reach backend

**Symptoms**: Console shows CORS errors or network errors

**Solution**:
1. **Check backend URL is correct**:
   - Go to Vercel → Settings → Environment Variables
   - Verify `VITE_API_URL` is set correctly
   - No trailing slash!

2. **Check CORS in backend**:
   - Your `server.js` should have: `app.use(cors());`
   - If you want to restrict, update it:
     ```javascript
     app.use(cors({
       origin: [
         'https://your-frontend.vercel.app',
         'http://localhost:5173'
       ]
     }));
     ```

3. **Redeploy backend** after CORS changes

### Issue: Environment variable not working

**Symptoms**: Frontend still uses `http://localhost:4000`

**Solution**:
1. **Double-check environment variable**:
   - Vercel → Settings → Environment Variables
   - Make sure `VITE_API_URL` is spelled correctly
   - Make sure it's enabled for Production

2. **Redeploy frontend**:
   - Environment variables only apply to new deployments
   - You MUST redeploy after adding/changing variables

3. **Check build logs**:
   - Go to Vercel → Deployments → Latest deployment → Build Logs
   - Look for `VITE_API_URL` in the logs (it should show the value)

### Issue: Backend returns 404

**Symptoms**: Network requests return 404 Not Found

**Solution**:
1. **Test backend directly**:
   - Visit: `https://your-backend.onrender.com/api/health`
   - Should return `{"ok": true}`

2. **Check backend routes**:
   - Make sure your `server.js` has the `/api/data` endpoint
   - Check backend logs for errors

### Issue: Data not syncing

**Symptoms**: Changes don't appear in other browsers

**Solution**:
1. **Check backend is saving data**:
   - Look at backend logs
   - Should see successful PUT requests

2. **Check frontend is fetching from backend**:
   - Open Network tab
   - Refresh page
   - Should see GET request to `/api/data`

3. **Clear browser cache**:
   - Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

---

## Quick Checklist

- [ ] Backend deployed and accessible
- [ ] Backend URL tested (`/api/health` returns `{"ok": true}`)
- [ ] `VITE_API_URL` added to Vercel environment variables
- [ ] Environment variable enabled for Production, Preview, Development
- [ ] Frontend redeployed after adding environment variable
- [ ] Tested in browser console (no errors)
- [ ] Tested admin login and data changes
- [ ] Verified data syncs across browsers

---

## Current Setup

Your `AdminContext.jsx` is already configured to:
- ✅ Fetch data from `${API_URL}/api/data` on load
- ✅ Save changes to `${API_URL}/api/data` automatically
- ✅ Fall back to localStorage if backend is unavailable

The `API_URL` comes from `import.meta.env.VITE_API_URL`, which Vercel will inject during build.

---

## Summary

1. **Get backend URL** from Render/Railway
2. **Add `VITE_API_URL`** in Vercel → Settings → Environment Variables
3. **Redeploy frontend** (important!)
4. **Test** by making admin changes and checking in another browser

That's it! Your frontend and backend are now connected! 🎉

