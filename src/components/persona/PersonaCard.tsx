"use client";

// PersonaCard.tsx — grid tile for Explore mode

import { useState } from "react";
import type { Persona } from "./data";

type PersonaCardProps = {
  persona: Persona;
  onSelect: (persona: Persona) => void;
  isSelected?: boolean;
};

export default function PersonaCard({
  persona,
  onSelect,
  isSelected = false,
}: PersonaCardProps) {
  const [hovered, setHovered] = useState(false);

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
        <h3 className="font-serif text-xl text-sand mb-1 leading-tight">
          {persona.name}
        </h3>

        {/* Subtitle */}
        <p className="font-sans text-xs tracking-wide text-sand/40 uppercase mb-4">
          {persona.subtitle}
        </p>

        {/* Divider */}
        <div className="w-8 h-px bg-sand/15 mb-4" />

        {/* Description excerpt */}
        <p
          className={`
            font-sans text-sm text-sand/60 leading-relaxed line-clamp-3
            transition-all duration-300
            ${hovered || isSelected ? "text-sand/75" : ""}
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