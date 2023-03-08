import { NextPage } from 'next';
import React from 'react';

interface IProps extends React.HTMLProps<HTMLDivElement> {
  shadowSize?: 'lg' | 'sm' | 'md' | 'xs' | 'xl';
}

const Card: NextPage<IProps> = ({
  className,
  children,
  shadowSize,
  ...rest
}) => {
  return (
    <div
      className={` shadow-${shadowSize || 'sm'} flex flex-col items-center  ${
        className || ''
      }`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;

// bg-white rounded-md shadow-sm p-4 flex flex-col items-center
