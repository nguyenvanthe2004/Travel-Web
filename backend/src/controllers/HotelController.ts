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
import { CreateHotelDto, UpdateHotelDto } from "../dtos/HotelDto";
import { Public } from "../decorators/public";
import { UserProps } from "../types/auth";

@Service()
@JsonController("/hotels")
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get("/count/status")
  async countBySingleStatus(@CurrentUser() user: UserProps) {
    return this.hotelService.countHotelStatus(user);
  }

  @Public()
  @Get("/")
  async findAll(
    @QueryParam("page") page: number,
    @QueryParam("limit") limit?: number,
    @QueryParam("status") status?: string,
    @QueryParam("locationId") locationId?: string,
  ) {
    return await this.hotelService.findAll(page, limit, status, locationId);
  }

  @Get("/my-hotel")
  async getCurrentHotel(
    @QueryParam("page") page: number,
    @QueryParam("limit") limit: number,
    @CurrentUser() user: UserProps,
    @QueryParam("status") status?: string,
  ) {
    return await this.hotelService.findByUser(page, limit, user, status);
  }
  @Public()
  @Get("/:id")
  async findHotelById(@Param("id") id: string) {
    return await this.hotelService.getHotelById(id);
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
  @Delete("/:id")
  async deleteHotel(
    @Param("id") hotelId: string,
    @CurrentUser() user: UserProps,
  ) {
    return this.hotelService.delete(hotelId, user);
  }
}
