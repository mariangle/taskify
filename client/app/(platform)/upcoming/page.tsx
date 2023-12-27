import TaskService from '@/services/task-service'
import LabelService from '@/services/label-service'
import ListService from '@/services/list-service'

import WeekNavigation from './_components/week-navigation'
import CalendarColumn from './_components/calendar-column'

import { startOfWeek, addWeeks, format, getDay, addDays, startOfMonth, isToday, isTomorrow } from 'date-fns'

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
      const displayDate = getDisplayDate(day)

      // Fetch tasks specifically for this day
      const tasks = await TaskService.getTasks({ dueDate: formattedDate })

      return { day, formattedDate, displayDate, tasks }
    }),
  )

  const labels = await LabelService.getLabels()
  const lists = await ListService.getLists()

  return (
    <div className="space-y-4 w-full">
      <div className="flex-gap">
        <span className="font-bold text-lg ">{currentMonth}</span>
        <WeekNavigation />
      </div>
      <div className="flex gap-4 sm:max-w-xs">
        {days.map((dayData, index) => (
          <div key={index} className="min-w-[250px] space-y-4">
            <div id={dayData.formattedDate} className="text-sm">
              {dayData.displayDate}
            </div>
            <div className="">
              <CalendarColumn tasks={dayData.tasks} lists={lists} labels={labels} date={dayData.formattedDate} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getDisplayDate(day: Date): string {
  if (isToday(day)) {
    return 'Today - ' + format(day, 'dd MMM')
  } else if (isTomorrow(day)) {
    return 'Tomorrow - ' + format(day, 'dd MMM')
  } else {
    return format(day, 'EEEE - dd MMM') // Display day name and date for other days
  }
}
