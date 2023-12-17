import { create } from 'zustand'

interface GlobalStore {
  showSidebar: boolean
  toggleSidebar: () => void
  showDrawer: boolean
  toggleDrawer: () => void
  switch: boolean
  setSwitch: (value: boolean) => void
  handleToggle: () => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  showSidebar: true,
  toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
  showDrawer: false,
  toggleDrawer: () => set((state) => ({ showDrawer: !state.showDrawer })),
  switch: false,
  setSwitch: (value) => set(() => ({ switch: value })),
  handleToggle: () => {
    set((state) => ({ switch: true }))
    set((state) => ({ showSidebar: !state.showSidebar }))
    setTimeout(() => set((state) => ({ switch: false })), 500)
  },
}))
