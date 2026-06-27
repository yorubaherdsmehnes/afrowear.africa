import { type ClassValue, clsx } from 'clsx'

// Lightweight class merger — install clsx: npm i clsx
export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ')
}
