import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StylePersonaPage from './StylePersonaPage'

export const metadata: Metadata = {
  title: 'Style Archetypes — Afrowear.Africa',
  description:
    'Explore all sixteen Afrowear style archetypes. Find the one that is yours, see how it dresses across every context, and discover what a commission built for your persona looks like.',
  openGraph: {
    title: 'Style Archetypes — Afrowear.Africa',
    description: 'Sixteen archetypes. Each with a full style profile, textile recommendation, and commission brief.',
    url: 'https://afrowear.africa/style-persona',
    siteName: 'Afrowear.Africa',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Style Archetypes — Afrowear.Africa',
    description: 'Sixteen archetypes. Each with a full style profile, textile recommendation, and commission brief.',
    images: ['/images/og-image.jpg'],
  },
}

export default function StylePersonaRoute() {
  return (
    <main className="bg-forest text-sand min-h-screen">
      <Navbar />
      <StylePersonaPage />
      <Footer />
    </main>
  )
}