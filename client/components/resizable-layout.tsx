'use client';

import * as React from 'react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export default function ResizableLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={90} minSize={70}>
        {left}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={10} minSize={0} maxSize={30}>
        {right}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
