import { redirect } from 'next/navigation';
import { startOfDay, addDays, parseISO } from 'date-fns';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { LOGIN_PATH } from '@/routes';
import { SearchParamsOptions } from '@/lib/util/filter';

export const getTasks = async (options?: SearchParamsOptions) => {
  const session = await auth();

  if (!session || !session.user) {
    redirect(LOGIN_PATH);
  }

  const today = startOfDay(new Date());
  const tomorrow = startOfDay(addDays(new Date(), 1));

  let dueDateRange;

  if (options?.today) {
    dueDateRange = {
      gte: today.toISOString(),
      lt: tomorrow.toISOString(),
    };
  } else if (options?.dueDate) {
    const customDate = startOfDay(parseISO(options.dueDate));
    dueDateRange = {
      gte: customDate.toISOString(),
      lt: startOfDay(addDays(customDate, 1)).toISOString(),
    };
  }

  const tasks = await db.task.findMany({
    where: {
      userId: session.user?.id,
      listId: options?.listId ?? null,
      dueDate: dueDateRange,
    },
    include: {
      subtasks: true,
      labels: true,
    },
  });

  return tasks;
};
