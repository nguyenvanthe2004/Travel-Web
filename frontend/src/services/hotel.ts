import { HotelStatus, SortValue } from "../constants";
import { HotelFormData } from "../validations/hotel";
import instance from "./req";

export const callCountHotelStatus = async () => {
  const res = await instance.get("/hotels/count/status");
  return res.data;
};
export const callGetAllHotel = async (
  page = 1,
  limit = 10,
  status?: HotelStatus,
  locationId?: string,
) => {
  return await instance.get("/hotels", {
    params: {
      page,
      limit,
      status,
      locationId,
    },
  });
};

export const callGetMyHotel = async (
  page = 1,
  limit = 10,
  status?: HotelStatus,
) => {
  return instance.get(`/hotels/my-hotel`, {
    params: { page, limit, status },
  });
};

export const callGetHotelById = async (id: string) => {
  return await instance.get(`/hotels/${id}`);
};
export const callGetHotelSearch = async (
  page = 1,
  limit = 10,
  locationName?: string,
  guests?: number,
  minPrice?: number,
  maxPrice?: number,
  sort?: SortValue
) => {
  return instance.get("/hotels/search", {
    params: {
      page,
      limit,
      locationName,
      guests,
      minPrice,
      maxPrice,
      sort
    },
  });
};
export const callCreateHotel = async (data: HotelFormData) => {
  return await instance.post("/hotels", data);
};
export const callUpdateHotel = async (id: string, data: HotelFormData) => {
  return await instance.put(`/hotels/${id}`, data);
};
export const callDeleteHotel = async (id: string) => {
  return await instance.delete(`/hotels/${id}`);
};
