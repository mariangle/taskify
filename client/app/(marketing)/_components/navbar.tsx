import Link from 'next/link'

import ThemeSwitcher from './theme-switcher'
import NavbarLink from './navbar-link'

import { buttonVariants } from '@/components/ui/button'
import { authenticate } from '@/lib/_actions/authenticate'
import { cn } from '@/lib/util/cn'
import { config } from '@/lib/config'

export default async function Navbar() {
  const isAuthenticated = await authenticate()

  return (
    <nav className="sticky inset-x-0 top-0 z-30 w-full transition-all border-b bg-background/50 backdrop-blur-lg">
      <div className="px-2 py-2 max-w-screen-lg mx-auto flex justify-between items-center">
        <Link href="/" aria-current="page" className="font-bold flex-1">
          .taskify
        </Link>
        <ul className="flex-gap flex-1 flex-center">
          {config.marketing.links.map((link) => (
            <NavbarLink key={link.href} link={link} />
          ))}
        </ul>
        <div className="flex-gap flex-1 justify-end">
          <ThemeSwitcher />
          <AuthNavigation isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </nav>
  )
}

function AuthNavigation({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div className="flex-gap">
      {isAuthenticated ? (
        <div>
          <Link href="/inbox" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
            Dashboard
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden sm:flex">
            <Link href="/login" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              Login
            </Link>
          </div>
          <div>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
                'shadow-md shadow-black/50 dark:shadow-white/50',
              )}
            >
              Try for free
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
