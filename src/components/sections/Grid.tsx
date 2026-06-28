"use client";
// Horizontal auto-scrolling bento grid
// Desktop and mobile: single row, tiles scroll left
// All tiles are 4:5 (width:height) portrait ratio, just smaller on mobile

import { useRef } from "react";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import GridTile from "@/components/ui/GridTile";
import type { GridTile as GridTileType } from "@/types";

const TILES: GridTileType[] = [
  // TODO: replace src values with your real dress shots
  {
    id: "1",
    type: "dress",
    src: "/images/dresses/look-01.png",
    alt: "Custom-tailored two-piece ensemble in a black and white diamond weave, featuring a sculptural peplum top accented with bespoke metallic gold ruffles at the cuffs and waist, finished with a precision-cut pencil skirt",
  },
  {
    id: "2",
    type: "fabric",
    src: "/images/fabrics/ankara-01.jpg",
    alt: "Close-up of bespoke, hand-loomed Aso Oke textile showcasing intricate artisanal weave and rich, tactile depth",
  },
  {
    id: "3",
    type: "dress",
    src: "/images/dresses/look-02.png",
    alt: "Bespoke Ankara print pantsuit in vibrant multicolored geometric patterns, showcasing a masterfully tailored peplum jacket cinched with a custom teal satin sash, paired with perfectly fitted trousers.",
  },
  { id: "4", type: "quote", quote: "Worn by those who refuse to be unseen." },
  {
    id: "5",
    type: "dress",
    src: "/images/dresses/look-03.png",
    alt: "Artisanal teal and white patterned duster coat with crisp white contrast lapels and folded cuffs, draped elegantly over a custom-fitted white silk midi slip dress.",
  },
  {
    id: "6",
    type: "fabric",
    src: "/images/fabrics/ankara-02.jpg",
    alt: "Premium Ankara wax print fabric featuring custom vibrant motifs and a high-quality, densely woven cotton finish",
  },
  {
    id: "7",
    type: "dress",
    src: "/images/dresses/look-04.png",
    alt: "Made-to-measure floor-length gown crafted from hand-dyed teal and white patterned fabric, detailed with a bold, structured white placket running down the center and matching statement cuffs",
  },
  {
    id: "8",
    type: "motif",
    src: "/textures/African pattern.png",
    alt: "motif pattern",
  },
  {
    id: "9",
    type: "dress",
    src: "/images/dresses/look-05.png",
    alt: "Couture color-blocked midi dress featuring a solid black bodice panel juxtaposed with bespoke patchwork Ankara textiles, showcasing vividly contrasting geometric prints on the wide sleeves and tailored skirt.",
  },
  {
    id: "10",
    type: "fabric",
    src: "/images/fabrics/ankara-03.png",
    alt: "Authentic hand-dyed Ankara fabric displaying bespoke, rich color variations and precise traditional wax-resist patterns",
  },
  {
    id: "11",
    type: "dress",
    src: "/images/dresses/look-06.png",
    alt: "Custom-fitted mixed-print Ankara dress boasting an asymmetrical neckline, masterfully paneled with a vivid pink and green abstract bodice and striking green botanical motif fabrics on the structured sleeves and pencil skirt",
  },
  {
    id: "12",
    type: "fabric",
    src: "/images/fabrics/ankara-04.jpg",
    alt: "Artisanal hand-dyed Ankara textile highlighting custom, complex motifs and striking pigment saturation",
  },
  {
    id: "13",
    type: "dress",
    src: "/images/dresses/look-07.png",
    alt: "Tailored bespoke ensemble featuring a structured, jewel-toned geometric Ankara peplum vest secured with a prominent navy blue bow, layered flawlessly over a made-to-measure navy blue top and crisp trousers",
  },
];

// 4:5 (width:height) portrait tile dimensions
// Desktop: 320px wide × 400px tall
// Mobile:  160px wide × 200px tall
const DESKTOP_W = 320;
const DESKTOP_H = 400;
const MOBILE_W = 160;
const MOBILE_H = 200;

function ScrollRow({
  direction,
  tileWidth,
  tileHeight,
  gap = 12,
}: {
  direction: "left" | "right";
  tileWidth: number;
  tileHeight: number;
  gap?: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  useAutoScroll(rowRef as React.RefObject<HTMLElement>, 0.9, 2, direction);

  return (
    <div
      ref={rowRef}
      className="flex overflow-x-scroll scrollbar-none"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        gap: `${gap}px`,
      }}
    >
      {[...TILES, ...TILES].map((tile, i) => (
        <div
          key={`${tile.id}-${i}`}
          className="flex-shrink-0 relative"
          style={{ width: tileWidth, height: tileHeight }}
        >
          <GridTile tile={tile} />
        </div>
      ))}
    </div>
  );
}

export default function Grid() {
  return (
    <section className="py-4 overflow-hidden flex flex-col gap-3">
      {/* Desktop: single row scrolling left */}
      <div className="hidden md:block">
        <ScrollRow
          direction="left"
          tileWidth={DESKTOP_W}
          tileHeight={DESKTOP_H}
        />
      </div>

      {/* Mobile: single row scrolling left, same direction as desktop */}
      <div className="md:hidden">
        <ScrollRow
          direction="left"
          tileWidth={MOBILE_W}
          tileHeight={MOBILE_H}
        />
      </div>
    </section>
  );
}