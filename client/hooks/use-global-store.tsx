import { create } from 'zustand'

interface GlobalStore {
  showSidebar: boolean
  toggleSidebar: () => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  showSidebar: false,
  toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
}))
