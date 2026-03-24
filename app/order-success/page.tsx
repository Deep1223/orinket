import Link from "next/link"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"

export default function OrderSuccessPage() {
  const orderNumber = `ORN${Date.now().toString().slice(-8)}`

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-semibold font-[family-name:var(--font-cormorant)] text-foreground mb-4">
            Thank You For Your Order!
          </h1>
          <p className="text-muted-foreground font-[family-name:var(--font-montserrat)] mb-8">
            Your order has been placed successfully. We're preparing your jewelry with love and care.
          </p>

          {/* Order Number */}
          <div className="bg-cream p-6 rounded-sm mb-8">
            <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)] mb-2">
              Order Number
            </p>
            <p className="text-xl font-semibold font-[family-name:var(--font-montserrat)] text-foreground">
              {orderNumber}
            </p>
          </div>

          {/* What's Next */}
          <div className="space-y-4 mb-8 text-left">
            <div className="flex items-start gap-4 p-4 bg-white border border-border rounded-sm">
              <Mail className="w-6 h-6 text-gold flex-shrink-0" />
              <div>
                <h3 className="font-semibold font-[family-name:var(--font-montserrat)] text-foreground text-sm">
                  Order Confirmation
                </h3>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                  We've sent a confirmation email with your order details.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white border border-border rounded-sm">
              <Package className="w-6 h-6 text-gold flex-shrink-0" />
              <div>
                <h3 className="font-semibold font-[family-name:var(--font-montserrat)] text-foreground text-sm">
                  Shipping Updates
                </h3>
                <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                  You'll receive tracking information once your order ships.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link
              href="/account/orders"
              className="w-full py-4 bg-foreground text-white font-[family-name:var(--font-montserrat)] tracking-wider hover:bg-gold-dark transition-colors flex items-center justify-center gap-2"
            >
              VIEW ORDER STATUS
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/"
              className="w-full py-4 border border-foreground text-foreground font-[family-name:var(--font-montserrat)] tracking-wider hover:bg-foreground hover:text-white transition-colors block"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
