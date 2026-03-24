import Image from "next/image"
import Link from "next/link"

export default function DeserveToShine() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/deserve-shine.jpg"
              alt="Because you deserve to shine"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="lg:pl-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.1em] mb-6 font-[family-name:var(--font-cormorant)]">
              BECAUSE YOU DESERVE TO SHINE
            </h2>
            <p className="text-muted-foreground mb-6 font-[family-name:var(--font-montserrat)] leading-relaxed">
              At Orinket, we create jewellery that&apos;s made to be worn — every day and on the days that 
              matter most. It&apos;s premium in quality, thoughtful in design, and priced so it feels right.
            </p>
            <p className="text-muted-foreground mb-8 font-[family-name:var(--font-montserrat)] leading-relaxed">
              We don&apos;t believe in saving the good stuff for later. Our pieces are made to move with 
              you, not sit in a box. Because with Orinket, the sparkle is always yours to keep.
            </p>
            <Link
              href="/about"
              className="inline-block px-8 py-3 bg-foreground text-background text-sm tracking-[0.2em] hover:bg-gold-dark transition-colors font-[family-name:var(--font-montserrat)]"
            >
              OUR STORY
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
