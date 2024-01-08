import {
  startOfWeek,
  addWeeks,
  format,
  getDay,
  addDays,
  startOfMonth,
  isToday,
  isTomorrow,
} from 'date-fns';
import TaskItem from '@/components/task-item';
import FilterWeek from '@/components/filter-week';

import type { Task } from '@/types';
import { PageHeading } from '@/components/ui/page';
import { ExtendedSearchParamsOptions } from '@/lib/util/filter';
import { getLabels } from '@/actions/get-labels';
import { getLists } from '@/actions/get-lists';
import { getTasks } from '@/actions/get-tasks';

interface UpcomingPageProps {
  searchParams: Partial<ExtendedSearchParamsOptions>;
}

export default async function UpcomingPage({
  searchParams,
}: UpcomingPageProps) {
  const labels = await getLabels();
  const lists = await getLists();

  const offset = searchParams.offset ?? 0;
  const currentDayOfWeek = getDay(new Date());
  const startOfSelectedWeek = startOfWeek(new Date(), {
    weekStartsOn: currentDayOfWeek,
  });
  const startDate = addWeeks(startOfSelectedWeek, offset);
  const currentMonth = format(startOfMonth(startDate), 'MMMM yyyy');

  const days = await Promise.all(
    Array.from({ length: 7 }, async (_, index) => {
      const day = addDays(startDate, index);
      const formattedDate = format(day, 'yyyy-MM-dd');

      const tasks = await getTasks({
        ...searchParams,
        dueDate: formattedDate,
      });

      return { day, formattedDate, tasks };
    }),
  );

  function ColumnHeader({
    dayData,
  }: {
    dayData: {
      day: Date;
      formattedDate: string;
      tasks: Task[];
    };
  }) {
    const getDisplayDate = (day: Date): string => {
      if (isToday(day)) {
        return 'Today';
      }
      if (isTomorrow(day)) {
        return 'Tomorrow';
      }
      return format(day, 'EEEE');
    };

    return (
      <div id={dayData.formattedDate}>
        <h3 className="text-sm font-bold">
          {getDisplayDate(dayData.day)}
          <span className="text-xs text-muted-foreground font-normal ml-2">
            {format(dayData.day, 'dd MMM')}
          </span>
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex-gap">
        <PageHeading>{currentMonth}</PageHeading>
        <FilterWeek />
      </div>
      <div className="flex gap-4 sm:max-w-xs">
        {days.map((dayData) => (
          <div key={dayData.formattedDate} className="min-w-[250px] space-y-4">
            <ColumnHeader dayData={dayData} />
            <div className="space-y-2">
              {dayData.tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  labels={labels}
                  lists={lists}
                  type="board"
                />
              ))}
              <TaskItem
                lists={lists}
                labels={labels}
                date={dayData.formattedDate}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
