import instance from "./req";

export const callGetAllLocation = async () => {
  return await instance.get("/locations/");
};