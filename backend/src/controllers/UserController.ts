import { JsonController, Get, Post, Body, Param } from "routing-controllers";
import { Service } from "typedi";
import { UserService } from "../services/UserService";
import { CreateUserDto } from "../dtos/UserDto";

@Service()
@JsonController("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/")
  async findAll() {
    return await this.userService.findAll();
  }

  @Get("/:id")
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Post("/register")
  async register(@Body({ validate: true }) data: CreateUserDto) {
    return this.userService.register(data);
  }
}
