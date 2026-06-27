'use client'
import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'ghost'
}

export default function Button({ variant = 'filled', className, children, ...props }: ButtonProps) {
  return (
    <button
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
