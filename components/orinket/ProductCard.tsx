"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/CartContext"
import type { Product } from "@/data/products"

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

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-cream-dark rounded-sm">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-foreground text-white text-xs px-2 py-1 font-[family-name:var(--font-montserrat)] tracking-wider">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-gold text-white text-xs px-2 py-1 font-[family-name:var(--font-montserrat)] tracking-wider">
              BESTSELLER
            </span>
          )}
          {product.discount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 font-[family-name:var(--font-montserrat)] tracking-wider">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full shadow-md transition-colors ${
              inWishlist ? "bg-gold text-white" : "bg-white hover:bg-gold hover:text-white"
            }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gold hover:text-white transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform">
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-foreground text-white text-sm font-[family-name:var(--font-montserrat)] tracking-wider hover:bg-gold-dark transition-colors"
          >
            ADD TO BAG
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <h3 className="text-sm font-[family-name:var(--font-montserrat)] text-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-2">
          <span className="text-base font-semibold font-[family-name:var(--font-montserrat)] text-foreground">
            Rs.{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through font-[family-name:var(--font-montserrat)]">
              Rs.{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-gold" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-[family-name:var(--font-montserrat)]">
            ({product.reviews})
          </span>
        </div>
      </div>
    </Link>
  )
}
