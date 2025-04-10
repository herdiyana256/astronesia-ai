"use client"

import { useLanguage } from "@/contexts/language-context"
import { Github, Linkedin, Mail, DiscIcon as Discord } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { GlowingButton } from "./ui/glowing-button"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-white/10 py-6 mt-auto backdrop-blur-md relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">{t("footer.copyright")}</div>

          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <GlowingButton
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-purple-900/20"
                    onClick={() => window.open("https://www.linkedin.com/in/herdiyan-adam-putra", "_blank")}
                    type="button"
                    glowColor="blue"
                  >
                    <Linkedin className="h-5 w-5 text-gray-300" />
                    <span className="sr-only">LinkedIn</span>
                  </GlowingButton>
                </TooltipTrigger>
                <TooltipContent className="bg-black/80 backdrop-blur-lg border-white/20">
                  <p>LinkedIn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <GlowingButton
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-purple-900/20"
                    onClick={() => window.open("https://discord.com/users/herdiyanitdev", "_blank")}
                    type="button"
                    glowColor="indigo"
                  >
                    <Discord className="h-5 w-5 text-gray-300" />
                    <span className="sr-only">Discord</span>
                  </GlowingButton>
                </TooltipTrigger>
                <TooltipContent className="bg-black/80 backdrop-blur-lg border-white/20">
                  <p>Discord: herdiyanitdev</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <GlowingButton
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-purple-900/20"
                    onClick={() => window.open("https://github.com/herdiyana256", "_blank")}
                    type="button"
                    glowColor="purple"
                  >
                    <Github className="h-5 w-5 text-gray-300" />
                    <span className="sr-only">GitHub</span>
                  </GlowingButton>
                </TooltipTrigger>
                <TooltipContent className="bg-black/80 backdrop-blur-lg border-white/20">
                  <p>GitHub</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <GlowingButton
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-purple-900/20"
                    onClick={() => window.open("mailto:herdiyanitdev@gmail.com", "_blank")}
                    type="button"
                    glowColor="gold"
                  >
                    <Mail className="h-5 w-5 text-gray-300" />
                    <span className="sr-only">Email</span>
                  </GlowingButton>
                </TooltipTrigger>
                <TooltipContent className="bg-black/80 backdrop-blur-lg border-white/20">
                  <p>Email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </footer>
  )
}
