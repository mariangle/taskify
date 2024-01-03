import Link from 'next/link';

import NavbarLink from './navbar-link';
import { MobileNav } from './mobile-nav';
import { Icons } from '@/components/ui/icons';

import { buttonVariants } from '@/components/ui/button';
import { authenticate } from '@/lib/_actions/authenticate';
import { cn } from '@/lib/util/tw-merge';
import { config } from '@/lib/config';

function AuthNavigation({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div className="flex-gap flex-1 justify-end">
      {isAuthenticated ? (
        <div>
          <Link
            href="/inbox"
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'shadow-md shadow-primary/50 rounded-full',
            )}
          >
            App
            <Icons.ChevronRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden sm:flex">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'rounded-full',
              )}
            >
              Login
            </Link>
          </div>
          <div>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
                'shadow-md shadow-primary/50 rounded-full',
              )}
            >
              Try for free
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default async function Navbar() {
  const { isAuthenticated } = await authenticate();

  return (
    <nav className="sticky inset-x-0 top-0 z-30 w-full transition-all border-b bg-background/50 backdrop-blur-lg">
      <div className="px-6 py-2 max-w-screen-lg mx-auto flex justify-between items-center">
        <div className="flex-1 flex-gap">
          <Link href="/" aria-current="page" className="font-bold">
            .taskify
          </Link>
          <MobileNav />
        </div>
        <ul className="flex-gap gap-6 flex-1 flex-center hidden md:flex">
          {config.marketing.links.map((link) => (
            <NavbarLink key={link.href} link={link} />
          ))}
        </ul>
        <AuthNavigation isAuthenticated={isAuthenticated} />
      </div>
    </nav>
  );
}
