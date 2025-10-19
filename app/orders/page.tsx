"use client"

import { Package, MapPin, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  orderNumber: string
  date: string
  total: number
  status: "pending" | "preparing" | "on-the-way" | "delivered"
  items: Array<{ name: string; quantity: number; price: number }>
  deliveryAddress: string
  estimatedDelivery: string
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-1234567890",
    date: "2025-10-19",
    total: 45.97,
    status: "on-the-way",
    items: [
      { name: "Grilled Chicken Salad", quantity: 2, price: 12.99 },
      { name: "Salmon Poke Bowl", quantity: 1, price: 14.99 },
    ],
    deliveryAddress: "123 Main St, New York, NY 10001",
    estimatedDelivery: "Today, 6:30 PM",
  },
  {
    id: "2",
    orderNumber: "ORD-1234567891",
    date: "2025-10-18",
    total: 32.98,
    status: "delivered",
    items: [
      { name: "Veggie Power Bowl", quantity: 2, price: 10.99 },
      { name: "Acai Bowl", quantity: 1, price: 8.99 },
    ],
    deliveryAddress: "123 Main St, New York, NY 10001",
    estimatedDelivery: "Delivered at 6:15 PM",
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  preparing: { label: "Preparing", color: "bg-blue-100 text-blue-800", icon: Package },
  "on-the-way": { label: "On the Way", color: "bg-purple-100 text-purple-800", icon: MapPin },
  delivered: { label: "Delivered", color: "bg-emerald-100 text-emerald-800", icon: CheckCircle },
}

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-emerald-600 hover:text-emerald-700 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Your Orders</h1>
          <p className="text-muted-foreground mt-2">Track and manage your orders</p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {mockOrders.length === 0 ? (
            <div className="bg-white p-12 rounded-lg shadow-sm text-center">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
              <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                Start ordering now
              </Link>
            </div>
          ) : (
            mockOrders.map((order) => {
              const config = statusConfig[order.status]
              const StatusIcon = config.icon
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{order.orderNumber}</h3>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 w-fit ${config.color}`}
                    >
                      <StatusIcon className="w-4 h-4" />
                      {config.label}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Items */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.name} x {item.quantity}
                            </span>
                            <span className="font-medium text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
                        <p className="font-medium text-foreground">{order.deliveryAddress}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                        <p className="font-medium text-foreground">{order.estimatedDelivery}</p>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="pt-4 border-t flex justify-between items-center">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-emerald-600">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </main>
  )
}
