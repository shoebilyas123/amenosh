import React, { FC } from "react";

import Navbar from "~/components/Navbar";
import Footer from "~/components/section/footer";
import Contact from "~/components/section/contact/index";
import { ICommonProps } from "~/interfaces/common";
import { GetServerSideProps, NextPage } from "next";
import DynamicHead from "~/components/Document/DynamicHead";

const ContactUs: NextPage<ICommonProps> = ({}) => {
  return (
    <>
      <DynamicHead
        title={"Contact Amenosh"}
        description={
          "We always welcome your enquiries, feedback, and suggestions."
        }
      />
      <div
        className="w-screen overflow-hidden"
        style={{
          background:
            "url('/images/bg_doodles.png') no-repeat center center fixed",
        }}
      >
        <Navbar textColor="LIGHT" isFixed={false} />
        {/* <Contact /> */}
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return { props: {} };
};

export default ContactUs;
