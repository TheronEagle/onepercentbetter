
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, BookOpen, User, Settings, LogOut } from 'lucide-react'
import { useAnimation } from '@/lib/animation-context'

// Safe Clerk hook usage
function useClerkSafely() {
  const [clerkUser, setClerkUser] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [signOut, setSignOut] = useState<(() => void) | null>(null)

  useEffect(() => {
    const loadClerk = async () => {
      try {
        // Check if Clerk is properly configured
        const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
        if (!publishableKey || publishableKey === 'pk_test_placeholder' || publishableKey.length < 20) {
          setIsLoaded(true)
          return
        }

        // Dynamic import of Clerk hooks
        const { useUser, useClerk } = await import('@clerk/nextjs')
        
        // This is a workaround - we'll handle Clerk state manually
        setIsLoaded(true)
      } catch (error) {
        console.log('Clerk not available, using fallback')
        setIsLoaded(true)
      }
    }

    loadClerk()
  }, [])

  return { user: clerkUser, isLoaded, signOut }
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { enableCursor, disableCursor } = useAnimation()
  const { user, isLoaded, signOut } = useClerkSafely()

  const handleSignOut = async () => {
    if (signOut) {
      await signOut()
    }
    // Fallback for development
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  // Check for fallback user (development mode)
  const fallbackUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null
  const currentUser = user || (fallbackUser ? JSON.parse(fallbackUser) : null)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-b border-white/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 font-bold text-xl text-white hover:text-orange-400 transition-colors btn-haptic"
            onMouseEnter={enableCursor}
            onMouseLeave={disableCursor}
          >
            <BookOpen className="h-8 w-8" />
            <span className="bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
              1% Better
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/courses" 
              className="text-white/80 hover:text-white transition-colors font-medium btn-haptic"
              onMouseEnter={enableCursor}
              onMouseLeave={disableCursor}
            >
              Courses
            </Link>
            <Link 
              href="/products" 
              className="text-white/80 hover:text-white transition-colors font-medium btn-haptic"
              onMouseEnter={enableCursor}
              onMouseLeave={disableCursor}
            >
              Products
            </Link>
            <Link 
              href="/blog" 
              className="text-white/80 hover:text-white transition-colors font-medium btn-haptic"
              onMouseEnter={enableCursor}
              onMouseLeave={disableCursor}
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="text-white/80 hover:text-white transition-colors font-medium btn-haptic"
              onMouseEnter={enableCursor}
              onMouseLeave={disableCursor}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-white/80 hover:text-white transition-colors font-medium btn-haptic"
              onMouseEnter={enableCursor}
              onMouseLeave={disableCursor}
            >
              Contact
            </Link>

            {/* Auth Buttons */}
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/admin"
                  className="text-white/80 hover:text-white transition-colors font-medium btn-haptic"
                  onMouseEnter={enableCursor}
                  onMouseLeave={disableCursor}
                >
                  <User className="h-4 w-4" />
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="btn-futuristic btn-haptic border-white/20 text-white hover:bg-white/10"
                  onMouseEnter={enableCursor}
                  onMouseLeave={disableCursor}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/auth/signin"
                  className="text-white/80 hover:text-white transition-colors font-medium btn-haptic"
                  onMouseEnter={enableCursor}
                  onMouseLeave={disableCursor}
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup"
                  onMouseEnter={enableCursor}
                  onMouseLeave={disableCursor}
                >
                  <Button className="btn-futuristic btn-haptic bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-none">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/20 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/courses" 
                className="text-white/80 hover:text-white transition-colors font-medium px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                Courses
              </Link>
              <Link 
                href="/products" 
                className="text-white/80 hover:text-white transition-colors font-medium px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/blog" 
                className="text-white/80 hover:text-white transition-colors font-medium px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className="text-white/80 hover:text-white transition-colors font-medium px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-white/80 hover:text-white transition-colors font-medium px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              {currentUser ? (
                <div className="px-4 py-2 space-y-2">
                  <Link 
                    href="/admin"
                    className="block text-white/80 hover:text-white transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button
                    onClick={() => {
                      handleSignOut()
                      setIsOpen(false)
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="px-4 py-2 space-y-2">
                  <Link 
                    href="/auth/signin"
                    className="block text-white/80 hover:text-white transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/signup"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-none">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
