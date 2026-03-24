"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Truck, RotateCcw, Shield, Star, Minus, Plus, ChevronRight } from "lucide-react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import ProductCard from "@/components/orinket/ProductCard"
import { useCart } from "@/context/CartContext"
import { getProductById, products } from "@/data/products"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const product = getProductById(id)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()

  if (!product) {
    notFound()
  }

  const inWishlist = isInWishlist(product.id)
  const images = product.images || [product.image]
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    }, quantity)
  }

  const handleWishlist = () => {
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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm font-[family-name:var(--font-montserrat)] text-muted-foreground">
            <Link href="/" className="hover:text-gold-dark transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/category/${product.category}`} className="hover:text-gold-dark transition-colors capitalize">
              {product.category.replace("-", " ")}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>

        {/* Product Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="hidden md:flex flex-col gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-gold" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 relative aspect-square bg-cream-dark rounded-sm overflow-hidden">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-foreground text-white text-xs px-3 py-1 font-[family-name:var(--font-montserrat)] tracking-wider">
                      NEW
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-gold text-white text-xs px-3 py-1 font-[family-name:var(--font-montserrat)] tracking-wider">
                      BESTSELLER
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-semibold font-[family-name:var(--font-cormorant)] text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-[family-name:var(--font-montserrat)] text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-semibold font-[family-name:var(--font-montserrat)] text-foreground">
                  Rs.{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through font-[family-name:var(--font-montserrat)]">
                      Rs.{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-red-500 font-[family-name:var(--font-montserrat)]">
                      Save Rs.{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground font-[family-name:var(--font-montserrat)] text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Material */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold font-[family-name:var(--font-montserrat)] text-foreground mb-2">
                  MATERIAL
                </h3>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                  {product.material}
                </p>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold font-[family-name:var(--font-montserrat)] text-foreground mb-3">
                  QUANTITY
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-cream transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-[family-name:var(--font-montserrat)]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-cream transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-foreground text-white font-[family-name:var(--font-montserrat)] tracking-wider hover:bg-gold-dark transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  ADD TO BAG
                </button>
                <button
                  onClick={handleWishlist}
                  className={`p-4 border transition-colors ${
                    inWishlist 
                      ? "bg-gold text-white border-gold" 
                      : "border-border hover:border-gold hover:text-gold"
                  }`}
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Buy Now */}
              <Link
                href={`/checkout?product=${product.id}&quantity=${quantity}`}
                className="w-full py-4 bg-gold text-white text-center font-[family-name:var(--font-montserrat)] tracking-wider hover:bg-gold-dark transition-colors mb-8"
              >
                BUY NOW
              </Link>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-border">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-gold" />
                  <p className="text-xs font-[family-name:var(--font-montserrat)] text-muted-foreground">
                    Free Shipping
                  </p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-gold" />
                  <p className="text-xs font-[family-name:var(--font-montserrat)] text-muted-foreground">
                    Easy Returns
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-gold" />
                  <p className="text-xs font-[family-name:var(--font-montserrat)] text-muted-foreground">
                    Secure Payment
                  </p>
                </div>
              </div>

              {/* Product Details */}
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-semibold font-[family-name:var(--font-montserrat)] text-foreground mb-4">
                  PRODUCT DETAILS
                </h3>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 py-12 border-t border-border">
            <h2 className="text-2xl md:text-3xl font-semibold font-[family-name:var(--font-cormorant)] text-foreground text-center mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
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
