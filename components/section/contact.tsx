import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';

import useLoading from '~/hooks/useLoading';
import { IEmailPayload } from '~/interfaces/email';
import { sendEmail } from '~/lib/email';
import Button from '~/components/atoms/button';
import Card from '~/components/card';
import { ICommonProps } from '~/interfaces/common';
import { useConfig } from '~/store';

const Contact: FC<ICommonProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IEmailPayload>();
  const { config } = useConfig();
  const { loading, startloading, stoploading } = useLoading();
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<number | null>();
  const [postalCode, setPinCode] = useState<number | null>();
  const [city, setCity] = useState<string>('');
  let timeout: any = null;

  const checkIfNumber = (candidateValue: string) =>
    Number(candidateValue) >= 0 && Number(candidateValue) <= 9;

  const checkIfStrinNumber = (str: string) => {
    return str.split('').every((num: string) => checkIfNumber(num));
  };

  const onPhoneNumberChangeHandler = (value: string) => {
    if (!checkIfStrinNumber(value) || value.length > 10) {
      return;
    } else if (!value) {
      setPhoneNumber(null);
      return;
    } else {
      setPhoneNumber(Number(value));
    }
  };

  const onPinCodeChangeHandler = (value: string) => {
    if (!checkIfStrinNumber(value) || value.length > 6) {
      return;
    } else if (!value) {
      setPinCode(null);
      return;
    } else {
      setPinCode(Number(value));
    }
  };

  const onCityChange = (value: string) => {
    if (value !== '' && checkIfStrinNumber(value)) return;
    else setCity(value);
  };

  const validateForm = (data: IEmailPayload) => {
    let requiredField = '';

    if (!data.email) {
      requiredField = 'Email';
    } else if (!data.firstName) {
      requiredField = 'First name';
    } else if (!phoneNumber) {
      requiredField = 'Phone number';
    } else if (!data.message) {
      requiredField = 'Message';
    } else if (!city) {
      requiredField = 'City';
    } else if (!postalCode) {
      requiredField = 'Pin code';
    }
    if (data.usertype == '-- select an option --') {
      requiredField = 'Please select an option for "I am a"';
      return requiredField;
    }

    if (`${phoneNumber}`.length < 10) {
      return `Phone number is invalid.`;
    }
    if (`${postalCode}`.length === 0) {
      return `Pin code must be valid`;
    }
    if (data.address.length < 5) {
      return `Address must be more than 4 characters`;
    }
    if (city.length < 3) {
      return `City name must be more than 2 characters`;
    }
    if (!requiredField) {
      return '';
    }

    requiredField += ' is required!';

    return requiredField;
  };

  const onSubmit = async (data: IEmailPayload) => {
    try {
      const formValidationError = validateForm(data);
      if (formValidationError) {
        setErrorMessage(formValidationError);
        return;
      }

      startloading();
      let payload = {
        ...data,
        phoneNumber: `${phoneNumber}`,
        postalCode: `${postalCode}`,
        city,
      };
      if (payload.usertype === 'Other' && payload.usertypecustom.length > 0)
        payload.usertype = payload.usertypecustom;

      const res = await sendEmail(payload);
      reset();
      setPinCode(null);
      setPhoneNumber(null);
      setCity('');
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
          <option disabled selected>
            {' '}
            -- select an option --{' '}
          </option>
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
                label={'I am a *'}
              />
              {watch().usertype === 'Other' && (
                <input
                  placeholder="Please mention..."
                  type="default"
                  {...register('usertypecustom')}
                  className="w-full border rounded-none px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
                />
              )}
            </div>

            <div className="w-full">
              <label>Phone Number *</label>
              <input
                required={true}
                placeholder="Enter Phone Number..."
                type="default"
                // @ts-ignore
                value={phoneNumber}
                onChange={({ target: { value } }) =>
                  onPhoneNumberChangeHandler(value)
                }
                className="w-full border rounded-none px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
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
              <label>City</label>
              <input
                placeholder="Enter City..."
                required={true}
                value={city}
                onChange={({ target: { value } }) => onCityChange(value)}
                className="w-full border px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
              />
            </div>

            <div className="w-full">
              <label>Pin Code *</label>
              <input
                required={true}
                type="default"
                placeholder="Enter Your Postal Code..."
                // @ts-ignore
                value={postalCode}
                onChange={({ target: { value } }) =>
                  onPinCodeChangeHandler(value)
                }
                className="w-full border rounded-none px-4 py-2 outline-none focus:border-sky-800 placeholder:text-zinc-500"
              />
            </div>

            <div className="w-full">
              <label>Email *</label>
              <input
                required={true}
                type="email"
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

            <Button type="submit" className="flex items-center justify-center">
              {loading && <AiOutlineLoading />}Send Message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
