import { useEffect, useState, useRef, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from '@vis.gl/react-google-maps';
import { useDelivery, usePackage } from '../../contexts/DeliveryContext';
import { serverSocket } from '../../server-socket';
import { Delivery } from '../../types/delivery';

interface Position {
  lat: number;
  lng: number;
}

enum SocketEvent {
  LocationChanged = 'location_changed',
  StatusChanged = 'status_changed',
  DeliveryUpdated = 'delivery_updated',
}

const GoogleMap = () => {
  const fetchCurrentPositionIntervalId = useRef<number | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const packageContext = usePackage();
  const deliveryContext = useDelivery();

  // connect to socket
  useEffect(() => {
    // no-op if the socket is already connected
    serverSocket.connect();
    return () => {
      serverSocket.disconnect();
    };
  }, []);

  // register listeners
  useEffect(() => {
    function onDeliveryUpdatedEvent(value: Delivery) {
      console.log(
        `Received ${SocketEvent.DeliveryUpdated} event with payload`,
        value,
      );

      if (value._id === deliveryContext.delivery?._id) {
        deliveryContext.updateDelivery(value);
      }
    }

    serverSocket.on(SocketEvent.DeliveryUpdated, onDeliveryUpdatedEvent);

    return () => {
      serverSocket.off(SocketEvent.DeliveryUpdated, onDeliveryUpdatedEvent);
    };
  }, [deliveryContext]);

  const areLocationDifferent = (
    location1: Position | null,
    location2: Position | null,
  ): boolean =>
    location1?.lat !== location2?.lat || location1?.lng !== location2?.lng;

  const handleBrowserFetchCurrentLocation = (location: Position) => {
    // update the current position if it is different from the
    // current browser location referenced by the location parameter
    if (areLocationDifferent(location, currentPosition)) {
      setCurrentPosition(location);
    }

    if (
      deliveryContext?.delivery?.location &&
      areLocationDifferent(deliveryContext.delivery.location, location)
    ) {
      console.log('Emit event with payload', {
        event: SocketEvent.LocationChanged,
        delivery_id: deliveryContext.delivery?._id,
        location,
      });

      serverSocket.emit(SocketEvent.LocationChanged, {
        event: SocketEvent.LocationChanged,
        delivery_id: deliveryContext.delivery?._id,
        location,
      });
    }
  };

  // update the current position as soon as we mount the component and update the delivery location in database
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        handleBrowserFetchCurrentLocation(location);
      });
    }
  }, []);

  // fetch the current browser location every 20s and update the current position if it changed
  useEffect(() => {
    if (
      deliveryContext.delivery?.status !== 'delivered' &&
      deliveryContext.delivery?.status !== 'failed'
    ) {
      fetchCurrentPositionIntervalId.current = window.setInterval(() => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            handleBrowserFetchCurrentLocation(location);
          });
        }
      }, 20 * 1000);

      // clear interval id before unmount component
      return () => {
        if (fetchCurrentPositionIntervalId.current) {
          clearInterval(fetchCurrentPositionIntervalId.current);
        }
      };
    }
  }, [currentPosition, deliveryContext]);

  const onPickedUp = useCallback(() => {
    serverSocket.emit(SocketEvent.StatusChanged, {
      event: SocketEvent.StatusChanged,
      delivery_id: deliveryContext.delivery?._id,
      status: 'picked-up',
    });
  }, [deliveryContext]);

  const onInTransit = useCallback(() => {
    serverSocket.emit(SocketEvent.StatusChanged, {
      event: SocketEvent.StatusChanged,
      delivery_id: deliveryContext.delivery?._id,
      status: 'in-transit',
    });
  }, [deliveryContext]);

  const onDelivered = useCallback(() => {
    serverSocket.emit(SocketEvent.StatusChanged, {
      event: SocketEvent.StatusChanged,
      delivery_id: deliveryContext.delivery?._id,
      status: 'delivered',
    });
  }, [deliveryContext]);

  const onFailed = useCallback(() => {
    serverSocket.emit(SocketEvent.StatusChanged, {
      event: SocketEvent.StatusChanged,
      delivery_id: deliveryContext.delivery?._id,
      status: 'failed',
    });
  }, [deliveryContext]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-12">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        MAP
      </h4>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-10">
          {currentPosition && (
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <div className="h-90">
                <Map
                  defaultZoom={12}
                  center={currentPosition}
                  mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
                >
                  {/* Current Location Marker */}
                  <AdvancedMarker position={currentPosition}>
                    <Pin
                      background="#ffa70b"
                      glyphColor="#ffffff"
                      borderColor="#ffa70b"
                      glyph="C"
                    />
                  </AdvancedMarker>

                  {/* From Location Marker */}
                  {packageContext.pack?.from_location?.lat &&
                    packageContext.pack?.from_location?.lng && (
                      <AdvancedMarker
                        position={{
                          lat: packageContext.pack?.from_location?.lat,
                          lng: packageContext.pack?.from_location?.lng,
                        }}
                      >
                        <Pin
                          background="#3c50e0"
                          glyphColor="#ffffff"
                          borderColor="#3c50e0"
                          glyph="S"
                        />
                      </AdvancedMarker>
                    )}

                  {/* To Location Marker */}
                  {packageContext.pack?.to_location?.lat &&
                    packageContext.pack?.to_location?.lng && (
                      <AdvancedMarker
                        position={{
                          lat: packageContext.pack?.to_location?.lat,
                          lng: packageContext.pack?.to_location?.lng,
                        }}
                      >
                        <Pin
                          background="#219653"
                          glyphColor="#ffffff"
                          borderColor="#219653"
                          glyph="D"
                        />
                      </AdvancedMarker>
                    )}
                </Map>
              </div>
            </APIProvider>
          )}
        </div>
        <div className="col-span-2 flex justify-center">
          <div className="flex flex-col justify-between">
            <button
              onClick={onPickedUp}
              disabled={deliveryContext.delivery?.status !== 'open'}
              className="text-center  rounded-md border py-2 px-4.5 font-medium text-white hover:bg-opacity-90 bg-secondary  border-secondary"
            >
              Picked Up
            </button>
            <button
              onClick={onInTransit}
              disabled={deliveryContext.delivery?.status !== 'picked-up'}
              className=" rounded-md border py-2 px-4.5 font-medium text-white  hover:bg-opacity-90 bg-warning border-warning"
            >
              In-Transit
            </button>
            <button
              onClick={onDelivered}
              disabled={deliveryContext.delivery?.status !== 'in-transit'}
              className=" rounded-md border py-2 px-4.5 font-medium text-white  hover:bg-opacity-90 bg-success border-success"
            >
              Delivered
            </button>
            <button
              onClick={onFailed}
              disabled={deliveryContext.delivery?.status !== 'in-transit'}
              className=" rounded-md border py-2 px-4.5 font-medium text-white  hover:bg-opacity-90 bg-danger border-danger"
            >
              Failed
            </button>
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-wrap items-center gap-3.5"></div>
      {/* <div className="my-8 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <button
          onClick={onPickedUp}
          disabled={deliveryContext.delivery?.status !== 'open'}
          className="col-span-3 inline-flex items-center justify-center gap-2.5 bg-secondary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4"
        >
          Picked Up
        </button>
        <button
          onClick={onInTransit}
          disabled={deliveryContext.delivery?.status !== 'picked-up'}
          className="col-span-3 inline-flex items-center justify-center gap-2.5 bg-warning py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4"
        >
          In-Transit
        </button>
        <button
          onClick={onDelivered}
          disabled={deliveryContext.delivery?.status !== 'in-transit'}
          className="col-span-3 inline-flex items-center justify-center gap-2.5 bg-success py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4"
        >
          Delivered
        </button>
        <button
          onClick={onFailed}
          disabled={deliveryContext.delivery?.status !== 'in-transit'}
          className="col-span-3 inline-flex items-center justify-center gap-2.5 bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4"
        >
          Failed
        </button>
      </div> */}
    </div>
  );
};

export default GoogleMap;
