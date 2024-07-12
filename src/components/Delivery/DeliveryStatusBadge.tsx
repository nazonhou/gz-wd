import React, { PropsWithChildren } from 'react';
import { DeliveryStatus } from '../../types/delivery';

const DeliveryStatusBadge: React.FC<
  PropsWithChildren<{
    status?: DeliveryStatus;
  }>
> = ({ status }) => {
  if (!status) {
    return <span></span>;
  }

  return (
    <span
      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
        status === 'open'
          ? 'bg-primary text-primary'
          : status === 'picked-up'
          ? 'bg-secondary text-secondary'
          : status === 'in-transit'
          ? 'bg-warning text-warning'
          : status === 'delivered'
          ? 'bg-success text-success'
          : 'bg-danger text-danger'
      }`}
    >
      {status}
    </span>
  );
};

export default DeliveryStatusBadge;
