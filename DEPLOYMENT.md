# Deployment Guide — Vercel

Deploy the Interview Prep Tracker to Vercel for free.

## Prerequisites

- A [Vercel account](https://vercel.com/)
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Appwrite project set up with all collections and buckets (see `APPWRITE_SETUP.md`)

## Step 1: Push to Git

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit: Interview Prep Tracker"

# Push to GitHub
git remote add origin https://github.com/<your-username>/interview-prep-tracker.git
git branch -M main
git push -u origin main
```

## Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your repository
4. Vercel auto-detects Vite — no configuration needed

## Step 3: Set Environment Variables

In the Vercel deployment settings, add these environment variables:

| Variable | Value |
|:---|:---|
| `VITE_APPWRITE_ENDPOINT` | `https://cloud.appwrite.io/v1` |
| `VITE_APPWRITE_PROJECT_ID` | Your Appwrite project ID |
| `VITE_APPWRITE_DATABASE_ID` | Your database ID |
| `VITE_APPWRITE_PROBLEMS_COLLECTION_ID` | Your problems collection ID |
| `VITE_APPWRITE_NOTES_COLLECTION_ID` | Your notes collection ID |
| `VITE_APPWRITE_INTERVIEWS_COLLECTION_ID` | Your interviews collection ID |
| `VITE_APPWRITE_RESUMES_COLLECTION_ID` | Your resumes collection ID |
| `VITE_APPWRITE_RESUMES_BUCKET_ID` | Your resumes bucket ID |

## Step 4: Deploy

Click **Deploy**. Vercel will build and deploy your app.

## Step 5: Add Production Domain to Appwrite

**IMPORTANT**: After deployment, add your Vercel domain to Appwrite:

1. Go to your Appwrite Console → Project → **Overview**
2. Under **Platforms**, click your Web App
3. Add your production hostname: `your-app.vercel.app`
4. This prevents CORS errors in production

## Build Settings (Auto-detected)

| Setting | Value |
|:---|:---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

## SPA Routing Fix

Create a `vercel.json` in your project root to handle client-side routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This ensures React Router works correctly on page refresh.

## Post-Deployment Checklist

- [ ] Verify all environment variables are set in Vercel
- [ ] Add Vercel domain to Appwrite Web Platform
- [ ] Test signup/login flow on the production URL
- [ ] Verify CRUD operations work
- [ ] Test resume upload/download
- [ ] Check mobile responsiveness
