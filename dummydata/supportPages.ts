/** Dummy copy for support & policy pages — Orinket */

export const faqPage = {
  title: "Frequently asked questions",
  subtitle: "Orders, plating, sizing, and care — quick answers before you reach out to concierge.",
  groups: [
    {
      title: "Orders & delivery",
      items: [
        {
          q: "How long does delivery take?",
          a: "Metro orders typically arrive in 2–4 business days after dispatch. Non-metro may take 4–7 business days. You will receive tracking details by SMS and email once the parcel leaves our studio.",
        },
        {
          q: "Do you ship internationally?",
          a: "Our dummy storefront ships across India only. International shipping may be introduced later — join the newsletter or ask concierge for updates.",
        },
        {
          q: "Can I change my order after payment?",
          a: "If your order is not yet packed, we can try to update the address or item. Contact us within 2 hours of placing the order with your order ID for the fastest help.",
        },
      ],
    },
    {
      title: "Materials & care",
      items: [
        {
          q: "What does demi-fine mean at Orinket?",
          a: "We use sterling silver bases with thick 18k gold plating for most pieces, designed for everyday wear with proper care. Solid 9KT gold pieces are labelled separately in the product detail.",
        },
        {
          q: "How do I keep my jewellery looking new?",
          a: "Store pieces dry, separately, and away from perfume or lotion. Wipe with a soft cloth after wear and avoid swimming or gym sessions with plated jewellery on.",
        },
        {
          q: "Will the colour fade?",
          a: "With normal wear and care, plating lasts well. Heavy abrasion, chemicals, or moisture exposure can shorten lifespan — treat it like a favourite silk scarf, not gym gear.",
        },
      ],
    },
    {
      title: "Returns & exchanges",
      items: [
        {
          q: "What is your return window?",
          a: "Unused pieces in original packaging with tags intact may be returned within 14 days of delivery for store credit or exchange, subject to inspection. See Returns & Exchanges for full dummy policy text.",
        },
        {
          q: "Can I exchange for a different size?",
          a: "Yes, if stock is available. Initiate an exchange from your account orders page or email concierge with your order ID and preferred size.",
        },
      ],
    },
  ],
}

export const shippingPage = {
  title: "Shipping information",
  subtitle: "Complimentary delivery on qualifying orders — packed like a gift, tracked end to end.",
  zones: [
    {
      name: "Metro cities",
      eta: "2–4 business days after dispatch",
      note: "Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad.",
    },
    {
      name: "Rest of India",
      eta: "4–7 business days after dispatch",
      note: "Remote pin codes may take an extra day or two depending on carrier connectivity.",
    },
  ],
  bullets: [
    "Orders are dispatched Mon–Sat within 24–48 hours of confirmation, excluding sale peaks.",
    "Each parcel is insured at a nominal value until handover to the carrier.",
    "You will receive an SMS with tracking ID once the label is generated.",
    "Signature may be required for orders above a threshold — someone should be available at the address.",
  ],
  packaging: "Pieces arrive in Orinket boxes with soft pouches. Gift notes can be added at checkout (demo copy only).",
}

export const returnsPage = {
  title: "Returns & exchanges",
  subtitle: "We want you to love every piece. If something is not right, here is how returns work (demo policy).",
  eligible: [
    "Request within 14 days of delivery.",
    "Items must be unused, with tags and original packaging.",
    "Personalised or engraved pieces are not eligible unless defective.",
  ],
  notEligible: [
    "Items showing wear, scratches, or missing components.",
    "Pieces bought during final-sale events (if marked on the product page).",
    "International orders (when international shipping is enabled).",
  ],
  howTo: [
    "Log in → Orders → select the order → Request return or Exchange.",
    "Or email concierge with your order ID and reason — we will share a return label or pickup slot where available.",
    "Refunds for eligible returns are issued as store credit or original payment method within 7–10 business days after inspection.",
  ],
}

export const trackPage = {
  title: "Track your order",
  subtitle: "Enter your order ID from the confirmation email. Demo below shows sample tracking — not connected to a live courier API.",
  orderIdPlaceholder: "e.g. ORK-2026-004291",
  submitLabel: "Track order",
  demoNote: "This is a demo: any order ID shows the same sample status.",
  sample: {
    orderId: "ORK-2026-004291",
    statusLabel: "Shipped — in transit",
    carrier: "BlueDart Express",
    trackingNumber: "BD-8829103647",
    lastUpdate: "Left Mumbai hub — 28 Mar 2026, 6:42 AM",
    eta: "Estimated delivery: 30 Mar 2026",
  },
  steps: [
    "Order confirmed — payment received",
    "Packed at Orinket studio",
    "Handed to carrier",
    "Out for delivery",
  ],
}

export const refundPage = {
  title: "Refund policy",
  subtitle: "When money goes back to your account — transparent timelines for our dummy storefront.",
  sections: [
    {
      heading: "Eligible refunds",
      lines: [
        "Full refund to original payment method if we cancel your order due to stock or quality issues before dispatch.",
        "Partial refund if a promotional adjustment applies after order placement (rare — you will be notified).",
        "Store credit instead of cash refund when you choose that option during a return.",
      ],
    },
    {
      heading: "Processing time",
      lines: [
        "After we receive and inspect a return, approval usually takes 2–3 business days.",
        "Banks and wallets may take an additional 5–7 business days to reflect the amount.",
        "UPI and cards typically settle faster than netbanking — timing depends on your bank.",
      ],
    },
    {
      heading: "Non-refundable",
      lines: [
        "Shipping charges are non-refundable unless the error was ours.",
        "Gift cards and store credits are not convertible to cash.",
        "Custom or engraved orders are final unless the item is defective.",
      ],
    },
  ],
}
