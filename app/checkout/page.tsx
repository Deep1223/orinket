"use client"

import { useState, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, Lock, Truck, Shield, RotateCcw } from "lucide-react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import { useCart } from "@/context/CartContext"
import { getProductById } from "@/data/products"

type CheckoutStep = "shipping" | "payment" | "confirm"

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { cartItems, cartTotal, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping")
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [expandedPayment, setExpandedPayment] = useState("card")
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

  const shipping = 0
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    if (!directProduct) {
      clearCart()
    }
    router.push("/order-success")
  }

  const stepsConfig = [
    { key: "shipping", label: "Shipping", number: 1 },
    { key: "payment", label: "Payment", number: 2 },
    { key: "confirm", label: "Confirm", number: 3 },
  ]

  const getStepStatus = (step: CheckoutStep) => {
    const order = { shipping: 0, payment: 1, confirm: 2 }
    const current = order[currentStep]
    const target = order[step]
    if (target < current) return "done"
    if (target === current) return "active"
    return "pending"
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-white font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors"
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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <nav className="bg-foreground text-white sticky top-0 z-50 border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-gold-light hover:text-gold text-sm tracking-wider font-[family-name:var(--font-nunito)]">
            <ChevronLeft className="w-4 h-4" />
            BACK TO CART
          </Link>
          <h1 className="text-xl font-[family-name:var(--font-cormorant)] tracking-widest">
            ORINKET
          </h1>
          <div className="flex items-center gap-1 text-xs text-gold-light font-[family-name:var(--font-nunito)]">
            <Lock className="w-4 h-4" />
            <span>SECURE</span>
          </div>
        </div>
      </nav>

      {/* Steps Bar */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center h-20">
          <div className="flex items-center gap-2">
            {stepsConfig.map((step, idx) => {
              const status = getStepStatus(step.key as CheckoutStep)
              return (
                <div key={step.key} className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentStep(step.key as CheckoutStep)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs tracking-widest font-semibold font-[family-name:var(--font-nunito)] transition-all ${
                      status === "active"
                        ? "text-foreground"
                        : status === "done"
                        ? "text-gold-dark"
                        : "text-muted-foreground"
                    } ${
                      status === "active"
                        ? "border-b-2 border-gold -mb-4"
                        : ""
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                      status === "done"
                        ? "bg-gold border-gold text-white"
                        : status === "active"
                        ? "bg-foreground border-foreground text-white"
                        : "border-border text-muted-foreground"
                    }`}>
                      {status === "done" ? "✓" : step.number}
                    </span>
                    <span>{step.label.toUpperCase()}</span>
                  </button>
                  {idx < stepsConfig.length - 1 && (
                    <span className="text-border text-lg">›</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Step */}
            {currentStep === "shipping" && (
              <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm animate-slideUp">
                <div className="bg-gradient-to-r from-gold/5 to-transparent border-b border-border px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cream border border-border flex items-center justify-center text-sm">
                    📍
                  </div>
                  <h2 className="text-lg font-[family-name:var(--font-cormorant)] font-semibold">
                    Shipping Address
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2 font-[family-name:var(--font-nunito)]">
                        First Name <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="w-full border border-border bg-cream rounded px-3 py-2 text-sm font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2 font-[family-name:var(--font-nunito)]">
                        Last Name <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="w-full border border-border bg-cream rounded px-3 py-2 text-sm font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2 font-[family-name:var(--font-nunito)]">
                      Email <span className="text-gold">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full border border-border bg-cream rounded px-3 py-2 text-sm font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2 font-[family-name:var(--font-nunito)]">
                      Phone <span className="text-gold">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full border border-border bg-cream rounded px-3 py-2 text-sm font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2 font-[family-name:var(--font-nunito)]">
                      Address <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="w-full border border-border bg-cream rounded px-3 py-2 text-sm font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2 font-[family-name:var(--font-nunito)]">
                        City <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai"
                        className="w-full border border-border bg-cream rounded px-3 py-2 text-sm font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2 font-[family-name:var(--font-nunito)]">
                        State <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Maharashtra"
                        className="w-full border border-border bg-cream rounded px-3 py-2 text-sm font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2 font-[family-name:var(--font-nunito)]">
                      Pincode <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      className="w-full border border-border bg-cream rounded px-3 py-2 text-sm font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="px-6 py-4 bg-cream border-t border-border">
                  <button
                    onClick={() => setCurrentStep("payment")}
                    className="w-full px-6 py-3 bg-foreground text-white rounded hover:bg-foreground/90 transition-all text-sm font-semibold font-[family-name:var(--font-nunito)] tracking-wider"
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </div>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === "payment" && (
              <div className="space-y-4 animate-slideUp">
                {/* Credit/Debit Card */}
                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => {
                      setSelectedPayment("card")
                      setExpandedPayment(expandedPayment === "card" ? "" : "card")
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-gold/5 to-transparent border-b border-border flex items-center gap-3 hover:bg-cream transition-all cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={selectedPayment === "card"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="accent-gold"
                    />
                    <span className="text-lg">💳</span>
                    <div className="flex-1 text-left">
                      <p className="font-semibold font-[family-name:var(--font-nunito)]">Credit/Debit Card</p>
                      <p className="text-xs text-muted-foreground font-[family-name:var(--font-nunito)]">Visa, Mastercard, RuPay</p>
                    </div>
                  </button>
                  {selectedPayment === "card" && (
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2 font-[family-name:var(--font-nunito)]">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full border border-border bg-cream rounded px-3 py-2 text-sm font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2 font-[family-name:var(--font-nunito)]">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full border border-border bg-cream rounded px-3 py-2 text-sm font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold focus:bg-white transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2 font-[family-name:var(--font-nunito)]">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            placeholder="12/25"
                            maxLength={5}
                            className="w-full border border-border bg-cream rounded px-3 py-2 text-sm font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold focus:bg-white transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2 font-[family-name:var(--font-nunito)]">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            maxLength={3}
                            className="w-full border border-border bg-cream rounded px-3 py-2 text-sm font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Net Banking */}
                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => {
                      setSelectedPayment("netbanking")
                      setExpandedPayment(expandedPayment === "netbanking" ? "" : "netbanking")
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-gold/5 to-transparent border-b border-border flex items-center gap-3 hover:bg-cream transition-all cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={selectedPayment === "netbanking"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="accent-gold"
                    />
                    <span className="text-lg">🏦</span>
                    <div className="flex-1 text-left">
                      <p className="font-semibold font-[family-name:var(--font-nunito)]">Net Banking</p>
                      <p className="text-xs text-muted-foreground font-[family-name:var(--font-nunito)]">All major banks</p>
                    </div>
                  </button>
                  {selectedPayment === "netbanking" && (
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground mb-4 font-[family-name:var(--font-nunito)]">Select your bank</p>
                      <div className="grid grid-cols-4 gap-2">
                        {["HDFC", "ICICI", "AXIS", "SBI", "KOTAK", "YES", "IDBI", "BOB"].map((bank) => (
                          <button key={bank} className="p-3 border border-border rounded hover:border-gold hover:bg-cream transition-all text-sm font-semibold text-center font-[family-name:var(--font-nunito)]">
                            {bank}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* UPI */}
                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => {
                      setSelectedPayment("upi")
                      setExpandedPayment(expandedPayment === "upi" ? "" : "upi")
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-gold/5 to-transparent border-b border-border flex items-center gap-3 hover:bg-cream transition-all cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={selectedPayment === "upi"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="accent-gold"
                    />
                    <span className="text-lg">📱</span>
                    <div className="flex-1 text-left">
                      <p className="font-semibold font-[family-name:var(--font-nunito)]">UPI</p>
                      <p className="text-xs text-muted-foreground font-[family-name:var(--font-nunito)]">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </button>
                  {selectedPayment === "upi" && (
                    <div className="p-6">
                      <label className="block text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2 font-[family-name:var(--font-nunito)]">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        className="w-full border border-border bg-cream rounded px-3 py-2 text-sm font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold focus:bg-white transition-all"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep("shipping")}
                    className="flex-1 py-3 border border-border text-foreground rounded font-semibold hover:bg-cream transition-all text-sm font-[family-name:var(--font-nunito)] tracking-wider"
                  >
                    BACK
                  </button>
                  <button
                    onClick={() => setCurrentStep("confirm")}
                    className="flex-1 py-3 bg-foreground text-white rounded font-semibold hover:bg-foreground/90 transition-all text-sm font-[family-name:var(--font-nunito)] tracking-wider"
                  >
                    CONTINUE TO CONFIRM
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Step */}
            {currentStep === "confirm" && (
              <div className="space-y-4 animate-slideUp">
                {/* Confirm Shipping */}
                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-gold/5 to-transparent border-b border-border px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📍</span>
                      <h3 className="font-semibold font-[family-name:var(--font-nunito)]">Delivery Address</h3>
                    </div>
                    <button
                      onClick={() => setCurrentStep("shipping")}
                      className="text-xs text-gold-dark underline hover:text-gold font-[family-name:var(--font-nunito)]"
                    >
                      EDIT
                    </button>
                  </div>
                  <div className="p-6 text-sm space-y-1 font-[family-name:var(--font-nunito)]">
                    <p>{formData.firstName} {formData.lastName}</p>
                    <p>{formData.address}</p>
                    <p>{formData.city}, {formData.state} {formData.pincode}</p>
                    <p className="text-muted-foreground">{formData.email}</p>
                    <p className="text-muted-foreground">{formData.phone}</p>
                  </div>
                </div>

                {/* Confirm Payment */}
                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-gold/5 to-transparent border-b border-border px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">💳</span>
                      <h3 className="font-semibold font-[family-name:var(--font-nunito)]">Payment Method</h3>
                    </div>
                    <button
                      onClick={() => setCurrentStep("payment")}
                      className="text-xs text-gold-dark underline hover:text-gold font-[family-name:var(--font-nunito)]"
                    >
                      EDIT
                    </button>
                  </div>
                  <div className="p-6 text-sm font-[family-name:var(--font-nunito)]">
                    <p className="font-semibold">
                      {selectedPayment === "card" && "Credit/Debit Card"}
                      {selectedPayment === "netbanking" && "Net Banking"}
                      {selectedPayment === "upi" && "UPI"}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {selectedPayment === "card" && "Secure payment via major banks"}
                    </p>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-3 p-4 bg-cream border border-border rounded cursor-pointer hover:border-gold transition-all">
                  <input
                    type="checkbox"
                    className="accent-gold mt-1"
                  />
                  <span className="text-xs text-muted-foreground leading-relaxed font-[family-name:var(--font-nunito)]">
                    I agree to the <button className="text-gold-dark underline">Terms & Conditions</button> and <button className="text-gold-dark underline">Privacy Policy</button>. I also authorize Orinket to charge my payment method as per the billing cycle.
                  </span>
                </label>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep("payment")}
                    className="flex-1 py-4 border border-border text-foreground rounded font-semibold hover:bg-cream transition-all text-sm font-[family-name:var(--font-nunito)] tracking-wider"
                  >
                    BACK
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 py-4 bg-foreground text-white rounded font-semibold hover:bg-foreground/90 transition-all text-sm font-[family-name:var(--font-nunito)] tracking-wider disabled:opacity-50"
                  >
                    {isProcessing ? "PROCESSING..." : `PLACE ORDER • Rs.${total.toLocaleString()}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg overflow-hidden sticky top-32 shadow-sm">
              <div className="bg-gradient-to-r from-gold/5 to-transparent border-b border-border px-6 py-4">
                <h3 className="font-semibold text-sm font-[family-name:var(--font-nunito)]">
                  ORDER SUMMARY ({items.length})
                </h3>
              </div>

              {/* Items */}
              <div className="max-h-64 overflow-y-auto border-b border-border">
                {items.map((item) => (
                  <div key={item.id} className="px-6 py-4 border-b border-border last:border-b-0 flex gap-3">
                    <div className="w-12 h-12 rounded bg-cream flex-shrink-0" />
                    <div className="flex-1 font-[family-name:var(--font-nunito)]">
                      <p className="text-xs font-semibold line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-xs font-semibold mt-1">Rs.{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="px-6 py-3 border-b border-border flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 border border-border bg-cream rounded px-2 py-2 text-xs font-[family-name:var(--font-nunito)] focus:outline-none focus:border-gold"
                />
                <button className="px-3 py-2 border border-gold text-gold text-xs font-semibold rounded hover:bg-gold hover:text-white transition-all font-[family-name:var(--font-nunito)]">
                  APPLY
                </button>
              </div>

              {/* Totals */}
              <div className="px-6 py-4 space-y-2 text-sm font-[family-name:var(--font-nunito)]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rs.{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (18%)</span>
                  <span>Rs.{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>Rs.{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="px-6 py-4 bg-cream border-t border-border grid grid-cols-3 gap-3 font-[family-name:var(--font-nunito)]">
                <div className="text-center">
                  <Truck className="w-4 h-4 mx-auto mb-1 text-gold" />
                  <p className="text-xs text-muted-foreground">Free Ship</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-4 h-4 mx-auto mb-1 text-gold" />
                  <p className="text-xs text-muted-foreground">Easy Return</p>
                </div>
                <div className="text-center">
                  <Shield className="w-4 h-4 mx-auto mb-1 text-gold" />
                  <p className="text-xs text-muted-foreground">Secure</p>
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
