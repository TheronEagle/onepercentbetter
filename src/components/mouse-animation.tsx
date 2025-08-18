'use client'

import { useEffect, useState } from 'react'

export default function MouseAnimation() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let isDragging = false
    let dragStartX = 0
    let dragStartY = 0

    const createRipple = (event: MouseEvent) => {
      const ripple = document.createElement('div')
      ripple.className = 'cursor-ripple'
      ripple.style.left = event.clientX + 'px'
      ripple.style.top = event.clientY + 'px'
      
      document.body.appendChild(ripple)
      
      // Remove ripple after animation
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple)
        }
      }, 600)
    }

    const createHoverEffect = (event: MouseEvent) => {
      const hover = document.createElement('div')
      hover.className = 'cursor-hover'
      hover.style.left = event.clientX + 'px'
      hover.style.top = event.clientY + 'px'
      
      document.body.appendChild(hover)
      
      // Activate hover effect
      setTimeout(() => {
        hover.classList.add('active')
      }, 10)
      
      // Remove hover after animation
      setTimeout(() => {
        if (hover.parentNode) {
          hover.parentNode.removeChild(hover)
        }
      }, 300)
    }

    const createDragEffect = (event: MouseEvent) => {
      const drag = document.createElement('div')
      drag.className = 'cursor-drag'
      drag.style.left = event.clientX + 'px'
      drag.style.top = event.clientY + 'px'
      
      document.body.appendChild(drag)
      
      // Activate drag effect
      setTimeout(() => {
        drag.classList.add('active')
      }, 10)
      
      // Remove drag after animation
      setTimeout(() => {
        if (drag.parentNode) {
          drag.parentNode.removeChild(drag)
        }
      }, 200)
    }

    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY })
      
      if (!isVisible) {
        setIsVisible(true)
      }

      // Check if hovering over interactive elements
      const target = event.target as HTMLElement
      if (target) {
        // Determine cursor variant based on element type
        if (target.classList.contains('btn-futuristic') || 
            target.classList.contains('btn-haptic') ||
            target.tagName === 'BUTTON' ||
            target.closest('button')) {
          setCursorVariant('button')
          createHoverEffect(event)
        } else if (target.classList.contains('card-premium') ||
                   target.classList.contains('interactive')) {
          setCursorVariant('card')
          createHoverEffect(event)
        } else if (target.tagName === 'A' || target.closest('a')) {
          setCursorVariant('link')
          createHoverEffect(event)
        } else if (target.classList.contains('text-gradient') ||
                   target.classList.contains('hero-text-animate')) {
          setCursorVariant('text')
        } else {
          setCursorVariant('default')
        }
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setCursorVariant('default')
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true
      dragStartX = event.clientX
      dragStartY = event.clientY
      setCursorVariant('dragging')
      createDragEffect(event)
    }

    const handleMouseUp = (event: MouseEvent) => {
      if (isDragging) {
        isDragging = false
        const dragDistance = Math.sqrt(
          Math.pow(event.clientX - dragStartX, 2) + 
          Math.pow(event.clientY - dragStartY, 2)
        )
        
        // If dragged more than 10px, create a special drag effect
        if (dragDistance > 10) {
          createDragEffect(event)
        }
      }
      
      // Reset cursor variant
      const target = event.target as HTMLElement
      if (target) {
        if (target.classList.contains('btn-futuristic') || 
            target.classList.contains('btn-haptic') ||
            target.tagName === 'BUTTON' ||
            target.closest('button')) {
          setCursorVariant('button')
        } else if (target.classList.contains('card-premium') ||
                   target.classList.contains('interactive')) {
          setCursorVariant('card')
        } else if (target.tagName === 'A' || target.closest('a')) {
          setCursorVariant('link')
        } else {
          setCursorVariant('default')
        }
      }
    }

    const handleDrag = (event: MouseEvent) => {
      if (isDragging) {
        createDragEffect(event)
      }
    }

    // Add event listeners
    document.addEventListener('click', createRipple)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('drag', handleDrag)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    // Cleanup
    return () => {
      document.removeEventListener('click', createRipple)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('drag', handleDrag)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible])

  return (
    <>
      {/* Custom Cursor */}
      <div 
        className={`fixed pointer-events-none z-[9999] transition-all duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Main cursor dot */}
        <div className={`w-4 h-4 rounded-full transition-all duration-200 ${
          cursorVariant === 'button' ? 'bg-orange-500 scale-150' :
          cursorVariant === 'card' ? 'bg-blue-500 scale-125' :
          cursorVariant === 'link' ? 'bg-green-500 scale-125' :
          cursorVariant === 'text' ? 'bg-purple-500 scale-110' :
          cursorVariant === 'dragging' ? 'bg-red-500 scale-75' :
          'bg-orange-400 scale-100'
        }`} />
        
        {/* Outer ring */}
        <div className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
          cursorVariant === 'button' ? 'border-orange-300 scale-200' :
          cursorVariant === 'card' ? 'border-blue-300 scale-175' :
          cursorVariant === 'link' ? 'border-green-300 scale-175' :
          cursorVariant === 'text' ? 'border-purple-300 scale-150' :
          cursorVariant === 'dragging' ? 'border-red-300 scale-125' :
          'border-orange-300 scale-150'
        }`} />
        
        {/* Pulse effect for interactive elements */}
        {(cursorVariant === 'button' || cursorVariant === 'card' || cursorVariant === 'link') && (
          <div className={`absolute inset-0 rounded-full animate-ping ${
            cursorVariant === 'button' ? 'bg-orange-400' :
            cursorVariant === 'card' ? 'bg-blue-400' :
            'bg-green-400'
          }`} style={{ animationDuration: '1s' }} />
        )}
      </div>
      
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        /* Show default cursor for mobile/touch devices */
        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
        
        /* Show default cursor when custom cursor is disabled */
        .cursor-disabled * {
          cursor: auto !important;
        }
      `}</style>
    </>
  )
}
