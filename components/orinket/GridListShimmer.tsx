"use client"

import { fonts } from "@/lib/fonts"

type GridListShimmerProps = {
  /** Number of placeholder tiles (e.g. same as API limit). */
  count: number
  className?: string
}

/**
 * Skeleton grid aligned with Top Styles / product listing grids.
 */
export default function GridListShimmer({ count, className = "" }: GridListShimmerProps) {
  const safe = Math.min(Math.max(count, 1), 24)
  return (
    <div
      className={`grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:gap-4 lg:grid-cols-4 lg:gap-4 xl:grid-cols-4 2xl:grid-cols-5 ${className}`}
      aria-busy
      aria-label="Loading products"
    >
      {Array.from({ length: safe }, (_, i) => (
        <div
          key={i}
          className="animate-pulse"
          style={{ animationDelay: `${i * 45}ms` }}
        >
          <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200 shadow-md ring-1 ring-stone-200/70" />
          <div className="space-y-2">
            <div className={`h-4 w-[88%] rounded-md bg-stone-200 ${fonts.body}`} />
            <div className={`h-4 w-[62%] rounded-md bg-stone-200 ${fonts.body}`} />
            <div className="flex gap-2 pt-1">
              <div className="h-3.5 w-16 rounded-md bg-stone-200" />
              <div className="h-3.5 w-12 rounded-md bg-stone-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
