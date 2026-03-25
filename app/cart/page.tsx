"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ShoppingBag, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import { useCart } from "@/context/CartContext"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  const shipping = cartTotal >= 2999 ? 0 : 99
  const discount = 0
  const total = cartTotal + shipping - discount

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4 py-16">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-2xl md:text-3xl font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-4">
              Your Bag is Empty
            </h1>
            <p className="text-muted-foreground font-[family-name:var(--font-nunito)] mb-8">
              Looks like you haven't added anything to your bag yet.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-white font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              CONTINUE SHOPPING
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-8">
            Shopping Bag ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-cream rounded-sm">
                  {/* Product Image */}
                  <Link href={`/product/${item.id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-sm overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-[family-name:var(--font-nunito)] text-foreground hover:text-gold-dark transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {item.variant && (
                      <p className="text-sm text-muted-foreground font-[family-name:var(--font-nunito)] mt-1">
                        {item.variant}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold font-[family-name:var(--font-nunito)]">
                        Rs.{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through font-[family-name:var(--font-nunito)]">
                          Rs.{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-3">
                      {/* Quantity */}
                      <div className="flex items-center border border-border bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-cream transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center text-sm font-[family-name:var(--font-nunito)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-cream transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="font-semibold font-[family-name:var(--font-nunito)]">
                        Rs.{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-red-500 transition-colors font-[family-name:var(--font-nunito)]"
              >
                Clear all items
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-cream p-6 rounded-sm sticky top-32">
                <h2 className="text-lg font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-6">
                  Order Summary
                </h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-3 border border-border bg-white text-sm font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold"
                    />
                    <button className="px-4 py-3 bg-foreground text-white text-sm font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors">
                      APPLY
                    </button>
                  </div>
                </div>

                {/* Summary Details */}
                <div className="space-y-3 text-sm font-[family-name:var(--font-nunito)]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>Rs.{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `Rs.${shipping}`}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-Rs.{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-base">
                      <span>Total</span>
                      <span>Rs.{total.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      (Inclusive of all taxes)
                    </p>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {shipping > 0 && (
                  <div className="mt-4 p-3 bg-gold-light/50 rounded-sm">
                    <p className="text-xs text-center font-[family-name:var(--font-nunito)] text-foreground">
                      Add Rs.{(2999 - cartTotal).toLocaleString()} more for FREE shipping
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full mt-6 py-4 bg-gold text-white text-center font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors block"
                >
                  PROCEED TO CHECKOUT
                </Link>

                {/* Continue Shopping */}
                <Link
                  href="/"
                  className="w-full mt-3 py-3 border border-foreground text-foreground text-center font-[family-name:var(--font-nunito)] tracking-wider hover:bg-foreground hover:text-white transition-colors block text-sm"
                >
                  CONTINUE SHOPPING
                </Link>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="text-center">
                    <Truck className="w-5 h-5 mx-auto mb-1 text-gold" />
                    <p className="text-xs font-[family-name:var(--font-nunito)] text-muted-foreground">
                      Free Ship
                    </p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-5 h-5 mx-auto mb-1 text-gold" />
                    <p className="text-xs font-[family-name:var(--font-nunito)] text-muted-foreground">
                      Easy Return
                    </p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-5 h-5 mx-auto mb-1 text-gold" />
                    <p className="text-xs font-[family-name:var(--font-nunito)] text-muted-foreground">
                      Secure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

