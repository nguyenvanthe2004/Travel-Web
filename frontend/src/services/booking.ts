import { BookingStatus } from "../constants";
import { CreateBookingDto, UpdateBookingDto } from "../types/booking";
import instance from "./req";

export const callCountBookingStatus = async (userId?: string) => {
  return await instance.get(`/bookings/count/status`, {
    params: { userId },
  });
};

export const callGetAllBookings = async (
  page = 1,
  limit = 10,
  status?: string | null,
  userId?: string,
) => {
  return instance.get("/bookings", {
    params: { page, limit, status, userId },
  });
};

export const callGetBookingById = async (id: string) => {
  return instance.get(`/bookings/${id}`);
};

export const callGetBookedDates = async (roomId: string) => {
  return instance.get(`/bookings/room/${roomId}/dates`);
};

export const callGetMyBookings = async (
  page: number,
  limit: number,
  status?: string,
) => {
  return instance.get(`/bookings/my-booking`, {
    params: { page, limit, status },
  });
};

export const callGetBookingsOwner = async (
  page: number,
  limit: number,
  status?: string,
) => {
  return instance.get(`/bookings/booking-manager`, {
    params: { page, limit, status },
  });
};

export const callCreateBooking = async (data: CreateBookingDto) => {
  return instance.post("/bookings", data);
};

export const callUpdateBooking = async (id: string, data: UpdateBookingDto) => {
  return instance.put(`/bookings/${id}`, data);
};

export const callCancelBooking = async (id: string) => {
  return instance.put(`/bookings/${id}/cancel`);
};

export const callDeleteBooking = async (id: string) => {
  return instance.delete(`/bookings/${id}`);
};
