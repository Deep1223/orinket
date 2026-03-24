import Image from "next/image"
import Link from "next/link"

export default function DiscountBanner() {
  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <Image
        src="/images/discount-banner.jpg"
        alt="Special Offer"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <p className="text-sm md:text-base tracking-[0.3em] mb-3 font-[family-name:var(--font-montserrat)]">
          LIMITED TIME OFFER
        </p>
        <h2 className="text-4xl md:text-6xl font-light tracking-[0.1em] mb-4 font-[family-name:var(--font-cormorant)]">
          UP TO 50% OFF
        </h2>
        <p className="text-lg md:text-xl mb-8 font-[family-name:var(--font-montserrat)] font-light">
          On selected demi-fine pieces
        </p>
        <Link
          href="/sale"
          className="px-8 py-3 bg-white text-foreground text-sm tracking-[0.2em] hover:bg-gold hover:text-white transition-all font-[family-name:var(--font-montserrat)]"
        >
          SHOP SALE
        </Link>
      </div>
    </section>
  )
}
