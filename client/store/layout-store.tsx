import { create } from 'zustand'

interface LayoutStore {
  showSidebar: boolean
  showSettings: boolean
  showTask: boolean
  toggleSidebar: () => void
  toggleSettings: () => void
  toggleTask: () => void
  openTask: (taskId: string) => void
  closeTask: () => void
  closePopovers: () => void
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  showSidebar: true,
  showSettings: false,
  showTask: false,
  toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
  toggleSettings: () => set((state) => ({ showSettings: !state.showSettings })),
  toggleTask: () => set((state) => ({ showTask: !state.showTask })),
  openTask: () => {},
  closeTask: () => set(() => ({ showTask: false })),
  closePopovers: () => set(() => ({})),
}))
