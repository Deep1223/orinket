"use client"

import { useCurrency } from "@/context/CurrencyContext"
import { fonts } from "@/lib/fonts"
import { useCmsSection } from "@/hooks/useStorefrontCms"

export default function ShopWithConfidence() {
  const { formatPrice } = useCurrency()
  const raw = useCmsSection("shopWithConfidence")
  const title = typeof raw?.title === "string" ? raw.title : ""
  const features = Array.isArray(raw?.features) ? raw.features : []

  if (!title.trim() || features.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-light tracking-[0.1em] mb-12 text-center ${fonts.headings}`}>
          {title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((f, i) => {
            const row = f && typeof f === "object" && !Array.isArray(f) ? (f as Record<string, unknown>) : null
            const ft = typeof row?.title === "string" ? row.title : ""
            const desc = typeof row?.description === "string" ? row.description : ""
            const thr = row?.freeShippingThresholdInr
            const n = typeof thr === "number" && Number.isFinite(thr) ? thr : null
            if (!ft.trim()) return null
            return (
              <div key={`${ft}-${i}`} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-light flex items-center justify-center">
                  <span className={`text-gold-dark text-lg font-semibold ${fonts.headings}`}>{i + 1}</span>
                </div>
                <h3 className={`text-base md:text-lg ${fonts.headings} mb-2 tracking-wide`}>{ft}</h3>
                <p className={`text-sm text-muted-foreground ${fonts.body}`}>
                  {n != null ? `On orders above ${formatPrice(n)}` : desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
