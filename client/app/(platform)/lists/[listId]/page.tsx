import { ListService } from '@/services/list-service';
import { ExtendedSearchParamsOptions } from '@/lib/util/filter';

import PageWithViews from '@/components/page-with-views';

interface PageProps {
  params: { listId: string };
  searchParams: Partial<ExtendedSearchParamsOptions>;
}

export default async function List({ params, searchParams }: PageProps) {
  const list = await ListService.getList(params.listId);
  if (!list) return null;

  return (
    <PageWithViews
      searchParams={searchParams}
      content={{ title: list.name }}
      options={{ listId: list.id }}
    />
  );
}
