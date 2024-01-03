'use client';

import Link from 'next/link';

import { Icons } from '@/components/ui/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavbarLink from './navbar-link';

import { Button } from '@/components/ui/button';
import { useMounted } from '@/hooks/use-mounted';
import { config } from '@/lib/config';

export function MobileNav() {
  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden">
          <Icons.Menu className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] p-4 overflow-x-hidden">
        <Link href="/" aria-current="page" className="font-bold text-lg">
          .taskify
        </Link>
        <ul className="space-y-2 mt-2">
          {config.marketing.links.map((link) => (
            <NavbarLink key={link.href} link={link} />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
