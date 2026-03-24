export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  description: string
  details: string[]
  material: string
  isNew?: boolean
  isBestseller?: boolean
  discount?: number
  rating: number
  reviews: number
}

export const products: Product[] = [
  {
    id: "1",
    name: "Eternal Love Heart Bracelet",
    price: 1299,
    originalPrice: 1899,
    image: "/images/product-bracelet-1.jpg",
    images: ["/images/product-bracelet-1.jpg", "/images/product-bracelet-2.jpg"],
    category: "bracelets",
    description: "A delicate heart-shaped bracelet that symbolizes eternal love. Perfect for everyday wear or special occasions.",
    details: ["18K thick gold plated", "Hypoallergenic", "Adjustable chain", "Tarnish resistant"],
    material: "18K Gold Plated Brass",
    isNew: true,
    discount: 32,
    rating: 4.8,
    reviews: 245
  },
  {
    id: "2",
    name: "Crystal Bangle Bracelet",
    price: 1499,
    originalPrice: 2199,
    image: "/images/product-bracelet-2.jpg",
    images: ["/images/product-bracelet-2.jpg", "/images/product-bracelet-1.jpg"],
    category: "bracelets",
    description: "Elegant crystal bangle that adds sparkle to any outfit. Features premium crystals set in gold-plated brass.",
    details: ["18K thick gold plated", "Premium crystals", "One size fits most", "Durable finish"],
    material: "18K Gold Plated Brass with Crystals",
    isBestseller: true,
    discount: 32,
    rating: 4.9,
    reviews: 312
  },
  {
    id: "3",
    name: "Solitaire Pendant Necklace",
    price: 1199,
    originalPrice: 1799,
    image: "/images/product-necklace-1.jpg",
    images: ["/images/product-necklace-1.jpg", "/images/product-necklace-2.jpg"],
    category: "necklaces",
    description: "A timeless solitaire pendant that catches the light beautifully. The perfect everyday accessory.",
    details: ["18K thick gold plated", "Adjustable chain length", "Lobster clasp closure", "Gift ready packaging"],
    material: "18K Gold Plated Sterling Silver",
    isNew: true,
    discount: 33,
    rating: 4.7,
    reviews: 189
  },
  {
    id: "4",
    name: "Emerald Drop Pendant",
    price: 1599,
    originalPrice: 2299,
    image: "/images/product-necklace-2.jpg",
    images: ["/images/product-necklace-2.jpg", "/images/product-necklace-1.jpg"],
    category: "necklaces",
    description: "Stunning emerald-colored stone pendant that makes a statement. Perfect for special occasions.",
    details: ["18K thick gold plated", "Lab-created emerald stone", "16-18 inch chain", "Secure clasp"],
    material: "18K Gold Plated Brass with Lab Emerald",
    isBestseller: true,
    discount: 30,
    rating: 4.9,
    reviews: 278
  },
  {
    id: "5",
    name: "Diamond Hoop Earrings",
    price: 999,
    originalPrice: 1499,
    image: "/images/product-earrings-1.jpg",
    images: ["/images/product-earrings-1.jpg", "/images/product-earrings-2.jpg"],
    category: "earrings",
    description: "Classic hoop earrings adorned with sparkling stones. A versatile piece for any wardrobe.",
    details: ["18K thick gold plated", "Lightweight design", "Secure click closure", "Hypoallergenic posts"],
    material: "18K Gold Plated Brass",
    discount: 33,
    rating: 4.6,
    reviews: 156
  },
  {
    id: "6",
    name: "Gold Ball Studs",
    price: 599,
    originalPrice: 899,
    image: "/images/product-earrings-2.jpg",
    images: ["/images/product-earrings-2.jpg", "/images/product-earrings-1.jpg"],
    category: "earrings",
    description: "Simple yet elegant gold ball studs. Perfect for everyday wear or layering with other earrings.",
    details: ["18K thick gold plated", "Push back closure", "Lightweight", "Nickel-free"],
    material: "18K Gold Plated Sterling Silver",
    isNew: true,
    discount: 33,
    rating: 4.8,
    reviews: 423
  },
  {
    id: "7",
    name: "Solitaire Crystal Ring",
    price: 899,
    originalPrice: 1299,
    image: "/images/product-ring-1.jpg",
    images: ["/images/product-ring-1.jpg", "/images/product-ring-2.jpg"],
    category: "rings",
    description: "A stunning solitaire ring featuring a brilliant crystal stone. Makes every day special.",
    details: ["18K thick gold plated", "Premium crystal", "Available in multiple sizes", "Comfort fit"],
    material: "18K Gold Plated Brass with Crystal",
    isBestseller: true,
    discount: 31,
    rating: 4.7,
    reviews: 267
  },
  {
    id: "8",
    name: "Twisted Band Ring",
    price: 799,
    originalPrice: 1199,
    image: "/images/product-ring-2.jpg",
    images: ["/images/product-ring-2.jpg", "/images/product-ring-1.jpg"],
    category: "rings",
    description: "Beautiful twisted band ring with stone accents. A modern classic for your collection.",
    details: ["18K thick gold plated", "Twisted design", "Multiple sizes available", "Stackable"],
    material: "18K Gold Plated Brass",
    discount: 33,
    rating: 4.5,
    reviews: 134
  },
  {
    id: "9",
    name: "Rope Chain for Men",
    price: 1899,
    originalPrice: 2699,
    image: "/images/product-mens-1.jpg",
    images: ["/images/product-mens-1.jpg"],
    category: "men",
    description: "Bold rope chain designed for the modern man. Makes a strong style statement.",
    details: ["18K thick gold plated", "5mm width", "20 inch length", "Lobster clasp"],
    material: "18K Gold Plated Stainless Steel",
    isNew: true,
    discount: 30,
    rating: 4.8,
    reviews: 89
  },
  {
    id: "10",
    name: "Modern Mangalsutra Ring",
    price: 1399,
    originalPrice: 1999,
    image: "/images/product-mangalsutra.jpg",
    images: ["/images/product-mangalsutra.jpg"],
    category: "mangalsutra",
    description: "A contemporary take on the traditional mangalsutra, designed as an elegant ring.",
    details: ["Sterling silver", "Black beads", "Adjustable size", "Modern design"],
    material: "Sterling Silver with Black Onyx",
    isBestseller: true,
    discount: 30,
    rating: 4.9,
    reviews: 567
  },
  {
    id: "11",
    name: "9KT Gold Diamond Studs",
    price: 8999,
    originalPrice: 12999,
    image: "/images/fine-gold-1.jpg",
    images: ["/images/fine-gold-1.jpg", "/images/fine-gold-2.jpg", "/images/fine-gold-3.jpg"],
    category: "9kt-gold",
    description: "Luxurious 9KT solid gold studs with lab-grown diamonds. Ultimate everyday elegance.",
    details: ["9KT solid gold", "Lab-grown diamonds", "Secure screw back", "BIS hallmarked"],
    material: "9KT Solid Gold with Lab Diamonds",
    isNew: true,
    discount: 31,
    rating: 5.0,
    reviews: 78
  },
  {
    id: "12",
    name: "9KT Gold Tennis Bracelet",
    price: 15999,
    originalPrice: 22999,
    image: "/images/fine-gold-2.jpg",
    images: ["/images/fine-gold-2.jpg", "/images/fine-gold-1.jpg"],
    category: "9kt-gold",
    description: "Stunning tennis bracelet in 9KT solid gold with lab-grown diamonds throughout.",
    details: ["9KT solid gold", "Lab-grown diamonds", "Secure clasp", "BIS hallmarked"],
    material: "9KT Solid Gold with Lab Diamonds",
    isBestseller: true,
    discount: 30,
    rating: 4.9,
    reviews: 45
  },
  {
    id: "13",
    name: "9KT Gold Pendant Necklace",
    price: 11999,
    originalPrice: 16999,
    image: "/images/fine-gold-3.jpg",
    images: ["/images/fine-gold-3.jpg", "/images/fine-gold-1.jpg"],
    category: "9kt-gold",
    description: "Elegant pendant necklace in 9KT solid gold with a solitaire lab-grown diamond.",
    details: ["9KT solid gold", "Lab-grown diamond center", "Adjustable chain", "BIS hallmarked"],
    material: "9KT Solid Gold with Lab Diamond",
    discount: 29,
    rating: 4.8,
    reviews: 34
  }
]

export const categories = [
  { id: "new-arrivals", name: "New Arrivals", description: "Discover our latest jewelry pieces" },
  { id: "necklaces", name: "Necklaces", description: "Elegant necklaces for every occasion" },
  { id: "earrings", name: "Earrings", description: "Statement and everyday earrings" },
  { id: "bracelets", name: "Bracelets", description: "Beautiful bracelets and bangles" },
  { id: "rings", name: "Rings", description: "Stunning rings for all fingers" },
  { id: "men", name: "Men", description: "Bold jewelry for the modern man" },
  { id: "9kt-gold", name: "9KT Gold", description: "Premium fine gold collection" },
  { id: "gifts", name: "Gifts", description: "Perfect gifts for your loved ones" },
  { id: "mangalsutra", name: "Mangalsutra", description: "Modern mangalsutra designs" }
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "new-arrivals") {
    return products.filter(p => p.isNew)
  }
  if (category === "gifts") {
    return products.filter(p => p.isBestseller || p.discount && p.discount >= 30)
  }
  return products.filter(p => p.category === category)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.category.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery)
  )
}
