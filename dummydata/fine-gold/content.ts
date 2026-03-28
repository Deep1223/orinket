export interface FineGold {
  title: string
  description: string
  filters: string[]
  emptyState: {
    title: string
    descriptionAll: string
    descriptionFiltered: string
  }
}

export const fineGold: FineGold = {
  title: "925 SILVER POST",
  description:
    "Lab-grown diamonds on solid 925 sterling silver posts and settings. Lightweight, hypoallergenic, and finished for quiet luxury.",
  filters: ["All", "Necklace", "Bracelets", "Rings", "Earrings", "Pendant"],
  emptyState: {
    title: "No products found",
    descriptionAll:
      "This collection is empty for now. Please check back soon—we add new pieces regularly.",
    descriptionFiltered: "Try a different style using the filters above.",
  },
}
