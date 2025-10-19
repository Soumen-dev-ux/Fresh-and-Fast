"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getCurrentUser, signOut } from "@/lib/supabase/auth"
import { getUserOrders } from "@/lib/supabase/orders"
import { User, MapPin, Mail, Calendar, Package, LogOut } from "lucide-react"

interface Order {
  id: string
  order_number: string
  created_at: string
  items: string[]
  total: number
  status: "delivered" | "preparing" | "on-the-way"
  delivery_address: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data, error } = await getCurrentUser()

        if (error || !data.user) {
          router.push("/auth/login")
          return
        }

        setUser(data.user)

        const { data: ordersData } = await getUserOrders(data.user.id)
        setOrders(ordersData || [])
      } catch (err) {
        console.error("Error loading user data:", err)
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header cartCount={cartItems.length} onCartClick={() => setCartOpen(!cartOpen)} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={cartItems.length} onCartClick={() => setCartOpen(!cartOpen)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-12">My Profile</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-8 sticky top-20">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{user?.email}</h2>
              </div>

              <div className="space-y-4 border-t pt-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="text-foreground font-medium">{new Date(user?.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Order History */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                <Package className="w-6 h-6 text-emerald-600" />
                <h3 className="text-2xl font-bold text-foreground">Order History</h3>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No orders yet. Start ordering from Fresh & Fast!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-border rounded-lg p-6 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Order Number</p>
                          <p className="text-lg font-bold text-foreground">{order.order_number}</p>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "on-the-way"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status === "delivered"
                            ? "Delivered"
                            : order.status === "on-the-way"
                              ? "On the Way"
                              : "Preparing"}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{order.delivery_address}</span>
                        </div>
                      </div>

                      <div className="mb-4 pb-4 border-t">
                        <p className="text-sm text-muted-foreground mb-2">Items:</p>
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item, idx) => (
                            <span key={idx} className="bg-muted px-3 py-1 rounded-full text-sm text-foreground">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Amount</span>
                        <span className="text-2xl font-bold text-emerald-600">₹{order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
