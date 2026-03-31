"use client"

import Image from "next/image"
import Link from "next/link"
import { fonts } from "@/lib/fonts"
import { useCmsSection } from "@/hooks/useStorefrontCms"

export default function ShopByRecipient() {
  const raw = useCmsSection("shopByRecipient")
  const title = typeof raw?.title === "string" ? raw.title : ""
  const recipients = Array.isArray(raw?.recipients) ? raw.recipients : []

  if (!title.trim() || recipients.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-light tracking-[0.1em] mb-12 text-center ${fonts.headings}`}>
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {recipients.map((r, i) => {
            const row = r && typeof r === "object" && !Array.isArray(r) ? (r as Record<string, unknown>) : null
            const rt = typeof row?.title === "string" ? row.title : ""
            const img = typeof row?.image === "string" ? row.image : ""
            const href = typeof row?.href === "string" ? row.href : ""
            if (!rt.trim() || !img.trim() || !href.trim()) return null
            return (
              <Link
                key={`${rt}-${i}`}
                href={href}
                className="group relative aspect-[4/3] md:aspect-[5/4] overflow-hidden"
              >
                <Image
                  src={img}
                  alt={rt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-end justify-center pb-12">
                  <div className="text-center">
                    <h3 className={`text-white text-2xl md:text-3xl tracking-[0.15em] mb-4 ${fonts.headings}`}>
                      {rt}
                    </h3>
                    <span
                      className={`inline-block px-6 py-2 border border-white text-white text-sm tracking-[0.2em] group-hover:bg-white group-hover:text-foreground transition-all ${fonts.buttons}`}
                    >
                      SHOP NOW
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
