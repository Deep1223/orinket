"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { fonts } from "@/lib/fonts"
import { useCmsSection } from "@/hooks/useStorefrontCms"

type ReviewRow = {
  id?: string
  rating?: number
  text?: string
  name?: string
  location?: string
  product?: string
}

export default function Reviews() {
  const raw = useCmsSection("reviews")
  const title = typeof raw?.title === "string" ? raw.title : ""
  const subtitle = typeof raw?.subtitle === "string" ? raw.subtitle : ""
  const list = useMemo((): ReviewRow[] => {
    const r = raw?.reviews
    if (!Array.isArray(r)) return []
    return r
      .map((x) => (x && typeof x === "object" && !Array.isArray(x) ? (x as ReviewRow) : null))
      .filter(Boolean) as ReviewRow[]
  }, [raw?.reviews])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const reviewsData = useMemo(() => {
    return list
      .map((r, i) => ({
        id: r.id || `r-${i}`,
        rating: Math.min(5, Math.max(1, Math.floor(Number(r.rating) || 5))),
        text: String(r.text || ""),
        name: String(r.name || ""),
        location: String(r.location || ""),
        product: String(r.product || ""),
      }))
      .filter((r) => r.text.trim())
  }, [list])

  const maxIndex = Math.max(0, reviewsData.length - itemsPerView)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }, [maxIndex])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(0)
  }, [currentIndex, maxIndex])

  if (!title.trim() || reviewsData.length === 0) return null

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-light tracking-[0.1em] mb-4 ${fonts.headings}`}>{title}</h2>
          {subtitle.trim() ? <p className={`text-muted-foreground ${fonts.body}`}>{subtitle}</p> : null}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-cream"
            }`}
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md ${
              currentIndex >= maxIndex ? "opacity-30 cursor-not-allowed" : "hover:bg-cream"
            }`}
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="overflow-hidden px-4">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView + 2)}%)` }}
            >
              {reviewsData.map((review) => (
                <div
                  key={review.id}
                  className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-cream p-6 md:p-8"
                >
                  <Quote className="w-8 h-8 text-gold mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className={`text-foreground mb-6 ${fonts.body} leading-relaxed text-sm`}>
                    &quot;{review.text}&quot;
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className={`${fonts.body} text-lg`}>{review.name}</p>
                    <p className={`text-sm text-muted-foreground ${fonts.body}`}>
                      {review.location}
                      {review.product ? ` | ${review.product}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {maxIndex > 0 ? (
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(maxIndex + 1)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? "bg-gold w-6" : "bg-border"
                }`}
                aria-label={`Go to review group ${i + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
