# Backend Deployment Guide

This guide will help you deploy the backend API server so that all users see the same shared data.

## Why Deploy the Backend?

Currently, your website uses localStorage, which means:
- ❌ Each user/admin sees different data
- ❌ Data is stored only in their browser
- ❌ Changes don't sync across devices

With the backend deployed:
- ✅ All users see the same data
- ✅ Admin changes are shared instantly
- ✅ Data persists on the server

---

## Option 1: Deploy to Render (Recommended - Free Tier Available)

### Step 1: Prepare Backend Files

1. **Create a separate folder for backend** (optional, or deploy from root):
   ```bash
   mkdir backend
   cd backend
   ```

2. **Copy backend files**:
   - Copy `src/server.js` to `backend/server.js` (or keep in root)
   - Create `backend/package.json`:

   ```json
   {
     "name": "school-website-backend",
     "version": "1.0.0",
     "type": "module",
     "scripts": {
       "start": "node server.js"
     },
     "dependencies": {
       "express": "^4.19.2",
       "cors": "^2.8.5"
     }
   }
   ```

### Step 2: Push to GitHub

1. **Create a new repository** (or use existing):
   ```bash
   git init
   git add .
   git commit -m "Backend API server"
   git remote add origin https://github.com/YOUR_USERNAME/school-website-backend.git
   git push -u origin main
   ```

### Step 3: Deploy on Render

1. **Sign up/Login**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**:
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Select the repository with your backend code

3. **Configure Service**:
   - **Name**: `school-website-api` (or any name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js` (or `npm start`)
   - **Plan**: Free (or paid if you prefer)

4. **Environment Variables** (if needed):
   - `PORT`: Usually auto-set by Render
   - Add any other variables your backend needs

5. **Deploy**:
   - Click **"Create Web Service"**
   - Render will build and deploy your backend
   - Wait for deployment to complete (~2-5 minutes)

6. **Get Your Backend URL**:
   - Once deployed, you'll get a URL like: `https://school-website-api.onrender.com`
   - Copy this URL - you'll need it for the frontend!

---

## Option 2: Deploy to Railway (Alternative)

### Step 1: Prepare Backend

Same as Render - ensure you have:
- `server.js` file
- `package.json` with dependencies

### Step 2: Deploy on Railway

1. **Sign up**: Go to [railway.app](https://railway.app) and sign up with GitHub

2. **New Project**:
   - Click **"New Project"**
   - Select **"Deploy from GitHub repo"**
   - Choose your repository

3. **Configure**:
   - Railway auto-detects Node.js
   - Set **Start Command**: `node server.js`
   - Railway will auto-deploy

4. **Get URL**:
   - Railway provides a URL like: `https://your-project.up.railway.app`
   - Copy this URL

---

## Step 3: Connect Frontend to Backend

### Update Vercel Environment Variables

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com)
   - Select your school-website project
   - Go to **Settings** → **Environment Variables**

2. **Add Environment Variable**:
   - **Key**: `VITE_API_URL`
   - **Value**: Your backend URL (e.g., `https://school-website-api.onrender.com`)
   - **Environment**: Production, Preview, Development (select all)

3. **Redeploy**:
   - Go to **Deployments** tab
   - Click **"Redeploy"** on the latest deployment
   - This will rebuild with the new environment variable

---

## Step 4: Test the Connection

1. **Visit your website**
2. **Open browser console** (F12)
3. **Check for errors** - you should see API calls to your backend
4. **Test admin login** and make changes
5. **Open in incognito/another browser** - changes should be visible!

---

## Troubleshooting

### Backend not responding?

1. **Check backend logs**:
   - Render: Go to your service → **Logs** tab
   - Railway: Go to your project → **Deployments** → **View Logs**

2. **Verify CORS**:
   - Make sure `cors` is enabled in `server.js`
   - Check that your frontend URL is allowed

3. **Check environment variables**:
   - Verify `VITE_API_URL` is set correctly in Vercel
   - Make sure there's no trailing slash

### Data not syncing?

1. **Check network tab**:
   - Open browser DevTools → Network
   - Look for API calls to your backend
   - Check if they're successful (200 status)

2. **Verify backend URL**:
   - Test backend directly: `https://your-backend-url.onrender.com/api/health`
   - Should return `{"ok": true}`

3. **Check CORS errors**:
   - If you see CORS errors in console, update `server.js`:
     ```javascript
     app.use(cors({
       origin: ['https://your-frontend-url.vercel.app', 'http://localhost:5173']
     }));
     ```

---

## Backend File Structure

Your backend should have:

```
backend/
├── server.js          # Express server
├── package.json       # Dependencies
└── admin-data.json    # Data file (created automatically)
```

---

## Cost

- **Render Free Tier**: 
  - 750 hours/month free
  - Spins down after 15 minutes of inactivity
  - Perfect for small projects

- **Railway Free Tier**:
  - $5 credit/month
  - Usually enough for small projects

Both are great options for getting started!

---

## Next Steps

1. ✅ Deploy backend to Render/Railway
2. ✅ Add `VITE_API_URL` to Vercel
3. ✅ Redeploy frontend
4. ✅ Test admin login and data changes
5. ✅ Verify data syncs across browsers

Your website will now have shared data for all users! 🎉

