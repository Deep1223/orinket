/** Catalog product shape used across storefront, cart, and API mappers. */
export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  /** Product Master: included in /promo?offer=bogo listing */
  buyOneGetOneFree?: boolean
  /** Product Master: include product in 925 SILVER POST section */
  showIn925SilverPost?: boolean
  /** Product Master: Orinket homepage section keys (merchandising) */
  storefrontHomeSectionKeys?: string[]
  /** Product Master → Occasion Master (multi-select) */
  occasionIds?: string[]
  /** Denormalized occasion names (same order as ids when present) */
  occasions?: string[]
  categoryId?: string
  category: string
  categoryName?: string
  isDefaultCategory?: boolean
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
  gender?: 'Man' | 'Woman' | 'Both'
  videoUrl?: string
  view360Images?: string[]
  details: string[]
}
