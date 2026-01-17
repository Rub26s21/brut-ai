# 🎂 Auto Birthday Wish Sender

A production-ready web application that helps small businesses automatically send personalized AI-generated birthday wishes to their customers via email.

## 🚀 Features

- **Authentication System**: Secure login/signup with Supabase Auth
- **Contact Management**: Add, edit, and delete customer contacts
- **AI Message Generation**: Personalized birthday messages using OpenAI/LLM
- **Automated Scheduler**: Automatically sends emails on customer birthdays
- **Email Logs**: Track all sent birthday wishes
- **Dark Mode**: Optional dark theme support
- **Mobile Responsive**: Works seamlessly on all devices

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, Lucide Icons
- **Backend**: Node.js, Express
- **Database**: Supabase (PostgreSQL + Auth)
- **AI**: Groq API (Fast LLM)
- **Email**: Nodemailer (SMTP)
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- A Supabase account (free tier works)
- Groq API key (free tier available)
- SMTP credentials (Gmail, SendGrid, etc.)

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Navigate to project root
cd antigravity

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Setup Supabase Database

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project
3. Go to SQL Editor
4. Run the SQL script from `database/schema.sql`
5. Copy your project URL and anon key

### 3. Configure Environment Variables

#### Server (.env in server/)
```env
# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Groq API (Fast LLM)
GROQ_API_KEY=your_groq_api_key

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password

# Server
PORT=5000
```

#### Client (.env in client/)
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000
```

### 4. Run the Application

#### Development Mode

```bash
# Terminal 1 - Run backend
cd server
npm run dev

# Terminal 2 - Run frontend
cd client
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📧 Email Configuration

### Using Gmail
1. Enable 2-factor authentication
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in `SMTP_PASS`

### Using SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

## 🎯 How It Works

1. **Sign Up**: Business owners create an account
2. **Add Contacts**: Import customer data (name, email, birthday)
3. **Set Preferences**: Choose message tone (friendly, professional, formal)
4. **Automated Sending**: The scheduler runs daily at 9 AM, detects birthdays, generates AI messages, and sends emails
5. **Track History**: View all sent messages in the Logs page

## 🤖 AI Message Generation

The app uses Groq's LLaMA model to generate unique, personalized birthday messages. Each message:
- Includes the customer's name
- Matches the selected tone
- Avoids repetitive templates
- Can be manually edited before sending

## 📁 Project Structure

```
antigravity/
├── client/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities (Supabase client)
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── scheduler/      # Cron jobs
│   │   └── index.js        # Server entry
│   └── package.json
└── database/
    └── schema.sql          # Supabase schema
```

## 🚀 Deployment

### Deploy Backend (Vercel)
```bash
cd server
vercel
```

### Deploy Frontend (Vercel)
```bash
cd client
vercel
```

Update `VITE_API_URL` in client `.env` to your deployed backend URL.

## 🔒 Security Notes

- Never commit `.env` files
- Use environment variables for all secrets
- Supabase Row Level Security (RLS) is enabled
- All API endpoints validate authentication

## 📝 License

MIT

## 🤝 Support

For issues or questions, please open an issue on GitHub.
