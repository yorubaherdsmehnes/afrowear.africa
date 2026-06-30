'use client'
import Link from "next/link";
import { trackClick } from "@/lib/analytics";

export default function Footer() {
  return (
    <footer className="px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-sand/10">
      <Link
        href="/"
        onClick={() => trackClick('Logo', 'Footer')}
        className="flex items-center gap-4 shrink-0"
      >
        afrowear.africa
      </Link>
      <span className="font-sans text-xs uppercase tracking-widest text-sand/40">
        Lagos · Abuja · By appointment only
      </span>
      <div className="flex gap-4">
        <a
          href="https://instagram.com/afrowear.africa"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackClick('Instagram', 'Footer')}
          className="font-sans text-xs uppercase tracking-widest text-sand/40 hover:text-sand transition-colors"
        >
          Instagram
        </a>
        <a
          href="https://tiktok.com/@afrowear.africa"
          onClick={() => trackClick('Tiktok', 'Footer')}
          className="font-sans text-xs uppercase tracking-widest text-sand/40 hover:text-sand transition-colors"
        >
          Tiktok
        </a>
      </div>
      <p className="w-full text-center md:hidden pb-[30px] font-sans text-xs text-sand/20 mt-4">
        © 2026 Afrowear.Africa — Bespoke African fashion for Africans and
        beyond.
      </p>
    </footer>
  );
}
