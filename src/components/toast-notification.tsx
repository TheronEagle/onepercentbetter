'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    setToasts(prev => [...prev, newToast])

    // Auto-hide after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        hideToast(id)
      }, toast.duration || 5000)
    }
  }

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} hideToast={hideToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastContainerProps {
  toasts: Toast[]
  hideToast: (id: string) => void
}

function ToastContainer({ toasts, hideToast }: ToastContainerProps) {
  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getBackgroundColor = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
    }
  }

  const getTextColor = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-800'
      case 'error':
        return 'text-red-800'
      case 'warning':
        return 'text-yellow-800'
      case 'info':
        return 'text-blue-800'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-sm w-full ${getBackgroundColor(toast.type)} border rounded-lg shadow-lg backdrop-blur-sm toast-enter`}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {getIcon(toast.type)}
              </div>
              <div className="ml-3 flex-1">
                <h3 className={`text-sm font-medium ${getTextColor(toast.type)}`}>
                  {toast.title}
                </h3>
                {toast.message && (
                  <p className={`mt-1 text-sm ${getTextColor(toast.type)} opacity-80`}>
                    {toast.message}
                  </p>
                )}
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => hideToast(toast.id)}
                  className={`inline-flex ${getTextColor(toast.type)} hover:opacity-70 transition-opacity duration-200`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Predefined toast functions for common use cases
export const toast = {
  success: (title: string, message?: string) => ({
    type: 'success' as const,
    title,
    message
  }),
  error: (title: string, message?: string) => ({
    type: 'error' as const,
    title,
    message
  }),
  warning: (title: string, message?: string) => ({
    type: 'warning' as const,
    title,
    message
  }),
  info: (title: string, message?: string) => ({
    type: 'info' as const,
    title,
    message
  })
}
