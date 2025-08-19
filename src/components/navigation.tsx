
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, BookOpen, User, Settings, LogOut } from 'lucide-react'
import { useAnimation } from '@/lib/animation-context'

// Dynamic import to handle cases where Clerk might not be available
let useUser: any = null
let useClerk: any = null

try {
  const clerkHooks = require('@clerk/nextjs')
  useUser = clerkHooks.useUser
  useClerk = clerkHooks.useClerk
} catch (error) {
  console.log('Clerk not available, using fallback')
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { cursorVariant, setCursorVariant, cursorText, setCursorText } = useAnimation()

  // Check if Clerk is properly configured
  const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
                           process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder'

  // Use Clerk hooks if available and configured
  let user = null
  let isLoaded = false
  let signOut = null

  if (isClerkConfigured && useUser && useClerk) {
    try {
      const clerkUserData = useUser()
      user = clerkUserData.user
      isLoaded = clerkUserData.isLoaded
      signOut = useClerk().signOut
    } catch (error) {
      console.log('Error using Clerk hooks:', error)
      isLoaded = true // Set to true to avoid infinite loading
    }
  } else {
    isLoaded = true // Set to true when not using Clerk
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCursorEnter = (variant: any, text = '') => {
    setCursorVariant(variant)
    setCursorText(text)
  }

  const handleCursorLeave = () => {
    setCursorVariant('default')
    setCursorText('')
  }

  const handleSignOut = async () => {
    if (signOut) {
      await signOut()
    }
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/products', label: 'Products' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            onMouseEnter={() => handleCursorEnter('button', 'Home')}
            onMouseLeave={handleCursorLeave}
          >
            1% Better
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group"
                onMouseEnter={() => handleCursorEnter('button', link.label)}
                onMouseLeave={handleCursorLeave}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoaded ? (
              <div className="animate-pulse">
                <div className="h-8 w-20 bg-white/20 rounded"></div>
              </div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/admin"
                  className="text-white/80 hover:text-white transition-colors font-medium"
                  onMouseEnter={() => handleCursorEnter('button', 'Admin')}
                  onMouseLeave={handleCursorLeave}
                >
                  <Settings className="h-5 w-5" />
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-white/80 text-sm">
                    {user.firstName || user.emailAddresses?.[0]?.emailAddress}
                  </span>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className="text-white/80 hover:text-white hover:bg-white/10"
                    onMouseEnter={() => handleCursorEnter('button', 'Sign Out')}
                    onMouseLeave={handleCursorLeave}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/auth/signin"
                  className="text-white/80 hover:text-white transition-colors font-medium"
                  onMouseEnter={() => handleCursorEnter('button', 'Sign In')}
                  onMouseLeave={handleCursorLeave}
                >
                  Sign In
                </Link>
                <Button 
                  asChild
                  className="btn-futuristic btn-haptic bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
                  onMouseEnter={() => handleCursorEnter('button', 'Get Started')}
                  onMouseLeave={handleCursorLeave}
                >
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => handleCursorEnter('button')}
            onMouseLeave={handleCursorLeave}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-xl rounded-lg border border-white/10 mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <hr className="border-white/10 my-2" />
              
              {!isLoaded ? (
                <div className="px-3 py-2">
                  <div className="animate-pulse">
                    <div className="h-8 w-20 bg-white/20 rounded"></div>
                  </div>
                </div>
              ) : user ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-sm text-white/60">
                    {user.firstName || user.emailAddresses?.[0]?.emailAddress}
                  </div>
                  <Link
                    href="/admin"
                    className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link
                    href="/auth/signin"
                    className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
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
