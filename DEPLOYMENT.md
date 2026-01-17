# 🚀 Deployment Guide

## Prerequisites
- Vercel account (free tier works)
- Supabase project set up
- API keys ready (Groq, SMTP)

## Step 1: Deploy Backend to Vercel

### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to server directory
cd server

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? birthday-wish-sender-api
# - Directory? ./
# - Override settings? No

# After deployment, add environment variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add GROQ_API_KEY
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add SMTP_FROM_NAME

# Redeploy with environment variables
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Select the `server` directory as root
5. Add environment variables in Settings → Environment Variables
6. Deploy

**Important:** Copy your deployed backend URL (e.g., `https://your-api.vercel.app`)

## Step 2: Deploy Frontend to Vercel

```bash
# Navigate to client directory
cd ../client

# Update .env with production API URL
# VITE_API_URL=https://your-api.vercel.app

# Deploy
vercel

# Follow the prompts similar to backend

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_API_URL

# Deploy to production
vercel --prod
```

## Step 3: Configure Supabase

### Update CORS Settings (if needed)

In your Supabase dashboard:
1. Go to Settings → API
2. Add your Vercel frontend URL to allowed origins

### Verify Database Schema

Make sure you've run the SQL schema from `database/schema.sql` in your Supabase SQL Editor.

## Step 4: Test the Deployment

1. Visit your deployed frontend URL
2. Sign up for a new account
3. Add a test contact
4. Generate an AI message
5. Check the logs

## Environment Variables Summary

### Backend (.env)
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM_NAME=Your Business
PORT=5000
SCHEDULER_ENABLED=true
SCHEDULER_CRON=0 9 * * *
```

### Frontend (.env)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=https://your-api.vercel.app
```

## Scheduler Configuration

**Important:** Vercel serverless functions have a 10-second timeout on the free tier. For the birthday scheduler to work reliably, you have two options:

### Option 1: Use Vercel Cron Jobs (Recommended)

1. Create `server/api/cron.js`:
```javascript
import { checkBirthdaysAndSend } from '../src/scheduler/birthdayScheduler.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await checkBirthdaysAndSend();
    res.status(200).json({ message: 'Birthday check completed' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

2. Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron",
    "schedule": "0 9 * * *"
  }]
}
```

### Option 2: Use External Cron Service

Use a service like [cron-job.org](https://cron-job.org) to hit your `/api/cron` endpoint daily.

## Troubleshooting

### Backend Issues
- Check Vercel logs: `vercel logs`
- Verify environment variables are set
- Test API endpoints: `curl https://your-api.vercel.app/health`

### Frontend Issues
- Clear browser cache
- Check browser console for errors
- Verify API URL is correct in environment variables

### Email Issues
- Verify SMTP credentials
- Check Gmail app password (not regular password)
- Test email service separately

### Database Issues
- Verify RLS policies are enabled
- Check Supabase logs
- Ensure schema is properly set up

## Custom Domain (Optional)

1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update environment variables with new domain

## Monitoring

- **Vercel Analytics**: Enable in project settings
- **Supabase Logs**: Monitor database queries
- **Email Logs**: Check the Logs page in your app

## Security Checklist

- ✅ Environment variables are set (not hardcoded)
- ✅ Supabase RLS policies are enabled
- ✅ CORS is properly configured
- ✅ API endpoints validate authentication
- ✅ SMTP credentials use app-specific passwords
- ✅ `.env` files are in `.gitignore`

## Cost Estimation

- **Vercel**: Free tier (100GB bandwidth, 100 hours serverless)
- **Supabase**: Free tier (500MB database, 50,000 monthly active users)
- **OpenAI**: ~$0.002 per message (GPT-3.5-turbo)
- **Email**: Free (Gmail) or ~$0.0001 per email (SendGrid)

**Estimated monthly cost for 100 customers:** < $1

## Support

For issues:
1. Check the troubleshooting section
2. Review Vercel and Supabase logs
3. Verify all environment variables
4. Test each component separately

---

**Congratulations!** 🎉 Your Auto Birthday Wish Sender is now deployed and ready to use!
