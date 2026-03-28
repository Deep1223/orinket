"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { slides } from "@/dummydata/home-slider/slides"
import { fonts } from "@/lib/fonts"

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative w-full h-[45vh] sm:h-[55vh] md:h-[70vh] lg:h-[90vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6">
            <p className={`text-sm md:text-base lg:text-lg tracking-[0.3em] mb-3 md:mb-4 ${fonts.labels} uppercase font-light`}>
              {slide.title}
            </p>
            <h2 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] mb-6 md:mb-8 lg:mb-12 ${fonts.headings} leading-tight`}>
              {slide.subtitle}
            </h2>
            <p className={`text-sm md:text-base lg:text-lg text-white/90 max-w-2xl mx-auto mb-8 md:mb-12 ${fonts.body} font-light leading-relaxed`}>
              Discover our collection of 18k thick gold plated jewellery. Premium metals, lasting shine, and designs that move with you — every single day.
            </p>
            <Link
              href={slide.href}
              className={`px-8 md:px-12 py-3 md:py-4 bg-black text-white text-sm md:text-base tracking-[0.2em] hover:bg-gray-900 transition-all duration-300 ${fonts.buttons} font-light touch-target`}
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/80 hover:text-white transition-colors touch-target z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/80 hover:text-white transition-colors touch-target z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
      </button>
    </section>
  )
}

