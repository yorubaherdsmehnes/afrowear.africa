// hooks/useScrollDepth.ts
// Tracks how far down the page the user scrolls, firing a GA4 event once
// each time they cross the 25/50/75/100% marks of the full page height.
'use client'

import { useEffect, useRef } from 'react'
import { trackScrollDepth } from '@/lib/analytics'

const MILESTONES = [25, 50, 75, 100] as const

export function useScrollDepth() {
  const fired = useRef<Set<number>>(new Set())

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return

      const percent = (scrollTop / docHeight) * 100

      for (const milestone of MILESTONES) {
        if (percent >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone)
          trackScrollDepth(milestone)
        }
      }
    }

    onScroll() // in case the page loads already scrolled or short
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
