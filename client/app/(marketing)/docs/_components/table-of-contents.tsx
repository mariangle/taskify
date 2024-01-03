'use client';

import * as React from 'react';
import Link from 'next/link';
import { kebabCase } from 'lodash';
import { cn } from '@/lib/util/tw-merge';

export default function TableOfContents() {
  const [headings, setHeadings] = React.useState<string[]>([]);
  const [activeHeading, setActiveHeading] = React.useState<string | null>();

  React.useEffect(() => {
    const h3Elements = document.querySelectorAll('h3');
    const h3TextArray = Array.from(h3Elements).map(
      (element) => element.textContent || '',
    );

    setHeadings(h3TextArray);

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const headingTarget = entry.target.textContent;
          setActiveHeading(headingTarget);
        }
      });
    }, options);

    h3Elements.forEach((h3) => {
      observer.observe(h3);
    });

    return () => {
      h3Elements.forEach((h3) => {
        observer.unobserve(h3);
      });
    };
  }, []);

  return (
    <div className="md:top-20 md:sticky md:self-start md:w-72 hidden lg:block md:max-h-screen overflow-y-auto">
      <div className="text-sm font-semibold">On this page</div>
      <ul className="text-sm mt-2 space-y-2">
        {headings.map((heading) => (
          <li key={heading}>
            <Link
              href={`#${kebabCase(heading)}`}
              className={cn(
                'text-muted-foreground hover:text-foreground',
                activeHeading === heading && 'text-purple-500',
              )}
            >
              {heading}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
