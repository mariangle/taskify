import { create } from 'zustand'

interface SignalStore {
  signal: boolean
  triggerSignal: () => void
}

// ! TEMPORARY solution to rerender client components on server updates

export const useSignalStore = create<SignalStore>((set) => ({
  signal: false,
  triggerSignal: () => set((state) => ({ signal: !state.signal })),
}))
