"use client";

// Motif.tsx — subtle Adire-inspired geometric texture, brand colours

type MotifProps = {
  className?: string;
  opacity?: number;
};

export default function Motif({ className = "", opacity = 0.06 }: MotifProps) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ opacity }}
    >
      <defs>
        {/* Adire-inspired diamond-grid resist pattern */}
        <pattern
          id="adire-motif"
          x="0"
          y="0"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          {/* Outer diamond */}
          <polygon
            points="24,2 46,24 24,46 2,24"
            fill="none"
            stroke="#1A2421"
            strokeWidth="0.75"
          />
          {/* Inner diamond */}
          <polygon
            points="24,10 38,24 24,38 10,24"
            fill="none"
            stroke="#1A2421"
            strokeWidth="0.5"
          />
          {/* Cross lines */}
          <line x1="24" y1="2" x2="24" y2="46" stroke="#1A2421" strokeWidth="0.4" />
          <line x1="2" y1="24" x2="46" y2="24" stroke="#1A2421" strokeWidth="0.4" />
          {/* Corner accents */}
          <circle cx="24" cy="2" r="1.5" fill="#CA6143" fillOpacity="0.4" />
          <circle cx="46" cy="24" r="1.5" fill="#CA6143" fillOpacity="0.4" />
          <circle cx="24" cy="46" r="1.5" fill="#CA6143" fillOpacity="0.4" />
          <circle cx="2" cy="24" r="1.5" fill="#CA6143" fillOpacity="0.4" />
          {/* Centre dot */}
          <circle cx="24" cy="24" r="1.2" fill="#1A2421" fillOpacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#adire-motif)" />
    </svg>
  );
}