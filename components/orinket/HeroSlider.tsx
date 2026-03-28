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
    href: "/all"
  },
  {
    image: "/images/hero-2.jpg",
    title: "DEMI-FINE JEWELLERY",
    subtitle: "Premium quality, accessible luxury",
    cta: "EXPLORE",
    href: "/all"
  },
  {
    image: "/images/hero-3.jpg",
    title: "9KT FINE GOLD",
    subtitle: "Lab grown diamonds set in solid 9KT gold",
    cta: "DISCOVER",
    href: "/category/9kt-gold"
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
            <p className="text-xs sm:text-sm md:text-base tracking-widest mb-2 sm:mb-3 font-[family-name:var(--font-nunito)] uppercase font-semibold">
              {slide.subtitle}
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-4 sm:mb-6 md:mb-8 font-[family-name:var(--font-nunito)] leading-tight">
              {slide.title}
            </h2>
            <Link
              href={slide.href}
              className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-white text-white text-xs sm:text-sm md:text-base tracking-widest hover:bg-white hover:text-foreground transition-all duration-300 font-[family-name:var(--font-nunito)] font-semibold rounded-sm touch-target"
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

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all touch-target ${
              index === currentSlide ? "bg-white w-6 sm:w-8" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

