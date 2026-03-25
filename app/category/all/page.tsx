'use client'

import Header from '@/components/orinket/Header'
import Footer from '@/components/orinket/Footer'
import ProductGrid from '@/components/orinket/ProductGrid'
import FilterSidebar from '@/components/orinket/FilterSidebar'
import AnimatedSection from '@/components/orinket/AnimatedSection'
import { dummyProducts } from '../../../data/dummyProducts'
import { ShoppingBag, Filter, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getFilterOptions, filterProducts, FilterState } from '@/lib/productFilters'

export default function CategoryAllPage() {
  console.log('Category All Page - dummyProducts:', dummyProducts.length)
  
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
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
    const filtered = filterProducts(dummyProducts, activeFilters)
    setFilteredProducts(filtered)
  }, [activeFilters])

  const handleFiltersChange = (filters: FilterState) => {
    setActiveFilters(filters)
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
  
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatedSection animation="fadeIn" delay={100}>
          <div className="text-center mb-16">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 tracking-tight">
                All Products
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover our complete collection of beautiful jewelry pieces
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{dummyProducts.filter(p => p.inStock).length} In Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{dummyProducts.length} Total Products</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Filter Toggle Button for Mobile */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
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
            {/* Results Summary */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of{' '}
                  <span className="font-semibold text-gray-900">{dummyProducts.length}</span> products
                </p>
                {getActiveFilterCount() > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} applied
                  </p>
                )}
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <AnimatedSection animation="slideUp" delay={200}>
                <ProductGrid products={filteredProducts} />
              </AnimatedSection>
            ) : (
              <AnimatedSection animation="fadeIn" delay={200}>
                <div className="text-center py-24">
                  <div className="max-w-lg mx-auto space-y-6">
                    <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-3xl font-bold text-gray-900">No products found</h2>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Try adjusting your filters to find what you're looking for.
                      </p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={() => handleFiltersChange({
                          categories: [],
                          priceRange: null,
                          materials: [],
                          platings: [],
                          rating: null,
                          inStock: true,
                        })}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <X className="w-5 h-5" />
                        Clear Filters
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

