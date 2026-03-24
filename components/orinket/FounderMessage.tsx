import Image from "next/image"

export default function FounderMessage() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 lg:pr-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-6 font-[family-name:var(--font-cormorant)]">
              FROM PRIYA, FOR YOU
            </h2>
            <blockquote className="text-muted-foreground mb-6 font-[family-name:var(--font-montserrat)] leading-relaxed italic text-lg">
              &quot;A lot of us find real gold too expensive — and we don&apos;t want our jewellery locked 
              away. At the same time, imitation jewellery fades, breaks, and doesn&apos;t last.&quot;
            </blockquote>
            <p className="text-muted-foreground mb-6 font-[family-name:var(--font-montserrat)] leading-relaxed">
              So at Orinket, we&apos;re building something in the middle — a new category called Demi-Fine: 
              18k thick gold plating on premium metals, so everyone can enjoy jewellery that&apos;s trendy, 
              lasting, and high on quality.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-0.5 bg-gold"></div>
              <span className="font-[family-name:var(--font-cormorant)] text-lg tracking-wider">Priya Sharma</span>
            </div>
            <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)] mt-2">
              Founder & Creative Director, Orinket
            </p>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/founder.jpg"
              alt="Priya Sharma - Founder of Orinket"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
