import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import ProductGrid from "@/components/orinket/ProductGrid"
import AnimatedSection from "@/components/orinket/AnimatedSection"
import { giftRecipientCopy } from "@/data/landingCollections"
import { getGiftProductsForRecipient } from "@/data/dummyProducts"
import { fonts } from "@/lib/fonts"

const RECIPIENTS = ["for-her", "for-him"] as const

type Props = { params: Promise<{ recipient: string }> }

export function generateStaticParams() {
  return RECIPIENTS.map((recipient) => ({ recipient }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { recipient } = await params
  const copy = giftRecipientCopy[recipient]
  if (!copy) return { title: "Gifts | ORINKET" }
  return {
    title: `${copy.title} | ORINKET`,
    description: copy.description,
  }
}

export default async function GiftsRecipientPage({ params }: Props) {
  const { recipient } = await params
  const copy = giftRecipientCopy[recipient]
  if (!copy) notFound()

  const key = recipient === "for-him" ? "him" : "her"
  const products = getGiftProductsForRecipient(key)

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <AnimatedSection animation="fadeIn" delay={80}>
          <div className="text-center mb-12">
            <h1 className={`text-3xl md:text-5xl font-light tracking-[0.1em] ${fonts.headings} mb-4`}>
              {copy.title}
            </h1>
            <p className={`text-muted-foreground max-w-xl mx-auto ${fonts.body}`}>
              {copy.description}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={120}>
          <ProductGrid products={products} />
        </AnimatedSection>
      </div>
      <Footer />
    </main>
  )
}
