
const DELIVERY_STATUS_VALUES = [
  'open',
  'picked-up',
  'in-transit',
  'delivered',
  'failed'
] as const

export type DeliveryStatus = typeof DELIVERY_STATUS_VALUES[number];

export interface Delivery {
  _id: string;
  package_id: string;
  pickup_time: string;
  start_time: string;
  end_time: string;
  location: { lat: number, lng: number };
  status: DeliveryStatus
}