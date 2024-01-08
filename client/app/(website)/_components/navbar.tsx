import Link from 'next/link';

import NavbarLink from './navbar-link';
import MobileNav from './mobile-nav';
import AuthNavigation from './auth-nav';
import ThemeSwitcher from './theme-switcher';

import { config } from '@/lib/config';
import { auth } from '@/lib/auth';

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky -px-0 inset-x-0 left-0 right-0 top-0 z-[99999] w-full h-14 flex items-center border-b bg-background/50 backdrop-blur-lg">
      <div className="px-6 py-2 max-w-screen-lg mx-auto flex justify-between items-center w-full">
        <div className="flex-1 flex-gap gap-6 justify-between">
          <Link href="/" aria-current="page" className="font-bold">
            Taskify
          </Link>
          <ul className="flex-gap gap-6 flex-1 hidden sm:flex">
            {config.marketing.links.map((link) => (
              <NavbarLink key={link.href} link={link} />
            ))}
          </ul>
        </div>
        <div className="flex-1 flex-gap-sm justify-end">
          <ThemeSwitcher />
          <div className="sm:hidden">
            <MobileNav isAuthenticated={!!session} />
          </div>
          <div className="hidden sm:block">
            <AuthNavigation isAuthenticated={!!session} />
          </div>
        </div>
      </div>
    </nav>
  );
}
