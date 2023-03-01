import React, { FC } from 'react';

import Navbar from '~/components/Navbar';
import Footer from '~/components/section/footer';
import Contact from '~/components/section/contact';
import { ICommonProps } from '~/interfaces/common';

const ContactUs: FC<ICommonProps> = ({ config }) => {
  return (
    <div className="w-screen overflow-hidden">
      <Navbar config={config} textColor="LIGHT" isFixed={false} />
      <img
        src={'/images/contactdoodle.png'}
        className={`fixed -left-48 -z-40 rotate-12`}
      />
      <Contact config={config} />
      <Footer config={config} />
    </div>
  );
};

export default ContactUs;
