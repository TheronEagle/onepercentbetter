import { auth } from '@clerk/nextjs'
import { clerkClient } from '@clerk/nextjs'
import { redirect } from "next/navigation"

// Check if Clerk keys are properly configured
const isClerkConfigured = () => {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const secretKey = process.env.CLERK_SECRET_KEY
  
  return publishableKey && 
         publishableKey.startsWith('pk_') && 
         publishableKey.length > 20 &&
         secretKey && 
         secretKey.startsWith('sk_') && 
         secretKey.length > 20
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

    // Define admin user IDs and emails - replace with your actual details
    const adminUserIds = [
      // Add your actual Clerk user ID here when you get it
    ]
    
    const adminEmails = [
      'coreymitchell0709@gmail.com', // Your admin email
    ]

    // Get user info to check email if needed
    const user = await clerkClient.users.getUser(userId)
    
    // Check if current user is admin (by ID or email)
    const isAdminById = adminUserIds.length > 0 && adminUserIds.includes(userId)
    const isAdminByEmail = user?.emailAddresses?.some(email => 
      adminEmails.includes(email.emailAddress)
    )
    
    if (!isAdminById && !isAdminByEmail) {
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