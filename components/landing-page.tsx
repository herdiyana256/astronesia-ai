"use client"

import type React from "react"
import { useState, useCallback } from "react"
import type { UserData, HoroscopeMode, HoroscopeFilter } from "./zodiak-app"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, SparklesIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { CustomDatePicker } from "./custom-date-picker"
import { GlassCard } from "./ui/glass-card"
import { GlowingButton } from "./ui/glowing-button"

interface LandingPageProps {
  onSubmit: (data: UserData) => void
  initialData: UserData
}

export function LandingPage({ onSubmit, initialData }: LandingPageProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<UserData>(initialData)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      // Prevent multiple submissions
      if (isSubmitting) return

      // Ensure at least one filter is selected
      if (formData.filters.length === 0) {
        alert("Please select at least one filter (Love, Finance, or Career)")
        return
      }

      setIsSubmitting(true)

      // Submit the form data
      onSubmit(formData)

      // Note: We don't reset isSubmitting here because we're navigating away
      // and the component will be unmounted
    },
    [formData, onSubmit, isSubmitting],
  )

  const toggleFilter = useCallback(
    (filter: HoroscopeFilter) => {
      if (isSubmitting) return

      setFormData((prevData) => {
        if (prevData.filters.includes(filter)) {
          // Don't remove the last filter
          if (prevData.filters.length === 1) {
            return prevData
          }
          return {
            ...prevData,
            filters: prevData.filters.filter((f) => f !== filter),
          }
        } else {
          return {
            ...prevData,
            filters: [...prevData.filters, filter],
          }
        }
      })
    },
    [isSubmitting],
  )

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isSubmitting) return

      setFormData((prev) => ({ ...prev, fullName: e.target.value }))
    },
    [isSubmitting],
  )

  const handleDateChange = useCallback(
    (date: Date) => {
      if (isSubmitting) return

      setFormData((prev) => ({ ...prev, dateOfBirth: date }))
    },
    [isSubmitting],
  )

  const handleModeChange = useCallback(
    (value: HoroscopeMode) => {
      if (isSubmitting) return

      setFormData((prev) => ({ ...prev, mode: value }))
    },
    [isSubmitting],
  )

  return (
    <GlassCard className="w-full max-w-md shadow-xl rounded-2xl border-white/20">
      <CardHeader className="text-center space-y-1">
        <div className="flex justify-center mb-2">
          <SparklesIcon className="h-12 w-12 text-purple-400 animate-pulse" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {t("app.title")}
        </CardTitle>
        <p className="text-white">{t("app.tagline")}</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white">
              {t("form.fullName")}
            </Label>
            <Input
              id="fullName"
              placeholder={t("form.fullName.placeholder")}
              value={formData.fullName}
              onChange={handleNameChange}
              required
              className="border-purple-500/30 bg-black/30 text-white focus:border-purple-400 focus:ring-purple-400/30"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-white">
              {t("form.dateOfBirth")}
            </Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <GlowingButton
                  variant="outline"
                  type="button"
                  className="w-full justify-start text-left font-normal border-purple-500/30 bg-black/30 text-white"
                  disabled={isSubmitting}
                  glowColor="purple"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dateOfBirth ? (
                    format(formData.dateOfBirth, "PPP")
                  ) : (
                    <span>{t("form.dateOfBirth.placeholder")}</span>
                  )}
                </GlowingButton>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-black/80 backdrop-blur-lg border-white/20" align="start">
                <CustomDatePicker
                  value={formData.dateOfBirth}
                  onChange={handleDateChange}
                  onClose={() => setCalendarOpen(false)}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-white">{t("form.mode")}</Label>
            <RadioGroup
              value={formData.mode}
              onValueChange={handleModeChange}
              className="flex space-x-2"
              disabled={isSubmitting}
            >
              <div
                className={cn(
                  "flex items-center space-x-2 rounded-xl border p-3 cursor-pointer transition-all duration-300",
                  formData.mode === "fun"
                    ? "bg-purple-900/30 border-purple-500/50 shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                    : "border-white/10 hover:border-purple-500/30 hover:bg-purple-900/10",
                  isSubmitting && "opacity-70 cursor-not-allowed",
                )}
              >
                <RadioGroupItem value="fun" id="fun" className="sr-only" />
                <Label htmlFor="fun" className="cursor-pointer font-medium text-white">
                  🌀 {t("form.mode.fun")}
                </Label>
              </div>

              <div
                className={cn(
                  "flex items-center space-x-2 rounded-xl border p-3 cursor-pointer transition-all duration-300",
                  formData.mode === "serious"
                    ? "bg-blue-900/30 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    : "border-white/10 hover:border-blue-500/30 hover:bg-blue-900/10",
                  isSubmitting && "opacity-70 cursor-not-allowed",
                )}
              >
                <RadioGroupItem value="serious" id="serious" className="sr-only" />
                <Label htmlFor="serious" className="cursor-pointer font-medium text-white">
                  🎯 {t("form.mode.serious")}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* <div className="space-y-2">
            <Label className="text-white">{t("form.filters")}</Label>
            <div className="flex flex-wrap gap-2">
              <div
                className={cn(
                  "flex items-center space-x-2 rounded-xl border p-3 cursor-pointer transition-all duration-300",
                  formData.filters.includes("love")
                    ? "bg-pink-900/30 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                    : "border-white/10 hover:border-pink-500/30 hover:bg-pink-900/10",
                  isSubmitting && "opacity-70 cursor-not-allowed",
                )}
                onClick={() => !isSubmitting && toggleFilter("love")}
              >
                <Checkbox
                  id="love"
                  checked={formData.filters.includes("love")}
                  className="sr-only"
                  onCheckedChange={() => !isSubmitting && toggleFilter("love")}
                />
                <Label htmlFor="love" className="cursor-pointer font-medium text-white">
                  ❤️ {t("form.filters.love")}
                </Label>
              </div>

              <div
                className={cn(
                  "flex items-center space-x-2 rounded-xl border p-3 cursor-pointer transition-all duration-300",
                  formData.filters.includes("finance")
                    ? "bg-amber-900/30 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                    : "border-white/10 hover:border-amber-500/30 hover:bg-amber-900/10",
                  isSubmitting && "opacity-70 cursor-not-allowed",
                )}
                onClick={() => !isSubmitting && toggleFilter("finance")}
              >
                <Checkbox
                  id="finance"
                  checked={formData.filters.includes("finance")}
                  className="sr-only"
                  onCheckedChange={() => !isSubmitting && toggleFilter("finance")}
                />
                <Label htmlFor="finance" className="cursor-pointer font-medium text-white">
                  💰 {t("form.filters.finance")}
                </Label>
              </div>

              <div
                className={cn(
                  "flex items-center space-x-2 rounded-xl border p-3 cursor-pointer transition-all duration-300",
                  formData.filters.includes("career")
                    ? "bg-blue-900/30 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    : "border-white/10 hover:border-blue-500/30 hover:bg-blue-900/10",
                  isSubmitting && "opacity-70 cursor-not-allowed",
                )}
                onClick={() => !isSubmitting && toggleFilter("career")}
              >
                <Checkbox
                  id="career"
                  checked={formData.filters.includes("career")}
                  className="sr-only"
                  onCheckedChange={() => !isSubmitting && toggleFilter("career")}
                />
                <Label htmlFor="career" className="cursor-pointer font-medium text-white">
                  💼 {t("form.filters.career")}
                </Label>
              </div>
            </div>
          </div> */}

          <GlowingButton
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-6 rounded-xl transition-all"
            disabled={!formData.fullName || formData.filters.length === 0 || isSubmitting}
            glowColor="purple"
            pulseEffect={!isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t("form.submitting")}
              </span>
            ) : (
              <>🔮 {t("form.submit")}</>
            )}
          </GlowingButton>
        </form>
      </CardContent>
    </GlassCard>
  )
}
