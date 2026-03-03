import { HotelStatus } from "../constants";
import { Room } from "./room";

export interface Hotel {
  _id: string;
  name: string;
  address: string;
  description: string;
  images: string[];
  locationId: {
    name: string;
  };
  rooms: Room[];
  status: HotelStatus;
}
