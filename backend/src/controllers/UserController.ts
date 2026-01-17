import {
  JsonController,
  Get,
  Post,
  Body,
  Param,
  Res,
  Authorized,
  Req,
  Put,
  UseBefore,
} from "routing-controllers";
import { Service } from "typedi";
import { UserService } from "../services/UserService";
import {
  CreateUserDto,
  LoginUserDto,
  UpdatePasswordDto,
  UpdateProfileDto,
  VerifyUserDto,
} from "../dtos/UserDto";
import { Request, Response } from "express";
import { UserRole } from "../models/User";
import { Public } from "../decorators/public";
import { UploadService } from "../services/UploadService";
import { UploadMiddleware } from "../middlewares/uploadMiddleware";
import { refreshToken } from "../utils/helper";

@Service()
@JsonController("/users")
export class UserController {
  constructor(
    private userService: UserService,
    private readonly uploadService: UploadService
  ) {}

  @Authorized([UserRole.ADMIN])
  @Get("/")
  async findAll() {
    return await this.userService.findAll();
  }

  @Get("/current")
  @Authorized([UserRole.ADMIN, UserRole.USER])
  async currentUser(@Req() req: Request) {
    const user = (req as any).user;
    return this.userService.currentUser(user);
  }

  @Authorized([UserRole.ADMIN])
  @Get("/:id")
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Public()
  @Post("/login")
  async login(
    @Body({ validate: true }) data: LoginUserDto,
    @Res() res: Response
  ) {
    return this.userService.login(data, res);
  }

  @Public()
  @Post("/register")
  async register(@Body({ validate: true }) data: CreateUserDto) {
    return this.userService.register(data);
  }
  @Public()
  @Post("/verify-email")
  async verifyEmail(@Body({ validate: true }) data: VerifyUserDto) {
    return this.userService.verifyEmail(data.email, data.code);
  }
  @Public()
  @Post("/forgot-code")
  async sendForgotPasswordCode(@Body() body: { email: string }) {
    return this.userService.sendForgotPasswordCode(body.email);
  }
  @Public()
  @Post("/forgot-password")
  async forgotPassword(@Body() body: { email: string; code: string }) {
    return this.userService.forgotPassword(body.email, body.code);
  }
  @Put("/profile")
  @Authorized([UserRole.ADMIN, UserRole.USER])
  async updateProfile(
    @Req() req: Request,
    @Body({ validate: true }) dto: UpdateProfileDto,
    @Res() res: Response
  ) {
    const userId = (req as any).user.userId;

    return await this.userService.updateProfile(dto, userId, res);
  }
  @Put("/avatar")
  async updateAvatar(@Req() req: Request, @Body() body: { avatar: string }, @Res() res: Response) {
    const userId = (req as any).user.userId;
    return await this.userService.updateAvatar(userId, body.avatar, res);
  }

  @Put("/password")
  async updatePassword(
    @Req() req: Request,
    @Body({ validate: true }) dto: UpdatePasswordDto
  ) {
    const userId = (req as any).user.userId;

    return await this.userService.updatePassword(userId, dto);
  }
}
