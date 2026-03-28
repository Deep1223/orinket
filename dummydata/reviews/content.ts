export interface Review {
  id: number
  name: string
  location: string
  rating: number
  text: string
  product: string
}

export const reviews = {
  title: "TRUSTED BY OUR COMMUNITY",
  subtitle: "Over 5 Lakh+ Happy Customers",
  reviews: [
    {
      id: 1,
      name: "Ananya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "I absolutely love my Orinket pieces! The quality is amazing and they look just like real gold. I've been wearing my bracelet daily for 3 months and it still looks brand new.",
      product: "Hearts All Over Bracelet"
    },
    {
      id: 2,
      name: "Priya Patel",
      location: "Delhi",
      rating: 5,
      text: "Finally found jewellery that's affordable but doesn't look cheap. The packaging was beautiful and delivery was super fast. Definitely ordering more!",
      product: "Round Solitaire Necklace"
    },
    {
      id: 3,
      name: "Shreya Kapoor",
      location: "Bangalore",
      rating: 5,
      text: "Bought emerald necklace as a gift for my mom and she couldn't believe it wasn't real gold! The craftsmanship is incredible. Highly recommend Orinket.",
      product: "Classic Emerald Necklace"
    },
    {
      id: 4,
      name: "Riya Gupta",
      location: "Chennai",
      rating: 5,
      text: "This is my third order from Orinket and I'm never disappointed. The demi-fine quality is exactly what I was looking for - premium but not overpriced.",
      product: "Mini Solitaire Ring"
    },
    {
      id: 5,
      name: "Kavya Reddy",
      location: "Hyderabad",
      rating: 5,
      text: "I get so many compliments on my Orinket earrings! People always ask where I got them. The shine hasn't faded at all even after regular wear.",
      product: "Athena Solitaire Hoop Earrings"
    }
  ] as Review[]
}
