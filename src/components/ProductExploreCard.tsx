import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Media, Product } from '@/payload-types'
import { Heart } from 'lucide-react'

interface ProductExploreCardProps {
  className?: string
  product: Product
}

export const ProductExploreCard = ({ className, product }: ProductExploreCardProps) => {
  const router = useRouter()
  const url = React.useMemo(() => (product.image as Media[])?.[0]?.url, [product])

  return (
    <div
      key={product.id}
      className={cn(
        'group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-foreground/20 hover:shadow-lg cursor-pointer',
        className,
      )}
      onClick={() => router.push(`/product/${product.id}`)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {url ? (
          <Image
            src={url}
            alt={product.title || 'placeholder'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://picsum.photos/200?random=${product.id}`}
            alt="placeholder"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {product.discount ? (
          <div className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            -{product.discount}%
          </div>
        ) : null}
        <button className="absolute right-3 top-3 rounded-full bg-background/80 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <h3 className="mt-1 line-clamp-2 font-semibold leading-tight">{product.title}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-bold">${product.price}</span>
          {product.discount && product.discount > 0 && product.price ? (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price + product.discount}
            </span>
          ) : null}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              (product?.stock ?? 0) > 0 ? 'bg-green-500' : 'bg-red-500'
            }`}
          />

          <span className="text-xs text-muted-foreground">
            {(product?.stock ?? 0) > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  )
}
