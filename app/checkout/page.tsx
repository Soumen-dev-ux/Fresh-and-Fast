"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const cartItems = [
    { id: "1", name: "Grilled Chicken Salad", price: 12.99, quantity: 2 },
    { id: "5", name: "Salmon Poke Bowl", price: 14.99, quantity: 1 },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const delivery = subtotal > 25 ? 0 : 3.99
  const total = subtotal + tax + delivery

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === "shipping") {
      setStep("payment")
    } else if (step === "payment") {
      setStep("review")
    }
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8 flex gap-4">
              {["shipping", "payment", "review"].map((s, index) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step === s
                        ? "bg-emerald-600 text-white"
                        : ["shipping", "payment", "review"].indexOf(step) > index
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-foreground capitalize">{s}</span>
                  {index < 2 && <div className="hidden sm:block w-8 h-0.5 bg-border" />}
                </div>
              ))}
            </div>

            {/* Forms */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Step */}
              {step === "shipping" && (
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                    Shipping Address
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">State</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">ZIP Code</label>
                      <input
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {step === "payment" && (
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">Payment Information</h2>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        required
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Review Step */}
              {step === "review" && (
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">Order Review</h2>

                  <div className="space-y-3 pb-4 border-b">
                    <h3 className="font-semibold text-foreground">Shipping To:</h3>
                    <p className="text-muted-foreground">{formData.name}</p>
                    <p className="text-muted-foreground">{formData.address}</p>
                    <p className="text-muted-foreground">
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Items</h3>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-muted-foreground">
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                {step !== "shipping" && (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === "payment") setStep("shipping")
                      else if (step === "review") setStep("payment")
                    }}
                    className="flex-1 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3 rounded-lg font-semibold transition"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className={`flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition ${
                    step === "shipping" ? "" : ""
                  }`}
                >
                  {step === "review" ? "Place Order" : "Continue"}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Order Summary</h3>

              <div className="space-y-3 pb-4 border-b mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-foreground">{delivery === 0 ? "FREE" : `$${delivery.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-emerald-600">${total.toFixed(2)}</span>
              </div>

              <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                <p className="text-sm text-emerald-900">
                  <strong>Free delivery</strong> on orders over $25!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
