export interface Slide {
  image: string
  title: string
  subtitle: string
  cta: string
  href: string
}

export const slides: Slide[] = [
  {
    image: "/images/hero-1.jpg",
    title: "PREMIUM QUALITY",
    subtitle: "EVERYDAY DEMI-FINE JEWELLERY",
    cta: "SHOP COLLECTION",
    href: "/category/all"
  },
  {
    image: "/images/hero-2.jpg",
    title: "PREMIUM QUALITY",
    subtitle: "18K THICK GOLD PLATED",
    cta: "SHOP COLLECTION",
    href: "/category/all"
  },
  {
    image: "/images/hero-3.jpg",
    title: "PREMIUM QUALITY",
    subtitle: "FINE JEWELLERY COLLECTION",
    cta: "SHOP COLLECTION",
    href: "/category/9kt-gold"
  }
]
