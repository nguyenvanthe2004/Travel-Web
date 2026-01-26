import { JsonController, Get, Post, Body, Param, Put, CurrentUser, Delete } from "routing-controllers";
import { Service } from "typedi";
import { CreateLocationDto, UpdateLocationDto } from "../dtos/LocationDto";
import { LocationService } from "../services/LocationService";
import { UserProps } from "../types/auth";

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
  @Post("/")
  async create(@Body({ validate: true }) data: CreateLocationDto) {
    return this.locationService.create(data);
  }
  @Put("/:id")
  async update(@Param("id") id: string, @Body({ validate: true }) data: UpdateLocationDto) {
    return this.locationService.update(id, data);
  }
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    return this.locationService.delete(id);
  }
}
