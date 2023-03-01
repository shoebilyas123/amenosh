import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillMail, AiOutlineLoading, AiFillPhone } from 'react-icons/ai';
import useLoading from '~/hooks/useLoading';
import { IEmailPayload } from '~/interfaces/email';
import { sendEmail } from '~/lib/email';
import Button from '~/components/atoms/button';
import Card from '~/components/card';
import { ICommonProps } from '~/interfaces/common';
import { H1 } from '../atoms/headings';
import { useConfig } from '~/store';

const Contact: FC<ICommonProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEmailPayload>();
  const { config } = useConfig();
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
    <div className="flex w-screen border border-red-600 flex-col items-center justify-center">
      <div className="z-50 pt-8 flex flex-col items-center justify-center overflow-hidden">
        <h1 className="text-4xl text-center">We'd Love To Hear From You!</h1>
        <Card className="border-none shadow-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="sm:w-full flex flex-col space-y-4 w-full px-4 md:px-24 py-8 "
          >
            <div className="flex flex-col md:flex-row  space-y-4 md:space-x-4 md:space-y-0">
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

            <Card
              style={{
                background: config?.appSettings.colors.footerColor,
                color: ['#fff', '#ffffff'].some(
                  (clr) => config?.appSettings.colors.homeWavePrimary
                )
                  ? 'white'
                  : 'black',
                border: `4px solid ${config.appSettings.colors.homeWavePrimary}`,
              }}
              className="bg-slate-50 shadow-lg mb-8 p-4 mt-8 space-y-2"
            >
              <H1 className="text-lg font-bold">Contact Details</H1>
              <div className="flex flex-col items-start space-y-2">
                <p className="flex items-center space-x-2">
                  <AiFillMail /> <span>support@amenosh.com</span>
                </p>
                <p className="flex items-center space-x-2">
                  <AiFillPhone /> <span>+91-7037305039</span>
                </p>
                <H1 className="text-lg font-medium"> Address</H1>
                <p>
                  434/A, Paradise,Hasnain Lane, Ameer Nishan
                  East,Aligarh-202002, U.P., India
                </p>
              </div>
            </Card>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
