import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "routing-controllers";
import { Service } from "typedi";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserDto, LoginUserDto } from "../dtos/UserDto";
import bcrypt from "bcrypt";
import { UserRole } from "../models/User";
import { generateVerifyCode } from "../utils/generateVerifyCode";
import { MailService } from "./MailService";
import jwt from "jsonwebtoken";
import { generateForgotPass } from "../utils/generateForgotPass";

@Service()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly mailService: MailService
  ) {}
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
  async login(dto: LoginUserDto, res: Response) {
    try {
      const user = await this.userRepo.findByEmail(dto.email);
      if (!user) {
        throw new BadRequestError("Invalid email or password");
      }
      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (!isMatch) {
        throw new BadRequestError("Invalid email or password");
      }
      const token = jwt.sign(
        {
          userId: user._id,
          fullname: user.fullName,
          phone: user.phone,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token,
      };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async verifyEmail(email: string, code: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    if (user.isActive) {
      throw new BadRequestError("Email already verified");
    }

    if (user.verifyCode !== code) {
      throw new BadRequestError("Invalid verification code");
    }

    await this.userRepo.update(user.id, {
      isActive: true,
      verifyCode: code,
    });

    return { message: "Email verified successfully" };
  }

  async register(dto: CreateUserDto) {
    const existed = await this.userRepo.findByEmail(dto.email);
    if (existed) {
      throw new BadRequestError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const verifyCode = await generateVerifyCode(6, this.userRepo);

    await this.userRepo.create({
      fullName: dto.fullName,
      email: dto.email,
      phone: "",
      password: hashedPassword,
      role: UserRole.USER,
      verifyCode,
      isActive: false,
    });

    await this.mailService.sendVerifyCode(dto.email, verifyCode);

    return {
      message: "Verification code sent to email",
    };
  }
  async sendForgotPasswordCode(email: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new BadRequestError("User not found");
    }

    const verifyCode = await generateVerifyCode(6, this.userRepo);

    await this.userRepo.update(user.id, {
      verifyCode: verifyCode,
    });

    await this.mailService.sendVerifyCode(email, verifyCode);

    return {
      message: "Verification code sent to email",
    };
  }
  async forgotPassword(email: string, code: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new BadRequestError("User not found");
    }

    if (user.verifyCode !== code) {
      throw new BadRequestError("Invalid verification code");
    }

    const pass = await generateForgotPass(6, this.userRepo);
    const hashedPassword = await bcrypt.hash(pass, 10);
    await this.userRepo.update(user.id, {
      password: hashedPassword,
    });
    await this.mailService.sendForgotPassword(email, pass);
    return {
      message: "New password sent to email",
    };
  }

  async currentUser(user: any) {
    if (!user) {
      throw new BadRequestError("User not authenticated");
    }

    return user;
  }
}
