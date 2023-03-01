import { NextPage } from 'next';
import React, { HTMLProps } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

import { ICommonProps } from '~/interfaces/common';
import { useConfig } from '~/store';
const Button: NextPage<HTMLMotionProps<'button'> & ICommonProps> = ({
  children,
  className,

  ...props
}) => {
  const { config } = useConfig();

  return (
    // @ts-ignore-next-line
    <motion.button
      className={`rounded-full ${
        ['#fff', '#ffffff'].some(
          (clr) => clr === config.appSettings?.colors.primary.toLowerCase()
        )
          ? 'text-neutral-900'
          : 'text-white'
      } w-fit px-4 py-2 bg-rose-800 hover:shadow-lg ${className || ''}`}
      whileHover={{
        scale: 1.1,
      }}
      style={{ background: config.appSettings?.colors.primary }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
