'use client'

import { SignUp } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Star } from 'lucide-react'
import { Suspense } from 'react'

function SignUpContent() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

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
          <h1 className="text-4xl font-bold text-gradient mb-2">Join 1% Better</h1>
          <p className="text-muted-foreground mb-4">Start your learning journey today</p>
          
          {/* Benefits */}
          <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-orange-500 mr-1" />
              <span>Premium Courses</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-orange-500 mr-1" />
              <span>Expert Instructors</span>
            </div>
          </div>
        </div>

        {/* Sign Up Form */}
        <SignUp 
          redirectUrl={redirect}
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-card border border-border shadow-lg rounded-lg",
              headerTitle: "text-foreground text-2xl font-bold",
              headerSubtitle: "text-muted-foreground",
              formButtonPrimary: "btn-futuristic w-full",
              formFieldInput: "bg-background border-border text-foreground focus:border-primary",
              formFieldLabel: "text-foreground font-medium",
              footerActionLink: "text-orange-500 hover:text-orange-400 font-medium",
              socialButtonsBlockButton: "bg-background border-border text-foreground hover:bg-muted transition-colors",
              dividerLine: "bg-border",
              dividerText: "text-muted-foreground",
              formFieldError: "text-red-500",
              formFieldErrorText: "text-red-500 text-sm",
            }
          }}
        />

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-orange-500 hover:text-orange-400 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <SignUpContent />
    </Suspense>
  )
} 