import { UserRole } from "../models/User";

export interface CreateUserInput {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  verifyCode: string;
  isActive: boolean;
}
