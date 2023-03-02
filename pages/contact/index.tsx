import React, { FC } from 'react';

import Navbar from '~/components/Navbar';
import Footer from '~/components/section/footer';
import Contact from '~/components/section/contact';
import { ICommonProps } from '~/interfaces/common';
import { GetServerSideProps, NextPage } from 'next';

const ContactUs: NextPage<ICommonProps> = ({}) => {
  return (
    <div className="w-screen overflow-hidden">
      <Navbar textColor="LIGHT" isFixed={false} />
      <Contact />
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return { props: {} };
};

export default ContactUs;
