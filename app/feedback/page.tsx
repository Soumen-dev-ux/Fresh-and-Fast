"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { saveFeedback } from "@/lib/supabase/feedback"
import { Star, Send } from "lucide-react"

export default function FeedbackPage() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    category: "general",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { error: feedbackError } = await saveFeedback({
        name: formData.name,
        email: formData.email,
        orderNumber: formData.orderNumber,
        rating,
        category: formData.category,
        message: formData.message,
      })

      if (feedbackError) {
        setError(feedbackError.message)
        return
      }

      setSubmitted(true)
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          orderNumber: "",
          category: "general",
          message: "",
        })
        setRating(0)
        setSubmitted(false)
      }, 3000)
    } catch (err: any) {
      setError(err.message || "Failed to submit feedback")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={cartItems.length} onCartClick={() => setCartOpen(!cartOpen)} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">We Value Your Feedback</h1>
          <p className="text-lg text-muted-foreground">Help us improve by sharing your experience with Fresh & Fast</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Thank You!</h2>
              <p className="text-muted-foreground">
                Your feedback has been submitted successfully. We appreciate your input!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Your Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Order Number (Optional)</label>
                  <input
                    type="text"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="ORD-XXXXXXXXX"
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">How would you rate your experience?</h3>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition transform hover:scale-110"
                    >
                      <Star
                        className={`w-12 h-12 ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Feedback Category</h3>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="general">General Feedback</option>
                  <option value="food-quality">Food Quality</option>
                  <option value="delivery">Delivery Service</option>
                  <option value="customer-service">Customer Service</option>
                  <option value="website">Website/App Experience</option>
                  <option value="pricing">Pricing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Your Feedback</h3>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  rows={6}
                  placeholder="Please share your thoughts, suggestions, or concerns..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {loading ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How long does delivery take?",
                a: "Standard delivery takes 30-45 minutes depending on your location.",
              },
              {
                q: "Can I modify my order after placing it?",
                a: "You can modify orders within 5 minutes of placement. Contact support for assistance.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and digital wallets.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer full refunds for orders not delivered or if you're unsatisfied with the quality.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-border">
                <h4 className="font-semibold text-foreground mb-2">{faq.q}</h4>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
