import { BadRequestError } from "routing-controllers";
import { Service } from "typedi";
import { LocationRepository } from "../repositories/LocationRepository";
import { CreateLocationDto } from "../dtos/LocationDto";

@Service()
export class LocationService {
  constructor(private readonly locationRepo: LocationRepository) {}

  findAll() {
    try {
      return this.locationRepo.findAll();
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  findOne(id: string) {
    try {
      return this.locationRepo.findOne(id);
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  async create(dto: CreateLocationDto) {
    try {
      await this.locationRepo.create(dto);
      return { success: true };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
}
