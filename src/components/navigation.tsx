
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, BookOpen, Sparkles } from 'lucide-react'
import { useAnimation } from '@/lib/animation-context'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { enableCursor, disableCursor } = useAnimation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window)
    }

    handleScroll()
    checkMobile()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const handleCursorEnter = (itemName?: string) => {
    if (!isMobile) {
      enableCursor()
      // Create ripple effect
      const event = new CustomEvent('cursor-haptic', { 
        detail: { type: 'menu-hover', intensity: 'medium' } 
      })
      window.dispatchEvent(event)
    }
    if (itemName) {
      setHoveredItem(itemName)
    }
  }

  const handleCursorLeave = () => {
    if (!isMobile) {
      disableCursor()
    }
    setHoveredItem(null)
  }

  const handleMobileTouch = (itemName: string) => {
    if (isMobile) {
      // Haptic feedback for mobile
      if ('vibrate' in navigator) {
        navigator.vibrate([10, 5, 10]) // Short vibration pattern
      }
      
      // Visual feedback
      setHoveredItem(itemName)
      setTimeout(() => setHoveredItem(null), 200)
    }
  }

  const createMenuRipple = (event: React.MouseEvent) => {
    if (isMobile) return
    
    const button = event.currentTarget as HTMLElement
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2
    
    const ripple = document.createElement('div')
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      z-index: 0;
    `
    
    button.style.position = 'relative'
    button.style.overflow = 'hidden'
    button.appendChild(ripple)
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple)
      }
    }, 600)
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/products', label: 'Products' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className={`flex items-center space-x-2 text-white font-bold text-xl z-10 transition-all duration-300 ${
              hoveredItem === 'logo' ? 'scale-105' : ''
            }`}
            onMouseEnter={() => handleCursorEnter('logo')}
            onMouseLeave={handleCursorLeave}
            onTouchStart={() => handleMobileTouch('logo')}
            onClick={!isMobile ? createMenuRipple : undefined}
          >
            <BookOpen className={`h-8 w-8 text-orange-500 transition-all duration-300 ${
              hoveredItem === 'logo' ? 'rotate-12 scale-110' : ''
            }`} />
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              1% Better
            </span>
            {hoveredItem === 'logo' && !isMobile && (
              <Sparkles className="h-4 w-4 text-orange-400 animate-pulse" />
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-white/80 hover:text-white transition-all duration-300 font-medium group cursor-none ${
                  pathname === item.href ? 'text-orange-500' : ''
                } ${hoveredItem === item.label ? 'scale-110 text-orange-400' : ''}`}
                onMouseEnter={() => handleCursorEnter(item.label)}
                onMouseLeave={handleCursorLeave}
                onClick={createMenuRipple}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Hover background effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-sm transition-all duration-300 ${
                  hoveredItem === item.label ? 'scale-150 opacity-100' : 'scale-0 opacity-0'
                }`} />
                
                {/* Active indicator */}
                {pathname === item.href && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" />
                )}
                
                {/* Sparkle effect on hover */}
                {hoveredItem === item.label && (
                  <>
                    <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-orange-400 animate-pulse" />
                    <Sparkles className="absolute -bottom-1 -left-1 h-2 w-2 text-pink-400 animate-pulse animation-delay-200" />
                  </>
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button 
                variant="ghost" 
                className={`text-white hover:bg-white/10 transition-all duration-300 cursor-none ${
                  hoveredItem === 'signin' ? 'scale-105 bg-white/5' : ''
                }`}
                onMouseEnter={() => handleCursorEnter('signin')}
                onMouseLeave={handleCursorLeave}
                onClick={createMenuRipple}
              >
                Sign In
                {hoveredItem === 'signin' && (
                  <Sparkles className="ml-1 h-3 w-3 text-orange-400 animate-pulse" />
                )}
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button 
                className={`bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 transition-all duration-300 cursor-none relative overflow-hidden ${
                  hoveredItem === 'signup' ? 'scale-105 shadow-lg shadow-orange-500/25' : ''
                }`}
                onMouseEnter={() => handleCursorEnter('signup')}
                onMouseLeave={handleCursorLeave}
                onClick={createMenuRipple}
              >
                Get Started
                {hoveredItem === 'signup' && (
                  <>
                    <Sparkles className="ml-1 h-3 w-3 text-white animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-pink-400/30 animate-pulse" />
                  </>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden text-white z-10 p-2 rounded-full transition-all duration-300 ${
              hoveredItem === 'menu' ? 'bg-white/10 scale-110' : ''
            } ${isOpen ? 'rotate-180' : ''}`}
            onClick={() => {
              setIsOpen(!isOpen)
              handleMobileTouch('menu')
            }}
            onMouseEnter={() => handleCursorEnter('menu')}
            onMouseLeave={handleCursorLeave}
            onTouchStart={() => handleMobileTouch('menu')}
          >
            {isOpen ? (
              <X className="h-6 w-6 transition-transform duration-300" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-4 p-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-white/80 hover:text-white transition-all duration-300 font-medium py-3 px-4 rounded-lg relative overflow-hidden ${
                    pathname === item.href ? 'text-orange-500 bg-orange-500/10' : ''
                  } ${hoveredItem === `mobile-${item.label}` ? 'bg-white/5 scale-105 text-orange-400' : ''}`}
                  onClick={() => setIsOpen(false)}
                  onTouchStart={() => handleMobileTouch(`mobile-${item.label}`)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {pathname === item.href && (
                      <Sparkles className="h-4 w-4 text-orange-500 animate-pulse" />
                    )}
                  </div>
                  
                  {/* Touch ripple effect */}
                  {hoveredItem === `mobile-${item.label}` && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 animate-pulse" />
                  )}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="ghost" 
                    className={`w-full text-white hover:bg-white/10 transition-all duration-300 ${
                      hoveredItem === 'mobile-signin' ? 'bg-white/5 scale-105' : ''
                    }`}
                    onTouchStart={() => handleMobileTouch('mobile-signin')}
                  >
                    Sign In
                    {hoveredItem === 'mobile-signin' && (
                      <Sparkles className="ml-2 h-3 w-3 text-orange-400 animate-pulse" />
                    )}
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                  <Button 
                    className={`w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 transition-all duration-300 ${
                      hoveredItem === 'mobile-signup' ? 'scale-105 shadow-lg shadow-orange-500/25' : ''
                    }`}
                    onTouchStart={() => handleMobileTouch('mobile-signup')}
                  >
                    Get Started
                    {hoveredItem === 'mobile-signup' && (
                      <Sparkles className="ml-2 h-3 w-3 text-white animate-pulse" />
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
