// Subtle step indicator — "1 of 3"
export default function FormProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-px flex-1 transition-colors duration-500 ${i < current ? 'bg-terracotta' : 'bg-sand/20'}`}
        />
      ))}
    </div>
  )
}
