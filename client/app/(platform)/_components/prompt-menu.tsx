'use client';

import 'regenerator-runtime/runtime';
import * as React from 'react';

import { cn } from '@/lib/util/tw-merge';
import { Button } from '@/components/ui/button';
import { useLayoutStore } from '@/store/layout-store';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Icons } from '@/components/ui/icons';
import PromptForm from '@/components/prompt-form';

export default function PromptMenu({ ...props }) {
  const [open, setOpen] = React.useState(false);
  const { showLeftSidebar } = useLayoutStore();

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpen(true)}
        {...props}
        className={cn('', !showLeftSidebar && 'md:hidden')}
      >
        <Icons.Sparkles className="w-4 h-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <PromptForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
