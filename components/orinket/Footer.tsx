"use client"

import Link from "next/link"
import { Instagram, Facebook, Youtube } from "lucide-react"
import { useStoreSettings } from "@/context/StoreSettingsContext"
import { font } from "@/lib/fonts"
import type { StoreSettings } from "@/lib/storeSettings"

const XIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
)

const PinterestIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.017 0C5.396 0 0 5.397 0 12.017c0 5.087 3.16 9.426 7.633 11.174-.105-.945-.199-2.396.041-3.428.216-.931 1.395-5.91 1.395-5.91s-.355-.71-.355-1.76c0-1.648.955-2.878 2.146-2.878 1.012 0 1.503.759 1.503 1.67 0 1.017-.647 2.538-.98 3.947-.282 1.187.592 2.155 1.761 2.155 2.112 0 3.737-2.227 3.737-5.441 0-2.845-2.044-4.832-4.961-4.832-3.38 0-5.364 2.536-5.364 5.157 0 1.022.394 2.118.884 2.715.097.118.111.222.082.343-.09.375-.291 1.186-.33 1.348-.052.214-.17.259-.393.156-1.464-.68-2.379-2.813-2.379-4.529 0-3.688 2.679-7.076 7.728-7.076 4.057 0 7.21 2.891 7.21 6.756 0 4.032-2.54 7.276-6.066 7.276-1.184 0-2.3-.615-2.68-1.34l-.73 2.78c-.263 1.01-.976 2.275-1.455 3.054a12.01 12.01 0 003.546.526c6.621 0 12.017-5.396 12.017-12.017C24.034 5.397 18.638 0 12.017 0z" />
  </svg>
)

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

  const brandName = settings?.brandName?.trim() || settings?.storeName?.trim() || "Store"
  const brandDesc =
    settings?.brandDescription?.trim() || settings?.storeDescription?.trim() || ""
  const footerLogo = settings?.footerLogoUrl?.trim()

  const shopLinks = mapShopLinks(settings?.shopFooterLinks)

  const companyLinks = staticColumnLinks(settings, STATIC_COMPANY)
  const supportLinks = staticColumnLinks(settings, STATIC_SUPPORT)
  const legalLinks = staticColumnLinks(settings, STATIC_LEGAL)

  const builtSocial: Array<{ icon: any; href: string; label: string }> = []
  if (settings?.instagramUrl?.trim()) {
    builtSocial.push({ icon: Instagram, href: settings.instagramUrl.trim(), label: "Instagram" })
  }
  if (settings?.facebookUrl?.trim()) {
    builtSocial.push({ icon: Facebook, href: settings.facebookUrl.trim(), label: "Facebook" })
  }
  if (settings?.twitterUrl?.trim()) {
    builtSocial.push({ icon: XIcon, href: settings.twitterUrl.trim(), label: "X (Twitter)" })
  }
  if (settings?.youtubeUrl?.trim()) {
    builtSocial.push({ icon: Youtube, href: settings.youtubeUrl.trim(), label: "YouTube" })
  }
  if (settings?.pinterestUrl?.trim()) {
    builtSocial.push({ icon: PinterestIcon, href: settings.pinterestUrl.trim(), label: "Pinterest" })
  }

  const socialToRender = builtSocial

  const paymentLabels: string[] = []
  if (settings) {
    if (settings.paymentVisa !== 0) paymentLabels.push("Visa")
    if (settings.paymentMastercard !== 0) paymentLabels.push("Mastercard")
    if (settings.paymentUpi !== 0) paymentLabels.push("UPI")
    if (settings.paymentPaytm !== 0) paymentLabels.push("PayTM")
  }

  const newsletterOn = (settings?.newsletterEnabled ?? 1) === 1
  const nlTitle = settings?.newsletterTitle?.trim() || ""
  const nlDesc = settings?.newsletterDescription?.trim() || ""
  const nlPlaceholder = settings?.newsletterPlaceholder?.trim() || "Your email"
  const nlButton = settings?.newsletterButtonText?.trim() || "SUBSCRIBE"

  const copyrightName = settings?.storeName?.trim() || brandName

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Newsletter Section */}
      {newsletterOn && (nlTitle || nlDesc) && (
        <div className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                {nlTitle ? (
                  <h3 className={`text-xl sm:text-2xl font-bold tracking-wider mb-2 ${font("headings")}`}>
                    {nlTitle}
                  </h3>
                ) : null}
                {nlDesc ? <p className={`text-white/70 text-xs sm:text-sm ${font("body")}`}>{nlDesc}</p> : null}
              </div>
              <form className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                <div className="relative flex-1 md:w-72">
                  <input
                    type="email"
                    placeholder={nlPlaceholder}
                    className={`w-full rounded-lg border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/50 transition-colors focus:border-[#628292] focus:outline-none focus:ring-2 focus:ring-[#628292]/35 ${font("body")}`}
                  />
                </div>
                <button
                  type="submit"
                  className={`touch-target rounded-lg bg-[#40555f] px-6 py-3 text-xs font-semibold tracking-wider text-white transition-colors hover:bg-[#577381] active:bg-[#35464e] sm:text-sm ${font("buttons")}`}
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
            {brandDesc ? (
              <p className={`text-white/70 text-sm mb-6 leading-relaxed ${font("body")}`}>{brandDesc}</p>
            ) : null}
            {socialToRender.length > 0 ? (
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
            ) : null}
          </div>

          {/* Shop Links */}
          {shopLinks.length > 0 ? (
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
          ) : null}

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
            {paymentLabels.length > 0 ? (
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
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  )
}
