# 🚀 Getting Your Groq API Key

## Why Groq?

Groq is **faster** and **cheaper** than OpenAI:
- ⚡ **Speed**: Up to 10x faster inference
- 💰 **Cost**: Free tier with 60 requests/minute
- 🎯 **Quality**: Uses LLaMA 3.3 70B model
- 🔓 **No Credit Card**: Free tier doesn't require payment info

## Step-by-Step Guide

### 1. Create a Groq Account

1. Go to [console.groq.com](https://console.groq.com)
2. Click **"Sign Up"** or **"Get Started"**
3. Sign up with:
   - Google account, or
   - GitHub account, or
   - Email address

### 2. Generate API Key

1. After logging in, go to **API Keys** section
2. Click **"Create API Key"**
3. Give it a name (e.g., "Birthday Wish Sender")
4. Click **"Submit"**
5. **Copy the API key** (starts with `gsk_...`)

⚠️ **Important**: Save this key immediately! You won't be able to see it again.

### 3. Add to Your Project

Open `server/.env` and add:

```bash
GROQ_API_KEY=gsk_your_actual_api_key_here
```

### 4. Test It

```bash
cd server
npm run dev
```

You should see:
```
🤖 AI service: Configured
```

## Free Tier Limits

- **60 requests per minute**
- **30 requests per day** (for free accounts)
- **No credit card required**

For most small businesses, this is more than enough!

## Upgrading (Optional)

If you need more:
- Go to **Billing** in Groq console
- Add payment method
- Pay-as-you-go: ~$0.27 per 1M tokens
- Still much cheaper than OpenAI!

## Comparison: Groq vs OpenAI

| Feature | Groq | OpenAI |
|---------|------|--------|
| **Speed** | ⚡⚡⚡ Very Fast | ⚡ Moderate |
| **Free Tier** | ✅ Yes (60 req/min) | ❌ No |
| **Cost (paid)** | $0.27/1M tokens | $0.50/1M tokens |
| **Model** | LLaMA 3.3 70B | GPT-3.5-turbo |
| **Quality** | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐⭐ Excellent |
| **Setup** | Easy | Easy |

## Troubleshooting

### "API key not configured"
- Check `.env` file exists in `server/` folder
- Verify the key starts with `gsk_`
- No quotes needed around the key

### "Rate limit exceeded"
- Free tier: 60 requests/minute
- Wait a minute and try again
- Or upgrade to paid tier

### "Invalid API key"
- Make sure you copied the entire key
- Generate a new key if needed
- Check for extra spaces

## Alternative: Keep OpenAI

If you prefer OpenAI, you can switch back:

1. Install OpenAI package:
```bash
cd server
npm uninstall groq-sdk
npm install openai
```

2. Update `server/src/services/aiService.js`:
```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Change model to: 'gpt-3.5-turbo'
```

3. Update `.env`:
```bash
OPENAI_API_KEY=sk_your_openai_key
```

## Need Help?

- **Groq Docs**: https://console.groq.com/docs
- **Groq Discord**: https://discord.gg/groq
- **API Status**: https://status.groq.com

---

**Recommended**: Stick with Groq for faster, free AI message generation! 🚀
