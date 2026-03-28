import Image from "next/image"
import Link from "next/link"
import { forEveryYou } from "@/dummydata/for-every-you/content"
import { fonts } from "@/lib/fonts"

export default function ForEveryYou() {
  return (
    <section className="pt-16 pb-8 md:pt-20 md:pb-10 lg:pt-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-light tracking-[0.1em] mb-4 text-center ${fonts.headings} animate-fadeIn`}>
          {forEveryYou.title}
        </h2>
        <p className={`text-center text-muted-foreground mb-12 ${fonts.body} max-w-xl mx-auto animate-slideUp`}>
          {forEveryYou.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {forEveryYou.occasions.map((occasion, index: number) => (
            <Link
              key={occasion.title}
              href={occasion.href}
              className="group relative aspect-[3/4] max-w-sm mx-auto md:mx-0 overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
              style={{ animation: `slideUp 0.6s ease-out ${index * 100}ms forwards`, opacity: 0 }}
            >
              <Image
                src={occasion.image}
                alt={occasion.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/80 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className={`text-2xl md:text-3xl tracking-[0.1em] mb-3 font-light ${fonts.headings}`}>
                  {occasion.title}
                </h3>
                <p className={`text-base text-white/90 ${fonts.body} font-light`}>
                  {occasion.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

