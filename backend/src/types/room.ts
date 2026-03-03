import { RoomStatus } from "../models/Room";

export interface CreateRoomInput {
  name: string;
  description: string;
  price: number;
  maxGuests?: number;
  wide?: number;
  images?: string[];
  status?: RoomStatus;
  hotelId: string;
}

export interface UpdateRoomInput {
  name?: string;
  description?: string;
  price?: number;
  maxGuests?: number;
  wide?: number;
  images?: string[];
  status?: RoomStatus;
}
export type RoomFindFilter = {
  status?: string;
  hotelId?: string;
};