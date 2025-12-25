# Troubleshooting: Images Not Showing to Visitors

## Common Issues and Solutions

### Issue 1: Backend Not Connected

**Symptoms**: Images work for admin but not for visitors

**Check**:
1. Open browser console (F12) on your deployed website
2. Look for errors like:
   - `Failed to sync to backend`
   - `Backend not configured`
   - CORS errors

**Solution**:
1. Make sure `VITE_API_URL` is set in Vercel environment variables
2. Make sure you redeployed after adding the environment variable
3. Check that your backend URL is correct (no trailing slash)

### Issue 2: Base64 Images Too Large

**Symptoms**: Images upload but don't save to backend

**Check**:
1. Open browser console
2. Look for errors about request size or timeout

**Solution**:
- The backend now accepts up to 50MB (updated in server.js)
- If images are still too large, compress them before uploading
- Or use image URLs instead of file uploads

### Issue 3: Backend Not Receiving Data

**Check Backend Logs**:
1. Go to Render/Railway dashboard
2. Check logs for your backend service
3. Look for:
   - `PUT /api/data` requests (should appear when admin saves)
   - Any error messages

**Test Backend Directly**:
1. Visit: `https://your-backend.onrender.com/api/health`
2. Should return: `{"ok": true}`

### Issue 4: CORS Errors

**Symptoms**: Console shows CORS errors

**Solution**:
Update your `server.js` to allow your frontend domain:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'http://localhost:5173'
  ]
}));
```

Then redeploy your backend.

---

## Step-by-Step Debugging

### Step 1: Check Backend Connection

1. **Open your website** in browser
2. **Open Console** (F12 → Console tab)
3. **Look for these messages**:
   - ✅ `✅ Data synced to backend successfully` = Working!
   - ❌ `❌ Failed to sync to backend` = Problem!
   - ⚠️ `Backend not configured` = VITE_API_URL not set

### Step 2: Check Network Requests

1. **Open Network tab** (F12 → Network)
2. **Make a change as admin** (add faculty/event)
3. **Look for**:
   - `PUT https://your-backend.onrender.com/api/data`
   - Status should be `200 OK`
   - If `404` or `CORS error` = Backend not connected properly

### Step 3: Test Backend Directly

1. **Visit**: `https://your-backend.onrender.com/api/data`
2. **Should see**: JSON with all your data
3. **If error**: Backend is not working

### Step 4: Verify Environment Variable

1. **Go to Vercel** → Your Project → Settings → Environment Variables
2. **Check**:
   - `VITE_API_URL` exists
   - Value is correct (your backend URL)
   - Enabled for Production, Preview, Development
3. **If missing/wrong**: Add/update it and redeploy

### Step 5: Check Backend Logs

1. **Go to Render/Railway** dashboard
2. **Open your backend service**
3. **Check Logs tab**
4. **Look for**:
   - `PUT /api/data` requests (when admin saves)
   - `GET /api/data` requests (when visitors load)
   - Any error messages

---

## Quick Fix Checklist

- [ ] Backend deployed and accessible (`/api/health` returns `{"ok": true}`)
- [ ] `VITE_API_URL` set in Vercel environment variables
- [ ] Frontend redeployed after setting environment variable
- [ ] No CORS errors in browser console
- [ ] Backend logs show `PUT /api/data` requests
- [ ] Images are not too large (< 50MB)
- [ ] Browser console shows `✅ Data synced to backend successfully`

---

## Testing After Fix

1. **As Admin**:
   - Log in to admin dashboard
   - Add a faculty member with image
   - Check browser console for `✅ Data synced to backend successfully`

2. **As Visitor** (incognito or another browser):
   - Visit `/faculty` page
   - Image should appear
   - If not, check console for errors

3. **Verify Backend**:
   - Visit `https://your-backend.onrender.com/api/data`
   - Check if the faculty member with image is in the JSON response

---

## Still Not Working?

1. **Check browser console** for specific error messages
2. **Check backend logs** for errors
3. **Verify backend URL** is correct
4. **Test backend directly** with `/api/health` endpoint
5. **Make sure you redeployed** frontend after setting environment variable

The most common issue is forgetting to set `VITE_API_URL` in Vercel or not redeploying after setting it!

