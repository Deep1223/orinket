import { Product } from '@/data/dummyProducts'

export interface FilterState {
  categories: string[]
  priceRange: { min: number; max: number } | null
  materials: string[]
  platings: string[]
  rating: number | null
  inStock: boolean
}

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter(product => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false
    }

    // Price range filter
    if (filters.priceRange) {
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false
      }
    }

    // Material filter
    if (filters.materials.length > 0 && (!product.material || !filters.materials.includes(product.material))) {
      return false
    }

    // Plating filter
    if (filters.platings.length > 0 && (!product.plating || !filters.platings.includes(product.plating))) {
      return false
    }

    // Rating filter
    if (filters.rating !== null && (!product.rating || product.rating < filters.rating)) {
      return false
    }

    // Stock filter
    if (filters.inStock && !product.inStock) {
      return false
    }

    return true
  })
}

export function getFilterOptions(products: Product[]) {
  const categories = [...new Set(products.map(p => p.category))]
  const materials = [...new Set(products.map(p => p.material).filter((m): m is string => Boolean(m)))]
  const platings = [...new Set(products.map(p => p.plating).filter((p): p is string => Boolean(p)))]
  const ratings = [4, 3, 2, 1] // Common rating thresholds
  
  const priceRanges = [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1,000', min: 500, max: 1000 },
    { label: '₹1,000 - ₹2,000', min: 1000, max: 2000 },
    { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: 'Over ₹10,000', min: 10000, max: Infinity },
  ]

  return {
    categories,
    materials,
    platings,
    ratings,
    priceRanges,
  }
}
