import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import { blogPosts } from "@/data/dummyCompanyPages"
import { Sparkles } from "lucide-react"
import { fonts } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Blog | ORINKET",
  description:
    "Styling tips, care guides, and stories from Orinket — demi-fine jewellery for everyday confidence.",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
          <div className="rounded-3xl border border-border bg-gradient-to-b from-cream to-white p-6 sm:p-10 shadow-sm mb-10">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-foreground text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className={`text-xs uppercase tracking-[0.25em] text-muted-foreground ${fonts.labels}`}>
                  Journal
                </p>
                <h1 className={`mt-2 text-3xl md:text-4xl font-semibold text-foreground ${fonts.headings}`}>
                  Orinket blog
                </h1>
                <p className="mt-2 text-sm md:text-base text-muted-foreground ${fonts.body} max-w-2xl leading-relaxed">
                  Practical guides and inspiration — how to layer, gift, and care for pieces you will keep for years.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs ${fonts.body}">
                      <span className="text-gold">{post.category}</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">{post.dateLabel}</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">{post.readMinutes} min read</span>
                    </div>
                    <h2 className={`mt-3 text-lg md:text-xl font-semibold text-foreground ${fonts.headings} group-hover:text-gold-dark transition-colors line-clamp-2`}>
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground ${fonts.body} line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className={`mt-4 inline-block text-xs tracking-[0.2em] text-foreground ${fonts.buttons}`}>
                      READ ARTICLE →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
