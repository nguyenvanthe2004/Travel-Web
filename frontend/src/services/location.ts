import instance from "./req";

export const callGetAllLocation = async () => {
  return await instance.get("/locations/");
};
export const callCreateLocation = async (name: string, image: string) => {
  return await instance.post("/locations/", { name, image });
}
export const callUpdateLocation = async (id: string, name?: string, image?: string) => {
  return await instance.put(`/locations/${id}`, { name, image });
}
export const callGetLocationById = async (id: string) => {
  return await instance.get(`/locations/${id}`);
}
export const callDeleteLocation = async (id: string) => {
  return await instance.delete(`/locations/${id}`);
}
