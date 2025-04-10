"use client"
import { useLanguage } from "@/contexts/language-context"
import { Globe, Palette } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCallback } from "react"
import { GlowingButton } from "./ui/glowing-button"
import type { BackgroundTheme } from "./zodiak-app"
import { ModernClock } from "./modern-clock"
import Link from "next/link"

interface HeaderProps {
  onThemeChange?: (theme: BackgroundTheme) => void
  currentTheme?: BackgroundTheme
}

export function Header({ onThemeChange, currentTheme = "mystic-night" }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage()

  const setLanguageHandler = useCallback(
    (lang: "en" | "id" | "zh" | "ar" | "es" | "fr") => {
      setLanguage(lang)
    },
    [setLanguage],
  )

  return (
    <header className="border-b border-white/10 py-2 backdrop-blur-md relative z-20">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Astronesia AI
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ModernClock />

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <GlowingButton variant="ghost" size="icon" glowColor="blue" type="button">
                  <Palette className="h-5 w-5" />
                  <span className="sr-only">Change background theme</span>
                </GlowingButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/70 backdrop-blur-lg border-white/10">
                <DropdownMenuItem
                  onClick={() => onThemeChange?.("mystic-night")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <div className="w-4 h-4 rounded-full bg-indigo-800"></div>
                  Mystic Night
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onThemeChange?.("nebula-glow")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <div className="w-4 h-4 rounded-full bg-purple-700"></div>
                  Nebula Glow
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onThemeChange?.("golden-aura")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <div className="w-4 h-4 rounded-full bg-amber-600"></div>
                  Golden Aura
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onThemeChange?.("emerald-forest")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <div className="w-4 h-4 rounded-full bg-green-700"></div>
                  Emerald Forest
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onThemeChange?.("cosmic-white")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <div className="w-4 h-4 rounded-full bg-gray-100 border border-gray-300"></div>
                  Cosmic White
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onThemeChange?.("ocean-depths")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <div className="w-4 h-4 rounded-full bg-blue-700"></div>
                  Ocean Depths
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onThemeChange?.("sunset-dream")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  Sunset Dream
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onThemeChange?.("aurora-borealis")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <div className="w-4 h-4 rounded-full bg-teal-600"></div>
                  Aurora Borealis
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <GlowingButton variant="ghost" size="icon" glowColor="purple" type="button">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Toggle language</span>
                </GlowingButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/70 backdrop-blur-lg border-white/10">
                <DropdownMenuItem onClick={() => setLanguageHandler("en")}>🇺🇸 {t("language.en")}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguageHandler("id")}>🇮🇩 {t("language.id")}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguageHandler("zh")}>🇨🇳 {t("language.zh")}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguageHandler("ar")}>🇸🇦 {t("language.ar")}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguageHandler("es")}>🇪🇸 {t("language.es")}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguageHandler("fr")}>🇫🇷 {t("language.fr")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
