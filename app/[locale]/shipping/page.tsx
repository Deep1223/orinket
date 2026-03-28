import type { Metadata } from "next"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import storeContent from "@/data/storeContent.json"
import { shippingPage } from "@/dummydata/supportPages"
import { Truck, Package, Sparkles } from "lucide-react"
import Link from "next/link"
import { fonts } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Shipping Info | ORINKET",
  description: "Delivery zones, timelines, and how Orinket ships your jewellery across India.",
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
          <div className="rounded-3xl border border-border bg-gradient-to-b from-cream to-white p-6 sm:p-10 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-foreground text-white flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h1 className={`text-3xl md:text-4xl font-semibold text-foreground ${fonts.headings}`}>
                  {shippingPage.title}
                </h1>
                <p className={`mt-2 text-sm md:text-base text-muted-foreground ${fonts.body}`}>
                  {shippingPage.subtitle}
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-gold mt-3 shrink-0 hidden sm:block" />
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {shippingPage.zones.map((z) => (
                <div key={z.name} className="rounded-2xl border border-border bg-white p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-gold" />
                    <p className={`text-sm font-semibold text-foreground ${fonts.headings}`}>{z.name}</p>
                  </div>
                  <p className={`text-sm text-foreground ${fonts.body}`}>{z.eta}</p>
                  <p className={`mt-2 text-xs text-muted-foreground ${fonts.labels} leading-relaxed`}>
                    {z.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-white p-6">
              <p className={`text-xs uppercase tracking-widest text-muted-foreground ${fonts.labels}`}>
                Good to know
              </p>
              <ul className={`mt-4 space-y-3 text-sm text-muted-foreground ${fonts.body}`}>
                {shippingPage.bullets.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-cream p-6">
              <p className={`text-sm text-muted-foreground ${fonts.body} leading-relaxed`}>
                {shippingPage.packaging}
              </p>
              <p className={`mt-4 text-sm text-muted-foreground ${fonts.body}`}>
                Track anytime from{" "}
                <Link href="/track" className="text-foreground font-medium underline-offset-2 hover:underline">
                  Track order
                </Link>{" "}
                or email {storeContent.support.email}.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
