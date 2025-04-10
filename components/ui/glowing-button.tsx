"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

interface GlowingButtonProps extends ButtonProps {
  glowColor?: string
  pulseEffect?: boolean
}

const GlowingButton = forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ className, glowColor = "purple", pulseEffect = false, children, ...props }, ref) => {
    const getGlowStyles = () => {
      switch (glowColor) {
        case "purple":
          return "shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.7)]"
        case "blue":
          return "shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]"
        case "gold":
          return "shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:shadow-[0_0_25px_rgba(234,179,8,0.7)]"
        case "pink":
          return "shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]"
        default:
          return "shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.7)]"
      }
    }

    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-xl border border-white/20 bg-black/30 backdrop-blur-sm transition-all duration-300",
          getGlowStyles(),
          pulseEffect && "animate-pulse",
          className,
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
      </Button>
    )
  },
)

GlowingButton.displayName = "GlowingButton"

export { GlowingButton }
