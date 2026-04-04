"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { fonts } from "@/lib/fonts"
import { useStorefrontCms } from "@/hooks/useStorefrontCms"
import { resolveHeroSlideCtaHref } from "@/lib/heroSlideCtaHref"

export default function HeroSlider() {
  const { heroSlides } = useStorefrontCms()
  const slides = heroSlides
  const [currentSlide, setCurrentSlide] = useState(0)

  const len = slides.length

  const nextSlide = useCallback(() => {
    if (len < 1) return
    setCurrentSlide((prev) => (prev + 1) % len)
  }, [len])

  const prevSlide = useCallback(() => {
    if (len < 1) return
    setCurrentSlide((prev) => (prev - 1 + len) % len)
  }, [len])

  useEffect(() => {
    if (len < 2) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide, len])

  useEffect(() => {
    if (currentSlide >= len) setCurrentSlide(0)
  }, [currentSlide, len])

  if (len === 0) return null

  return (
    <section className="relative w-full h-[45vh] sm:h-[55vh] md:h-[70vh] lg:h-[90vh] overflow-hidden">
      {slides.map((slide, index) => {
        const ctaHref = resolveHeroSlideCtaHref(slide)
        return (
          <div
            key={`${slide.image}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide
                ? "z-[1] opacity-100 pointer-events-auto"
                : "z-0 opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image || ""}
              alt={slide.title || "Hero"}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6">
              {slide.title?.trim() ? (
                <p
                  className={`text-sm md:text-base lg:text-lg tracking-[0.3em] mb-3 md:mb-4 ${fonts.labels} uppercase font-light`}
                >
                  {slide.title}
                </p>
              ) : null}
              {slide.subtitle?.trim() ? (
                <h2
                  className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] mb-6 md:mb-8 lg:mb-12 ${fonts.headings} leading-tight`}
                >
                  {slide.subtitle}
                </h2>
              ) : null}
              {slide.caption?.trim() ? (
                <p
                  className={`text-sm md:text-base lg:text-lg text-white/90 max-w-2xl mx-auto mb-8 md:mb-12 ${fonts.body} font-light leading-relaxed`}
                >
                  {slide.caption}
                </p>
              ) : null}
              {slide.cta?.trim() && ctaHref ? (
                <Link
                  href={ctaHref}
                  className={`cursor-pointer px-8 md:px-12 py-3 md:py-4 bg-transparent text-white text-sm md:text-base tracking-[0.2em] border border-white hover:bg-white/10 transition-all duration-300 ${fonts.buttons} font-light touch-target`}
                >
                  {slide.cta}
                </Link>
              ) : null}
            </div>
          </div>
        )
      })}

      {len > 1 ? (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 z-20 -translate-y-1/2 p-2 sm:p-3 text-white/80 transition-colors hover:text-white touch-target"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 z-20 -translate-y-1/2 p-2 sm:p-3 text-white/80 transition-colors hover:text-white touch-target"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
          </button>
        </>
      ) : null}
    </section>
  )
}
