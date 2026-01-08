import { UserRole } from "../models/User";

export interface JwtPayload {
  userId: number;
  fullname: string;
  phone: string;
  email: UserRole;
  role: string;
}
