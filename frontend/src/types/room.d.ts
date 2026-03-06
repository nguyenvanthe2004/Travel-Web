import { RoomStatus } from "../constants";

export interface Room {
  _id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  maxGuests?: number;
  wide?: number;
  status: RoomStatus;
  hotelId: {
    _id: string;
    name: string;
    rooms: Room[];
    locationId: {
      name: string;
    };
  };
}
