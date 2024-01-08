'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/util/tw-merge';

interface NavbarLinkProps {
  link: {
    title: string;
    href: string;
  };
  onClose?: () => void;
}

export default function NavbarLink({ link, onClose }: NavbarLinkProps) {
  const path = usePathname();
  const isActive =
    path === link.href ||
    (link.href === '/docs/getting-started' && path.includes('docs'));

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
    <li role="button" key={link.href} className="list-none" onClick={onClose}>
      <Link
        href={link.href}
        aria-current="page"
        className={cn(
          'text-sm text-muted-foreground hover:text-foreground font-medium',
          isActive && 'text-foreground',
        )}
      >
        {link.title}
      </Link>
    </li>
  );
}
