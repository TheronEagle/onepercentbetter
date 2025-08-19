
'use client'

import { useUser } from '@clerk/nextjs'

export default function DebugUser() {
  const { user } = useUser()
  
  if (!user) return null
  
  return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
      <p><strong>Debug Info (remove this component in production):</strong></p>
      <p>User ID: {user.id}</p>
      <p>Email: {user.emailAddresses[0]?.emailAddress}</p>
    </div>
  )
}
