import Image from 'next/image';
import React, { FC } from 'react';
import { ICommonProps } from '~/interfaces/common';
import { useConfig } from '~/store';

import styles from './LoadingPage.module.css';

interface IProps extends ICommonProps {
  img?: string;
}

const LoadingPage: FC<IProps> = ({ img }) => {
  const { config } = useConfig();

  return (
    <div
      className="fixed flex items-center justify-center w-screen h-screen top-0 left-0"
      style={{ zIndex: 999999 }}
    >
      <div
        className="fixed w-full h-full bg-black"
        style={{ opacity: 0.7 }}
      ></div>

      <div className="flex items-center justify-center">
        <div
          className={styles['circle-loading']}
          style={{
            animationDelay: '0s',
            background: config.appSettings?.colors.primary,
          }}
        ></div>

        <div
          className={styles['circle-loading']}
          style={{
            animationDelay: '.2s',
            background: config.appSettings?.colors.secondary,
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingPage;
