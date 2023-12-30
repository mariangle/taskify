'use client'

import * as React from 'react'
import * as z from 'zod'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Icons } from '../../ui/icons'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSettingsStore } from '@/store/settings-store'
import { widgetItems, sidebarItems } from '@/lib/constants'

const layoutFormSchema = z.object({
  sidebarItems: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  widgetItems: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
})

type LayoutFormValues = z.infer<typeof layoutFormSchema>

export function LayoutForm() {
  const { settings, setSettings } = useSettingsStore()

  const defaultValues: Partial<LayoutFormValues> = {
    sidebarItems: settings.sidebar,
    widgetItems: settings.widgets,
  }
  const form = useForm<LayoutFormValues>({
    resolver: zodResolver(layoutFormSchema),
    defaultValues,
  })

  function onSubmit(data: LayoutFormValues) {
    // @ts-expect-error: Zod schema vs application expectation
    setSettings({ ...settings, sidebar: data.sidebarItems, widgets: data.widgetItems })
    toast.success('Changes saved.')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="sidebarItems"
          render={() => (
            <FormItem className="space-y-4">
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>Personalize your left sidebar for quick access to essential features.</FormDescription>
              </div>
              {sidebarItems.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="sidebarItems"
                  render={({ field }) => {
                    return (
                      <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value) => value !== item.id))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal flex-gap">
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="widgetItems"
          render={() => (
            <FormItem className="space-y-4">
              <div className="mb-4">
                <FormLabel className="text-base">Widgets</FormLabel>
                <FormDescription>Select the widgets that matter most for quick access.</FormDescription>
              </div>
              {widgetItems.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="widgetItems"
                  render={({ field }) => {
                    return (
                      <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value) => value !== item.id))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal flex-gap">
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update layout</Button>
      </form>
    </Form>
  )
}
