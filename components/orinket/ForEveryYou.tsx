import Image from "next/image"
import Link from "next/link"

const occasions = [
  {
    title: "The Professional",
    subtitle: "Elegant pieces for everyday office style",
    image: "/images/for-every-you-1.jpg",
    href: "/collections/office"
  },
  {
    title: "The Glamorous",
    subtitle: "Statement pieces for special occasions",
    image: "/images/for-every-you-2.jpg",
    href: "/collections/evening"
  },
  {
    title: "The Casual",
    subtitle: "Effortless style for weekend vibes",
    image: "/images/for-every-you-3.jpg",
    href: "/collections/casual"
  }
]

export default function ForEveryYou() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-4 text-center font-[family-name:var(--font-nunito)] animate-fadeIn">
          FOR EVERY YOU
        </h2>
        <p className="text-center text-muted-foreground mb-12 font-[family-name:var(--font-nunito)] max-w-xl mx-auto animate-slideUp">
          From boardrooms to brunches, we have pieces that complement every version of you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {occasions.map((occasion, index) => (
            <Link
              key={occasion.title}
              href={occasion.href}
              className="group relative aspect-[3/4] overflow-hidden transition-transform duration-300 hover:shadow-xl"
              style={{ animation: `slideUp 0.6s ease-out ${index * 100}ms forwards`, opacity: 0 }}
            >
              <Image
                src={occasion.image}
                alt={occasion.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl md:text-2xl tracking-[0.1em] mb-2 font-[family-name:var(--font-nunito)]">
                  {occasion.title}
                </h3>
                <p className="text-sm text-white/80 font-[family-name:var(--font-nunito)]">
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

