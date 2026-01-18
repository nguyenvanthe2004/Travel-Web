import instance from "./req";

export const addHotel = async (formData: FormData) => {
  return await instance.post("/hotels/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};