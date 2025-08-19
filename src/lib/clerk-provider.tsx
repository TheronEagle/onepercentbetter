'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

interface ClerkProviderWrapperProps {
  children: ReactNode
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  return (
    <ClerkProvider
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
  )
}