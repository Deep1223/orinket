import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"

export interface FooterLink {
  name: string
  href: string
}

export interface SocialLink {
  icon: any
  href: string
  label: string
}

export const footerData = {
  brand: {
    name: "ORINKET",
    description: "Everyday demi-fine jewellery. Premium quality, accessible luxury."
  },
  newsletter: {
    title: "JOIN ORINKET FAMILY",
    description: "Exclusive offers, new arrivals & styling tips"
  },
  links: {
    shop: [
      { name: "New Arrivals", href: "/category/new-arrivals" },
      { name: "Necklaces", href: "/category/necklaces" },
      { name: "Earrings", href: "/category/earrings" },
      { name: "Bracelets", href: "/category/bracelets" },
      { name: "Rings", href: "/category/rings" },
      { name: "9KT Gold", href: "/category/9kt-gold" },
    ] as FooterLink[],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Stores", href: "/stores" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" }
    ] as FooterLink[],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faq" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns & Exchanges", href: "/returns" },
      { name: "Track Order", href: "/track" }
    ] as FooterLink[],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Refund Policy", href: "/refund" }
    ] as FooterLink[]
  },
  social: [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" }
  ] as SocialLink[],
  payments: ["Visa", "Mastercard", "UPI", "PayTM"]
}
