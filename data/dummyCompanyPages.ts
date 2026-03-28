/** Dummy content for company pages — Orinket demi-fine jewellery */

export const aboutPage = {
  headline: "Crafted for everyday confidence",
  subhead:
    "Orinket brings demi-fine jewellery to modern wardrobes: premium materials, thoughtful design, and prices that invite you to wear gold every day.",
  intro:
    "We believe jewellery should feel as good as it looks. Every piece is designed in-house, finished by skilled craftspeople, and checked against strict quality standards before it reaches you.",
  values: [
    {
      title: "Demi-fine, defined",
      body: "Thick 18k gold plating on sterling silver bases — lasting shine without the fine-jewellery price tag.",
    },
    {
      title: "Designed for real life",
      body: "Lightweight silhouettes, secure clasps, and finishes that stand up to work, travel, and celebration.",
    },
    {
      title: "Transparent care",
      body: "Clear plating specs, honest imagery, and concierge support when you need sizing or styling help.",
    },
  ],
  stats: [
    { label: "Happy customers", value: "5L+" },
    { label: "Cities with experience zones", value: "12" },
    { label: "Pieces styled & shipped", value: "2M+" },
  ],
}

export const storyPage = {
  headline: "Our story",
  lede: "From a small studio sketch to a community that wears gold with ease — here is how Orinket came to be.",
  paragraphs: [
    "It started with frustration: beautiful gold was out of reach for daily wear, and fast fashion metals tarnished within weeks. We wanted something in between — real weight, real warmth, and real longevity.",
    "We spent months testing platings, alloys, and finishes until we landed on a demi-fine stack we could stand behind. The first collection sold out in days; the second confirmed we were not alone in wanting better everyday jewellery.",
    "Today Orinket is a team of designers, gemologists, and customer advocates united by one promise: when you open our box, it should feel like a little luxury you earned.",
  ],
  milestones: [
    { year: "2019", title: "First collection", detail: "Launched online with twelve core silhouettes." },
    { year: "2021", title: "Stores & styling", detail: "Opened experience studios in Mumbai and Delhi." },
    { year: "2023", title: "9KT fine line", detail: "Introduced solid gold essentials alongside plated heroes." },
    { year: "2025", title: "Nationwide reach", detail: "Expanded concierge shipping and virtual appointments." },
  ],
}

export type StoreLocation = {
  id: number
  slug: string
  name: string
  city: string
  address: string
  hours: string
  phone: string
  image: string
  highlights: string[]
}

