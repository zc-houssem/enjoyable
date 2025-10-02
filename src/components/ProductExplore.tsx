'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Heart, Filter, Grid3x3, LayoutGrid, TrendingUp } from 'lucide-react'
import { Product } from '@/payload-types'
import Image from 'next/image'

export default function ProductExplore() {
  const router = useRouter()
  const observerTarget = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid')

  // Infinite query with React Query
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/products?page=${pageParam}&limit=12`)
      return res.json() as Promise<{ docs: Product[] }>
    },
    getNextPageParam: (lastPage: { docs: Product[] }, pages) => {
      return lastPage.docs.length < 12 ? undefined : pages.length + 1
    },
    initialPageParam: 1,
  })

  const products = data?.pages.flatMap((page) => page.docs) || []

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )
    const target = observerTarget.current
    if (target) observer.observe(target)
    return () => {
      if (target) observer.unobserve(target)
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-[1600px] px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Explore Products</h1>
            <p className="mt-2 text-muted-foreground">
              Discover our curated collection of premium fashion items
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <div className="flex rounded-lg border border-border bg-card">
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === 'large' ? 'bg-secondary' : ''}
                onClick={() => setViewMode('large')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === 'grid' ? 'bg-secondary' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="my-6 flex items-center gap-6 rounded-lg bg-card p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm">
              <span className="font-semibold">{products.length}</span> products found
            </span>
          </div>
        </div>

        {/* Product Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {products.map((product: Product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-foreground/20 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.discount && (
                  <div className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                    -{product.discount}%
                  </div>
                )}
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
          ))}
        </div>

        {/* Loading */}
        {isFetchingNextPage && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-3 rounded-lg bg-card px-6 py-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
              <span className="text-sm text-muted-foreground">Loading more products...</span>
            </div>
          </div>
        )}

        {/* Intersection observer target */}
        <div ref={observerTarget} className="h-10" />

        {/* End message */}
        {!hasNextPage && products.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">You&apos;ve reached the end of our collection</p>
          </div>
        )}
      </main>
    </div>
  )
}
