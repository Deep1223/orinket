import Link from "next/link"

export default function CTABanner() {
  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.1em] mb-6 font-[family-name:var(--font-cormorant)]">
          BUY EVERYDAY DEMI-FINE JEWELLERY
        </h2>
        <p className="text-lg md:text-xl text-background/80 mb-8 font-[family-name:var(--font-montserrat)] font-light">
          Curated by Priya Sharma
        </p>
        <Link
          href="/collections/all"
          className="inline-block px-10 py-4 bg-gold text-white text-sm tracking-[0.2em] hover:bg-gold-dark transition-colors font-[family-name:var(--font-montserrat)]"
        >
          SHOP NOW
        </Link>
      </div>
    </section>
  )
}
