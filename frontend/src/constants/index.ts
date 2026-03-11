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

export enum RoomStatus {
  AVAILABLE = "available",
  BOOKED = "booked",
  MAINTENANCE = "maintenance",
}

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

export enum SortValue {
  RECOMMENDED = "recommended",
  PRICE_ASC = " price_asc",
  PRICE_DESC = "price_desc",
}
