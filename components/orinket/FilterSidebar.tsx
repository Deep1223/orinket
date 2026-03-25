'use client'

import { useState } from 'react'
import { X, ChevronDown, ChevronUp, Star, DollarSign, Package, Shield } from 'lucide-react'

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
            className={`w-3 h-3 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">& Up</span>
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <>
      {/* Mobile Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} aria-label="Close filters" />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-80 max-w-[90vw] bg-white shadow-xl z-50 overflow-y-auto lg:relative lg:shadow-none lg:z-auto lg:h-auto lg:w-auto lg:max-w-none lg:overflow-visible animate-slideInLeft lg:animate-none">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 z-10 lg:p-0 lg:border-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              {getActiveFilterCount() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 transition-colors px-2 py-1.5 touch-target"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="lg:hidden p-2.5 hover:bg-gray-100 rounded-lg transition-colors touch-target"
                aria-label="Close filters"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          {getActiveFilterCount() > 0 && (
            <div className="mt-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {getActiveFilterCount()} active
              </span>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 space-y-5 lg:space-y-6 lg:p-0">
          {/* Categories */}
          <div className="border-b border-gray-200 pb-4 lg:border-0 lg:pb-0">
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full mb-3 touch-target hover:bg-gray-50 -mx-2 px-2 rounded lg:bg-transparent lg:hover:bg-transparent lg:-mx-0 lg:px-0"
            >
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-600" />
                <h3 className="font-semibold text-gray-900 text-sm">Categories</h3>
              </div>
              {expandedSections.categories ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            
            {expandedSections.categories && (
              <div className="space-y-2.5">
                {filters.categories.map((category) => (
                  <label key={category} className="flex items-center cursor-pointer group px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors -mx-3">
                    <input
                      type="checkbox"
                      checked={activeFilters.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white cursor-pointer group-hover:border-blue-500 transition-colors"
                    />
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-700 transition-colors capitalize font-medium">
                      {category.replace('-', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="bg-gray-50 rounded-lg p-4">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center">
                  <DollarSign className="w-3 h-3 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Price Range</h3>
              </div>
              {expandedSections.price ? (
                <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-green-600 transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-green-600 transition-colors" />
              )}
            </button>
            
            {expandedSections.price && (
              <div className="space-y-2">
                {filters.priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center cursor-pointer group px-3 py-2.5 rounded-lg hover:bg-green-50 transition-colors -mx-3">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={activeFilters.priceRange?.min === range.min && activeFilters.priceRange?.max === range.max}
                        onChange={() => handlePriceRangeChange(range.min, range.max)}
                        className="w-5 h-5 text-green-600 bg-white border-2 border-gray-300 cursor-pointer focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white group-hover:border-green-500 transition-colors appearance-none"
                      />
                      <div className="absolute left-1.5 w-2.5 h-2.5 bg-green-600 rounded-full pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    </div>
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-green-700 transition-colors font-medium">{range.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Materials */}
          <div className="bg-gray-50 rounded-lg p-4">
            <button
              onClick={() => toggleSection('materials')}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center">
                  <Shield className="w-3 h-3 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Material</h3>
              </div>
              {expandedSections.materials ? (
                <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-purple-600 transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-purple-600 transition-colors" />
              )}
            </button>
            
            {expandedSections.materials && (
              <div className="space-y-2">
                {filters.materials.map((material) => (
                  <label key={material} className="flex items-center cursor-pointer group px-3 py-2.5 rounded-lg hover:bg-purple-50 transition-colors -mx-3">
                    <input
                      type="checkbox"
                      checked={activeFilters.materials.includes(material)}
                      onChange={() => handleMaterialChange(material)}
                      className="w-5 h-5 text-purple-600 bg-white border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white cursor-pointer group-hover:border-purple-500 transition-colors"
                    />
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-purple-700 transition-colors font-medium">{material}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Plating */}
          <div className="bg-gray-50 rounded-lg p-4">
            <button
              onClick={() => toggleSection('platings')}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-100 rounded-md flex items-center justify-center">
                  <Star className="w-3 h-3 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">Plating</h3>
              </div>
              {expandedSections.platings ? (
                <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-yellow-600 transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-yellow-600 transition-colors" />
              )}
            </button>
            
            {expandedSections.platings && (
              <div className="space-y-2">
                {filters.platings.map((plating) => (
                  <label key={plating} className="flex items-center cursor-pointer group px-3 py-2.5 rounded-lg hover:bg-yellow-50 transition-colors -mx-3">
                    <input
                      type="checkbox"
                      checked={activeFilters.platings.includes(plating)}
                      onChange={() => handlePlatingChange(plating)}
                      className="w-5 h-5 text-yellow-600 bg-white border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-white cursor-pointer group-hover:border-yellow-500 transition-colors"
                    />
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-yellow-700 transition-colors font-medium">{plating}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="bg-gray-50 rounded-lg p-4">
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center">
                  <Star className="w-3 h-3 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">Rating</h3>
              </div>
              {expandedSections.rating ? (
                <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-orange-600 transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-orange-600 transition-colors" />
              )}
            </button>
            
            {expandedSections.rating && (
              <div className="space-y-2">
                {filters.ratings.map((rating) => (
                  <label key={rating} className="flex items-center cursor-pointer group px-3 py-2.5 rounded-lg hover:bg-orange-50 transition-colors -mx-3">
                    <div className="relative flex items-center flex-shrink-0">
                      <input
                        type="radio"
                        name="rating"
                        checked={activeFilters.rating === rating}
                        onChange={() => handleRatingChange(rating)}
                        className="w-5 h-5 text-orange-600 bg-white border-2 border-gray-300 cursor-pointer focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white group-hover:border-orange-500 transition-colors appearance-none"
                      />
                      <div className="absolute left-1.5 w-2.5 h-2.5 bg-orange-600 rounded-full pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    </div>
                    <div className="ml-3">{renderStars(rating)}</div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-red-100 rounded-md flex items-center justify-center">
                <Package className="w-3 h-3 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Availability</h3>
            </div>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer group px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors -mx-3">
                <input
                  type="checkbox"
                  checked={activeFilters.inStock}
                  onChange={(e) => handleInStockChange(e.target.checked)}
                  className="w-5 h-5 text-red-600 bg-white border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white cursor-pointer group-hover:border-red-500 transition-colors"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-red-700 transition-colors font-medium">In Stock Only</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
