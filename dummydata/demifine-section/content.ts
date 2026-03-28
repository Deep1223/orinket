export interface DemifineSection {
  subtitle: string
  title: string
  description: string
  cta: {
    text: string
    href: string
  }
}

export const demifineSection: DemifineSection = {
  subtitle: "Premium Quality",
  title: "EVERYDAY DEMI-FINE JEWELLERY",
  description: "Discover our collection of 18k thick gold plated jewellery. Premium metals, lasting shine, and designs that move with you — every single day.",
  cta: {
    text: "SHOP COLLECTION",
    href: "/category/all"
  }
}
