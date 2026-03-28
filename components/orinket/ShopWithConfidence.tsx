"use client"

import { shopWithConfidence } from "@/dummydata/shop-with-confidence/content"
import { useCurrency } from "@/context/CurrencyContext"
import { fonts } from "@/lib/fonts"

export default function ShopWithConfidence() {
  const { formatPrice } = useCurrency()
  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-light tracking-[0.1em] mb-12 text-center ${fonts.headings}`}>
          {shopWithConfidence.title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {shopWithConfidence.features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-light flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-gold-dark" />
              </div>
              <h3 className={`text-base md:text-lg ${fonts.headings} mb-2 tracking-wide`}>
                {feature.title}
              </h3>
              <p className={`text-sm text-muted-foreground ${fonts.body}`}>
                {feature.freeShippingThresholdInr != null
                  ? `On orders above ${formatPrice(feature.freeShippingThresholdInr)}`
                  : feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

