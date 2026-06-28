'use client'

import { useEffect, useRef } from 'react'

/**
 * Drives a horizontal auto-scroll on a container ref.
 * - direction: 'left' (default) or 'right'
 * - Speeds up temporarily when the user scrolls, then eases back
 */
export function useAutoScroll(
  containerRef: React.RefObject<HTMLElement>,
  baseSpeed  = 0.5,
  boostSpeed = 2,
  direction: 'left' | 'right' = 'left',
  paused = false,
) {
  const speed        = useRef(baseSpeed)
  const rafId        = useRef<number>(0)
  const boostTimeout = useRef<ReturnType<typeof setTimeout>>()
  const easeTimeout  = useRef<ReturnType<typeof setInterval>>()
  const pausedRef     = useRef(paused)

  // Keep the latest paused flag available inside the running rAF loop
  // without needing to restart the effect (which would re-attach listeners
  // and could jump scroll position) every time it changes.
  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const tick = () => {
      if (!pausedRef.current) {
        if (direction === 'left') {
          el.scrollLeft += speed.current
          // Seamless loop: reset when we've scrolled through the first copy
          if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
        } else {
          el.scrollLeft -= speed.current
          // Seamless loop: reset from the left edge back to the midpoint
          if (el.scrollLeft <= 0) el.scrollLeft = el.scrollWidth / 2
        }
      }
      rafId.current = requestAnimationFrame(tick)
    }

    // Right-direction starts at the midpoint so it has content to scroll into
    if (direction === 'right') {
      el.scrollLeft = el.scrollWidth / 2
    }

    rafId.current = requestAnimationFrame(tick)

    const onWheel = () => {
      clearInterval(easeTimeout.current)
      clearTimeout(boostTimeout.current)
      speed.current = boostSpeed

      // After 50ms, ease back down gradually instead of snapping
      boostTimeout.current = setTimeout(() => {
        const step = (boostSpeed - baseSpeed) / 40
        easeTimeout.current = setInterval(() => {
          speed.current = Math.max(baseSpeed, speed.current - step)
          if (speed.current <= baseSpeed) clearInterval(easeTimeout.current)
        }, 16)
      }, 0)
    }

    // Listen on the element itself for mobile touch-scroll, and window for wheel
    window.addEventListener('wheel',      onWheel, { passive: true })
    el.addEventListener(   'touchmove',   onWheel, { passive: true })

    return () => {
      cancelAnimationFrame(rafId.current)
      clearTimeout(boostTimeout.current)
      clearInterval(easeTimeout.current)
      window.removeEventListener('wheel',    onWheel)
      el.removeEventListener(   'touchmove', onWheel)
    }
  }, [containerRef, baseSpeed, boostSpeed, direction])
}