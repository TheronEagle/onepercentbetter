'use client'

import { SignIn } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Star } from 'lucide-react'
import { Suspense } from 'react'

function SignInContent() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-button interactive"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8 hero-text-animate">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full cursor-magnet">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-2 cursor-text">Welcome Back</h1>
          <p className="text-muted-foreground mb-4 cursor-text">Sign in to continue your learning journey</p>
          
          {/* Benefits */}
          <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center cursor-text">
              <Star className="h-4 w-4 text-orange-500 mr-1" />
              <span>Premium Courses</span>
            </div>
            <div className="flex items-center cursor-text">
              <Star className="h-4 w-4 text-orange-500 mr-1" />
              <span>Expert Instructors</span>
            </div>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="hero-text-animate stagger-1">
          <SignIn 
            redirectUrl={redirect}
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-card border border-border shadow-lg rounded-lg card-premium",
                headerTitle: "text-foreground text-2xl font-bold cursor-text",
                headerSubtitle: "text-muted-foreground cursor-text",
                formButtonPrimary: "btn-futuristic w-full cursor-button interactive",
                formFieldInput: "bg-background border-border text-foreground focus:border-primary form-premium cursor-text",
                formFieldLabel: "text-foreground font-medium cursor-text",
                footerActionLink: "text-orange-500 hover:text-orange-400 font-medium cursor-link interactive",
                socialButtonsBlockButton: "bg-background border-border text-foreground hover:bg-muted transition-colors cursor-button interactive",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground cursor-text",
                formFieldError: "text-red-500",
                formFieldErrorText: "text-red-500 text-sm cursor-text",
                formFieldAction: "text-orange-500 hover:text-orange-400 font-medium cursor-link interactive",
              }
            }}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 hero-text-animate stagger-2">
          <p className="text-muted-foreground cursor-text">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-orange-500 hover:text-orange-400 font-medium cursor-link interactive">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  )
}