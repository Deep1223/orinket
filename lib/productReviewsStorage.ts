export interface StoredReview {
  id: string
  author: string
  rating: number
  title?: string
  text: string
  date: string
  verified?: boolean
}

const STORAGE_KEY = "orinket_user_reviews"

function readAll(): Record<string, StoredReview[]> {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const data = JSON.parse(raw) as Record<string, StoredReview[]>
    return data && typeof data === "object" ? data : {}
  } catch {
    return {}
  }
}

function writeAll(data: Record<string, StoredReview[]>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* ignore */
  }
}

export function getUserReviewsForProduct(productId: string): StoredReview[] {
  const all = readAll()
  return Array.isArray(all[productId]) ? all[productId] : []
}

export function addUserReview(
  productId: string,
  input: {
    author: string
    rating: number
    title?: string
    text: string
  }
): StoredReview {
  const review: StoredReview = {
    id: `ur_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    author: input.author.trim().slice(0, 80),
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    title: input.title?.trim().slice(0, 120),
    text: input.text.trim().slice(0, 2000),
    date: new Date().toISOString(),
    verified: false,
  }
  const all = readAll()
  const list = Array.isArray(all[productId]) ? all[productId] : []
  all[productId] = [review, ...list]
  writeAll(all)
  return review
}

export function averageRating(reviews: { rating: number }[]): number {
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((s, r) => s + r.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

export function formatReviewDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  } catch {
    return iso
  }
}
