"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, Heart, ShoppingBag, Star } from "lucide-react"
import { useCart } from "@/store/useCart"
import type { Product } from "@/types/product"
import { useTimedAdded } from "@/hooks/useTimedAdded"
import { useCurrency } from "@/context/CurrencyContext"
import { font } from "@/lib/fonts"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { formatPrice } = useCurrency()
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()
  const inWishlist = isInWishlist(product.id)
  const quickAdded = useTimedAdded()
  const iconAdded = useTimedAdded()

  const handleAddToCart = (e: React.MouseEvent, source: "quick" | "icon") => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      stockLeft: product.stockLeft,
    })
    if (source === "quick") quickAdded.pulse()
    else iconAdded.pulse()
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
        stockLeft: product.stockLeft,
      })
    }
  }

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0
  const categoryLabel = product.category.replace(/-/g, " ")

  const categoryPathPart = product.categoryId || "uncategorized"

  return (
    <Link href={`/category/${categoryPathPart}/${product.id}`} className="group/card block h-full outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-2xl">
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card via-card to-cream/30 shadow-[0_2px_24px_-8px_rgba(25,18,14,0.1)] ring-1 ring-black/[0.04] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-16px_rgba(25,18,14,0.18)] hover:ring-gold/15"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-cream-dark/80 via-cream to-cream-dark/60">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-top transition-transform duration-[650ms] ease-out group-hover/card:scale-[1.06]"
            loading="eager"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.06] via-transparent to-white/[0.12] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
            aria-hidden
          />

          <div className="absolute left-3 top-3 z-10 flex max-w-[calc(100%-5rem)] flex-col gap-1.5">
            {product.isNew && (
              <span className={`inline-flex w-fit items-center border border-border/60 bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground shadow-sm backdrop-blur-sm ${font('labels')}`}>
                New
              </span>
            )}
            {product.isBestseller && (
              <span className={`inline-flex w-fit items-center border border-white/20 bg-[#1e2a3a] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f5f2eb] shadow-sm ${font('labels')}`}>
                Bestseller
              </span>
            )}
            {discount > 0 && (
              <span className={`inline-flex w-fit items-center border border-stone-200/60 bg-gradient-to-r from-[#2d3d4f] to-[#1e2a3a] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow-sm ${font('labels')}`}>
                {discount}% off
              </span>
            )}
          </div>

          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 translate-x-1 transition-all duration-300 group-hover/card:translate-x-0 group-hover/card:opacity-100">
            <button
              type="button"
              onClick={handleWishlist}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/40 shadow-lg backdrop-blur-md transition-colors hover:scale-105 ${
                inWishlist
                  ? "bg-gradient-to-br from-gold to-gold-dark text-white"
                  : "bg-white/90 text-foreground hover:bg-foreground hover:text-white"
              }`}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={(e) => handleAddToCart(e, "icon")}
              className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-colors hover:scale-105 ${
                iconAdded.added
                  ? "border-emerald-800 bg-emerald-700 text-white"
                  : "border-white/40 bg-white/90 text-foreground hover:bg-foreground hover:text-white"
              }`}
              aria-label={iconAdded.added ? "Added to cart" : "Add to cart"}
            >
              {iconAdded.added ? (
                <Check className="h-4 w-4" strokeWidth={2.5} />
              ) : (
                <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 border-t border-border/40 bg-gradient-to-b from-white/90 to-cream/20 px-3 pb-3.5 pt-3 sm:gap-3 sm:px-5 sm:pb-5 sm:pt-4">
          <p className={`text-[10px] uppercase tracking-[0.28em] text-gold-dark/90 ${font('labels')}`}>
            {categoryLabel}
          </p>

          <h3 className={`line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover/card:text-gold-dark sm:text-[15px] ${font('headings')}`}>
            {product.name}
          </h3>

          {product.rating != null && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                      i < Math.floor(product.rating!)
                        ? "fill-gold text-gold"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span className={`text-xs font-medium tabular-nums text-foreground/90 ${font('body')}`}>
                {product.rating}
              </span>
              <span className={`text-xs text-muted-foreground ${font('body')}`}>
                ({product.reviews ?? 0})
              </span>
            </div>
          )}

          <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-border/30 pt-3">
            <span className={`text-base font-semibold tabular-nums tracking-tight text-foreground sm:text-lg ${font('headings')}`}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className={`text-sm text-muted-foreground line-through tabular-nums ${font('body')}`}>
                  {formatPrice(product.originalPrice)}
                </span>
                {discount > 0 && (
                  <span className={`text-[10px] font-semibold uppercase tracking-wider text-[#3d5a4a] ${font('labels')}`}>
                    Save {discount}%
                  </span>
                )}
              </>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => handleAddToCart(e, "quick")}
            disabled={quickAdded.added}
            className={`mt-1 flex w-full items-center justify-center gap-2 rounded-sm border py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${font('buttons')} ${
              quickAdded.added
                ? "cursor-default border-emerald-800 bg-emerald-700 text-white"
                : "border-border/50 bg-cream/40 text-foreground hover:border-foreground/20 hover:bg-foreground hover:text-white"
            }`}
          >
            {quickAdded.added ? (
              <>
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                Added to cart
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" strokeWidth={2} />
                Quick add
              </>
            )}
          </button>
        </div>
      </article>
    </Link>
  )
}
