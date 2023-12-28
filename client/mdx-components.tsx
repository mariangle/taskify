import type { MDXComponents } from 'mdx/types'
import { kebabCase } from 'lodash'

function h3({ children }: { children: React.ReactNode }) {
  return <h3 id={kebabCase(String(children))}>{children}</h3>
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h3,
    ...components,
  }
}
/*
import type { MDXComponents } from 'mdx/types'

function toKebabCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove non-word characters (except -)
    .replace(/--+/g, '-') // Replace multiple - with single -
}

export function useMDXComponents(): MDXComponents {
  return {
    h1: (props) => <h1 id={toKebabCase(String(props.children))}>{props.children}</h1>,
    h2: (props) => <h2 id={toKebabCase(String(props.children))}>{props.children}</h2>,
    h3: (props) => <h3 id={toKebabCase(String(props.children))}>{props.children}</h3>,
    h4: (props) => <h4 id={toKebabCase(String(props.children))}>{props.children}</h4>,
    h5: (props) => <h5 id={toKebabCase(String(props.children))}>{props.children}</h5>,
    // Add other custom components here
  }
}*/
