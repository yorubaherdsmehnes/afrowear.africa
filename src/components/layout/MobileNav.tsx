'use client'
// Fullscreen mobile drawer — toggled by hamburger in Navbar on small screens
export default function MobileNav({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-forest flex flex-col items-center justify-center gap-8">
      <button onClick={onClose} className="absolute top-6 right-6 text-sand/60 font-sans text-sm uppercase tracking-widest">
        Close
      </button>
      <a href="#commission" onClick={onClose} className="font-sans text-sm uppercase tracking-widest text-terracotta border border-terracotta px-8 py-3">
        Commission a Piece
      </a>
    </div>
  )
}
