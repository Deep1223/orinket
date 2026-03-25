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
    <header className="w-full relative z-40 bg-white">
      {/* Top Banner */}
      <div className="bg-[#2d2d2d] text-white text-center py-2 px-3 sm:px-4 text-xs sm:text-sm font-[family-name:var(--font-nunito)] tracking-wide">
        <span className="hidden md:inline">BUY 2 AT Rs.1898 | USE CODE : EXTRA100 | BUY 3 AT Rs.2,999 | BUY 4 AT Rs.3,499 | BUY 6 AT Rs.4,999</span>
        <span className="md:hidden text-[11px] sm:text-xs">BUY 2 AT Rs.1898 | USE CODE: EXTRA100</span>
      </div>

      {/* Secondary Banner */}
      <div className="bg-gold-light text-gold-dark text-center py-2 px-3 sm:px-4 text-xs sm:text-sm font-[family-name:var(--font-nunito)]">
        <span className="block text-[11px] sm:text-xs md:text-sm">FREE STUDS worth Rs.1495 on orders above Rs.2999</span>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2.5 touch-target"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group mx-auto lg:mx-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-widest text-foreground font-[family-name:var(--font-nunito)] transition-all duration-300 group-hover:text-gold-dark group-hover:scale-105 transform">
                ORINKET
              </h1>
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 hover:text-gold-dark transition-all duration-300 touch-target"
                aria-label="Search"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <Link href="/wishlist" className="p-2.5 hover:text-gold-dark transition-all duration-300 touch-target hidden sm:block relative">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-[family-name:var(--font-nunito)] font-bold animate-pulse">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Link href="/account" className="p-2.5 hover:text-gold-dark transition-all duration-300 touch-target hidden md:block">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link href="/cart" className="p-2.5 hover:text-gold-dark transition-all duration-300 touch-target relative">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute -top-1 -right-1 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-[family-name:var(--font-nunito)] font-bold animate-pulse">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Category Nav */}
          <nav className="hidden lg:flex items-center justify-center gap-8 py-4 border-t border-border">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-xs font-[family-name:var(--font-nunito)] tracking-wider text-foreground hover:text-gold-dark transition-all duration-300 whitespace-nowrap relative group"
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
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex flex-col">
          <div className="bg-white p-4 sm:p-6 shadow-lg">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="flex-1 w-full relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:border-gold font-[family-name:var(--font-nunito)] text-sm"
                  autoFocus
                />
              </div>
              <button 
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-foreground text-white text-sm font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors rounded-lg touch-target"
              >
                SEARCH
              </button>
              <button 
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2.5 touch-target absolute top-4 right-4 sm:relative sm:top-0 sm:right-0"
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
        <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto pt-2">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-widest font-[family-name:var(--font-nunito)]">ORINKET</h2>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                aria-label="Close menu"
                className="p-2 touch-target"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-0">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-base sm:text-lg font-[family-name:var(--font-nunito)] tracking-wide py-3.5 px-2 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-4 pt-4 border-t border-gray-200">
              <Link href="/wishlist" className="flex items-center gap-3 py-3 px-2 touch-target" onClick={() => setMobileMenuOpen(false)}>
                <Heart className="w-6 h-6" />
                <span className="font-[family-name:var(--font-nunito)] text-base">Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="ml-auto bg-gold text-white text-xs px-2.5 py-1 rounded-full font-bold">{wishlistItems.length}</span>
                )}
              </Link>
              <Link href="/account" className="flex items-center gap-3 py-3 px-2 touch-target" onClick={() => setMobileMenuOpen(false)}>
                <User className="w-6 h-6" />
                <span className="font-[family-name:var(--font-nunito)] text-base">Account</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

