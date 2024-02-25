import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { ClerkProvider } from '@clerk/nextjs'
import { JetBrains_Mono } from 'next/font/google'

// Vercel
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

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
        <ClerkProvider
          appearance={{
            variables: { colorPrimary: '#0f172a' },
            elements: {
              formFieldInput:
                'flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
              card: 'rounded-xl border border-slate-200',
            },
          }}
        >
          {children}
        </ClerkProvider>
        <Toaster position="top-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
