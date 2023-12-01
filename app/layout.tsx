import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

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
      </body>
    </html>
  )
}
