'use client'
import { ButtonHTMLAttributes, MouseEvent } from 'react'
import { cn } from '@/lib/utils'
import { trackClick } from '@/lib/analytics'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'ghost'
  /** Where this button lives on the page, for disambiguating duplicate labels (e.g. "Velvet Rope Gate"). Defaults to the button's own text. */
  trackingLocation?: string
  /** Override the auto-derived label (defaults to the button's visible text). */
  trackingLabel?: string
}

export default function Button({
  variant = 'filled',
  className,
  children,
  trackingLocation,
  trackingLabel,
  onClick,
  ...props
}: ButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const label = trackingLabel ?? (typeof children === 'string' ? children : e.currentTarget.textContent || 'Unnamed Button')
    trackClick(label, trackingLocation ?? 'Unknown Section')
    onClick?.(e)
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'font-sans text-sm uppercase tracking-widest transition-all px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'filled'
          ? 'bg-terracotta text-linen hover:bg-sand hover:text-charcoal'
          : 'border border-sand/30 text-sand hover:bg-sand hover:text-charcoal',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
