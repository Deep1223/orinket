export interface DiscountBanner {
  image: string
  alt: string
  title: string
  subtitle: string
  description: string
  cta: string
  href: string
}

export const discountBanner: DiscountBanner = {
  image: "/images/discount-banner.jpg",
  alt: "Special Offer",
  title: "UP TO 50% OFF",
  subtitle: "LIMITED TIME OFFER",
  description: "On selected demi-fine pieces",
  cta: "SHOP SALE",
  href: "/sale"
}
