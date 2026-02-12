import { HotelStatus } from "../constants";

export interface Hotel {
  _id: string;
  name: string;
  address: string;
  description: string;
  images: string[];
  locationId: {
    name: string;
  };
  status: HotelStatus;
}
