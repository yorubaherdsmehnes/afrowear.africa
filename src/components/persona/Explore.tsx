"use client";

// Explore.tsx — full 16-persona browsable grid, off-page route
// Lives on /style-persona alongside Clash tab

import { useState, useMemo } from "react";
import { personas } from "./data";
import type { Persona, Domain } from "./data";
import PersonaCard from "./PersonaCard";
import ProfileCard from "./ProfileCard";

type FilterKey = "all" | Domain;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all",      label: "All Archetypes" },
  { key: "social",   label: "Social" },
  { key: "work",     label: "Work" },
  { key: "creative", label: "Creative" },
  { key: "intimate", label: "Intimate" },
];

// Trait filters — highlight personas that score high on a given axis
type TraitFilter = "none" | "boldness" | "heritage" | "structure" | "experimentation" | "warmth";

const TRAIT_FILTERS: { key: TraitFilter; label: string }[] = [
  { key: "none",            label: "Any" },
  { key: "boldness",        label: "Bold" },
  { key: "heritage",        label: "Rooted" },
  { key: "structure",       label: "Structured" },
  { key: "experimentation", label: "Experimental" },
  { key: "warmth",          label: "Warm" },
];

// Persona vector map — mirrors data.ts personaVectors
const PERSONA_VECTORS: Record<string, Record<TraitFilter, number>> = {
  "the-architect":    { none: 0, boldness: 30, heritage: 20, structure: 92, experimentation: 20, warmth: 25 },
  "the-weaver":       { none: 0, boldness: 45, heritage: 94, structure: 35, experimentation: 25, warmth: 91 },
  "the-flame":        { none: 0, boldness: 96, heritage: 40, structure: 25, experimentation: 35, warmth: 55 },
  "the-cartographer": { none: 0, boldness: 50, heritage: 30, structure: 55, experimentation: 88, warmth: 45 },
  "the-griot":        { none: 0, boldness: 40, heritage: 97, structure: 50, experimentation: 20, warmth: 70 },
  "the-disruptor":    { none: 0, boldness: 94, heritage: 15, structure: 10, experimentation: 91, warmth: 30 },
  "the-vessel":       { none: 0, boldness: 20, heritage: 35, structure: 60, experimentation: 25, warmth: 75 },
  "the-hearth":       { none: 0, boldness: 50, heritage: 60, structure: 30, experimentation: 20, warmth: 95 },
  "the-current":      { none: 0, boldness: 80, heritage: 35, structure: 30, experimentation: 88, warmth: 50 },
  "the-mirror":       { none: 0, boldness: 40, heritage: 30, structure: 40, experimentation: 60, warmth: 65 },
  "the-sovereign":    { none: 0, boldness: 70, heritage: 94, structure: 75, experimentation: 15, warmth: 45 },
  "the-botanist":     { none: 0, boldness: 25, heritage: 55, structure: 45, experimentation: 50, warmth: 80 },
  "the-alchemist":    { none: 0, boldness: 65, heritage: 20, structure: 35, experimentation: 93, warmth: 55 },
  "the-oracle":       { none: 0, boldness: 55, heritage: 50, structure: 30, experimentation: 70, warmth: 60 },
  "the-navigator":    { none: 0, boldness: 60, heritage: 40, structure: 89, experimentation: 25, warmth: 35 },
  "the-thread":       { none: 0, boldness: 20, heritage: 70, structure: 80, experimentation: 30, warmth: 50 },
};

const TRAIT_THRESHOLD = 65; // minimum score to be considered "high" on a trait

export default function Explore() {
  const [domainFilter, setDomainFilter] = useState<FilterKey>("all");
  const [traitFilter, setTraitFilter] = useState<TraitFilter>("none");
  const [selected, setSelected] = useState<Persona | null>(null);

  const filtered = useMemo(() => {
    return personas.filter((p) => {
      // Trait filter
      if (traitFilter !== "none") {
        const vec = PERSONA_VECTORS[p.id];
        if (!vec || vec[traitFilter] < TRAIT_THRESHOLD) return false;
      }
      return true;
    });
  }, [traitFilter]);

  const handleSelect = (persona: Persona) => {
    setSelected((prev) => (prev?.id === persona.id ? null : persona));
  };

  const handleClose = () => setSelected(null);

  return (
    <div className="w-full">

      {/* Filter bar */}
      <div className="flex flex-col gap-4 mb-10">

        {/* Trait filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-sans text-xs tracking-widest uppercase text-sand/30 shrink-0">
            Filter
          </span>
          <div className="flex gap-2 flex-wrap">
            {TRAIT_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setTraitFilter(f.key)}
                className={`
                  font-sans text-xs tracking-widest uppercase px-4 py-2
                  border transition-all duration-200
                  ${traitFilter === f.key
                    ? "border-terracotta text-terracotta bg-terracotta/5"
                    : "border-sand/10 text-sand/35 hover:border-sand/25 hover:text-sand/55"
                  }
                `}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="font-sans text-xs text-sand/25 tracking-wide">
          {filtered.length} of {personas.length} archetypes
        </p>
      </div>

      {/* Grid + Profile panel */}
      <div className={`grid gap-0 transition-all duration-300 ${selected ? "md:grid-cols-[1fr_420px]" : "grid-cols-1"}`}>

        {/* Persona grid */}
        <div
          className={`
            grid gap-px bg-sand/5
            ${selected
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }
          `}
        >
          {filtered.map((persona) => (
            <div key={persona.id} className="bg-forest">
              <PersonaCard
                persona={persona}
                onSelect={handleSelect}
                isSelected={selected?.id === persona.id}
              />
            </div>
          ))}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <p className="font-serif text-xl text-sand/30">
                No archetypes match this filter.
              </p>
              <button
                type="button"
                onClick={() => { setTraitFilter("none"); setDomainFilter("all"); }}
                className="mt-4 font-sans text-xs tracking-widest uppercase text-sand/30 hover:text-terracotta transition-colors duration-200 underline underline-offset-4"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Profile panel — slides in when a persona is selected */}
        {selected && (
          <div className="border-l border-sand/10 animate-in slide-in-from-right duration-300">
            <ProfileCard
              persona={selected}
              onClose={handleClose}
              onCommission={() => {
                window.location.href = "/#commission";
              }}
            />
          </div>
        )}
      </div>

      {/* Bottom link to Discover */}
      <div className="mt-16 pt-8 border-t border-sand/10 text-center">
        <p className="font-sans text-xs text-sand/30 tracking-wide mb-3">
          Not sure which archetype is yours?
        </p>
        <a
          href="/#discover"
          className="font-sans text-xs tracking-widest uppercase text-sand/40 hover:text-terracotta transition-colors duration-200 underline underline-offset-4"
        >
          Take the Quiz →
        </a>
      </div>
    </div>
  );
}