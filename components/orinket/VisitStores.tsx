import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { storeLocations } from "@/data/dummyCompanyPages"
import { visitStores } from "@/dummydata/visit-stores/content"
import { fonts } from "@/lib/fonts"

const homeStores = storeLocations.slice(0, 2)

export default function VisitStores() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-light tracking-[0.1em] mb-4 text-center ${fonts.headings}`}>
          {visitStores.title}
        </h2>
        <p className={`text-center text-muted-foreground mb-12 ${fonts.body}`}>
          {visitStores.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {homeStores.map((store) => (
            <Link
              key={store.id}
              href={`/stores/${store.slug}`}
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden mb-4">
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className={`text-lg mb-1 group-hover:text-gold-dark transition-colors ${fonts.headings}`}>
                    {store.city} — {store.name}
                  </h3>
                  <p className={`text-sm text-muted-foreground ${fonts.body}`}>
                    {store.address.split("—")[0]?.trim() ?? store.address}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={visitStores.button.href}
            className={`inline-block px-8 py-3 border border-foreground text-foreground text-sm tracking-[0.2em] hover:bg-foreground hover:text-background transition-all ${fonts.buttons}`}
          >
            {visitStores.button.text}
          </Link>
        </div>
      </div>
    </section>
  )
}
