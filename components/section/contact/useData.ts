import { ReactEventHandler, createRef, useState } from 'react';
import { IContactPayload } from '~/constants/contact';
import Select from '~/components/molecules/select';
import { checkIfStrinNumber } from '~/utils/string';
import useLoading from '~/hooks/useLoading';
import axios from 'axios';
import { sendEmail } from '~/lib/email';

const useData = () => {
  const [contactData, setContactData] = useState<IContactPayload>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    userType: { default: '-- select an option --', custom: '' },
    pincode: '',
    city: '',
  });
  const { loading, startloading, stoploading } = useLoading();
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const recaptchaRef = createRef<any>();
  let timeout: any = null;

  const onPhoneNumberChangeHandler = (value: string) => {
    if (!checkIfStrinNumber(value) || value.length > 10) {
      return;
    } else if (isNaN(Number(value))) {
      setContactData((prev) => ({ ...prev, phone: '' }));
      return;
    } else {
      setContactData((prev) => ({ ...prev, phone: value }));
    }
  };

  const onPinCodeChangeHandler = (value: string) => {
    if (!checkIfStrinNumber(value) || value.length > 6) {
      return;
    } else if (isNaN(Number(value))) {
      setContactData((prev) => ({ ...prev, pincode: '' }));
      return;
    } else {
      setContactData((prev) => ({ ...prev, pincode: value }));
    }
  };

  const onCityChange = (value: string) => {
    if (value !== '' && checkIfStrinNumber(value)) return;
    else setContactData((prev) => ({ ...prev, city: value }));
  };

  const inputFields = [
    {
      name: 'firstName',
      label: 'First Name',
      value: contactData.firstName,
      onChange: ({ target: { value } }: any) => {
        setContactData((prev) => ({ ...prev, firstName: value }));
      },
      required: true,
      placeholder: 'Enter first name',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      value: contactData.lastName,
      onChange: ({ target: { value } }: any) => {
        setContactData((prev) => ({ ...prev, lastName: value }));
      },
      placeholder: 'Enter last name',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      value: contactData.email,
      onChange: ({ target: { value } }: any) => {
        setContactData((prev) => ({ ...prev, email: value }));
      },
      type: 'email',
      placeholder: 'Enter email',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone',
      value: contactData.phone,
      onChange: ({ target: { value } }: any) => {
        onPhoneNumberChangeHandler(value);
      },
      placeholder: 'Enter phone number',

      required: true,
    },
    {
      name: 'address',
      label: 'Address',
      value: contactData.address,
      onChange: ({ target: { value } }: any) => {
        setContactData((prev) => ({ ...prev, address: value }));
      },
      placeholder: 'Enter your address',

      required: true,
    },
    {
      name: 'city',
      label: 'City',
      value: contactData.city,
      onChange: ({ target: { value } }: any) => {
        onCityChange(value);
      },
      placeholder: 'Enter city',

      required: true,
    },

    {
      name: 'pincode',
      label: 'Pincode',
      value: contactData.pincode,
      onChange: ({ target: { value } }: any) => {
        onPinCodeChangeHandler(value);
      },
      placeholder: 'Enter pincode',

      required: true,
    },
    {
      name: 'message',
      label: 'Message',
      value: contactData.message,
      placeholder: 'Enter your message',
      onChange: ({ target: { value } }: any) => {
        setContactData((prev) => ({ ...prev, message: value }));
      },
      type: 'textarea',
      required: true,
    },
  ];

  const validateForm = () => {
    let requiredField = '';

    if (!contactData.email) {
      requiredField = 'Email';
    } else if (!contactData.firstName) {
      requiredField = 'First name';
    } else if (!contactData.phone) {
      requiredField = 'Phone number';
    } else if (!contactData.message) {
      requiredField = 'Message';
    } else if (!contactData.city) {
      requiredField = 'City';
    } else if (!contactData.pincode) {
      requiredField = 'Pin code';
    }
    if (contactData.userType.default == '-- select an option --') {
      requiredField = 'Please select an option for "I am a"';
      return requiredField;
    }

    if (`${contactData.phone}`.length < 10) {
      return `Phone number is invalid.`;
    }
    if (contactData.pincode.length === 0) {
      return `Pin code must be valid`;
    }
    if (contactData.address?.length < 5) {
      return `Address must be more than 4 characters`;
    }
    if (contactData.city.length < 3) {
      return `City name must be more than 2 characters`;
    }
    if (!requiredField) {
      return '';
    }

    requiredField += ' is required!';

    return requiredField;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formValidationError = validateForm();

      if (formValidationError) {
        setErrorMessage(formValidationError);
        return;
      }
      startloading();
      let payload = {
        ...contactData,
        phoneNumber: contactData.phone,
        usertype: contactData.userType.default,
        postalCode: contactData.pincode,
        phone: undefined,
        pincode: undefined,
      };
      if (
        payload.userType.default === 'Other' &&
        payload.userType.custom.length > 0
      )
        payload.usertype = payload.userType.custom;

      recaptchaRef.current.execute();

      const res = await sendEmail(payload);

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
        email: contactData.email,
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

  return {
    data: {
      inputFields,
      recaptchaRef,
    },
    state: {
      contactData,
      errorMessage,
      successMessage,
      timeout,
    },
    handlers: {
      handleSubmit,
      onReCAPTCHAChange,
      setErrorMessage,
      setSuccessMessage,
    },
    setters: {
      setContactData,
    },
  };
};

export default useData;
