import { BookingStatus } from "../constants";

export interface Booking {
  _id: string;
  bookingCode: string;
  guest: {
    name: string;
    email: string;
    avatar: string;
  };
  hotel: string;
  room: string;
  period: string;
  nights: number;
  status: BookingStatus;
  total: number;
}