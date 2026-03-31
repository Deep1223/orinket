import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import { fetchStoreSettingsServer } from "@/lib/server/fetchStoreSettings"
import { contactFromSettings } from "@/lib/contactFromSettings"
import { Mail, Phone, MapPin, Sparkles } from "lucide-react"
import { fonts } from "@/lib/fonts"

export default async function ContactPage() {
  const settings = await fetchStoreSettingsServer()
  const c = contactFromSettings(settings)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
          <div className="rounded-3xl border border-border bg-gradient-to-b from-cream to-white p-6 sm:p-10 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-foreground text-white flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h1 className={`text-3xl md:text-4xl font-semibold text-foreground ${fonts.headings}`}>
                  Contact {c.brandName}
                </h1>
                <p className={`mt-2 text-sm md:text-base text-muted-foreground ${fonts.body} max-w-2xl`}>
                  Concierge support for orders, gifting, and styling. Fill in General Settings so these details stay up
                  to date.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-border bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-cream border border-border flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold text-foreground ${fonts.headings}`}>Email</p>
                    <p className={`text-sm text-muted-foreground ${fonts.body}`}>
                      {c.email || "— add in General Settings"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-cream border border-border flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold text-foreground ${fonts.headings}`}>Phone</p>
                    <p className={`text-sm text-muted-foreground ${fonts.body}`}>
                      {c.phone || "— add in General Settings"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-cream border border-border flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold text-foreground ${fonts.headings}`}>Address</p>
                    <p className={`text-sm text-muted-foreground ${fonts.body}`}>
                      {c.address || "— add in General Settings"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-white p-6">
              <p className={`text-xs uppercase tracking-widest text-muted-foreground ${fonts.labels}`}>Hours</p>
              <p className={`mt-1 text-sm font-semibold text-foreground ${fonts.headings}`}>
                {c.hours || "— add support hours in General Settings"}
              </p>
              <p className={`mt-3 text-sm text-muted-foreground ${fonts.body}`}>
                For faster help, mention your order number (if available) in your message.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
