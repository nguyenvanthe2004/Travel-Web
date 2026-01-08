import type { LoginData, RegisterData } from "../types/auth";
import instance from "./req";

export const callRegister = async (data: RegisterData) => {
    return await instance.post('/users/register', data);
} 
export const callLogin = async (data: LoginData) => {
    return await instance.post('/users/login', data);
}
export const verifyEmail = async (email: string, code: string) => {
    return await instance.post('/users/verifyEmail', { email, code });
}
export const forgotPassword = async (email: string) => {
    return await instance.post('/users/forgotPassword', { email });
}
export const getCurrentUser = async () => {
    return await instance.get('/users/current');
}