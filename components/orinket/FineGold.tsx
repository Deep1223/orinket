"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const filters = ["All", "Necklace", "Bracelets", "Rings", "Earrings", "Pendant"]

const products = [
  {
    id: 1,
    name: "Crystal Peak 9KT Gold Lab Grown Diamond Studs",
    image: "/images/fine-gold-1.jpg",
    category: "Earrings",
    badge: "Flat 5% Off",
    tag: "9KT Solid Gold"
  },
  {
    id: 2,
    name: "Orba Shine 9KT Gold Lab Grown Diamond Bracelet",
    image: "/images/fine-gold-2.jpg",
    category: "Bracelets",
    badge: "Flat 5% Off",
    tag: "9KT Solid Gold"
  },
  {
    id: 3,
    name: "Stellar Bloom 9KT Gold Lab Grown Diamond Pendant",
    image: "/images/fine-gold-3.jpg",
    category: "Pendant",
    badge: "Flat 5% Off",
    tag: "9KT Solid Gold"
  },
  {
    id: 4,
    name: "Floral Whisper 9KT Gold Diamond Studs",
    image: "/images/fine-gold-1.jpg",
    category: "Earrings",
    badge: "Flat 5% Off",
    tag: "9KT Solid Gold"
  },
  {
    id: 5,
    name: "Sweethex 9KT Gold Lab Grown Diamond Ring",
    image: "/images/fine-gold-2.jpg",
    category: "Rings",
    badge: "Flat 5% Off",
    tag: "9KT Solid Gold"
  },
  {
    id: 6,
    name: "Celestial Dot 9KT Gold Diamond Necklace",
    image: "/images/fine-gold-3.jpg",
    category: "Necklace",
    badge: "Flat 5% Off",
    tag: "9KT Solid Gold"
  }
]

export default function FineGold() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredProducts = activeFilter === "All"
    ? products
    : products.filter(p => p.category === activeFilter)

  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-4 text-center font-[family-name:var(--font-cormorant)]">
          9KT FINE GOLD
        </h2>
        <p className="text-center text-white/70 mb-8 font-[family-name:var(--font-montserrat)]">
          Lab grown diamonds set in solid 9KT gold
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm tracking-wider font-[family-name:var(--font-montserrat)] transition-all border ${
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
            <Link
              key={product.id}
              href={`/product/fine-gold/${product.id}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden bg-[#2a2a2a] mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-gold text-white text-xs px-2 py-1 font-[family-name:var(--font-montserrat)]">
                  {product.badge}
                </span>
                <span className="absolute bottom-3 left-3 bg-white/90 text-foreground text-xs px-2 py-1 font-[family-name:var(--font-montserrat)]">
                  {product.tag}
                </span>
              </div>
              <h3 className="text-sm md:text-base font-[family-name:var(--font-cormorant)] group-hover:text-gold transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            href="/collections/9kt-gold"
            className="inline-block px-8 py-3 border border-white text-white text-sm tracking-[0.2em] hover:bg-white hover:text-foreground transition-all font-[family-name:var(--font-montserrat)]"
          >
            VIEW ALL
          </Link>
        </div>
      </div>
    </section>
  )
}
