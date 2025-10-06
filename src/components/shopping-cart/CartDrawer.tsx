'use client'

import React from 'react'
import Image from 'next/image'
import { X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface CartDrawerProps {
  className?: string
}

export const CartDrawer = ({ className }: CartDrawerProps) => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCartStore()

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * 0 || 0, 0)

  const handleClearCart = () => {
    clearCart()
    toast.info('Cart cleared')
  }

  if (cart.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center py-20 text-center text-muted-foreground',
          className,
        )}
      >
        <ShoppingCartIcon />
        <p className="mt-2 text-sm">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-4 p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Shopping Cart ({totalItems})</h2>
        <Button variant="ghost" size="sm" onClick={handleClearCart}>
          <Trash2 className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <Button className="w-full mt-4">Checkout</Button>
      </div>
    </div>
  )
}

interface CartItemProps {
  item: {
    id: number
    quantity: number
  }
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore()
  const [product, setProduct] = React.useState<any>(null)

  React.useEffect(() => {
    // fetch product info (price, title, image)
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${item.id}`)
        if (!res.ok) throw new Error('Failed to load product')
        const data = await res.json()
        setProduct(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchProduct()
  }, [item.id])

  if (!product) {
    return (
      <div className="flex items-center justify-between rounded-lg border p-3">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const handleRemove = () => {
    removeFromCart(item.id)
    toast.info(`${product.title} removed from cart`)
  }

  return (
    <div className="flex items-center justify-between rounded-lg border p-3 bg-card hover:shadow-sm transition-all">
      {/* Image + Info */}
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
          {product.image?.[0]?.url ? (
            <Image
              src={product.image[0].url}
              alt={product.title || 'product'}
              fill
              className="object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://picsum.photos/100?random=${product.id}`}
              alt="placeholder"
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold">{product.title}</p>
          <p className="text-xs text-muted-foreground">${product.price}</p>
        </div>
      </div>

      {/* Quantity & Remove */}
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => decreaseQuantity(item.id)}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-6 text-center">{item.quantity}</span>
        <Button size="icon" variant="ghost" onClick={() => increaseQuantity(item.id)}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleRemove}>
          <X className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  )
}

const ShoppingCartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-muted-foreground/50"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h11.1a1 1 0 00.9-.55L21 13M7 13l2.8 6h8.4M10 21a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"
    />
  </svg>
)
