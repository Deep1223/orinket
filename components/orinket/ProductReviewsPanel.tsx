"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Star, X, PenLine } from "lucide-react"
import type { Product } from "@/data/dummyProducts"
import { getMockReviews } from "@/lib/productDetailMock"
import {
  addUserReview,
  averageRating,
  formatReviewDate,
  getUserReviewsForProduct,
  type StoredReview,
} from "@/lib/productReviewsStorage"
import { font } from "@/lib/fonts"

type Combined = {
  id: string
  author: string
  rating: number
  title?: string
  text: string
  date: string
  verified?: boolean
  kind: "featured" | "customer"
}

interface ProductReviewsPanelProps {
  product: Product
}

function parseSeedDate(d: string): number {
  const t = Date.parse(d)
  return Number.isNaN(t) ? 0 : t
}

export default function ProductReviewsPanel({ product }: ProductReviewsPanelProps) {
  const [userReviews, setUserReviews] = useState<StoredReview[]>([])
  const [writeOpen, setWriteOpen] = useState(false)
  const [filterStar, setFilterStar] = useState<number | "all">("all")
  const [form, setForm] = useState({
    author: "",
    title: "",
    text: "",
    rating: 5,
  })
  const [formError, setFormError] = useState<string | null>(null)
  const [toastSuccess, setToastSuccess] = useState<string | null>(null)

  const refreshUser = useCallback(() => {
    setUserReviews(getUserReviewsForProduct(product.id))
  }, [product.id])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const seedReviews = useMemo(() => getMockReviews(product.name, product.reviews ?? 0), [product])

  const combined: Combined[] = useMemo(() => {
    const featured: Combined[] = seedReviews.map((r) => ({
      id: `seed_${r.id}`,
      author: r.author,
      rating: r.rating,
      text: r.text,
      date: r.date,
      kind: "featured" as const,
    }))
    const customer: Combined[] = userReviews.map((r) => ({
      id: r.id,
      author: r.author,
      rating: r.rating,
      title: r.title,
      text: r.text,
      date: r.date,
      verified: r.verified,
      kind: "customer" as const,
    }))
    const merged = [...customer, ...featured]
    merged.sort((a, b) => {
      const ta = a.kind === "customer" ? new Date(a.date).getTime() : parseSeedDate(a.date)
      const tb = b.kind === "customer" ? new Date(b.date).getTime() : parseSeedDate(b.date)
      return tb - ta
    })
    return merged
  }, [seedReviews, userReviews])

  const filtered = useMemo(() => {
    if (filterStar === "all") return combined
    return combined.filter((r) => Math.round(r.rating) === filterStar)
  }, [combined, filterStar])

  const avg = averageRating(combined)
  const totalCount = combined.length

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (!form.author.trim() || !form.text.trim()) {
      setFormError("Please add your name and review text.")
      return
    }
    addUserReview(product.id, {
      author: form.author,
      title: form.title || undefined,
      text: form.text,
      rating: form.rating,
    })
    setForm({ author: "", title: "", text: "", rating: 5 })
    refreshUser()
    setWriteOpen(false)
    setToastSuccess("Thanks — your review was posted.")
    setTimeout(() => setToastSuccess(null), 5000)
  }

  return (
    <section id="reviews" className="scroll-mt-28">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className={`mb-2 text-[10px] uppercase tracking-[0.35em] text-gold-dark ${font('labels')}`}>
            Customer voices
          </p>
          <h2 className={`text-2xl font-light text-foreground md:text-3xl ${font('headings')}`}>
            Ratings & reviews
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className={`flex items-baseline gap-2 ${font('body')}`}>
            <span className="text-3xl font-light tabular-nums">{avg > 0 ? avg.toFixed(1) : "—"}</span>
            <span className="text-sm text-muted-foreground">
              / 5 · {totalCount} {totalCount === 1 ? "review" : "reviews"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setWriteOpen(true)}
            className={`inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-gold-dark ${font('buttons')}`}
          >
            <PenLine className="h-3.5 w-3.5" strokeWidth={2} />
            Write a review
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(["all", 5, 4, 3, 2, 1] as const).map((f) => (
          <button
            key={String(f)}
            type="button"
            onClick={() => setFilterStar(f)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors ${font('buttons')} ${
              filterStar === f
                ? "bg-foreground text-white"
                : "border border-border/60 bg-cream/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {f === "all" ? "All stars" : `${f} star${f === 1 ? "" : "s"}`}
          </button>
        ))}
      </div>

      {toastSuccess && (
        <p className={`mb-4 text-sm text-emerald-800 ${font('body')}`}>{toastSuccess}</p>
      )}

      <div className="max-h-[min(80vh,720px)] space-y-4 overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <p className={`text-sm text-muted-foreground ${font('body')}`}>
            No reviews match this filter.
          </p>
        ) : (
          filtered.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl border border-border/40 bg-cream/25 px-5 py-4 ring-1 ring-black/[0.03]"
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-sm font-semibold text-foreground ${font('headings')}`}>
                    {r.author}
                  </span>
                  {r.kind === "featured" && (
                    <span className={`rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-dark ${font('labels')}`}>
                      Featured
                    </span>
                  )}
                  {r.kind === "customer" && (
                    <span className={`rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-900 ${font('labels')}`}>
                      Customer
                    </span>
                  )}
                </div>
                <time
                  className={`text-xs text-muted-foreground ${font('body')}`}
                  dateTime={r.kind === "customer" ? r.date : undefined}
                >
                  {r.kind === "customer" ? formatReviewDate(r.date) : r.date}
                </time>
              </div>
              {r.title && (
                <p className={`mb-1 text-sm font-medium text-foreground ${font('headings')}`}>
                  {r.title}
                </p>
              )}
              <div className="mb-2 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < Math.floor(r.rating) ? "fill-gold text-gold" : "text-border"
                    }`}
                  />
                ))}
              </div>
              <p className={`text-sm leading-relaxed text-muted-foreground ${font('body')}`}>
                {r.text}
              </p>
            </article>
          ))
        )}
      </div>

      <p className={`mt-6 text-center text-xs text-muted-foreground ${font('body')}`}>
        Showing all {filtered.length} review{filtered.length === 1 ? "" : "s"}
        {filterStar !== "all" ? " (filtered)" : ""}.{" "}
        <Link href="/wishlist" className="text-gold-dark underline-offset-4 hover:underline">
          View wishlist & compare
        </Link>
      </p>

      {writeOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="write-review-title"
          onClick={() => setWriteOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border/50 bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-2">
              <h3 id="write-review-title" className={`text-lg font-semibold ${font('headings')}`}>
                Write a review
              </h3>
              <button
                type="button"
                onClick={() => setWriteOpen(false)}
                className="rounded-full p-2 hover:bg-cream"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className={`mb-4 text-sm text-muted-foreground ${font('body')}`}>
              {product.name}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`mb-1 block text-[11px] font-semibold uppercase tracking-wider text-foreground ${font('labels')}`}>
                  Your name
                </label>
                <input
                  required
                  value={form.author}
                  onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                  className={`w-full rounded-lg border border-border/60 px-3 py-2.5 text-sm outline-none focus:border-gold ${font('body')}`}
                  placeholder="e.g. Aditi"
                />
              </div>
              <div>
                <span className={`mb-1 block text-[11px] font-semibold uppercase tracking-wider text-foreground ${font('labels')}`}>
                  Rating
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, rating: n }))}
                      className="p-1"
                      aria-label={`${n} stars`}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          n <= form.rating ? "fill-gold text-gold" : "text-border"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={`mb-1 block text-[11px] font-semibold uppercase tracking-wider text-foreground ${font('labels')}`}>
                  Review title (optional)
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className={`w-full rounded-lg border border-border/60 px-3 py-2.5 text-sm outline-none focus:border-gold ${font('body')}`}
                  placeholder="Short headline"
                />
              </div>
              <div>
                <label className={`mb-1 block text-[11px] font-semibold uppercase tracking-wider text-foreground ${font('labels')}`}>
                  Your review
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.text}
                  onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                  className={`w-full resize-y rounded-lg border border-border/60 px-3 py-2.5 text-sm outline-none focus:border-gold ${font('body')}`}
                  placeholder="Tell others what you loved about this piece…"
                />
              </div>
              {formError && (
                <p className={`text-sm text-red-600 ${font('body')}`}>{formError}</p>
              )}
              <button
                type="submit"
                className={`w-full rounded-sm bg-foreground py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-gold-dark ${font('buttons')}`}
              >
                Submit review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
