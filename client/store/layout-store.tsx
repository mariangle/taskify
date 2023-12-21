import { create } from 'zustand'

interface LayoutStore {
  showSidebar: boolean
  showSettings: boolean
  toggleSidebar: () => void
  toggleSettings: () => void
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  showSidebar: true,
  showSettings: false,
  toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
  toggleSettings: () => set((state) => ({ showSettings: !state.showSettings })),
}))
