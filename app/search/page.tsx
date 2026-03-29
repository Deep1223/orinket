"use client"

import { Suspense, useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search } from "lucide-react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import ProductGrid from "@/components/orinket/ProductGrid"
import FilterSidebar from "@/components/orinket/FilterSidebar"
import {
  ProductListingShell,
  ProductListingHero,
  ProductListingToolbar,
} from "@/components/orinket/ProductListingShell"
import { searchProducts } from "@/lib/catalogQueries"
import { useAppSelector } from "@/store/hooks"
import { selectProducts } from "@/store/selectors"
import { getFilterOptions, filterProducts, FilterState } from "@/lib/productFilters"
import { useCurrency } from "@/context/CurrencyContext"
import { fonts } from "@/lib/fonts"

function SearchContent() {
  const { formatPrice } = useCurrency()
  const catalog = useAppSelector(selectProducts)
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    categories: [],
    priceRange: null,
    materials: [],
    platings: [],
    rating: null,
    inStock: true,
  })

  const filterOptions = useMemo(
    () => getFilterOptions(catalog, formatPrice),
    [catalog, formatPrice]
  )

  const baseProducts = useMemo(
    () => (searchQuery.trim() ? searchProducts(catalog, searchQuery) : catalog),
    [searchQuery, catalog]
  )

  const filteredResults = useMemo(() => {
    const list = filterProducts(baseProducts, activeFilters)
    const copy = [...list]
    switch (sortBy) {
      case "price-low":
        return copy.sort((a, b) => a.price - b.price)
      case "price-high":
        return copy.sort((a, b) => b.price - a.price)
      case "newest":
        return copy.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)))
      default:
        return copy
    }
  }, [baseProducts, activeFilters, sortBy])

  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    router.replace(q ? `/search?q=${encodeURIComponent(q)}` : "/search")
  }

  const clearSearch = () => {
    setSearchQuery("")
    router.replace("/search")
  }

  const desktopSidebar = (
    <FilterSidebar
      filters={filterOptions}
      onFiltersChange={setActiveFilters}
      isOpen
      onClose={() => {}}
    />
  )

  const mobileFilter = (
    <FilterSidebar
      filters={filterOptions}
      onFiltersChange={setActiveFilters}
      isOpen={isFilterOpen}
      onClose={() => setIsFilterOpen(false)}
    />
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <ProductListingShell
        hero={
          <ProductListingHero
            badge={searchQuery ? "Search" : "Catalog"}
            title={
              searchQuery ? (
                <>
                  Results for{" "}
                  <span className="bg-gradient-to-r from-gold-dark to-stone-800 bg-clip-text text-transparent">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                </>
              ) : (
                <>All products</>
              )
            }
            subtitle={
              searchQuery
                ? "Use filters on the left to narrow results."
                : "Explore every piece in our catalog — refined metals, timeless silhouettes."
            }
          />
        }
        desktopSidebar={desktopSidebar}
        mobileFilterOverlay={mobileFilter}
      >
        <ProductListingToolbar
          productCount={filteredResults.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          onClearSearch={clearSearch}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenFiltersMobile={() => setIsFilterOpen(true)}
        />

        {filteredResults.length > 0 ? (
          <ProductGrid products={filteredResults} viewMode={viewMode} />
        ) : (
          <div className="rounded-2xl border border-stone-200/70 bg-white/70 py-16 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-sm">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-light/80 to-cream-dark ring-1 ring-gold/20">
              <Search className="h-9 w-9 text-gold-dark/60" />
            </div>
            <h2 className={`mb-2 ${fonts.headings} text-xl font-semibold text-stone-900`}>
              No products found
            </h2>
            <p className={`mx-auto mb-8 max-w-md ${fonts.body} text-sm text-stone-600`}>
              Try adjusting your search or filters to find what you&apos;re looking for.
            </p>
            <button
              type="button"
              onClick={() =>
                setActiveFilters({
                  categories: [],
                  priceRange: null,
                  materials: [],
                  platings: [],
                  rating: null,
                  inStock: true,
                })
              }
              className={`rounded-xl bg-gradient-to-r from-stone-900 to-stone-800 px-8 py-3 ${fonts.buttons} text-sm font-semibold tracking-wide text-white shadow-lg transition hover:from-gold-dark hover:to-stone-900`}
            >
              Clear filters
            </button>
          </div>
        )}
      </ProductListingShell>

      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
