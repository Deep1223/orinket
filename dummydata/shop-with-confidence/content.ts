import { Truck, RefreshCw, Shield, Award } from "lucide-react"

export interface Feature {
  icon: any
  title: string
  description: string
  /** If set, description line is built with formatPrice(threshold) in the UI */
  freeShippingThresholdInr?: number
}

export const shopWithConfidence = {
  title: "SHOP WITH CONFIDENCE",
  features: [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "",
      freeShippingThresholdInr: 999,
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "7-day return policy"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "100% secure checkout"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "18k thick gold plated"
    }
  ] as Feature[]
}
