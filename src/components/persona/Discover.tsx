"use client";

// Discover.tsx — five-slider quiz, live persona reveal
// Lives on homepage inside StylePersona section
// Also rendered on the confirmation screen post-commission

import { useState, useCallback } from "react";
import { personas, findNearestPersona } from "./data";
import type { SliderKey } from "./data";
import PersonaCard from "./PersonaCard";
import ProfileCard from "./ProfileCard";
import Motif from "./Motif";

type DiscoverProps = {
  // When true (post-commission success screen), shows a warmer intro framing
  postCommission?: boolean;
  // Called when user clicks "Commission This" inside the revealed ProfileCard
  onCommission?: () => void;
};

type SliderConfig = {
  key: SliderKey;
  leftLabel: string;
  rightLabel: string;
  description: string;
};

const SLIDERS: SliderConfig[] = [
  {
    key: "boldness",
    leftLabel: "They find me",
    rightLabel: "They notice me",
    description:
      "When you walk into a room, do people notice you immediately or do they find you?",
  },
  {
    key: "heritage",
    leftLabel: "Rarely",
    rightLabel: "Almost always",
    description:
      "How often do you reach for Ankara, Aso Oke, or a heritage print over something contemporary?",
  },
  {
    key: "structure",
    leftLabel: "Flowing",
    rightLabel: "Fitted",
    description:
      "Question: When you picture your ideal outfit, is it flowing and draped or fitted and sharp?",
  },
  {
    key: "experimentation",
    leftLabel: "Stick to what works",
    rightLabel: "Try new things",
    description:
      "Is your wardrobe mostly pieces you know work, or do you like to try things you've never worn before?",
  },
  {
    key: "warmth",
    leftLabel: "For Myself",
    rightLabel: "For the room",
    description:
      "Do you dress mostly for yourself, or to make others feel something when they see you?",
  },
];

const DEFAULT_VALUES: Record<SliderKey, number> = {
  boldness: 50,
  heritage: 50,
  structure: 50,
  experimentation: 50,
  warmth: 50,
};

