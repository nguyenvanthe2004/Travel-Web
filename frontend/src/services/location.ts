import instance from "./req";

export const getAllLocation = async () => {
  return await instance.get("/locations/");
};