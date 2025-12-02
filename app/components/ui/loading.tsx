'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  messages?: string[]
  className?: string
}

export function Loading({ size = 'md', message, messages, className }: LoadingProps) {
  const [currentMessage, setCurrentMessage] = React.useState(0)

  React.useEffect(() => {
    if (!messages || messages.length === 0) return

    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [messages])

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  }

  const displayMessage = messages && messages.length > 0 ? messages[currentMessage] : message

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <svg
        className={cn('animate-spin text-primary', sizeClasses[size])}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {displayMessage && (
        <p className="text-gray-600 text-center animate-pulse">{displayMessage}</p>
      )}
    </div>
  )
}

export const LOADING_MESSAGES = [
  'Cooking up something good...',
  'Consulting the excuse archives...',
  'Making it sound believable...',
  'Adding just the right amount of detail...',
  'Polishing your perfect excuse...',
  'Almost there...',
]
