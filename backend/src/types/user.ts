import { UserRole } from "../models/User";

export interface CreateUserInput {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}
