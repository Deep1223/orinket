import Image from "next/image"
import Link from "next/link"
import { blogPosts } from "@/data/dummyCompanyPages"
import { blogSection } from "@/dummydata/blog-section/content"
import { fonts } from "@/lib/fonts"

const homeBlogCards = blogPosts.slice(0, 3).map((p) => ({
  ...p,
  shortDate: p.dateLabel.split(" ").slice(0, 2).join(" "),
  href: `/blog/${p.slug}`,
}))

export default function BlogSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-light tracking-[0.1em] mb-12 text-center ${fonts.headings}`}>
          {blogSection.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homeBlogCards.map((blog) => (
            <Link
              key={blog.slug}
              href={blog.href}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-sm text-gold ${fonts.labels}`}>
                  {blog.shortDate}
                </span>
              </div>
              <h3 className={`text-lg md:text-xl mb-2 group-hover:text-gold-dark transition-colors line-clamp-2 ${fonts.headings}`}>
                {blog.title}
              </h3>
              <p className={`text-sm text-muted-foreground line-clamp-2 ${fonts.body}`}>
                {blog.excerpt}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={blogSection.button.href}
            className={`inline-block px-8 py-3 border border-foreground text-foreground text-sm tracking-[0.2em] hover:bg-foreground hover:text-background transition-all ${fonts.buttons}`}
          >
            {blogSection.button.text}
          </Link>
        </div>
      </div>
    </section>
  )
}

