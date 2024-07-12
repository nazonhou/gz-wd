import { usePackage } from '../../contexts/DeliveryContext';
import DetailsItem from './DetailsItem';

const PackageDetails = () => {
  const packageContext = usePackage();
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Package Details
      </h4>

      {packageContext.isPackageAvailable && (
        <div className="flex flex-col">
          <DetailsItem
            label="ID"
            value={packageContext.pack?._id}
            withBackground={true}
          />

          <DetailsItem
            label="description"
            value={packageContext.pack?.description}
            withBackground={false}
          />

          <DetailsItem
            label="weight"
            value={`${packageContext.pack?.weight}`}
            withBackground={true}
          />

          <DetailsItem
            label="width"
            value={`${packageContext.pack?.width}`}
            withBackground={false}
          />

          <DetailsItem
            label="height"
            value={`${packageContext.pack?.height}`}
            withBackground={true}
          />

          <DetailsItem
            label="depth"
            value={`${packageContext.pack?.depth}`}
            withBackground={false}
          />

          <DetailsItem
            label="from name"
            value={packageContext.pack?.from_name}
            withBackground={true}
          />

          <DetailsItem
            label="from address"
            value={packageContext.pack?.from_address}
            withBackground={false}
          />

          <DetailsItem
            label="from location"
            value={`${packageContext.pack?.from_location?.lat}, ${packageContext.pack?.from_location?.lng}`}
            withBackground={true}
          />

          <DetailsItem
            label="to name"
            value={packageContext.pack?.to_name}
            withBackground={false}
          />

          <DetailsItem
            label="to address"
            value={packageContext.pack?.to_address}
            withBackground={true}
          />

          <DetailsItem
            label="to location"
            value={`${packageContext.pack?.to_location?.lat}, ${packageContext.pack?.to_location?.lng}`}
            withBackground={false}
          />
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
