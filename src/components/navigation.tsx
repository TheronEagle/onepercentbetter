'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, User, Menu, X, Settings, LogOut, Crown, ChevronDown, Sparkles, Zap } from 'lucide-react'

// Safe hook wrappers to prevent crashes
function useSafeUser() {
  try {
    const { useUser } = require('@clerk/nextjs')
    return useUser()
  } catch {
    return { user: null, isLoaded: true }
  }
}

function useSafeClerk() {
  try {
    const { useClerk } = require('@clerk/nextjs')
    return useClerk()
  } catch {
    return { signOut: () => {}, openSignIn: () => {} }
  }
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { user, isLoaded } = useSafeUser()
  const { signOut } = useSafeClerk()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { href: '/products', label: 'Products' },
    { href: '/courses', label: 'Courses' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const handleSignOut = async () => {
    await signOut()
  }

  // 3D scroll effect calculations
  const navTransform = `translateZ(${Math.min(scrollY * 0.1, 20)}px)`
  const navOpacity = Math.max(0.8, 1 - scrollY * 0.001)
  const logoScale = 1 + Math.min(scrollY * 0.0001, 0.05)
  const menuItemsTransform = `translateZ(${Math.min(scrollY * 0.05, 10)}px)`

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out nav-glow"
      style={{
        transform: navTransform,
        opacity: navOpacity,
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* 3D Background Layer */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-orange-500/20 to-orange-600/20 backdrop-blur-md"
        style={{
          transform: `translateZ(-10px) scale(${1 + scrollY * 0.0001})`,
          filter: `blur(${Math.min(scrollY * 0.01, 2)}px)`
        }}
      />

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/20 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translateZ(${Math.min(scrollY * 0.02, 5)}px) translateY(${Math.sin(scrollY * 0.01 + i) * 5}px)`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo with 3D effect */}
          <Link href="/" className="flex items-center space-x-3 group relative interactive">
            <div
              className="relative transition-transform duration-300 group-hover:scale-110"
              style={{ transform: `scale(${logoScale})` }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"
                style={{
                  transform: `translateZ(${Math.min(scrollY * 0.05, 15)}px) rotateY(${Math.sin(scrollY * 0.01) * 5}deg)`
                }}
              />
              <BookOpen
                className="h-10 w-10 text-white relative z-10 p-2 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg transition-all duration-300"
                style={{
                  transform: `translateZ(${Math.min(scrollY * 0.08, 20)}px) rotateX(${Math.sin(scrollY * 0.008) * 3}deg)`
                }}
              />
            </div>
            <div
              className="flex flex-col transition-transform duration-300"
              style={{ transform: `translateZ(${Math.min(scrollY * 0.03, 8)}px)` }}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                1% Better
              </span>
              <span className="text-xs text-gray-300 -mt-1">Premium Learning</span>
            </div>
          </Link>

          {/* Desktop Menu with 3D effect */}
          <div
            className="hidden lg:flex items-center space-x-8"
            style={{ transform: menuItemsTransform }}
          >
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-white hover:text-orange-200 transition-all duration-300 font-medium group interactive btn-haptic"
                style={{
                  transform: `translateZ(${Math.min(scrollY * 0.02 + index * 2, 10)}px)`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-300 transition-all duration-300 group-hover:w-full"
                  style={{
                    transform: `translateZ(${Math.min(scrollY * 0.01, 3)}px)`
                  }}
                />
              </Link>
            ))}

            {/* Resources Dropdown with 3D effect */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-white hover:text-orange-200 transition-all duration-300 font-medium interactive btn-haptic"
                style={{
                  transform: `translateZ(${Math.min(scrollY * 0.02, 8)}px) rotateY(${Math.sin(scrollY * 0.005) * 2}deg)`
                }}
              >
                <span>Resources</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div
                className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                style={{
                  transform: `translateZ(${Math.min(scrollY * 0.05, 15)}px) rotateX(${Math.sin(scrollY * 0.003) * 1}deg)`
                }}
              >
                <div className="p-4 space-y-2">
                  <Link href="/help" className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors interactive">
                    Help Center
                  </Link>
                  <Link href="/support" className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors interactive">
                    Support
                  </Link>
                  <Link href="/faq" className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors interactive">
                    FAQ
                  </Link>
                  <div className="border-t border-gray-100 my-2"></div>
                  <Link href="/privacy" className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors interactive">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors interactive">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Actions with 3D effect */}
          <div
            className="hidden lg:flex items-center space-x-4"
            style={{ transform: `translateZ(${Math.min(scrollY * 0.04, 12)}px)` }}
          >
            {isLoaded && user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:shadow-lg transition-all duration-200 rounded-xl px-4 py-2 text-white btn-haptic"
                  style={{
                    transform: `translateZ(${Math.min(scrollY * 0.06, 18)}px) rotateY(${Math.sin(scrollY * 0.004) * 3}deg)`
                  }}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-white">{user.firstName || 'User'}</span>
                  <ChevronDown className="h-4 w-4 text-white/70" />
                </Button>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 py-2 animate-in slide-in-from-top-2 duration-200"
                    style={{
                      transform: `translateZ(${Math.min(scrollY * 0.08, 25)}px)`
                    }}
                  >
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm font-medium text-gray-900">{user.firstName || 'User'}</p>
                      <p className="text-sm text-gray-500">{user.emailAddresses[0]?.emailAddress}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors interactive"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Crown className="h-4 w-4 mr-3 text-orange-500" />
                        Admin Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors interactive"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors interactive"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  asChild
                  className="font-medium text-white hover:text-orange-200 hover:bg-white/10 transition-all duration-200 btn-haptic"
                  style={{
                    transform: `translateZ(${Math.min(scrollY * 0.05, 15)}px)`
                  }}
                >
                  <Link href="/auth/signin">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-medium px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 btn-futuristic btn-haptic"
                  style={{
                    transform: `translateZ(${Math.min(scrollY * 0.07, 20)}px) rotateY(${Math.sin(scrollY * 0.006) * 2}deg)`
                  }}
                >
                  <Link href="/auth/signup" className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button with 3D effect */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white btn-haptic"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              transform: `translateZ(${Math.min(scrollY * 0.03, 10)}px)`
            }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu with 3D effect */}
        {isMenuOpen && (
          <div
            className="lg:hidden py-6 border-t border-white/20 bg-white/10 backdrop-blur-xl"
            style={{
              transform: `translateZ(${Math.min(scrollY * 0.02, 8)}px)`
            }}
          >
            <div className="flex flex-col space-y-4">
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-orange-200 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white/10 interactive btn-haptic"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    transform: `translateZ(${Math.min(scrollY * 0.01 + index, 5)}px)`
                  }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Resources */}
              <div className="px-4 py-2">
                <div className="text-sm font-medium text-white/70 mb-2">Resources</div>
                <div className="space-y-2">
                  <Link href="/help" className="block text-white hover:text-orange-200 transition-colors interactive" onClick={() => setIsMenuOpen(false)}>
                    Help Center
                  </Link>
                  <Link href="/support" className="block text-white hover:text-orange-200 transition-colors interactive" onClick={() => setIsMenuOpen(false)}>
                    Support
                  </Link>
                  <Link href="/faq" className="block text-white hover:text-orange-200 transition-colors interactive" onClick={() => setIsMenuOpen(false)}>
                    FAQ
                  </Link>
                  <Link href="/privacy" className="block text-white hover:text-orange-200 transition-colors interactive" onClick={() => setIsMenuOpen(false)}>
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="block text-white hover:text-orange-200 transition-colors interactive" onClick={() => setIsMenuOpen(false)}>
                    Terms of Service
                  </Link>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                {isLoaded && user ? (
                  <>
                    <div className="flex items-center space-x-3 px-4 mb-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.firstName || 'User'}</p>
                        <p className="text-sm text-white/70">{user.emailAddresses[0]?.emailAddress}</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-start px-4 text-white hover:bg-white/10 btn-haptic" asChild>
                      <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                        <Crown className="h-4 w-4 mr-3 text-orange-500" />
                        Admin Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start px-4 text-white hover:bg-white/10 btn-haptic" asChild>
                      <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-4 text-red-300 hover:text-red-200 hover:bg-red-500/10 btn-haptic"
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="w-full justify-start px-4 text-white hover:bg-white/10 btn-haptic" asChild>
                      <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                        <User className="h-4 w-4 mr-3" />
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full mt-2 mx-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white btn-futuristic btn-haptic" asChild>
                      <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}