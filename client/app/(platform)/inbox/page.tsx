import * as React from 'react';

import { ExtendedSearchParamsOptions } from '@/lib/util/filter';

import PageWithViews from '@/components/page-with-views';

interface PageProps {
  searchParams: Partial<ExtendedSearchParamsOptions>;
}

export default function Inbox({ searchParams }: PageProps) {
  return (
    <PageWithViews
      searchParams={searchParams}
      content={{
        title: 'Inbox',
        list: { description: 'This is where your unsorted tasks reside.' },
      }}
      options={{ unsorted: true }}
    />
  );
}
