import { useDelivery } from '../../contexts/DeliveryContext';
import DeliveryStatusBadge from '../Delivery/DeliveryStatusBadge';
import DetailsItem from './DetailsItem';

const DeliveryDetails = () => {
  const deliveryContext = useDelivery();
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Delivery Details
      </h4>

      {deliveryContext.isDeliveryAvailable && (
        <div className="flex flex-col">
          <DetailsItem
            label="ID"
            value={deliveryContext.delivery?._id}
            withBackground={true}
          />
          <DetailsItem
            label="Package ID"
            value={deliveryContext.delivery?.package_id}
            withBackground={false}
          />
          <DetailsItem
            label="Location"
            value={`${deliveryContext.delivery?.location?.lat}, ${deliveryContext.delivery?.location?.lng}`}
            withBackground={true}
          />
          <DetailsItem label="Status" withBackground={false}>
            <DeliveryStatusBadge status={deliveryContext.delivery?.status} />
          </DetailsItem>

          <DetailsItem
            label="Pickup time"
            value={
              deliveryContext.delivery?.pickup_time
                ? new Date(deliveryContext.delivery?.pickup_time)?.toISOString()
                : ''
            }
            withBackground={true}
          />

          <DetailsItem
            label="Start time"
            value={
              deliveryContext.delivery?.start_time
                ? new Date(deliveryContext.delivery?.start_time)?.toISOString()
                : ''
            }
            withBackground={false}
          />

          <DetailsItem
            label="End time"
            value={
              deliveryContext.delivery?.end_time
                ? new Date(deliveryContext.delivery?.end_time)?.toISOString()
                : ''
            }
            withBackground={true}
          />
        </div>
      )}
    </div>
  );
};

export default DeliveryDetails;
