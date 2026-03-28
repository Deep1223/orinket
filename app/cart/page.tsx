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
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-white font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors rounded-lg touch-target"
            >
              <ArrowLeft className="w-4 h-4" />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[family-name:var(--font-nunito)] text-foreground mb-6 sm:mb-8">
            Shopping Bag <span className="font-normal text-gray-600">({cartItems.length} {cartItems.length === 1 ? "item" : "items"})</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 pb-20 lg:pb-0">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <Link href={`/product/${item.id}`} className="flex-shrink-0">
                    <div className="w-full sm:w-28 md:w-32 aspect-square relative rounded-lg overflow-hidden bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-2">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-semibold font-[family-name:var(--font-nunito)] text-foreground hover:text-gold-dark transition-colors text-sm sm:text-base">
                          {item.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 -m-2 hover:text-red-500 transition-colors touch-target flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {item.variant && (
                      <p className="text-xs sm:text-sm text-muted-foreground font-[family-name:var(--font-nunito)]">
                        {item.variant}
                      </p>
                    )}

                    <div className="flex items-center gap-2.5">
                      <span className="font-bold font-[family-name:var(--font-nunito)] text-base sm:text-lg">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs sm:text-sm text-muted-foreground line-through font-[family-name:var(--font-nunito)]">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-auto pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-0 pt-3">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-300 bg-white rounded-lg overflow-hidden touch-target">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center text-sm font-[family-name:var(--font-nunito)] font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right sm:text-left">
                        <p className="text-xs text-gray-600">Subtotal</p>
                        <span className="font-bold text-lg font-[family-name:var(--font-nunito)]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
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
              <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-2xl border border-gray-200 sticky top-20 lg:top-32 shadow-lg lg:shadow-none">
                <h2 className="text-lg sm:text-xl font-bold font-[family-name:var(--font-nunito)] text-foreground mb-6">
                  Order Summary
                </h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="flex-1 px-4 py-3 border border-gray-300 bg-white text-sm font-[family-name:var(--font-nunito)] rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                    <button className="px-4 py-3 bg-foreground text-white text-sm font-[family-name:var(--font-nunito)] font-semibold tracking-wider hover:bg-gold-dark transition-colors rounded-lg touch-target">
                      APPLY
                    </button>
                  </div>
                </div>

                {/* Summary Details */}
                <div className="space-y-3 text-sm font-[family-name:var(--font-nunito)] mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "font-semibold text-green-600" : ""}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Discount</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      (Inclusive of all taxes)
                    </p>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {shipping > 0 && (
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-center font-[family-name:var(--font-nunito)] text-yellow-900">
                      Add ₹{(2999 - cartTotal).toLocaleString()} more for FREE shipping
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full py-4 bg-gradient-to-r from-gold to-yellow-600 text-white text-center font-[family-name:var(--font-nunito)] font-bold tracking-wider hover:from-gold-dark hover:to-yellow-700 transition-all rounded-lg touch-target mb-3 block shadow-md hover:shadow-lg"
                >
                  PROCEED TO CHECKOUT
                </Link>

                {/* Continue Shopping */}
                <Link
                  href="/"
                  className="w-full py-3 border-2 border-foreground text-foreground text-center font-[family-name:var(--font-nunito)] font-semibold tracking-wider hover:bg-foreground hover:text-white transition-colors rounded-lg block text-sm touch-target"
                >
                  CONTINUE SHOPPING
                </Link>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <Truck className="w-5 h-5 mx-auto mb-2 text-gold" />
                    <p className="text-xs font-[family-name:var(--font-nunito)] text-gray-600">Free Ship</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-5 h-5 mx-auto mb-2 text-gold" />
                    <p className="text-xs font-[family-name:var(--font-nunito)] text-gray-600">Easy Return</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-5 h-5 mx-auto mb-2 text-gold" />
                    <p className="text-xs font-[family-name:var(--font-nunito)] text-gray-600">Secure</p>
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

