"use client"

import Link from "next/link"
import { use, useEffect, useState } from "react"
import { ChevronRight, Package, Truck, CheckCircle, Clock } from "lucide-react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"
import { useCurrency } from "@/context/CurrencyContext"
import { useStoreSettings } from "@/context/StoreSettingsContext"
import { contactFromSettings } from "@/lib/contactFromSettings"
import { labelForOrderStatus } from "@/lib/orderStatusLabels"
import { font } from "@/lib/fonts"
import { ecomFetch } from "@/lib/ecom/client"

interface OrderDetailsPageProps {
  params: Promise<{ orderId: string }>
}

type OrderStatus = string

function placeholderOrder(orderId: string) {
  return {
    id: orderId,
    date: "—",
    status: "processing" as OrderStatus,
    tracking: null as string | null,
    deliveryEta: "Connect your orders API to show live status.",
    items: [] as Array<{ name: string; price: number; quantity: number }>,
  }
}

const StatusIcon = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case "shipped":
      return <Truck className="w-5 h-5 text-blue-600" />
    default:
      return <Clock className="w-5 h-5 text-gold" />
  }
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { formatPrice } = useCurrency()
  const { settings } = useStoreSettings()
  const contact = contactFromSettings(settings)
  const { orderId } = use(params)
  const [order, setOrder] = useState(placeholderOrder(orderId))

  useEffect(() => {
    const load = async () => {
      const response = await ecomFetch<{
        success: boolean
        data?: {
          _id: string
          createdAt: string
          orderStatus: OrderStatus
          paymentReference?: string
          items: Array<{ name: string; price: number; quantity: number }>
        }
      }>(`/api/ecom/orders/${orderId}`)
      if (!response?.success || !response.data) return
      setOrder({
        id: response.data._id,
        date: new Date(response.data.createdAt).toLocaleString(),
        status: response.data.orderStatus,
        tracking: response.data.paymentReference || null,
        deliveryEta: "Live status from automated order engine",
        items: response.data.items || [],
      })
    }
    load()
  }, [orderId])
  const subtotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shipping = 0
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm ${font('body')} text-muted-foreground mb-8">
            <Link href="/account" className="hover:text-gold-dark transition-colors">Account</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/account/orders" className="hover:text-gold-dark transition-colors">My Orders</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">#{order.id}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-border bg-gradient-to-b from-cream to-white p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground ${font('body')}">Order</p>
                    <h1 className="text-2xl md:text-3xl font-semibold text-foreground ${font('body')}">
                      #{order.id}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground ${font('body')}">{order.date}</p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm ${font('body')}">
                    <StatusIcon status={order.status} />
                    <span className="font-semibold text-foreground">
                      {labelForOrderStatus(order.status)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-border bg-white p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-cream border border-border">
                      <Package className="w-5 h-5 text-gold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground ${font('body')}">Tracking</p>
                      <p className="text-sm text-muted-foreground ${font('body')}">
                        {order.tracking ? `${order.tracking} • ${order.deliveryEta}` : order.deliveryEta}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h2 className={`text-lg font-semibold text-foreground ${font("body")}`}>Items</h2>
                {order.items.length === 0 ? (
                  <p className={`mt-4 text-sm text-muted-foreground ${font("body")}`}>
                    Line items will load here after checkout is connected to your backend orders API.
                  </p>
                ) : (
                  <div className="mt-4 divide-y divide-border">
                    {order.items.map((item) => (
                      <div key={item.name} className="py-4 flex items-start justify-between gap-4">
                        <div>
                          <p className={`text-sm font-semibold text-foreground ${font("body")}`}>{item.name}</p>
                          <p className={`text-sm text-muted-foreground ${font("body")}`}>Qty: {item.quantity}</p>
                        </div>
                        <p className={`text-sm font-semibold text-foreground ${font("body")}`}>
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sticky top-24">
                <h3 className={`text-sm font-semibold uppercase tracking-widest text-muted-foreground ${font("body")}`}>
                  Summary
                </h3>
                <div className={`mt-4 space-y-3 text-sm ${font("body")}`}>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (18%)</span>
                    <span className="text-foreground">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-border bg-cream p-4">
                  <p className={`text-xs uppercase tracking-widest text-muted-foreground ${font("body")}`}>Support</p>
                  <p className={`mt-1 text-sm font-semibold text-foreground ${font("body")}`}>
                    {contact.email || "—"}
                  </p>
                  <p className={`text-sm text-muted-foreground ${font("body")}`}>{contact.hours || "—"}</p>
                </div>

                <Link
                  href="/"
                  className="mt-6 block w-full rounded-xl bg-foreground py-3 text-center text-white text-sm font-semibold tracking-wider ${font('body')} hover:bg-gold-dark transition-colors"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

