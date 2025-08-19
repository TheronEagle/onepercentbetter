
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Star } from 'lucide-react'

// Check if Clerk is configured
const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return key && key !== 'pk_test_placeholder' && key.length > 20
}

export default function SignInPage() {
  const [showClerk, setShowClerk] = useState(false)
  const [ClerkSignIn, setClerkSignIn] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const loadClerk = async () => {
      if (isClerkConfigured()) {
        try {
          const { SignIn } = await import('@clerk/nextjs')
          setClerkSignIn(() => SignIn)
          setShowClerk(true)
        } catch (error) {
          console.log('Clerk not available:', error)
          setShowClerk(false)
        }
      }
    }
    loadClerk()
  }, [])

  if (showClerk && ClerkSignIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back to Home */}
          <div className="mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-muted-foreground mb-4">Sign in to continue your learning journey</p>
          </div>

          {/* Clerk Sign In */}
          <div className="flex justify-center">
            <ClerkSignIn
              routing="path"
              path="/auth/signin"
              fallbackRedirectUrl="/admin"
              signUpUrl="/auth/signup"
            />
          </div>
        </div>
      </div>
    )
  }

  // Fallback demo sign-in
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Demo Mode</h1>
          <p className="text-muted-foreground mb-4">Clerk not configured - using demo authentication</p>
        </div>

        <div className="bg-card border border-border shadow-lg rounded-lg p-6">
          <button
            onClick={() => {
              localStorage.setItem('user', JSON.stringify({
                email: 'demo@example.com',
                firstName: 'Demo',
                lastName: 'User'
              }))
              router.push('/admin')
            }}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 px-4 rounded"
          >
            Demo Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
