"use client"

import Image from "next/image"
import Link from "next/link"
import { fonts } from "@/lib/fonts"
import { useCmsSection } from "@/hooks/useStorefrontCms"

export default function ForEveryYou() {
  const raw = useCmsSection("forEveryYou")
  const title = typeof raw?.title === "string" ? raw.title : ""
  const description = typeof raw?.description === "string" ? raw.description : ""
  const occasions = Array.isArray(raw?.occasions) ? raw.occasions : []

  if (!title.trim() || occasions.length === 0) return null

  return (
    <section className="pt-16 pb-8 md:pt-20 md:pb-10 lg:pt-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl font-light tracking-[0.1em] mb-4 text-center ${fonts.headings} animate-fadeIn`}
        >
          {title}
        </h2>
        {description.trim() ? (
          <p
            className={`text-center text-muted-foreground mb-12 ${fonts.body} max-w-xl mx-auto animate-slideUp`}
          >
            {description}
          </p>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {occasions.map((o, index: number) => {
            const row = o && typeof o === "object" && !Array.isArray(o) ? (o as Record<string, unknown>) : null
            const ot = typeof row?.title === "string" ? row.title : ""
            const sub = typeof row?.subtitle === "string" ? row.subtitle : ""
            const img = typeof row?.image === "string" ? row.image : ""
            const href = typeof row?.href === "string" ? row.href : ""
            if (!ot.trim() || !img.trim() || !href.trim()) return null
            return (
              <Link
                key={`${ot}-${index}`}
                href={href}
                className="group relative aspect-[3/4] max-w-sm mx-auto md:mx-0 overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Image
                  src={img}
                  alt={ot}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/80 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className={`text-2xl md:text-3xl tracking-[0.1em] mb-3 font-light ${fonts.headings}`}>
                    {ot}
                  </h3>
                  {sub.trim() ? (
                    <p className={`text-base text-white/90 ${fonts.body} font-light`}>{sub}</p>
                  ) : null}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
