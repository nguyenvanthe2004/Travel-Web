import { HotelStatus } from "../constants";

export interface HotelData {
  _id?: string;
  name: string;
  address: string;
  description: string;
  images: string[];
  locationId: string;
  status: HotelStatus;
}
