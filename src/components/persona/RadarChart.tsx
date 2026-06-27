"use client";

// RadarChart.tsx — five-trait SVG radar chart, brand colours

import type { Trait } from "./data";

type RadarChartProps = {
  traits: Trait[];
  size?: number;
};

const AXES = 5;
const CENTER_X = 100;
const CENTER_Y = 100;
const RADIUS = 75;

// Compute point on a regular polygon axis
function axisPoint(index: number, total: number, r: number) {
  // Start at top (−π/2), go clockwise
  const angle = (2 * Math.PI * index) / total - Math.PI / 2;
  return {
    x: CENTER_X + r * Math.cos(angle),
    y: CENTER_Y + r * Math.sin(angle),
  };
}

function toPoints(values: number[]): string {
  return values
    .map((v, i) => {
      const r = (v / 100) * RADIUS;
      const p = axisPoint(i, values.length, r);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}

export default function RadarChart({ traits, size = 200 }: RadarChartProps) {
  // Pad or trim to exactly AXES traits
  const padded = Array.from({ length: AXES }, (_, i) => traits[i]?.value ?? 0);
  const labels = Array.from({ length: AXES }, (_, i) => traits[i]?.label ?? "");

  // Grid rings at 25 / 50 / 75 / 100
  const rings = [25, 50, 75, 100];

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      className="overflow-visible"
    >
      {/* Grid rings */}
      {rings.map((r) => {
        const pts = Array.from({ length: AXES }, (_, i) =>
          axisPoint(i, AXES, (r / 100) * RADIUS)
        );
        const d =
          pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
        return (
          <path
            key={r}
            d={d}
            fill="none"
            stroke="#E5D3B3"
            strokeOpacity={r === 100 ? 0.15 : 0.07}
            strokeWidth={r === 100 ? 0.75 : 0.5}
          />
        );
      })}

      {/* Axis spokes */}
      {Array.from({ length: AXES }, (_, i) => {
        const tip = axisPoint(i, AXES, RADIUS);
        return (
          <line
            key={i}
            x1={CENTER_X}
            y1={CENTER_Y}
            x2={tip.x}
            y2={tip.y}
            stroke="#E5D3B3"
            strokeOpacity={0.1}
            strokeWidth={0.5}
          />
        );
      })}

      {/* Data polygon — fill */}
      <polygon
        points={toPoints(padded)}
        fill="#CA6143"
        fillOpacity={0.12}
        stroke="none"
      />

      {/* Data polygon — stroke */}
      <polygon
        points={toPoints(padded)}
        fill="none"
        stroke="#CA6143"
        strokeOpacity={0.7}
        strokeWidth={1}
      />

      {/* Data point dots */}
      {padded.map((v, i) => {
        const r = (v / 100) * RADIUS;
        const p = axisPoint(i, AXES, r);
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={2}
            fill="#CA6143"
            fillOpacity={0.9}
          />
        );
      })}

      {/* Axis labels */}
      {labels.map((label, i) => {
        const tip = axisPoint(i, AXES, RADIUS + 14);
        // Nudge alignment based on position
        const anchor =
          tip.x < CENTER_X - 5
            ? "end"
            : tip.x > CENTER_X + 5
            ? "start"
            : "middle";
        return (
          <text
            key={i}
            x={tip.x}
            y={tip.y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize={7}
            fontFamily="var(--font-inter, sans-serif)"
            letterSpacing="0.08em"
            fill="#E5D3B3"
            fillOpacity={0.45}
          >
            {label.toUpperCase()}
          </text>
        );
      })}

      {/* Centre dot */}
      <circle cx={CENTER_X} cy={CENTER_Y} r={1.5} fill="#E5D3B3" fillOpacity={0.2} />
    </svg>
  );
}