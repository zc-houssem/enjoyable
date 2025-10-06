'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Media, Product } from '@/payload-types'
import { Heart, Plus, ShoppingBasket, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'
import { toast } from 'sonner'

interface ProductCardProps {
  className?: string
  product: Product
}

export const ProductCard = ({ className, product }: ProductCardProps) => {
  const router = useRouter()
  const url = React.useMemo(() => (product.image as Media[])?.[0]?.url, [product])
  const cartStore = useCartStore()

  const inWishlist = cartStore.wishlist.includes(product.id)
  const inCart = cartStore.cart.find((item) => item.id === product.id)

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    cartStore.addToCart(product.id)
    toast.success(`${product.title} added to cart`)
  }

  const handleAddToWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (inWishlist) {
      toast.info(`${product.title} already in wishlist`)
      return
    }
    cartStore.addToWishlist(product.id)
    toast.success(`${product.title} added to wishlist`)
  }

  const handleRemoveFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    cartStore.removeFromCart(product.id)
    toast.success(`${product.title} removed from cart`)
  }

  const handleRemoveFromWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    cartStore.removeFromWishlist(product.id)
    toast.success(`${product.title} removed from wishlist`)
  }

  return (
    <div
      key={product.id}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-foreground/20 hover:shadow-lg',
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
            src={`https://picsum.photos/400?random=${product.id}`}
            alt="placeholder"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* Discount badge */}
        {product.discount ? (
          <div className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            -{product.discount}%
          </div>
        ) : null}

        {/* Wishlist button */}
        <button
          className={cn(
            'absolute right-3 top-3 rounded-full bg-background/80 p-2 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:scale-110',
            inWishlist && 'text-red-600',
          )}
          onClick={inWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-colors',
              inWishlist ? 'fill-red-600 text-red-600' : 'hover:fill-red-600 hover:text-red-600',
            )}
          />
        </button>

        {/* Add to cart button */}
        <button
          className="absolute right-12 top-3 rounded-full bg-background/80 p-2 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:scale-110"
          onClick={inCart ? handleRemoveFromCart : handleAddToCart}
        >
          <ShoppingBasket
            className={cn(
              'h-4 w-4 transition-colors',
              inCart ? 'text-blue-500' : 'hover:fill-blue-300 hover:text-blue-300',
            )}
          />
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
              ${(product.price + product.discount).toFixed(2)}
            </span>
          ) : null}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div
            className={cn(
              'h-2 w-2 rounded-full',
              (product?.stock ?? 0) > 0 ? 'bg-green-500' : 'bg-red-500',
            )}
          />
          <span className="text-xs text-muted-foreground">
            {(product?.stock ?? 0) > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  )
}
