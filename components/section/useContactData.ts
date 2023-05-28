import axios from 'axios';
import { createRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useLoading from '~/hooks/useLoading';
import { IEmailPayload } from '~/interfaces/email';
import { sendEmail } from '~/lib/email';
import { useConfig } from '~/store';
import { checkIfStrinNumber } from '~/utils/string';

const useContactData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
    control,
  } = useForm<IEmailPayload>();
  const recaptchaRef = createRef<any>();

  const { loading, startloading, stoploading } = useLoading();
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<number | null>();
  const [postalCode, setPinCode] = useState<number | null>();
  const [city, setCity] = useState<string>('');
  let timeout: any = null;

  const onPhoneNumberChangeHandler = (value: string) => {
    if (!checkIfStrinNumber(value) || value.length > 10) {
      return;
    } else if (isNaN(Number(value))) {
      setPhoneNumber(Number(''));
      return;
    } else {
      setPhoneNumber(Number(value));
    }
  };

  const onPinCodeChangeHandler = (value: string) => {
    if (!checkIfStrinNumber(value) || value.length > 6) {
      return;
    } else if (isNaN(Number(value))) {
      setPinCode(Number(''));
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
    if (data.address?.length < 5) {
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

  const resetFields = () => {
    reset();
    setPinCode(null);
    setPhoneNumber(null);
    setCity('');
  };

  const onSubmit = async (data: IEmailPayload) => {
    try {
      console.log({ data, phoneNumber, postalCode, city });
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

      recaptchaRef.current.execute();

      const res = await sendEmail(payload);

      resetFields();
      setSuccessMessage('Your message has been sent. Thank You!');
      stoploading();
    } catch (error) {
      console.log({ error });
      setErrorMessage('Please try again later!');
      stoploading();
    }
  };

  const onReCAPTCHAChange = async (captchaCode: any) => {
    if (!captchaCode) {
      return;
    }
    try {
      const response = await axios.post('/api/captcha/verify', {
        email: getValues().email,
        captcha: captchaCode,
      });
      if (response.status === 200) {
        setSuccessMessage('Captcha verified successfully');
      } else {
        const { error } = response.data;
        throw new Error(error.message);
      }
    } catch (error) {
      setErrorMessage((error as any).message || 'Something went wrong');
    } finally {
      recaptchaRef?.current?.reset();
    }
  };

  const inputFields: {
    registerKey?: string;
    label: string;
    onChange?: (params?: any) => void;
    placeholder: string;
    required: boolean;
    value?: any;
    type?: string;
    useFormHook?: boolean;
  }[] = [
    {
      label: 'Phone Number *',
      placeholder: 'Enter Phone Number...',
      required: true,
      type: 'default',
      useFormHook: false,
      value: phoneNumber,
      onChange: ({ target: { value } }: any) =>
        onPhoneNumberChangeHandler(value),
    },
    {
      required: true,
      placeholder: 'Enter Your Address...',
      registerKey: 'address',
      label: 'Address *',
      useFormHook: true,
    },
    {
      placeholder: 'Enter City...',
      label: 'City',
      required: true,
      value: city,
      onChange: ({ target: { value } }: any) => onCityChange(value),
    },
    {
      required: true,
      label: 'Pin Code *',
      type: 'default',
      placeholder: 'Enter Your Postal Code...',
      // @ts-ignore
      value: postalCode,
      onChange: ({ target: { value } }: any) => onPinCodeChangeHandler(value),
    },
    {
      required: true,
      label: 'Email *',
      type: 'email',
      placeholder: 'Enter Your Email...',
      registerKey: 'email',
      useFormHook: true,
    },
  ];

  return {
    inputFields,
    register,
    handleSubmit,
    errors,
    reset,
    watch,
    getValues,
    control,
    recaptchaRef,
    onSubmit,
    onReCAPTCHAChange,
    loading,
    successMessage,
    errorMessage,
    timeout,
    setErrorMessage,
    setSuccessMessage,
    onPhoneNumberChangeHandler,

    onPinCodeChangeHandler,
    onCityChange,
    validateForm,
    resetFields,
  };
};
export default useContactData;
