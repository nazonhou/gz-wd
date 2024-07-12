import React, { PropsWithChildren } from 'react';

const DetailsItem: React.FC<
  PropsWithChildren<{
    withBackground: boolean;
    value?: string;
    label: string;
  }>
> = ({ withBackground, value, label, children }) => {
  return (
    <div
      className={`grid grid-cols-12 ${
        withBackground ? 'bg-gray-2 dark:bg-meta-4' : ''
      }`}
    >
      <div className="flex items-center p-2.5 xl:p-5 col-span-4">
        <p
          className={`text-sm xsm:text-base font-medium capitalize text-black dark:text-white ${
            !withBackground ? '' : ''
          }`}
        >
          {label}
        </p>
      </div>

      <div className="flex items-center p-2.5 xl:p-5 col-span-8">
        <p className={`text-sm xsm:text-base`}>{value ?? children}</p>
      </div>
    </div>
  );
};

export default DetailsItem;
