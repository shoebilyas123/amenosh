import { NextPage } from 'next';
import React, { HTMLProps } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

const Button: NextPage<HTMLMotionProps<'button'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    // @ts-ignore-next-line
    <motion.button
      className={`rounded-full text-white w-fit px-4 py-2 bg-rose-800 hover:shadow-lg ${
        className || ''
      }`}
      whileHover={{
        scale: 1.1,
      }}
      style={{ background: '#0c243c' }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
