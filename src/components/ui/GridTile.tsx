import Image from 'next/image'
import { GridTile as GridTileType } from '@/types'

export default function GridTile({ tile }: { tile: GridTileType }) {
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

  return (
    <div className="relative h-full w-full overflow-hidden group">
      {tile.src && (
        <Image
          src={tile.src}
          alt={tile.alt || ''}
          fill
          sizes="(max-width: 768px) 50vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  )
}