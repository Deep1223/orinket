"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  variant?: string
}

export interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  /** Unix ms when saved; optional for older saved wishlists. */
  addedAt?: number
}

interface CartContextType {
  cartItems: CartItem[]
  wishlistItems: WishlistItem[]
  addToCart: (
    item: Omit<CartItem, "quantity">,
    quantity?: number,
    options?: { silent?: boolean }
  ) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: (options?: { silent?: boolean }) => void
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  /** Add to cart and remove from wishlist in one step. */
  moveWishlistToCart: (id: string) => void
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedCart = localStorage.getItem("orinket-cart")
    const savedWishlist = localStorage.getItem("orinket-wishlist")
    if (savedCart) setCartItems(JSON.parse(savedCart))
    if (savedWishlist) {
      const parsed = JSON.parse(savedWishlist) as WishlistItem[]
      const migrated = parsed.map((item, i) => ({
        ...item,
        addedAt:
          item.addedAt ??
          Date.now() - (parsed.length - 1 - i) * 3600000,
      }))
      setWishlistItems(migrated)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("orinket-cart", JSON.stringify(cartItems))
    }
  }, [cartItems, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("orinket-wishlist", JSON.stringify(wishlistItems))
    }
  }, [wishlistItems, mounted])

  const addToCart = (
    item: Omit<CartItem, "quantity">,
    quantity = 1,
    _options?: { silent?: boolean }
  ) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { ...item, quantity }]
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = (_options?: { silent?: boolean }) => {
    setCartItems([])
  }

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev
      return [...prev, { ...item, addedAt: item.addedAt ?? Date.now() }]
    })
  }

  const moveWishlistToCart = (id: string) => {
    let removed: WishlistItem | undefined
    setWishlistItems((prev) => {
      const item = prev.find((i) => i.id === id)
      if (!item) return prev
      removed = item
      return prev.filter((i) => i.id !== id)
    })
    if (!removed) return
    addToCart(
      {
        id: removed.id,
        name: removed.name,
        price: removed.price,
        originalPrice: removed.originalPrice,
        image: removed.image,
      },
      1,
      { silent: true }
    )
  }

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  const isInWishlist = (id: string) => wishlistItems.some((item) => item.id === id)

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        moveWishlistToCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
