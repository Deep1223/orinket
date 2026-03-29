/** UI label (Top Styles tabs) → API `tab` slug (matches CategoryMaster slugify(categoryname)). */
export const TOP_STYLE_LABEL_TO_TAB: Record<string, string> = {
  ALL: "all",
  NECKLACES: "necklaces",
  BRACELETS: "bracelets",
  EARRINGS: "earrings",
  RINGS: "rings",
  MENS: "men",
  MANGALSUTRA: "mangalsutra",
}

export function topStyleLabelToTab(label: string): string {
  return TOP_STYLE_LABEL_TO_TAB[label] ?? "all"
}

/** `VIEW ALL` href slug (same as category route segment). */
export function topStyleLabelToCategoryPath(label: string): string {
  if (label === "ALL") return "/category/all"
  const slug = TOP_STYLE_LABEL_TO_TAB[label]
  return slug ? `/category/${slug}` : "/category/all"
}
