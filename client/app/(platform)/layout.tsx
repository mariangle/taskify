import * as React from 'react';

import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';

import LeftSidebar from './_components/left-sidebar';
import Navbar from './_components/navbar';

import LoadingScreen from '@/components/ui/loading';
import OverlayProvider from '@/components/providers/overlay-provider';

interface PageProps {
  children: React.ReactNode;
}

export default async function Layout(props: PageProps) {
  const session = await auth();

  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <SessionProvider session={session}>
        <OverlayProvider />
        <div className="flex h-screen overflow-y-hidden overflow-x-hidden">
          <LeftSidebar />
          <div className="flex flex-col flex-1 overflow-y-hidden bg-background">
            <Navbar />
            <div className="overflow-y-auto overflow-x-auto h-full p-6">
              {props.children}
            </div>
          </div>
        </div>
      </SessionProvider>
    </React.Suspense>
  );
}
