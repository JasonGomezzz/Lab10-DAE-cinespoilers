import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/CartStore'

export default function Cart() {
  const navigate = useNavigate()
  const { items, removeItem, total } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShoppingCart className="w-16 h-16 text-zinc-700 mb-4" />
        <h2 className="text-white text-2xl font-bold mb-2">Tu carrito está vacío</h2>
        <p className="text-zinc-400 mb-6">Agrega tickets desde la cartelera</p>
        <button
          onClick={() => navigate('/')}
          className="bg-white text-zinc-950 px-6 py-2 rounded-xl font-semibold hover:bg-zinc-200 transition-colors"
        >
          Ver cartelera
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Tu carrito</h1>

      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={`${item.movie.id}-${item.showtime.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex gap-4"
            >
              <img
                src={item.movie.image}
                alt={item.movie.title}
                className="w-16 h-24 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold truncate">{item.movie.title}</h3>
                <p className="text-zinc-400 text-sm mt-1">
                  {item.showtime.date} — {item.showtime.time}
                </p>
                <p className="text-zinc-400 text-sm">
                  {item.quantity} {item.quantity === 1 ? 'entrada' : 'entradas'} × S/ {item.movie.price}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(item.movie.id, item.showtime.id)}
                  className="text-zinc-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <span className="text-white font-bold">
                  S/ {item.movie.price * item.quantity}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Total */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-zinc-400">Total</span>
          <span className="text-white text-2xl font-bold">S/ {total()}</span>
        </div>
      </div>

      <button
        onClick={() => navigate('/checkout')}
        className="w-full bg-white text-zinc-950 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
      >
        Proceder al pago
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  )
}