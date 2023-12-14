import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { authenticate } from '@/lib/_actions/authenticate'
import { config } from '@/lib/config'

export default async function Navbar() {
  const isAuthenticated = await authenticate()

  return (
    <div className="max-w-screen-xl mx-auto p-4 sticky top-0 flex justify-between items-center">
      <Link href="/" aria-current="page" className="font-bold text-inherit flex-gap">
        .taskify
      </Link>
      <ul className="flex gap-4">
        {config.marketing.links.map((link) => (
          <li key={link.label}>{link.label}</li>
        ))}
      </ul>
      <AuthNavigation isAuthenticated={isAuthenticated} />
    </div>
  )
}

function AuthNavigation({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div className="flex gap-4">
      {isAuthenticated ? (
        <div>
          <Link href="/dashboard" className={buttonVariants({ variant: 'outline' })}>
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
