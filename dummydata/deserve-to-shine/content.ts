export interface DeserveToShine {
  title: string
  image: string
  description: string[]
  cta: {
    text: string
    href: string
  }
}

export const deserveToShine: DeserveToShine = {
  title: "BECAUSE YOU DESERVE TO SHINE",
  image: "/images/deserve-shine.jpg",
  description: [
    "At Orinket, we create jewellery that's made to be worn — every day and on the days that matter most. It's premium in quality, thoughtful in design, and priced so it feels right.",
    "We don't believe in saving the good stuff for later. Our pieces are made to move with you, not sit in a box. Because with Orinket, the sparkle is always yours to keep."
  ],
  cta: {
    text: "OUR STORY",
    href: "/story"
  }
}
