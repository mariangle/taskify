'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/seperator'
import { Cog, UserCircle, Bell, Tags, Palette, Heart, LucideIcon } from 'lucide-react'
import { AccountForm } from '@/components/shared/settings/account-form'
import { AppearanceForm } from '@/components/shared/settings/appearance-form'
import LabelForm from '@/components/shared/settings/label-form'
import { LabelResponse } from '@/types'

import LabelTab from './label-tab'

interface Tab {
  id: string
  label: string
  icon: LucideIcon
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
    id: 'labels',
    label: 'Labels',
    icon: Tags,
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: Palette,
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
]

type FormComponents = {
  [key in Tab['id']]: React.ComponentType
}

const formComponents: FormComponents = {
  account: AccountForm,
  labels: LabelTab,
  appearance: AppearanceForm, // TODO: Maybe just put this into preferences form
}

export default function SettingsPanel() {
  const [tab, setTab] = React.useState<Tab>(settingsTabs[0])

  const FormComponent = formComponents[tab.id]

  return (
    <div className="flex w-full">
      <div className="bg-background border-r">
        <div className="pt-4 pb-2 px-6">
          <span className="w-full font-semibold">Settings</span>
        </div>
        <ul className="p-2">
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
        <div className="border-b p-4 w-full text-sm font-semibold">{tab.label}</div>
        <div className="p-4">{FormComponent && <FormComponent />}</div>
      </div>
    </div>
  )
}
