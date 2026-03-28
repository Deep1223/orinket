"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star, Truck, Shield } from "lucide-react"
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
    e.stopPropagation()
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
    e.stopPropagation()
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
    <Link href={`/product/${product.id}`} className="group block h-full cursor-pointer">
      <div className="relative overflow-hidden rounded-3xl h-full flex flex-col transition-all duration-500 hover:shadow-xl bg-white hover:-translate-y-2 animate-fadeIn border border-gray-150 shadow-md">
        {/* Product Image Container */}
        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-2 transition-opacity duration-300" />
        </div>

        {/* Premium Badges */}
        <div className="absolute top-5 left-5 flex flex-col gap-2.5 z-10">
          {product.isNew && (
            <span className="bg-white/98 backdrop-blur-sm text-gray-900 text-xs font-bold px-3.5 py-2 rounded-full shadow-md border border-gray-200 animate-slideInLeft">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-gray-900/98 backdrop-blur-sm text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-md animate-slideInLeft" style={{ animationDelay: "50ms" }}>
              BESTSELLER
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500/95 backdrop-blur-sm text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-md">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Action Buttons - Hover Effect */}
        <div className="absolute top-5 right-5 flex flex-col gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 z-20">
          <button
            onClick={handleWishlist}
            className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 transform hover:scale-110 ${
              inWishlist 
                ? "bg-red-500 text-white" 
                : "bg-white/95 hover:bg-red-500 hover:text-white text-gray-700"
            }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-5 h-5 transition-all duration-300 ${inWishlist ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-3 bg-white/95 backdrop-blur-md rounded-full shadow-lg hover:bg-gray-900 hover:text-white text-gray-700 transition-all duration-300 transform hover:scale-110"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-5 h-5 transition-all duration-300" />
          </button>
        </div>

        {/* Quick Add Button - Slide Up */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-gradient-to-r from-gray-950 via-gray-900 to-black text-white text-sm font-bold font-[family-name:var(--font-nunito)] tracking-wide hover:from-gray-900 hover:via-gray-800 hover:to-gray-950 transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            <ShoppingBag className="w-4 h-4" />
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="mt-5 px-0.5 flex-1 flex flex-col justify-between gap-3.5">
        {/* Product Name */}
        <div>
          <h3 className="text-sm font-semibold font-[family-name:var(--font-nunito)] text-gray-900 mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-amber-700 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Rating Section */}
        {product.rating && (
          <div className="flex items-center gap-2.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 transition-all duration-300 ${
                    i < Math.floor(product.rating!)
                      ? "text-amber-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-700 font-semibold">
              {product.rating}
            </span>
            <span className="text-xs text-gray-500">
              ({product.reviews || 0})
            </span>
          </div>
        )}

        {/* Price Display */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through font-[family-name:var(--font-nunito)]">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-gray-700" />
            <span className="text-xs">Free Shipping</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-gray-700" />
            <span className="text-xs">Secure</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

