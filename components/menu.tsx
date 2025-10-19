"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const menuItems = [
  // Salads
  {
    id: "1",
    name: "Grilled Chicken Salad",
    price: 349,
    description: "Fresh greens with grilled chicken, cherry tomatoes, and house dressing",
    image: "/grilled-chicken-salad.jpg",
    category: "Salads",
  },
  {
    id: "2",
    name: "Caesar Salad",
    price: 299,
    description: "Crisp romaine, parmesan, croutons, and creamy Caesar dressing",
    image: "/caesar-salad.png",
    category: "Salads",
  },
  {
    id: "3",
    name: "Mediterranean Salad",
    price: 379,
    description: "Mixed greens, feta, olives, cucumbers, and olive oil vinaigrette",
    image: "/mediterranean-salad.jpg",
    category: "Salads",
  },
  // Bowls
  {
    id: "4",
    name: "Veggie Power Bowl",
    price: 279,
    description: "Quinoa, roasted vegetables, chickpeas, and tahini dressing",
    image: "/veggie-power-bowl.jpg",
    category: "Bowls",
  },
  {
    id: "5",
    name: "Salmon Poke Bowl",
    price: 399,
    description: "Sushi-grade salmon, rice, avocado, cucumber, and spicy mayo",
    image: "/salmon-poke-bowl.jpg",
    category: "Bowls",
  },
  {
    id: "6",
    name: "Teriyaki Chicken Bowl",
    price: 349,
    description: "Grilled chicken, brown rice, broccoli, carrots, and teriyaki glaze",
    image: "/teriyaki-chicken-bowl.jpg",
    category: "Bowls",
  },
  {
    id: "7",
    name: "Buddha Bowl",
    price: 329,
    description: "Roasted sweet potato, kale, chickpeas, tahini dressing",
    image: "/buddha-bowl.jpg",
    category: "Bowls",
  },
  // Wraps & Sandwiches
  {
    id: "8",
    name: "Turkey Wrap",
    price: 249,
    description: "Sliced turkey, lettuce, tomato, and cranberry sauce in a whole wheat wrap",
    image: "/turkey-wrap.jpg",
    category: "Wraps & Sandwiches",
  },
  {
    id: "9",
    name: "Veggie Wrap",
    price: 219,
    description: "Hummus, roasted vegetables, spinach, and feta in a spinach wrap",
    image: "/veggie-wrap.jpg",
    category: "Wraps & Sandwiches",
  },
  {
    id: "10",
    name: "Grilled Chicken Sandwich",
    price: 279,
    description: "Grilled chicken breast, avocado, bacon, and chipotle mayo on sourdough",
    image: "/grilled-chicken-sandwich.jpg",
    category: "Wraps & Sandwiches",
  },
  // Vegetarian
  {
    id: "11",
    name: "Falafel Plate",
    price: 299,
    description: "Crispy falafel, hummus, pita bread, and fresh vegetables",
    image: "/falafel-plate.jpg",
    category: "Vegetarian",
  },
  {
    id: "12",
    name: "Veggie Burger",
    price: 279,
    description: "Plant-based patty, lettuce, tomato, pickles, and vegan mayo",
    image: "/veggie-burger.jpg",
    category: "Vegetarian",
  },
  // Breakfast
  {
    id: "13",
    name: "Acai Bowl",
    price: 229,
    description: "Acai berry base with granola, coconut, and fresh berries",
    image: "/acai-bowl.jpg",
    category: "Breakfast",
  },
  {
    id: "14",
    name: "Protein Pancakes",
    price: 249,
    description: "Fluffy pancakes with protein powder, berries, and Greek yogurt",
    image: "/protein-pancakes.jpg",
    category: "Breakfast",
  },
]

const categories = ["All", ...Array.from(new Set(menuItems.map((item) => item.category)))]

interface MenuProps {
  onAddToCart: (item: any) => void
}

export default function Menu({ onAddToCart }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredItems =
    selectedCategory === "All" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="menu" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">Our Menu</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Carefully crafted meals made with the freshest ingredients
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-foreground border border-border hover:border-emerald-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-emerald-600">₹{item.price}</span>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
