import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Create route matcher for public routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/blog',
  '/contact',
  '/courses',
  '/courses/(.*)',
  '/products',
  '/products/(.*)',
  '/help',
  '/privacy',
  '/terms',
  '/auth/signin(.*)',
  '/auth/signup(.*)',
  '/api/courses',
  '/api/products',
])

export default clerkMiddleware((auth, request) => {
  // If Clerk is not properly configured, allow all requests
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === 'pk_test_placeholder') {
    return NextResponse.next()
  }

  // Protect routes that are not public
  if (!isPublicRoute(request)) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};



