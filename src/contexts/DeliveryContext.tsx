import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { Delivery } from '../types/delivery';
import { GzPackage } from '../types/gz-package';

const DeliveryContext = createContext<{
  delivery: Partial<Delivery> | null;
  updateDelivery: (delivery: Partial<Delivery>) => void;
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
}>({
  delivery: null,
  updateDelivery: () => {},
  errorMessage: null,
  setErrorMessage: () => {},
});

const PackageContext = createContext<{
  pack: Partial<GzPackage> | null;
  updatePack: (pack: Partial<GzPackage>) => void;
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
}>({
  pack: null,
  updatePack: () => {},
  errorMessage: null,
  setErrorMessage: () => {},
});

export const DeliveryContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [delivery, setDelivery] = useState<Partial<Delivery> | null>(
    null,
  );
  const [getDeliveryErrorMessage, setGetDeliveryErrorMessage] = useState<
    string | null
  >(null);
  const [pack, setPack] = useState<Partial<GzPackage> | null>(null);
  const [getPackageErrorMessage, setGetPackageErrorMessage] = useState<
    string | null
  >(null);
  return (
    <DeliveryContext.Provider
      value={{
        delivery,
        updateDelivery: setDelivery,
        errorMessage: getDeliveryErrorMessage,
        setErrorMessage: setGetDeliveryErrorMessage,
      }}
    >
      <PackageContext.Provider
        value={{
          pack,
          updatePack: setPack,
          errorMessage: getPackageErrorMessage,
          setErrorMessage: setGetPackageErrorMessage,
        }}
      >
        {children}
      </PackageContext.Provider>
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  return {
    isDeliveryAvailable: context.delivery !== null,
    ...context,
  };
};

export const usePackage = () => {
  const context = useContext(PackageContext);
  return {
    isPackageAvailable: context.pack !== null,
    ...context,
  };
};
