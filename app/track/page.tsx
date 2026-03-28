"use client"

import { useState } from "react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import storeContent from "@/data/storeContent.json"
import { trackPage } from "@/dummydata/supportPages"
import { MapPin, PackageSearch, Sparkles } from "lucide-react"
import Link from "next/link"
import { fonts } from "@/lib/fonts"

export default function TrackPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
          <div className="rounded-3xl border border-border bg-gradient-to-b from-cream to-white p-6 sm:p-10 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-foreground text-white flex items-center justify-center shrink-0">
                <PackageSearch className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h1 className={`text-3xl md:text-4xl font-semibold text-foreground ${fonts.body}`}>
                  {trackPage.title}
                </h1>
                <p className={`mt-2 text-sm md:text-base text-muted-foreground ${fonts.body}`}>
                  {trackPage.subtitle}
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-gold mt-3 shrink-0 hidden sm:block" />
            </div>

            <form
              className="mt-8 rounded-2xl border border-border bg-white p-6"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <label className={`block text-xs uppercase tracking-widest text-muted-foreground ${fonts.labels} mb-2`}>
                Order ID
              </label>
              <input
                type="text"
                name="orderId"
                placeholder={trackPage.orderIdPlaceholder}
                className={`w-full rounded-xl border border-border bg-cream/50 px-4 py-3 text-sm text-foreground ${fonts.body} placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40`}
              />
              <p className={`mt-3 text-xs text-muted-foreground ${fonts.body}`}>
                {trackPage.demoNote}
              </p>
              <button
                type="submit"
                className={`mt-6 w-full sm:w-auto px-8 py-3 bg-foreground text-background text-sm tracking-[0.15em] hover:bg-gold-dark transition-colors ${fonts.buttons} rounded-lg`}
              >
                {trackPage.submitLabel}
              </button>
            </form>

            {submitted && (
              <div className="mt-8 rounded-2xl border border-gold/30 bg-white p-6 shadow-sm">
                <p className={`text-xs uppercase tracking-widest text-gold ${fonts.labels} mb-4`}>
                  Sample tracking
                </p>
                <div className={`space-y-3 text-sm ${fonts.body}`}>
                  <p>
                    <span className="text-muted-foreground">Order</span>{" "}
                    <span className="font-semibold text-foreground">{trackPage.sample.orderId}</span>
                  </p>
                  <p className="text-foreground font-medium">{trackPage.sample.statusLabel}</p>
                  <p className="text-muted-foreground">
                    {trackPage.sample.carrier} · {trackPage.sample.trackingNumber}
                  </p>
                  <p className="text-muted-foreground flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    {trackPage.sample.lastUpdate}
                  </p>
                  <p className="text-muted-foreground">{trackPage.sample.eta}</p>
                </div>
                <ol className="mt-6 space-y-2 border-t border-border pt-6">
                  {trackPage.steps.map((step, i) => (
                    <li
                      key={step}
                      className={`flex gap-3 text-sm ${fonts.body} ${
                        i < 3 ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                          i < 3 ? "bg-gold" : "bg-border"
                        }`}
                      />
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-border bg-cream p-6">
              <p className={`text-sm text-muted-foreground ${fonts.body}`}>
                Live tracking will use your carrier link once integrated. For now, email {storeContent.support.email}{" "}
                with your order ID for real assistance.
              </p>
              <Link
                href="/shipping"
                className={`mt-3 inline-block text-sm font-medium text-foreground ${fonts.body} underline-offset-2 hover:underline`}
              >
                Shipping info
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
