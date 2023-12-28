import { Skeleton } from '@/components/ui/skeleton'
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
      <div className="space-y-5 mt-4">
        <div className="flex-gap">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
        <div className="flex-gap">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[175px]" />
        </div>
        <div className="flex-gap">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
        <div className="flex-gap">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div className="flex-gap">
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
          <div key={index} className="col-span-1 space-y-4">
            <Skeleton className="h-4 w-[100px]" />
            <div className="space-y-5">
              <BoardContainer className="flex-gap p-4 min-w-[250px]">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[150px]" />
              </BoardContainer>
              <BoardContainer className="flex-gap p-4 min-w-[250px]">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[150px] min-w-[250px]" />
              </BoardContainer>
              <BoardContainer className="flex-gap p-4 min-w-[250px]">
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
