import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { AiOutlineLoading } from 'react-icons/ai';

import Button from '~/components/atoms/button';
import Card from '~/components/card';
import EvenSection from '~/components/HomeSections/SectionEven';
import Input from '~/components/atoms/input';
import SmoothScroll from '~/components/Layout/SmoothScroll';
import Navbar from '~/components/Navbar';
import Footer from '~/components/section/footer';
import useToggler from '~/hooks/useToggler';
import { IEmailPayload } from '~/interfaces/email';
import axios from 'axios';
import useLoading from '~/hooks/useLoading';
import { sendEmail } from '~/lib/email';
import { H1 } from '~/components/atoms/headings';

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEmailPayload>();
  const { loading, startloading, stoploading } = useLoading();
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  let timeout: any = null;

  const onSubmit = async (data: IEmailPayload) => {
    try {
      startloading();
      const res = await sendEmail(data);
      reset();
      setSuccessMessage('Your message has been sent. Thank You!');
      stoploading();
    } catch (error) {
      setErrorMessage('Please try again later!');
      stoploading();
    }
  };

  useEffect(() => {
    if (!successMessage && !errorMessage) return;
    else {
      timeout = setTimeout(() => {
        setErrorMessage('');
        setSuccessMessage('');
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [successMessage]);

  return (
    <div className="w-[100vw] overflow-hidden">
      <Navbar textColor="LIGHT" isFixed={false} />
      <div className="w-[100%] pt-8 border flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center">We'd Love To Hear From You!</h1>
        <Card className="border-none shadow-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="sm:w-full flex flex-col space-y-4 w-full px-4 md:px-24 py-8 "
          >
            <div className="flex flex-col md:flex-row  space-y-4 md:space-x-4">
              <div className="flex flex-col items-left">
                <label>First Name</label>
                <input
                  placeholder="Enter First Name..."
                  {...register('firstName')}
                  className="border px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
                />
              </div>

              <div className="flex flex-col items-left">
                <label>Last Name</label>
                <input
                  placeholder="Enter Last Name..."
                  {...register('lastName')}
                  className="border px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
                />
              </div>
            </div>

            <div className="w-full">
              <label>Email</label>
              <input
                required={true}
                placeholder="Enter Your Email..."
                {...register('email')}
                className="w-full border px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
              />
            </div>

            <div className="w-full">
              <textarea
                rows={12}
                required={true}
                style={{ resize: 'none' }}
                placeholder="Enter Your Message..."
                {...register('message')}
                className="w-full border px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
              />
            </div>
            {successMessage && (
              <div className="w-fit p-8 m-4 items-center justify-center flex border-2 bg-red-200 border-red-500">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="w-fit p-8 m-4 items-center justify-center flex border-2 bg-red-200 border-red-500">
                {errorMessage}
              </div>
            )}

            <Button type="submit" className="flex items-center justify-center">
              {loading && <AiOutlineLoading />}Send Message
            </Button>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
