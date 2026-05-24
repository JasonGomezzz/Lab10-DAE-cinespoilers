import { MOVIES } from '@/lib/mock-data'
import MovieCard from '@/components/MovieCard'

export default function Home() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Cartelera</h1>
        <p className="text-zinc-400">Elige tu película y reserva tus entradas</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {MOVIES.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}