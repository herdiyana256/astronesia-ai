"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ModernClockProps {
  className?: string
}

export function ModernClock({ className }: ModernClockProps) {
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Format hours to be 2 digits
  const hours = time.getHours().toString().padStart(2, "0")
  // Format minutes to be 2 digits
  const minutes = time.getMinutes().toString().padStart(2, "0")
  // Format seconds to be 2 digits
  const seconds = time.getSeconds().toString().padStart(2, "0")

  return (
    <div className={cn("flex items-center gap-1 font-mono", className)}>
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
          {hours}
        </div>
        <div className="text-xs text-gray-400">hrs</div>
      </div>

      <div className="text-xl font-bold text-gray-400 animate-pulse">:</div>

      <div className="flex flex-col items-center">
        <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {minutes}
        </div>
        <div className="text-xs text-gray-400">min</div>
      </div>

      <div className="text-xl font-bold text-gray-400 animate-pulse">:</div>

      <div className="flex flex-col items-center">
        <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          {seconds}
        </div>
        <div className="text-xs text-gray-400">sec</div>
      </div>
    </div>
  )
}
