import Link from 'next/link';
import React, { FC } from 'react';
import { H1 } from '../atoms/headings';
import Button from '../atoms/button';
import { ICommonProps } from '~/interfaces/common';

interface IProps extends ICommonProps {
  className?: string;
  showWave?: boolean;
  waveColor?: string;
}

const SectionContact: FC<IProps> = ({
  className,
  waveColor,
  showWave,
  config,
}) => {
  const {
    appSettings: { colors },
  } = config;
  return (
    <div
      className={`overflow-hidden w-full relative flex flex-col items-center justify-center p-12 ${
        className || ''
      }`}
      style={{
        background: colors.secondary,
      }}
    >
      <div className="z-50 w-full flex flex-col items-center justify-center">
        <h1 className="z-50 text-white px-24 text-center xs:text-lg sm:text-xl md:text-4xl lg:text-6xl font-bold">
          We always welcome your enquiries, feedback and suggestions.
        </h1>
        <Link href="/contact" className="z-50">
          <Button config={config} className="mt-8 ">
            Contact
          </Button>
        </Link>
      </div>
      {showWave && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="left-0 -bottom-24 absolute w-screen z-0"
          id="homepage-banner"
        >
          <path
            fill={waveColor || '#fff'}
            fill-opacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,170.7C384,160,480,160,576,176C672,192,768,224,864,229.3C960,235,1056,213,1152,176C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      )}
    </div>
  );
};

export default SectionContact;
