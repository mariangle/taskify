import TaskService from '@/services/task-service'
import LabelService from '@/services/label-service'
import ListService from '@/services/list-service'
import TaskItem from '@/components/shared/task/task-item'
import { LoadingBoardPage } from '@/components/ui/loading'

import WeekNavigation from './_components/week-navigation'

import { startOfWeek, addWeeks, format, getDay, addDays, startOfMonth, isToday, isTomorrow } from 'date-fns'
import { TaskResponse } from '@/types'
import React from 'react'

interface UpcomingPageProps {
  searchParams: {
    offset: number
  }
}

export default async function UpcomingPage({ searchParams }: UpcomingPageProps) {
  const offset = searchParams.offset ?? 0
  const currentDayOfWeek = getDay(new Date())
  const startOfSelectedWeek = startOfWeek(new Date(), { weekStartsOn: currentDayOfWeek })
  const startDate = addWeeks(startOfSelectedWeek, offset)
  const currentMonth = format(startOfMonth(startDate), 'MMMM yyyy')

  const days = await Promise.all(
    Array.from({ length: 7 }, async (_, index) => {
      const day = addDays(startDate, index)
      const formattedDate = format(day, 'dd-MM-yyyy')

      const tasks = await TaskService.getTasks({ dueDate: formattedDate })

      return { day, formattedDate, tasks }
    }),
  )

  const labels = await LabelService.getLabels()
  const lists = await ListService.getLists()

  return (
    <div className="space-y-4 w-full">
      <div className="flex-gap">
        <h1 className="font-bold text-lg">{currentMonth}</h1>
        <WeekNavigation />
      </div>
      <div className="flex gap-4 sm:max-w-xs">
        <React.Suspense fallback="LOADING">
          {days.map((dayData, index) => (
            <div key={index} className="min-w-[250px] space-y-4">
              <ColumnHeader dayData={dayData} />
              <div className="space-y-2">
                {dayData.tasks.map((task) => (
                  <TaskItem key={task.id} task={task} labels={labels} lists={lists} type="board" />
                ))}
                <TaskItem lists={lists} labels={labels} date={dayData.formattedDate} />
              </div>
            </div>
          ))}
        </React.Suspense>
      </div>
    </div>
  )
}
const ColumnHeader = ({
  dayData,
}: {
  dayData: {
    day: Date
    formattedDate: string
    tasks: TaskResponse[]
  }
}) => {
  const getDisplayDate = (day: Date): string => {
    if (isToday(day)) {
      return 'Today'
    } else if (isTomorrow(day)) {
      return 'Tomorrow'
    } else {
      return format(day, 'EEEE')
    }
  }

  return (
    <div id={dayData.formattedDate}>
      <h3 className="text-sm font-bold">
        {getDisplayDate(dayData.day)}
        <span className="text-xs text-muted-foreground font-normal ml-2">{format(dayData.day, 'dd MMM')}</span>
      </h3>
    </div>
  )
}
