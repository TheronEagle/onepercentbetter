
import { useUser } from '@clerk/nextjs'

export default function DebugUser() {
  const { user, isLoaded } = useUser()
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
      <h3 className="text-yellow-500 font-bold mb-2">Debug Info (Development Only)</h3>
      <div className="text-white/80 text-sm space-y-1">
        <p><strong>Clerk Loaded:</strong> {isLoaded ? 'Yes' : 'No'}</p>
        <p><strong>User ID:</strong> {user?.id || 'None'}</p>
        <p><strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress || 'None'}</p>
        <p><strong>First Name:</strong> {user?.firstName || 'None'}</p>
        <p><strong>Publishable Key:</strong> {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.substring(0, 20)}...</p>
        {user?.id && (
          <p className="mt-2 p-2 bg-blue-500/20 rounded">
            <strong>Copy this User ID for admin access:</strong><br />
            <code className="text-blue-300">{user.id}</code>
          </p>
        )}
      </div>
    </div>
  )
}
