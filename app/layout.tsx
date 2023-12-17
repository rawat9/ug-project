import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'CMS Tool',
  description: 'Build a personalized dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className} suppressHydrationWarning={true}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
