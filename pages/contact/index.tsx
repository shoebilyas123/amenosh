import React from 'react';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import Button from '~/components/atoms/button';
import Card from '~/components/card';
import EvenSection from '~/components/HomeSections/SectionEven';
import Input from '~/components/atoms/input';
import SmoothScroll from '~/components/Layout/SmoothScroll';
import Navbar from '~/components/Navbar';
import Footer from '~/components/section/footer';
import useToggler from '~/hooks/useToggler';
import { IEmailPayload } from '~/interfaces/email';

const ContactUs = () => {
  const isBigScreen = useMediaQuery({ query: `(min-width:1024px)` });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmailPayload>();
  const { open, close, isOpen } = useToggler();

  const onSubmit = (data: IEmailPayload) => {
    console.log(data);
  };

  return (
    <>
      <Navbar textColor="LIGHT" isFixed={true} />
      <SmoothScroll active={isBigScreen}>
        <>
          <EvenSection
            heading=""
            showBG={false}
            background=""
            fallbackColor="#fff"
            content={
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl">We'd Love To Hear From You!</h1>
                <Card className="border-none shadow-lg">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4 w-full px-24 py-8 "
                  >
                    <div className="flex flex-row space-x-4">
                      <div className="flex flex-col items-left">
                        <label>First Name</label>
                        <input
                          placeholder="Enter First Name..."
                          {...register('firstName')}
                          className="border px-4 py-2 outline-none focus:border-rose-800 placeholder:text-zinc-500"
                        />
                      </div>

                      <div className="flex flex-col items-left">
                        <label>Last Name</label>
                        <input
                          placeholder="Enter Last Name..."
                          {...register('lastName')}
                          className="border px-4 py-2 outline-none focus:border-rose-800 placeholder:text-zinc-500"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label>Email</label>
                      <input
                        placeholder="Enter Your Email..."
                        {...(register('email'), { required: true })}
                        className="w-full border px-4 py-2 outline-none focus:border-rose-800 placeholder:text-zinc-500"
                      />
                    </div>

                    <div className="w-full">
                      <textarea
                        rows={12}
                        style={{ resize: 'none' }}
                        placeholder="Enter Your Message..."
                        {...(register('message'), { required: true })}
                        className="w-full border px-4 py-2 outline-none focus:border-rose-800 placeholder:text-zinc-500"
                      />
                    </div>

                    {/* <Input
                      {...(register('firstName'), { required: true })}
                      label="First Name"
                    />

                    <Input
                      label="Last Name"
                      {...(register('lastName'), { required: true })}
                    /> */}
                    <Button type="submit">Send Message</Button>
                  </form>
                </Card>
              </div>
            }
          />
        </>
      </SmoothScroll>
      <Footer />
    </>
  );
};

export default ContactUs;
