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
  async currentUser(
    @Res() res: Response,
    @Body() body: any,
    @Params() param: any
  ) {
    return this.userService.currentUser(res, body, param);
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
  @Post("/verifyEmail")
  async verifyEmail(@Body({ validate: true }) data: VerifyUserDto) {
    return this.userService.verifyEmail(data.email, data.code);
  }
  @Post("/forgotPassword")
  async forgotPassword(@Body() body: { email: string }) {
    return this.userService.forgotPassword(body.email);
  }
}
