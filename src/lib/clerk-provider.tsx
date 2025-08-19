'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode, Suspense } from 'react'

interface ClerkProviderWrapperProps {
  children: ReactNode
}

// Check if Clerk is properly configured
const isClerkConfigured = () => {
  return typeof window !== 'undefined' && 
         process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
         process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder'
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  // If Clerk is not configured, just return children without ClerkProvider
  if (!isClerkConfigured()) {
    return <>{children}</>
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        appearance={{
          baseTheme: undefined,
          variables: {
            colorPrimary: '#fb923c',
            colorBackground: 'hsl(var(--background))',
            colorInputBackground: 'hsl(var(--card))',
            colorInputText: 'hsl(var(--foreground))',
            colorText: 'hsl(var(--foreground))',
            colorTextSecondary: 'hsl(var(--muted-foreground))',
            borderRadius: '0.75rem',
          },
          elements: {
            formButtonPrimary: 'btn-futuristic w-full cursor-button interactive',
            formFieldInput: 'bg-background border-border text-foreground focus:border-primary form-premium cursor-text',
            formFieldLabel: 'text-foreground font-medium cursor-text',
            card: 'bg-card border border-border shadow-lg rounded-lg card-premium',
            headerTitle: 'text-foreground text-2xl font-bold cursor-text',
            headerSubtitle: 'text-muted-foreground cursor-text',
            footerActionLink: 'text-orange-500 hover:text-orange-400 font-medium cursor-link interactive',
            socialButtonsBlockButton: 'bg-background border-border text-foreground hover:bg-muted transition-colors cursor-button interactive',
            dividerLine: 'bg-border',
            dividerText: 'text-muted-foreground cursor-text',
            formFieldError: 'text-red-500',
            formFieldErrorText: 'text-red-500 text-sm cursor-text',
            formFieldAction: 'text-orange-500 hover:text-orange-400 font-medium cursor-link interactive',
          },
        }}
      >
        {children}
      </ClerkProvider>
    </Suspense>
  )
}