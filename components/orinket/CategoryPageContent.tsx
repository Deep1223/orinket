"use client"

import { notFound, useRouter } from "next/navigation"
import ProductGrid from "@/components/orinket/ProductGrid"
import FilterSidebar from "@/components/orinket/FilterSidebar"
import {
  ProductListingShell,
  ProductListingHero,
  ProductListingToolbar,
} from "@/components/orinket/ProductListingShell"
import { getProductsByCategory, dummyProducts } from "@/data/dummyProducts"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { getFilterOptions, filterProducts, FilterState } from "@/lib/productFilters"
import { useCurrency } from "@/context/CurrencyContext"
import { fonts } from "@/lib/fonts"

const categories = [
  { name: "all", displayName: "All Products", description: "Discover our complete collection of beautiful jewelry pieces" },
  { name: "new-arrivals", displayName: "New Arrivals", description: "Discover our latest collection" },
  { name: "necklaces", displayName: "Necklaces", description: "Elegant necklaces for every occasion" },
  { name: "earrings", displayName: "Earrings", description: "Beautiful earrings to complement your style" },
  { name: "bracelets", displayName: "Bracelets", description: "Stylish bracelets for everyday wear" },
  { name: "rings", displayName: "Rings", description: "Stunning rings for special moments" },
  { name: "men", displayName: "Men", description: "Sophisticated jewelry for modern men" },
  { name: "9kt-gold", displayName: "9KT Gold", description: "Premium 9KT gold collection" },
  { name: "gifts", displayName: "Gifts", description: "Perfect gifts for your loved ones" },
]

const PRODUCTS_PER_PAGE = 9

function getBaseProductsForSlug(slug: string) {
  return slug === "all" ? dummyProducts : getProductsByCategory(slug)
}

function initialCategoryFilterForSlug(slug: string): string[] {
  if (slug === "all") return []
  return [slug]
}

const CATEGORY_SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "bestseller", label: "Bestseller" },
]

interface CategoryPageContentProps {
  slug: string
}

