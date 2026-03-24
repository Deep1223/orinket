"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react"
import { useCart } from "@/context/CartContext"

const categories = [
  { name: "NEW ARRIVALS", href: "/category/new-arrivals" },
  { name: "NECKLACES", href: "/category/necklaces" },
  { name: "EARRINGS", href: "/category/earrings" },
  { name: "BRACELETS", href: "/category/bracelets" },
  { name: "RINGS", href: "/category/rings" },
  { name: "MEN", href: "/category/men" },
  { name: "9KT GOLD", href: "/category/9kt-gold" },
  { name: "GIFTS", href: "/category/gifts" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { cartCount, wishlistItems } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <header className="w-full sticky top-0 z-40 bg-white">
      {/* Top Banner */}
      <div className="bg-[#2d2d2d] text-white text-center py-2 px-4 text-xs md:text-sm font-[family-name:var(--font-montserrat)] tracking-wide">
        <span className="hidden md:inline">BUY 2 AT Rs.1898 | USE CODE : EXTRA100 | BUY 3 AT Rs.2,999 | BUY 4 AT Rs.3,499 | BUY 6 AT Rs.4,999</span>
        <span className="md:hidden">BUY 2 AT Rs.1898 | USE CODE : EXTRA100</span>
      </div>

      {/* Secondary Banner */}
      <div className="bg-gold-light text-gold-dark text-center py-2 px-4 text-xs md:text-sm font-[family-name:var(--font-montserrat)]">
        <span>FREE STUDS worth Rs.1495 on orders above Rs.2999</span>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-[0.3em] text-foreground font-[family-name:var(--font-cormorant)]">
                ORINKET
              </h1>
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-3 md:gap-5">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:text-gold-dark transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link href="/wishlist" className="p-2 hover:text-gold-dark transition-colors hidden md:block relative">
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-[family-name:var(--font-montserrat)]">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Link href="/account" className="p-2 hover:text-gold-dark transition-colors hidden md:block">
                <User className="w-5 h-5" />
              </Link>
              <Link href="/cart" className="p-2 hover:text-gold-dark transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-[family-name:var(--font-montserrat)]">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Category Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-8 py-3 border-t border-border">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-xs font-[family-name:var(--font-montserrat)] tracking-wider text-foreground hover:text-gold-dark transition-colors whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50">
          <div className="bg-white p-6 shadow-lg">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for necklaces, earrings, bracelets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-sm focus:outline-none focus:border-gold font-[family-name:var(--font-montserrat)] text-sm"
                  autoFocus
                />
              </div>
              <button 
                type="submit"
                className="px-6 py-3 bg-foreground text-white text-sm font-[family-name:var(--font-montserrat)] tracking-wider hover:bg-gold-dark transition-colors"
              >
                SEARCH
              </button>
              <button 
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold tracking-[0.2em] font-[family-name:var(--font-cormorant)]">ORINKET</h2>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-lg font-[family-name:var(--font-montserrat)] tracking-wider py-2 border-b border-border"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex items-center gap-6">
              <Link href="/wishlist" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Heart className="w-5 h-5" />
                <span className="font-[family-name:var(--font-montserrat)]">Wishlist</span>
              </Link>
              <Link href="/account" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <User className="w-5 h-5" />
                <span className="font-[family-name:var(--font-montserrat)]">Account</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
