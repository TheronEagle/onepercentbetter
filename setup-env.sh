#!/bin/bash

echo "🔑 Setting up API Keys for 1% Better"
echo "======================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found. Creating from template..."
    cp env.example .env.local
fi

echo "📝 Current .env.local contents:"
echo "================================"
cat .env.local
echo ""
echo "================================"
echo ""

echo "🔧 Next Steps:"
echo "1. Sign up for Clerk at https://clerk.com"
echo "2. Sign up for Stripe at https://stripe.com"
echo "3. Get your API keys from both services"
echo "4. Update the values in .env.local"
echo ""
echo "💡 Tip: You can edit .env.local with: nano .env.local"
echo ""

# Generate NextAuth secret
echo "🔐 Generating NextAuth secret..."
NEXTAUTH_SECRET=$(openssl rand -base64 32)
echo "Generated NextAuth secret: $NEXTAUTH_SECRET"
echo "Add this to your .env.local file as NEXTAUTH_SECRET"
echo "" 