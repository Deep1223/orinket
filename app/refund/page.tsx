import type { Metadata } from "next"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import storeContent from "@/data/storeContent.json"
import { refundPage } from "@/dummydata/supportPages"
import { IndianRupee, Sparkles } from "lucide-react"
import Link from "next/link"
import { fonts } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Refund Policy | ORINKET",
  description: "Refund eligibility, processing times, and exclusions for Orinket orders (demo policy).",
}

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
          <div className="rounded-3xl border border-border bg-gradient-to-b from-cream to-white p-6 sm:p-10 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-foreground text-white flex items-center justify-center shrink-0">
                <IndianRupee className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h1 className={`text-3xl md:text-4xl font-semibold text-foreground ${fonts.headings}`}>
                  {refundPage.title}
                </h1>
                <p className="mt-2 text-sm md:text-base text-muted-foreground ${fonts.body}">
                  {refundPage.subtitle}
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-gold mt-3 shrink-0 hidden sm:block" />
            </div>

            <div className="mt-8 space-y-6">
              {refundPage.sections.map((section) => (
                <div key={section.heading} className="rounded-2xl border border-border bg-white p-6">
                  <p className={`text-xs uppercase tracking-widest text-muted-foreground ${fonts.labels} mb-4`}>
                    {section.heading}
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground ${fonts.body}">
                    {section.lines.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-cream p-6">
              <p className={`text-sm font-semibold text-foreground ${fonts.headings}`}>
                Need help with a return?
              </p>
              <p className="mt-1 text-sm text-muted-foreground ${fonts.body}">
                See{" "}
                <Link href="/returns" className="text-foreground font-medium underline-offset-2 hover:underline">
                  Returns & exchanges
                </Link>{" "}
                or write to {storeContent.support.email}.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
