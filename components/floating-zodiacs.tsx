"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface FloatingZodiacsProps {
  className?: string
}

export function FloatingZodiacs({ className }: FloatingZodiacsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const zodiacSymbols = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]
    const elements: HTMLDivElement[] = []

    // Create zodiac elements
    zodiacSymbols.forEach((symbol) => {
      const element = document.createElement("div")
      element.textContent = symbol
      element.className = "absolute text-white/20 text-4xl transition-all duration-[20000ms] ease-in-out"

      // Random initial position
      element.style.left = `${Math.random() * 90 + 5}%`
      element.style.top = `${Math.random() * 90 + 5}%`

      // Random rotation
      element.style.transform = `rotate(${Math.random() * 360}deg)`

      container.appendChild(element)
      elements.push(element)
    })

    // Animate zodiac symbols
    const animate = () => {
      elements.forEach((element) => {
        // New random position
        element.style.left = `${Math.random() * 90 + 5}%`
        element.style.top = `${Math.random() * 90 + 5}%`

        // New random rotation
        element.style.transform = `rotate(${Math.random() * 360}deg)`
      })
    }

    // Start animation and repeat
    animate()
    const interval = setInterval(animate, 20000) // Move every 20 seconds

    return () => {
      clearInterval(interval)
      elements.forEach((element) => element.remove())
    }
  }, [])

  return <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)} />
}
