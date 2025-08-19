'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

interface ClerkProviderWrapperProps {
  children: ReactNode
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  // Check if Clerk is properly configured
  if (!publishableKey || !publishableKey.startsWith('pk_') || publishableKey.length < 20) {
    console.warn('Clerk not properly configured, using fallback mode')
    // Return children without Clerk wrapper for demo mode
    return <>{children}</>
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#f97316',
          colorBackground: '#000000',
          colorInputBackground: '#1a1a1a',
          colorInputText: '#ffffff',
        },
        elements: {
          formButtonPrimary: 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600',
          card: 'bg-black border border-white/10',
          headerTitle: 'text-white',
          headerSubtitle: 'text-white/70',
          socialButtonsBlockButton: 'border border-white/10 text-white hover:bg-white/10',
          formFieldLabel: 'text-white',
          formFieldInput: 'bg-white/10 border-white/20 text-white',
          footerActionLink: 'text-orange-500 hover:text-orange-400',
        }
      }}
    >
      {children}
    </ClerkProvider>
  )
}