import Link from "next/link"
import { footerData } from "@/dummydata/footer/content"
import { font } from "@/lib/fonts"

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className={`text-xl sm:text-2xl font-bold tracking-wider mb-2 ${font('headings')}`}>
                {footerData.newsletter.title}
              </h3>
              <p className={`text-white/70 text-xs sm:text-sm ${font('body')}`}>
                {footerData.newsletter.description}
              </p>
            </div>
            <form className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <div className="relative flex-1 md:w-72">
                <input
                  type="email"
                  placeholder="Your email"
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-gold rounded-lg text-sm transition-colors ${font('body')}`}
                />
              </div>
              <button
                type="submit"
                className={`px-6 py-3 bg-gold text-white text-xs sm:text-sm font-semibold tracking-wider hover:bg-gold-dark transition-colors rounded-lg touch-target ${font('buttons')}`}
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <h2 className={`text-2xl tracking-[0.2em] ${font('headings')}`}>
                {footerData.brand.name}
              </h2>
            </Link>
            <p className={`text-white/70 text-sm mb-6 leading-relaxed ${font('body')}`}>
              {footerData.brand.description}
            </p>
            <div className="flex gap-4">
              {footerData.social.map((social) => (
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
            <h4 className={`text-sm tracking-wider mb-4 ${font('labels')}`}>
              SHOP
            </h4>
            <ul className="space-y-3">
              {footerData.links.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-white/70 text-sm hover:text-white transition-colors ${font('body')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className={`text-sm tracking-wider mb-4 ${font('labels')}`}>
              COMPANY
            </h4>
            <ul className="space-y-3">
              {footerData.links.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-white/70 text-sm hover:text-white transition-colors ${font('body')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className={`text-sm tracking-wider mb-4 ${font('labels')}`}>
              SUPPORT
            </h4>
            <ul className="space-y-3">
              {footerData.links.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-white/70 text-sm hover:text-white transition-colors ${font('body')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className={`text-sm tracking-wider mb-4 ${font('labels')}`}>
              LEGAL
            </h4>
            <ul className="space-y-3">
              {footerData.links.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-white/70 text-sm hover:text-white transition-colors ${font('body')}`}
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
            <p className={`text-white/50 text-sm ${font('body')}`}>
              &copy; {new Date().getFullYear()} Orinket. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className={`text-white/50 text-sm ${font('body')}`}>
                We accept:
              </span>
              <div className="flex gap-2">
                {footerData.payments.map((payment) => (
                  <span
                    key={payment}
                    className={`px-2 py-1 bg-white/10 text-white/70 text-xs ${font('labels')}`}
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

