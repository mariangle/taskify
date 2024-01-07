import * as React from 'react';
import _uniqueId from 'lodash/uniqueId';

import { Skeleton } from '@/components/ui/skeleton';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/seperator';
import { BoardContainer } from '@/components/ui/container';
import { PageList } from '@/components/ui/page';
import { cn } from '@/lib/util/tw-merge';

export function LoadingListPage() {
  return (
    <PageList>
      <div className="flex-gap">
        <Skeleton className="h-6 w-[80px]" />
        <Skeleton className="w-4 h-4" />
      </div>
      <div className="space-y-2 mt-4">
        <div className="flex-gap border-b pt-1 pb-3">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
        <div className="flex-gap border-b pt-1 pb-3">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[175px]" />
        </div>
        <div className="flex-gap border-b pt-1 pb-3">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
        <div className="flex-gap border-b pt-1 pb-3">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div className="flex-gap border-b pt-1 pb-3">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </PageList>
  );
}

export function LoadingBoardPage({ columns = 3 }: { columns?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex-gap">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="h-8 w-[100px]" />
      </div>
      <div className={cn('flex gap-4 overflow-x-hidden')}>
        {new Array(columns).fill(null).map(() => (
          <div
            key={_uniqueId('column_')}
            className="col-span-1 space-y-4 min-w-[250px]"
          >
            <Skeleton className="h-4 w-[100px]" />
            <div className="space-y-5">
              <BoardContainer className="flex-gap p-4">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[150px]" />
              </BoardContainer>
              <BoardContainer className="flex-gap p-4">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[150px]" />
              </BoardContainer>
              <BoardContainer className="flex-gap p-4">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[150px]" />
              </BoardContainer>
            </div>
            <div className="flex-gap">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LoadingScreen() {
  const loadingMessages = [
    'Getting Your Tasks Ready...',
    "Organizing Your To-Do's...",
    'Loading Your Daily Plan...',
    'Celebrating Completed Tasks...',
    'Syncing Tasks with Ease...',
  ];

  const randomMessage =
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-opacity-75 z-50">
      <div className="flex-center flex-col space-y-2">
        <Icons.Spinner className="animate-spin h-8 w-8" />
        <span className="text-foreground text-lg font-bold">Hang tight!</span>
        <span className="text-muted-foreground">{randomMessage}</span>
      </div>
    </div>
  );
}

export function LoadingSidebar() {
  return (
    <div className="px-3 pb-3 min-h-full flex flex-col justify-between">
      <div>
        <div className="flex-gap h-14">
          <Skeleton className="w-8 h-8 rounded-full bg-muted" />
          <Skeleton className="h-4 w-[100px] bg-muted" />
        </div>
        <div className="flex-gap">
          <Skeleton className="h-8 w-full bg-muted" />
          <Skeleton className="h-8 w-8 bg-muted" />
        </div>
        <div className="space-y-1 mt-4">
          <Skeleton className="flex-gap bg-accent h-10 p-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[50px]" />
          </Skeleton>
          <div className="flex-gap h-10 p-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[52px]" />
          </div>
          <div className="flex-gap h-10 p-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
          <div className="flex-gap h-10 p-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
          <Separator className="my-2" />
          <div className="flex-between p-2 pt-4 pb-2">
            <Skeleton className="h-3 w-[50px]" />
            <div className="flex-gap gap-3">
              <Skeleton className="h-3 w-3" />
              <Skeleton className="h-3 w-3" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex-gap px-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-[60px]" />
            </div>
            <div className="flex-gap px-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-[60px]" />
            </div>
          </div>
        </div>
      </div>
      <Skeleton className="h-10 w-full bg-muted" />
    </div>
  );
}
