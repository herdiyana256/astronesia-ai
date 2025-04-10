"use client"

import React, { createContext, useContext, useState, type ReactNode, useCallback, useMemo } from "react"

// Update the Language type to include the new languages
type Language = "en" | "id" | "zh" | "ar" | "es" | "fr"

type Translations = {
  [key in Language]: {
    [key: string]: string
  }
}

// Update the translations object to include the new languages
const translations: Translations = {
  en: {
    // Landing Page
    "app.title": "Astronesia AI",
    "app.tagline": "Your daily AI-powered horoscope",
    "form.fullName": "Full Name",
    "form.fullName.placeholder": "Enter your name",
    "form.dateOfBirth": "Date of Birth",
    "form.dateOfBirth.placeholder": "Pick a date",
    "form.mode": "Mode",
    "form.mode.fun": "Fun",
    "form.mode.serious": "Serious",
    "form.filters": "Filters",
    "form.filters.love": "Love",
    "form.filters.finance": "Finance",
    "form.filters.career": "Career",
    "form.submit": "Get My Horoscope",
    "form.submitting": "Consulting the stars...",

    // Result Page
    "result.horoscope": "'s Horoscope",
    "result.changeBackground": "Change Background",
    "result.changeTone": "Change Tone",
    "result.tone.casual": "Casual",
    "result.tone.mystical": "Mystical",
    "result.tone.professional": "Professional",
    "result.copy": "Copy",
    "result.copied": "Copied!",
    "result.share": "Share",
    "result.continue": "Continue",
    "result.loading": "Consulting the stars...",

    // CTA Page
    "cta.enjoyed": "Enjoyed your reading?",
    "cta.message": "We hope the stars brought you some insight today!",
    "cta.coffee": "Buy me a coffee",
    "cta.feedback": "Leave a review",
    "cta.tryAgain": "Try Again",

    // Footer
    "footer.copyright": "© 2025 Astronesia AI. All rights reserved.",

    // Theme
    "theme.light": "Light Mode",
    "theme.dark": "Dark Mode",

    // Language
    "language.en": "English",
    "language.id": "Bahasa Indonesia",
    "language.zh": "中文",
    "language.ar": "العربية",
    "language.es": "Español",
    "language.fr": "Français",

    // Privacy
    "privacy.policy": "Privacy Policy",
  },
  id: {
    // Landing Page
    "app.title": "Astronesia AI",
    "app.tagline": "Horoskop harian Anda dengan kecerdasan buatan",
    "form.fullName": "Nama Lengkap",
    "form.fullName.placeholder": "Masukkan nama Anda",
    "form.dateOfBirth": "Tanggal Lahir",
    "form.dateOfBirth.placeholder": "Pilih tanggal",
    "form.mode": "Mode",
    "form.mode.fun": "Santai",
    "form.mode.serious": "Serius",
    "form.filters": "Filter",
    "form.filters.love": "Cinta",
    "form.filters.finance": "Keuangan",
    "form.filters.career": "Karir",
    "form.submit": "Dapatkan Horoskop Saya",
    "form.submitting": "Berkonsultasi dengan bintang-bintang...",

    // Result Page
    "result.horoscope": " Horoskop",
    "result.changeBackground": "Ubah Latar",
    "result.changeTone": "Ubah Nada",
    "result.tone.casual": "Santai",
    "result.tone.mystical": "Mistis",
    "result.tone.professional": "Profesional",
    "result.copy": "Salin",
    "result.copied": "Tersalin!",
    "result.share": "Bagikan",
    "result.continue": "Lanjutkan",
    "result.loading": "Berkonsultasi dengan bintang-bintang...",

    // CTA Page
    "cta.enjoyed": "Menikmati bacaan Anda?",
    "cta.message": "Kami harap bintang-bintang memberi Anda wawasan hari ini!",
    "cta.coffee": "Belikan saya kopi",
    "cta.feedback": "Berikan ulasan",
    "cta.tryAgain": "Coba Lagi",

    // Footer
    "footer.copyright": "© 2025 Astronesia AI. Hak cipta dilindungi.",

    // Theme
    "theme.light": "Mode Terang",
    "theme.dark": "Mode Gelap",

    // Language
    "language.en": "Bahasa Inggris",
    "language.id": "Bahasa Indonesia",
    "language.zh": "Bahasa Mandarin",
    "language.ar": "Bahasa Arab",
    "language.es": "Bahasa Spanyol",
    "language.fr": "Bahasa Prancis",

    // Privacy
    "privacy.policy": "Kebijakan Privasi",
  },
  zh: {
    // Landing Page
    "app.title": "Astronesia AI",
    "app.tagline": "您的人工智能每日星座运势",
    "form.fullName": "全名",
    "form.fullName.placeholder": "输入您的姓名",
    "form.dateOfBirth": "出生日期",
    "form.dateOfBirth.placeholder": "选择日期",
    "form.mode": "模式",
    "form.mode.fun": "趣味",
    "form.mode.serious": "严肃",
    "form.filters": "筛选",
    "form.filters.love": "爱情",
    "form.filters.finance": "财务",
    "form.filters.career": "职业",
    "form.submit": "获取我的星座运势",
    "form.submitting": "正在咨询星星...",

    // Result Page
    "result.horoscope": "的星座运势",
    "result.changeBackground": "更改背景",
    "result.changeTone": "更改语调",
    "result.tone.casual": "休闲",
    "result.tone.mystical": "神秘",
    "result.tone.professional": "专业",
    "result.copy": "复制",
    "result.copied": "已复制！",
    "result.share": "分享",
    "result.continue": "继续",
    "result.loading": "正在咨询星星...",

    // CTA Page
    "cta.enjoyed": "喜欢您的阅读体验吗？",
    "cta.message": "我们希望星星今天为您带来了一些启示！",
    "cta.coffee": "给我买杯咖啡",
    "cta.feedback": "留下评论",
    "cta.tryAgain": "再试一次",

    // Footer
    "footer.copyright": "© 2025 Astronesia AI. 版权所有。",

    // Theme
    "theme.light": "浅色模式",
    "theme.dark": "深色模式",

    // Language
    "language.en": "英语",
    "language.id": "印尼语",
    "language.zh": "中文",
    "language.ar": "阿拉伯语",
    "language.es": "西班牙语",
    "language.fr": "法语",

    // Privacy
    "privacy.policy": "隐私政策",
  },
  ar: {
    // Landing Page
    "app.title": "Astronesia AI",
    "app.tagline": "برجك اليومي بالذكاء الاصطناعي",
    "form.fullName": "الاسم الكامل",
    "form.fullName.placeholder": "أدخل اسمك",
    "form.dateOfBirth": "تاريخ الميلاد",
    "form.dateOfBirth.placeholder": "اختر تاريخًا",
    "form.mode": "الوضع",
    "form.mode.fun": "مرح",
    "form.mode.serious": "جاد",
    "form.filters": "المرشحات",
    "form.filters.love": "الحب",
    "form.filters.finance": "المالية",
    "form.filters.career": "المهنة",
    "form.submit": "احصل على برجي",
    "form.submitting": "استشارة النجوم...",

    // Result Page
    "result.horoscope": " برج",
    "result.changeBackground": "تغيير الخلفية",
    "result.changeTone": "تغيير النبرة",
    "result.tone.casual": "عادي",
    "result.tone.mystical": "غامض",
    "result.tone.professional": "احترافي",
    "result.copy": "نسخ",
    "result.copied": "تم النسخ!",
    "result.share": "مشاركة",
    "result.continue": "استمرار",
    "result.loading": "استشارة النجوم...",

    // CTA Page
    "cta.enjoyed": "هل استمتعت بقراءتك؟",
    "cta.message": "نأمل أن تكون النجوم قد جلبت لك بعض البصيرة اليوم!",
    "cta.coffee": "اشتر لي قهوة",
    "cta.feedback": "اترك تقييمًا",
    "cta.tryAgain": "حاول مرة أخرى",

    // Footer
    "footer.copyright": "© 2025 Astronesia AI. جميع الحقوق محفوظة.",

    // Theme
    "theme.light": "الوضع الفاتح",
    "theme.dark": "الوضع الداكن",

    // Language
    "language.en": "الإنجليزية",
    "language.id": "الإندونيسية",
    "language.zh": "الصينية",
    "language.ar": "العربية",
    "language.es": "الإسبانية",
    "language.fr": "الفرنسية",

    // Privacy
    "privacy.policy": "سياسة الخصوصية",
  },
  es: {
    // Landing Page
    "app.title": "Astronesia AI",
    "app.tagline": "Tu horóscopo diario con inteligencia artificial",
    "form.fullName": "Nombre completo",
    "form.fullName.placeholder": "Ingresa tu nombre",
    "form.dateOfBirth": "Fecha de nacimiento",
    "form.dateOfBirth.placeholder": "Elige una fecha",
    "form.mode": "Modo",
    "form.mode.fun": "Divertido",
    "form.mode.serious": "Serio",
    "form.filters": "Filtros",
    "form.filters.love": "Amor",
    "form.filters.finance": "Finanzas",
    "form.filters.career": "Carrera",
    "form.submit": "Obtener mi horóscopo",
    "form.submitting": "Consultando las estrellas...",

    // Result Page
    "result.horoscope": " - Horóscopo",
    "result.changeBackground": "Cambiar fondo",
    "result.changeTone": "Cambiar tono",
    "result.tone.casual": "Casual",
    "result.tone.mystical": "Místico",
    "result.tone.professional": "Profesional",
    "result.copy": "Copiar",
    "result.copied": "¡Copiado!",
    "result.share": "Compartir",
    "result.continue": "Continuar",
    "result.loading": "Consultando las estrellas...",

    // CTA Page
    "cta.enjoyed": "¿Disfrutaste tu lectura?",
    "cta.message": "¡Esperamos que las estrellas te hayan brindado algo de perspectiva hoy!",
    "cta.coffee": "Invítame un café",
    "cta.feedback": "Dejar una reseña",
    "cta.tryAgain": "Intentar de nuevo",

    // Footer
    "footer.copyright": "© 2025 Astronesia AI. Todos los derechos reservados.",

    // Theme
    "theme.light": "Modo claro",
    "theme.dark": "Modo oscuro",

    // Language
    "language.en": "Inglés",
    "language.id": "Indonesio",
    "language.zh": "Chino",
    "language.ar": "Árabe",
    "language.es": "Español",
    "language.fr": "Francés",

    // Privacy
    "privacy.policy": "Política de privacidad",
  },
  fr: {
    // Landing Page
    "app.title": "Astronesia AI",
    "app.tagline": "Votre horoscope quotidien alimenté par l'IA",
    "form.fullName": "Nom complet",
    "form.fullName.placeholder": "Entrez votre nom",
    "form.dateOfBirth": "Date de naissance",
    "form.dateOfBirth.placeholder": "Choisissez une date",
    "form.mode": "Mode",
    "form.mode.fun": "Amusant",
    "form.mode.serious": "Sérieux",
    "form.filters": "Filtres",
    "form.filters.love": "Amour",
    "form.filters.finance": "Finances",
    "form.filters.career": "Carrière",
    "form.submit": "Obtenir mon horoscope",
    "form.submitting": "Consultation des étoiles...",

    // Result Page
    "result.horoscope": " - Horoscope",
    "result.changeBackground": "Changer l'arrière-plan",
    "result.changeTone": "Changer le ton",
    "result.tone.casual": "Décontracté",
    "result.tone.mystical": "Mystique",
    "result.tone.professional": "Professionnel",
    "result.copy": "Copier",
    "result.copied": "Copié !",
    "result.share": "Partager",
    "result.continue": "Continuer",
    "result.loading": "Consultation des étoiles...",

    // CTA Page
    "cta.enjoyed": "Avez-vous apprécié votre lecture ?",
    "cta.message": "Nous espérons que les étoiles vous ont apporté quelques éclaircissements aujourd'hui !",
    "cta.coffee": "Offrez-moi un café",
    "cta.feedback": "Laisser un avis",
    "cta.tryAgain": "Réessayer",

    // Footer
    "footer.copyright": "© 2025 Astronesia AI. Tous droits réservés.",

    // Theme
    "theme.light": "Mode clair",
    "theme.dark": "Mode sombre",

    // Language
    "language.en": "Anglais",
    "language.id": "Indonésien",
    "language.zh": "Chinois",
    "language.ar": "Arabe",
    "language.es": "Espagnol",
    "language.fr": "Français",

    // Privacy
    "privacy.policy": "Politique de confidentialité",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize language from localStorage only once on mount
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("astronesia-language") as Language | null
      return savedLanguage || "en"
    }
    return "en"
  })

  // Update localStorage when language changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("astronesia-language", language)
    }
  }, [language])

  // Memoize the translation function to prevent unnecessary re-renders
  const t = useCallback(
    (key: string): string => {
      return translations[language][key] || key
    },
    [language],
  )

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    return { language, setLanguage, t }
  }, [language, t])

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
