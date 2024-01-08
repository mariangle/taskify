import { Icons } from '@/components/ui/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SideNav from './side-nav';
import { Button } from '@/components/ui/button';
import { useMounted } from '@/hooks/use-mounted';

export function MobileSidebar() {
  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Icons.Menu className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[250px] p-0 overflow-x-hidden bg-background "
      >
        <SideNav />
      </SheetContent>
    </Sheet>
  );
}
