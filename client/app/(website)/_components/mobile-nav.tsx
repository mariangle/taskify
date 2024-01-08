'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import AuthNavigation from './auth-nav';
import NavbarLink from './navbar-link';

import { useMounted } from '@/hooks/use-mounted';
import { config } from '@/lib/config';
import { cn } from '@/lib/util/tw-merge';
import { Separator } from '@/components/ui/seperator';

export default function MobileNav({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <Icons.Close className="w-4 h-4" />
          ) : (
            <Icons.Menu className="w-4 h-4" />
          )}
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        hideClose
        side="left"
        className={cn(
          'w-[275px] p-6 overflow-x-hidden bg-none glassmorphism top-14',
        )}
      >
        <div className="flex flex-col space-y-6 items-start">
          {config.marketing.links.map((link) => (
            <Link
              href={link.href}
              onClick={() => setIsOpen(false)}
              aria-current="page"
              className={cn(
                'text-muted-foreground hover:text-foreground font-medium',
              )}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <Separator className="my-6" />
        <AuthNavigation isAuthenticated={isAuthenticated} />
      </SheetContent>
    </Sheet>
  );
}
