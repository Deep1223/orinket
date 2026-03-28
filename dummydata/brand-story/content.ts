export interface BrandStory {
  title: string
  image: string
  alt: string
  description: string[]
  cta: {
    text: string
    href: string
  }
}

export const brandStory: BrandStory = {
  title: "THE ORINKET STORY",
  image: "/images/brand-story.jpg",
  alt: "The Orinket Story",
  description: [
    "Orinket was born from a simple belief: everyone deserves to own beautiful jewellery that doesn't break the bank or lose its shine.",
    "We noticed a gap in market — real gold was too expensive for everyday wear, and imitation jewellery just didn't last. So we created something in between: demi-fine jewellery that combines premium materials with accessible pricing.",
    "Today, with over 5 lakh happy customers, we continue our mission to make every woman feel confident and beautiful, every single day."
  ],
  cta: {
    text: "LEARN MORE",
    href: "/story"
  }
}
