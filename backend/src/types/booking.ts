import { BookingStatus } from "../models/Booking";

export interface CreateBookingInput {
  userId: string;
  roomId: string;
  nights: number;
  checkIn: string;
  checkOut: string;
  guest: number;
  request?: string;
  total: number;
}

export interface UpdateBookingInput {
  status?: BookingStatus;
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