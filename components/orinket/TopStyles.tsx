"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Heart, ShoppingBag } from "lucide-react"
import { dummyProducts, type Product } from "@/data/dummyProducts"
import { useCart } from "@/context/CartContext"
import { useTimedAdded, useTimedHint } from "@/hooks/useTimedAdded"
import { topStyles, productIds } from "@/dummydata/top-styles/content"
import { fonts } from "@/lib/fonts"
import { useCurrency } from "@/context/CurrencyContext"

const sampleProducts = productIds.map(id => 
  dummyProducts.find((p) => p.id === id) || dummyProducts[0]
).filter(Boolean) as Product[]

const products = sampleProducts.map((product) => ({
  ...product,
  discount: topStyles.discount,
}))

type RowProduct = (typeof products)[number]

function TopStyleProductTile({
  product,
  index,
  formatPrice,
}: {
  product: RowProduct
  index: number
  formatPrice: (n: number) => string
}) {
  const formatTilePrice = (price: number | undefined) => {
    if (price == null || price <= 0) return formatPrice(0)
    return formatPrice(price)
  }
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useCart()
  const bagAdded = useTimedAdded()
  const oosHint = useTimedHint(2200)
  const inList = isInWishlist(product.id)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inList) {
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

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.inStock) {
      oosHint.show("Out of stock")
      return
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    })
    bagAdded.pulse()
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="group animate-slideUp relative block cursor-pointer"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <div className="relative mb-4 aspect-square overflow-hidden bg-gray-50 rounded-lg shadow-md">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={handleWishlist}
          className="absolute right-3 top-3 rounded-full bg-white/95 p-2.5 shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl"
          aria-label={inList ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-4 w-4 ${inList ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
        </button>

        <span className={`absolute left-3 top-3 bg-black px-3 py-1.5 rounded-full ${fonts.labels} text-xs text-white font-light`}>
          {product.discount}% OFF
        </span>

        <div className="absolute bottom-0 left-0 right-0 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={handleAddToBag}
            disabled={bagAdded.added}
            className={`flex w-full items-center justify-center gap-2 py-3 ${fonts.buttons} text-sm tracking-wider transition-colors ${
              bagAdded.added ? "bg-emerald-700 text-white" : "bg-foreground text-background"
            }`}
          >
            {bagAdded.added ? (
              <>
                <Check className="h-4 w-4" strokeWidth={2.5} />
                Added to cart
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                ADD TO BAG
              </>
            )}
          </button>
          {oosHint.hint && (
            <p className={`bg-white/95 px-2 py-1 text-center text-[11px] text-amber-900 ${fonts.labels}`}>
              {oosHint.hint}
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className={`mb-2 line-clamp-2 ${fonts.body} text-sm font-medium transition-colors group-hover:text-gold-dark md:text-base`}>
          {product.name}
        </h3>
        <div className={`flex items-center gap-2 ${fonts.body}`}>
          <span className="text-sm font-medium">{formatTilePrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatTilePrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function TopStyles() {
  const { formatPrice } = useCurrency()
  const [activeCategory, setActiveCategory] = useState("ALL")

  const filteredProducts =
    activeCategory === "ALL"
      ? products
      : products.filter((p: RowProduct) => p.category === activeCategory.toLowerCase())

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className={`mb-8 animate-fadeIn ${fonts.headings} text-3xl font-light tracking-[0.1em] md:text-4xl`}>
            {topStyles.title}
          </h2>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {topStyles.categories.map((category, index: number) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 ${fonts.buttons} text-xs tracking-wider transition-all duration-300 animate-slideUp hover:shadow-sm md:text-sm ${
                  activeCategory === category
                    ? "bg-foreground text-background shadow-md"
                    : "bg-transparent text-foreground hover:bg-cream"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          {filteredProducts.slice(0, 8).map((product: RowProduct, index: number) => (
            <TopStyleProductTile
              key={product.id}
              product={product}
              index={index}
              formatPrice={formatPrice}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={
              activeCategory === "ALL"
                ? "/category/all"
                : `/category/${activeCategory.toLowerCase()}`
            }
            className={`animate-slideUp inline-block border border-foreground px-8 py-3 ${fonts.buttons} text-sm tracking-[0.2em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:shadow-lg`}
            style={{ animationDelay: "600ms" }}
          >
            VIEW ALL
          </Link>
        </div>
      </div>
    </section>
  )
}
