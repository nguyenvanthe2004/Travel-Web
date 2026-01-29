import {
  JsonController,
  Get,
  Post,
  Body,
  Param,
  Put,
  CurrentUser,
  Delete,
  Authorized,
  QueryParam,
} from "routing-controllers";
import { Service } from "typedi";
import { CreateLocationDto, UpdateLocationDto } from "../dtos/LocationDto";
import { LocationService } from "../services/LocationService";
import { UserRole } from "../models/User";
import { Public } from "../decorators/public";

@Service()
@JsonController("/locations")
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Public()
  @Get("/")
  async findAll(
    @QueryParam("page") page: number,
    @QueryParam("limit") limit: number,
  ) {
    if (!limit) {
      return await this.locationService.findAllWithoutPagination();
    }
    return await this.locationService.findAll(page, limit);
  }
  @Public()
  @Get("/:id")
  async findOne(@Param("id") id: string) {
    return this.locationService.findOne(id);
  }
  @Authorized([UserRole.ADMIN])
  @Post("/")
  async create(@Body({ validate: true }) data: CreateLocationDto) {
    return this.locationService.create(data);
  }
  @Authorized([UserRole.ADMIN])
  @Put("/:id")
  async update(
    @Param("id") id: string,
    @Body({ validate: true }) data: UpdateLocationDto,
  ) {
    return this.locationService.update(id, data);
  }
  @Authorized([UserRole.ADMIN])
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    return this.locationService.delete(id);
  }
}
