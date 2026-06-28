"use client";
// Horizontal auto-scrolling bento grid
// Desktop and mobile: single row, tiles scroll left
// All tiles are 4:5 (width:height) portrait ratio, just smaller on mobile

import { useRef, useState } from "react";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import GridTile from "@/components/ui/GridTile";
import Lightbox from "@/components/ui/Lightbox";
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
    type: "dress",
    src: "/images/dresses/look-02.png",
    alt: "Bespoke Ankara print pantsuit in vibrant multicolored geometric patterns, showcasing a masterfully tailored peplum jacket cinched with a custom teal satin sash, paired with perfectly fitted trousers.",
  },
  { id: "3", type: "quote", quote: "Worn by those who refuse to be unseen." },
  {
    id: "4",
    type: "dress",
    src: "/images/dresses/look-03.png",
    alt: "Artisanal teal and white patterned duster coat with crisp white contrast lapels and folded cuffs, draped elegantly over a custom-fitted white silk midi slip dress.",
  },
  {
    id: "5",
    type: "dress",
    src: "/images/dresses/look-04.png",
    alt: "Made-to-measure floor-length gown crafted from hand-dyed teal and white patterned fabric, detailed with a bold, structured white placket running down the center and matching statement cuffs",
  },
  {
    id: "6",
    type: "dress",
    src: "/images/dresses/look-05.png",
    alt: "Couture color-blocked midi dress featuring a solid black bodice panel juxtaposed with bespoke patchwork Ankara textiles, showcasing vividly contrasting geometric prints on the wide sleeves and tailored skirt.",
  },
  {
    id: "7",
    type: "motif",
    src: "/textures/African pattern.png",
    alt: "motif pattern",
  },
  {
    id: "8",
    type: "dress",
    src: "/images/dresses/look-06.png",
    alt: "Custom-fitted mixed-print Ankara dress boasting an asymmetrical neckline, masterfully paneled with a vivid pink and green abstract bodice and striking green botanical motif fabrics on the structured sleeves and pencil skirt",
  },
  { id: "9", type: "quote", quote: "Fashion for the Audacious" },
  {
    id: "10",
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

// Only dress tiles open the lightbox; this is the collection it browses
// through with next/prev, independent of the grid's mixed tile order and
// its duplicated [...TILES, ...TILES] scroll-loop array.
const DRESS_TILES = TILES.filter((t) => t.type === "dress");

function ScrollRow({
  direction,
  tileWidth,
  tileHeight,
  gap = 12,
  paused,
  onOpenDress,
}: {
  direction: "left" | "right";
  tileWidth: number;
  tileHeight: number;
  gap?: number;
  paused?: boolean;
  onOpenDress?: (id: string) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  useAutoScroll(rowRef as React.RefObject<HTMLElement>, 0.9, 2, direction, paused);

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
          <GridTile tile={tile} onOpen={onOpenDress} />
        </div>
      ))}
    </div>
  );
}

export default function Grid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isLightboxOpen = lightboxIndex !== null;

  const openLightbox = (id: string) => {
    const idx = DRESS_TILES.findIndex((t) => t.id === id);
    if (idx !== -1) setLightboxIndex(idx);
  };
  const closeLightbox = () => setLightboxIndex(null);
  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % DRESS_TILES.length));
  const showPrev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + DRESS_TILES.length) % DRESS_TILES.length,
    );

  return (
    <section className="py-4 overflow-hidden flex flex-col gap-3">
      {/* Desktop: single row scrolling left */}
      <div className="hidden md:block">
        <ScrollRow
          direction="left"
          tileWidth={DESKTOP_W}
          tileHeight={DESKTOP_H}
          paused={isLightboxOpen}
          onOpenDress={openLightbox}
        />
      </div>

      {/* Mobile: single row scrolling left, same direction as desktop */}
      <div className="md:hidden">
        <ScrollRow
          direction="left"
          tileWidth={MOBILE_W}
          tileHeight={MOBILE_H}
          paused={isLightboxOpen}
          onOpenDress={openLightbox}
        />
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          tile={DRESS_TILES[lightboxIndex]}
          index={lightboxIndex}
          total={DRESS_TILES.length}
          onClose={closeLightbox}
          onNext={showNext}
          onPrev={showPrev}
        />
      )}
    </section>
  );
}