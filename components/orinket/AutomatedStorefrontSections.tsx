"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { fonts } from "@/lib/fonts"
import { useCurrency } from "@/context/CurrencyContext"
import { ecomFetch } from "@/lib/ecom/client"

type SectionProduct = {
  id: string
  name: string
  price: number
  image?: string
}

type SectionRow = {
  key: string
  mode: "auto" | "custom"
  tooltip?: string
  products: SectionProduct[]
}

function RailProductCard({
  p,
  formatPrice,
}: {
  p: SectionProduct
  formatPrice: (value: number) => string
}) {
  const [imgSrc, setImgSrc] = useState(p.image || "/images/product-necklace-1.jpg")

  return (
    <Link
      href={`/product/${p.id}`}
      className="rounded-xl border border-[#e8dece] bg-white p-2 shadow-sm transition hover:shadow-md"
    >
      <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-[#f7f2e8]">
        <Image
          src={imgSrc}
          alt={p.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
          onError={() => setImgSrc("/images/product-necklace-1.jpg")}
        />
      </div>
      <p className={`line-clamp-2 text-sm text-foreground ${fonts.body}`}>{p.name}</p>
      <p className={`mt-1 text-sm font-semibold ${fonts.headings}`}>{formatPrice(p.price)}</p>
    </Link>
  )
}

export default function AutomatedStorefrontSections() {
  const { formatPrice } = useCurrency()
  const [sections, setSections] = useState<SectionRow[]>([])

  useEffect(() => {
    const load = async () => {
      const response = await ecomFetch<{ success: boolean; data?: SectionRow[] }>(
        "/api/ecom/storefront/home",
        { method: "GET" }
      )
      if (response?.success && Array.isArray(response.data)) {
        setSections(response.data)
      }
    }
    load()
  }, [])

  const displaySections = useMemo(() => {
    return sections.filter((s) => s.key === "trending" || s.key === "recommended")
  }, [sections])

  if (!displaySections.length) return null

  return (
    <section className="mx-auto max-w-7xl px-4 pt-0 pb-8 md:pb-10">
      {displaySections.map((section) => (
        <div key={section.key} className="mb-6 md:mb-8 last:mb-0">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <h3 className={`text-2xl text-foreground ${fonts.headings}`}>
                {section.key === "trending" ? "Trending Now" : "Recommended For You"}
              </h3>
            </div>
            <p className={`text-xs text-muted-foreground ${fonts.body}`}>
              {section.tooltip || "Based on recent activity"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {section.products.slice(0, 8).map((p) => (
              <RailProductCard key={p.id} p={p} formatPrice={formatPrice} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
