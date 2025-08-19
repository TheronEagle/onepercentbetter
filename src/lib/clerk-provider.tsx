
'use client'

import { ReactNode } from 'react'

interface ClerkProviderWrapperProps {
  children: ReactNode
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  // Simplified wrapper without any Clerk dependencies
  return <>{children}</>
}
