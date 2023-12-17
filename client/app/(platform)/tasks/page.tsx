import { Card, CardHeader } from '@/components/ui/card'

import TaskService from '@/services/task-service'
import TaskForm from '../lists/_components/task-form'
import TaskFilter from './_components/task-filter'
import * as React from 'react'
import LabelService from '@/services/label-service'
import ListService from '@/services/list-service'
import { Skeleton } from '@/components/ui/skeleton'

import { MyDrawer } from '@/components/drawer'

interface TasksPageProps {
  searchParams: { [key: string]: string | boolean }
}

async function TasksPage({ searchParams }: TasksPageProps) {
  const tasks = await TaskService.getTasks({ ...searchParams })
  const labels = await LabelService.getLabels()
  const lists = await ListService.getLists()

  const LoadingSkeleton = () => {
    return Array.from({ length: 3 }, (_, index) => (
      <Card key={index}>
        <CardHeader className="p-4">
          <div className="flex-gap">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </CardHeader>
      </Card>
    ))
  }

  return (
    <div className="space-y-2">
      <React.Suspense fallback={<Skeleton className="h-8 w-[250px]" />}>
        <TaskFilter labels={labels} />
      </React.Suspense>
      <MyDrawer />

      <div className="space-y-2">
        <React.Suspense fallback={<LoadingSkeleton />}>
          <Card>
            <CardHeader className="p-0 px-4">
              <TaskForm labels={labels} lists={lists} />
            </CardHeader>
          </Card>
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardHeader className="p-0 px-4">
                <TaskForm task={task} labels={labels} lists={lists} />
              </CardHeader>
            </Card>
          ))}
        </React.Suspense>
      </div>
    </div>
  )
}

export default TasksPage
