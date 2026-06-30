// components/analytics/SectionTracker.tsx
// Wraps any page section. Fires a `section_view` event the first time the
// section enters the viewport, and a `section_dwell` event (with seconds
// spent visible) every time it leaves — including on page unload.
//
// Usage:
//   <SectionTracker name="Hero">
//     <Hero />
//   </SectionTracker>
'use client'

import { useEffect, useRef } from 'react'
import { trackSectionView, trackSectionDwell } from '@/lib/analytics'

export default function SectionTracker({
  name,
  children,
  threshold = 0.4, // fraction of section that must be visible to "count"
}: {
  name: string
  children: React.ReactNode
  threshold?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const hasBeenViewed = useRef(false)
  const enteredAt = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const flushDwell = () => {
      if (enteredAt.current !== null) {
        const seconds = (Date.now() - enteredAt.current) / 1000
        trackSectionDwell(name, seconds)
        enteredAt.current = null
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasBeenViewed.current) {
            hasBeenViewed.current = true
            trackSectionView(name)
          }
          enteredAt.current = Date.now()
        } else {
          flushDwell()
        }
      },
      { threshold },
    )

    observer.observe(el)

    // Catch dwell time if the user closes/navigates away mid-view.
    const onUnload = () => flushDwell()
    window.addEventListener('beforeunload', onUnload)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushDwell()
    })

    return () => {
      flushDwell()
      observer.disconnect()
      window.removeEventListener('beforeunload', onUnload)
    }
  }, [name, threshold])

  return (
    <div ref={ref} data-section-tracker={name}>
      {children}
    </div>
  )
}
