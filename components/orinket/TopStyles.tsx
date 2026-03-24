"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"

const categories = ["ALL", "NECKLACES", "BRACELETS", "EARRINGS", "RINGS", "MENS", "MANGALSUTRA"]

const products = [
  {
    id: 1,
    name: "Hearts All Over Bracelet",
    price: 2229,
    originalPrice: 3184,
    image: "/images/product-bracelet-1.jpg",
    category: "BRACELETS",
    discount: 30
  },
  {
    id: 2,
    name: "Crystal Love Bangle Bracelet",
    price: 2659,
    originalPrice: 3799,
    image: "/images/product-bracelet-2.jpg",
    category: "BRACELETS",
    discount: 30
  },
  {
    id: 3,
    name: "Athena Solitaire Hoop Earrings",
    price: 2258,
    originalPrice: 3226,
    image: "/images/product-earrings-1.jpg",
    category: "EARRINGS",
    discount: 30
  },
  {
    id: 4,
    name: "Round Solitaire Necklace",
    price: 2799,
    originalPrice: 3998,
    image: "/images/product-necklace-1.jpg",
    category: "NECKLACES",
    discount: 30
  },
  {
    id: 5,
    name: "Classic Emerald Necklace",
    price: 2223,
    originalPrice: 3175,
    image: "/images/product-necklace-2.jpg",
    category: "NECKLACES",
    discount: 30
  },
  {
    id: 6,
    name: "Diamond Ball Stud Earrings",
    price: 1495,
    originalPrice: 2136,
    image: "/images/product-earrings-2.jpg",
    category: "EARRINGS",
    discount: 30
  },
  {
    id: 7,
    name: "Cross-Over Twist Ring",
    price: 2903,
    originalPrice: 4147,
    image: "/images/product-ring-1.jpg",
    category: "RINGS",
    discount: 30
  },
  {
    id: 8,
    name: "Mini Solitaire Ring",
    price: 2269,
    originalPrice: 3241,
    image: "/images/product-ring-2.jpg",
    category: "RINGS",
    discount: 30
  },
  {
    id: 9,
    name: "Rope Chain | 6 MM",
    price: 2633,
    originalPrice: 3761,
    image: "/images/product-mens-1.jpg",
    category: "MENS",
    discount: 30
  },
  {
    id: 10,
    name: "Star Cluster Mangalsutra Ring",
    price: 4087,
    originalPrice: 5499,
    image: "/images/product-mangalsutra.jpg",
    category: "MANGALSUTRA",
    discount: 26
  }
]

export default function TopStyles() {
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [wishlist, setWishlist] = useState<number[]>([])

  const filteredProducts = activeCategory === "ALL" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('₹', 'Rs. ')
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-8 font-[family-name:var(--font-cormorant)] animate-fadeIn">
            ORINKET TOP STYLES
          </h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs md:text-sm tracking-wider font-[family-name:var(--font-montserrat)] transition-all duration-300 animate-slideUp hover:shadow-sm ${
                  activeCategory === category
                    ? "bg-foreground text-background shadow-md"
                    : "bg-transparent text-foreground hover:bg-cream"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.slice(0, 8).map((product, index) => (
            <div key={product.id} className="group relative animate-slideUp" style={{ animationDelay: `${index * 75}ms` }}>
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-cream mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
                  aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart 
                    className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-foreground"}`} 
                  />
                </button>

                {/* Discount Badge */}
                <span className="absolute top-3 left-3 bg-gold text-white text-xs px-2 py-1 font-[family-name:var(--font-montserrat)]">
                  {product.discount}% OFF
                </span>

                {/* Quick Add Button */}
                <button className="absolute bottom-0 left-0 right-0 bg-foreground text-background py-3 text-sm tracking-wider font-[family-name:var(--font-montserrat)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  ADD TO BAG
                </button>
              </div>

              {/* Product Info */}
              <Link href={`/product/${product.id}`} className="block">
                <h3 className="text-sm md:text-base font-medium mb-2 font-[family-name:var(--font-cormorant)] group-hover:text-gold-dark transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 font-[family-name:var(--font-montserrat)]">
                  <span className="text-sm font-medium">{formatPrice(product.price)}</span>
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/collections/all"
            className="inline-block px-8 py-3 border border-foreground text-foreground text-sm tracking-[0.2em] hover:bg-foreground hover:text-background transition-all duration-300 font-[family-name:var(--font-montserrat)] animate-slideUp hover:shadow-lg" style={{ animationDelay: "600ms" }}
          >
            VIEW ALL
          </Link>
        </div>
      </div>
    </section>
  )
}
