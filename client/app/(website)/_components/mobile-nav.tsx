'use client';

import * as React from 'react';

import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import AuthNavigation from './auth-nav';
import NavbarLink from './navbar-link';

import { useMounted } from '@/hooks/use-mounted';
import { config } from '@/lib/config';
import { cn } from '@/lib/util/tw-merge';

export default function MobileNav({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="w-6 h-6 p-1 hover:bg-transparent"
      >
        <Icons.Menu className="w-4 h-4" />
      </Button>
      <div
        className={cn(
          'fixed left-0 top-14 w-full bg-background/80 flex justify-between',
          isOpen
            ? 'max-h-0 duration-300 transition-all border-b py-6'
            : 'max-h-0 duration-300 transition-all ',
        )}
      >
        <ul className={cn('flex-gap pl-6', isOpen ? 'flex' : 'hidden')}>
          {config.marketing.links.map((link) => (
            <NavbarLink key={link.href} link={link} />
          ))}
        </ul>
        <div className={cn('pr-6', isOpen ? 'flex' : 'hidden')}>
          <AuthNavigation isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </>
  );
}
