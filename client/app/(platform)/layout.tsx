import Sidebar from './_components/sidebar'
import Navbar from './_components/navbar'
import ListSidebar from './_components/list-sidebar'

import { authenticate } from '@/lib/_actions/authenticate'
import { redirect } from 'next/navigation'
import ListService from '@/services/list-service'

import OverlayProvider from '@/components/providers/overlay-provider'

interface PageProps {
  children: React.ReactNode
}

export default async function Layout(props: PageProps) {
  const isAuthenticated = await authenticate()

  if (!isAuthenticated) redirect('/login')

  const lists = await ListService.getLists()

  return (
    <>
      <OverlayProvider />
      <div className="flex h-screen overflow-y-hidden overflow-x-hidden">
        <Sidebar />
        <div className="flex w-full">
          <div className="hidden lg:block">
            <ListSidebar lists={lists} />
          </div>
          <div className="flex flex-col flex-1 overflow-y-hidden bg-neutral-50 dark:bg-neutral-900">
            <Navbar />
            <div className="overflow-y-auto h-full p-4">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
