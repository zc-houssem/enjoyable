'use client'

import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Filter, Grid3x3, LayoutGrid, TrendingUp } from 'lucide-react'
import { Product } from '@/payload-types'
import { ProductCard } from './ProductCard'
import { useAppHeader } from '@/contexts/AppHeaderContext'

export default function ProductExplore() {
  const { setIntro, setSideBlock, clear } = useAppHeader()
  React.useEffect(() => {
    setIntro?.('Explore Products', 'Discover our curated collection of premium fashion items')
    setSideBlock?.(
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
      </div>,
    )
    return () => {
      clear?.()
    }
  }, [])

  const observerTarget = React.useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = React.useState<'grid' | 'large'>('grid')

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
  React.useEffect(() => {
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
    <div className="flex flex-col flex-1 w-full overflow-hidden">
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
      <div className="flex flex-col flex-1 overflow-auto no-scrollbar">
        <div
          className={` w-full grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
        </div>
        {/* End message */}
        {!hasNextPage && products.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">You&apos;ve reached the end of our collection</p>
          </div>
        )}
      </div>
    </div>
  )
}
