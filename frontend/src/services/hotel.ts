import { HotelFormData } from "../validations/hotel";
import instance from "./req";

export const callCountHotelStatus = async (status: string) => {
  return await instance.get(`/hotels/count/${status}`);
};
export const callGetAllHotel = async (page: number, limit: number) => {
  return await instance.get("/hotels", {
    params: { page, limit },
  });
};
export const callGetHotelByUser = async (
  id: string,
  page: number,
  limit: number,
) => {
  return instance.get(`/hotels/user/${id}`, {
    params: { page, limit },
  });
};
export const callFilterHotelByStatus = (
  status: string,
  page: number,
  limit: number,
) => {
  return instance.get(`/hotels/status/${status}`, {
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
