export interface Occasion {
  title: string
  subtitle: string
  image: string
  href: string
}

export const forEveryYou = {
  title: "FOR EVERY YOU",
  description: "From boardrooms to brunches, we have pieces that complement every version of you.",
  occasions: [
    {
      title: "The Professional",
      subtitle: "Elegant pieces for everyday office style",
      image: "/images/for-every-you-1.jpg",
      href: "/collections/office"
    },
    {
      title: "The Glamorous",
      subtitle: "Statement pieces for special occasions",
      image: "/images/for-every-you-2.jpg",
      href: "/collections/evening"
    },
    {
      title: "The Casual",
      subtitle: "Effortless style for weekend vibes",
      image: "/images/for-every-you-3.jpg",
      href: "/collections/casual"
    }
  ] as Occasion[]
}
