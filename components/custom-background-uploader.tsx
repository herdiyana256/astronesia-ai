"use client"

import type React from "react"

import { useState, useRef } from "react"
import { GlowingButton } from "./ui/glowing-button"
import { Upload, X } from "lucide-react"

interface CustomBackgroundUploaderProps {
  onBackgroundChange: (backgroundUrl: string) => void
}

export function CustomBackgroundUploader({ onBackgroundChange }: CustomBackgroundUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPEG, PNG, etc.)")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setPreviewUrl(result)
      onBackgroundChange(`url(${result})`)
    }
    reader.readAsDataURL(file)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveBackground = () => {
    setPreviewUrl(null)
    onBackgroundChange("")
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload background image"
      />

      <div className="flex gap-2">
        <GlowingButton
          variant="outline"
          onClick={handleButtonClick}
          className="flex items-center gap-2 bg-black/50 text-gray-200 hover:bg-black/70"
          glowColor="purple"
          type="button"
        >
          <Upload size={16} />
          Upload Background
        </GlowingButton>

        {previewUrl && (
          <GlowingButton
            variant="outline"
            onClick={handleRemoveBackground}
            className="flex items-center gap-2 bg-black/50 text-gray-200 hover:bg-black/70"
            glowColor="pink"
            type="button"
          >
            <X size={16} />
            Remove
          </GlowingButton>
        )}
      </div>

      {previewUrl && (
        <div className="mt-2 relative w-16 h-16 rounded-md overflow-hidden border border-white/20">
          <img src={previewUrl || "/placeholder.svg"} alt="Background preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  )
}
