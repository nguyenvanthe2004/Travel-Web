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

export const PRICE_MAP: Record<string, { min: number; max: number }> = {
  "0-100": { min: 0, max: 100 },
  "100-300": { min: 100, max: 300 },
  "300-500": { min: 300, max: 500 },
  "500+": { min: 500, max: 1000 },
  all: { min: 0, max: 1000 },
};
