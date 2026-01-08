import {
  JsonController,
  Get,
  Post,
  Body,
  Param,
  Res,
  UseBefore,
  Params,
  Authorized,
  Req,
} from "routing-controllers";
import { Service } from "typedi";
import { UserService } from "../services/UserService";
import { CreateUserDto, LoginUserDto, VerifyUserDto } from "../dtos/UserDto";
import { Response } from "express";
import { UserRole } from "../models/User";
import { Public } from "../decorators/Public";

@Service()
@JsonController("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Authorized([UserRole.ADMIN])
  @Get("/")
  async findAll() {
    return await this.userService.findAll();
  }

  @Get("/:id")
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }
  @Get("/current")
  async currentUser(@Req() req: Request) {
    return this.userService.currentUser((req as any).user);
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
  @Post("/verify-email")
  async verifyEmail(@Body({ validate: true }) data: VerifyUserDto) {
    return this.userService.verifyEmail(data.email, data.code);
  }
  @Post("/forgot-code")
  async sendForgotPasswordCode(@Body() body: { email: string }) {
     return this.userService.sendForgotPasswordCode(body.email);
  }
  @Post("/forgot-password")
  async forgotPassword(@Body() body: { email: string, code: string }) {
    return this.userService.forgotPassword(body.email, body.code);
  }

}
