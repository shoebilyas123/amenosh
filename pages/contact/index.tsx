import React, { FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { AiOutlineLoading } from 'react-icons/ai';

import Button from '~/components/atoms/button';
import Card from '~/components/card';
import EvenSection from '~/components/HomeSections/SectionEven';
import Input from '~/components/atoms/input';
import Navbar from '~/components/Navbar';
import Footer from '~/components/section/footer';
import useToggler from '~/hooks/useToggler';
import { IEmailPayload } from '~/interfaces/email';
import axios from 'axios';
import useLoading from '~/hooks/useLoading';
import { sendEmail } from '~/lib/email';
import { H1 } from '~/components/atoms/headings';
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
