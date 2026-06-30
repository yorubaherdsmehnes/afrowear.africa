import Image from 'next/image'
import { GridTile as GridTileType } from '@/types'
import { trackClick } from '@/lib/analytics'

export default function GridTile({
  tile,
  onOpen,
}: {
  tile: GridTileType
  onOpen?: (id: string) => void
}) {
  if (tile.type === 'quote') {
    return (
      <div className="h-full w-full bg-terracotta/20 flex items-center justify-center p-8">
        <p className="font-serif text-lg text-sand italic text-center">{tile.quote}</p>
      </div>
    )
  }

  if (tile.type === 'motif') {
    if (tile.src) {
      return (
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={tile.src}
            alt={tile.alt || ''}
            fill
            sizes="(max-width: 768px) 50vw, 320px"
            className="object-cover object-top"
          />
        </div>
      )
    }
    return <div className="h-full w-full bg-forest border border-sand/10" aria-hidden />
  }

  if (tile.type === 'dress') {
    return (
      <button
        type="button"
        onClick={() => {
          trackClick(tile.alt || `Tile ${tile.id}`, 'Grid')
          tile.src && onOpen?.(tile.id)
        }}
        aria-label={tile.alt ? `View full image — ${tile.alt}` : 'View full image'}
        className="relative h-full w-full overflow-hidden group block text-left cursor-pointer"
      >
        {tile.src && (
          <Image
            src={tile.src}
            alt={tile.alt || ''}
            fill
            sizes="(max-width: 768px) 50vw, 320px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </button>
    )
  }

  // fabric swatches — same visual treatment as dress tiles, but not clickable
  return (
    <div className="relative h-full w-full overflow-hidden">
      {tile.src && (
        <Image
          src={tile.src}
          alt={tile.alt || ''}
          fill
          sizes="(max-width: 768px) 50vw, 320px"
          className="object-cover"
        />
      )}
    </div>
  )
}