import React, {
  createRef,
  FC,
  ReactEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';

import useLoading from '~/hooks/useLoading';
import { IEmailPayload } from '~/interfaces/email';
import { sendEmail } from '~/lib/email';
import Button from '~/components/atoms/button';
import Card from '~/components/card';
import { ICommonProps } from '~/interfaces/common';
import { useConfig } from '~/store';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { checkIfStrinNumber } from '~/utils/string';
import FadeSlide from '../animations/FadeSlide';
import useContactData from './useContactData';
import Select from '../molecules/select';

const Contact: FC<ICommonProps> = ({}) => {
  const { config } = useConfig();

  const {
    contentControls: { address, email, phone },
  } = config;

  let {
    successMessage,
    errorMessage,
    setErrorMessage,
    setSuccessMessage,
    timeout,
    handleSubmit,
    onSubmit,
    register,
    inputFields,
    recaptchaRef,
    onReCAPTCHAChange,
    watch,
    loading,
  } = useContactData();

  useEffect(() => {
    if (!successMessage && !errorMessage) return;
    else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setErrorMessage('');
        setSuccessMessage('');
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [successMessage]);

  const styles = {
    inputClass:
      'focus:shadow-sm w-full border border-4 rounded-lg px-4 py-2 outline-none border-red-200 focus:border-red-500 placeholder:text-zinc-500 placeholder:rounded-lg',
  };

  return (
    <div
      className="flex w-screen flex-col  items-center justify-center"
      style={{
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative sm:border-2 sm:rounded-lg sm:border-red-300 sm:my-8 z-50 pt-8 flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-white sm:rounded-lg"
          style={{
            // background: 'rgba(252, 165, 165, 0.2)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            zIndex: -1,
          }}
        ></div>
        <h1 className="text-4xl text-center">We'd Love To Hear From You!</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative sm:w-fit flex flex-col items-start justify-center space-y-4 w-screen px-4 md:px-12 py-8"
        >
          <div className="flex flex-col w-full md:flex-row space-y-4 md:space-x-4 md:space-y-0">
            <FadeSlide
              slideOptions={{
                triggerOnce: true,
              }}
              fadeOptions={{
                triggerOnce: true,
              }}
            >
              <div className="flex flex-col items-left shadow-sm">
                <label>First Name *</label>
                <input
                  placeholder="Enter First Name..."
                  required={true}
                  {...register('firstName')}
                  className={styles.inputClass}
                />
              </div>
            </FadeSlide>
            <FadeSlide
              slideOptions={{
                triggerOnce: true,
              }}
              fadeOptions={{
                triggerOnce: true,
              }}
            >
              <div className="flex flex-col items-left shadow-sm">
                <label>Last Name </label>
                <input
                  placeholder="Enter Last Name..."
                  {...register('lastName')}
                  className={styles.inputClass}
                />
              </div>
            </FadeSlide>
          </div>

          <div className="w-full">
            <Select
              {...register('usertype')}
              className={`${styles.inputClass} mb-2`}
              options={[
                'Wholesaler',
                'Distributer',
                'Retailer',
                'Customer',
                'Other',
              ]}
              label={'I am a *'}
            />
            {watch().usertype === 'Other' && (
              <input
                placeholder="Please mention..."
                type="default"
                {...register('usertypecustom')}
                className={styles.inputClass}
              />
            )}
          </div>

          {inputFields.map(
            (
              { onChange, registerKey, label, value, useFormHook, ...rest },
              index
            ) => (
              <div className="w-full">
                <FadeSlide
                  slideDirection="up"
                  slideOptions={{
                    triggerOnce: true,
                  }}
                  fadeOptions={{
                    triggerOnce: true,
                  }}
                >
                  <label>{label}</label>
                  <input
                    className={styles.inputClass}
                    {...rest}
                    {...(useFormHook
                      ? // @ts-ignore
                        register(registerKey)
                      : {
                          onChange,
                          value,
                        })}
                  />
                </FadeSlide>
              </div>
            )
          )}

          <div className="w-full shadow-sm">
            <FadeSlide
              slideOptions={{
                triggerOnce: true,
              }}
              fadeOptions={{
                triggerOnce: true,
              }}
            >
              <textarea
                rows={12}
                required={true}
                style={{ resize: 'none' }}
                placeholder="Enter Your Message..."
                {...register('message')}
                aria-errormessage='{"required": "Please enter your message"}'
                className={styles.inputClass}
              />
            </FadeSlide>
          </div>
          {!errorMessage && successMessage && (
            <div className="w-fit p-8 m-4 items-center justify-center flex border-2 bg-green-200 border-green-500">
              {successMessage}
            </div>
          )}
          {!successMessage && errorMessage && (
            <div className="w-fit p-8 m-4 items-center justify-center flex border-2 bg-red-200 border-red-500">
              {errorMessage}
            </div>
          )}

          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={`${process.env.NEXT_RECAPTCHA_KEY}`}
            onChange={onReCAPTCHAChange}
          />
          <Button type="submit" className=" flex items-center justify-center">
            {loading && <AiOutlineLoading />}Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
