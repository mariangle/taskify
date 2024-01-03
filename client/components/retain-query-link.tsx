import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { useFilter } from '@/hooks/use-filter';

interface RetainQueryLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export default function RetainQueryLink({
  href,
  children,
  className,
  ...props
}: RetainQueryLinkProps) {
  const { persistQueryString } = useFilter();

  return (
    <Link
      href={`${href}?${persistQueryString()}`}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
