'use client'

import { notFound } from 'next/navigation'
import ProductGrid from '@/components/orinket/ProductGrid'
import FilterSidebar from '@/components/orinket/FilterSidebar'
import AnimatedSection from '@/components/orinket/AnimatedSection'
import { getProductsByCategory, dummyProducts } from '@/data/dummyProducts'
import { ShoppingBag, Filter, X, ChevronLeft, ChevronRight, Grid3x3, List } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'
import { getFilterOptions, filterProducts, FilterState } from '@/lib/productFilters'

const categories = [
  { name: 'new-arrivals', displayName: 'New Arrivals', description: 'Discover our latest collection' },
  { name: 'necklaces', displayName: 'Necklaces', description: 'Elegant necklaces for every occasion' },
  { name: 'earrings', displayName: 'Earrings', description: 'Beautiful earrings to complement your style' },
  { name: 'bracelets', displayName: 'Bracelets', description: 'Stylish bracelets for everyday wear' },
  { name: 'rings', displayName: 'Rings', description: 'Stunning rings for special moments' },
  { name: 'men', displayName: 'Men', description: 'Sophisticated jewelry for modern men' },
  { name: '9kt-gold', displayName: '9KT Gold', description: 'Premium 9KT gold collection' },
  { name: 'gifts', displayName: 'Gifts', description: 'Perfect gifts for your loved ones' }
]

const PRODUCTS_PER_PAGE = 9

interface CategoryPageContentProps {
  slug: string
}

export default function CategoryPageContent({ slug }: CategoryPageContentProps) {
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    categories: [],
    priceRange: null,
    materials: [],
    platings: [],
    rating: null,
    inStock: true,
  })

  const filterOptions = getFilterOptions(dummyProducts)

  useEffect(() => {
    const category = categories.find(cat => cat.name === slug)
    
    if (!category) {
      notFound()
      return
    }

    const products = getProductsByCategory(slug)
    setFilteredProducts(products)
    
    // Set the current category as active filter
    setActiveFilters(prev => ({
      ...prev,
      categories: [slug]
    }))
  }, [slug])

  useEffect(() => {
    if (slug) {
      const categoryProducts = getProductsByCategory(slug)
      const filtered = filterProducts(categoryProducts, activeFilters)
      setFilteredProducts(filtered)
      setCurrentPage(1) // Reset to first page when filters change
    }
  }, [activeFilters, slug])

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handleFiltersChange = (filters: FilterState) => {
    setActiveFilters(filters)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

  const category = categories.find(cat => cat.name === slug)
  const categoryProducts = slug ? getProductsByCategory(slug) : []

  if (!category) {
    return notFound()
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <AnimatedSection animation="fadeIn" delay={100}>
          <div className="text-center mb-14">
            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4 text-gray-950 tracking-tight">{category.displayName}</h1>
            <p className="text-lg md:text-xl font-normal text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {category.description}
            </p>
          </div>
        </AnimatedSection>

        {/* Filter Toggle Button for Mobile */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="font-normal">Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="bg-yellow-500 text-gray-900 text-xs font-normal px-2.5 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar - Desktop Always Visible, Mobile Conditional */}
          <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
            <FilterSidebar
              filters={filterOptions}
              onFiltersChange={handleFiltersChange}
              isOpen={true}
              onClose={() => {}}
            />
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            filters={filterOptions}
            onFiltersChange={handleFiltersChange}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />

          {/* Product Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-normal">
                    <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
                    {getActiveFilterCount() > 0 && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} applied
                      </span>
                    )}
                  </p>
                  {getActiveFilterCount() > 0 && (
                    <button
                      onClick={() => handleFiltersChange({
                        categories: [slug],
                        priceRange: null,
                        materials: [],
                        platings: [],
                        rating: null,
                        inStock: true,
                      })}
                      className="text-xs text-amber-600 hover:text-amber-700 font-medium transition-colors mt-2"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 font-normal hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  >
                    <option value="relevance">Sort: Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="bestseller">Bestseller</option>
                  </select>
                  
                  {/* View Toggle */}
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1 bg-white">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-all ${
                        viewMode === 'grid'
                          ? 'bg-amber-500 text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      title="Grid view"
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-all ${
                        viewMode === 'list'
                          ? 'bg-amber-500 text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      title="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {currentProducts.length > 0 ? (
              <>
                <AnimatedSection animation="slideUp" delay={200}>
                  <ProductGrid products={currentProducts} viewMode={viewMode} />
                </AnimatedSection>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="font-normal">Previous</span>
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-lg font-normal transition-colors ${
                              currentPage === page
                                ? 'bg-yellow-500 text-white'
                                : 'bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <span className="font-normal">Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <AnimatedSection animation="fadeIn" delay={200}>
                <div className="text-center py-24">
                  <div className="max-w-lg mx-auto space-y-8">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-3xl font-normal text-gray-900">No products found</h2>
                      <p className="text-lg font-normal text-gray-600 leading-relaxed">
                        We couldn't find any products matching your current filters. Try adjusting your filter criteria to see more results.
                      </p>
                    </div>
                    <div className="pt-4 space-y-3">
                      <button
                        onClick={() => handleFiltersChange({
                          categories: [slug],
                          priceRange: null,
                          materials: [],
                          platings: [],
                          rating: null,
                          inStock: true,
                        })}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-white font-normal rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                        Clear All Filters
                      </button>
                      <div className="text-sm font-normal text-gray-500">
                        Or browse our <a href="/category/all" className="text-blue-600 hover:text-blue-700 font-normal">complete collection</a>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
