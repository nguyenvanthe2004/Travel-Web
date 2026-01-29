import { UserRole } from "../constants";

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  phone: string
  role: UserRole;
  createdAt: string;
}