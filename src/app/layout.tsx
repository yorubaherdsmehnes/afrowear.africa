import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Afrowear.Africa — Bespoke African Fashion, Made For You',
  description:
    'Commission bespoke African occasion wear from Lagos and Abuja. Custom Ankara, Aso Oke, silk-lace and more. Share your vision, receive your piece in 2–6 weeks.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://afrowear.africa'),
  openGraph: {
    title: 'Afrowear.Africa — Bespoke African Fashion, Made For You',
    description: 'Bespoke African occasion wear. By commission only.',
    url: 'https://afrowear.africa',
    siteName: 'Afrowear.Africa',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Afrowear.Africa',
    description: 'Bespoke African occasion wear. By commission only.',
    images: ['/images/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
