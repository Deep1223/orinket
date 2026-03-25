import Image from "next/image"
import Link from "next/link"

const blogs = [
  {
    id: 1,
    title: "Lab-Grown Diamonds: Styling & Care for the Modern Woman",
    excerpt: "If jewellery had a reality check, lab-grown diamonds would be it. Real, pretty, and completely low-drama...",
    image: "/images/blog-1.jpg",
    date: "03 Mar",
    href: "/blog/lab-grown-diamonds"
  },
  {
    id: 2,
    title: "The Women's Day Jewellery Guide Nobody Asked For, But Everybody Needed",
    excerpt: "From powerful statement pieces to delicate everyday wear, we've got you covered for Women's Day...",
    image: "/images/blog-2.jpg",
    date: "02 Mar",
    href: "/blog/womens-day-guide"
  },
  {
    id: 3,
    title: "Gold vs Silver Jewellery: How to Choose What Suits You Best",
    excerpt: "The great debate is always on – gold or silver? That's like asking, chai or coffee, Friends or Seinfeld...",
    image: "/images/blog-3.jpg",
    date: "01 Mar",
    href: "/blog/gold-vs-silver"
  }
]

export default function BlogSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-12 text-center font-[family-name:var(--font-nunito)]">
          BLOGS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
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
                <span className="text-sm text-gold font-[family-name:var(--font-nunito)]">
                  {blog.date}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-[family-name:var(--font-nunito)] mb-2 group-hover:text-gold-dark transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-sm text-muted-foreground font-[family-name:var(--font-nunito)] line-clamp-2">
                {blog.excerpt}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block px-8 py-3 border border-foreground text-foreground text-sm tracking-[0.2em] hover:bg-foreground hover:text-background transition-all font-[family-name:var(--font-nunito)]"
          >
            READ MORE
          </Link>
        </div>
      </div>
    </section>
  )
}

