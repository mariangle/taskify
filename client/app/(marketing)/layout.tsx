import * as React from 'react';

import Navbar from './_components/navbar';
import Footer from './_components/footer';

interface PageProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
  return (
    <div className="">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative opacity-20 left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-sky-400 dark:from-sky-900 to-purple-500 dark:to-purple-900 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        {children}
      </div>
      <Footer />
    </div>
  );
}
