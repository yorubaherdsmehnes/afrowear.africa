// app/layout.tsx
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import ScrollDepthTracker from '@/components/analytics/ScrollDepthTracker'
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
  description: 'Commission bespoke African occasion wear from Lagos and Abuja. Custom Ankara, Aso Oke, silk-lace and more. Share your vision,  2–6 weeks.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://afrowear.africa'),
  // ... [Keep your existing OpenGraph/Twitter config here]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        {children}
        <ScrollDepthTracker />
      </body>
      
      {/* 
        Inject GA4. Ensure you use an environment variable for the ID 
        so you aren't tracking your local development clicks!
      */}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
    </html>
  )
}