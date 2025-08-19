'use client'

import { ReactNode } from 'react'

interface ClerkProviderWrapperProps {
  children: ReactNode
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  // For deployment stability, we'll render without Clerk provider
  // This can be re-enabled once Clerk is properly configured with correct React version
  return <>{children}</>
}