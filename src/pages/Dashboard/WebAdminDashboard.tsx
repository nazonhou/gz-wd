import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import PackageList from '../../components/Dashboard/PackageList';
import DeliveryList from '../../components/Dashboard/DeliveryList';

const WebAdminDashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-2">
        <PackageList />
        <DeliveryList />
      </div>
    </DefaultLayout>
  );
};

export default WebAdminDashboard;
