'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Icons } from '../../ui/icons'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/lib/util/cn'
import { Button, buttonVariants } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import toast from 'react-hot-toast'
import { useTheme } from 'next-themes'
import { useSettingsStore } from '@/store/settings-store'

const preferencesFormSchema = z.object({
  theme: z.enum(['light', 'dark'], {
    required_error: 'Please select a theme.',
  }),
})

type PreferencesFormValues = z.infer<typeof preferencesFormSchema>

export function PreferencesForm() {
  const { setTheme } = useTheme()
  const { settings, setSettings } = useSettingsStore()

  const defaultValues: Partial<PreferencesFormValues> = {
    theme: settings.theme,
  }

  const form = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues,
  })

  function onSubmit(data: PreferencesFormValues) {
    setSettings({ ...settings, theme: data.theme })
    toast.success('Changes saved.')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>Select the theme for the application.</FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-2 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div
                      className="items-center rounded-md border-2 border-muted p-1 hover:border-accent"
                      onClick={() => setTheme('light')}
                    >
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">Light</span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div
                      className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setTheme('dark')}
                    >
                      <div className="space-y-2 rounded-sm bg-[#15161d] p-2">
                        <div className="space-y-2 rounded-md bg-[#1c1e29] p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-slate-600" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-600" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-[#1c1e29] p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-600" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-600" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-[#1c1e29] p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-600" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-600" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">Dark</span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <Button type="submit">Update preferences</Button>
      </form>
    </Form>
  )
}
