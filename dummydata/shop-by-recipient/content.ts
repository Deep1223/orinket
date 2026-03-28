export interface Recipient {
  title: string
  image: string
  href: string
}

export const shopByRecipient = {
  title: "SHOP BY RECIPIENT",
  recipients: [
    {
      title: "Gifts For Her",
      image: "/images/gifts-for-her.jpg",
      href: "/gifts/for-her"
    },
    {
      title: "Gifts For Him",
      image: "/images/gifts-for-him.jpg",
      href: "/gifts/for-him"
    }
  ] as Recipient[]
}
