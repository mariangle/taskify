import React from 'react'

import Sidebar from './_components/sidebar'
import Navbar from './_components/navbar'

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
    <React.Suspense fallback="LOADING...">
      <OverlayProvider />
      <div className="flex h-screen overflow-y-hidden overflow-x-hidden">
        <Sidebar lists={lists} />
        <div className="w-full overflow-y-hidden bg-background-secondary">
          <Navbar lists={lists} />
          <div className="overflow-y-auto overflow-x-auto h-full p-4 md:p-8">{props.children}</div>
        </div>
      </div>
    </React.Suspense>
  )
}
