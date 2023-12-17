import Sidebar from './_components/sidebar'
import Navbar from './_components/navbar'

import ListService from '@/services/list-service'
import TaskService from '@/services/task-service'

import { authenticate } from '@/lib/_actions/authenticate'
import { redirect } from 'next/navigation'

interface PageProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default async function Layout(props: PageProps) {
  const isAuthenticated = await authenticate()

  if (!isAuthenticated) redirect('/login')

  const [tasks, lists] = await Promise.all([TaskService.getTasks(), ListService.getLists()])

  return (
    <div className="flex h-screen overflow-y-hidden">
      <Sidebar lists={lists} />
      <div className="flex flex-col flex-1 bg-zinc-100 dark:bg-background overflow-y-hidden">
        <Navbar tasks={tasks} lists={lists} />
        <div className="overflow-y-auto h-full p-4">
          {props.children}
          {props.modal}
        </div>
      </div>
    </div>
  )
}
