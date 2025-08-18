'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AnimationContextType {
  isPageTransitioning: boolean
  setPageTransitioning: (transitioning: boolean) => void
  prefersReducedMotion: boolean
  animationEnabled: boolean
  setAnimationEnabled: (enabled: boolean) => void
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [isPageTransitioning, setPageTransitioning] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [animationEnabled, setAnimationEnabled] = useState(true)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
      if (e.matches) {
        setAnimationEnabled(false)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const value = {
    isPageTransitioning,
    setPageTransitioning,
    prefersReducedMotion,
    animationEnabled,
    setAnimationEnabled,
  }

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider')
  }
  return context
}

// Animation utilities
export const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1]
    }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1]
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.68, -0.55, 0.265, 1.55]
    }
  }
}

export const buttonVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: [0.68, -0.55, 0.265, 1.55]
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: [0.68, -0.55, 0.265, 1.55]
    }
  }
}

export const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1],
      staggerChildren: 0.2
    }
  }
}

export const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1]
    }
  }
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1]
    }
  }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.68, -0.55, 0.265, 1.55]
    }
  }
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1]
    }
  }
}

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1]
    }
  }
}

