import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { SidebarItem, WidgetItem } from '@/lib/constants';

type Mode = 'light' | 'dark';

interface Settings {
  theme: Mode;
  sidebar: SidebarItem[];
  widgets: WidgetItem[];
}

interface SettingsStore {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

export const useSettingsStore = create(
  persist<SettingsStore>(
    (set, get) => ({
      settings: { theme: 'dark' as Mode, sidebar: [], widgets: [] },
      setSettings: (settings: Settings) => {
        set({ settings });
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
