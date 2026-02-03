import { HotelStatus } from "../models/Hotel";

export interface CreateHotelInput {
  name: string;
  address: string;
  description: string;
  images?: string[];
  status?: HotelStatus;
  locationId: string;
  userId: string;
}

export interface UpdateHotelInput {
  name?: string;
  address?: string;
  description?: string;
  status?: HotelStatus;
}
