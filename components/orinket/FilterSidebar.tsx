'use client'

import { useState } from 'react'
import { X, ChevronDown, ChevronUp, Star, DollarSign, Package, Shield } from 'lucide-react'
import { font } from '@/lib/fonts'

interface FilterSidebarProps {
  filters: {
    categories: string[]
    priceRanges: { label: string; min: number; max: number }[]
    materials: string[]
    platings: string[]
    ratings: number[]
  }
  onFiltersChange: (activeFilters: {
    categories: string[]
    priceRange: { min: number; max: number } | null
    materials: string[]
    platings: string[]
    rating: number | null
    inStock: boolean
  }) => void
  isOpen: boolean
  onClose: () => void
}

export default function FilterSidebar({ filters, onFiltersChange, isOpen, onClose }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    materials: true,
    platings: true,
    rating: true,
  })

  const [activeFilters, setActiveFilters] = useState({
    categories: [] as string[],
    priceRange: null as { min: number; max: number } | null,
    materials: [] as string[],
    platings: [] as string[],
    rating: null as number | null,
    inStock: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleCategoryChange = (category: string) => {
    const newCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter(c => c !== category)
      : [...activeFilters.categories, category]
    
    const updatedFilters = { ...activeFilters, categories: newCategories }
    setActiveFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handlePriceRangeChange = (min: number, max: number) => {
    const newPriceRange = activeFilters.priceRange?.min === min && activeFilters.priceRange.max === max
      ? null
      : { min, max }
    
    const updatedFilters = { ...activeFilters, priceRange: newPriceRange }
    setActiveFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handleMaterialChange = (material: string) => {
    const newMaterials = activeFilters.materials.includes(material)
      ? activeFilters.materials.filter(m => m !== material)
      : [...activeFilters.materials, material]
    
    const updatedFilters = { ...activeFilters, materials: newMaterials }
    setActiveFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handlePlatingChange = (plating: string) => {
    const newPlatings = activeFilters.platings.includes(plating)
      ? activeFilters.platings.filter(p => p !== plating)
      : [...activeFilters.platings, plating]
    
    const updatedFilters = { ...activeFilters, platings: newPlatings }
    setActiveFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handleRatingChange = (rating: number) => {
    const newRating = activeFilters.rating === rating ? null : rating
    const updatedFilters = { ...activeFilters, rating: newRating }
    setActiveFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handleInStockChange = (inStock: boolean) => {
    const updatedFilters = { ...activeFilters, inStock }
    setActiveFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [] as string[],
      priceRange: null as { min: number; max: number } | null,
      materials: [] as string[],
      platings: [] as string[],
      rating: null as number | null,
      inStock: true,
    }
    setActiveFilters(clearedFilters)
    onFiltersChange(clearedFilters)
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < rating ? 'fill-gold text-gold' : 'text-stone-300'
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-stone-500">& up</span>
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <>
      {/* Mobile Overlay - Only show when isOpen and on mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden animate-fadeIn" onClick={onClose} aria-label="Close filters" />
      )}
      
      {/* Sidebar - Responsive behavior with smooth animation */}
      <div className={`
        fixed left-0 top-0 z-50 h-screen w-80 max-w-[90vw] overflow-y-auto bg-white shadow-2xl shadow-stone-900/10
        md:relative md:z-auto md:h-auto md:w-full md:max-w-none md:overflow-visible md:rounded-2xl md:border md:border-stone-200/80 md:bg-gradient-to-b md:from-white md:to-cream/30 md:shadow-[0_12px_40px_-16px_rgba(28,25,23,0.12)] md:ring-1 md:ring-stone-900/[0.04]
        ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 md:translate-x-0 md:opacity-100'}
        transition-all duration-300 ease-in-out transform
      `}>
        {/* Header: sticky only on mobile drawer; desktop uses static to avoid nested sticky + page scroll jank */}
        <div className="sticky top-0 z-10 border-b border-stone-200/70 bg-white/95 p-4 backdrop-blur-md sm:p-5 md:rounded-t-2xl">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-dark shadow-md">
                <Package className="h-4 w-4 text-white" />
              </div>
              <h2 className={`text-lg font-bold tracking-tight text-stone-900 ${font('headings')}`}>Refine</h2>
            </div>
            <div className="ml-auto flex items-center gap-1">
              {getActiveFilterCount() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="rounded-md px-2.5 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 sm:text-sm touch-target"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="rounded-lg p-2.5 transition-colors hover:bg-stone-100 touch-target md:hidden"
                aria-label="Close filters"
              >
                <X className="h-5 w-5 text-stone-600" />
              </button>
            </div>
          </div>
          {getActiveFilterCount() > 0 && (
            <div className="mt-3">
              <span className={`inline-flex items-center rounded-full border border-gold/30 bg-gold-light/40 px-2.5 py-1 text-xs font-semibold text-gold-dark ${font('labels')}`}>
                {getActiveFilterCount()} active
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3 p-3 sm:p-4 md:space-y-3.5 md:pb-5">
          {/* Categories */}
          <div className="rounded-xl border border-stone-200/70 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
            <button className="group flex w-full items-center justify-between rounded-lg px-1 py-2 transition-colors hover:bg-stone-50/80" onClick={() => toggleSection('categories')}>
              <div className="flex items-center gap-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100">
                  <Package className="h-3.5 w-3.5 text-stone-700" />
                </div>
                <h3 className={`font-semibold text-stone-900 transition-colors ${font('headings')}`}>Categories</h3>
              </div>
              {expandedSections.categories ? (
                <ChevronUp className="h-4 w-4 text-stone-500 transition-colors group-hover:text-gold-dark" />
              ) : (
                <ChevronDown className="h-4 w-4 text-stone-500 transition-colors group-hover:text-gold-dark" />
              )}
            </button>
            
            {expandedSections.categories && (
              <div className="space-y-1 pt-1">
                {filters.categories.map((category) => (
                  <label key={category} className="group -mx-1.5 flex cursor-pointer items-center rounded-lg px-2 py-1.5 transition-colors hover:bg-cream/30">
                    <input
                      type="checkbox"
                      checked={activeFilters.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 cursor-pointer rounded border-stone-300 text-gold-dark accent-gold focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-0"
                    />
                    <span className="ml-3 text-sm font-medium capitalize text-stone-700 transition-colors group-hover:text-stone-900">
                      {category.replace('-', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="rounded-xl border border-stone-200/70 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
            <button className="group flex w-full items-center justify-between rounded-lg px-1 py-2 transition-colors hover:bg-stone-50/80" onClick={() => toggleSection('price')}>
              <div className="flex items-center gap-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-light/50">
                  <DollarSign className="h-3.5 w-3.5 text-gold-dark" />
                </div>
                <h3 className={`font-semibold text-stone-900 transition-colors ${font('headings')}`}>Price range</h3>
              </div>
              {expandedSections.price ? (
                <ChevronUp className="h-4 w-4 text-stone-500 transition-colors group-hover:text-gold-dark" />
              ) : (
                <ChevronDown className="h-4 w-4 text-stone-500 transition-colors group-hover:text-gold-dark" />
              )}
            </button>
            
            {expandedSections.price && (
              <div className="space-y-1 pt-1">
                {filters.priceRanges.map((range) => (
                  <label key={range.label} className="group -mx-1.5 flex cursor-pointer items-center rounded-lg px-2 py-1.5 transition-colors hover:bg-cream/30">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={activeFilters.priceRange?.min === range.min && activeFilters.priceRange?.max === range.max}
                        onChange={() => handlePriceRangeChange(range.min, range.max)}
                        className="h-4 w-4 cursor-pointer rounded border-stone-300 text-gold-dark accent-gold focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-0"
                      />
                    </div>
                    <span className="ml-3 text-sm font-medium text-stone-700 transition-colors group-hover:text-stone-900">{range.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Materials */}
          <div className="rounded-xl border border-stone-200/70 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
            <button className="group flex w-full items-center justify-between rounded-lg px-1 py-2 transition-colors hover:bg-stone-50/80" onClick={() => toggleSection('materials')}>
              <div className="flex items-center gap-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100">
                  <Shield className="h-3.5 w-3.5 text-stone-700" />
                </div>
                <h3 className={`font-semibold text-stone-900 transition-colors ${font('headings')}`}>Material</h3>
              </div>
              {expandedSections.materials ? (
                <ChevronUp className="h-4 w-4 text-stone-500 transition-colors group-hover:text-gold-dark" />
              ) : (
                <ChevronDown className="h-4 w-4 text-stone-500 transition-colors group-hover:text-gold-dark" />
              )}
            </button>
            
            {expandedSections.materials && (
              <div className="space-y-1 pt-1">
                {filters.materials.map((material) => (
                  <label key={material} className="group -mx-1.5 flex cursor-pointer items-center rounded-lg px-2 py-1.5 transition-colors hover:bg-cream/30">
                    <input
                      type="checkbox"
                      checked={activeFilters.materials.includes(material)}
                      onChange={() => handleMaterialChange(material)}
                      className="h-4 w-4 cursor-pointer rounded border-stone-300 text-gold-dark accent-gold focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-0"
                    />
                    <span className="ml-3 text-sm font-medium text-stone-700 transition-colors group-hover:text-stone-900">{material}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Plating */}
          <div className="rounded-xl border border-stone-200/70 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
            <button className="group flex w-full items-center justify-between rounded-lg px-1 py-2 transition-colors hover:bg-stone-50/80" onClick={() => toggleSection('platings')}>
              <div className="flex items-center gap-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-light/40">
                  <Star className="h-3.5 w-3.5 text-gold-dark" />
                </div>
                <h3 className={`font-semibold text-stone-900 transition-colors ${font('headings')}`}>Plating</h3>
              </div>
              {expandedSections.platings ? (
                <ChevronUp className="h-4 w-4 text-stone-500 transition-colors group-hover:text-gold-dark" />
              ) : (
                <ChevronDown className="h-4 w-4 text-stone-500 transition-colors group-hover:text-gold-dark" />
              )}
            </button>
            
            {expandedSections.platings && (
              <div className="space-y-1 pt-1">
                {filters.platings.map((plating) => (
                  <label key={plating} className="group -mx-1.5 flex cursor-pointer items-center rounded-lg px-2 py-1.5 transition-colors hover:bg-cream/30">
                    <input
                      type="checkbox"
                      checked={activeFilters.platings.includes(plating)}
                      onChange={() => handlePlatingChange(plating)}
                      className="h-4 w-4 cursor-pointer rounded border-stone-300 text-gold-dark accent-gold focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-0"
                    />
                    <span className="ml-3 text-sm font-medium text-stone-700 transition-colors group-hover:text-stone-900">{plating}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="rounded-xl border border-stone-200/70 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
            <button className="group flex w-full items-center justify-between rounded-lg px-1 py-2 transition-colors hover:bg-stone-50/80" onClick={() => toggleSection('rating')}>
              <div className="flex items-center gap-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100">
                  <Star className="h-3.5 w-3.5 text-gold-dark" />
                </div>
                <h3 className={`font-semibold text-stone-900 transition-colors ${font('headings')}`}>Rating</h3>
              </div>
              {expandedSections.rating ? (
                <ChevronUp className="h-4 w-4 text-stone-500 transition-colors group-hover:text-gold-dark" />
              ) : (
                <ChevronDown className="h-4 w-4 text-stone-500 transition-colors group-hover:text-gold-dark" />
              )}
            </button>
            
            {expandedSections.rating && (
              <div className="space-y-1 pt-1">
                {filters.ratings.map((rating) => (
                  <label key={rating} className="group -mx-1.5 flex cursor-pointer items-center rounded-lg px-2 py-1.5 transition-colors hover:bg-cream/30">
                    <div className="relative flex flex-shrink-0 items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={activeFilters.rating === rating}
                        onChange={() => handleRatingChange(rating)}
                        className="h-4 w-4 cursor-pointer border-stone-300 text-gold-dark accent-gold focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-0"
                      />
                    </div>
                    <div className="ml-3">{renderStars(rating)}</div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="rounded-xl border border-stone-200/70 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100">
                  <Package className="h-3.5 w-3.5 text-stone-700" />
                </div>
                <h3 className={`font-semibold text-stone-900 ${font('headings')}`}>Availability</h3>
              </div>
            </div>
            <div className="space-y-1">
              <label className="group -mx-1.5 flex cursor-pointer items-center rounded-lg px-2 py-1.5 transition-colors hover:bg-cream/30">
                <input
                  type="checkbox"
                  checked={activeFilters.inStock}
                  onChange={(e) => handleInStockChange(e.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded border-stone-300 text-gold-dark accent-gold focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-0"
                />
                <span className="ml-3 text-sm font-medium text-stone-700 transition-colors group-hover:text-stone-900">In stock only</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
