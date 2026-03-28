import type { Metadata } from "next"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import storeContent from "@/data/storeContent.json"
import { aboutPage } from "@/data/dummyCompanyPages"
import { Gem, Heart, Shield, Sparkles } from "lucide-react"
import Link from "next/link"
import { font } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "About Us | ORINKET",
  description:
    "Orinket crafts demi-fine jewellery for everyday confidence — premium plating, thoughtful design, and transparent quality.",
}

const valueIcons = [Gem, Heart, Shield] as const

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
          <div className="rounded-3xl border border-border bg-gradient-to-b from-cream to-white p-6 sm:p-10 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-foreground text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className={`text-xs uppercase tracking-[0.25em] text-muted-foreground ${font('labels')}`}>
                  About {storeContent.brand.name}
                </p>
                <h1 className={`mt-2 text-3xl md:text-4xl font-semibold text-foreground ${font('headings')}`}>
                  {aboutPage.headline}
                </h1>
                <p className={`mt-3 text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed ${font('body')}`}>
                  {aboutPage.subhead}
                </p>
              </div>
            </div>

            <p className={`mt-8 text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl ${font('body')}`}>
              {aboutPage.intro}
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {aboutPage.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-white p-5 text-center"
                >
                  <p className={`text-2xl md:text-3xl font-semibold text-foreground ${font('headings')}`}>
                    {s.value}
                  </p>
                  <p className={`mt-1 text-xs uppercase tracking-wider text-muted-foreground ${font('labels')}`}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {aboutPage.values.map((v, i) => {
                const Icon = valueIcons[i] ?? Sparkles
                return (
                  <div key={v.title} className="rounded-2xl border border-border bg-white p-6">
                    <div className="h-10 w-10 rounded-xl bg-cream border border-border flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h2 className={`text-lg font-semibold text-foreground ${font('headings')}`}>
                      {v.title}
                    </h2>
                    <p className={`mt-2 text-sm text-muted-foreground leading-relaxed ${font('body')}`}>
                      {v.body}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center justify-between rounded-2xl border border-border bg-cream p-6">
              <p className={`text-sm text-muted-foreground ${font('body')}`}>
                Curious how we started? Read the full journey.
              </p>
              <Link
                href="/story"
                className={`inline-flex justify-center px-8 py-3 bg-foreground text-background text-sm tracking-[0.15em] hover:bg-gold-dark transition-colors rounded-lg ${font('buttons')}`}
              >
                OUR STORY
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
