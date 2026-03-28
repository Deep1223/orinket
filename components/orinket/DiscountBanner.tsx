import Image from "next/image"
import Link from "next/link"
import { discountBanner } from "@/dummydata/discountpage/banner"
import { fonts } from "@/lib/fonts"

export default function DiscountBanner() {
  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <Image
        src={discountBanner.image}
        alt={discountBanner.alt}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <p className={`text-sm md:text-base tracking-[0.3em] mb-3 ${fonts.labels}`}>
          {discountBanner.subtitle}
        </p>
        <h2 className={`text-4xl md:text-6xl font-light tracking-[0.1em] mb-4 ${fonts.headings}`}>
          {discountBanner.title}
        </h2>
        <p className={`text-lg md:text-xl mb-8 ${fonts.body} font-light`}>
          {discountBanner.description}
        </p>
        <Link
          href={discountBanner.href}
          className={`px-8 py-3 bg-white text-foreground text-sm tracking-[0.2em] hover:bg-gold hover:text-white transition-all ${fonts.buttons}`}
        >
          {discountBanner.cta}
        </Link>
      </div>
    </section>
  )
}

