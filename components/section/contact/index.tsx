import React, { useEffect } from "react";
import useData from "./useData";
import Button from "~/components/atoms/button";
import Select from "~/components/molecules/select";
import _ from "lodash";
import { styles } from "~/constants/contact";
import Input from "~/components/atoms/input";
import FadeSlide from "~/components/animations/FadeSlide";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const {
    data: { inputFields, recaptchaRef },
    handlers: {
      handleSubmit,
      onReCAPTCHAChange,
      setErrorMessage,
      setSuccessMessage,
    },
    setters: { setContactData },
    state: { contactData, errorMessage, successMessage },
  } = useData();
  let timeout: any = null;

  useEffect(() => {
    if (!successMessage && !errorMessage) return;
    else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [successMessage]);

  return (
    <form
      onSubmit={handleSubmit}
      className="sm:mx-auto sm:w-fit sm:my-4 shadow-md rounded-md border p-4"
      style={{
        //use a bit nice red color
        background: "#F8CACA",
      }}
    >
      <FadeSlide
        slideOptions={{ triggerOnce: true }}
        fadeOptions={{ triggerOnce: true }}
      >
        <div className="flex items-center justify-center w-full mb-8 gap-4 ">
          <Input placeholder="Enter phone number..." />
          <Button className="align-middle">Book a Callback</Button>
        </div>
      </FadeSlide>
      <h1 className="text-3xl mx-auto my-2 mb-4 text-center font-medium">
        We'd Love To Hear From You!
      </h1>
      <FadeSlide
        slideOptions={{
          triggerOnce: true,
        }}
        fadeOptions={{
          triggerOnce: true,
        }}
      >
        <div className="mb-2">
          <Select
            className={`${styles.inputClass} mb-2`}
            options={[
              "Wholesaler",
              "Distributer",
              "Retailer",
              "Customer",
              "Other",
            ]}
            value={contactData.userType.default}
            onChange={({ target: { value } }: any) =>
              setContactData((prev) => ({
                ...prev,
                userType: { default: value, custom: prev.userType.custom },
              }))
            }
            label={"I am a *"}
          />
          {contactData.userType.default === "Other" && (
            <Input
              placeholder="Please mention..."
              type="default"
              value={contactData.userType.custom}
              onChange={({ target: { value } }: any) =>
                setContactData((prev) => ({
                  ...prev,
                  userType: { default: prev.userType.default, custom: value },
                }))
              }
            />
          )}
        </div>
      </FadeSlide>
      <div className="flex flex-col w-full mb-2 md:flex-row space-y-4 md:space-x-4 md:space-y-0">
        {inputFields
          .filter((_, ind) => ind < 2)
          .map(({ type, label, ...rest }) => (
            <FadeSlide
              fadeOptions={{
                triggerOnce: true,
              }}
              slideOptions={{
                triggerOnce: true,
              }}
            >
              <Input className="flex flex-col items-left" {...rest} />
            </FadeSlide>
          ))}
      </div>
      {inputFields
        .filter((_, ind) => ind >= 2)
        .map(({ ...rest }) => (
          <FadeSlide
            fadeOptions={{
              triggerOnce: true,
            }}
            slideOptions={{
              triggerOnce: true,
            }}
          >
            <Input {...rest} />
          </FadeSlide>
        ))}
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
      <Button type="submit">Send Message</Button>
    </form>
  );
};

export default Contact;
