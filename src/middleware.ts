import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // For now, just pass through all requests to avoid Clerk-related errors
  // This can be re-enabled once Clerk is properly configured
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};



