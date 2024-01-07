'use client';

import * as React from 'react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export default function ResizablePage({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20}>{left}</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel collapsedSize={80}>{right}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
