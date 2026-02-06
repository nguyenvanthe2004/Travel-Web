import { HotelFormData } from "../validations/hotel";
import instance from "./req";

export const callCountHotelStatus = async (status: string) => {
  return await instance.get(`/hotels/count/${status}`);
};
export const callGetAllHotel = async (
  page: number,
  limit: number,
  status?: string,
  locationId?: string,
) => {
  return instance.get(`/hotels/${status}/${locationId}`, {
    params: {
      page,
      limit,
      status,
      locationId,
    },
  });
};

export const callGetMyHotel = async (
  page: number,
  limit: number,
) => {
  return instance.get(`/hotels/user`, {
    params: { page, limit },
  });
};

export const callGetHotelById = async (id: string) => {
  return instance.get(`/hotels/${id}`);
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
