import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/CartStore'

export default function Navbar() {
  const items = useCartStore((s) => s.items)
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl tracking-tight">
          CineSpoilerS 🎬
        </Link>
        <Link to="/cart" className="relative text-zinc-400 hover:text-white transition-colors">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}