// Fixed bottom bar on mobile — always-visible CTA
export default function MobileCommissionBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <a
        href="#commission"
        className="block w-full bg-terracotta text-linen text-center font-sans text-sm uppercase tracking-widest py-4"
      >
        Commission a Piece
      </a>
    </div>
  )
}
