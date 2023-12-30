'use client'
import * as React from 'react'

import { Calendar } from '@/components/ui/calendar'
import { useLayoutStore } from '@/store/layout-store'
import { Timer } from '@/components/shared/timer'

import { cn } from '@/lib/util/cn'
import type { TaskResponse } from '@/types'
import { TaskService } from '@/services/task-service'
import { useSignal } from '@/hooks/use-signal'
import { useSettingsStore } from '@/store/settings-store'
import { useMounted } from '@/hooks/use-mounted'

export default function RightSidebar() {
  const { showRightSidebar } = useLayoutStore()
  const { signal } = useSignal()
  const isMounted = useMounted()
  const [tasks, setTasks] = React.useState<TaskResponse[]>([])
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const { settings } = useSettingsStore()

  React.useEffect(() => {
    const subscribe = async () => {
      const tasks = await TaskService.getTasks()
      setTasks(tasks)
    }
    if (showRightSidebar) subscribe()
  }, [signal, showRightSidebar])

  if (!isMounted) return null

  return (
    <aside
      className={cn(
        `relative h-screen border-l duration-300 hidden md:block flex-shrink-0 glassmorphism`,
        showRightSidebar ? 'w-0 lg:w-[300px]' : 'w-0',
      )}
    >
      <div className={cn('h-full', showRightSidebar ? '' : 'hidden md:block')}>
        <div className="h-full">
          <div className="h-12 border-b"></div>
          <div className="p-3 space-y-3">
            {settings.widgets.includes('calendar') && (
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                tasks={tasks}
                className="rounded-md bg-background-secondary border"
              />
            )}
            {settings.widgets.includes('timer') && <Timer />}
          </div>
        </div>
      </div>
    </aside>
  )
}
