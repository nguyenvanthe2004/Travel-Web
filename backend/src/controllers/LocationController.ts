import { JsonController, Get, Post, Body, Param } from "routing-controllers";
import { Service } from "typedi";
import { CreateLocationDto } from "../dtos/LocationDto";
import { LocationService } from "../services/LocationService";

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
}
