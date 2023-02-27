import React, { FC } from 'react';
import { motion } from 'framer-motion';
import SmoothScroll from '../Layout/SmoothScroll';
import { ICommonProps } from '~/interfaces/common';

interface IProps extends ICommonProps {
  visionContent?: string;
}

const AboutBanner: FC<IProps> = ({
  visionContent,
  config: {
    appSettings: { colors },
  },
}) => {
  return (
    <div
      className="relative w-screen h-[65vh] bg-black p-0 m-0 overflow-hidden flex flex-col md:flex-row items-center justify-end"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`,
        backgroundSize: '100%',
        objectFit: 'cover',
      }}
    >
      <div
        className="w-[100%] md:w-[50%] h-full text-white flex flex-col px-6 sm:px-6 lg:px-24 items-center text-center sm:text-left sm:items-start justify-center"
        style={{
          background: `linear-gradient(to right, #163c61, ${colors.primary})`,
        }}
      >
        <motion.h1
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: 'easeInOut',
            delay: 0.2,
            duration: 0.6,
          }}
          className="text-6xl text-white"
        >
          Our Vision
        </motion.h1>
        <motion.p
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: 'easeInOut',
            delay: 0.2,
            duration: 0.6,
          }}
          className=" text-white pr-0 md:pr-24 mt-6"
        >
          {visionContent
            ? visionContent
            : `Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing.`}
        </motion.p>
      </div>
    </div>
  );
};

export default AboutBanner;
