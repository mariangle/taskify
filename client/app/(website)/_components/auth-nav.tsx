import Link from 'next/link';

import { Icons } from '@/components/ui/icons';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/util/tw-merge';

export default function AuthNavigation({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <div className="flex-gap justify-end">
      {isAuthenticated ? (
        <Link
          href="/inbox"
          className={cn(
            buttonVariants({ variant: 'default', size: 'sm' }),
            'rounded-full px-4 h-8',
          )}
        >
          App
          <Icons.ChevronRight className="ml-1 w-4 h-4" />
        </Link>
      ) : (
        <>
          <Link
            href="/auth/login"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'rounded-full px-4 h-8 hidden sm:flex',
            )}
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'rounded-full px-4 h-8',
            )}
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}
