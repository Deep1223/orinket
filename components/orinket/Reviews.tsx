"use client"

import { useState, useEffect, useCallback } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Ananya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "I absolutely love my Orinket pieces! The quality is amazing and they look just like real gold. I've been wearing my bracelet daily for 3 months and it still looks brand new.",
    product: "Hearts All Over Bracelet"
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Delhi",
    rating: 5,
    text: "Finally found jewellery that's affordable but doesn't look cheap. The packaging was beautiful and delivery was super fast. Definitely ordering more!",
    product: "Round Solitaire Necklace"
  },
  {
    id: 3,
    name: "Shreya Kapoor",
    location: "Bangalore",
    rating: 5,
    text: "Bought the emerald necklace as a gift for my mom and she couldn't believe it wasn't real gold! The craftsmanship is incredible. Highly recommend Orinket.",
    product: "Classic Emerald Necklace"
  },
  {
    id: 4,
    name: "Riya Gupta",
    location: "Chennai",
    rating: 5,
    text: "This is my third order from Orinket and I'm never disappointed. The demi-fine quality is exactly what I was looking for - premium but not overpriced.",
    product: "Mini Solitaire Ring"
  },
  {
    id: 5,
    name: "Kavya Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "I get so many compliments on my Orinket earrings! People always ask where I got them. The shine hasn't faded at all even after regular wear.",
    product: "Athena Solitaire Hoop Earrings"
  }
]

export default function Reviews() {
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

  const maxIndex = Math.max(0, reviews.length - itemsPerView)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }, [maxIndex])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-4 font-[family-name:var(--font-nunito)]">
            TRUSTED BY OUR COMMUNITY
          </h2>
          <p className="text-muted-foreground font-[family-name:var(--font-nunito)]">
            Over 5 Lakh+ Happy Customers
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
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
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md ${
              currentIndex >= maxIndex ? "opacity-30 cursor-not-allowed" : "hover:bg-cream"
            }`}
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Reviews Carousel */}
          <div className="overflow-hidden px-4">
            <div 
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView + 2)}%)` }}
            >
              {reviews.map((review) => (
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
                  <p className="text-foreground mb-6 font-[family-name:var(--font-nunito)] leading-relaxed text-sm">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-[family-name:var(--font-nunito)] text-lg">
                      {review.name}
                    </p>
                    <p className="text-sm text-muted-foreground font-[family-name:var(--font-nunito)]">
                      {review.location} | {review.product}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(maxIndex + 1)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? "bg-gold w-6" : "bg-border"
              }`}
              aria-label={`Go to review group ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

