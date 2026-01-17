import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "routing-controllers";
import { Service } from "typedi";
import { UserRepository } from "../repositories/UserRepository";
import { CreateUserDto, LoginUserDto } from "../dtos/UserDto";
import bcrypt from "bcrypt";
import { UserRole } from "../models/User";
import { generateVerifyCode, refreshToken } from "../utils/helper";
import { MailService } from "./MailService";
import jwt from "jsonwebtoken";
import { generateForgotPass } from "../utils/helper";
import mongoose from "mongoose";
import { JwtPayload } from "../types/auth";
import { UpdatePasswordInput, UpdateProfileInput } from "../types/user";

@Service()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly mailService: MailService,
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
        throw new BadRequestError("Email already exists");
      }
      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (!isMatch) {
        throw new BadRequestError("Invalid email or password");
      }
      const token = jwt.sign(
        {
          userId: user._id,
          fullName: user.fullName,
          phone: user.phone,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        },
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return {
        user: {
          userId: user._id,
          fullName: user.fullName,
          phone: user.phone,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        token,
        message: "Login successfully!",
      };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async verifyEmail(email: string, code: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user || user.isActive || user.verifyCode !== code) {
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

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const verifyCode = await generateVerifyCode(6, this.userRepo);

      await this.userRepo.create(
        {
          fullName: dto.fullName,
          email: dto.email,
          phone: "",
          password: hashedPassword,
          role: UserRole.USER,
          avatar: "",
          verifyCode,
          isActive: false,
        },
        session,
      );

      await this.mailService.sendVerifyCode(dto.email, verifyCode);

      await session.commitTransaction();
      session.endSession();

      return {
        message: "Verification code sent to email",
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError(error.message);
    }
  }
  async sendForgotPasswordCode(email: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new BadRequestError("User not found");
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const verifyCode = await generateVerifyCode(6, this.userRepo);

      await this.userRepo.update(
        user.id,
        {
          verifyCode: verifyCode,
        },
        session,
      );

      await this.mailService.sendVerifyCode(email, verifyCode);

      await session.commitTransaction();
      session.endSession();

      return {
        message: "Verification code sent to email",
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError(error.message);
    }
  }
  async forgotPassword(email: string, code: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new BadRequestError("User not found");
    }

    if (user.verifyCode !== code) {
      throw new BadRequestError("Invalid verification code");
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const pass = generateForgotPass(6);
      const hashedPassword = await bcrypt.hash(pass, 10);
      await this.userRepo.update(
        user.id,
        {
          password: hashedPassword,
        },
        session,
      );
      await this.mailService.sendForgotPassword(email, pass);

      await session.commitTransaction();
      session.endSession();
      return {
        message: "New password sent to email",
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError(error.message);
    }
  }

  async currentUser(user: JwtPayload) {
    if (!user) {
      throw new BadRequestError("User not authenticated");
    }
    return user;
  }

  async updateProfile(data: UpdateProfileInput, userId: string, res: Response) {
    try {
      const user = await this.userRepo.findOne(userId);
      if (!user) {
        throw new BadRequestError("User not found");
      }

      const updatedUser = await this.userRepo.update(userId, {
        fullName: data.fullName,
        phone: data.phone,
      });
      refreshToken(res, updatedUser);

      return {
         user: {
          userId: updatedUser._id,
          fullName: updatedUser.fullName,
          phone: updatedUser.phone,
          email: updatedUser.email,
          role: updatedUser.role,
          avatar: updatedUser.avatar,
        },
      };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
  async updateAvatar(userId: string, avatar: string, res: Response) {
    try {
      const user = await this.userRepo.findOne(userId);
      if (!user) {
        throw new BadRequestError("User not found");
      }

      const updateAvatar = await this.userRepo.update(userId, { avatar });
      refreshToken(res, updateAvatar);
      return { updateAvatar };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
  async updatePassword(userId: string, data: UpdatePasswordInput) {
    try {
      const user = await this.userRepo.findOne(userId);
      if (!user) {
        throw new BadRequestError("User not found");
      }

      const isMatch = await bcrypt.compare(data.oldPassword, user.password);
      if (!isMatch) {
        throw new BadRequestError("Old password is incorrect");
      }

      const hashedPassword = await bcrypt.hash(data.newPassword, 10);

      const updatePass = await this.userRepo.update(userId, {
        password: hashedPassword,
      });

      return {
        updatePass,
      };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
}
