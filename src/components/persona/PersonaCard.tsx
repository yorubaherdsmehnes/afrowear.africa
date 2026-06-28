"use client";

// PersonaCard.tsx — grid tile for Explore mode, also used in Discover's live reveal
// `variant` controls which background it's designed to sit on:
//   "dark"  (default) — Explore page, sits on the brand's usual dark forest background
//   "light" — Discover section on the homepage, sits on the light linen background

import { useState } from "react";
import type { Persona } from "./data";

type PersonaCardProps = {
  persona: Persona;
  onSelect: (persona: Persona) => void;
  isSelected?: boolean;
  variant?: "dark" | "light";
};

export default function PersonaCard({
  persona,
  onSelect,
  isSelected = false,
  variant = "dark",
}: PersonaCardProps) {
  const [hovered, setHovered] = useState(false);
  const isLight = variant === "light";

  return (
    <button
      type="button"
      onClick={() => onSelect(persona)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        group relative w-full text-left border transition-all duration-300 cursor-pointer
        ${isSelected
          ? "border-terracotta bg-terracotta/5"
          : isLight
            ? "border-forest/10 bg-linen hover:border-forest/25"
            : "border-sand/10 bg-forest hover:border-sand/25"
        }
      `}
      aria-pressed={isSelected}
    >
      {/* Palette strip — top edge */}
      <div className="flex h-0.5 w-full overflow-hidden">
        {persona.palette.map((hex, i) => (
          <div
            key={i}
            className="flex-1 transition-opacity duration-300"
            style={{
              backgroundColor: hex,
              opacity: hovered || isSelected ? 1 : 0.4,
            }}
          />
        ))}
      </div>

      <div className="p-6">
        {/* Eyebrow */}
        <p className="font-sans text-xs tracking-widest uppercase text-terracotta mb-3">
          {persona.eyebrow}
        </p>

        {/* Name */}
        <h3 className={`font-serif text-xl mb-1 leading-tight ${isLight ? "text-forest" : "text-sand"}`}>
          {persona.name}
        </h3>

        {/* Subtitle */}
        <p className={`font-sans text-xs tracking-wide uppercase mb-4 ${isLight ? "text-forest/45" : "text-sand/40"}`}>
          {persona.subtitle}
        </p>

        {/* Divider */}
        <div className={`w-8 h-px mb-4 ${isLight ? "bg-forest/15" : "bg-sand/15"}`} />

        {/* Description excerpt */}
        <p
          className={`
            font-sans text-sm leading-relaxed line-clamp-3
            transition-all duration-300
            ${isLight
              ? (hovered || isSelected ? "text-forest/80" : "text-forest/60")
              : (hovered || isSelected ? "text-sand/75" : "text-sand/60")
            }
          `}
        >
          {persona.description}
        </p>

        {/* Voice quote — appears on hover/select */}
        <p
          className={`
            font-serif text-sm text-terracotta/80 italic mt-4 leading-snug
            transition-all duration-300
            ${hovered || isSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
          `}
        >
          {persona.voice}
        </p>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-1.5 h-1.5 rounded-full bg-terracotta" />
        </div>
      )}

      {/* Bottom border reveal on hover */}
      <div
        className={`
          absolute bottom-0 left-0 h-px bg-terracotta transition-all duration-500
          ${hovered || isSelected ? "w-full" : "w-0"}
        `}
      />
    </button>
  );
}