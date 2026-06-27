'use client'
// Animated vertical line at the bottom of the Hero pointing down
export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="font-sans text-xs uppercase tracking-widest text-sand/40">Scroll</span>
      <div className="w-px h-12 bg-sand/20 animate-pulse" />
    </div>
  )
}
