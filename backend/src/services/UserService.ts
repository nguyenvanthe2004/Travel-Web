import { BadRequestError } from "routing-controllers";
import { Service } from "typedi";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserDto } from "../dtos/UserDto";
import bcrypt from "bcrypt";
import { UserRole } from "../models/User";

@Service()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  findAll() {
    try {
      return this.userRepo.findAll();
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  findOne(id: string) {
    try {
      return this.userRepo.findOne(id);
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  async register(dto: CreateUserDto) {
    try {
      const existed = await this.userRepo.findByEmail(dto.email);
      if (existed) {
        throw new BadRequestError("Email already exists");
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

      await this.userRepo.create({
        fullName: dto.fullName,
        email: dto.email,
        password: hashedPassword,
        role: UserRole.USER,
        isActive: false,
      });

      return { success: true };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
}
