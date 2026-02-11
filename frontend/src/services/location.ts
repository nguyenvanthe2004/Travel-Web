import { Location } from "../types/location";
import { LocationFormData } from "../validations/location";
import instance from "./req";

export const callGetAllLocation = async (page: number, limit?: number) => {
  return await instance.get("/locations", {
    params: { page, limit },
  });
};
export const callCreateLocation = async (data: LocationFormData) => {
  return await instance.post("/locations", data);
};
export const callUpdateLocation = async (
  id: string,
  data: LocationFormData
) => {
  return await instance.put(`/locations/${id}`, data);
};
export const callGetLocationById = async (id: string) => {
  return await instance.get(`/locations/${id}`);
};
export const callDeleteLocation = async (id: string) => {
  return await instance.delete(`/locations/${id}`);
};
