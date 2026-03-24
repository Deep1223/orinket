import { Truck, RefreshCw, Shield, Award } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above Rs.999"
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "7-day return policy"
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "100% secure checkout"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "18k thick gold plated"
  }
]

export default function ShopWithConfidence() {
  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-12 text-center font-[family-name:var(--font-cormorant)]">
          SHOP WITH CONFIDENCE
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-light flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-gold-dark" />
              </div>
              <h3 className="text-base md:text-lg font-[family-name:var(--font-cormorant)] mb-2 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
