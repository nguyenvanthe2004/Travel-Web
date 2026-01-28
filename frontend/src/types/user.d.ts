import { UserRole } from "../constants";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  joinedAt: string;
}