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
} from "routing-controllers";
import { Service } from "typedi";
import { CreateLocationDto, UpdateLocationDto } from "../dtos/LocationDto";
import { LocationService } from "../services/LocationService";
import { UserRole } from "../models/User";

@Service()
@JsonController("/locations")
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get("/")
  async findAll() {
    return await this.locationService.findAll();
  }
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
