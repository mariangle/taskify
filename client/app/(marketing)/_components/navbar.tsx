import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import NavigationMenu from './navigation-menu'
import { authenticate } from '@/lib/_actions/authenticate'
import { config } from '@/lib/config'

export default async function Navbar() {
  const isAuthenticated = await authenticate()

  return (
    <nav className="sticky top-0 bg-white z-50 backdrop-blur-md border-b">
      <div className="px-2 py-2 max-w-screen-lg mx-auto flex justify-between items-center">
        <Link href="/" aria-current="page" className="font-bold text-inherit flex-gap flex-1">
          .taskify
        </Link>
        <NavigationMenu />
        <AuthNavigation isAuthenticated={isAuthenticated} />
      </div>
    </nav>
  )
}

function AuthNavigation({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div className="flex-gap flex-1 justify-end">
      {isAuthenticated ? (
        <div>
          <Link href="/inbox" className={buttonVariants({ variant: 'outline' })}>
            Dashboard
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden sm:flex">
            <Link href="/login" className={buttonVariants({ variant: 'outline' })}>
              Login
            </Link>
          </div>
          <div>
            <Link href="/register" className={buttonVariants({ variant: 'default' })}>
              Sign Up
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
