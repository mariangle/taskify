import { Icons } from '@/components/icons'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SideNav } from './side-nav'
import { Button } from '@/components/ui/button'
import { useMounted } from '@/hooks/use-mounted'

export const MobileSidebar = () => {
  const isMounted = useMounted()

  if (!isMounted) return null

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'}>
          <Icons.menu className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] p-0 overflow-y-auto overflow-x-hidden">
        <SideNav />
      </SheetContent>
    </Sheet>
  )
}
