import Image from "next/image"
import { founderMessage } from "@/dummydata/founder-message/content"
import { fonts } from "@/lib/fonts"

export default function FounderMessage() {
  return (
    <section className="py-16 md:py-24 bg-cream px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-10 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center text-center lg:text-left w-full max-w-xl lg:max-w-md xl:max-w-lg shrink-0 space-y-6">
            <h2 className={`text-3xl md:text-4xl font-light tracking-[0.1em] ${fonts.headings}`}>
              {founderMessage.title}
            </h2>
            <blockquote
              className={`text-muted-foreground ${fonts.body} leading-relaxed italic text-lg`}
            >
              &quot;{founderMessage.quote}&quot;
            </blockquote>
            <p className={`text-muted-foreground ${fonts.body} leading-relaxed`}>
              {founderMessage.description}
            </p>
            <div className="pt-2 flex flex-col items-center lg:items-start gap-3">
              <div className="w-16 h-0.5 bg-gold shrink-0" aria-hidden />
              <span className={`${fonts.headings} text-lg tracking-wider font-medium`}>
                {founderMessage.name}
              </span>
              <p className={`text-sm text-muted-foreground ${fonts.labels}`}>
                {founderMessage.role}
              </p>
            </div>
          </div>

          <div className="relative mx-auto aspect-[3/4] w-full max-w-[276px] sm:max-w-[324px] md:max-w-[376px] lg:max-w-[432px] shrink-0 overflow-hidden rounded-lg shadow-lg lg:mx-0">
            <Image
              src={founderMessage.image}
              alt={founderMessage.alt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

