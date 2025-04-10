"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import type { UserData, HoroscopeResult } from "./zodiak-app"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Copy, Share, Palette, TextIcon, Check, Loader2, Facebook, Twitter, Download } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { GlassCard } from "./ui/glass-card"
import { GlowingButton } from "./ui/glowing-button"
import { TypewriterText } from "./typewriter-text"
import { CustomBackgroundUploader } from "./custom-background-uploader"
import { loadHtml2Canvas } from "@/lib/html2canvas-loader"

interface ResultPageProps {
  userData: UserData
  horoscope: HoroscopeResult
  onNext: () => void
  onChangeBackground: (bg: string) => void
  onChangeTone: (tone: "casual" | "mystical" | "professional") => void
}

// Define font styles
const fontStyles = [
  { name: "Modern Sans", class: "font-sans text-white" },
  { name: "Elegant Serif", class: "font-serif text-white" },
  { name: "Monospace", class: "font-mono text-white" },
  { name: "Playful", class: "font-sans text-lg tracking-wide text-white" },
  { name: "Condensed", class: "font-sans tracking-tight text-white" },
  { name: "Bold", class: "font-sans font-bold text-white" },
  { name: "Light", class: "font-sans font-light text-white" },
  { name: "Italic", class: "font-sans italic text-white" },
  { name: "Spaced", class: "font-sans tracking-widest text-white" },
  { name: "Cosmic", class: "font-serif italic tracking-wide text-white" },
]

