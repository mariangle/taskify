import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <div className="flex-gap">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="h-8 w-[100px]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-5 mt-4">
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
      </CardContent>
    </Card>
  )
}
