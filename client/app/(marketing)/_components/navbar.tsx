import Link from 'next/link';

import NavbarLink from './navbar-link';
import MobileNav from './mobile-nav';
import AuthNavigation from './auth-nav';
import ThemeSwitcher from './theme-switcher';

import { authenticate } from '@/lib/_actions/authenticate';
import { config } from '@/lib/config';

export default async function Navbar() {
  const { isAuthenticated } = await authenticate();

  return (
    <nav className="sticky inset-x-0 top-0 z-[99999] w-full h-12 flex items-center border-b bg-background/50 backdrop-blur-lg">
      <div className="px-6 py-2 max-w-screen-lg mx-auto flex justify-between items-center w-full">
        <div className="flex-1 flex-gap gap-8 justify-between">
          <Link href="/" aria-current="page" className="font-bold">
            .taskify
          </Link>
          <ul className="flex-gap gap-6 flex-1 hidden sm:flex">
            {config.marketing.links.map((link) => (
              <NavbarLink key={link.href} link={link} />
            ))}
          </ul>
          <div className="sm:hidden">
            <ThemeSwitcher />
            <MobileNav isAuthenticated={isAuthenticated} />
          </div>
        </div>
        <div className="hidden sm:flex-gap flex-1 justify-end">
          <ThemeSwitcher />
          <AuthNavigation isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </nav>
  );
}
