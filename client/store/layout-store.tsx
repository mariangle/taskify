import { create } from 'zustand';

interface InterfaceStore {
  showLeftSidebar: boolean;
  showSettingsOverlay: boolean;
  showTaskOverlay: boolean;
  toggleSettingsOverlay: () => void;
  toggleLeftSidebar: () => void;
  toggleTaskOverlay: () => void;
  closeTaskOverlay: () => void;
  setTaskOverlay: (open: boolean) => void;
  setSettingsOverlay: (open: boolean) => void;
}

export const useLayoutStore = create<InterfaceStore>((set) => ({
  showLeftSidebar: true,
  showSettingsOverlay: false,
  showTaskOverlay: false,
  toggleLeftSidebar: () =>
    set((state) => ({ showLeftSidebar: !state.showLeftSidebar })),
  toggleSettingsOverlay: () =>
    set((state) => ({ showSettingsOverlay: !state.showSettingsOverlay })),
  toggleTaskOverlay: () =>
    set((state) => ({ showTaskOverlay: !state.showTaskOverlay })),
  closeTaskOverlay: () => set(() => ({ showTaskOverlay: false })),
  setTaskOverlay: (open: boolean) => set(() => ({ showTaskOverlay: open })),
  setSettingsOverlay: (open: boolean) =>
    set(() => ({ showSettingsOverlay: open })),
}));
