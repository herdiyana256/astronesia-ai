import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Astronesia-AI',
  description: 'Created with Astronesia-ai',
  generator: 'Herdiyanitdev',
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
