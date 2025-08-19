
'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

interface ClerkProviderWrapperProps {
  children: ReactNode
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  // Check if Clerk is properly configured
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  // If Clerk is not configured or using placeholder keys, render without Clerk
  if (!publishableKey || publishableKey === 'pk_test_placeholder' || publishableKey.length < 20) {
    return <>{children}</>
  }

  // If Clerk is properly configured, wrap with ClerkProvider
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#667eea',
          colorBackground: '#1a1a2e',
          colorInputBackground: '#16213e',
          colorInputText: '#ffffff',
          colorText: '#ffffff',
          colorTextSecondary: '#a0a0a0',
          colorShimmer: '#667eea',
          borderRadius: '8px',
          fontFamily: 'Inter, sans-serif',
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: '#667eea',
            '&:hover': {
              backgroundColor: '#5a67d8',
            },
          },
          card: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
          headerTitle: {
            color: '#ffffff',
          },
          headerSubtitle: {
            color: '#a0a0a0',
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}
