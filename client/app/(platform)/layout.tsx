import * as React from 'react';

import { SessionProvider } from 'next-auth/react';
import LeftSidebar from './_components/left-sidebar';
import RightSidebar from './_components/right-sidebar';
import Navbar from './_components/navbar';
import { LoadingScreen } from '@/components/ui/loading';
import ResizableLayout from '@/components/resizable-layout';

import OverlayProvider from '@/components/providers/overlay-provider';

interface PageProps {
  children: React.ReactNode;
}

export default async function Layout(props: PageProps) {
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <SessionProvider session={null}>
        <OverlayProvider />
        <div className="flex h-screen overflow-y-hidden overflow-x-hidden">
          <LeftSidebar />
          <div className="flex flex-col flex-1 overflow-y-hidden bg-background">
            <ResizableLayout
              left={
                <>
                  <Navbar />
                  <div className="overflow-y-auto overflow-x-auto h-full py-8 px-4 md:p-16 ">
                    {props.children}
                  </div>
                </>
              }
              right={<RightSidebar />}
            />
          </div>
        </div>
      </SessionProvider>
    </React.Suspense>
  );
}
