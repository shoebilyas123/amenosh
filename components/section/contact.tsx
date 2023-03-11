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
import { BsFillTelephoneFill } from 'react-icons/bs';

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
      if (!data.message) setErrorMessage('Please Enter Your Message.');
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

  const {
    contentControls: { address, email, phone },
  } = config;

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

  const Select = React.forwardRef(
    ({ onChange, onBlur, name, label, className, options }: any, ref: any) => (
      <>
        <label>{label}</label>
        <select
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          className={className}
        >
          {options.map((opt: string) => (
            <option value={opt}>{opt}</option>
          ))}
        </select>
      </>
    )
  );

  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <div className="z-50 pt-8 flex flex-col items-center justify-center overflow-hidden">
        <h1 className="text-4xl text-center">We'd Love To Hear From You!</h1>
        <Card className="border-none shadow-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="sm:w-full flex flex-col items-start justify-center space-y-4 w-full px-4 md:px-24 py-8 "
          >
            <div className="flex flex-col w-full md:flex-row space-y-4 md:space-x-4 md:space-y-0">
              <div className="flex flex-col items-left">
                <label>First Name *</label>
                <input
                  placeholder="Enter First Name..."
                  required={true}
                  {...register('firstName')}
                  className="border px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
                />
              </div>

              <div className="flex flex-col items-left">
                <label>Last Name </label>
                <input
                  placeholder="Enter Last Name..."
                  {...register('lastName')}
                  className="border px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
                />
              </div>
            </div>

            <div className="w-full">
              <Select
                {...register('usertype')}
                className="w-full border px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
                options={[
                  'Wholesaler',
                  'Distributer',
                  'Retailer',
                  'Customer',
                  'Other',
                ]}
                label={'You Are A? *'}
              />
            </div>

            <div className="w-full">
              <label>Phone Number *</label>
              <input
                placeholder="Enter Phone Number..."
                type="tel"
                {...register('phoneNumber')}
                className="w-full border px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
              />
            </div>

            <div className="w-full">
              <label>Address *</label>
              <input
                required={true}
                placeholder="Enter Your Address..."
                {...register('address')}
                className="w-full border px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
              />
            </div>

            <div className="w-full">
              <label>City *</label>
              <input
                placeholder="Enter City..."
                {...register('city')}
                className="w-full border px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
              />
            </div>

            <div className="w-full">
              <label>Postal Code *</label>
              <input
                required={true}
                placeholder="Enter Your Postal Code..."
                {...register('postalCode')}
                className="w-full border px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
              />
            </div>

            <div className="w-full">
              <label>Email *</label>
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
              <div className="w-fit p-8 m-4 items-center justify-center flex border-2 bg-green-200 border-green-500">
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

            {/* <Card
              style={{
                border: `4px solid ${config.appSettings.colors.bannerColor}`,
              }}
              className="w-[100%] bg-slate-50 text-neutral-800 shadow-lg mb-8 p-4 mt-8 space-y-2"
            >
              <H1 className="text-lg font-bold">Contact Details</H1>
              <div className="flex flex-col items-start space-y-2">
                <p className="flex items-center space-x-2">
                  <AiFillMail /> <span>{email}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <BsFillTelephoneFill /> <span>{phone}</span>
                </p>
                <H1 className="text-lg font-medium"> Address</H1>
                <p>
                  {address.split('\n').map((str: string) => (
                    <p>{str}</p>
                  ))}
                </p>
              </div>
            </Card> */}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
