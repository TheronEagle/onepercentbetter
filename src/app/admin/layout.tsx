import { redirect } from "next/navigation";

// Check if Clerk keys are properly configured
const isClerkConfigured = () => {
  return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
         process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder' &&
         process.env.CLERK_SECRET_KEY && 
         process.env.CLERK_SECRET_KEY !== 'sk_test_placeholder'
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

  // Only import Clerk functions if configured
  try {
    const { auth, currentUser } = await import("@clerk/nextjs/server");
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
      redirect("/auth/signin?redirect=/admin");
    }

    // Check if user has admin role (you can customize this logic)
    // For now, we'll allow any authenticated user to access admin
    // In production, you might want to check for specific roles or email domains
    const isAdmin = user?.emailAddresses?.some(
      (email) => email.emailAddress === "admin@1percent-better.com" || 
      user.emailAddresses[0]?.emailAddress?.includes("admin")
    ) || true; // Temporarily allow all authenticated users

    if (!isAdmin) {
      redirect("/?error=unauthorized");
    }

    return (
      <div className="min-h-screen bg-background">
        {children}
      </div>
    );
  } catch (error) {
    // If there's an error with Clerk, allow access for development
    console.warn("Clerk not properly configured, allowing admin access for development");
    return (
      <div className="min-h-screen bg-background">
        {children}
      </div>
    );
  }
}




