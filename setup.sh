#!/bin/bash

# 🎂 Auto Birthday Wish Sender - Setup Script
# This script helps you set up the project quickly

set -e

echo "🎂 Auto Birthday Wish Sender - Setup Script"
echo "==========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if we're in the right directory
if [ ! -f "README.md" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📦 Installing dependencies..."
echo ""

# Install server dependencies
echo "Installing server dependencies..."
cd server
if [ ! -f ".env" ]; then
    echo "Creating server .env file..."
    cp .env.example .env
    echo "⚠️  Please edit server/.env with your API keys"
fi
npm install
cd ..

echo ""

# Install client dependencies
echo "Installing client dependencies..."
cd client
if [ ! -f ".env" ]; then
    echo "Creating client .env file..."
    cp .env.example .env
    echo "⚠️  Please edit client/.env with your Supabase credentials"
fi
npm install
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Set up Supabase:"
echo "   - Go to https://supabase.com and create a project"
echo "   - Run the SQL from database/schema.sql in SQL Editor"
echo "   - Copy your project URL and anon key"
echo ""
echo "2. Configure environment variables:"
echo "   - Edit server/.env with your API keys"
echo "   - Edit client/.env with your Supabase credentials"
echo ""
echo "3. Start the application:"
echo "   Terminal 1: cd server && npm run dev"
echo "   Terminal 2: cd client && npm run dev"
echo ""
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo "📖 For detailed instructions, see QUICKSTART.md"
echo ""
echo "🚀 Happy automating!"