export function ResultPage({ userData, horoscope, onNext, onChangeBackground }: ResultPageProps) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)
  const [customBackground, setCustomBackground] = useState<string>("")
  const [fontStyle, setFontStyle] = useState<string>(fontStyles[0].class)
  const resultCardRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const backgrounds = [
    "bg-gradient-to-r from-purple-900/40 to-blue-900/40",
    "bg-gradient-to-r from-pink-900/40 to-purple-900/40",
    "bg-gradient-to-r from-amber-900/40 to-red-900/40",
    "bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40",
    "bg-gradient-to-br from-blue-900/40 via-blue-800/40 to-indigo-900/40",
  ]

  // Reset typing state when horoscope changes
  useEffect(() => {
    setTypingComplete(false)
  }, [horoscope.reading])

  const getZodiacEmoji = useCallback((sign: string) => {
    const emojis: Record<string, string> = {
      Aries: "♈",
      Taurus: "♉",
      Gemini: "♊",
      Cancer: "♋",
      Leo: "♌",
      Virgo: "♍",
      Libra: "♎",
      Scorpio: "♏",
      Sagittarius: "♐",
      Capricorn: "♑",
      Aquarius: "♒",
      Pisces: "♓",
    }
    return emojis[sign] || "✨"
  }, [])

  const copyToClipboard = useCallback(() => {
    if (copied || horoscope.isLoading || !typingComplete) return

    const text = `${userData.fullName}'s ${horoscope.sign} Horoscope: ${horoscope.reading}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [copied, userData.fullName, horoscope.sign, horoscope.reading, horoscope.isLoading, typingComplete])

  const downloadAsImage = useCallback(
    async (format: "png" | "jpeg" | "jpg") => {
      if (horoscope.isLoading || !typingComplete || !resultCardRef.current || isDownloading) return

      setIsDownloading(true)

      try {
        // Create a container for the image with proper styling
        const container = document.createElement("div")
        container.style.position = "fixed"
        container.style.top = "0"
        container.style.left = "0"
        container.style.width = "1080px" // Standard size
        container.style.height = "1920px"
        container.style.zIndex = "-1000"
        container.style.opacity = "0"

        // Set background
        container.style.background = "linear-gradient(to bottom right, #4c1d95, #1e40af)"
        container.style.color = "white"
        container.style.fontFamily = "Arial, sans-serif"
        container.style.padding = "100px"
        container.style.boxSizing = "border-box"
        container.style.display = "flex"
        container.style.flexDirection = "column"
        container.style.alignItems = "center"
        container.style.justifyContent = "center"
        container.style.textAlign = "center"

        // Add content
        container.innerHTML = `
        <div style="font-size: 120px; margin-bottom: 40px;">${getZodiacEmoji(horoscope.sign)}</div>
        <h1 style="font-size: 80px; margin-bottom: 40px;">${userData.fullName}'s ${horoscope.sign} Horoscope</h1>
        <p style="font-size: 60px; line-height: 1.5;">${horoscope.reading}</p>
        <div style="margin-top: 80px; font-size: 50px;">Generated by Astronesia AI</div>
      `

        document.body.appendChild(container)

        // Use html2canvas to create an image
        const html2canvas = await loadHtml2Canvas()
        const canvas = await html2canvas(container)
        document.body.removeChild(container)

        // Convert canvas to blob
        const mimeType = format === "jpg" ? "image/jpeg" : `image/${format}`
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create a download link
              const url = URL.createObjectURL(blob)
              const link = document.createElement("a")
              link.download = `${userData.fullName}-${horoscope.sign}-horoscope.${format}`
              link.href = url
              link.click()

              // Clean up
              URL.revokeObjectURL(url)
            }
          },
          mimeType,
          0.9,
        )
      } catch (err) {
        console.error("Error generating image:", err)
        alert("There was an error generating the image.")
      } finally {
        setIsDownloading(false)
      }
    },
    [
      horoscope.isLoading,
      horoscope.sign,
      horoscope.reading,
      typingComplete,
      userData.fullName,
      getZodiacEmoji,
      isDownloading,
    ],
  )

  const shareToSocial = useCallback(
    (platform: string) => {
      if (horoscope.isLoading || !typingComplete) return
  
      const text = encodeURIComponent(
        `Check out my ${horoscope.sign} horoscope from Supernesia AI: ${horoscope.reading.substring(0, 100)}...`,
      )
      const url = encodeURIComponent("https://supernesia-ai.my.id")
      let shareUrl = ""
  
      if (platform === "whatsapp") {
        shareUrl = `https://wa.me/?text=${text}`
        window.open(shareUrl, "_blank")
      } else if (platform === "instagram") {
        // Arahkan langsung ke kamera Instagram Story
        window.location.href = "instagram://story-camera"
      } else if (platform === "facebook") {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`
        window.open(shareUrl, "_blank", "width=600,height=400")
      } else if (platform === "twitter") {
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        window.open(shareUrl, "_blank", "width=600,height=400")
      }
    },
    [horoscope.sign, horoscope.reading, horoscope.isLoading, typingComplete],
  )
  
  return (
    <GlassCard
      className={cn(
        "w-full max-w-md shadow-xl rounded-2xl border-white/20 overflow-hidden",
        !customBackground ? horoscope.background : "",
      )}
      glowColor="purple"
      intensity="high"
      style={{
        backgroundImage: customBackground || "",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      ref={resultCardRef}
    >
      <CardHeader className="text-center space-y-1 pb-2">
        <div className="text-4xl mb-1 animate-pulse">{getZodiacEmoji(horoscope.sign)}</div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {userData.fullName}
          {t("result.horoscope")}
        </CardTitle>
        <p className="text-lg font-medium text-white">{horoscope.sign}</p>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 shadow-inner min-h-[200px] flex items-center justify-center border border-white/10">
          {horoscope.isLoading ? (
            <div className="flex flex-col items-center justify-center text-center">
              <Loader2 className="h-8 w-8 animate-spin mb-2 text-purple-400" />
              <p className="text-lg text-white">{t("result.loading")}</p>
            </div>
          ) : (
            <p className={cn("text-lg leading-relaxed", fontStyle)}>
              <TypewriterText text={horoscope.reading} speed={20} onComplete={() => setTypingComplete(true)} />
            </p>
          )}
        </div>

        <div className="flex justify-between mt-6 gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <GlowingButton
                variant="outline"
                className="bg-black/50 text-white hover:bg-black/70"
                disabled={horoscope.isLoading || !typingComplete}
                type="button"
                glowColor="blue"
              >
                <Palette className="h-4 w-4 mr-2" />🎨 {t("result.changeBackground")}
              </GlowingButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/80 backdrop-blur-lg border-white/20">
              {backgrounds.map((bg, index) => (
                <DropdownMenuItem key={index} onClick={() => onChangeBackground(bg)} className="cursor-pointer">
                  <div className={cn("w-6 h-6 rounded-full mr-2", bg)}></div>
                  Background {index + 1}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <GlowingButton
                variant="outline"
                className="bg-black/50 text-white hover:bg-black/70"
                disabled={horoscope.isLoading || !typingComplete}
                type="button"
                glowColor="pink"
              >
                <TextIcon className="h-4 w-4 mr-2" />🔤 Font Style
              </GlowingButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/80 backdrop-blur-lg border-white/20">
              {fontStyles.map((style, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => setFontStyle(style.class)}
                  className={cn("cursor-pointer", style.class)}
                >
                  {style.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Add the custom background uploader */}
        <div className="mt-4">
          <CustomBackgroundUploader onBackgroundChange={setCustomBackground} />
        </div>

        {/* Add download image options */}
        <div className="mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <GlowingButton
                variant="outline"
                className="w-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center"
                disabled={horoscope.isLoading || !typingComplete || isDownloading}
                type="button"
                glowColor="gold"
              >
                {isDownloading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Download as Image
              </GlowingButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/80 backdrop-blur-lg border-white/20">
              <DropdownMenuItem onClick={() => downloadAsImage("png")} className="cursor-pointer">
                PNG Format
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => downloadAsImage("jpg")} className="cursor-pointer">
                JPG Format
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="flex justify-between w-full gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <GlowingButton
                  variant="outline"
                  className="flex-1 bg-black/50 text-white hover:bg-black/70"
                  onClick={copyToClipboard}
                  disabled={horoscope.isLoading || !typingComplete}
                  type="button"
                  glowColor="purple"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      {t("result.copied")}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />📋 {t("result.copy")}
                    </>
                  )}
                </GlowingButton>
              </TooltipTrigger>
              <TooltipContent className="bg-black/80 backdrop-blur-lg border-white/20">
                <p>Copy horoscope to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <GlowingButton
                variant="outline"
                className="flex-1 bg-black/50 text-white hover:bg-black/70"
                disabled={horoscope.isLoading || !typingComplete}
                type="button"
                glowColor="gold"
              >
                <Share className="h-4 w-4 mr-2" />📤 {t("result.share")}
              </GlowingButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/80 backdrop-blur-lg border-white/20">
              <DropdownMenuItem
                onClick={() => shareToSocial("facebook")}
                className="cursor-pointer flex items-center gap-2"
              >
                <Facebook size={16} /> Facebook
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => shareToSocial("twitter")}
                className="cursor-pointer flex items-center gap-2"
              >
                <Twitter size={16} /> Twitter (X)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareToSocial("instagram")} className="cursor-pointer">
                Instagram
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareToSocial("whatsapp")} className="cursor-pointer">
                WhatsApp
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <GlowingButton
          onClick={onNext}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          disabled={horoscope.isLoading || !typingComplete}
          type="button"
          glowColor="purple"
          pulseEffect={typingComplete}
        >
          {t("result.continue")}
        </GlowingButton>
      </CardFooter>
    </GlassCard>
  )
}
