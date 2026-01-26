import { BadRequestError } from "routing-controllers";
import { Service } from "typedi";
import { LocationRepository } from "../repositories/LocationRepository";
import { CreateLocationDto, UpdateLocationDto } from "../dtos/LocationDto";
import { UserProps } from "../types/auth";

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
  async update(id: string, dto: Partial<UpdateLocationDto>) {
    try {
      const updatedLocation = await this.locationRepo.update(id, dto);
      if (!updatedLocation) {
        throw new BadRequestError("Location not found");
      }
      return updatedLocation;
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
  async delete(id: string) {
    try {
      const deletedLocation = await this.locationRepo.delete(id);
      if (!deletedLocation) {
        throw new BadRequestError("Location not found");
      }
      return deletedLocation;
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
}