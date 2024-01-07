'use client';

import { usePathname } from 'next/navigation';
import { Icons } from '@/components/ui/icons';

export default function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter((segment) => segment !== '');

  const formatSegment = (segment: string): string => segment.replace(/-/g, ' ');

  return (
    <ul className="flex-gap-sm text-sm">
      {segments.map((segment, index) => (
        <li key={segment} className="flex-gap-sm">
          {formatSegment(segment)}
          {index !== segments.length - 1 && (
            <Icons.ChevronRight className="w-2 h-2" />
          )}
        </li>
      ))}
    </ul>
  );
}
