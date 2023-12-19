import { create } from 'zustand'

interface GlobalStore {
  showSidebar: boolean
  toggleSidebar: () => void
  signal: boolean
  rerenderClient: () => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  showSidebar: true,
  toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
  signal: false,
  rerenderClient: () => set((state) => ({ signal: !state.signal })),
}))
