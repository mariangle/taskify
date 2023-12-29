'use client'
import * as React from 'react'

import { Calendar } from '@/components/ui/calendar'
import { useLayoutStore } from '@/store/layout-store'
import { Timer } from '@/components/shared/timer'

import { cn } from '@/lib/util/cn'
import type { TaskResponse } from '@/types'
import { TaskService } from '@/services/task-service'
import { useSignal } from '@/hooks/use-signal'

export default function RightSidebar() {
  const { showRightSidebar } = useLayoutStore()
  const { signal } = useSignal()
  const [tasks, setTasks] = React.useState<TaskResponse[]>([])
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [timer, setTimer] = React.useState<number>(0)
  const [isRunning, setIsRunning] = React.useState<boolean>(false)

  React.useEffect(() => {
    const subscribe = async () => {
      const tasks = await TaskService.getTasks()
      setTasks(tasks)
    }
    if (showRightSidebar) subscribe()
  }, [signal, showRightSidebar])

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000) // Update the timer every second
    }

    return () => clearInterval(intervalId)
  }, [isRunning])

  const startTimer = () => {
    setIsRunning(true)
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setTimer(0)
  }
  React.useEffect(() => {
    const subscribe = async () => {
      const tasks = await TaskService.getTasks()
      setTasks(tasks)
    }
    if (showRightSidebar) subscribe()
  }, [signal, showRightSidebar])

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
          <div className="p-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              tasks={tasks}
              className="rounded-md bg-background-secondary border"
            />
            <Timer />
          </div>
        </div>
      </div>
    </aside>
  )
}
