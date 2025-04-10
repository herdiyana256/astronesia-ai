"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  onComplete?: () => void
}

export function TypewriterText({ text, className, speed = 30, delay = 0, onComplete }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const completedRef = useRef(false)

  useEffect(() => {
    // Reset when text changes
    setDisplayText("")
    completedRef.current = true

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Delay before starting
    timeoutRef.current = setTimeout(() => {
      let currentIndex = 0

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1))
          currentIndex++
          timeoutRef.current = setTimeout(typeNextChar, speed)
        } else if (!completedRef.current) {
          completedRef.current = true
          if (onComplete) {
            onComplete()
          }
        }
      }

      typeNextChar()
    }, delay)

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      clearInterval(cursorInterval)
    }
  }, [text, speed, delay, onComplete])

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  )
}
