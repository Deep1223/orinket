"use client"

import Link from "next/link"
import Image from "next/image"
import { Package, ChevronRight, Truck, CheckCircle, Clock } from "lucide-react"
import Header from "@/components/orinket/Header"
import Footer from "@/components/orinket/Footer"

// Demo orders for UI display
const demoOrders = [
  {
    id: "ORN12345678",
    date: "March 20, 2026",
    status: "delivered",
    total: 2598,
    items: [
      { name: "Eternal Love Heart Bracelet", image: "/images/product-bracelet-1.jpg", price: 1299, quantity: 2 }
    ]
  },
  {
    id: "ORN12345679",
    date: "March 15, 2026",
    status: "shipped",
    total: 1599,
    items: [
      { name: "Emerald Drop Pendant", image: "/images/product-necklace-2.jpg", price: 1599, quantity: 1 }
    ]
  },
  {
    id: "ORN12345680",
    date: "March 10, 2026",
    status: "processing",
    total: 999,
    items: [
      { name: "Diamond Hoop Earrings", image: "/images/product-earrings-1.jpg", price: 999, quantity: 1 }
    ]
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case "shipped":
      return <Truck className="w-5 h-5 text-blue-600" />
    case "processing":
      return <Clock className="w-5 h-5 text-gold" />
    default:
      return <Package className="w-5 h-5 text-muted-foreground" />
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "delivered":
      return "Delivered"
    case "shipped":
      return "Shipped"
    case "processing":
      return "Processing"
    default:
      return status
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "text-green-600 bg-green-50"
    case "shipped":
      return "text-blue-600 bg-blue-50"
    case "processing":
      return "text-gold bg-gold-light/50"
    default:
      return "text-muted-foreground bg-muted"
  }
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-[family-name:var(--font-nunito)] text-muted-foreground mb-8">
            <Link href="/account" className="hover:text-gold-dark transition-colors">Account</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">My Orders</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-8">
            My Orders
          </h1>

          {demoOrders.length > 0 ? (
            <div className="space-y-6">
              {demoOrders.map((order) => (
                <div key={order.id} className="bg-white border border-border rounded-sm overflow-hidden">
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-cream border-b border-border">
                    <div className="flex flex-wrap items-center gap-4 text-sm font-[family-name:var(--font-nunito)]">
                      <div>
                        <span className="text-muted-foreground">Order </span>
                        <span className="font-semibold text-foreground">#{order.id}</span>
                      </div>
                      <div className="hidden md:block w-px h-4 bg-border" />
                      <span className="text-muted-foreground">{order.date}</span>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-[family-name:var(--font-nunito)] ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-20 h-20 relative bg-cream-dark rounded-sm overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-[family-name:var(--font-nunito)] text-foreground">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground font-[family-name:var(--font-nunito)] mt-1">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold font-[family-name:var(--font-nunito)] mt-1">
                            Rs.{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between p-4 border-t border-border">
                    <div className="text-sm font-[family-name:var(--font-nunito)]">
                      <span className="text-muted-foreground">Total: </span>
                      <span className="font-semibold text-foreground">Rs.{order.total.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {order.status === "shipped" && (
                        <button className="text-sm text-gold-dark font-[family-name:var(--font-nunito)] hover:underline">
                          Track Order
                        </button>
                      )}
                      <button className="text-sm text-foreground font-[family-name:var(--font-nunito)] hover:text-gold-dark transition-colors flex items-center gap-1">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
              <h2 className="text-xl font-semibold font-[family-name:var(--font-nunito)] text-foreground mb-2">
                No orders yet
              </h2>
              <p className="text-muted-foreground font-[family-name:var(--font-nunito)] mb-6">
                When you place an order, it will appear here.
              </p>
              <Link
                href="/"
                className="inline-flex px-8 py-4 bg-foreground text-white font-[family-name:var(--font-nunito)] tracking-wider hover:bg-gold-dark transition-colors"
              >
                START SHOPPING
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

