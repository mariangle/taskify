import { create } from 'zustand'

interface InterfaceStore {
  showLeftSidebar: boolean
  showRightSidebar: boolean
  showSettingsOverlay: boolean
  showTaskOverlay: boolean
  showChatOverlay: boolean
  toggleLeftSidebar: () => void
  toggleRightSidebar: () => void
  toggleSettingsOverlay: () => void
  toggleTaskOverlay: () => void
  toggleChatOverlay: () => void
  closeTaskOverlay: () => void
  setTaskOverlay: (open: boolean) => void
  setSettingsOverlay: (open: boolean) => void
}

export const useLayoutStore = create<InterfaceStore>((set) => ({
  showLeftSidebar: true,
  showRightSidebar: false,
  showSettingsOverlay: false,
  showTaskOverlay: false,
  showChatOverlay: false,
  toggleChatOverlay: () => set((state) => ({ showChatOverlay: !state.showChatOverlay })),
  toggleLeftSidebar: () => set((state) => ({ showLeftSidebar: !state.showLeftSidebar })),
  toggleRightSidebar: () => set((state) => ({ showRightSidebar: !state.showRightSidebar })),
  toggleSettingsOverlay: () => set((state) => ({ showSettingsOverlay: !state.showSettingsOverlay })),
  toggleTaskOverlay: () => set((state) => ({ showTaskOverlay: !state.showTaskOverlay })),
  closeTaskOverlay: () => set(() => ({ showTaskOverlay: false })),
  setTaskOverlay: (open: boolean) => set(() => ({ showTaskOverlay: open })),
  setSettingsOverlay: (open: boolean) => set(() => ({ showSettingsOverlay: open })),
}))
