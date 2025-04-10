"use client"

import { useState, useEffect, useMemo } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { GlowingButton } from "./ui/glowing-button"

interface CustomDatePickerProps {
  value: Date
  onChange: (date: Date) => void
  onClose: () => void
}

export function CustomDatePicker({ value, onChange, onClose }: CustomDatePickerProps) {
  const { t } = useLanguage()
  const [month, setMonth] = useState(value ? value.getMonth() : new Date().getMonth())
  const [year, setYear] = useState(value ? value.getFullYear() : new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState(value ? value.getDate() : new Date().getDate())

  // Generate years for dropdown (100 years back from current year)
  const currentYear = new Date().getFullYear()
  const years = useMemo(() => Array.from({ length: 100 }, (_, i) => currentYear - i), [currentYear])

  // Generate months
  const months = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    [],
  )

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    // Adjust for Sunday as first day (0)
    const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }, [year, month])

  // Handle date selection
  const handleDateSelect = (day: number) => {
    setSelectedDate(day)
    const newDate = new Date(year, month, day)
    onChange(newDate)
  }

  // Handle month navigation
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear((prev) => prev - 1)
    } else {
      setMonth((prev) => prev - 1)
    }
  }

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear((prev) => prev + 1)
    } else {
      setMonth((prev) => prev + 1)
    }
  }

  // Update selected date when year or month changes
  useEffect(() => {
    const daysInMonth = getDaysInMonth(year, month)
    if (selectedDate > daysInMonth) {
      setSelectedDate(daysInMonth)
    }
  }, [year, month, selectedDate])

  return (
    <div className="p-4 bg-black/80 text-white rounded-lg shadow-lg border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <Select value={year.toString()} onValueChange={(value) => setYear(Number.parseInt(value))}>
          <SelectTrigger className="w-[120px] bg-black/50 border-white/20 text-white">
            <SelectValue placeholder={year.toString()} />
          </SelectTrigger>
          <SelectContent className="max-h-[200px] bg-black/90 border-white/20 text-white">
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center">
          <GlowingButton variant="ghost" size="icon" onClick={prevMonth} type="button" glowColor="blue">
            <ChevronLeft className="h-4 w-4" />
          </GlowingButton>
          <Select value={month.toString()} onValueChange={(value) => setMonth(Number.parseInt(value))}>
            <SelectTrigger className="w-[120px] bg-black/50 border-white/20 text-white">
              <SelectValue placeholder={months[month]} />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/20 text-white">
              {months.map((m, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <GlowingButton variant="ghost" size="icon" onClick={nextMonth} type="button" glowColor="blue">
            <ChevronRight className="h-4 w-4" />
          </GlowingButton>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-white">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div key={index} className="aspect-square">
            {day !== null ? (
              <GlowingButton
                variant="ghost"
                size="sm"
                type="button"
                className={cn(
                  "w-full h-full rounded-full text-white",
                  day === selectedDate && month === value.getMonth() && year === value.getFullYear()
                    ? "bg-purple-600/50 text-white hover:bg-purple-700/50"
                    : "hover:bg-purple-900/30",
                )}
                onClick={() => handleDateSelect(day)}
                glowColor={
                  day === selectedDate && month === value.getMonth() && year === value.getFullYear()
                    ? "purple"
                    : undefined
                }
              >
                {day}
              </GlowingButton>
            ) : (
              <div className="w-full h-full"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <GlowingButton variant="outline" onClick={onClose} type="button" glowColor="purple" className="text-white">
          Done
        </GlowingButton>
      </div>
    </div>
  )
}
