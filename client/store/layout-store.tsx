import { create } from 'zustand';

interface InterfaceStore {
  showLeftSidebar: boolean;
  showSettingsOverlay: boolean;
  showTaskOverlay: boolean;
  showChatOverlay: boolean;
  toggleSettingsOverlay: () => void;
  toggleLeftSidebar: () => void;
  toggleTaskOverlay: () => void;
  toggleChatOverlay: () => void;
  closeTaskOverlay: () => void;
  setTaskOverlay: (open: boolean) => void;
  setSettingsOverlay: (open: boolean) => void;
}

export const useLayoutStore = create<InterfaceStore>((set) => ({
  showLeftSidebar: true,
  showSettingsOverlay: false,
  showTaskOverlay: false,
  showChatOverlay: false,
  toggleChatOverlay: () =>
    set((state) => ({ showChatOverlay: !state.showChatOverlay })),
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
