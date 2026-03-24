import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"

const stores = [
  {
    id: 1,
    name: "Mumbai - Phoenix Mall",
    address: "Lower Parel, Mumbai",
    image: "/images/store-1.jpg"
  },
  {
    id: 2,
    name: "Delhi - Select Citywalk",
    address: "Saket, New Delhi",
    image: "/images/store-2.jpg"
  }
]

export default function VisitStores() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-4 text-center font-[family-name:var(--font-cormorant)]">
          VISIT OUR STORES
        </h2>
        <p className="text-center text-muted-foreground mb-12 font-[family-name:var(--font-montserrat)]">
          Experience our collection in person
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stores.map((store) => (
            <div key={store.id} className="group">
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
                  <h3 className="text-lg font-[family-name:var(--font-cormorant)] mb-1">
                    {store.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                    {store.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/stores"
            className="inline-block px-8 py-3 border border-foreground text-foreground text-sm tracking-[0.2em] hover:bg-foreground hover:text-background transition-all font-[family-name:var(--font-montserrat)]"
          >
            FIND ALL STORES
          </Link>
        </div>
      </div>
    </section>
  )
}
