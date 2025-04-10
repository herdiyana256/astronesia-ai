"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Card, type CardProps } from "@/components/ui/card"

interface GlassCardProps extends CardProps {
  glowColor?: string
  intensity?: "low" | "medium" | "high"
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glowColor = "purple", intensity = "medium", children, ...props }, ref) => {
    const getGlowStyles = () => {
      const colors = {
        purple: {
          low: "shadow-[0_0_15px_rgba(147,51,234,0.2)]",
          medium: "shadow-[0_0_25px_rgba(147,51,234,0.3)]",
          high: "shadow-[0_0_35px_rgba(147,51,234,0.4)]",
        },
        blue: {
          low: "shadow-[0_0_15px_rgba(59,130,246,0.2)]",
          medium: "shadow-[0_0_25px_rgba(59,130,246,0.3)]",
          high: "shadow-[0_0_35px_rgba(59,130,246,0.4)]",
        },
        gold: {
          low: "shadow-[0_0_15px_rgba(234,179,8,0.2)]",
          medium: "shadow-[0_0_25px_rgba(234,179,8,0.3)]",
          high: "shadow-[0_0_35px_rgba(234,179,8,0.4)]",
        },
      }

      return colors[glowColor as keyof typeof colors]?.[intensity] || colors.purple.medium
    }

    return (
      <Card
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-xl border border-white/20 bg-black/30 backdrop-blur-lg transition-all duration-300",
          getGlowStyles(),
          className,
        )}
        {...props}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
        {children}
      </Card>
    )
  },
)

GlassCard.displayName = "GlassCard"

export { GlassCard }
