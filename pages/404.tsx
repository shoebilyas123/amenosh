import Link from 'next/link';
import React from 'react';
import { H1 } from '~/components/atoms/headings';
import Navbar from '~/components/Navbar';
import { Footer } from '~/components/section';
import { useConfig } from '~/store';

const PageNotFound = () => {
  const { config } = useConfig();
  return (
    <>
      <Navbar />
      <div className="p-24 w-screen h-[80vh] flex flex-col items-center justify-center">
        <H1 className="font-bold text-6xl text-rose-900">404</H1>
        <p>Page Not Found</p>
        <Link href="/" className="mt-8">
          <p
            style={{
              color: config.appSettings.colors.secondary,
            }}
          >
            Go To Amenosh
          </p>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;
