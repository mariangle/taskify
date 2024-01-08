'use client';

import * as React from 'react';

import {
  Cog,
  UserCircle,
  Bell,
  Heart,
  LucideIcon,
  PanelLeft,
  Palette,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AccountForm } from '@/components/settings/account-form';
import { PreferencesForm } from '@/components/settings/preferences-form';
import { LayoutForm } from './layout-form';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

const settingsTabs: Tab[] = [
  {
    id: 'account',
    label: 'Account',
    icon: UserCircle,
  },
  {
    id: 'general',
    label: 'General',
    icon: Cog,
  },
  {
    id: 'reminders',
    label: 'Reminders',
    icon: Bell,
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: Heart,
  },
  {
    id: 'layout',
    label: 'Layout',
    icon: PanelLeft,
  },
  {
    id: 'productivity',
    label: 'Productivity',
    icon: Sparkles,
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: Palette,
  },
];

type FormComponents = {
  // eslint-disable-next-line no-unused-vars
  [key in Tab['id']]: React.ComponentType;
};

const formComponents: FormComponents = {
  account: AccountForm,
  preferences: PreferencesForm,
  layout: LayoutForm,
};

export default function SettingsPanel() {
  const [tab, setTab] = React.useState<Tab>(settingsTabs[0]);

  const FormComponent = formComponents[tab.id];

  return (
    <div className="flex w-full">
      <div className="bg-background border-r">
        <div className="pt-4 pb-2 px-6">
          <span className="w-full font-semibold">Settings</span>
        </div>
        <ul className="p-2 space-y-1">
          {settingsTabs.map((item) => (
            <li key={item.id}>
              <Button
                variant={tab.id === item.id ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setTab(item)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-background w-full">
        <div className="border-b p-4 w-full text-sm font-semibold">
          {tab.label}
        </div>
        <div className="p-4">{FormComponent && <FormComponent />}</div>
      </div>
    </div>
  );
}
