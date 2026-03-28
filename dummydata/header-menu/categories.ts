export interface Category {
  name: string
  href: string
}

export const categories: Category[] = [
  { name: "NEW ARRIVALS", href: "/category/new-arrivals" },
  { name: "NECKLACES", href: "/category/necklaces" },
  { name: "EARRINGS", href: "/category/earrings" },
  { name: "BRACELETS", href: "/category/bracelets" },
  { name: "RINGS", href: "/category/rings" },
  { name: "MEN", href: "/category/men" },
  { name: "9KT GOLD", href: "/category/9kt-gold" },
  { name: "GIFTS", href: "/category/gifts" },
]

export const searchTags = ["New Arrivals", "Necklaces", "Earrings", "Rings", "9KT Gold"]
