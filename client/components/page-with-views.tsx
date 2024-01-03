'use server';

import * as React from 'react';

import { TaskService } from '@/services/task-service';
import { ExtendedSearchParamsOptions } from '@/lib/util/filter';
import { TaskList } from './shared/task/task-list';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Separator } from '@/components/ui/seperator';
import {
  PageList,
  PageBoard,
  PageTable,
  PageHeading,
  PageDescription,
} from '@/components/ui/page';
import { LabelService } from '@/services/label-service';
import { ListService } from '@/services/list-service';

interface ViewContent {
  description: string;
}

interface PageWithViewsProps {
  searchParams: Partial<ExtendedSearchParamsOptions>;
  content: {
    title: string;
    list?: ViewContent;
    table?: ViewContent;
  };
  options?: Partial<ExtendedSearchParamsOptions>;
}

export default async function PageWithViews({
  searchParams,
  content,
  options,
}: PageWithViewsProps) {
  const labels = await LabelService.getLabels();
  const lists = await ListService.getLists();

  if (searchParams.view === 'board' || searchParams.view === 'table') {
    const incompleteTasks = await TaskService.getTasks({
      ...searchParams,
      incomplete: true,
      unsorted: options?.unsorted,
      listId: options?.listId,
      dueDate: options?.dueDate,
    });
    const pendingTasks = await TaskService.getTasks({
      ...searchParams,
      pending: true,
      unsorted: options?.unsorted,
      listId: options?.listId,
      dueDate: options?.dueDate,
    });
    const completedTasks = await TaskService.getTasks({
      ...searchParams,
      completed: true,
      unsorted: options?.unsorted,
      listId: options?.listId,
      dueDate: options?.dueDate,
    });

    if (searchParams.view === 'board') {
      return (
        <PageBoard>
          <div className="space-y-2">
            <PageHeading
              color="bg-yellow-500"
              items={incompleteTasks}
              level="h3"
              className="text-md"
            >
              New
            </PageHeading>
            <TaskList
              tasks={incompleteTasks}
              lists={lists}
              labels={labels}
              type="board"
            />
          </div>
          <div className="space-y-2">
            <PageHeading
              color="bg-sky-500"
              items={pendingTasks}
              level="h3"
              className="text-md"
            >
              In Progress
            </PageHeading>
            <TaskList
              tasks={pendingTasks}
              lists={lists}
              labels={labels}
              type="board"
              expandable={false}
            />
          </div>
          <div className="space-y-2">
            <PageHeading
              color="bg-emerald-500"
              items={completedTasks}
              level="h3"
              className="text-md"
            >
              Completed
            </PageHeading>
            <TaskList
              tasks={completedTasks}
              lists={lists}
              labels={labels}
              type="board"
              expandable={false}
            />
          </div>
        </PageBoard>
      );
    }

    if (searchParams.view === 'table') {
      return (
        <PageTable>
          <PageHeading>{content.title}</PageHeading>
          <div className="space-y-1">
            <DataTable
              title="New"
              color="bg-yellow-500"
              columns={columns}
              data={incompleteTasks}
            />
            <DataTable
              title="In Progress"
              color="bg-sky-500"
              columns={columns}
              data={pendingTasks}
            />
            <DataTable
              title="Done"
              color="bg-emerald-500"
              columns={columns}
              data={completedTasks}
            />
          </div>
        </PageTable>
      );
    }
  }

  const tasks = await TaskService.getTasks({
    unsorted: options?.unsorted,
    listId: options?.listId,
    dueDate: options?.dueDate,
    incomplete: !searchParams.completed ?? true, // only show incomplete tasks by default unless show completed tasks is on
    labelId: searchParams.labelId,
  });

  return (
    <PageList>
      <PageHeading items={tasks}>{content.title}</PageHeading>
      {content.list?.description && (
        <PageDescription>{content.list.description}</PageDescription>
      )}
      <Separator className="mt-4" />
      <TaskList tasks={tasks} lists={lists} labels={labels} />
    </PageList>
  );
}
