import Link from "next/link"
import { demifineSection } from "@/dummydata/demifine-section/content"
import { fonts } from "@/lib/fonts"

export default function DemifineSection() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className={`text-sm tracking-[0.3em] text-muted-foreground mb-3 ${fonts.labels} uppercase animate-fadeIn`}>
          {demifineSection.subtitle}
        </p>
        <h2 className={`text-3xl md:text-5xl font-light tracking-[0.1em] mb-6 ${fonts.headings} animate-slideUp`} style={{ animationDelay: "100ms" }}>
          {demifineSection.title}
        </h2>
        <p className={`max-w-2xl mx-auto text-muted-foreground mb-8 ${fonts.body} leading-relaxed animate-slideUp`} style={{ animationDelay: "200ms" }}>
          {demifineSection.description}
        </p>
        <Link
          href={demifineSection.cta.href}
          className={`inline-block px-8 py-3 bg-foreground text-background text-sm tracking-[0.2em] hover:bg-gold-dark transition-all duration-300 ${fonts.buttons} animate-slideUp hover:shadow-lg`}
          style={{ animationDelay: "300ms" }}
        >
          {demifineSection.cta.text}
        </Link>
      </div>
    </section>
  )
}

