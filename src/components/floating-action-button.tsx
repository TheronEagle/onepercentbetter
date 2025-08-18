'use client'

import { useState, useEffect } from 'react'
import { Plus, BookOpen, MessageCircle, HelpCircle, X, ChevronUp } from 'lucide-react'
import Link from 'next/link'

interface FloatingActionButtonProps {
  className?: string
}

export default function FloatingActionButton({ className = '' }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const actionItems = [
    {
      icon: BookOpen,
      label: 'Browse Courses',
      href: '/courses',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: MessageCircle,
      label: 'Contact',
      href: '/contact',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: HelpCircle,
      label: 'Help',
      href: '/help',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ]

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="mb-4 w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group interactive"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative interactive ${isOpen ? 'rotate-45' : ''}`}
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-all duration-200" />
        ) : (
          <Plus className="h-6 w-6 transition-all duration-200" />
        )}

        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      {/* Action Menu */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 flex flex-col gap-3">
          {actionItems.map((item, index) => (
            <div key={item.label} className="flex items-center">
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`w-12 h-12 ${item.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden interactive`}
              >
                <item.icon className="h-5 w-5 relative z-10" />
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Tooltip */}
                <div className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {item.label}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
