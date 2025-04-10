"use client"

import { useState, useCallback } from "react"
import { LandingPage } from "./landing-page"
import { ResultPage } from "./result-page"
import { CtaPage } from "./cta-page"
import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "./header"
import { Footer } from "./footer"
import { generateHoroscopeFromAI } from "@/lib/api"
import { AnimatedBackground } from "./animated-background"
import { FloatingZodiacs } from "./floating-zodiacs"

// Define our app's types
export type ZodiacSign =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces"

export type HoroscopeMode = "fun" | "serious"
export type HoroscopeFilter = "love" | "finance" | "career"
export type BackgroundTheme =
  | "mystic-night"
  | "nebula-glow"
  | "golden-aura"
  | "emerald-forest"
  | "cosmic-white"
  | "ocean-depths"
  | "sunset-dream"
  | "aurora-borealis"

export interface UserData {
  fullName: string
  dateOfBirth: Date
  mode: HoroscopeMode
  filters: HoroscopeFilter[]
}

export interface HoroscopeResult {
  sign: ZodiacSign
  reading: string
  background: string
  tone: "casual" | "mystical" | "professional"
  isLoading?: boolean
}

// Main app component that manages state and screen transitions
export function ZodiakApp() {
  const [currentScreen, setCurrentScreen] = useState<"landing" | "result" | "cta">("landing")
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>("mystic-night")
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    dateOfBirth: new Date(),
    mode: "fun",
    filters: ["love"],
  })
  const [horoscopeResult, setHoroscopeResult] = useState<HoroscopeResult>({
    sign: "Gemini",
    reading: "",
    background: "bg-gradient-to-r from-lavender to-soft-blue",
    tone: "casual",
    isLoading: false,
  })
  const [isApiCallInProgress, setIsApiCallInProgress] = useState(false)

  // Function to determine zodiac sign based on birth date
  const getZodiacSign = useCallback((date: Date): ZodiacSign => {
    const month = date.getMonth() + 1
    const day = date.getDate()

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries"
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus"
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini"
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer"
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo"
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra"
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio"
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius"
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn"
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius"
    return "Pisces"
  }, [])

  // Generate a fallback horoscope reading (used if API fails)
  const generateFallbackHoroscope = useCallback((userData: UserData, sign: ZodiacSign): string => {
    const mode = userData.mode
    const filters = userData.filters

    let reading = ""

    if (mode === "fun") {
      reading += "✨ The stars are having a party and you're invited! "
    } else {
      reading += "The celestial alignment suggests a period of significant change. "
    }

    if (filters.includes("love")) {
      reading +=
        mode === "fun"
          ? "Your love life is about to get spicier than your favorite ramen. Keep your heart open and your DMs even more open! "
          : "Romantic opportunities may present themselves. Be open to new connections and nurture existing relationships. "
    }

    if (filters.includes("finance")) {
      reading +=
        mode === "fun"
          ? "Your wallet might feel a bit lighter this week - maybe it's time to delete those shopping apps? Just saying! "
          : "Financial prudence is advised. Consider long-term investments rather than immediate gratification. "
    }

    if (filters.includes("career")) {
      reading +=
        mode === "fun"
          ? "Your boss might actually notice your existence this week. Time to pretend you weren't just scrolling TikTok! "
          : "Professional advancement is on the horizon. Prepare to seize opportunities that align with your long-term goals. "
    }

    return reading
  }, [])

  // Handle form submission from landing page
  const handleSubmit = useCallback(
    async (data: UserData) => {
      // Prevent multiple API calls
      if (isApiCallInProgress) return

      setUserData(data)
      const sign = getZodiacSign(data.dateOfBirth)

      // Set loading state
      setHoroscopeResult((prev) => ({
        ...prev,
        sign,
        isLoading: true,
      }))

      setCurrentScreen("result")
      setIsApiCallInProgress(true)

      try {
        // Call the AI API to generate the horoscope
        const aiReading = await generateHoroscopeFromAI(data.fullName, sign, data.mode, data.filters)

        // Update with the AI-generated reading
        setHoroscopeResult((prev) => ({
          ...prev,
          reading: aiReading,
          isLoading: false,
        }))
      } catch (error) {
        console.error("Failed to generate AI horoscope:", error)

        // Fallback to the local generation if API fails
        const fallbackReading = generateFallbackHoroscope(data, sign)
        setHoroscopeResult((prev) => ({
          ...prev,
          reading: fallbackReading,
          isLoading: false,
        }))
      } finally {
        setIsApiCallInProgress(false)
      }
    },
    [getZodiacSign, generateFallbackHoroscope, isApiCallInProgress],
  )

  // Navigate to CTA page
  const goToCta = useCallback(() => {
    setCurrentScreen("cta")
  }, [])

  // Try again - go back to landing page
  const tryAgain = useCallback(() => {
    setCurrentScreen("landing")
  }, [])

  // Handle background change
  const handleBackgroundChange = useCallback((bg: string) => {
    setHoroscopeResult((prev) => ({ ...prev, background: bg }))
  }, [])

  // Handle tone change
  const handleToneChange = useCallback((tone: "casual" | "mystical" | "professional") => {
    setHoroscopeResult((prev) => ({ ...prev, tone: tone }))
  }, [])

  // Handle theme change
  const handleThemeChange = useCallback((theme: BackgroundTheme) => {
    setBackgroundTheme(theme)
  }, [])

  // Render the appropriate screen
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col relative">
        <AnimatedBackground theme={backgroundTheme} />
        <FloatingZodiacs />

        <Header onThemeChange={handleThemeChange} currentTheme={backgroundTheme} />

        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center relative z-10">
          {currentScreen === "landing" && <LandingPage onSubmit={handleSubmit} initialData={userData} />}

          {currentScreen === "result" && (
            <ResultPage
              userData={userData}
              horoscope={horoscopeResult}
              onNext={goToCta}
              onChangeBackground={handleBackgroundChange}
              onChangeTone={handleToneChange}
            />
          )}

          {currentScreen === "cta" && <CtaPage onTryAgain={tryAgain} />}
        </div>

        <Footer />
      </div>
    </LanguageProvider>
  )
}
