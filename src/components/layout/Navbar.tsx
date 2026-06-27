"use client";
import Link from "next/link";
// Sticky nav: wordmark left, "Commission a Piece" button right
// Transparent over the hero; gains a solid background once scrolled past it
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-colors duration-300 ${
        scrolled ? "bg-forest/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <Link href="/" className="flex items-center gap-4 shrink-0">
        afrowear.africa
      </Link>
      <a
        href="#commission"
        className="hidden md:inline-flex font-sans text-xs uppercase tracking-widest border border-terracotta text-terracotta px-5 py-2 hover:bg-terracotta hover:text-linen transition-colors"
      >
        Commission a Piece
      </a>
    </nav>
  );
}
