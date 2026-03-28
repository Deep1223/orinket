"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Heart, ShoppingBag, User, Menu, X, GitCompare } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useCompare } from "@/context/CompareContext"
import { useCurrency } from "@/context/CurrencyContext"
import { dummyProducts } from "@/data/dummyProducts"
import { categories, searchTags } from "@/dummydata/header-menu/categories"
import { font } from "@/lib/fonts"

export default function Header() {
  const {
    getTopBannerDesktopText,
    getTopBannerMobileText,
    getSecondaryBannerText,
  } = useCurrency()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
  const router = useRouter()
  const { cartCount, wishlistItems } = useCart()
  const { compareCount } = useCompare()
  const uniqueProductNames = Array.from(new Set(dummyProducts.map((product) => product.name)))
  const searchSuggestions =
    searchQuery.trim().length > 0
      ? uniqueProductNames
          .filter((name) => name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
          .slice(0, 8)
      : []

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleSuggestionClick = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
    setSearchOpen(false)
    setSearchQuery("")
  }

  const handleSearchInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchSuggestions.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveSuggestionIndex((prev) => (prev < searchSuggestions.length - 1 ? prev + 1 : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : searchSuggestions.length - 1))
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      e.preventDefault()
      setSearchQuery(searchSuggestions[activeSuggestionIndex])
      setActiveSuggestionIndex(-1)
    }
  }

  useEffect(() => {
    setActiveSuggestionIndex(-1)
  }, [searchQuery, searchOpen])

  return (
    <header className="w-full relative z-40 bg-white">
      {/* Top Banner */}
      <div className={`bg-[#2d2d2d] text-white text-center py-2 px-3 sm:px-4 text-xs sm:text-sm tracking-wide ${font('body')}`}>
        <span className="hidden md:inline">{getTopBannerDesktopText()}</span>
        <span className="md:hidden text-[11px] sm:text-xs">{getTopBannerMobileText()}</span>
      </div>

      {/* Secondary Banner */}
      <div className={`bg-gold-light text-gold-dark text-center py-2 px-3 sm:px-4 text-xs sm:text-sm ${font('body')}`}>
        <span className="block text-[11px] sm:text-xs md:text-sm">{getSecondaryBannerText()}</span>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="relative flex items-center justify-between py-3 sm:py-4">
            {/* Mobile: menu opens sidebar (search, cart, etc.). Desktop: hidden. */}
            <button
              type="button"
              className="z-10 shrink-0 p-2.5 touch-target lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Logo — centered on mobile, left on lg+ */}
            <Link
              href="/"
              className="group absolute left-1/2 top-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 flex-shrink-0 lg:static lg:left-auto lg:top-auto lg:z-auto lg:translate-x-0 lg:translate-y-0"
            >
              <h1 className={`text-2xl font-semibold tracking-widest text-foreground transition-all duration-300 group-hover:text-gold-dark group-hover:scale-105 transform sm:text-3xl md:text-4xl ${font('headings')}`}>
                ORINKET
              </h1>
            </Link>

            {/* Balance hamburger width so logo stays visually centered */}
            <div className="w-11 shrink-0 lg:hidden" aria-hidden />

            {/* Right Icons — desktop / tablet lg+ only */}
            <div className="hidden items-center gap-1 sm:gap-2 md:gap-4 lg:flex">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 hover:text-gold-dark transition-all duration-300 touch-target"
                aria-label="Search"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <Link
                href="/compare"
                className="p-2.5 hover:text-gold-dark transition-all duration-300 touch-target relative"
                aria-label={`Compare products${compareCount > 0 ? `, ${compareCount} selected` : ""}`}
              >
                <GitCompare className="w-5 h-5 sm:w-6 sm:h-6" />
                {compareCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-bold text-white ${font('labels')}`}
                  >
                    {compareCount}
                  </span>
                )}
              </Link>
              <Link href="/wishlist" className="relative hidden p-2.5 transition-all duration-300 hover:text-gold-dark touch-target sm:block">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                {wishlistItems.length > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-white text-xs font-bold ${font('labels')}`}
                  >
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Link href="/account" className="p-2.5 hover:text-gold-dark transition-all duration-300 touch-target hidden md:block">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link href="/cart" className="p-2.5 hover:text-gold-dark transition-all duration-300 touch-target relative">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                {cartCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gold px-1 text-xs font-bold text-white ${font('labels')}`}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Desktop Category Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-8 py-4 border-t border-border">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={category.href}
                className={`text-xs tracking-wider text-foreground hover:text-gold-dark transition-all duration-300 whitespace-nowrap relative group ${font('navigation')}`}
              >
                {category.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/55 backdrop-blur-sm z-50 flex flex-col">
          <div className="bg-gradient-to-b from-[#fffefb] via-white to-[#fdf8ef] border-b border-[#e7dcc8] p-4 sm:p-6 shadow-[0_18px_45px_rgba(38,24,8,0.18)]">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <p className={`text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold ${font('labels')}`}>
                  Search Orinket
                </p>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#e3d7c2] bg-white hover:bg-[#f8f2e6] transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="flex-1 w-full relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-dark/70" />
                  <input
                    type="text"
                    placeholder="Search for necklaces, earrings, rings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchInputKeyDown}
                    className={`w-full pl-12 pr-4 py-3.5 border border-[#d9c9ad] bg-[#fffcf6] rounded-xl focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 text-sm ${font('body')}`}
                    autoFocus
                  />
                  {searchSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-xl border border-[#e5dac8] bg-white shadow-[0_20px_40px_rgba(42,24,8,0.12)] overflow-hidden z-10">
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          onMouseEnter={() => setActiveSuggestionIndex(index)}
                          className={`w-full px-4 py-2.5 text-left text-sm text-foreground transition-colors border-b border-[#f2ecdf] last:border-b-0 ${font('body')} ${
                            activeSuggestionIndex === index ? "bg-[#fff6e7]" : "hover:bg-[#fff6e7]"
                          }`}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className={`w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#1b0e09] via-[#2a1710] to-[#1b0e09] border border-[#3c2417] text-white text-sm tracking-[0.14em] hover:from-[#2b170f] hover:via-[#3a2217] hover:to-[#2b170f] transition-all rounded-xl touch-target shadow-[0_10px_24px_rgba(34,17,7,0.25)] ${font('buttons')}`}
                >
                  SEARCH
                </button>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {searchTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      router.push(`/search?q=${encodeURIComponent(tag)}`)
                      setSearchOpen(false)
                    }}
                    className={`px-3 py-1.5 rounded-full border border-[#e4d8c3] bg-white text-xs text-foreground hover:border-gold hover:text-gold-dark hover:bg-[#fff8ea] transition-all ${font('labels')}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sidebar — search, shop actions, categories, account */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white pt-2 lg:hidden">
          <div className="p-4 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className={`text-2xl font-semibold tracking-widest sm:text-3xl ${font('headings')}`}>
                ORINKET
              </h2>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="touch-target p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col gap-1 border-b border-gray-200 pb-4">
              <button
                type="button"
                className={`flex items-center gap-3 rounded-lg px-2 py-3.5 text-left text-base transition-colors hover:bg-gray-50 ${font('navigation')}`}
                onClick={() => {
                  setMobileMenuOpen(false)
                  setSearchOpen(true)
                }}
              >
                <Search className="h-6 w-6 shrink-0" />
                <span>Search</span>
              </button>
              <Link
                href="/compare"
                className={`flex items-center gap-3 rounded-lg px-2 py-3.5 text-base transition-colors hover:bg-gray-50 ${font('navigation')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <GitCompare className="h-6 w-6 shrink-0" />
                <span>Compare</span>
                {compareCount > 0 && (
                  <span className="ml-auto rounded-full bg-foreground px-2.5 py-1 text-xs font-bold text-white">
                    {compareCount}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                className={`flex items-center gap-3 rounded-lg px-2 py-3.5 text-base transition-colors hover:bg-gray-50 ${font('navigation')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingBag className="h-6 w-6 shrink-0" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="ml-auto rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/wishlist"
                className={`flex items-center gap-3 rounded-lg px-2 py-3.5 text-base transition-colors hover:bg-gray-50 ${font('navigation')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="h-6 w-6 shrink-0" />
                <span>Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="ml-auto rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Link
                href="/account"
                className={`flex items-center gap-3 rounded-lg px-2 py-3.5 text-base transition-colors hover:bg-gray-50 ${font('navigation')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-6 w-6 shrink-0" />
                <span>Account</span>
              </Link>
            </div>

            <p className={`mb-2 mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground ${font('labels')}`}>
              Shop
            </p>
            <nav className="flex flex-col gap-0">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`border-b border-gray-200 px-2 py-3.5 text-base tracking-wide transition-colors hover:bg-gray-50 sm:text-lg ${font('navigation')}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

