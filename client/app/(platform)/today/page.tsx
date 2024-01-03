import { format } from 'date-fns';

import { ExtendedSearchParamsOptions } from '@/lib/util/filter';

import PageWithViews from '@/components/page-with-views';

interface PageProps {
  searchParams: Partial<ExtendedSearchParamsOptions>;
}

export default async function Today({ searchParams }: PageProps) {
  return (
    <PageWithViews
      searchParams={searchParams}
      content={{
        title: 'Today',
        list: { description: 'Your tasks for today.' },
      }}
      options={{ dueDate: format(new Date(), 'dd-MM-yyyy') }}
    />
  );
}
