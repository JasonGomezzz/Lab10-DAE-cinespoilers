import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Movie, Showtime } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (movie: Movie, showtime: Showtime, quantity: number) => void
  removeItem: (movieId: string, showtimeId: string) => void
  clearCart: () => void
  total: () => number
}

export const useCartStore = create<CartStore>()(

  persist(
    (set, get) => ({
      items: [],

      addItem: (movie, showtime, quantity) => {
        const existing = get().items.find(
          (i) => i.movie.id === movie.id && i.showtime.id === showtime.id
        )
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.movie.id === movie.id && i.showtime.id === showtime.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          })
        } else {
          set({ items: [...get().items, { movie, showtime, quantity }] })
        }
      },

      removeItem: (movieId, showtimeId) => {
        set({
          items: get().items.filter(
            (i) => !(i.movie.id === movieId && i.showtime.id === showtimeId)
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((acc, i) => acc + i.movie.price * i.quantity, 0),
    }),
    { name: 'cinespoilers-cart' }
  )
)