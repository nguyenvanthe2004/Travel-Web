import { BookingStatus } from "../constants";

export interface Booking {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    avatar: string;
    email: string;
  };
  roomId: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    hotelId: {
      _id: string;
      name: string;
      address: string;
      locationId: {
        name: string;
      };
      userId: {
        _id: string
      }
    };
  };
  nights: number;
  checkIn: string;
  checkOut: string;
  guest: number;
  request?: string;
  total: number;
  status: BookingStatus;
}
export interface CreateBookingDto {
  roomId: string;
  nights: number;
  checkIn: string;
  checkOut: string;
  guest: number;
  request?: string;
  total: number;
}
export interface UpdateBookingDto {
  status: BookingStatus
  request?: string;
}

export interface FindBookingStatus {
  status: BookingStatus
  total: number;
}