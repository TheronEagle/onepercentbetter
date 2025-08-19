
'use client'

import { ReactNode } from 'react'

interface ClerkProviderWrapperProps {
  children: ReactNode
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  // Simple wrapper that just passes through children
  // This removes all Clerk dependencies to prevent errors
  return <>{children}</>
}
