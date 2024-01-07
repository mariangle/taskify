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
      <ResizablePanel defaultSize={90}>{left}</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={5} minSize={0} maxSize={50}>
        {right}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
