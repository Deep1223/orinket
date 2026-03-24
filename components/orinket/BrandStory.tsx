import Image from "next/image"
import Link from "next/link"

export default function BrandStory() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/brand-story.jpg"
              alt="The Orinket Story"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="lg:pl-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-6 font-[family-name:var(--font-cormorant)]">
              THE ORINKET STORY
            </h2>
            <p className="text-muted-foreground mb-4 font-[family-name:var(--font-montserrat)] leading-relaxed">
              Orinket was born from a simple belief: everyone deserves to own beautiful jewellery that 
              doesn&apos;t break the bank or lose its shine.
            </p>
            <p className="text-muted-foreground mb-4 font-[family-name:var(--font-montserrat)] leading-relaxed">
              We noticed a gap in the market — real gold was too expensive for everyday wear, and 
              imitation jewellery just didn&apos;t last. So we created something in between: demi-fine 
              jewellery that combines premium materials with accessible pricing.
            </p>
            <p className="text-muted-foreground mb-8 font-[family-name:var(--font-montserrat)] leading-relaxed">
              Today, with over 5 lakh happy customers, we continue our mission to make every woman 
              feel confident and beautiful, every single day.
            </p>
            <Link
              href="/about"
              className="inline-block px-8 py-3 bg-foreground text-background text-sm tracking-[0.2em] hover:bg-gold-dark transition-colors font-[family-name:var(--font-montserrat)]"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
