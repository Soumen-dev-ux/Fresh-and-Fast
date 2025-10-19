"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Menu from "@/components/menu"
import Footer from "@/components/footer"
import Cart from "@/components/cart"

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])

  const addToCart = (item: any) => {
    const existing = cartItems.find((i) => i.id === item.id)
    if (existing) {
      setCartItems(cartItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)))
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter((i) => i.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCartItems(cartItems.map((i) => (i.id === itemId ? { ...i, quantity } : i)))
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={cartItems.length} onCartClick={() => setCartOpen(!cartOpen)} />
      {cartOpen && (
        <Cart
          items={cartItems}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onClose={() => setCartOpen(false)}
        />
      )}
      <Hero />
      <Features />
      <Menu onAddToCart={addToCart} />
      <Footer />
    </main>
  )
}
