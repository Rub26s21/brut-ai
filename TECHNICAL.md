# 🎂 Auto Birthday Wish Sender - Technical Documentation

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Login   │  │Dashboard │  │ Contacts │  │   Logs   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                        │                                     │
│                   Supabase Auth                             │
└───────────────────────┼─────────────────────────────────────┘
                        │
                        │ REST API
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVER (Node.js/Express)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Contacts   │  │   Messages   │  │     Logs     │     │
│  │   Routes     │  │   Routes     │  │   Routes     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
│         ▼                  ▼                  ▼             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Supabase   │  │  AI Service  │  │    Email     │     │
│  │   Client     │  │    (Groq)    │  │   Service    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Birthday Scheduler (node-cron)              │    │
│  │  Runs daily at 9 AM → Checks birthdays → Sends     │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (Supabase)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   profiles   │  │   contacts   │  │ email_logs   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## 🗄️ Database Schema

### profiles
```sql
id          UUID (PK, FK to auth.users)
business_name TEXT
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

### contacts
```sql
id          UUID (PK)
user_id     UUID (FK to auth.users)
name        TEXT
email       TEXT
dob         DATE
tone        TEXT (friendly, professional, formal)
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

### email_logs
```sql
id              UUID (PK)
contact_id      UUID (FK to contacts)
user_id         UUID (FK to auth.users)
contact_name    TEXT
contact_email   TEXT
message_content TEXT
status          TEXT (sent, failed, pending)
error_message   TEXT
sent_at         TIMESTAMP
```

## 🔄 Data Flow

### 1. User Authentication
```
User → Login/Signup → Supabase Auth → JWT Token → Client Storage
```

### 2. Contact Management
```
User → Add Contact → API → Validate → Supabase → Response
```

### 3. AI Message Generation
```
User → Generate Message → API → OpenAI → AI Message → Response
```

### 4. Birthday Email Flow (Automated)
```
Scheduler (9 AM daily)
  ↓
Query contacts with birthday today
  ↓
For each contact:
  ↓
Generate AI message (Groq)
  ↓
Send email (SMTP)
  ↓
Log result (Supabase)
```

## 🔐 Security Features

### Authentication
- Supabase Auth (JWT-based)
- Row Level Security (RLS) policies
- Session management

### API Security
- Bearer token authentication
- User-specific data isolation
- Input validation

### Data Protection
- Environment variables for secrets
- No hardcoded credentials
- HTTPS in production

## 🎨 Frontend Components

### Pages
- **Login**: User authentication
- **Signup**: New user registration
- **Dashboard**: Stats and upcoming birthdays
- **Contacts**: CRUD operations for customers
- **Logs**: Email history and status

### Components
- **Layout**: Sidebar navigation, dark mode
- **Forms**: Contact form with validation
- **Modals**: Add/edit contact modal
- **Stats Cards**: Dashboard metrics

### State Management
- React hooks (useState, useEffect)
- Supabase real-time subscriptions
- API client for backend communication

## 🔧 Backend Services

### Routes
- **GET /api/contacts**: List all contacts
- **POST /api/contacts**: Create contact
- **PUT /api/contacts/:id**: Update contact
- **DELETE /api/contacts/:id**: Delete contact
- **POST /api/messages/generate**: Generate AI message
- **GET /api/logs**: Get email logs
- **GET /api/logs/stats**: Get statistics

### Services

#### AI Service
```javascript
generateBirthdayMessage(name, tone, businessName)
  → Groq API call
  → Personalized message
  → Fallback templates
```

#### Email Service
```javascript
sendBirthdayEmail(to, name, message)
  → SMTP connection
  → HTML email template
  → Send via Nodemailer
```

#### Scheduler
```javascript
cron.schedule('0 9 * * *', async () => {
  → Check birthdays today
  → Generate messages
  → Send emails
  → Log results
})
```

## 🚀 Performance Optimizations

### Frontend
- Code splitting (React Router)
- Lazy loading components
- Optimized images
- Minimal re-renders

