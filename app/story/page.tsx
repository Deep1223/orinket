import type { Metadata } from "next"
import Image from "next/image"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import { storyPage } from "@/data/dummyCompanyPages"
import { BookOpen, Sparkles } from "lucide-react"
import Link from "next/link"
import { fonts } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Our Story | ORINKET",
  description:
    "From a studio sketch to demi-fine jewellery loved nationwide — the Orinket story, milestones, and mission.",
}

export default function StoryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
          <div className="rounded-3xl border border-border bg-gradient-to-b from-cream to-white p-6 sm:p-10 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-foreground text-white flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h1 className={`text-3xl md:text-4xl font-semibold text-foreground ${fonts.headings}`}>
                  {storyPage.headline}
                </h1>
                <p className={`mt-2 text-sm md:text-base text-muted-foreground ${fonts.body} max-w-2xl leading-relaxed`}>
                  {storyPage.lede}
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-gold mt-2 shrink-0 hidden sm:block" />
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                <Image
                  src="/images/brand-story.jpg"
                  alt="Orinket craftsmanship"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="space-y-4">
                {storyPage.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`text-sm md:text-base text-muted-foreground ${fonts.body} leading-relaxed`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <p className={`text-xs uppercase tracking-[0.25em] text-muted-foreground ${fonts.labels} mb-6`}>
                Milestones
              </p>
              <div className="relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border md:left-4" aria-hidden />
                <ul className="space-y-8">
                  {storyPage.milestones.map((m) => (
                    <li key={m.year} className="relative pl-10 md:pl-12">
                      <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-gold bg-cream md:left-2.5" />
                      <p className={`text-sm font-semibold text-gold ${fonts.labels}`}>
                        {m.year}
                      </p>
                      <p className={`mt-1 text-base font-semibold text-foreground ${fonts.headings}`}>
                        {m.title}
                      </p>
                      <p className={`mt-1 text-sm text-muted-foreground ${fonts.body}`}>
                        {m.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center justify-between rounded-2xl border border-border bg-white p-6">
              <p className={`text-sm text-muted-foreground ${fonts.body}`}>
                Visit a studio or explore the collection online.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/stores"
                  className={`inline-flex justify-center px-6 py-3 border border-foreground text-foreground text-sm tracking-[0.12em] hover:bg-foreground hover:text-background transition-colors ${fonts.buttons} rounded-lg`}
                >
                  STORES
                </Link>
                <Link
                  href="/category/all"
                  className={`inline-flex justify-center px-6 py-3 bg-foreground text-background text-sm tracking-[0.12em] hover:bg-gold-dark transition-colors ${fonts.buttons} rounded-lg`}
                >
                  SHOP ALL
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
