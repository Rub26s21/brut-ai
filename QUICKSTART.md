# 🎯 Quick Start Guide

## 📋 What You Need

Before starting, gather these credentials:

1. **Supabase Account** (free)
   - Project URL
   - Anon Key

2. **Groq API Key** (free tier available)
   - Get from: https://console.groq.com

3. **Email Service** (free option available)
   - Gmail: Use app-specific password
   - SendGrid: Free tier available

## 🚀 5-Minute Setup

### 1. Set Up Supabase (2 minutes)

```bash
# 1. Go to https://supabase.com
# 2. Create new project
# 3. Go to SQL Editor
# 4. Copy and paste contents of database/schema.sql
# 5. Run the SQL
# 6. Copy your project URL and anon key from Settings → API
```

### 2. Install Dependencies (1 minute)

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Configure Environment Variables (1 minute)

**Server** (`server/.env`):
```bash
cp .env.example .env
# Edit .env and add your credentials
```

**Client** (`client/.env`):
```bash
cp .env.example .env
# Edit .env and add your Supabase credentials
```

### 4. Run the Application (1 minute)

```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm run dev
```

**Done!** 🎉 Open http://localhost:5173

## 📧 Gmail Setup (App Password)

1. Enable 2-Factor Authentication on your Google account
2. Go to: https://myaccount.google.com/apppasswords
3. Create new app password
4. Copy the 16-character password
5. Use this in `SMTP_PASS` (not your regular Gmail password)

## 🧪 Test the App

1. **Sign Up**: Create an account at http://localhost:5173/signup
2. **Add Contact**: Add a test contact with today's birthday
3. **Generate Message**: Click "Generate" to test AI
4. **Check Logs**: View the Logs page

## 🤖 Testing the Scheduler

To test birthday emails immediately:

1. Open `server/src/scheduler/birthdayScheduler.js`
2. Uncomment the last line: `checkBirthdaysAndSend();`
3. Restart the server
4. Add a contact with today's birthday
5. Check your email!

## 📱 Features Overview

### Dashboard
- View statistics (emails sent, failed)
- See upcoming birthdays (next 30 days)

### Contacts
- Add customer contacts
- Edit/delete contacts
- Set message tone (friendly, professional, formal)
- Preview AI-generated messages

### Logs
- View all sent emails
- Filter by status (sent, failed, pending)
- See message content and timestamps

## 🎨 Customization

### Change Business Name
1. Sign up
2. Your business name is set during signup
3. Update in Supabase: `profiles` table

### Change Email Template
Edit `server/src/services/emailService.js` → `sendBirthdayEmail()` function

### Change AI Prompt
Edit `server/src/services/aiService.js` → `generateBirthdayMessage()` function

### Change Scheduler Time
Edit `server/.env` → `SCHEDULER_CRON=0 9 * * *`
- Format: `minute hour day month dayOfWeek`
- Example: `0 9 * * *` = Every day at 9:00 AM
- Example: `30 8 * * *` = Every day at 8:30 AM

## 🐛 Common Issues

### "Missing Supabase environment variables"
- Check `.env` files exist in both `server/` and `client/`
- Verify variable names match `.env.example`

### "Failed to send email"
- Verify SMTP credentials
- Use Gmail app password (not regular password)
- Check SMTP_HOST and SMTP_PORT

### "Failed to generate message"
- Verify Groq API key
- Check API key has credits
- Test at: https://console.groq.com

### Database errors
- Verify you ran `database/schema.sql` in Supabase
- Check Supabase logs in dashboard
- Ensure RLS policies are enabled

## 📊 Project Structure

```
antigravity/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utilities (API, Supabase)
│   │   └── App.jsx      # Main app
│   └── package.json
├── server/              # Node.js backend
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Business logic
│   │   ├── scheduler/   # Cron jobs
│   │   └── index.js     # Server entry
│   └── package.json
└── database/
    └── schema.sql       # Supabase schema
```

## 🔐 Security Best Practices

- ✅ Never commit `.env` files
- ✅ Use app-specific passwords for email
- ✅ Keep API keys secret
- ✅ Enable Supabase RLS policies
- ✅ Use HTTPS in production

## 📈 Next Steps

1. ✅ Test locally
2. ✅ Add real customer data
3. ✅ Customize email templates
4. ✅ Deploy to production (see DEPLOYMENT.md)
5. ✅ Set up monitoring

## 💡 Tips

- **Test emails**: Use your own email first
- **Backup data**: Export Supabase data regularly
- **Monitor costs**: Check OpenAI usage dashboard
- **Dark mode**: Toggle in sidebar
- **Mobile**: Fully responsive design

## 🆘 Need Help?

1. Check this guide
2. Review error messages in console
3. Check Supabase logs
4. Verify environment variables
5. Test each component separately

---

**Ready to automate birthday wishes?** 🎂 Follow the steps above and you'll be up and running in 5 minutes!
