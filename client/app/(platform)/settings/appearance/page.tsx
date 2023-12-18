import { Separator } from '@/components/ui/seperator'
import { AppearanceForm } from './appearance-form'

export default async function SettingsAppearancePage() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  )
}
