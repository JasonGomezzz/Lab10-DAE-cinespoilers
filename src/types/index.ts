export interface Movie {
  id: string
  title: string
  genre: string[]
  duration: number // minutos
  rating: number // 0-10
  price: number // soles
  image: string
  description: string
  director: string
  cast: string[]
  showtimes: Showtime[]
}

export interface Showtime {
  id: string
  date: string // "2026-05-25"
  time: string // "19:30"
  availableSeats: number
}

export interface CartItem {
  movie: Movie
  showtime: Showtime
  quantity: number
}