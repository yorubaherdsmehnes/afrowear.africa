'use client'
// Animated vertical line at the bottom of the Hero pointing down
export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-[90px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="font-sans text-xs uppercase tracking-widest text-terracotta/60">Scroll</span>
      <div className="w-px h-15 bg-terracotta/50 animate-pulse" />
    </div>
  )
}
