import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

import { QueryProvider } from '@/lib/query-provider'

export const metadata: Metadata = {
  title: 'Excuse Generator Pro - AI-Powered Excuse Generator for Any Situation',
  description: 'Generate believable, creative, or hilarious excuses instantly. Free AI-powered tool for work, school, social situations. No sign-up required.',
  keywords: ['excuse generator', 'AI excuse maker', 'believable excuses', 'funny excuse generator', 'creative excuses'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
