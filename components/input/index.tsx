import React, { FC } from 'react';

interface IProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}

const Input: FC<IProps> = ({ label, ...props }) => {
  return (
    <input
      className="border px-4 py-2 outline-none focus:border-rose-800"
      {...props}
    />
  );
};

export default Input;
