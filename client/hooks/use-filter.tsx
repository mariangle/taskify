import * as React from 'react';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  queryParamsMapping,
  ExtendedSearchParamsOptions,
  FilterOption,
} from '@/lib/util/filter';

export const useFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const offset = parseInt(searchParams.get('offset') ?? '0', 10);
  const view =
    (searchParams.get('view') as ExtendedSearchParamsOptions['view']) ?? 'list';
  const completed = searchParams.get('completed') ?? false;
  const labelId = searchParams.get('labelId');

  const createQueryString = (
    name: FilterOption,
    value: string | 'prev' | 'next',
  ) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'prev' || value === 'next') {
      const newOffset = value === 'prev' ? offset - 1 : offset + 1;
      params.set(name, (newOffset ?? 0).toString());
    } else {
      params.set(name, value);
    }

    const newQueryString = params.toString();
    router.push(`${pathname}?${newQueryString}`);
  };

  const removeQueryString = (name?: FilterOption) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!name) {
      Object.keys(queryParamsMapping).forEach((param) => params.delete(param));
    } else {
      params.delete(name);
    }
    const newQueryString = params.toString();
    router.push(`${pathname}?${newQueryString}`);
  };

  const persistQueryString = React.useCallback(() => {
    const params = new URLSearchParams(searchParams);

    return params.toString();
  }, [searchParams]);

  return {
    createQueryString,
    removeQueryString,
    persistQueryString,
    searchParams,
    pathname,
    view,
    offset,
    completed,
    labelId,
  };
};
