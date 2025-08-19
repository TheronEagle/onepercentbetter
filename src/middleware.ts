import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/auth/signin(.*)',
  '/auth/signup(.*)',
  '/api/webhook(.*)',
  '/',
  '/blog(.*)',
  '/about',
  '/contact',
  '/help',
  '/privacy',
  '/terms',
  '/courses',
  '/products',
  '/(api|trpc)(.*)',
])

export default clerkMiddleware((auth, request) => {
  // Protect routes that are not public
  if (!isPublicRoute(request)) {
    auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
}