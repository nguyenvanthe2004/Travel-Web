import { Service } from "typedi";
import { IUser, UserModel } from "../models/User";
import { CreateUserInput } from "../types/user";
import { ClientSession } from "mongoose";

@Service()
export class UserRepository {
  findAll(): Promise<IUser[]> {
    return UserModel.find().lean();
  }

  findOne(id: string) {
    return UserModel.findById(id);
  }

  findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  findByCode(code: string) {
    return UserModel.findOne({ verifyCode: code });
  }

  async create(data: CreateUserInput, session?: ClientSession): Promise<IUser> {
    const user = new UserModel(data);
    return await user.save({ session });
  }

  async update(id: string, data: Partial<IUser>, session?: ClientSession) {
    return UserModel.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
        session,
      },
    );
  }
}
