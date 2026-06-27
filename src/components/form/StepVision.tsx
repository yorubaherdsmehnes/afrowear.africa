'use client'
interface Props {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  isLoading: boolean
}

export default function StepVision({ value, onChange, onSubmit, isLoading }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <label htmlFor="vision" className="font-serif text-3xl md:text-4xl text-sand">
        Briefly describe the piece you envision.
      </label>
      <textarea
        id="vision"
        autoFocus
        rows={3}
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={isLoading}
        placeholder="The occasion, the silhouette, the feeling..."
        className="bg-transparent border-b-2 border-sand/20 pb-4 text-xl text-sand focus:outline-none focus:border-terracotta transition-colors resize-none placeholder:text-sand/20 disabled:opacity-50"
      />
    </div>
  )
}
