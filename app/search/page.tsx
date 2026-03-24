"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, ChevronDown, X } from "lucide-react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import ProductCard from "@/components/orinket/ProductCard"
import { searchProducts, products, categories } from "@/data/products"

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])

  const results = searchProducts(searchQuery)
  
  // Apply filters
  let filteredResults = results
  if (selectedCategory) {
    filteredResults = filteredResults.filter(p => p.category === selectedCategory)
  }
  filteredResults = filteredResults.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

  // Apply sorting
  if (sortBy === "price-low") {
    filteredResults.sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-high") {
    filteredResults.sort((a, b) => b.price - a.price)
  } else if (sortBy === "newest") {
    filteredResults = filteredResults.filter(p => p.isNew).concat(filteredResults.filter(p => !p.isNew))
  }

  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <div className="bg-cream py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <form className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for necklaces, earrings, bracelets..."
                  className="w-full pl-12 pr-4 py-4 border border-border bg-white font-[family-name:var(--font-montserrat)] text-sm focus:outline-none focus:border-gold"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Results Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              {searchQuery ? (
                <>
                  <h1 className="text-2xl font-semibold font-[family-name:var(--font-cormorant)] text-foreground">
                    Search results for "{searchQuery}"
                  </h1>
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)] mt-1">
                    {filteredResults.length} products found
                  </p>
                </>
              ) : (
                <h1 className="text-2xl font-semibold font-[family-name:var(--font-cormorant)] text-foreground">
                  All Products
                </h1>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-border bg-white text-sm font-[family-name:var(--font-montserrat)] focus:outline-none focus:border-gold cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-cream p-6 rounded-sm sticky top-32">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold font-[family-name:var(--font-montserrat)] text-foreground">
                    Filters
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedCategory(null)
                      setPriceRange([0, 50000])
                    }}
                    className="text-xs text-muted-foreground hover:text-gold-dark transition-colors font-[family-name:var(--font-montserrat)]"
                  >
                    Clear all
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold font-[family-name:var(--font-montserrat)] text-foreground mb-3">
                    Category
                  </h3>
                  <div className="space-y-2">
                    {categories.slice(0, 7).map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat.id}
                          onChange={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                          className="w-4 h-4 text-gold"
                        />
                        <span className="text-sm font-[family-name:var(--font-montserrat)] text-foreground">
                          {cat.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="text-sm font-semibold font-[family-name:var(--font-montserrat)] text-foreground mb-3">
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: "Under Rs.1000", range: [0, 1000] as [number, number] },
                      { label: "Rs.1000 - Rs.2000", range: [1000, 2000] as [number, number] },
                      { label: "Rs.2000 - Rs.5000", range: [2000, 5000] as [number, number] },
                      { label: "Rs.5000 - Rs.10000", range: [5000, 10000] as [number, number] },
                      { label: "Above Rs.10000", range: [10000, 50000] as [number, number] },
                    ].map((option) => (
                      <label key={option.label} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          checked={priceRange[0] === option.range[0] && priceRange[1] === option.range[1]}
                          onChange={() => setPriceRange(option.range)}
                          className="w-4 h-4 text-gold"
                        />
                        <span className="text-sm font-[family-name:var(--font-montserrat)] text-foreground">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-3">
              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {filteredResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Search className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
                  <h2 className="text-xl font-semibold font-[family-name:var(--font-cormorant)] text-foreground mb-2">
                    No products found
                  </h2>
                  <p className="text-muted-foreground font-[family-name:var(--font-montserrat)] mb-6">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory(null)
                      setPriceRange([0, 50000])
                    }}
                    className="px-6 py-3 bg-foreground text-white font-[family-name:var(--font-montserrat)] tracking-wider hover:bg-gold-dark transition-colors"
                  >
                    CLEAR FILTERS
                  </button>
                </div>
              )}

              {/* Show suggestions if no query */}
              {!searchQuery && filteredResults.length === 0 && (
                <div className="text-center py-16">
                  <h2 className="text-xl font-semibold font-[family-name:var(--font-cormorant)] text-foreground mb-4">
                    Popular Searches
                  </h2>
                  <div className="flex flex-wrap justify-center gap-3">
                    {["Necklaces", "Earrings", "Bracelets", "Rings", "Gold"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term.toLowerCase())}
                        className="px-4 py-2 border border-border text-sm font-[family-name:var(--font-montserrat)] hover:border-gold hover:text-gold-dark transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
