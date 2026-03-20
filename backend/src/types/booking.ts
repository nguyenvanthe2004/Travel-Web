import { BookingStatus, IBooking, PaymentStatus } from "../models/Booking";

export interface CreateBookingInput {
  userId: string;
  roomId: string;
  info: string;
  nights: number;
  checkIn: Date;
  checkOut: Date;
  guest: number;
  request?: string;
  total: number;
}

export interface UpdateBookingInput {
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  request?: string;
}

export type BookingFindFilter = {
  status?: string;
  userId?: string;
  roomId?: string;
};

export type BookingQuery = {
  userId: string;
  status?: string;
};

export type BookingWithPopulate = Omit<IBooking, "roomId"> & {
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
};