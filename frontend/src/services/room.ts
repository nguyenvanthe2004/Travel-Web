import { RoomFormData } from "../validations/room";
import instance from "./req";

export const callCountRoomStatus = async () => {
  const res = await instance.get("/rooms/count/status");
  return res.data;
};
export const callGetRoomsByHotelId = async (
  page: number,
  limit: number,
  hotelId?: string,
) => {
  return instance.get(`/rooms/${hotelId}/hotel`, {
    params: { page, limit },
  });
};

export const callGetAllRooms = async (
  page = 1,
  limit = 10,
  status?: string,
  hotelId?: string,
) => {
  return instance.get("/rooms", {
    params: { page, limit, status, hotelId },
  });
};
export const callCreateRoom = async (data: RoomFormData) => {
    return instance.post("/rooms", data);
}
export const callUpdateRoom = async (id: string, data: RoomFormData) => {
    return instance.put(`/rooms/${id}`, data);
}
export const callGetRoomById = async (id: string) => {
    return instance.get(`/rooms/${id}`);
}
export const callDeleteRoom = async (id: string) => {
    return instance.delete(`/rooms/${id}`);
}
