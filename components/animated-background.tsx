"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

interface AnimatedBackgroundProps {
  theme:
    | "mystic-night"
    | "nebula-glow"
    | "golden-aura"
    | "emerald-forest"
    | "cosmic-white"
    | "ocean-depths"
    | "sunset-dream"
    | "aurora-borealis"
  className?: string
}

export function AnimatedBackground({ theme, className }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number>(0)

  // Initialize stars
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  // Create stars when dimensions change
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const starCount = Math.floor((dimensions.width * dimensions.height) / 3000)
    const stars: Star[] = []

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.05 + 0.01,
      })
    }

    starsRef.current = stars
  }, [dimensions])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      starsRef.current.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)

        // Set color based on theme
        if (theme === "mystic-night") {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        } else if (theme === "nebula-glow") {
          // Random colors for nebula effect
          const hue = Math.random() * 60 + 240 // Blue to purple range
          ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${star.opacity})`
        } else if (theme === "golden-aura") {
          // Golden colors
          const hue = Math.random() * 50 + 30 // Golden range
          ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${star.opacity})`
        } else if (theme === "emerald-forest") {
          // Green colors
          const hue = Math.random() * 40 + 120 // Green range
          ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${star.opacity})`
        } else if (theme === "cosmic-white") {
          // White with slight color variations
          const hue = Math.random() * 360
          ctx.fillStyle = `hsla(${hue}, 30%, 90%, ${star.opacity})`
        } else if (theme === "ocean-depths") {
          // Blue colors
          const hue = Math.random() * 40 + 190 // Blue range
          ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${star.opacity})`
        } else if (theme === "sunset-dream") {
          // Orange to pink colors
          const hue = Math.random() * 50 + 10 // Orange to pink range
          ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${star.opacity})`
        } else if (theme === "aurora-borealis") {
          // Green to blue colors with shifting
          const hue = Math.random() * 80 + 120 // Green to blue range
          ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${star.opacity})`
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        }

        ctx.fill()

        // Move stars
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [dimensions, theme])

  // Background gradient based on theme
  const getBackgroundStyle = () => {
    switch (theme) {
      case "mystic-night":
        return "bg-gradient-to-b from-indigo-950 via-purple-900 to-blue-950"
      case "nebula-glow":
        return "bg-gradient-to-br from-purple-900 via-fuchsia-800 to-pink-800"
      case "golden-aura":
        return "bg-gradient-to-br from-amber-700 via-orange-600 to-rose-700"
      case "emerald-forest":
        return "bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900"
      case "cosmic-white":
        return "bg-gradient-to-br from-gray-100 via-white to-gray-200"
      case "ocean-depths":
        return "bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-950"
      case "sunset-dream":
        return "bg-gradient-to-br from-orange-600 via-pink-600 to-purple-800"
      case "aurora-borealis":
        return "bg-gradient-to-br from-green-800 via-teal-700 to-blue-900"
      default:
        return "bg-gradient-to-b from-indigo-950 via-purple-900 to-blue-950"
    }
  }

  return (
    <div className={cn("fixed inset-0 overflow-hidden", getBackgroundStyle(), className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  )
}
