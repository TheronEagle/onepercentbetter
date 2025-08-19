
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, BookOpen } from 'lucide-react'
import { useAnimation } from '@/lib/animation-context'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { enableCursor, disableCursor } = useAnimation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCursorEnter = () => {
    enableCursor()
  }

  const handleCursorLeave = () => {
    disableCursor()
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
            className="flex items-center space-x-2 text-white font-bold text-xl z-10"
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
          >
            <BookOpen className="h-8 w-8 text-orange-500" />
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              1% Better
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-white/80 hover:text-white transition-colors font-medium ${
                  pathname === item.href ? 'text-orange-500' : ''
                }`}
                onMouseEnter={handleCursorEnter}
                onMouseLeave={handleCursorLeave}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onMouseEnter={handleCursorEnter}
                onMouseLeave={handleCursorLeave}
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button 
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0"
                onMouseEnter={handleCursorEnter}
                onMouseLeave={handleCursorLeave}
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white z-10"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10">
            <div className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-white/80 hover:text-white transition-colors font-medium py-2 ${
                    pathname === item.href ? 'text-orange-500' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0">
                    Get Started
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
