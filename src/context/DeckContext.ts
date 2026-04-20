import { createContext, useContext } from 'react'

interface DeckContextType {
  goToSlide: (index: number) => void
  current: number
  total: number
}

export const DeckContext = createContext<DeckContextType>({
  goToSlide: () => {},
  current: 0,
  total: 8,
})

export function useDeck() {
  return useContext(DeckContext)
}
