import React, { FC } from 'react';

import Navbar from '~/components/Navbar';
import Footer from '~/components/section/footer';
import Contact from '~/components/section/contact';
import { ICommonProps } from '~/interfaces/common';
import { NextPage } from 'next';

const ContactUs: NextPage<ICommonProps> = ({}) => {
  return (
    <div className="w-screen overflow-hidden">
      <Navbar textColor="LIGHT" isFixed={false} />
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactUs;
