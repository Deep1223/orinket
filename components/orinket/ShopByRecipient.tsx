import Image from "next/image"
import Link from "next/link"

const recipients = [
  {
    title: "Gifts For Her",
    image: "/images/gifts-for-her.jpg",
    href: "/gifts/for-her"
  },
  {
    title: "Gifts For Him",
    image: "/images/gifts-for-him.jpg",
    href: "/gifts/for-him"
  }
]

export default function ShopByRecipient() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-12 text-center font-[family-name:var(--font-cormorant)]">
          SHOP BY RECIPIENT
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {recipients.map((recipient) => (
            <Link
              key={recipient.title}
              href={recipient.href}
              className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden"
            >
              <Image
                src={recipient.image}
                alt={recipient.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-end justify-center pb-12">
                <div className="text-center">
                  <h3 className="text-white text-2xl md:text-3xl tracking-[0.15em] mb-4 font-[family-name:var(--font-cormorant)]">
                    {recipient.title}
                  </h3>
                  <span className="inline-block px-6 py-2 border border-white text-white text-sm tracking-[0.2em] group-hover:bg-white group-hover:text-foreground transition-all font-[family-name:var(--font-montserrat)]">
                    SHOP NOW
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
