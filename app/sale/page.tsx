import type { Metadata } from "next"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import ProductGrid from "@/components/orinket/ProductGrid"
import AnimatedSection from "@/components/orinket/AnimatedSection"
import { getSaleProducts } from "@/data/dummyProducts"
import { fonts } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Sale | ORINKET",
  description: "Up to 50% off selected demi-fine jewellery — limited time.",
}

export default function SalePage() {
  const products = getSaleProducts()

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <AnimatedSection animation="fadeIn" delay={80}>
          <div className="text-center mb-12">
            <p className={`text-xs uppercase tracking-[0.3em] text-gold ${fonts.labels} mb-3`}>
              Limited time
            </p>
            <h1 className={`text-4xl md:text-5xl font-light tracking-[0.08em] ${fonts.headings} mb-4`}>
              UP TO 50% OFF
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto ${fonts.body}">
              On selected demi-fine pieces — same quality, a little more sparkle for your budget.
            </p>
          </div>
        </AnimatedSection>

        {products.length > 0 ? (
          <AnimatedSection animation="slideUp" delay={120}>
            <ProductGrid products={products} />
          </AnimatedSection>
        ) : (
          <p className="text-center text-muted-foreground ${fonts.body}">
            No sale items right now. Check back soon.
          </p>
        )}
      </div>
      <Footer />
    </main>
  )
}
