'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Package,
  Layers,
  TrendingUp,
  ShoppingCart,
  Heart,
  Star,
  Plus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Media } from '@/payload-types'
import Image from 'next/image'

interface ProductDetailProps {
  className?: string
  id: string
}

export const ProductDetail = ({ className, id }: ProductDetailProps) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState('MD')

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await fetch(`/api/products/${id}`)
      if (!res.ok) throw new Error('Failed to fetch product')
      return res.json()
    },
  })

  if (isLoading) return <p>Loading product...</p>
  if (error) return <p className="text-red-500">Failed to load product.</p>
  if (!product) return <p>No product found</p>

  // ✅ Extract fields from payload
  const { title, description, price, stock, brand, category, features, image, seller } = product

  const productImages = image?.map((img: Media) => img.url) || []

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <div
      className={cn(
        'min-h-screen bg-background text-foreground flex flex-col flex-1 overflow-auto',
        className,
      )}
    >
      <main className="mx-auto max-w-[1600px] px-6 py-8">
        {/* Product Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                Seller: <span className="text-foreground">{seller?.email || 'Unknown'}</span>
              </span>
              <span>
                SKU: <span className="text-foreground">{id}</span>
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <span>Edit</span>
            </Button>
            <Button variant="destructive" size="icon">
              🗑
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              {productImages[currentImage] ? (
                <Image
                  src={productImages[currentImage]}
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
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    currentImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-border'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-lg bg-card p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Price</span>
                </div>
                <div className="text-2xl font-bold">${price}</div>
              </div>
              <div className="rounded-lg bg-card p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <Layers className="h-4 w-4" />
                  <span className="text-sm">Available Stocks</span>
                </div>
                <div className="text-2xl font-bold">{stock}</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-3 text-lg font-semibold">Description:</h2>
              <div
                className="text-sm leading-relaxed text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>

            {/* Features */}
            {features?.length > 0 && (
              <div>
                <h2 className="mb-3 text-lg font-semibold">Key Features:</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {features.map((f: any, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-foreground" />
                      <span>{f.feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Heart className="h-4 w-4" />
                Wishlist
              </Button>
            </div>

            {/* Specs */}
            <div className="rounded-lg bg-card p-4">
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-3">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <span className="text-sm font-medium">{category?.label || 'Uncategorized'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Brand</span>
                  <span className="text-sm font-medium">{brand}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
