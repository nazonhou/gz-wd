import { useField } from 'formik';
import React, { PropsWithChildren } from 'react';

const TextInput: React.FC<
  PropsWithChildren<{
    type: 'text' | 'number';
    placeholder?: string;
    name: string;
    label: string;
    errors: string[];
  }>
> = ({ label, errors, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className="mb-2.5 block text-black dark:text-white">{label}</label>
      <input
        {...field}
        {...props}
        className={
          (meta.touched && meta.error) || errors.length
            ? 'w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary border-red-500 focus:border-red-500'
            : 'w-full rounded border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary border-stroke'
        }
      />
      {((meta.touched && meta.error) || errors.length !== 0) && (
        <div className="error text-red-500">{meta.error || errors[0]}</div>
      )}
    </>
  );
};

export default TextInput;
