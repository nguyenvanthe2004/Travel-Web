import type { LoginData, RegisterData } from "../types/auth";
import instance from "./req";

export const callRegister = async (data: RegisterData) => {
  return await instance.post("/users/register", data);
};
export const callLogin = async (data: LoginData) => {
  return await instance.post("/users/login", data);
};
export const verifyEmail = async (email: string, code: string) => {
  return await instance.post("/users/verify-email", { email, code });
};
export const forgotPasswordCode = async (email: string) => {
  return await instance.post("/users/forgot-code", { email });
};
export const forgotPassword = async (email: string, code: string) => {
  return await instance.post("/users/forgot-password", { email, code });
};
export const getCurrentUser = async () => {
  return await instance.get("/users/current");
};
export const updateProfile = async (fullName: string, phone: string) => {
  const res = await instance.put("/users/profile", { fullName, phone });
  return res;
};
export const updateAvatar = async (avatar: string) => {
  return await instance.put("/users/avatar", { avatar });
};
export const updatePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  return await instance.put("/users/password", { oldPassword, newPassword });
};
export const addHotel = async (formData: FormData) => {
  return await instance.post("/hotels/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const getAllLocation = async () => {
  return await instance.get("/locations/");
};
