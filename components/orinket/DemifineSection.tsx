"use client"

import Link from "next/link"
import { fonts } from "@/lib/fonts"
import { useCmsSection } from "@/hooks/useStorefrontCms"

export default function DemifineSection() {
  const raw = useCmsSection("demifineSection")
  const subtitle = typeof raw?.subtitle === "string" ? raw.subtitle : ""
  const title = typeof raw?.title === "string" ? raw.title : ""
  const description = typeof raw?.description === "string" ? raw.description : ""
  const ctaRaw = raw?.cta
  const cta =
    ctaRaw && typeof ctaRaw === "object" && !Array.isArray(ctaRaw)
      ? (ctaRaw as { text?: string; href?: string })
      : null

  if (!title.trim()) return null

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {subtitle.trim() ? (
          <p
            className={`text-sm tracking-[0.3em] text-muted-foreground mb-3 ${fonts.labels} uppercase animate-fadeIn`}
          >
            {subtitle}
          </p>
        ) : null}
        <h2
          className={`text-3xl md:text-5xl font-light tracking-[0.1em] mb-6 ${fonts.headings} animate-slideUp`}
          style={{ animationDelay: "100ms" }}
        >
          {title}
        </h2>
        {description.trim() ? (
          <p
            className={`max-w-2xl mx-auto text-muted-foreground mb-8 ${fonts.body} leading-relaxed animate-slideUp`}
            style={{ animationDelay: "200ms" }}
          >
            {description}
          </p>
        ) : null}
        {cta?.text?.trim() && cta?.href?.trim() ? (
          <Link
            href={cta.href}
            className={`inline-block px-8 py-3 bg-foreground text-background text-sm tracking-[0.2em] hover:bg-gold-dark transition-all duration-300 ${fonts.buttons} animate-slideUp hover:shadow-lg`}
            style={{ animationDelay: "300ms" }}
          >
            {cta.text}
          </Link>
        ) : null}
      </div>
    </section>
  )
}
