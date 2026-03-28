"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Truck, RotateCcw, Shield, Star, Minus, Plus, ChevronRight } from "lucide-react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import { getProductById, dummyProducts } from "@/data/dummyProducts"
import ProductCard from "@/components/orinket/ProductCard"
import { useCart } from "@/context/CartContext"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const product = getProductById(id)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("specifications")
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-4">
              Product Not Found
            </h1>
            <p className="text-muted-foreground font-[family-name:var(--font-nunito)] mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/"
              className="inline-block py-3 px-8 bg-foreground text-white font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors"
            >
              BACK TO HOME
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)
  const images = product.images || [product.image]
  const relatedProducts = dummyProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

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
          <div className="flex items-center gap-2 text-sm font-[family-name:var(--font-nunito)] text-muted-foreground">
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
                    <span className="bg-foreground text-white text-xs px-3 py-1 font-[family-name:var(--font-nunito)] tracking-wider">
                      NEW
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-gold text-white text-xs px-3 py-1 font-[family-name:var(--font-nunito)] tracking-wider">
                      BESTSELLER
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? "text-gold fill-gold" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-[family-name:var(--font-nunito)] text-muted-foreground">
                  {product.rating || 0} ({product.reviews || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-semibold font-[family-name:var(--font-nunito)] text-foreground">
                  Rs.{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through font-[family-name:var(--font-nunito)]">
                      Rs.{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-red-500 font-[family-name:var(--font-nunito)]">
                      Save Rs.{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground font-[family-name:var(--font-nunito)] text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Material */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-2">
                  MATERIAL
                </h3>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-nunito)]">
                  {product.material}
                </p>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-3">
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
                    <span className="w-12 text-center font-[family-name:var(--font-nunito)]">
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
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-foreground text-white font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors"
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
                className="w-full py-4 bg-gold text-white text-center font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors mb-8"
              >
                BUY NOW
              </Link>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-border">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-gold" />
                  <p className="text-xs font-[family-name:var(--font-nunito)] text-muted-foreground">
                    Free Shipping
                  </p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-gold" />
                  <p className="text-xs font-[family-name:var(--font-nunito)] text-muted-foreground">
                    Easy Returns
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-gold" />
                  <p className="text-xs font-[family-name:var(--font-nunito)] text-muted-foreground">
                    Secure Payment
                  </p>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="border-t border-border pt-6">
                {/* Tab Navigation */}
                <div className="flex gap-6 mb-6 border-b border-border">
                  {["specifications", "material", "shipping", "size"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 font-[family-name:var(--font-nunito)] text-sm font-semibold tracking-wider transition-colors ${
                        activeTab === tab
                          ? "text-foreground border-b-2 border-gold -mb-6 pb-4"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab === "specifications" && "SPECIFICATIONS"}
                      {tab === "material" && "MATERIAL & CARE"}
                      {tab === "shipping" && "SHIPPING INFO"}
                      {tab === "size" && "SIZE GUIDE"}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === "specifications" && (
                  <div>
                    <h3 className="text-sm font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-4">
                      PRODUCT DETAILS
                    </h3>
                    <ul className="space-y-3">
                      {product.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground font-[family-name:var(--font-nunito)]">
                          <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "material" && (
                  <div>
                    <h3 className="text-sm font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-4">
                      MATERIAL
                    </h3>
                    <p className="text-sm text-muted-foreground font-[family-name:var(--font-nunito)] mb-6">
                      {product.material}
                    </p>
                    <h3 className="text-sm font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-4">
                      CARE INSTRUCTIONS
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground font-[family-name:var(--font-nunito)]">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1 flex-shrink-0" />
                        Keep away from water, perfume, and harsh chemicals
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1 flex-shrink-0" />
                        Store in a cool, dry place
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1 flex-shrink-0" />
                        Clean with a soft, dry cloth
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1 flex-shrink-0" />
                        Avoid extreme temperatures
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div>
                    <h3 className="text-sm font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-4">
                      SHIPPING INFORMATION
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground font-[family-name:var(--font-nunito)]">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1 flex-shrink-0" />
                        Free shipping on all orders across India
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1 flex-shrink-0" />
                        Delivery within 5-7 business days
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1 flex-shrink-0" />
                        30 days easy returns and exchanges
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1 flex-shrink-0" />
                        Secure packaging and insured shipment
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === "size" && (
                  <div>
                    <h3 className="text-sm font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-4">
                      SIZE GUIDE
                    </h3>
                    <p className="text-sm text-muted-foreground font-[family-name:var(--font-nunito)] mb-4">
                      Most of our jewelry pieces are adjustable or one size fits all. For rings, please refer to your ring size chart.
                    </p>
                    <table className="w-full text-sm font-[family-name:var(--font-nunito)]">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 text-foreground font-semibold">Type</th>
                          <th className="text-left py-2 text-foreground font-semibold">Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="py-2 text-muted-foreground">Bracelets</td>
                          <td className="py-2 text-muted-foreground">One size fits most (adjustable)</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 text-muted-foreground">Necklaces</td>
                          <td className="py-2 text-muted-foreground">16-18 inches (adjustable)</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-muted-foreground">Rings</td>
                          <td className="py-2 text-muted-foreground">Multiple sizes available</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complete Your Look Section */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 py-12 border-t border-border">
            <h2 className="text-2xl md:text-3xl font-semibold font-[family-name:var(--font-nunito)] text-foreground text-center mb-2">
              Complete Your Look
            </h2>
            <p className="text-center text-muted-foreground font-[family-name:var(--font-nunito)] text-sm mb-8">
              Explore complementary pieces to complete your style
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 py-12 border-t border-border">
            <h2 className="text-2xl md:text-3xl font-semibold font-[family-name:var(--font-nunito)] text-foreground text-center mb-8">
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
