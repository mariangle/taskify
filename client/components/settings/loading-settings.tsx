import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/seperator'

export default function LoadingSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="space-y-4">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-8 w-[250px]" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-8 w-[250px]" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-8 w-[250px]" />
        </div>
      </div>
      <div className="mt-8">
        <Skeleton className="h-8 w-[100px]" />
      </div>
    </div>
  )
}
