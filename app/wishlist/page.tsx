"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, X, ArrowLeft } from "lucide-react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import ProductCard from "@/components/orinket/ProductCard"
import { useCart } from "@/context/CartContext"
import { dummyProducts } from "@/data/dummyProducts"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart()

  const handleAddToCart = (item: typeof wishlistItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
    })
  }

  const recommendedProducts = dummyProducts
    .filter(p => !wishlistItems.find(w => w.id === p.id))
    .slice(0, 4)

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4 py-16">
            <Heart className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-2xl md:text-3xl font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-muted-foreground font-[family-name:var(--font-nunito)] mb-8">
              Save your favorite pieces to your wishlist and shop them later.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-white font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              EXPLORE COLLECTION
            </Link>
          </div>
        </main>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-semibold font-[family-name:var(--font-nunito)] text-foreground text-center mb-8">
              You May Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold font-[family-name:var(--font-nunito)] text-foreground animate-fadeIn">
              My Wishlist ({wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"})
            </h1>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistItems.map((item, index) => (
              <div key={item.id} className="group relative animate-slideUp" style={{ animationDelay: `${index * 75}ms` }}>
                <Link href={`/product/${item.id}`} className="block">
                  <div className="relative overflow-hidden bg-cream-dark rounded-sm">
                    <div className="aspect-square relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        removeFromWishlist(item.id)
                      }}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <X className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                    </button>

                    {/* Add to Cart Button */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          handleAddToCart(item)
                        }}
                        className="w-full py-3 bg-foreground text-white text-sm font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        ADD TO BAG
                      </button>
                    </div>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="mt-4 text-center">
                  <Link href={`/product/${item.id}`}>
                    <h3 className="text-sm font-[family-name:var(--font-nunito)] text-foreground hover:text-gold-dark transition-colors mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base font-semibold font-[family-name:var(--font-nunito)] text-foreground">
                      Rs.{item.price.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through font-[family-name:var(--font-nunito)]">
                        Rs.{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add All to Cart */}
          <div className="mt-8 text-center">
            <button
              onClick={() => wishlistItems.forEach(handleAddToCart)}
              className="px-8 py-4 bg-gold text-white font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors"
            >
              ADD ALL TO BAG
            </button>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 py-12 border-t border-border">
            <h2 className="text-2xl font-semibold font-[family-name:var(--font-nunito)] text-foreground text-center mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

