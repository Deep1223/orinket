"use client"

import Image from "next/image"
import { fonts } from "@/lib/fonts"
import { useCmsSection } from "@/hooks/useStorefrontCms"

export default function FounderMessage() {
  const raw = useCmsSection("founderMessage")
  const title = typeof raw?.title === "string" ? raw.title : ""
  const quote = typeof raw?.quote === "string" ? raw.quote : ""
  const description = typeof raw?.description === "string" ? raw.description : ""
  const name = typeof raw?.name === "string" ? raw.name : ""
  const role = typeof raw?.role === "string" ? raw.role : ""
  const image = typeof raw?.image === "string" ? raw.image : ""
  const alt = typeof raw?.alt === "string" ? raw.alt : ""

  if (!title.trim() && !quote.trim()) return null

  return (
    <section className="py-16 md:py-24 bg-cream px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-10 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center text-center lg:text-left w-full max-w-xl lg:max-w-md xl:max-w-lg shrink-0 space-y-6">
            {title.trim() ? (
              <h2 className={`text-3xl md:text-4xl font-light tracking-[0.1em] ${fonts.headings}`}>{title}</h2>
            ) : null}
            {quote.trim() ? (
              <blockquote className={`text-muted-foreground ${fonts.body} leading-relaxed italic text-lg`}>
                &quot;{quote}&quot;
              </blockquote>
            ) : null}
            {description.trim() ? (
              <p className={`text-muted-foreground ${fonts.body} leading-relaxed`}>{description}</p>
            ) : null}
            {(name.trim() || role.trim()) && (
              <div className="pt-2 flex flex-col items-center lg:items-start gap-3">
                <div className="w-16 h-0.5 bg-gold shrink-0" aria-hidden />
                {name.trim() ? (
                  <span className={`${fonts.headings} text-lg tracking-wider font-medium`}>{name}</span>
                ) : null}
                {role.trim() ? (
                  <p className={`text-sm text-muted-foreground ${fonts.labels}`}>{role}</p>
                ) : null}
              </div>
            )}
          </div>

          {image.trim() ? (
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[276px] sm:max-w-[324px] md:max-w-[376px] lg:max-w-[432px] shrink-0 overflow-hidden rounded-lg shadow-lg lg:mx-0">
              <Image src={image} alt={alt || name || "Founder"} fill className="object-cover" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