export const storeLocations: StoreLocation[] = [
  {
    id: 1,
    slug: "mumbai-phoenix-palladium",
    name: "Phoenix Palladium",
    city: "Mumbai",
    address: "Lower Parel, Mumbai — Level 2, near central atrium",
    hours: "Mon–Sun, 11:00 AM – 9:00 PM",
    phone: "+91 98765 43211",
    image: "/images/store-1.jpg",
    highlights: ["Private styling pods", "Same-day pickup for online orders"],
  },
  {
    id: 2,
    slug: "delhi-select-citywalk",
    name: "Select Citywalk",
    city: "New Delhi",
    address: "Saket, New Delhi — Ground floor, west wing",
    hours: "Mon–Sun, 11:00 AM – 10:00 PM",
    phone: "+91 98765 43212",
    image: "/images/store-2.jpg",
    highlights: ["Engraving on select pieces", "Complimentary tea service"],
  },
  {
    id: 3,
    slug: "bengaluru-ub-city",
    name: "UB City",
    city: "Bengaluru",
    address: "Vittal Mallya Road — Concept store, level 1",
    hours: "Mon–Sun, 10:30 AM – 9:30 PM",
    phone: "+91 98765 43213",
    image: "/images/brand-story.jpg",
    highlights: ["Weekend trunk shows", "Corporate gifting desk"],
  },
]

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  image: string
  dateLabel: string
  category: string
  readMinutes: number
  body: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "lab-grown-diamonds",
    title: "Lab-Grown Diamonds: Styling & Care for the Modern Woman",
    excerpt:
      "If jewellery had a reality check, lab-grown diamonds would be it. Real, pretty, and completely low-drama...",
    image: "/images/blog-1.jpg",
    dateLabel: "03 Mar 2026",
    category: "Style",
    readMinutes: 6,
    body: [
      "Lab-grown diamonds share the same optical and chemical properties as mined stones — what changes is origin and footprint. For everyday stacks, they let you size up sparkle without the guilt trip.",
      "Pair a solitaire pendant with our paperclip chains for work, then layer in huggies for dinner. Avoid harsh chemicals and store pieces separately to keep metal and stones pristine.",
      "At Orinket we curate demi-fine settings that let the stone breathe: minimal prongs, balanced weight, and finishes that age gracefully with you.",
    ],
  },
  {
    slug: "womens-day-guide",
    title: "The Women's Day Jewellery Guide Nobody Asked For, But Everybody Needed",
    excerpt:
      "From powerful statement pieces to delicate everyday wear, we've got you covered for Women's Day...",
    image: "/images/blog-2.jpg",
    dateLabel: "02 Mar 2026",
    category: "Occasions",
    readMinutes: 5,
    body: [
      "Start with one hero piece — a collar necklace or bold cuff — and keep everything else whisper-quiet. Contrast creates confidence.",
      "Gifting? Think birthstone tones or initials on pieces she can layer year-round. Our concierge can help with sizing if you are unsure.",
      "Remember: the best gift is one she will actually wear. Demi-fine wins because it feels special on Sunday and still works on Monday.",
    ],
  },
  {
    slug: "gold-vs-silver",
    title: "Gold vs Silver Jewellery: How to Choose What Suits You Best",
    excerpt:
      "The great debate is always on – gold or silver? That's like asking, chai or coffee, Friends or Seinfeld...",
    image: "/images/blog-3.jpg",
    dateLabel: "01 Mar 2026",
    category: "Guides",
    readMinutes: 7,
    body: [
      "Warm undertones often glow beside gold; cooler undertones can lean into rhodium-bright silver or white gold. Rules are made to be broken — try both against your skin in natural light.",
      "Silver is playful and graphic; gold reads classic and sun-kissed. Mixing metals is fair game: use a single bridge piece so the stack feels intentional.",
      "Our 18k plated collection gives you gold’s warmth with sterling’s approachability — the sweet spot for first-time fine-ish buyers.",
    ],
  },
  {
    slug: "everyday-layering-101",
    title: "Everyday Layering 101: Necklaces That Play Nice Together",
    excerpt: "Spacing, scale, and clasp hacks — build a neck stack that moves with you from desk to dinner.",
    image: "/images/blog-1.jpg",
    dateLabel: "24 Feb 2026",
    category: "How to",
    readMinutes: 4,
    body: [
      "Rule one: vary chain lengths by at least two inches so pendants do not tangle. Rule two: mix textures — rope, snake, and cable keep the eye moving.",
      "Start with a choker or short collar, add a mid-length pendant, and finish with a longer lariat or bar necklace. Remove one layer if it feels crowded.",
      "When in doubt, our stylists can suggest pairings from your wishlist — book a quick virtual session from any store page.",
    ],
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getStoreBySlug(slug: string): StoreLocation | undefined {
  return storeLocations.find((s) => s.slug === slug)
}

export const careersPage = {
  intro:
    "Join a team that obsesses over microns of gold, millimeters of fit, and the moment a customer first opens the box.",
  perks: [
    "Employee discount on full catalogue",
    "Hybrid roles for HQ; retail teams with fixed rotas",
    "Learning stipend for gemology & design courses",
    "Health coverage for full-time roles (India)",
  ],
}

export type JobOpening = {
  id: string
  title: string
  team: string
  location: string
  type: "Full-time" | "Contract" | "Internship"
  summary: string
}

export const jobOpenings: JobOpening[] = [
  {
    id: "retail-lead-mum",
    title: "Store Lead — Mumbai",
    team: "Retail",
    location: "Mumbai",
    type: "Full-time",
    summary:
      "Own daily operations, team coaching, and VIP styling at our flagship. 4+ years in premium retail preferred.",
  },
  {
    id: "cx-specialist",
    title: "Customer Experience Specialist",
    team: "Support",
    location: "Remote (India)",
    type: "Full-time",
    summary:
      "Concierge chat, email, and phone — help customers with sizing, orders, and repairs with a calm, luxury tone.",
  },
  {
    id: "jr-designer",
    title: "Junior Jewellery Designer",
    team: "Design",
    location: "Bengaluru",
    type: "Full-time",
    summary:
      "Assist senior designers on demi-fine collections; Rhino or similar 3D skills, strong sketch communication.",
  },
  {
    id: "content-intern",
    title: "Content & Social Intern",
    team: "Marketing",
    location: "Mumbai",
    type: "Internship",
    summary: "Six-month program: shoots, reels, and blog drafts with mentorship from brand lead.",
  },
]
