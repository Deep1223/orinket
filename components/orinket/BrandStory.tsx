import Image from "next/image"
import Link from "next/link"
import { brandStory } from "@/dummydata/brand-story/content"
import { fonts } from "@/lib/fonts"

export default function BrandStory() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={brandStory.image}
              alt={brandStory.alt}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="lg:pl-12">
            <h2 className={`text-3xl md:text-4xl font-light tracking-[0.1em] mb-6 ${fonts.headings}`}>
              {brandStory.title}
            </h2>
            {brandStory.description.map((paragraph, index: number) => (
              <p key={index} className={`text-muted-foreground mb-4 ${fonts.body} leading-relaxed`}>
                {paragraph}
              </p>
            ))}
            <Link
              href={brandStory.cta.href}
              className={`inline-block px-8 py-3 bg-foreground text-background text-sm tracking-[0.2em] hover:bg-gold-dark transition-colors ${fonts.buttons}`}
            >
              {brandStory.cta.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

