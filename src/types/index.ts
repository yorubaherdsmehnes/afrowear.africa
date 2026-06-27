export type FormStep = 'gate' | 'name' | 'phone' | 'vision' | 'success' | 'declined'

export interface CommissionRequest {
  full_name: string
  contact_number: string
  vision: string
}

export interface GridTile {
  id: string
  type: 'dress' | 'fabric' | 'motif' | 'quote'
  src?: string
  alt?: string
  quote?: string
  span?: 'tall' | 'wide' | 'square'
}

export interface Testimonial {
  quote: string
  name: string
  location: string
  occasion: string
}