import * as React from 'react';

import Sidebar from './_components/sidebar';

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-4 min-h-screen py-12">
      <Sidebar />
      {children}
    </div>
  );
}
