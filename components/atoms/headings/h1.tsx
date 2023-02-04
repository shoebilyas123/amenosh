import React, { FC } from 'react';

interface IProps extends React.HTMLProps<HTMLHeadingElement> {}

const H1: FC<IProps> = ({ className, children, ...props }) => {
  return (
    <h1 className={`text-6xl ${className}`} {...props}>
      {children}
    </h1>
  );
};

export default H1;
