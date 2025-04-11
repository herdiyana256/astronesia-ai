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
      <head>
        {/* Meta SEO tambahan */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="google-adsense-account" content="ca-pub-8753214242742421"></meta>
        <link rel="canonical" href="https://supernesia-ai.my.id" />

        {/* ✅ Google Search Console Verification */}
        <meta name="google-site-verification" content="9ju96LjPRXXqxxTu-toJGVB2nSnviujul76yVzI2t4s" />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Astronesia-AI by Supernesia",
              url: "https://supernesia-ai.my.id",
              author: {
                "@type": "Person",
                name: "Herdiyan Adam Putra"
              },
              description:
                "Get your daily horoscope powered by Astronesia-AI, an innovative project under Supernesia.",
              inLanguage: "en"
            })
          }}
        />
      </head>
      <body>
        <header>{/* Optional: Navigation / Logo */}</header>
        <main>{children}</main>
        <footer>
          <p>&copy; {new Date().getFullYear()} Supernesia-AI by Herdiyanitdev</p>
        </footer>
      </body>
    </html>
  )
}
