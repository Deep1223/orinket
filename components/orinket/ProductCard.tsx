"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { useCart } from "@/context/CartContext"
import type { Product } from "@/data/dummyProducts"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
      })
    }
  }

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <div className="relative overflow-hidden rounded-2xl h-full flex flex-col transition-all duration-500 hover:shadow-2xl bg-white hover:-translate-y-1 animate-fadeIn border border-gray-100">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-3 transition-opacity duration-300" />
        </div>

        {/* Premium Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="bg-white/95 backdrop-blur-md text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-gray-200 animate-slideInLeft">
              ✨ NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-gray-900/95 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-slideInLeft" style={{ animationDelay: "50ms" }}>
              ⭐ BESTSELLER
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500/95 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button
            onClick={handleWishlist}
            className={`p-2.5 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 transform hover:scale-110 ${
              inWishlist 
                ? "bg-red-500 text-white" 
                : "bg-white/95 hover:bg-red-500 hover:text-white text-gray-600"
            }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-5 h-5 transition-all duration-300 ${inWishlist ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg hover:bg-gray-900 hover:text-white text-gray-600 transition-all duration-300 transform hover:scale-110"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-5 h-5 transition-all duration-300" />
          </button>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <button
            onClick={handleAddToCart}
            className="w-full py-3.5 bg-gradient-to-r from-gray-900 to-black text-white text-sm font-semibold font-[family-name:var(--font-nunito)] tracking-wider hover:from-gray-800 hover:to-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            ADD TO BAG
          </button>
        </div>
      </div>

      {/* Product Info - Premium Spacing */}
      <div className="mt-5 px-1 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold font-[family-name:var(--font-nunito)] text-gray-900 mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-yellow-700 leading-tight">
            {product.name}
          </h3>
        </div>
        <div>
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 transition-all duration-300 ${
                      i < Math.floor(product.rating!)
                        ? "text-yellow-500 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600 font-medium">
                {product.rating}
              </span>
              <span className="text-xs text-gray-500">
                ({product.reviews || 0})
              </span>
            </div>
          )}
          {/* Price Display */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through font-[family-name:var(--font-nunito)]">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

