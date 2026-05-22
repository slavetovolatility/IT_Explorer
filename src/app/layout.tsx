import type { Metadata } from 'next'
import { Fraunces, Geist, JetBrains_Mono } from 'next/font/google'
import '@/app/globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz'],
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://insidethailand.com'),
  title: 'Inside Thailand — the local edge',
  description:
    'A discovery hub for places, food, transport, and the practical stuff — written by people who actually live here, not a marketing department.',
  openGraph: {
    title: 'Inside Thailand — the local edge',
    description: 'Hand-picked places, working transport tips, scams to skip.',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${geist.variable} ${mono.variable} has-bottomnav`}>
        {children}
      </body>
    </html>
  )
}