export default function Discover({
  postCommission = false,
  onCommission,
}: DiscoverProps) {
  const [values, setValues] =
    useState<Record<SliderKey, number>>(DEFAULT_VALUES);
  const [revealed, setRevealed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const currentPersona = findNearestPersona(values);

  const handleSlider = useCallback(
    (key: SliderKey, value: number) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      // Reset profile view if sliders change after reveal
      if (showProfile) setShowProfile(false);
    },
    [showProfile],
  );

  const handleReveal = () => setRevealed(true);
  const handleSeeProfile = () => setShowProfile(true);
  const handleBack = () => setShowProfile(false);

  return (
    <div className="relative w-full">
      {/* Background motif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Motif className="absolute inset-0 w-full h-full" opacity={0.04} />
      </div>

      {!showProfile ? (
        <div className="relative">
          {/* Intro copy */}
          <div className="mb-12">
            {postCommission ? (
              <>
                <p className="font-sans text-xs tracking-widest uppercase text-terracotta mb-4">
                  While the Atelier Prepares
                </p>
                <p className="font-sans text-sm text-sand/55 leading-relaxed max-w-xl">
                  Your commission is in hand. Before you go — five questions
                  that take less than a minute, and will tell you something true
                  about how you dress.
                </p>
              </>
            ) : (
              <>
                <p className="font-sans text-xs tracking-widest uppercase text-terracotta mb-4">
                  Know Your Style
                </p>
                <p className="font-sans text-sm text-sand/55 leading-relaxed max-w-xl">
                  Five questions. No wrong answers. Move each slider, see your
                  personal style take shape.
                </p>
              </>
            )}
          </div>

          {/* Two-column layout: sliders left, live preview right */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Sliders */}
            <div className="space-y-8">
              {SLIDERS.map((slider) => (
                <div key={slider.key}>
                  {/* Question */}
                  <p className="font-sans text-xs text-sand/40 leading-relaxed mb-4 italic">
                    {slider.description}
                  </p>

                  {/* Labels + track */}
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-xs tracking-wide uppercase text-sand/35 w-20 shrink-0 text-right leading-tight">
                      {slider.leftLabel}
                    </span>

                    {/* Slider track */}
                    {/* Slider track */}
                    <div className="relative flex-1 flex items-center">
                      {/* Custom track background */}
                      <div className="absolute inset-0 flex items-center pointer-events-none">
                        {/* Changed to h-[5px] */}
                        <div className="w-full h-[5px] rounded-full bg-sand/20" />
                      </div>
                      {/* Filled portion */}
                      <div
                        className="absolute left-0 h-[5px] rounded-full bg-terracotta/60 pointer-events-none transition-all duration-150"
                        style={{ width: `${values[slider.key]}%` }}
                      />
                      {/* Input — thumb only, track fully transparent */}
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={values[slider.key]}
                        onChange={(e) =>
                          handleSlider(slider.key, Number(e.target.value))
                        }
                        className="relative w-full appearance-none bg-transparent cursor-pointer z-10
      [&::-webkit-slider-runnable-track]:appearance-none
      [&::-webkit-slider-runnable-track]:bg-transparent
      [&::-webkit-slider-runnable-track]:border-none
      [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:w-3
      [&::-webkit-slider-thumb]:h-3
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:bg-terracotta
      [&::-webkit-slider-thumb]:transition-transform
      [&::-webkit-slider-thumb]:duration-150
      [&::-webkit-slider-thumb]:hover:scale-125
      [&::-moz-range-track]:bg-transparent
      [&::-moz-range-thumb]:border-none
      [&::-moz-range-thumb]:w-3
      [&::-moz-range-thumb]:h-3
      [&::-moz-range-thumb]:rounded-full
      [&::-moz-range-thumb]:bg-terracotta"
                        aria-label={`${slider.leftLabel} to ${slider.rightLabel}`}
                      />
                    </div>

                    <span className="font-sans text-xs tracking-wide uppercase text-sand/35 w-20 shrink-0 leading-tight">
                      {slider.rightLabel}
                    </span>
                  </div>
                </div>
              ))}

              {/* Reveal button */}
              <div className="pt-4">
                {!revealed ? (
                  <button
                    type="button"
                    onClick={handleReveal}
                    className="w-full border border-terracotta text-terracotta font-sans text-xs tracking-widest uppercase py-4 hover:bg-terracotta hover:text-forest transition-all duration-300"
                  >
                    Reveal My Persona
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSeeProfile}
                    className="w-full bg-terracotta text-forest font-sans text-xs tracking-widest uppercase py-4 hover:bg-sand transition-all duration-300"
                  >
                    See Full Profile
                  </button>
                )}
              </div>
            </div>

            {/* Live persona preview */}
            <div className="relative">
              {/* Pre-reveal: ghosted placeholder */}
              {!revealed && (
                <div className="border border-sand/10 p-8 flex flex-col gap-4">
                  <div className="flex h-0.5 w-full">
                    <div className="flex-1 bg-sand/10" />
                    <div className="flex-1 bg-sand/7" />
                    <div className="flex-1 bg-sand/5" />
                  </div>
                  <div className="h-3 w-24 bg-sand/8 mt-2" />
                  <div className="h-6 w-40 bg-sand/10" />
                  <div className="h-2 w-32 bg-sand/6" />
                  <div className="w-8 h-px bg-sand/10 my-2" />
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-sand/6" />
                    <div className="h-2 w-5/6 bg-sand/6" />
                    <div className="h-2 w-4/6 bg-sand/6" />
                  </div>
                  <p className="font-sans text-xs text-sand/20 tracking-widest uppercase mt-4 text-center">
                    Move the sliders to begin
                  </p>
                </div>
              )}

              {/* Post-reveal: live PersonaCard */}
              {revealed && (
                <div className="animate-in fade-in duration-500">
                  <PersonaCard
                    persona={currentPersona}
                    onSelect={handleSeeProfile}
                    isSelected
                  />
                  <p className="font-sans text-xs text-sand/30 mt-3 text-center tracking-wide">
                    Adjust the sliders to refine — or click the card to see your
                    full profile.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Link to full Explore page */}
          <div className="mt-12 pt-8 border-t border-sand/10 flex items-center justify-between">
            <p className="font-sans text-xs text-sand/35 tracking-wide">
              Sixteen archetypes in total — each with a complete style profile,
              textile recommendation, and commission brief.
            </p>
            <a
              href="/style-persona"
              className="font-sans text-xs tracking-widest uppercase text-sand/40 hover:text-terracotta transition-colors duration-200 underline underline-offset-4 shrink-0 ml-8"
            >
              Explore All →
            </a>
          </div>
        </div>
      ) : (
        /* Full profile view */
        <div className="animate-in fade-in duration-300">
          <button
            type="button"
            onClick={handleBack}
            className="font-sans text-xs tracking-widest uppercase text-sand/35 hover:text-sand/70 transition-colors duration-200 mb-8 flex items-center gap-2"
          >
            ← Back
          </button>
          <ProfileCard
            persona={currentPersona}
            onClose={handleBack}
            onCommission={onCommission}
          />
        </div>
      )}
    </div>
  );
}
