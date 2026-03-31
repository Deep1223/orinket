"use client"

import Image from "next/image"
import Link from "next/link"
import { fonts } from "@/lib/fonts"
import { useCmsSection } from "@/hooks/useStorefrontCms"

export default function DeserveToShine() {
  const raw = useCmsSection("deserveToShine")
  const title = typeof raw?.title === "string" ? raw.title : ""
  const image = typeof raw?.image === "string" ? raw.image : ""
  const description = Array.isArray(raw?.description) ? raw.description.map(String) : []
  const ctaRaw = raw?.cta
  const cta =
    ctaRaw && typeof ctaRaw === "object" && !Array.isArray(ctaRaw)
      ? (ctaRaw as { text?: string; href?: string })
      : null

  if (!title.trim() && !image.trim()) return null

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 items-center">
          {image.trim() ? (
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden rounded-xl shadow-2xl">
              <Image src={image} alt={title || "Campaign"} fill className="object-cover" />
            </div>
          ) : null}

          <div className="lg:pl-12">
            {title.trim() ? (
              <h2
                className={`text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.08em] mb-10 text-gray-900 ${fonts.headings}`}
              >
                {title}
              </h2>
            ) : null}
            {description.map((paragraph, index: number) => (
              <p
                key={index}
                className={`text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl ${fonts.body} font-light`}
              >
                {paragraph}
              </p>
            ))}
            {cta?.text?.trim() && cta?.href?.trim() ? (
              <div className="mt-12">
                <Link
                  href={cta.href}
                  className={`inline-block px-14 py-5 bg-black text-white text-base tracking-[0.15em] hover:bg-gray-900 transition-all duration-300 ${fonts.buttons} font-light`}
                >
                  {cta.text}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
