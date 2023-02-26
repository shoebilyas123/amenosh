import Image from 'next/image';
import React, { FC } from 'react';
import { colors } from '~/constants/colors';

import styles from './LoadingPage.module.css';

interface IProps {
  img?: string;
}

const LoadingPage: FC<IProps> = ({ img }) => {
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
            background: colors.primary,
          }}
        ></div>

        <div
          className={styles['circle-loading']}
          style={{
            animationDelay: '.2s',
            background: colors.secondary,
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingPage;
