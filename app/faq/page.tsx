import type { Metadata } from "next"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import storeContent from "@/data/storeContent.json"
import { faqPage } from "@/dummydata/supportPages"
import { HelpCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { fonts } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "FAQs | ORINKET",
  description: "Orders, delivery, materials, and care — frequently asked questions about Orinket jewellery.",
}

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
          <div className="rounded-3xl border border-border bg-gradient-to-b from-cream to-white p-6 sm:p-10 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-foreground text-white flex items-center justify-center shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h1 className={`text-3xl md:text-4xl font-semibold text-foreground ${fonts.headings}`}>
                  {faqPage.title}
                </h1>
                <p className="mt-2 text-sm md:text-base text-muted-foreground ${fonts.body}">
                  {faqPage.subtitle}
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-gold mt-3 shrink-0 hidden sm:block" />
            </div>

            <div className="mt-10 space-y-10">
              {faqPage.groups.map((group) => (
                <section key={group.title}>
                  <h2 className={`text-xs uppercase tracking-[0.25em] text-muted-foreground ${fonts.labels} mb-4`}>
                    {group.title}
                  </h2>
                  <div className="rounded-2xl border border-border bg-white divide-y divide-border overflow-hidden">
                    {group.items.map((item) => (
                      <details key={item.q} className="group px-5 py-1">
                        <summary className={`cursor-pointer list-none py-4 flex items-start justify-between gap-4 text-sm font-medium text-foreground ${fonts.headings} marker:content-none [&::-webkit-details-marker]:hidden`}>
                          <span>{item.q}</span>
                          <span className="text-gold text-lg leading-none mt-0.5 group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p className="pb-4 text-sm text-muted-foreground ${fonts.body} leading-relaxed pr-8">
                          {item.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-cream p-6">
              <p className={`text-sm font-semibold text-foreground ${fonts.headings}`}>
                Still need help?
              </p>
              <p className="mt-1 text-sm text-muted-foreground ${fonts.body}">
                Email {storeContent.support.email} or visit{" "}
                <Link href="/contact" className="text-foreground font-medium underline-offset-2 hover:underline">
                  Contact
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
