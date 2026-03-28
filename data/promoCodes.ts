/** Demo promo codes — amounts & minOrder are in storage currency (INR). */
import { staticCurrency } from "@/lib/currency"

export type PromoCodeDef = {
  code: string
  type: "percent" | "fixed"
  /** Percent 0–100, or fixed discount amount in storage currency */
  value: number
  minOrder?: number
}

export const PROMO_CODES: PromoCodeDef[] = [
  {
    code: "ORINKET10",
    type: "percent",
    value: 10,
  },
  {
    code: "WELCOME15",
    type: "percent",
    value: 15,
  },
  {
    code: "FEST500",
    type: "fixed",
    value: 500,
    minOrder: 2000,
  },
  {
    code: "GOLD100",
    type: "fixed",
    value: 100,
    minOrder: 500,
  },
]

export function findPromoCode(raw: string): PromoCodeDef | undefined {
  const normalized = raw.trim().toUpperCase()
  if (!normalized) return undefined
  return PROMO_CODES.find((p) => p.code === normalized)
}

export function calculatePromoDiscount(
  subtotal: number,
  promo: PromoCodeDef
): { ok: true; discount: number } | { ok: false; error: string } {
  if (promo.minOrder != null && subtotal < promo.minOrder) {
    return {
      ok: false,
      error: staticCurrency.minimumOrderError(promo.minOrder),
    }
  }
  if (promo.type === "percent") {
    const discount = Math.round((subtotal * promo.value) / 100)
    return { ok: true, discount: Math.min(discount, subtotal) }
  }
  return { ok: true, discount: Math.min(promo.value, subtotal) }
}
