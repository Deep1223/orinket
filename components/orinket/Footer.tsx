"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"
import { useStoreSettings } from "@/context/StoreSettingsContext"
import { footerData } from "@/dummydata/footer/content"
import { font } from "@/lib/fonts"
import type { StoreSettings } from "@/lib/storeSettings"

type LinkItem = { name: string; href: string }

const STATIC_COMPANY: Array<{ name: string; key: keyof StoreSettings; fallback: string }> = [
  { name: "About Us", key: "urlCompanyAbout", fallback: "/about" },
  { name: "Our Story", key: "urlCompanyStory", fallback: "/story" },
  { name: "Stores", key: "urlCompanyStores", fallback: "/stores" },
  { name: "Blog", key: "urlCompanyBlog", fallback: "/blog" },
  { name: "Careers", key: "urlCompanyCareers", fallback: "/careers" },
]

const STATIC_SUPPORT: Array<{ name: string; key: keyof StoreSettings; fallback: string }> = [
  { name: "Contact Us", key: "urlSupportContact", fallback: "/contact" },
  { name: "FAQs", key: "urlSupportFaq", fallback: "/faq" },
  { name: "Shipping Info", key: "urlSupportShipping", fallback: "/shipping" },
  { name: "Returns & Exchanges", key: "urlSupportReturns", fallback: "/returns" },
  { name: "Track Order", key: "urlSupportTrack", fallback: "/track" },
]

const STATIC_LEGAL: Array<{ name: string; key: keyof StoreSettings; fallback: string }> = [
  { name: "Privacy Policy", key: "urlLegalPrivacy", fallback: "/privacy" },
  { name: "Terms of Service", key: "urlLegalTerms", fallback: "/terms" },
  { name: "Refund Policy", key: "urlLegalRefund", fallback: "/refund" },
]

function staticColumnLinks(
  settings: StoreSettings | null | undefined,
  defs: Array<{ name: string; key: keyof StoreSettings; fallback: string }>
): LinkItem[] {
  return defs.map((d) => {
    const raw = settings?.[d.key]
    const href =
      typeof raw === "string" && raw.trim() ? raw.trim() : d.fallback
    return { name: d.name, href }
  })
}

function mapShopLinks(rows: StoreSettings["shopFooterLinks"] | undefined): LinkItem[] {
  if (!rows?.length) return []
  return rows
    .filter((r) => r.linkhref?.trim() || r.linklabel?.trim() || r.category?.trim())
    .map((r, i) => ({
      name: r.linklabel?.trim() || r.category?.trim() || `Shop ${i + 1}`,
      href: r.linkhref?.trim() || "#",
    }))
}

