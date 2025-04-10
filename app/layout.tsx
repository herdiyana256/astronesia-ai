import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Astronesia-AI by Supernesia',
  description:
    'Get your daily horoscope powered by Astronesia-AI, an innovative project under Supernesia. Built with love by Herdiyanitdev to deliver AI-driven insights tailored for you.',
  generator: 'Herdiyanitdev - Supernesia',
  keywords: [
    'Astronesia-AI',
    'Supernesia',
    'daily horoscope AI',
    'AI astrology',
    'AI horoscope generator',
    'Indonesian AI',
    'Herdiyanitdev',
    'Supernesia AI project'
  ],
  authors: [{ name: 'Herdiyan Adam Putra', url: 'https://supernesia-ai.my.id' }],
  creator: 'Herdiyanitdev',
  metadataBase: new URL('https://supernesia-ai.my.id'),
  openGraph: {
    title: 'Astronesia-AI by Supernesia',
    description:
      'Experience daily horoscope predictions with the power of AI. Astronesia-AI is a part of Supernesia’s innovation in artificial intelligence.',
    url: 'https://supernesia-ai.my.id',
    siteName: 'Supernesia AI',
    locale: 'en_US',
    type: 'website'
  },
  icons: {
    icon: '/32px.png',
    shortcut: '/16px.png'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
