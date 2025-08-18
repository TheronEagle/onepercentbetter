# Clerk Authentication Setup Guide

## Overview

This guide will help you set up Clerk authentication for the 1% Better platform. Clerk provides a complete authentication solution with sign-in, sign-up, and user management.

## Prerequisites

1. A Clerk account (sign up at [clerk.com](https://clerk.com))
2. Node.js and npm installed
3. The 1% Better project set up

## Step 1: Create a Clerk Application

1. Go to [clerk.com](https://clerk.com) and sign up/login
2. Create a new application
3. Choose "Next.js" as your framework
4. Note down your API keys

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Database (if using Prisma)
DATABASE_URL="file:./dev.db"

# Stripe (if using payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Next.js
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Step 3: Install Dependencies

The Clerk dependencies are already included in `package.json`. If you need to install them manually:

```bash
npm install @clerk/nextjs
```

## Step 4: Configure Clerk Dashboard

1. In your Clerk dashboard, go to "User & Authentication" → "Email, Phone, Username"
2. Enable the authentication methods you want (email, phone, username)
3. Configure social providers if needed (Google, GitHub, etc.)

## Step 5: Customize Appearance (Optional)

The Clerk components are already styled to match the 1% Better design system. You can further customize the appearance in:

- `src/lib/clerk-provider.tsx` - Global Clerk styling
- `src/app/auth/signin/page.tsx` - Sign-in page styling
- `src/app/auth/signup/page.tsx` - Sign-up page styling

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/auth/signin` to test the sign-in page
3. Navigate to `/auth/signup` to test the sign-up page

## Step 7: User Management

### Protected Routes

Routes that require authentication are automatically protected by the middleware. To protect additional routes, add them to the `publicRoutes` array in `src/middleware.ts`.

### User Data

Access user data in your components:

```tsx
import { useUser } from '@clerk/nextjs'

export default function MyComponent() {
  const { user, isLoaded } = useUser()
  
  if (!isLoaded) return <div>Loading...</div>
  
  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
    </div>
  )
}
```

### Sign Out

```tsx
import { useClerk } from '@clerk/nextjs'

export default function SignOutButton() {
  const { signOut } = useClerk()
  
  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  )
}
```

## Step 8: Production Deployment

1. Update your environment variables with production Clerk keys
2. Configure your production domain in the Clerk dashboard
3. Set up webhooks if needed for user events

## Troubleshooting

### Common Issues

1. **"Clerk not configured" error**
   - Check that your environment variables are set correctly
   - Restart your development server after adding environment variables

2. **Styling issues**
   - Ensure the Clerk provider is wrapping your app in `layout.tsx`
   - Check that the appearance configuration matches your design system

3. **Middleware errors**
   - Verify the middleware configuration in `src/middleware.ts`
   - Check that public routes are correctly defined

### Getting Help

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Discord](https://discord.gg/clerk)
- [Clerk Support](https://clerk.com/support)

## Security Best Practices

1. Never commit your `.env.local` file to version control
2. Use different API keys for development and production
3. Regularly rotate your API keys
4. Enable MFA for admin accounts
5. Monitor authentication logs in the Clerk dashboard

## Next Steps

Once Clerk is set up, you can:

1. Add user profiles and settings pages
2. Implement role-based access control
3. Add social authentication providers
4. Set up user onboarding flows
5. Integrate with your database for user data

---

**Note**: This setup provides a complete authentication solution. The sign-in and sign-up pages are already styled to match the 1% Better design system with interactive cursor effects and modern animations.

