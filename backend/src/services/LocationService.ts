import { BadRequestError } from "routing-controllers";
import { Service } from "typedi";
import { LocationRepository } from "../repositories/LocationRepository";
import { CreateLocationDto, UpdateLocationDto } from "../dtos/LocationDto";

@Service()
export class LocationService {
  constructor(private readonly locationRepo: LocationRepository) {}

  async findAll(page = 1, limit?: number) {
    try {
      page = Math.max(1, Number(page));
      limit = Math.max(1, Number(limit));

      const skip = (page - 1) * limit;

      const [locations, total] = await Promise.all([
        this.locationRepo.findAll(skip, limit),
        this.locationRepo.countAll(),
      ]);

      return {
        totalPages: Math.ceil(total / limit),
        data: locations,
      };
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
  async update(id: string, dto: UpdateLocationDto) {
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