### Backend
- Connection pooling (Supabase)
- Async/await for I/O operations
- Error handling and retries
- Rate limiting (Groq)

### Database
- Indexed columns (dob, user_id)
- Efficient queries
- RLS policies for security

## 📊 Monitoring & Logging

### Application Logs
- Server startup logs
- API request logs
- Error logs with stack traces
- Scheduler execution logs

### Email Logs
- Sent status
- Failed attempts with errors
- Message content
- Timestamps

### Analytics
- Total emails sent
- Success rate
- Monthly statistics
- Upcoming birthdays count

## 🧪 Testing Strategy

### Manual Testing
1. **Authentication**: Sign up, login, logout
2. **CRUD**: Create, read, update, delete contacts
3. **AI**: Generate messages with different tones
4. **Scheduler**: Test with today's birthday
5. **Email**: Verify email delivery

### Test Checklist
- ✅ User can sign up
- ✅ User can login
- ✅ User can add contact
- ✅ User can edit contact
- ✅ User can delete contact
- ✅ AI generates unique messages
- ✅ Emails are sent successfully
- ✅ Logs are recorded
- ✅ Dashboard shows correct stats
- ✅ Dark mode works
- ✅ Mobile responsive

## 🔄 Deployment Workflow

### Development
```bash
npm run dev  # Both client and server
```

### Production
```bash
# Backend
cd server && vercel --prod

# Frontend
cd client && vercel --prod
```

### Environment Variables
- Development: `.env` files
- Production: Vercel dashboard

## 📈 Scalability Considerations

### Current Limits (Free Tier)
- Vercel: 100GB bandwidth, 100 hours serverless
- Supabase: 500MB database, 50K MAU
- OpenAI: Pay-per-use (~$0.002/message)

### Scaling Options
1. **Upgrade Vercel**: Pro plan for more resources
2. **Upgrade Supabase**: Pro plan for larger database
3. **Batch Processing**: Group emails to reduce API calls
4. **Caching**: Cache AI messages for similar requests
5. **Queue System**: Use Redis for email queue

## 🛠️ Customization Guide

### Change Email Template
Edit `server/src/services/emailService.js`:
```javascript
html: `
  <!-- Your custom HTML here -->
`
```

### Change AI Prompt
Edit `server/src/services/aiService.js`:
```javascript
const prompt = `Your custom prompt here`;
```

### Add New Fields
1. Update database schema
2. Update API routes
3. Update frontend forms
4. Update TypeScript types (if using)

### Change Scheduler Time
Edit `server/.env`:
```
SCHEDULER_CRON=0 9 * * *
```

## 🐛 Common Issues & Solutions

### Issue: Emails not sending
**Solution**: 
- Check SMTP credentials
- Use app-specific password for Gmail
- Verify firewall settings

### Issue: AI not generating messages
**Solution**:
- Verify Groq API key
- Check API credits
- Review rate limits

### Issue: Database errors
**Solution**:
- Verify RLS policies
- Check user permissions
- Review SQL schema

## 📚 Tech Stack Details

### Frontend
- **React 18**: UI library
- **Vite**: Build tool
- **TailwindCSS**: Styling
- **Lucide React**: Icons
- **React Router**: Navigation

### Backend
- **Node.js**: Runtime
- **Express**: Web framework
- **Supabase JS**: Database client
- **Groq**: AI integration
- **Nodemailer**: Email service
- **node-cron**: Scheduler

### Infrastructure
- **Vercel**: Hosting
- **Supabase**: Database + Auth
- **Gmail/SendGrid**: Email delivery

## 🎯 Future Enhancements

### Potential Features
- [ ] SMS notifications
- [ ] Multiple languages
- [ ] Custom email templates
- [ ] Bulk import contacts
- [ ] Analytics dashboard
- [ ] A/B testing messages
- [ ] Webhook integrations
- [ ] Mobile app (React Native)

### Performance Improvements
- [ ] Redis caching
- [ ] CDN for assets
- [ ] Database query optimization
- [ ] Background job queue
- [ ] Rate limiting

---

**Built with ❤️ for small businesses**
