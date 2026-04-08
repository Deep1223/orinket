/** Fallback labels when order status is a string key from the backend. */
export const ORDER_STATUS_LABELS: Record<string, string> = {
  processing: "Processing",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
}

export function labelForOrderStatus(status: string): string {
  const k = status?.trim().toLowerCase()
  return (k && ORDER_STATUS_LABELS[k]) || status || "Unknown"
}
