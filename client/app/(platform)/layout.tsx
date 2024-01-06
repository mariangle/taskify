import * as React from 'react';

import { SessionProvider } from 'next-auth/react';
import LeftSidebar from './_components/left-sidebar';
import RightSidebar from './_components/right-sidebar';
import Navbar from './_components/navbar';
import { LoadingScreen } from '@/components/ui/loading';

import OverlayProvider from '@/components/providers/overlay-provider';
import { auth } from '@/lib/auth';
import { getLists } from '@/actions/get-lists';

interface PageProps {
  children: React.ReactNode;
}

export default async function Layout(props: PageProps) {
  const session = await auth();
  const lists = await getLists();

  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <SessionProvider session={session}>
        <OverlayProvider />
        <div className="flex h-screen overflow-y-hidden overflow-x-hidden">
          <LeftSidebar lists={lists} />
          <div className="flex flex-col flex-1 overflow-y-hidden bg-background">
            <Navbar lists={lists} />
            <div className="overflow-y-auto overflow-x-auto h-full py-8 px-4 md:p-16 ">
              {props.children}
            </div>
          </div>
          <RightSidebar />
        </div>
      </SessionProvider>
    </React.Suspense>
  );
}
