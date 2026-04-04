/** Catalog product shape used across storefront, cart, and API mappers. */
export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  /** Product Master: included in /promo?offer=bogo listing */
  buyOneGetOneFree?: boolean
  /** Product Master: Orinket homepage section keys (merchandising) */
  storefrontHomeSectionKeys?: string[]
  categoryId?: string
  category: string
  subcategory?: string
  image: string
  images?: string[]
  description: string
  inStock: boolean
  /** Units customers can still buy (from Product Master “Available qty”). */
  stockLeft?: number
  isNew?: boolean
  isBestseller?: boolean
  rating?: number
  reviews?: number
  material?: string
  plating?: string
  dimensions?: string
  weight?: string
  videoUrl?: string
  view360Images?: string[]
  details: string[]
}