export default function CategoryPageContent({ slug }: CategoryPageContentProps) {
  const { formatPrice } = useCurrency()
  const router = useRouter()
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [listSearchQuery, setListSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
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
    () => getFilterOptions(dummyProducts, formatPrice),
    [formatPrice]
  )

  useEffect(() => {
    const category = categories.find((cat) => cat.name === slug)

    if (!category) {
      notFound()
      return
    }

    const products = getBaseProductsForSlug(slug)
    setFilteredProducts(products)

    setActiveFilters((prev) => ({
      ...prev,
      categories: initialCategoryFilterForSlug(slug),
    }))
  }, [slug])

  useEffect(() => {
    if (slug) {
      const categoryProducts = getBaseProductsForSlug(slug)
      const filtered = filterProducts(categoryProducts, activeFilters)
      setFilteredProducts(filtered)
      setCurrentPage(1)
    }
  }, [activeFilters, slug])

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts]
    switch (sortBy) {
      case "price-low":
        return products.sort((a, b) => a.price - b.price)
      case "price-high":
        return products.sort((a, b) => b.price - a.price)
      case "newest":
        return products.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)))
      case "bestseller":
        return products.sort((a, b) => Number(Boolean(b.isBestseller)) - Number(Boolean(a.isBestseller)))
      default:
        return products
    }
  }, [filteredProducts, sortBy])

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = sortedProducts.slice(startIndex, endIndex)

  const handleFiltersChange = (filters: FilterState) => {
    setActiveFilters(filters)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (activeFilters.categories.length > 0) count++
    if (activeFilters.priceRange) count++
    if (activeFilters.materials.length > 0) count++
    if (activeFilters.platings.length > 0) count++
    if (activeFilters.rating) count++
    if (!activeFilters.inStock) count++
    return count
  }

  const category = categories.find((cat) => cat.name === slug)

  if (!category) {
    return notFound()
  }

  const handleListSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = listSearchQuery.trim()
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`)
    }
  }

  const clearListSearch = () => setListSearchQuery("")

  const filterCount = getActiveFilterCount()

  const extraCountSlot =
    filterCount > 0 ? (
      <span className="ml-2 inline-flex items-center rounded-full border border-gold/30 bg-gold-light/40 px-2.5 py-0.5 text-xs font-medium text-gold-dark">
        {filterCount} filter{filterCount > 1 ? "s" : ""} applied
      </span>
    ) : null

  return (
    <ProductListingShell
      hero={
        <ProductListingHero
          badge="Collection"
          title={category.displayName}
          subtitle={`${category.description} Use filters on the left to narrow results.`}
        />
      }
      desktopSidebar={
        <FilterSidebar
          filters={filterOptions}
          onFiltersChange={handleFiltersChange}
          isOpen
          onClose={() => {}}
        />
      }
      mobileFilterOverlay={
        <FilterSidebar
          filters={filterOptions}
          onFiltersChange={handleFiltersChange}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      }
    >
      <ProductListingToolbar
        productCount={sortedProducts.length}
        searchQuery={listSearchQuery}
        onSearchChange={setListSearchQuery}
        onSearchSubmit={handleListSearchSubmit}
        onClearSearch={clearListSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOptions={CATEGORY_SORT_OPTIONS}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenFiltersMobile={() => setIsFilterOpen(true)}
        mobileFilterBadge={filterCount}
        extraCountSlot={extraCountSlot}
      />

      {currentProducts.length > 0 ? (
        <>
          <ProductGrid products={currentProducts} viewMode={viewMode} />

          {totalPages > 1 && (
            <div className="mt-10 flex justify-center sm:mt-14">
              <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-stone-200/60 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 rounded-xl border border-stone-200/80 bg-white px-4 py-2.5 ${fonts.buttons} text-sm text-stone-800 transition-colors hover:border-gold/40 hover:bg-cream/50 disabled:cursor-not-allowed disabled:opacity-45`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <div className="hidden items-center gap-1 sm:flex">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      className={`h-10 w-10 rounded-xl ${fonts.buttons} text-sm tabular-nums transition-all ${
                        currentPage === page
                          ? "bg-gradient-to-br from-gold to-gold-dark font-semibold text-white shadow-md"
                          : "border border-stone-200/80 bg-white text-stone-700 hover:border-gold/35 hover:bg-cream/40"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <div className={`rounded-xl border border-stone-200/80 bg-cream/30 px-3 py-2 ${fonts.body} text-sm text-stone-600 sm:hidden`}>
                  Page {currentPage} of {totalPages}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 rounded-xl border border-stone-200/80 bg-white px-4 py-2.5 ${fonts.buttons} text-sm text-stone-800 transition-colors hover:border-gold/40 hover:bg-cream/50 disabled:cursor-not-allowed disabled:opacity-45`}
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-stone-200/70 bg-white/70 py-20 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-sm">
          <div className="mx-auto max-w-lg space-y-8">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-gold-light/80 to-cream-dark shadow-[0_12px_40px_-8px_rgba(28,25,23,0.15)] ring-1 ring-gold/20">
              <svg className="h-14 w-14 text-gold-dark/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-2xl text-stone-900 sm:text-3xl">No products found</h2>
              <p className={`${fonts.body} text-base leading-relaxed text-stone-600 sm:text-lg`}>
                We couldn&apos;t find any products matching your current filters. Try adjusting your criteria to see more results.
              </p>
            </div>
            <div className="space-y-4 pt-2">
              <button
                type="button"
                onClick={() =>
                  handleFiltersChange({
                    categories: initialCategoryFilterForSlug(slug),
                    priceRange: null,
                    materials: [],
                    platings: [],
                    rating: null,
                    inStock: true,
                  })
                }
                className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-stone-900 to-stone-800 px-8 py-3.5 ${fonts.buttons} text-sm font-semibold tracking-wide text-white shadow-lg transition hover:from-gold-dark hover:to-stone-900`}
              >
                <X className="h-5 w-5" />
                Clear all filters
              </button>
            </div>
          </div>
        </div>
      )}
    </ProductListingShell>
  )
}
