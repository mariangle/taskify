import * as React from 'react';

import type { MDXComponents } from 'mdx/types';
import { kebabCase } from 'lodash';

function h3({ children }: { children: React.ReactNode }) {
  return <h3 id={kebabCase(String(children))}>{children}</h3>;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // @ts-expect-error
    h3,
    ...components,
  };
}
