"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
import { dummyProducts } from "@/data/dummyProducts"

const categories = ["ALL", "NECKLACES", "BRACELETS", "EARRINGS", "RINGS", "MENS", "MANGALSUTRA"]

// Get sample products from our dummy data
const sampleProducts = [
  dummyProducts.find(p => p.id === "bracelet-001") || dummyProducts[0],
  dummyProducts.find(p => p.id === "bracelet-002") || dummyProducts[1], 
  dummyProducts.find(p => p.id === "earring-001") || dummyProducts[2],
  dummyProducts.find(p => p.id === "necklace-001") || dummyProducts[3],
  dummyProducts.find(p => p.id === "necklace-003") || dummyProducts[4],
  dummyProducts.find(p => p.id === "earring-003") || dummyProducts[5],
  dummyProducts.find(p => p.id === "ring-002") || dummyProducts[6],
  dummyProducts.find(p => p.id === "ring-003") || dummyProducts[7],
  dummyProducts.find(p => p.id === "men-001") || dummyProducts[8],
  dummyProducts.find(p => p.id === "necklace-002") || dummyProducts[9]
].filter(Boolean)

// Add discount for display
const products = sampleProducts.map(product => ({
  ...product,
  discount: 30
}))

export default function TopStyles() {
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [wishlist, setWishlist] = useState<string[]>([])

  const filteredProducts = activeCategory === "ALL" 
    ? products 
    : products.filter(p => p.category === activeCategory.toLowerCase())

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const formatPrice = (price: number | undefined) => {
    if (!price) return 'Rs. 0'
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
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-8 font-[family-name:var(--font-nunito)] animate-fadeIn">
            ORINKET TOP STYLES
          </h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs md:text-sm tracking-wider font-[family-name:var(--font-nunito)] transition-all duration-300 animate-slideUp hover:shadow-sm ${
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
            <Link 
              key={product.id} 
              href={`/product/${product.id}`}
              className="group relative animate-slideUp block cursor-pointer" 
              style={{ animationDelay: `${index * 75}ms` }}
            >
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
                  onClick={(e) => {
                    e.preventDefault()
                    toggleWishlist(product.id)
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
                  aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart 
                    className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-foreground"}`} 
                  />
                </button>

                {/* Discount Badge */}
                <span className="absolute top-3 left-3 bg-gold text-white text-xs px-2 py-1 font-[family-name:var(--font-nunito)]">
                  {product.discount}% OFF
                </span>

                {/* Quick Add Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault()
                    // Add to cart functionality here
                  }}
                  className="absolute bottom-0 left-0 right-0 bg-foreground text-background py-3 text-sm tracking-wider font-[family-name:var(--font-nunito)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  ADD TO BAG
                </button>
              </div>

              {/* Product Info */}
              <div>
                <h3 className="text-sm md:text-base font-medium mb-2 font-[family-name:var(--font-nunito)] group-hover:text-gold-dark transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 font-[family-name:var(--font-nunito)]">
                  <span className="text-sm font-medium">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href={activeCategory === "ALL" ? "/category/all" : `/category/${activeCategory.toLowerCase()}`}
            className="inline-block px-8 py-3 border border-foreground text-foreground text-sm tracking-[0.2em] hover:bg-foreground hover:text-background transition-all duration-300 font-[family-name:var(--font-nunito)] animate-slideUp hover:shadow-lg" style={{ animationDelay: "600ms" }}
          >
            VIEW ALL
          </Link>
        </div>
      </div>
    </section>
  )
}

