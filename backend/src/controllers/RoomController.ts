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
import { Public } from "../decorators/public";
import { RoomService } from "../services/RoomService";
import { CreateRoomDto, UpdateRoomDto } from "../dtos/RoomDto";
import { UserProps } from "../types/auth";

@Service()
@JsonController("/rooms")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get("/count/status")
  async countBySingleStatus() {
    return this.roomService.countByStatus();
  }

  @Public()
  @Get("/")
  async findAll(
    @QueryParam("page") page: number,
    @QueryParam("limit") limit?: number,
    @QueryParam("status") status?: string,
    @QueryParam("hotelId") hotelId?: string,
  ) {
    return await this.roomService.findAll(page, limit, status, hotelId);
  }

  @Public()
  @Get("/:id")
  async getRoomById(@Param("id") id: string) {
    return await this.roomService.getRoomById(id);
  }

  @Public()
  @Get("/:hotelId/hotel")
  async findByHotel(
    @QueryParam("page") page: number,
    @QueryParam("limit") limit: number,
    @Param("hotelId") hotelId: string,
  ) {
    return await this.roomService.findByHotel(page, limit, hotelId);
  }

  @Post("/")
  async create(@Body({ validate: true }) data: CreateRoomDto) {
    return this.roomService.create(data);
  }
  @Put("/:id")
  async update(
    @Param("id") roomId: string,
    @Body({ validate: true }) body: UpdateRoomDto,
    @CurrentUser() user: UserProps,
  ) {
    return this.roomService.update(roomId, body, user);
  }
  @Delete("/:id")
  async delete(@Param("id") roomId: string, @CurrentUser() user: UserProps) {
    return this.roomService.delete(roomId, user);
  }
}
