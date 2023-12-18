import { create } from 'zustand'

interface GlobalStore {
  showSidebar: boolean
  toggleSidebar: () => void
  switch: boolean
  setSwitch: (value: boolean) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  showSidebar: true,
  switch: false,
  setSwitch: (value) => set(() => ({ switch: value })),
  toggleSidebar: () => {
    set(() => ({ switch: true }))
    set((state) => ({ showSidebar: !state.showSidebar }))
    setTimeout(() => set(() => ({ switch: false })), 500)
  },
}))
