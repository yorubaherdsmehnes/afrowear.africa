"use client";

// TraitBar.tsx — single horizontal trait bar, brand-styled

type TraitBarProps = {
  label: string;
  value: number; // 0–100
  delay?: number; // animation delay in ms
};

export default function TraitBar({ label, value, delay = 0 }: TraitBarProps) {
  return (
    <div className="flex items-center gap-4 group">
      {/* Label */}
      <span
        className="font-sans text-xs tracking-widest uppercase text-sand/50 w-32 shrink-0 text-right"
      >
        {label}
      </span>

      {/* Track */}
      <div className="relative flex-1 h-px bg-sand/10">
        {/* Fill */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-terracotta origin-left transition-all duration-700 ease-out"
          style={{
            width: `${value}%`,
            transitionDelay: `${delay}ms`,
          }}
        />
        {/* Terminal dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-terracotta transition-all duration-700 ease-out"
          style={{
            left: `${value}%`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>

      {/* Value */}
      <span className="font-sans text-xs text-sand/30 w-8 shrink-0 tabular-nums">
        {value}
      </span>
    </div>
  );
}