"use client"

import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SparklesIcon, RefreshCw } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useCallback } from "react"
import { GlassCard } from "./ui/glass-card"
import { GlowingButton } from "./ui/glowing-button"
import { ReviewIcon } from "./ui/review-icon"

interface CtaPageProps {
  onTryAgain: () => void
}

export function CtaPage({ onTryAgain }: CtaPageProps) {
  const { t } = useLanguage()

  const handleFeedbackClick = useCallback(() => {
    window.open("https://forms.gle/9j4ijZSZVucKXFdf7", "_blank")
  }, [])

  return (
    <GlassCard className="w-full max-w-md shadow-xl rounded-2xl border-white/20" glowColor="gold">
      <CardHeader className="text-center space-y-1">
        <div className="flex justify-center mb-2">
          <SparklesIcon className="h-12 w-12 text-purple-400 animate-pulse" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {t("cta.enjoyed")}
        </CardTitle>
        <p className="text-gray-300">{t("cta.message")}</p>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-black/30 border border-white/10">
          <p className="text-lg text-center text-white mb-2">Support via Gopay</p>
          <div className="bg-white p-2 rounded-lg">
            <img src="/images/gopay_herdiyan.png" alt="Gopay QR Code" className="w-48 h-48 object-contain" />
          </div>
          <p className="text-sm text-center text-gray-300 mt-2">Scan with Gopay app</p>
        </div>

        <GlowingButton
          variant="outline"
          className="w-full py-6 text-lg flex items-center justify-center gap-2 border-purple-500/30 bg-black/30 text-white hover:bg-purple-900/20"
          onClick={handleFeedbackClick}
          type="button"
          glowColor="purple"
        >
          <ReviewIcon className="h-5 w-5" /> {t("cta.feedback")}
        </GlowingButton>
      </CardContent>

      <CardFooter>
        <GlowingButton
          onClick={onTryAgain}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg"
          type="button"
          glowColor="blue"
          pulseEffect
        >
          <RefreshCw className="h-5 w-5 mr-2" />🔁 {t("cta.tryAgain")}
        </GlowingButton>
      </CardFooter>
    </GlassCard>
  )
}
