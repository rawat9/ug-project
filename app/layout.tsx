import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { JetBrains_Mono, League_Spartan } from 'next/font/google'

// Vercel
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

// Providers
import { ClerkAuthProvider, ReactQueryClientProvider } from '@/providers'

export const metadata: Metadata = {
  title: 'dashgen - A better way to build data driven dashboards',
  description: 'A better way to build data driven dashboards',
}

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-league-spartan',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} ${jetBrainsMono.variable} ${leagueSpartan.variable}`}
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
