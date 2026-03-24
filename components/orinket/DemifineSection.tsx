import Link from "next/link"

export default function DemifineSection() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm tracking-[0.3em] text-muted-foreground mb-3 font-[family-name:var(--font-montserrat)] uppercase animate-fadeIn">
          Premium Quality
        </p>
        <h2 className="text-3xl md:text-5xl font-light tracking-[0.1em] mb-6 font-[family-name:var(--font-cormorant)] animate-slideUp" style={{ animationDelay: "100ms" }}>
          EVERYDAY DEMI-FINE JEWELLERY
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-8 font-[family-name:var(--font-montserrat)] leading-relaxed animate-slideUp" style={{ animationDelay: "200ms" }}>
          Discover our collection of 18k thick gold plated jewellery. Premium metals, lasting shine, 
          and designs that move with you — every single day.
        </p>
        <Link
          href="/collections/all"
          className="inline-block px-8 py-3 bg-foreground text-background text-sm tracking-[0.2em] hover:bg-gold-dark transition-all duration-300 font-[family-name:var(--font-montserrat)] animate-slideUp hover:shadow-lg" style={{ animationDelay: "300ms" }}
        >
          SHOP COLLECTION
        </Link>
      </div>
    </section>
  )
}
