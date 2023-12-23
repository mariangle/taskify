import { create } from 'zustand'

interface SignalStore {
  signal: boolean
  triggerSignal: () => void
}

// Solution to rerender client components across app that are subsribed to the signal dependency useEffect

export const useSignal = create<SignalStore>((set) => ({
  signal: false,
  triggerSignal: () => set((state) => ({ signal: !state.signal })),
}))
