"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    image: "/images/hero-1.jpg",
    title: "EVERYDAY ELEGANCE",
    subtitle: "Discover our new collection",
    cta: "SHOP NOW",
    href: "/collections/new"
  },
  {
    image: "/images/hero-2.jpg",
    title: "DEMI-FINE JEWELLERY",
    subtitle: "Premium quality, accessible luxury",
    cta: "EXPLORE",
    href: "/collections/all"
  },
  {
    image: "/images/hero-3.jpg",
    title: "18K GOLD PLATED",
    subtitle: "Crafted to last, made to shine",
    cta: "DISCOVER",
    href: "/collections/gold"
  }
]

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
    <section className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
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
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <p className="text-sm md:text-base tracking-[0.3em] mb-3 font-[family-name:var(--font-montserrat)] uppercase">
              {slide.subtitle}
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.15em] mb-8 font-[family-name:var(--font-cormorant)]">
              {slide.title}
            </h2>
            <Link
              href={slide.href}
              className="px-8 py-3 border-2 border-white text-white text-sm tracking-[0.2em] hover:bg-white hover:text-foreground transition-all duration-300 font-[family-name:var(--font-montserrat)]"
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
