import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param,
  Params,
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
import { UserRole } from "../models/User";
import { HotelStatus } from "../models/Hotel";

@Service()
@JsonController("/hotels")
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get("/count/:status")
  async countBySingleStatus(
    @Param("status") status: HotelStatus,
  ) {
    return this.hotelService.countHotelStatus(status);
  }

  @Public()
  @Get("/")
  async findAll(
    @QueryParam("page") page: number,
    @QueryParam("limit") limit: number,
  ) {
    return await this.hotelService.findAll(page, limit);
  }

  @Get("/user/:userId")
  async findByUser(
    @Param("userId") userId: string,
    @QueryParam("page") page: number,
    @QueryParam("limit") limit: number,
  ) {
    return await this.hotelService.findByUser(userId, page, limit);
  }
  @Public()
  @Get("/:id")
  async findHotelById(@Param("id") id: string) {
    return await this.hotelService.getHotelById(id);
  }
  @Get("/status/:status")
  async filterByStatus(
    @Param("status") status: HotelStatus,
    @QueryParam("page") page: number,
    @QueryParam("limit") limit: number,
  ) {
    return this.hotelService.findByStatus(status, page, limit);
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
    @CurrentUser() user: UserProps,
  ) {
    return this.hotelService.update(hotelId, body, user);
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
