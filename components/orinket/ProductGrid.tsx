'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Star, Truck, Shield } from 'lucide-react'
import { Product } from '@/data/dummyProducts'
import { useCart } from '@/context/CartContext'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
}

export default function ProductGrid({ products, loading = false }: ProductGridProps) {
  const { addToCart, wishlistItems, addToWishlist, removeFromWishlist } = useCart()

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image
    }, 1)
  }

  const handleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    
    const isInWishlist = wishlistItems.some(item => item.id === product.id)
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No products found</h3>
            <p className="text-gray-600 mb-8">We couldn't find any products matching your criteria.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const isInWishlist = wishlistItems.some(item => item.id === product.id)
            const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0
            
            return (
              <div key={product.id} className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                {/* Product Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  
                  {/* Premium Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        NEW
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        BESTSELLER
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={(e) => handleWishlist(e, product)}
                      className={`p-2.5 rounded-full bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
                        isInWishlist ? 'text-red-500 hover:bg-red-50' : 'text-gray-600 hover:text-red-500'
                      }`}
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Quick Add to Cart Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-white text-gray-900 py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-yellow-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Product Info - Professional White Space */}
                <div className="p-5 bg-white">
                  {/* Product Name */}
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-yellow-700 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating!)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {product.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>
                  )}

                  {/* Price Display */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Product Features */}
                  <div className="flex items-center justify-between mb-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>Secure</span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-3 px-4 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

