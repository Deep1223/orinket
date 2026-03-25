"use client"

import { useState } from "react"
import Link from "next/link"
import ProductCard from "@/components/orinket/ProductCard"
import { dummyProducts, getProductsByCategory } from "@/data/dummyProducts"

const filters = ["All", "Necklace", "Bracelets", "Rings", "Earrings", "Pendant"]

export default function FineGold() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredProducts = activeFilter === "All"
    ? getProductsByCategory("9kt-gold")
    : getProductsByCategory("9kt-gold").filter(p => 
        p.subcategory?.toLowerCase() === activeFilter.toLowerCase()
      )

  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-4 text-center font-[family-name:var(--font-nunito)]">
          9KT FINE GOLD
        </h2>
        <p className="text-center text-white/70 mb-8 font-[family-name:var(--font-nunito)]">
          Lab grown diamonds set in solid 9KT gold
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm tracking-wider font-[family-name:var(--font-nunito)] transition-all border ${
                activeFilter === filter
                  ? "bg-gold border-gold text-white"
                  : "border-white/30 text-white/70 hover:border-white hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg p-2">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            href="/category/9kt-gold"
            className="inline-block px-8 py-3 border border-white text-white text-sm tracking-[0.2em] hover:bg-white hover:text-foreground transition-all font-[family-name:var(--font-nunito)]"
          >
            VIEW ALL
          </Link>
        </div>
      </div>
    </section>
  )
}

