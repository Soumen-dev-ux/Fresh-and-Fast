import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <span className="font-bold">FF</span>
              </div>
              <span className="font-bold text-lg">Fresh & Fast</span>
            </div>
            <p className="text-gray-300 mb-4">Delivering fresh, healthy meals to your door in 30 minutes or less.</p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-white/10 hover:bg-emerald-600 rounded-lg transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-emerald-600 rounded-lg transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-emerald-600 rounded-lg transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-emerald-600 rounded-lg transition">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#menu" className="hover:text-emerald-400 transition">
                  Menu
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/orders" className="hover:text-emerald-400 transition">
                  My Orders
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-emerald-400 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">+91 74328 40665 </p>
                  <p className="text-xs text-gray-400">{"College Days\n9:00 am - 6:00pm"} </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">fresh&amp;fast-canteen@gmit.org</p>
                  <p className="text-xs text-gray-400">We reply within 24 hours</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">GMIT canteen</p>
                  <p className="text-xs text-gray-400">Canteen Area</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-white/10 rounded-lg p-6 mb-12">
          <h3 className="font-semibold mb-2 text-lg">Subscribe to Our Newsletter</h3>
          <p className="text-gray-300 mb-4">Get exclusive offers and updates delivered to your inbox.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition">
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Fresh & Fast. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
