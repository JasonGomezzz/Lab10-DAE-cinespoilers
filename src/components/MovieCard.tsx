import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Star, Clock } from 'lucide-react'
import type { Movie } from '@/types'

interface Props {
  movie: Movie
}

export default function MovieCard({ movie }: Props) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="cursor-pointer bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-colors"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-sm font-medium">{movie.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-base leading-tight mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-zinc-400 text-sm mb-3">
          <Clock className="w-3 h-3" />
          <span>{movie.duration} min</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {movie.genre.map((g) => (
            <span
              key={g}
              className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full"
            >
              {g}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white font-bold">S/ {movie.price}</span>
          <span className="text-xs text-zinc-500">Ver horarios →</span>
        </div>
      </div>
    </motion.div>
  )
}