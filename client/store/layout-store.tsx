import { create } from 'zustand'

interface InterfaceStore {
  showSidebar: boolean
  showSettings: boolean
  showTask: boolean
  toggleSidebar: () => void
  toggleSettings: () => void
  toggleTask: () => void
  closeTask: () => void
  setTask: (open: boolean) => void
  setSettings: (open: boolean) => void
}

export const useLayoutStore = create<InterfaceStore>((set) => ({
  showSidebar: true,
  showSettings: false,
  showTask: false,
  toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
  toggleSettings: () => set((state) => ({ showSettings: !state.showSettings })),
  toggleTask: () => set((state) => ({ showTask: !state.showTask })),
  closeTask: () => set(() => ({ showTask: false })),
  setTask: (open: boolean) => set(() => ({ showTask: open })),
  setSettings: (open: boolean) => set(() => ({ showSettings: open })),
}))
