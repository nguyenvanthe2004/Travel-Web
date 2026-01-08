import { Service } from "typedi";
import { IUser, UserModel } from "../models/User";
import { CreateUserInput } from "../types/user";

@Service()
export class UserRepository {
  findAll(): Promise<IUser[]> {
    return UserModel.find().lean();
  }

  findOne(id: string) {
    return UserModel.findById(id);
  }

  findByEmail(email: string) {
    return UserModel.findOne({ email }).select("+password");
  }

  findByCode(code: string) {
    return UserModel.findOne({ verifyCode: code }).select("+password");
  }

  async create(data: CreateUserInput): Promise<IUser> {
    const user = new UserModel({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
      verifyCode: data.verifyCode,
      isActive: data.isActive,
    });

    return user.save();
  }
  async update(id: string, data: Partial<IUser>) {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }
}
