'use server';

import * as React from 'react';

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
import { getLabels } from '@/actions/get-labels';
import { getLists } from '@/actions/get-lists';
import { getTasks } from '@/actions/get-tasks';

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
  const labels = await getLabels();
  const lists = await getLists();
  const tasks = await getTasks({
    listId: options?.listId,
    today: options?.today,
  });
  switch (searchParams.view) {
    case 'board':
      return (
        <PageBoard>
          <div className="space-y-2">
            <PageHeading
              color="bg-yellow-500"
              items={tasks}
              level="h3"
              className="text-md"
            >
              New
            </PageHeading>
            <TaskList
              tasks={tasks}
              lists={lists}
              labels={labels}
              type="board"
            />
          </div>
          <div className="space-y-2">
            <PageHeading
              color="bg-sky-500"
              items={tasks}
              level="h3"
              className="text-md"
            >
              In Progress
            </PageHeading>
            <TaskList
              tasks={tasks}
              lists={lists}
              labels={labels}
              type="board"
              expandable={false}
            />
          </div>
          <div className="space-y-2">
            <PageHeading
              color="bg-emerald-500"
              items={tasks}
              level="h3"
              className="text-md"
            >
              Completed
            </PageHeading>
            <TaskList
              tasks={tasks}
              lists={lists}
              labels={labels}
              type="board"
              expandable={false}
            />
          </div>
        </PageBoard>
      );
    case 'table':
      return (
        <PageTable>
          <PageHeading>{content.title}</PageHeading>
          <div className="space-y-1">
            <DataTable
              title="New"
              color="bg-yellow-500"
              columns={columns}
              data={tasks}
            />
            <DataTable
              title="In Progress"
              color="bg-sky-500"
              columns={columns}
              data={tasks}
            />
            <DataTable
              title="Done"
              color="bg-emerald-500"
              columns={columns}
              data={tasks}
            />
          </div>
        </PageTable>
      );
    default:
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
}