export default function Footer() {
  const { settings } = useStoreSettings()

  const brandName = settings?.brandName?.trim() || footerData.brand.name
  const brandDesc = settings?.brandDescription?.trim() || footerData.brand.description
  const footerLogo = settings?.footerLogoUrl?.trim()

  const shopFromApi = mapShopLinks(settings?.shopFooterLinks)
  const shopLinks = shopFromApi.length > 0 ? shopFromApi : footerData.links.shop

  const companyLinks = settings
    ? staticColumnLinks(settings, STATIC_COMPANY)
    : footerData.links.company

  const supportLinks = settings
    ? staticColumnLinks(settings, STATIC_SUPPORT)
    : footerData.links.support

  const legalLinks = settings
    ? staticColumnLinks(settings, STATIC_LEGAL)
    : footerData.links.legal

  const builtSocial: Array<{ icon: typeof Instagram; href: string; label: string }> = []
  if (settings?.instagramUrl?.trim()) {
    builtSocial.push({ icon: Instagram, href: settings.instagramUrl.trim(), label: "Instagram" })
  }
  if (settings?.facebookUrl?.trim()) {
    builtSocial.push({ icon: Facebook, href: settings.facebookUrl.trim(), label: "Facebook" })
  }
  if (settings?.twitterUrl?.trim()) {
    builtSocial.push({ icon: Twitter, href: settings.twitterUrl.trim(), label: "Twitter" })
  }
  if (settings?.youtubeUrl?.trim()) {
    builtSocial.push({ icon: Youtube, href: settings.youtubeUrl.trim(), label: "YouTube" })
  }

  const socialToRender =
    builtSocial.length > 0
      ? builtSocial
      : footerData.social.map((s) => ({ icon: s.icon, href: s.href, label: s.label }))

  let paymentLabels: string[]
  if (!settings) {
    paymentLabels = footerData.payments
  } else {
    const payments: string[] = []
    if (settings.paymentVisa !== 0) payments.push("Visa")
    if (settings.paymentMastercard !== 0) payments.push("Mastercard")
    if (settings.paymentUpi !== 0) payments.push("UPI")
    if (settings.paymentPaytm !== 0) payments.push("PayTM")
    paymentLabels = payments.length > 0 ? payments : footerData.payments
  }

  const newsletterOn = (settings?.newsletterEnabled ?? 1) === 1
  const nlTitle = settings?.newsletterTitle?.trim() || footerData.newsletter.title
  const nlDesc = settings?.newsletterDescription?.trim() || footerData.newsletter.description
  const nlPlaceholder = settings?.newsletterPlaceholder?.trim() || "Your email"
  const nlButton = settings?.newsletterButtonText?.trim() || "SUBSCRIBE"

  const copyrightName = settings?.storeName?.trim() || "Orinket"

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Newsletter Section */}
      {newsletterOn && (
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className={`text-xl sm:text-2xl font-bold tracking-wider mb-2 ${font("headings")}`}>
                  {nlTitle}
                </h3>
                <p className={`text-white/70 text-xs sm:text-sm ${font("body")}`}>{nlDesc}</p>
              </div>
              <form className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                <div className="relative flex-1 md:w-72">
                  <input
                    type="email"
                    placeholder={nlPlaceholder}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-gold rounded-lg text-sm transition-colors ${font("body")}`}
                  />
                </div>
                <button
                  type="submit"
                  className={`px-6 py-3 bg-gold text-white text-xs sm:text-sm font-semibold tracking-wider hover:bg-gold-dark transition-colors rounded-lg touch-target ${font("buttons")}`}
                >
                  {nlButton}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              {footerLogo ? (
                <img
                  src={footerLogo}
                  alt={brandName}
                  className="h-10 w-auto max-w-[200px] object-contain object-left"
                />
              ) : (
                <h2 className={`text-2xl tracking-[0.2em] ${font("headings")}`}>{brandName}</h2>
              )}
            </Link>
            <p className={`text-white/70 text-sm mb-6 leading-relaxed ${font("body")}`}>{brandDesc}</p>
            <div className="flex gap-4">
              {socialToRender.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 hover:bg-gold transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className={`text-sm tracking-wider mb-4 ${font("labels")}`}>SHOP</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={`${link.name}-${link.href}`}>
                  <Link
                    href={link.href}
                    className={`text-white/70 text-sm hover:text-white transition-colors ${font("body")}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className={`text-sm tracking-wider mb-4 ${font("labels")}`}>COMPANY</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={`${link.name}-${link.href}`}>
                  <Link
                    href={link.href}
                    className={`text-white/70 text-sm hover:text-white transition-colors ${font("body")}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className={`text-sm tracking-wider mb-4 ${font("labels")}`}>SUPPORT</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={`${link.name}-${link.href}`}>
                  <Link
                    href={link.href}
                    className={`text-white/70 text-sm hover:text-white transition-colors ${font("body")}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className={`text-sm tracking-wider mb-4 ${font("labels")}`}>LEGAL</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={`${link.name}-${link.href}`}>
                  <Link
                    href={link.href}
                    className={`text-white/70 text-sm hover:text-white transition-colors ${font("body")}`}
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
            <p className={`text-white/50 text-sm ${font("body")}`}>
              &copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className={`text-white/50 text-sm ${font("body")}`}>We accept:</span>
              <div className="flex gap-2">
                {paymentLabels.map((payment) => (
                  <span
                    key={payment}
                    className={`px-2 py-1 bg-white/10 text-white/70 text-xs ${font("labels")}`}
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
