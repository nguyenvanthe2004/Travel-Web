import { HotelData } from "../types/hotel";
import instance from "./req";

export const callGetAllHotel = async (page: number, limit: number) => {
  return await instance.get("/hotels", {
    params: { page, limit },
  });
};
export const callCreateHotel = async (data: HotelData) => {
  return await instance.post("/hotels", data );
};
export const callUpdateHotel = async (
  data: HotelData
) => {
  return await instance.put(`/hotels/${data._id}`, { data });
};
export const callDeleteHotel = async (id: string) => {
  return await instance.delete(`/hotels/${id}`);
};
