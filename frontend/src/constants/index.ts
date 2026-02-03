export const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export enum HotelStatus {
  OPEN = "open",
  CLOSED = "closed",
  RENOVATION = "renovation",
}
export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

