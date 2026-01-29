export const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export enum HotelStatus {
  PENDING = "pending",
  ACTIVE = "active",
  MAINTENANCE = "maintenance",
}
export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

export const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
    path: "/dashboard",
  },
  {
    key: "locations",
    label: "Locations",
    icon: "location_on",
    path: "/locations",
  },
  {
    key: "hotels",
    label: "Hotels",
    icon: "bed",
    path: "/hotels",
  },
  {
    key: "bookings",
    label: "Bookings",
    icon: "calendar_month",
    path: "/bookings",
  },
  {
    key: "users",
    label: "Users",
    icon: "group",
    path: "/users",
  },
];

export const SYSTEM_ITEMS = [
  {
    key: "settings",
    label: "Settings",
    icon: "settings",
    path: "/settings",
  },
  {
    key: "support",
    label: "Support",
    icon: "help",
    path: "/support",
  },
];
