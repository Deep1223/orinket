import Link from "next/link"
import { Instagram, Facebook, Twitter, Youtube, Mail } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Necklaces", href: "/necklaces" },
    { name: "Earrings", href: "/earrings" },
    { name: "Bracelets", href: "/bracelets" },
    { name: "Rings", href: "/rings" },
    { name: "9KT Gold", href: "/9kt-gold" }
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/story" },
    { name: "Stores", href: "/stores" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" }
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faq" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "Track Order", href: "/track" }
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund" }
  ]
}

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" }
]

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold tracking-wider mb-2 font-[family-name:var(--font-nunito)]">
                JOIN ORINKET FAMILY
              </h3>
              <p className="text-white/70 font-[family-name:var(--font-nunito)] text-xs sm:text-sm">
                Exclusive offers, new arrivals & styling tips
              </p>
            </div>
            <form className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <div className="relative flex-1 md:w-72">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-gold rounded-lg font-[family-name:var(--font-nunito)] text-sm transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gold text-white text-xs sm:text-sm font-semibold tracking-wider hover:bg-gold-dark transition-colors font-[family-name:var(--font-nunito)] rounded-lg touch-target"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-2xl tracking-[0.2em] font-[family-name:var(--font-nunito)]">
                ORINKET
              </h2>
            </Link>
            <p className="text-white/70 text-sm font-[family-name:var(--font-nunito)] mb-6 leading-relaxed">
              Everyday demi-fine jewellery. Premium quality, accessible luxury.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 hover:bg-gold transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm tracking-wider mb-4 font-[family-name:var(--font-nunito)]">
              SHOP
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white transition-colors font-[family-name:var(--font-nunito)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm tracking-wider mb-4 font-[family-name:var(--font-nunito)]">
              COMPANY
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white transition-colors font-[family-name:var(--font-nunito)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm tracking-wider mb-4 font-[family-name:var(--font-nunito)]">
              SUPPORT
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white transition-colors font-[family-name:var(--font-nunito)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm tracking-wider mb-4 font-[family-name:var(--font-nunito)]">
              LEGAL
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white transition-colors font-[family-name:var(--font-nunito)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm font-[family-name:var(--font-nunito)]">
              &copy; {new Date().getFullYear()} Orinket. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-white/50 text-sm font-[family-name:var(--font-nunito)]">
                We accept:
              </span>
              <div className="flex gap-2">
                {["Visa", "Mastercard", "UPI", "PayTM"].map((payment) => (
                  <span
                    key={payment}
                    className="px-2 py-1 bg-white/10 text-white/70 text-xs font-[family-name:var(--font-nunito)]"
                  >
                    {payment}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

