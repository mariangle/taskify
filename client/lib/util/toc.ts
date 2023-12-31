import * as React from 'react';

interface ReactElementWithChildren<T = React.ReactNode>
  extends React.ReactElement {
  props: React.ReactElement['props'] & { children?: T | T[] };
}

export function convertElementToHtml<T = React.ReactNode>(
  reactElement: string | React.ReactElement | ReactElementWithChildren<T>[],
): string {
  if (typeof reactElement === 'string') {
    return reactElement;
  }

  if (Array.isArray(reactElement)) {
    return reactElement.map((child) => convertElementToHtml(child)).join('');
  }

  const { type, props } = reactElement as ReactElementWithChildren<T>;
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children]; // Ensure children is always an array

  if (typeof type === 'string') {
    const attributes = Object.keys(props)
      .filter((key) => key !== 'children')
      .map((key) => `${key}="${props[key]}"`)
      .join(' ');

    return `<${type}${attributes ? ` ${attributes}` : ''}>${children
      .map((child: string) => convertElementToHtml(child))
      .join('')}</${type}>`;
  }

  return children.map((child: string) => convertElementToHtml(child)).join('');
}

export function extractHeadings(htmlContent: string): string[] {
  const headingRegex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/g;
  const matches = htmlContent.match(headingRegex);

  if (!matches) {
    return [];
  }

  const headingsText = matches.map((match) => {
    const headingMatch = match.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/);
    return headingMatch ? headingMatch[1] : '';
  });

  return headingsText;
}
