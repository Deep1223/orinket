import Image from "next/image"
import Link from "next/link"
import { deserveToShine } from "@/dummydata/deserve-to-shine/content"
import { fonts } from "@/lib/fonts"

export default function DeserveToShine() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 items-center">
          {/* Image - Reduced size */}
          <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden rounded-xl shadow-2xl">
            <Image
              src={deserveToShine.image}
              alt={deserveToShine.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content - Premium styling */}
          <div className="lg:pl-12">
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.08em] mb-10 text-gray-900 ${fonts.headings}`}>
              {deserveToShine.title}
            </h2>
            {deserveToShine.description.map((paragraph, index: number) => (
              <p key={index} className={`text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl ${fonts.body} font-light`}>
                {paragraph}
              </p>
            ))}
            <div className="mt-12">
              <Link
                href={deserveToShine.cta.href}
                className={`inline-block px-14 py-5 bg-black text-white text-base tracking-[0.15em] hover:bg-gray-900 transition-all duration-300 ${fonts.buttons} font-light`}
              >
                {deserveToShine.cta.text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

