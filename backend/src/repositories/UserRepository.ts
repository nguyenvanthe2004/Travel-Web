import { Service } from "typedi";
import { IUser, UserModel } from "../models/User";
import { CreateUserInput } from "../types/user";

@Service()
export class UserRepository {
  findAll(): Promise<IUser[]> {
    return UserModel.find().lean()
  }

  findOne(id: string) {
    return UserModel.findById(id);
  }

  findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async create(data: CreateUserInput): Promise<IUser> {
    const user = new UserModel({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role,
      isActive: data.isActive,
    });

    return user.save();
  }
}
