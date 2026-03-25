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
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-950 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl -z-0" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wider mb-4 text-white font-[family-name:var(--font-nunito)]">
            9KT FINE GOLD
          </h2>
          <p className="text-base md:text-lg text-gray-400 font-[family-name:var(--font-nunito)] max-w-2xl mx-auto leading-relaxed">
            Lab grown diamonds set in solid 9KT gold. Premium jewelry crafted for timeless elegance.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 text-sm font-semibold tracking-wider font-[family-name:var(--font-nunito)] transition-all duration-300 rounded-lg border-2 ${
                activeFilter === filter
                  ? "bg-yellow-500 border-yellow-500 text-gray-950 shadow-lg shadow-yellow-500/20"
                  : "border-gray-700 text-gray-300 hover:border-yellow-500 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-500/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product, idx) => (
            <div 
              key={product.id} 
              className="group animate-fadeIn"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-8 border-t border-gray-800">
          <Link
            href="/category/9kt-gold"
            className="inline-block px-10 py-3.5 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-950 font-bold text-sm tracking-wider rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/30 transform hover:scale-105 font-[family-name:var(--font-nunito)]"
          >
            VIEW ALL COLLECTION
          </Link>
        </div>
      </div>
    </section>
  )
}

