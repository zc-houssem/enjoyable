'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Search,
  Bell,
  Moon,
  Settings,
  Menu,
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

const productImages = [
  '/black-sweatpants-with-white-drawstrings.jpg',
  '/gray-hoodie-front-view.jpg',
  '/black-t-shirt-with-mountain-graphic.jpg',
  '/red-baseball-cap.png',
]

const colors = [
  { name: 'Green', value: '#10b981' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#a855f7' },
]

const sizes = ['SM', 'MD', 'LG', 'XL', 'XXL']

const reviews = [
  {
    id: 1,
    author: 'Mark P.',
    avatar: '/male-avatar.png',
    rating: 3.2,
    date: '5 days ago',
    title: 'Decent but could be better',
    content:
      "The product is okay, but I expected more for the price. A few minor flaws, but overall, it's acceptable.",
  },
]

export default function ProductDetail() {
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(colors[2].name)
  const [selectedSize, setSelectedSize] = useState('MD')

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-[1600px] px-6 py-8">
        {/* Product Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Acme Prism T-Shirt</h1>
            <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                Seller: <span className="text-foreground">Poetic Fashion</span>
              </span>
              <span>
                Published: <span className="text-foreground">20 Oct, 2024</span>
              </span>
              <span>
                SKU: <span className="text-foreground">WH000XM4</span>
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <span>Edit</span>
            </Button>
            <Button variant="destructive" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={productImages[currentImage] || '/placeholder.svg'}
                alt="Product"
                className="h-full w-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm transition hover:bg-background"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm transition hover:bg-background"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition ${
                    currentImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-border'
                  }`}
                >
                  <img
                    src={image || '/placeholder.svg'}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-lg bg-card p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Price</span>
                </div>
                <div className="text-2xl font-bold">${'120.40'}</div>
              </div>
              <div className="rounded-lg bg-card p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span className="text-sm">No. of Orders</span>
                </div>
                <div className="text-2xl font-bold">250</div>
              </div>
              <div className="rounded-lg bg-card p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <Layers className="h-4 w-4" />
                  <span className="text-sm">Available Stocks</span>
                </div>
                <div className="text-2xl font-bold">2,550</div>
              </div>
              <div className="rounded-lg bg-card p-4">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">Total Revenue</span>
                </div>
                <div className="text-2xl font-bold">${'45,938'}</div>
              </div>
            </div>

            {/* Product Details */}
            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h2 className="mb-3 text-lg font-semibold">Description:</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Tommy Hilfiger men striped pink sweatshirt. Crafted with cotton. Material
                    composition is 100% organic cotton.
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h2 className="mb-3 text-lg font-semibold">Key Features:</h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-foreground" />
                      <span>Industry-leading noise cancellation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-foreground" />
                      <span>30-hour battery life</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-foreground" />
                      <span>Touch sensor controls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-foreground" />
                      <span>Speak-to-chat technology</span>
                    </li>
                  </ul>
                </div>

                {/* Colors */}
                <div>
                  <h2 className="mb-3 text-lg font-semibold">Colors:</h2>
                  <div className="flex gap-3">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`h-10 w-10 rounded-full border-2 transition ${
                          selectedColor === color.name ? 'border-foreground' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color.value }}
                        aria-label={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h2 className="mb-3 text-lg font-semibold">Sizes:</h2>
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                          selectedSize === size
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border bg-transparent text-foreground hover:border-foreground'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
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
              </div>

              {/* Product Specs Table */}
              <div className="rounded-lg bg-card p-4">
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <span className="text-sm font-medium">T-Shirt</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Brand</span>
                    <span className="text-sm font-medium">Tommy Hilfiger</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-3">
                    <span className="text-sm text-muted-foreground">Color</span>
                    <span className="text-sm font-medium">Purple</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Weight</span>
                    <span className="text-sm font-medium">140 Gr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="rounded-lg bg-card p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Reviews</h2>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Plus className="h-4 w-4" />
                  Submit Review
                </Button>
              </div>

              {/* Rating Summary */}
              <div className="mb-6 flex items-center gap-8">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      ))}
                      {[4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-muted" />
                      ))}
                    </div>
                    <span className="text-lg font-semibold">4.3</span>
                    <span className="text-sm text-muted-foreground">(12 reviews)</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-16 text-sm text-muted-foreground">5 stars</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full w-[70%] bg-yellow-500" />
                    </div>
                    <span className="w-12 text-right text-sm text-muted-foreground">70%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-16 text-sm text-muted-foreground">4 stars</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full w-[17%] bg-yellow-500" />
                    </div>
                    <span className="w-12 text-right text-sm text-muted-foreground">17%</span>
                  </div>
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-t border-border pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.avatar || '/placeholder.svg'} />
                          <AvatarFallback>{review.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{review.author}</span>
                            <div className="flex items-center gap-1 rounded bg-secondary px-2 py-0.5">
                              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                              <span className="text-xs font-medium">{review.rating}</span>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-[52px] mt-2">
                      <h4 className="font-semibold">{review.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{review.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
