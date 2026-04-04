"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Heart, ShoppingBag } from "lucide-react"
import type { Product } from "@/types/product"
import { useCart } from "@/store/useCart"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectShowGridListShimmer,
  selectTopStylesError,
  selectTopStylesItems,
  selectTopStylesStatus,
  selectTopStylesTotalCount,
} from "@/store/selectors"
import GridListShimmer from "@/components/orinket/GridListShimmer"
import { fetchTopStyles } from "@/store/slices/topStylesSlice"
import { topStyleLabelToTab } from "@/lib/topStyles/labelToTabSlug"
import { slugifyLabel } from "@/lib/slugify"
import { fonts } from "@/lib/fonts"
import { useCurrency } from "@/context/CurrencyContext"
import { useStorefrontCms } from "@/hooks/useStorefrontCms"
import { selectCatalogCategories } from "@/store/selectors"

type RowProduct = Product & { discount: number }

function TopStyleProductTile({
  product,
  index,
  formatPrice,
}: {
  product: RowProduct
  index: number
  formatPrice: (n: number) => string
}) {
  const tileImageSrc = typeof product.image === "string" ? product.image.trim() : ""
  const formatTilePrice = (price: number | undefined) => {
    if (price == null || price <= 0) return formatPrice(0)
    return formatPrice(price)
  }
  const categoryPathPart = product.categoryId || "uncategorized"
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useCart()
  const [bagAdded, setBagAdded] = useState(false)
  const [oosHint, setOosHint] = useState<string | null>(null)
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
        image: tileImageSrc,
        category: product.category,
        stockLeft: product.stockLeft,
      })
    }
  }

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.inStock) {
      setOosHint("Out of stock")
      window.setTimeout(() => setOosHint(null), 2200)
      return
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: tileImageSrc,
      stockLeft: product.stockLeft,
    })
    setBagAdded(true)
  }

  return (
    <Link
      href={`/category/${categoryPathPart}/${product.id}`}
      className="group animate-slideUp relative block cursor-pointer"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <div className="relative mb-4 aspect-square overflow-hidden bg-gray-50 rounded-lg shadow-md">
        {tileImageSrc ? (
          <Image
            src={tileImageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gray-100" aria-hidden />
        )}

        <button
          type="button"
          onClick={handleWishlist}
          className="absolute right-3 top-3 rounded-full bg-white/95 p-2.5 shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl"
          aria-label={inList ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-4 w-4 ${inList ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
        </button>

        {product.discount > 0 ? (
          <span className={`absolute left-3 top-3 bg-black px-3 py-1.5 rounded-full ${fonts.labels} text-xs text-white font-light`}>
            {product.discount}% OFF
          </span>
        ) : null}

        <div className="absolute bottom-0 left-0 right-0 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={handleAddToBag}
            disabled={bagAdded}
            className={`flex w-full items-center justify-center gap-2 py-3 ${fonts.buttons} text-sm tracking-wider transition-colors ${
              bagAdded ? "bg-emerald-700 text-white" : "bg-foreground text-background"
            }`}
          >
            {bagAdded ? (
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
          {oosHint && (
            <p className={`bg-white/95 px-2 py-1 text-center text-[11px] text-amber-900 ${fonts.labels}`}>
              {oosHint}
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

function useTopStylesPageSize(): number {
  const [limit, setLimit] = useState(8)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const sync = () => setLimit(mq.matches ? 8 : 4)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  return limit
}

const MIN_PRODUCTS_FOR_VIEW_ALL = 8

export default function TopStyles() {
  const { formatPrice } = useCurrency()
  const dispatch = useAppDispatch()
  const { settings } = useStorefrontCms()
  const catalogCategoryRows = useAppSelector(selectCatalogCategories)
  const [activeCategory, setActiveCategory] = useState("ALL")
  const visibleLimit = useTopStylesPageSize()

  const items = useAppSelector(selectTopStylesItems)
  const status = useAppSelector(selectTopStylesStatus)
  const error = useAppSelector(selectTopStylesError)
  const topStylesTotalCount = useAppSelector(selectTopStylesTotalCount)
  const showGridShimmer = useAppSelector(selectShowGridListShimmer)

  const categories = useMemo(
    () => ["ALL", ...catalogCategoryRows.map((c) => c.displayName.toUpperCase())],
    [catalogCategoryRows]
  )

  const sectionTitle = useMemo(() => {
    const name = settings?.storeName?.trim() || "Shop"
    return `${name.toUpperCase()} TOP STYLES`
  }, [settings?.storeName])

  useEffect(() => {
    if (categories.length && !categories.includes(activeCategory)) {
      setActiveCategory(categories[0]!)
    }
  }, [categories, activeCategory])

  const tab = topStyleLabelToTab(activeCategory)
  const activeCategoryId = useMemo(() => {
    if (activeCategory === "ALL") return undefined
    return catalogCategoryRows.find(
      (c) => c.displayName.toUpperCase() === activeCategory.toUpperCase()
    )?.id
  }, [activeCategory, catalogCategoryRows])

  useEffect(() => {
    dispatch(
      fetchTopStyles({
        categoryid: activeCategoryId,
        pageno: 1,
        pagelimit: visibleLimit,
      })
    )
  }, [dispatch, activeCategoryId, visibleLimit])

  const rowProducts = useMemo((): RowProduct[] => {
    return items
      .filter((product) => {
        const keys = product.storefrontHomeSectionKeys
        return Array.isArray(keys) && keys.includes("topStylesProducts")
      })
      .map((product) => ({
        ...product,
        discount: 0, // Discount managed per-product or fixed at 0 since master is gone
      }))
  }, [items])

  const viewAllHref = useMemo(() => {
    if (activeCategory === "ALL") return "/category/all"
    const tabSlug = topStyleLabelToTab(activeCategory)
    const stripTrailingS = (s: string) =>
      s.length > 1 ? s.replace(/s$/i, "") : s
    const row = catalogCategoryRows.find((c) => {
      const cSlug = String(c.slug || "").trim().toLowerCase()
      const fromName = slugifyLabel(String(c.displayName || ""))
      return (
        cSlug === tabSlug ||
        fromName === tabSlug ||
        stripTrailingS(cSlug) === stripTrailingS(tabSlug) ||
        stripTrailingS(fromName) === stripTrailingS(tabSlug)
      )
    })
    if (row?.id) return `/category/${row.id}`
    // Fallback to slug route; category page will canonicalize to `/category/<id>` once catalog resolves.
    return `/category/${tabSlug || "all"}`
  }, [activeCategory, catalogCategoryRows])

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className={`mb-8 animate-fadeIn ${fonts.headings} text-3xl font-light tracking-[0.1em] md:text-4xl`}>
            {sectionTitle}
          </h2>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category, index: number) => (
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

        {(showGridShimmer || status === "loading") && (
          <div className="py-2">
            <GridListShimmer count={visibleLimit} />
          </div>
        )}

        {status === "failed" && error && !showGridShimmer && (
          <p className={`py-8 text-center text-sm text-red-700 ${fonts.body}`}>{error}</p>
        )}

        {status === "succeeded" && rowProducts.length === 0 && !showGridShimmer && (
          <div className={`mx-auto max-w-md py-16 text-center ${fonts.body}`}>
            <p className="text-base font-medium text-stone-800">Products not available</p>
            <p className="mt-2 text-sm text-muted-foreground">
              There are no products to show for this category right now. Try another tab or check back later.
            </p>
          </div>
        )}

        {status === "succeeded" && rowProducts.length > 0 && !showGridShimmer && (
          <>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
              {rowProducts.map((product: RowProduct, index: number) => (
                <TopStyleProductTile
                  key={product.id ? `${product.id}-${index}` : `top-style-${index}`}
                  product={product}
                  index={index}
                  formatPrice={formatPrice}
                />
              ))}
            </div>

            {topStylesTotalCount >= MIN_PRODUCTS_FOR_VIEW_ALL ? (
              <div className="mt-12 text-center">
                <Link
                  href={viewAllHref}
                  className={`animate-slideUp inline-block border border-foreground px-8 py-3 ${fonts.buttons} text-sm tracking-[0.2em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:shadow-lg`}
                  style={{ animationDelay: "600ms" }}
                >
                  VIEW ALL
                </Link>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  )
}
