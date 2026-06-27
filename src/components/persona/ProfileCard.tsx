"use client";

// ProfileCard.tsx — full persona detail panel, domain tabs, radar + trait bars

import { useState } from "react";
import type { Persona, Domain } from "./data";
import RadarChart from "./RadarChart";
import TraitBar from "./TraitBar";

type ProfileCardProps = {
  persona: Persona;
  onClose?: () => void;
  onCommission?: () => void;
};

const DOMAIN_LABELS: Record<Domain, string> = {
  social:   "Social",
  work:     "Work",
  creative: "Creative",
  intimate: "Intimate",
};

export default function ProfileCard({
  persona,
  onClose,
  onCommission,
}: ProfileCardProps) {
  const [activeDomain, setActiveDomain] = useState<Domain>("social");

  const domainProfile = persona.domains.find((d) => d.domain === activeDomain);

  return (
    <div className="bg-forest border border-sand/10 w-full">

      {/* Header */}
      <div className="relative border-b border-sand/10 px-8 pt-8 pb-6">
        {/* Close */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 font-sans text-xs tracking-widest uppercase text-sand/30 hover:text-sand/70 transition-colors duration-200"
          >
            Close
          </button>
        )}

        {/* Palette strip */}
        <div className="flex h-px w-16 overflow-hidden mb-6">
          {persona.palette.map((hex, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: hex }} />
          ))}
        </div>

        {/* Eyebrow */}
        <p className="font-sans text-xs tracking-widest uppercase text-terracotta mb-2">
          {persona.eyebrow}
        </p>

        {/* Name + subtitle */}
        <h2 className="font-serif text-4xl text-sand leading-tight mb-1">
          {persona.name}
        </h2>
        <p className="font-sans text-xs tracking-widest uppercase text-sand/35">
          {persona.subtitle}
        </p>

        {/* Voice */}
        <p className="font-serif text-base text-sand/60 italic mt-5 leading-relaxed max-w-lg">
          {persona.voice}
        </p>
      </div>

      {/* Body — two column on md+ */}
      <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-sand/10">

        {/* Left — description + radar + traits */}
        <div className="px-8 py-8 space-y-8">

          {/* Description */}
          <p className="font-sans text-sm text-sand/65 leading-relaxed">
            {persona.description}
          </p>

          {/* Divider */}
          <div className="w-8 h-px bg-sand/15" />

          {/* Radar chart */}
          <div className="flex flex-col items-center gap-6">
            <RadarChart traits={persona.traits} size={180} />

            {/* Trait bars */}
            <div className="w-full space-y-3">
              {persona.traits.map((trait, i) => (
                <TraitBar
                  key={trait.label}
                  label={trait.label}
                  value={trait.value}
                  delay={i * 80}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right — domain tabs */}
        <div className="flex flex-col">

          {/* Tab row */}
          <div className="flex border-b border-sand/10">
            {persona.domains.map((d) => (
              <button
                key={d.domain}
                type="button"
                onClick={() => setActiveDomain(d.domain)}
                className={`
                  flex-1 py-4 font-sans text-xs tracking-widest uppercase
                  transition-colors duration-200 border-r last:border-r-0 border-sand/10
                  ${activeDomain === d.domain
                    ? "text-terracotta bg-terracotta/5"
                    : "text-sand/30 hover:text-sand/60"
                  }
                `}
              >
                {DOMAIN_LABELS[d.domain]}
              </button>
            ))}
          </div>

          {/* Domain content */}
          {domainProfile && (
            <div className="px-8 py-8 flex flex-col gap-6 flex-1">

              {/* Domain label */}
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-terracotta mb-2">
                  {domainProfile.label}
                </p>
                <p className="font-sans text-sm text-sand/65 leading-relaxed">
                  {domainProfile.description}
                </p>
              </div>

              <div className="w-8 h-px bg-sand/15" />

              {/* Fabric */}
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-sand/30 mb-2">
                  Textile
                </p>
                <p className="font-serif text-base text-sand/80 leading-snug">
                  {domainProfile.fabric}
                </p>
              </div>

              <div className="w-8 h-px bg-sand/15" />

              {/* Commission suggestion */}
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-sand/30 mb-2">
                  The Commission
                </p>
                <p className="font-sans text-sm text-sand/60 leading-relaxed">
                  {domainProfile.commission}
                </p>
              </div>

              {/* CTA */}
              {onCommission && (
                <div className="mt-auto pt-4">
                  <button
                    type="button"
                    onClick={onCommission}
                    className="w-full border border-terracotta text-terracotta font-sans text-xs tracking-widest uppercase py-4 hover:bg-terracotta hover:text-forest transition-all duration-300"
                  >
                    Commission This
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Affinities + Clashes footer */}
      <div className="border-t border-sand/10 px-8 py-6 grid grid-cols-2 gap-8">
        <div>
          <p className="font-sans text-xs tracking-widest uppercase text-sand/30 mb-3">
            Harmonises with
          </p>
          <div className="flex flex-wrap gap-2">
            {persona.affinities.map((id) => (
              <span
                key={id}
                className="font-sans text-xs tracking-wide text-sand/50 border border-sand/10 px-3 py-1"
              >
                {id.replace("the-", "The ").replace(/-/g, " ")}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-sans text-xs tracking-widest uppercase text-sand/30 mb-3">
            Tension with
          </p>
          <div className="flex flex-wrap gap-2">
            {persona.clashes.map((id) => (
              <span
                key={id}
                className="font-sans text-xs tracking-wide text-terracotta/50 border border-terracotta/15 px-3 py-1"
              >
                {id.replace("the-", "The ").replace(/-/g, " ")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}