import React from 'react';

const Select = React.forwardRef(
  (
    { onChange, onBlur, name, label, className, options, value }: any,
    ref: any
  ) => (
    <>
      <label>{label}</label>
      <select
        value={value}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        className={className}
      >
        <option disabled selected>
          {' '}
          -- select an option --{' '}
        </option>
        {options.map((opt: string) => (
          <option value={opt}>{opt}</option>
        ))}
      </select>
    </>
  )
);

export default Select;
