'use client'
// Testimonials carousel — fetches from Supabase (displayed_on_web = true)
// Always exactly 4 records. Carousel slides one card at a time on a timer.
// Desktop: 4 visible | Tablet (~768px): 2 visible | Mobile: 1 visible

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import TestimonialCard from '@/components/ui/TestimonialCard'
import AfricanDivider from '@/components/ui/AfricanDivider'
import type { Testimonial } from '@/types'

// How many cards are visible at each breakpoint
// Matches Tailwind's md (768px) and lg (1024px)
function getVisibleCount(): number {
  if (typeof window === 'undefined') return 4
  if (window.innerWidth >= 1024) return 4
  if (window.innerWidth >= 768)  return 2
  return 1
}

const SLIDE_INTERVAL = 4000  // ms between auto-advances
const SLIDE_DURATION = 500   // ms for the CSS transition

export default function Proof() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading]           = useState(true)
  const [current, setCurrent]           = useState(0)       // leading index
  const [visible, setVisible]           = useState(4)
  const [transitioning, setTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval>>()

  // Fetch on mount
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('quote, name, location, occasion')
        .eq('displayed_on_web', true)
        .limit(4)

      if (!error && data) setTestimonials(data as Testimonial[])
      setLoading(false)
    }
    load()
  }, [])

  // Responsive visible count
  useEffect(() => {
    const update = () => setVisible(getVisibleCount())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Auto-advance timer
  useEffect(() => {
    if (testimonials.length === 0) return
    timerRef.current = setInterval(advance, SLIDE_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [testimonials, visible, current])

  function advance() {
    if (transitioning || testimonials.length === 0) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(prev => (prev + 1) % testimonials.length)
      setTransitioning(false)
    }, SLIDE_DURATION)
  }

  // Build the visible window — wraps around the array
  function visibleTestimonials(): Testimonial[] {
    if (testimonials.length === 0) return []
    return Array.from({ length: visible }, (_, i) =>
      testimonials[(current + i) % testimonials.length]
    )
  }

  return (
    <section className="px-6 md:px-16 py-24">
      <AfricanDivider className="mb-16" />
      <p className="font-sans text-xs uppercase tracking-widest text-terracotta mb-12">
        The Atelier
      </p>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 rounded bg-sand/5 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && testimonials.length === 0 && (
        <p className="font-sans text-xs uppercase tracking-widest text-sand/30">
          No testimonials yet.
        </p>
      )}

      {!loading && testimonials.length > 0 && (
        <div className="relative overflow-hidden">
          <div
            className="grid gap-12 transition-opacity"
            style={{
              gridTemplateColumns: `repeat(${visible}, 1fr)`,
              opacity: transitioning ? 0 : 1,
              transition: `opacity ${SLIDE_DURATION}ms ease-in-out`,
            }}
          >
            {visibleTestimonials().map((t, i) => (
              <TestimonialCard key={`${current}-${i}`} testimonial={t} />
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  clearInterval(timerRef.current)
                  setCurrent(i)
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  i === current ? 'bg-terracotta' : 'bg-sand/20'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}