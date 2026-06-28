'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { GridTile as GridTileType } from '@/types'

interface LightboxProps {
  tile: GridTileType
  index: number
  total: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function Lightbox({ tile, index, total, onClose, onNext, onPrev }: LightboxProps) {
  const hasMultiple = total > 1
  const touchStartX = useRef<number | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Lock background scroll while open; focus the close button for
  // keyboard/screen-reader users landing in the modal.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  // Keyboard controls: Esc closes, arrow keys browse the collection.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (hasMultiple && e.key === 'ArrowRight') onNext()
      if (hasMultiple && e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, onNext, onPrev, hasMultiple])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    const SWIPE_THRESHOLD = 50
    if (hasMultiple && delta > SWIPE_THRESHOLD) onPrev()
    if (hasMultiple && delta < -SWIPE_THRESHOLD) onNext()
    touchStartX.current = null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tile.alt || 'Full-size image'}
      className="fixed inset-0 z-[60] bg-forest/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        ref={closeBtnRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="Close"
        className="absolute top-6 right-6 z-10 text-sand/60 hover:text-sand font-sans text-xs uppercase tracking-widest transition-colors"
      >
        Close
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            aria-label="Previous look"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 text-sand/60 hover:text-sand font-serif text-4xl px-3 py-2 transition-colors"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            aria-label="Next look"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 text-sand/60 hover:text-sand font-serif text-4xl px-3 py-2 transition-colors"
          >
            &#8250;
          </button>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-sand/40 font-sans text-xs uppercase tracking-widest">
            {index + 1} / {total}
          </span>
        </>
      )}

      <div className="relative w-full h-full p-6 md:p-16" onClick={(e) => e.stopPropagation()}>
        {tile.src && (
          <Image
            src={tile.src}
            alt={tile.alt || ''}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        )}
      </div>
    </div>
  )
}