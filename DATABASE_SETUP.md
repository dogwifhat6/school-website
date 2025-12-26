# Database Setup for Permanent Data Storage

## The Problem

Your backend currently uses a JSON file (`admin-data.json`) for storage. On Render's free tier, this file can be lost when the service restarts, so data isn't truly permanent.

## Solution: Add MongoDB Database

We'll use **MongoDB Atlas** (free tier) for permanent data storage.

---

## Step 1: Create MongoDB Atlas Account

1. **Go to MongoDB Atlas**:
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Click **"Try Free"** or **"Sign Up"**
   - Create a free account

2. **Create a Free Cluster**:
   - Choose **"M0 Free"** tier
   - Select a cloud provider (AWS, Google Cloud, or Azure)
   - Choose a region close to you
   - Click **"Create Cluster"**
   - Wait 3-5 minutes for cluster to be created

---

## Step 2: Set Up Database Access

1. **Create Database User**:
   - Go to **"Database Access"** (left sidebar)
   - Click **"Add New Database User"**
   - Choose **"Password"** authentication
   - Username: `admin` (or any name)
   - Password: Generate a strong password (save it!)
   - Database User Privileges: **"Read and write to any database"**
   - Click **"Add User"**

2. **Set Up Network Access**:
   - Go to **"Network Access"** (left sidebar)
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (for simplicity)
   - Or add your Render service IP if you know it
   - Click **"Confirm"**

---

## Step 3: Get Connection String

1. **Go to "Database"** (left sidebar)
2. **Click "Connect"** on your cluster
3. **Choose "Connect your application"**
4. **Copy the connection string**:
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://admin:mypassword123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority`

5. **Save this connection string** - you'll need it!

---

## Step 4: Update Backend to Use MongoDB

I'll create an updated `server.js` that uses MongoDB instead of JSON file.

---

## Step 5: Add MongoDB to Render

1. **Go to Render Dashboard** → Your backend service
2. **Go to "Environment"** tab
3. **Add Environment Variable**:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB connection string (from Step 3)
   - Click **"Save Changes"**

4. **Redeploy** your backend service

---

## Alternative: Quick Test First

Before setting up MongoDB, let's first verify if your frontend is connected to the backend:

1. **Check if data is being saved to backend at all**:
   - Admin adds data
   - Visit: `https://your-backend.onrender.com/api/data`
   - Is the data there?
     - **YES** → Backend is working, but data is lost on restart (need database)
     - **NO** → Frontend not connected to backend (fix connection first)

2. **Check console when admin adds data**:
   - Open console (`Cmd + Option + C`)
   - Admin adds data
   - Do you see: `✅✅✅ DATA SAVED TO BACKEND!`?
     - **YES** → Backend connected, need database
     - **NO** → Backend not connected, fix that first

---

## Recommendation

**First, verify backend connection is working**, then add database.

If backend is not connected, adding a database won't help - data won't reach the backend at all!

