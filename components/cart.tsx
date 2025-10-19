"use client"

import type React from "react"
import { X, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { useState } from "react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartProps {
  items: CartItem[]
  onRemove: (itemId: string) => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onClose: () => void
}

export default function Cart({ items, onRemove, onUpdateQuantity, onClose }: CartProps) {
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "confirmation">("cart")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [orderNumber, setOrderNumber] = useState("")

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.05
  const delivery = subtotal > 500 ? 0 : 99
  const total = subtotal + tax + delivery

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    const newOrderNumber = `ORD-${Date.now()}`
    setOrderNumber(newOrderNumber)
    setCheckoutStep("confirmation")
  }

  const handleCompleteOrder = () => {
    setCheckoutStep("cart")
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-end md:items-center md:justify-end">
      <div className="bg-white w-full md:w-96 h-screen md:h-auto md:rounded-lg shadow-xl flex flex-col max-h-screen md:max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-foreground">
            {checkoutStep === "cart" ? "Shopping Cart" : checkoutStep === "checkout" ? "Checkout" : "Order Confirmed"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {checkoutStep === "cart" ? (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-emerald-600 font-bold">₹{item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="ml-auto text-red-500 hover:bg-red-50 p-1 rounded transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : checkoutStep === "checkout" ? (
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="space-y-3 pb-4 border-b">
                <h3 className="font-semibold text-foreground">Delivery Information</h3>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Payment Information</h3>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      required
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      required
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Order Confirmed!</h3>
              <p className="text-muted-foreground">Your order has been placed successfully</p>
              <div className="bg-muted p-4 rounded-lg w-full">
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="text-lg font-bold text-foreground">{orderNumber}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg w-full text-left">
                <p className="text-sm font-semibold text-foreground mb-2">Delivery Details</p>
                <p className="text-sm text-muted-foreground">{formData.address}</p>
                <p className="text-sm text-muted-foreground">
                  {formData.city}, {formData.zipCode}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Estimated delivery: 30 minutes</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4 sticky bottom-0 bg-white">
            {checkoutStep === "cart" && (
              <>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span className="text-foreground">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-foreground">{delivery === 0 ? "FREE" : `₹${delivery.toFixed(2)}`}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-emerald-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setCheckoutStep("checkout")}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  Proceed to Checkout
                </button>
              </>
            )}
            {checkoutStep === "checkout" && (
              <>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span className="text-foreground">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-foreground">{delivery === 0 ? "FREE" : `₹${delivery.toFixed(2)}`}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-emerald-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCheckoutStep("cart")}
                    className="flex-1 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3 rounded-lg font-semibold transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
            {checkoutStep === "confirmation" && (
              <button
                onClick={handleCompleteOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Continue Shopping
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
