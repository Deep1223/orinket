import Link from "next/link"
import { ctaBanner } from "@/dummydata/cta-banner/content"
import { fonts } from "@/lib/fonts"

export default function CTABanner() {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.1em] mb-6 text-gray-900 ${fonts.headings}`}>
          ORINKET TOP STYLES
        </h2>
        <p className={`text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto ${fonts.body} font-light leading-relaxed`}>
          Discover our collection of 18k thick gold plated jewellery. Premium metals, lasting shine, and designs that move with you — every single day.
        </p>
        <Link
          href={ctaBanner.cta.href}
          className={`inline-block px-12 py-4 bg-black text-white text-sm tracking-[0.2em] hover:bg-gray-900 transition-all duration-300 ${fonts.buttons} font-light`}
        >
          {ctaBanner.cta.text}
        </Link>
      </div>
    </section>
  )
}

