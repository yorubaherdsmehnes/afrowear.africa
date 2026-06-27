'use client'
import { isValidName } from './validation'

interface Props {
  value: string
  onChange: (v: string) => void
  onNext: () => void
}

export default function StepName({ value, onChange, onNext }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <label htmlFor="name" className="font-serif text-3xl md:text-4xl text-sand">
        To begin, what is your name?
      </label>
      <input
        id="name"
        type="text"
        autoFocus
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && isValidName(value) && onNext()}
        className="bg-transparent border-b-2 border-sand/20 pb-4 text-xl text-sand focus:outline-none focus:border-terracotta transition-colors placeholder:text-sand/20"
        placeholder="Your name"
      />
    </div>
  )
}