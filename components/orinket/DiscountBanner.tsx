"use client"

import Image from "next/image"
import Link from "next/link"
import { fonts } from "@/lib/fonts"
import { useCmsSection } from "@/hooks/useStorefrontCms"

export default function DiscountBanner() {
  const b = useCmsSection("discountBanner")
  const image = typeof b?.image === "string" ? b.image : ""
  const alt = typeof b?.alt === "string" ? b.alt : ""
  const subtitle = typeof b?.subtitle === "string" ? b.subtitle : ""
  const title = typeof b?.title === "string" ? b.title : ""
  const description = typeof b?.description === "string" ? b.description : ""
  const cta = typeof b?.cta === "string" ? b.cta : ""
  const discountRaw = Number(b?.discountUpTo)
  const discountUpTo = Number.isFinite(discountRaw)
    ? Math.max(0, Math.min(99, Math.floor(discountRaw)))
    : 0
  const href = discountUpTo > 0 ? `/promo?discount=${discountUpTo}` : ""

  if (!image.trim()) return null

  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <Image src={image} alt={alt || title || "Offer"} fill className="object-cover" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        {subtitle.trim() ? (
          <p className={`text-sm md:text-base tracking-[0.3em] mb-3 ${fonts.labels}`}>{subtitle}</p>
        ) : null}
        {title.trim() ? (
          <h2 className={`text-4xl md:text-6xl font-light tracking-[0.1em] mb-4 ${fonts.headings}`}>{title}</h2>
        ) : null}
        {description.trim() ? (
          <p className={`text-lg md:text-xl mb-8 ${fonts.body} font-light`}>{description}</p>
        ) : null}
        {cta.trim() && href ? (
          <Link
            href={href}
            className={`px-8 py-3 bg-white text-foreground text-sm tracking-[0.2em] hover:bg-gold hover:text-white transition-all ${fonts.buttons}`}
          >
            {cta}
          </Link>
        ) : null}
      </div>
    </section>
  )
}
