"use client"

import { useState, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Lock, CreditCard, Truck, Shield } from "lucide-react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import { useCart } from "@/context/CartContext"
import { getProductById } from "@/data/products"

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { cartItems, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  // Check for direct buy now
  const productId = searchParams.get("product")
  const quantity = parseInt(searchParams.get("quantity") || "1")
  const directProduct = productId ? getProductById(productId) : null

  const items = directProduct 
    ? [{ ...directProduct, quantity }] 
    : cartItems

  const subtotal = directProduct 
    ? directProduct.price * quantity 
    : cartTotal

  const shipping = subtotal >= 2999 ? 0 : 99
  const total = subtotal + shipping

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod"
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Clear cart if not direct buy
    if (!directProduct) {
      clearCart()
    }

    // Redirect to success page
    router.push("/order-success")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4 py-16">
            <h1 className="text-2xl font-semibold font-[family-name:var(--font-cormorant)] text-foreground mb-4">
              No items to checkout
            </h1>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-white font-[family-name:var(--font-montserrat)] tracking-wider hover:bg-gold-dark transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Checkout Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-sm font-[family-name:var(--font-montserrat)] text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
            Back to cart
          </Link>
          <Link href="/" className="text-2xl font-semibold tracking-[0.2em] font-[family-name:var(--font-cormorant)]">
            ORINKET
          </Link>
          <div className="flex items-center gap-2 text-sm font-[family-name:var(--font-montserrat)] text-muted-foreground">
            <Lock className="w-4 h-4" />
            Secure Checkout
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="order-2 lg:order-1">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white p-6 rounded-sm">
                  <h2 className="text-lg font-semibold font-[family-name:var(--font-cormorant)] text-foreground mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-[family-name:var(--font-montserrat)] text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border bg-white text-sm font-[family-name:var(--font-montserrat)] focus:outline-none focus:border-gold"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-[family-name:var(--font-montserrat)] text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border bg-white text-sm font-[family-name:var(--font-montserrat)] focus:outline-none focus:border-gold"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white p-6 rounded-sm">
                  <h2 className="text-lg font-semibold font-[family-name:var(--font-cormorant)] text-foreground mb-4">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-[family-name:var(--font-montserrat)] text-foreground mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-border bg-white text-sm font-[family-name:var(--font-montserrat)] focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-[family-name:var(--font-montserrat)] text-foreground mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-border bg-white text-sm font-[family-name:var(--font-montserrat)] focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-[family-name:var(--font-montserrat)] text-foreground mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border bg-white text-sm font-[family-name:var(--font-montserrat)] focus:outline-none focus:border-gold"
                        placeholder="House no., Building, Street"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-[family-name:var(--font-montserrat)] text-foreground mb-2">
                        Apartment, Suite, etc.
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border bg-white text-sm font-[family-name:var(--font-montserrat)] focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-[family-name:var(--font-montserrat)] text-foreground mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-border bg-white text-sm font-[family-name:var(--font-montserrat)] focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-[family-name:var(--font-montserrat)] text-foreground mb-2">
                          State *
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-border bg-white text-sm font-[family-name:var(--font-montserrat)] focus:outline-none focus:border-gold"
                        >
                          <option value="">Select</option>
                          <option value="maharashtra">Maharashtra</option>
                          <option value="delhi">Delhi</option>
                          <option value="karnataka">Karnataka</option>
                          <option value="tamil-nadu">Tamil Nadu</option>
                          <option value="gujarat">Gujarat</option>
                          <option value="west-bengal">West Bengal</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-[family-name:var(--font-montserrat)] text-foreground mb-2">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                          maxLength={6}
                          className="w-full px-4 py-3 border border-border bg-white text-sm font-[family-name:var(--font-montserrat)] focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white p-6 rounded-sm">
                  <h2 className="text-lg font-semibold font-[family-name:var(--font-cormorant)] text-foreground mb-4">
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border border-border cursor-pointer hover:border-gold transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-gold"
                      />
                      <Truck className="w-5 h-5 text-muted-foreground" />
                      <span className="font-[family-name:var(--font-montserrat)] text-sm">
                        Cash on Delivery
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border border-border cursor-pointer hover:border-gold transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-gold"
                      />
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <span className="font-[family-name:var(--font-montserrat)] text-sm">
                        Credit/Debit Card
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border border-border cursor-pointer hover:border-gold transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === "upi"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-gold"
                      />
                      <svg className="w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z"/>
                      </svg>
                      <span className="font-[family-name:var(--font-montserrat)] text-sm">
                        UPI
                      </span>
                    </label>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-gold text-white font-[family-name:var(--font-montserrat)] tracking-wider hover:bg-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      PLACE ORDER - Rs.{total.toLocaleString()}
                    </>
                  )}
                </button>

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-[family-name:var(--font-montserrat)]">
                  <Shield className="w-4 h-4" />
                  Your payment information is secure and encrypted
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="order-1 lg:order-2">
              <div className="bg-white p-6 rounded-sm sticky top-8">
                <h2 className="text-lg font-semibold font-[family-name:var(--font-cormorant)] text-foreground mb-6">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 relative bg-cream rounded-sm overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-white text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-[family-name:var(--font-montserrat)] text-foreground line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                          Rs.{item.price.toLocaleString()} x {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-semibold font-[family-name:var(--font-montserrat)]">
                        Rs.{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 pt-6 border-t border-border text-sm font-[family-name:var(--font-montserrat)]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>Rs.{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `Rs.${shipping}`}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border font-semibold text-base">
                    <span>Total</span>
                    <span>Rs.{total.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    (Inclusive of all taxes)
                  </p>
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
