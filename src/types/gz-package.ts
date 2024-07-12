export interface GzPackage {
  _id: string;
  active_delivery_id: string;
  description: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  from_name: string;
  from_address: string;
  from_location: { lat: number, lng: number };
  to_name: string;
  to_address: string;
  to_location: { lat: number, lng: number };
}