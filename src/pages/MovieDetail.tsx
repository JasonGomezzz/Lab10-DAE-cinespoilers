import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Clock, ShoppingCart } from 'lucide-react'
import { MOVIES } from '@/lib/mock-data'
import { useCartStore } from '@/store/CartStore'
import type { Showtime } from '@/types'

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)

  const movie = MOVIES.find((m) => m.id === id)

  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!movie) {
    return (
      <div className="text-white text-center mt-20">
        <p className="text-2xl mb-4">Película no encontrada</p>
        <button onClick={() => navigate('/')} className="text-zinc-400 hover:text-white">
          ← Volver
        </button>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedShowtime) return
    addItem(movie, selectedShowtime, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a cartelera
      </button>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        {/* Poster */}
        <div className="rounded-xl overflow-hidden aspect-[2/3]">
          <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>

          <div className="flex items-center gap-4 text-zinc-400 text-sm mb-4">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-medium">{movie.rating}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {movie.duration} min
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genre.map((g) => (
              <span key={g} className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
                {g}
              </span>
            ))}
          </div>

          <p className="text-zinc-400 mb-4 leading-relaxed">{movie.description}</p>

          <div className="text-sm text-zinc-500 mb-6">
            <p><span className="text-zinc-300">Director:</span> {movie.director}</p>
            <p><span className="text-zinc-300">Reparto:</span> {movie.cast.join(', ')}</p>
          </div>

          {/* Horarios */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">Selecciona un horario</h3>
            <div className="flex flex-wrap gap-2">
              {movie.showtimes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedShowtime(s)}
                  className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                    selectedShowtime?.id === s.id
                      ? 'bg-white text-zinc-950 border-white font-medium'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-400'
                  }`}
                >
                  {s.date} — {s.time}
                  <span className="ml-2 text-xs opacity-60">{s.availableSeats} asientos</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cantidad */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-zinc-400 text-sm">Cantidad:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
              >
                −
              </button>
              <span className="text-white font-medium w-4 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="w-8 h-8 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
              >
                +
              </button>
            </div>
            <span className="text-white font-bold text-lg ml-auto">
              S/ {movie.price * quantity}
            </span>
          </div>

          {/* Botón */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedShowtime}
            className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              added
                ? 'bg-green-500 text-white'
                : selectedShowtime
                ? 'bg-white text-zinc-950 hover:bg-zinc-200'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            {added ? '¡Agregado al carrito!' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}