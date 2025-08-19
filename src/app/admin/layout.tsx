import { auth } from '@clerk/nextjs'
import { redirect } from "next/navigation"

// Check if Clerk keys are properly configured
const isClerkConfigured = () => {
  return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
         process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'user_318cjhf35kxyPDDOtlasIM0q47T' &&
         process.env.CLERK_SECRET_KEY &&
         process.env.CLERK_SECRET_KEY !== 'user_318cjhf35kxyPDDOtlasIM0q47T'
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If Clerk is not configured, allow access for development/testing
  if (!isClerkConfigured()) {
    return (
      <div className="min-h-screen bg-background">
        {children}
      </div>
    );
  }

  // Check authentication if Clerk is configured
  try {
    const { userId } = auth()
    
    if (!userId) {
      redirect('/auth/signin?redirect=/admin')
    }

    // Define admin user IDs - replace with your actual Clerk user ID
    const adminUserIds = [
      'user_318cjhf35kxyPDDOtlasIM0q47T', // Replace this with your actual Clerk user ID
    ]

    // Check if current user is admin
    if (!adminUserIds.includes(userId)) {
      redirect('/')
    }

    return (
      <div className="min-h-screen bg-background">
        {children}
      </div>
    );
  } catch (error) {
    // If there's an error with Clerk, redirect to sign in
    console.warn("Clerk authentication error:", error);
    redirect('/auth/signin?redirect=/admin')
  }
}