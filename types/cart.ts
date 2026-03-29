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
