import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { JetBrains_Mono } from 'next/font/google'

// Vercel
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

// Providers
import { ClerkAuthProvider, ReactQueryClientProvider } from '@/providers'

export const metadata: Metadata = {
  title: 'CMS Tool',
  description: 'Build a personalized dashboard',
}

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} ${jetBrainsMono.variable}`}
        suppressHydrationWarning={true}
      >
        <ClerkAuthProvider>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </ClerkAuthProvider>
        <Toaster position="top-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
