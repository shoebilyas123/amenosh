import React, { FC } from 'react';

interface IProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}

const Input: FC<IProps> = ({ label, className, ...props }) => {
  return (
    <input
      className={`border px-4 py-2 outline-none focus:border-blue-400 ${
        className || ''
      }`}
      {...props}
    />
  );
};

export default Input;
