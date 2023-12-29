import { Skeleton } from '@/components/ui/skeleton'
import { Icons } from '@/components/shared/icons'
import { BoardContainer } from '@/components/ui/container'
import { PageList } from '@/components/ui/page'
import { cn } from '@/lib/util/cn'

export function LoadingListPage() {
  return (
    <PageList>
      <div className="flex-gap">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="h-8 w-[100px]" />
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
  )
}

export function LoadingBoardPage({ columns = 3 }: { columns?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex-gap">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="h-8 w-[100px]" />
      </div>
      <div className={cn('flex gap-4 overflow-x-hidden')}>
        {new Array(columns).fill(null).map((_, index) => (
          <div key={index} className="col-span-1 space-y-4 min-w-[250px]">
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
  )
}

export function LoadingScreen() {
  const loadingMessages = [
    'Getting Your Tasks Ready...',
    "Organizing Your To-Do's...",
    'Preparing Your Task Game...',
    'Loading Your Daily Plan...',
    'Celebrating Completed Tasks...',
    'Syncing Tasks with Ease...',
  ]

  const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)]

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-opacity-75 z-50">
      <div className="flex-center flex-col space-y-2">
        <Icons.spinner className="animate-spin h-8 w-8" />
        <span className="text-foreground text-lg font-bold">Hang tight!</span>
        <span className="text-muted-foreground">{randomMessage}</span>
      </div>
    </div>
  )
}
