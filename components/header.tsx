"use client"

import { ShoppingCart, MenuIcon, User, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { getCurrentUser, signOut } from "@/lib/supabase/auth"

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await getCurrentUser()
        setUser(data.user)
      } catch (err) {
        console.error("Error checking user:", err)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  const handleSignOut = async () => {
    await signOut()
    window.location.reload()
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">🥗</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">Fresh & Fast</span>
          </Link>

          <nav className="hidden md:flex gap-8">
            <a href="/#menu" className="text-foreground hover:text-emerald-600 transition">
              Menu
            </a>
            <a href="/#about" className="text-foreground hover:text-emerald-600 transition">
              About
            </a>
            <Link href="/contact" className="text-foreground hover:text-emerald-600 transition">
              Contact
            </Link>
            <Link href="/feedback" className="text-foreground hover:text-emerald-600 transition">
              Feedback
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {!loading && user ? (
              <>
                <Link href="/profile" className="p-2 hover:bg-muted rounded-lg transition" title="Profile">
                  <User className="w-6 h-6 text-foreground" />
                </Link>
                <button onClick={handleSignOut} className="p-2 hover:bg-muted rounded-lg transition" title="Sign Out">
                  <LogOut className="w-6 h-6 text-foreground" />
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="text-foreground hover:text-emerald-600 transition font-semibold">
                Sign In
              </Link>
            )}
            <button onClick={onCartClick} className="relative p-2 hover:bg-muted rounded-lg transition">
              <ShoppingCart className="w-6 h-6 text-foreground" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition"
            >
              <MenuIcon className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <a href="/#menu" className="text-foreground hover:text-emerald-600 transition py-2">
              Menu
            </a>
            <a href="/#about" className="text-foreground hover:text-emerald-600 transition py-2">
              About
            </a>
            <Link href="/contact" className="text-foreground hover:text-emerald-600 transition py-2">
              Contact
            </Link>
            <Link href="/feedback" className="text-foreground hover:text-emerald-600 transition py-2">
              Feedback
            </Link>
            {user && (
              <Link href="/profile" className="text-foreground hover:text-emerald-600 transition py-2">
                Profile
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
