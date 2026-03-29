import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, WishlistItem } from '@/types/cart'

interface CartState {
  cartItems: CartItem[]
  wishlistItems: WishlistItem[]
}

const initialState: CartState = {
  cartItems: [],
  wishlistItems: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrateCart: (
      state,
      action: PayloadAction<Partial<Pick<CartState, 'cartItems' | 'wishlistItems'>>>
    ) => {
      if (action.payload.cartItems) state.cartItems = action.payload.cartItems
      if (action.payload.wishlistItems) state.wishlistItems = action.payload.wishlistItems
    },
    addToCart: (
      state,
      action: PayloadAction<{
        item: Omit<CartItem, 'quantity'>
        quantity?: number
        silent?: boolean
      }>
    ) => {
      const { item, quantity = 1 } = action.payload
      const existing = state.cartItems.find((i) => i.id === item.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        state.cartItems.push({ ...item, quantity })
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload
      if (quantity < 1) {
        state.cartItems = state.cartItems.filter((i) => i.id !== id)
        return
      }
      const item = state.cartItems.find((i) => i.id === id)
      if (item) item.quantity = quantity
    },
    clearCart: (state, _action: PayloadAction<{ silent?: boolean } | undefined>) => {
      state.cartItems = []
    },
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      if (state.wishlistItems.some((i) => i.id === action.payload.id)) return
      state.wishlistItems.push({
        ...action.payload,
        addedAt: action.payload.addedAt ?? Date.now(),
      })
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlistItems = state.wishlistItems.filter((i) => i.id !== action.payload)
    },
    moveWishlistToCart: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const item = state.wishlistItems.find((i) => i.id === id)
      if (!item) return
      state.wishlistItems = state.wishlistItems.filter((i) => i.id !== id)
      const existing = state.cartItems.find((i) => i.id === id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.cartItems.push({
          id: item.id,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
          image: item.image,
          quantity: 1,
        })
      }
    },
  },
})

export const {
  hydrateCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  addToWishlist,
  removeFromWishlist,
  moveWishlistToCart,
} = cartSlice.actions

export const cartReducer = cartSlice.reducer
