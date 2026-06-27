import { Testimonial } from '@/types'

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote className="flex flex-col gap-4">
      <p className="font-serif text-lg text-sand italic">"{testimonial.quote}"</p>
      <footer className="font-sans text-xs uppercase tracking-widest text-sand/50">
        — {testimonial.name}, {testimonial.location} · {testimonial.occasion}
      </footer>
    </blockquote>
  )
}
