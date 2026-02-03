import {
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParam,
  Req,

} from "routing-controllers";
import { Service } from "typedi";
import { HotelService } from "../services/HotelService";
import {
  CreateHotelDto,
  UpdateHotelDto,
  UpdateHotelStatusDto,
} from "../dtos/HotelDto";
import { Request } from "express";
import { Public } from "../decorators/public";
import { UserProps } from "../types/auth";

@Service()
@JsonController("/hotels")
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
  ) {}
  @Public()
  @Get("/")
  async findAll(
    @QueryParam("page") page: number,
    @QueryParam("limit") limit: number,
  ) {
    return await this.hotelService.findAll(page, limit);
  }
  @Public()
  @Get("/:id")
  async findById(@Param("id") id: string) {
    return await this.hotelService.findById(id);
  }
  @Public()
  @Get("/user/:userId")
  async findByUser(@Param("userId") userId: string) {
    return await this.hotelService.findByUser(userId);
  }
  @Post("/")
  async create(
    @CurrentUser() user: UserProps,
    @Body({ validate: true }) data: CreateHotelDto,
  ) {
    return this.hotelService.create(data, user);
  }
  @Put("/:id")
  async updateHotel(
    @Param("id") hotelId: string,
    @Body({ validate: true }) body: UpdateHotelDto,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.userId;
    return this.hotelService.update(hotelId, body, userId);
  }
  @Put("/status/:id")
  async updateHotelStatus(
    @Param("id") hotelId: string,
    @Body({ validate: true }) body: UpdateHotelStatusDto,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.userId;
    return this.hotelService.updateStatus(hotelId, body.status, userId);
  }
  @Delete("/:id")
  async deleteHotel(@Param("id") hotelId: string, @Req() req: Request) {
    const userId = (req as any).user.userId;
    return this.hotelService.delete(hotelId, userId);
  }
}
