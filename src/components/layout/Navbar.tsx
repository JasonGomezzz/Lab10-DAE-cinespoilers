import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl tracking-tight">
          CineSpoilerS 🎬
        </Link>
        <Link to="/cart" className="text-zinc-400 hover:text-white transition-colors">
          Carrito
        </Link>
      </div>
    </nav>
  )
}