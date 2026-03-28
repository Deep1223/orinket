import type { Metadata } from "next"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import storeContent from "@/data/storeContent.json"
import { returnsPage } from "@/dummydata/supportPages"
import { RefreshCw, Sparkles, XCircle } from "lucide-react"
import Link from "next/link"
import { fonts } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Returns & Exchanges | ORINKET",
  description: "How to return or exchange Orinket jewellery — eligibility, windows, and steps (demo policy).",
}

export default function ReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
          <div className="rounded-3xl border border-border bg-gradient-to-b from-cream to-white p-6 sm:p-10 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-foreground text-white flex items-center justify-center shrink-0">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-semibold text-foreground ${fonts.headings}">
                  {returnsPage.title}
                </h1>
                <p className="mt-2 text-sm md:text-base text-muted-foreground ${fonts.body}">
                  {returnsPage.subtitle}
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-gold mt-3 shrink-0 hidden sm:block" />
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-white p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground ${fonts.labels} mb-4">
                  Eligible
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground ${fonts.body}">
                  {returnsPage.eligible.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs uppercase tracking-widest text-muted-foreground ${fonts.labels}">
                    Not eligible
                  </p>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground ${fonts.body}">
                  {returnsPage.notEligible.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-border flex-shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-cream p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground ${fonts.labels} mb-4">
                How to start
              </p>
              <ol className="space-y-3 text-sm text-muted-foreground ${fonts.labels} list-decimal list-inside">
                {returnsPage.howTo.map((line) => (
                  <li key={line} className="pl-1">
                    {line}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-muted-foreground ${fonts.body}">
                Questions? {storeContent.support.email} ·{" "}
                <Link href="/refund" className="text-foreground font-medium underline-offset-2 hover:underline">
                  Refund policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
