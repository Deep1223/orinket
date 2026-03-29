"use client"

import { useState } from "react"
import Link from "next/link"
import { PackageOpen } from "lucide-react"
import ProductCard from "@/components/orinket/ProductCard"
import { useAppSelector } from "@/store/hooks"
import { selectProducts } from "@/store/selectors"
import { getProductsByCategory } from "@/lib/catalogQueries"
import { fineGold } from "@/dummydata/fine-gold/content"
import { fonts } from "@/lib/fonts"

export default function FineGold() {
  const [activeFilter, setActiveFilter] = useState("All")
  const catalog = useAppSelector(selectProducts)
  const nineKt = getProductsByCategory(catalog, "9kt-gold")

  const filteredProducts =
    activeFilter === "All"
      ? nineKt
      : nineKt.filter(
          (p) => p.subcategory?.toLowerCase() === activeFilter.toLowerCase()
        )

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#faf9f7] via-white to-[#f0ede8] pt-8 pb-5 text-stone-900 sm:pt-10 sm:pb-6 md:pt-12 md:pb-6 lg:pt-14 lg:pb-7 xl:pt-16 xl:pb-8"
      aria-labelledby="fine-gold-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] sm:opacity-[0.45]"
        style={{
          backgroundImage: `radial-gradient(ellipse 100% 50% at 50% -20%, color-mix(in oklab, var(--gold) 11%, transparent), transparent 58%)`,
        }}
      />
      <div className="pointer-events-none absolute -right-24 top-16 h-64 w-64 rounded-full bg-[#1e2a3a]/[0.035] blur-3xl sm:-right-32 sm:top-24 sm:h-96 sm:w-96 sm:bg-[#1e2a3a]/[0.04]" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[#c4a574]/[0.06] blur-3xl sm:-left-24 sm:h-80 sm:w-80 sm:bg-[#c4a574]/[0.08]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
        {/* Editorial header — premium card, scales on small screens */}
        <div className="mb-7 sm:mb-8 md:mb-9 lg:mb-10">
          <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white/75 shadow-[0_20px_56px_-24px_rgba(28,25,23,0.12)] ring-1 ring-stone-900/[0.04] backdrop-blur-sm sm:rounded-[1.75rem]">
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-80 sm:h-64 sm:w-64"
              style={{
                background: `radial-gradient(circle at center, color-mix(in oklab, var(--gold) 10%, transparent) 0%, transparent 70%)`,
              }}
              aria-hidden
            />

            <div className="relative px-5 py-5 text-center sm:px-8 sm:py-7 md:px-12 md:py-8 lg:px-14 lg:py-9">
              <div className="mx-auto mb-4 flex max-w-2xl flex-col items-center sm:mb-5">
                <p
                  className={`text-[9px] font-medium uppercase tracking-[0.42em] text-stone-400 sm:text-[10px] sm:tracking-[0.45em] ${fonts.labels}`}
                >
                  Collection
                </p>
                <span
                  className="mt-3 h-px w-10 bg-gradient-to-r from-transparent via-stone-300 to-transparent sm:mt-3.5 sm:w-12"
                  aria-hidden
                />
              </div>
              <h2
                id="fine-gold-heading"
                className={`mx-auto max-w-[22ch] text-[1.75rem] font-medium leading-[1.08] tracking-[0.02em] text-stone-800 sm:max-w-none sm:text-[2.125rem] sm:leading-[1.06] sm:tracking-[0.03em] md:text-5xl md:leading-[1.05] lg:text-[2.875rem] ${fonts.headings}`}
              >
                {fineGold.title}
              </h2>
              <p
                className={`mx-auto mt-4 max-w-md text-[14px] font-light leading-[1.7] tracking-[0.02em] text-stone-500 sm:mt-5 sm:max-w-lg sm:text-[15px] sm:leading-[1.75] md:mt-6 md:max-w-xl md:text-base ${fonts.body}`}
              >
                {fineGold.description}
              </p>
            </div>
          </div>
        </div>

        {/* Filters: horizontal scroll on narrow viewports, centered wrap on larger */}
        <div className="mb-6 sm:mb-7 md:mb-8">
          <p
            className={`mb-2 hidden text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-400 sm:mb-3 sm:block ${fonts.labels}`}
          >
            Shop by style
          </p>
          <div className="relative">
            <div
              className="flex snap-x snap-mandatory gap-2 overflow-x-auto overflow-y-hidden pb-2 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:gap-2.5 sm:overflow-x-visible sm:pb-0 md:gap-3 [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Filter products by style"
            >
              {fineGold.filters.map((filter) => {
                const isActive = activeFilter === filter
                return (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(filter)}
                    className={`min-h-[44px] shrink-0 snap-center rounded-full border px-4 py-2.5 text-[11px] font-semibold tracking-[0.1em] transition-all duration-300 sm:min-h-0 sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.12em] md:text-sm ${fonts.buttons} ${
                      isActive
                        ? "border-[#1e2a3a] bg-[#1e2a3a] text-white"
                        : "border-stone-200/90 bg-white/90 text-stone-600 backdrop-blur-sm hover:border-stone-300 hover:text-stone-900"
                    }`}
                  >
                    {filter}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Product grid or empty state */}
        {filteredProducts.length === 0 ? (
          <div
            className="mb-3 rounded-2xl border border-dashed border-stone-200/90 bg-white/60 px-6 py-14 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] sm:mb-4 sm:py-16 md:mb-4 md:py-16"
            role="status"
            aria-live="polite"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100/90 text-stone-400 ring-1 ring-stone-200/80 sm:mb-6">
              <PackageOpen className="h-7 w-7" strokeWidth={1.25} aria-hidden />
            </div>
            <h3
              className={`mb-2 text-lg font-semibold tracking-tight text-stone-900 sm:text-xl ${fonts.headings}`}
            >
              {fineGold.emptyState.title}
            </h3>
            <p
              className={`mx-auto max-w-md text-sm leading-relaxed text-stone-600 sm:text-[15px] ${fonts.body}`}
            >
              {activeFilter === "All"
                ? fineGold.emptyState.descriptionAll
                : `No pieces in “${activeFilter}” right now. ${fineGold.emptyState.descriptionFiltered}`}
            </p>
          </div>
        ) : (
          <div className="mb-3 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[480px]:gap-4 sm:mb-4 sm:gap-5 md:grid-cols-3 md:gap-5 md:mb-4 lg:gap-6 xl:grid-cols-4 xl:gap-5 2xl:gap-6">
            {filteredProducts.map((product, idx) => (
              <div
                key={product.id}
                className="group/card-wrap min-w-0 animate-fadeIn"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="transition duration-500 ease-out group-hover/card-wrap:-translate-y-1 motion-reduce:group-hover/card-wrap:translate-y-0">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length >= 4 && (
          <div className="border-t border-stone-200/70 pt-4 text-center sm:pt-5 md:pt-5">
            <Link
              href="/category/9kt-gold"
              className={`inline-flex min-h-[48px] w-full max-w-sm items-center justify-center rounded-full border border-stone-200/90 bg-white px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-900 shadow-[0_8px_28px_-12px_rgba(28,25,23,0.14)] transition-all duration-300 hover:border-[#1e2a3a] hover:bg-[#1e2a3a] hover:text-white hover:shadow-[0_16px_40px_-16px_rgba(30,42,58,0.32)] sm:min-h-0 sm:w-auto sm:max-w-none sm:px-10 sm:py-3.5 sm:text-xs sm:tracking-[0.2em] ${fonts.buttons}`}
            >
              View all collection
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
