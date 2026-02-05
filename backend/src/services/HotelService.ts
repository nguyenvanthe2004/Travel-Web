import { Service } from "typedi";
import { HotelRepository } from "../repositories/HotelRepository";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "routing-controllers";
import { HotelStatus } from "../models/Hotel";
import { UserProps } from "../types/auth";
import { CreateHotelDto, UpdateHotelDto } from "../dtos/HotelDto";
import { UserRepository } from "../repositories/UserRepository";

@Service()
export class HotelService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hotelRepo: HotelRepository,
  ) {}

  async findAll(page = 1, limit?: number) {
    try {
      page = Math.max(1, Number(page));
      limit = Math.max(1, Number(limit));

      const skip = (page - 1) * limit;

      const [hotels, total] = await Promise.all([
        this.hotelRepo.findAll(skip, limit),
        this.hotelRepo.countAll(),
      ]);

      return {
        totalPages: Math.ceil(total / limit),
        data: hotels,
      };
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
  async getHotelById(id: string) {
    const hotel = await this.hotelRepo.findHotelById(id);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }
    return hotel;
  }
  async findByUser(userId: string, page = 1, limit = 10) {
    page = Math.max(1, Number(page));
    limit = Math.max(1, Number(limit));

    const skip = (page - 1) * limit;

    const [hotels, total] = await Promise.all([
      this.hotelRepo.findByUser(userId, skip, limit),
      this.hotelRepo.countByUser(userId),
    ]);

    return {
      total,
      totalPages: Math.ceil(total / limit),
      data: hotels,
    };
  }

  async create(dto: CreateHotelDto, user: UserProps) {
    const userId = String(user.userId);
    const existedUser = await this.userRepo.findOne(userId);
    if (!existedUser) {
      throw new BadRequestError("User not found");
    }
    await this.hotelRepo.create({
      name: dto.name,
      description: dto.description,
      images: dto.images,
      address: dto.address,
      locationId: dto.locationId,
      status: HotelStatus.OPEN,
      userId: userId,
    });
    return {
      success: true,
    };
  }
  async update(hotelId: string, data: UpdateHotelDto, user: UserProps) {
    const userId = String(user.userId);
    const existedUser = await this.userRepo.findOne(userId);
    if (!existedUser) {
      throw new BadRequestError("User not found");
    }
    const hotel = await this.hotelRepo.findHotelById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    if (hotel.userId.toString() !== userId) {
      throw new ForbiddenError("You are not allowed to update this hotel");
    }

    return this.hotelRepo.update(hotelId, data);
  }

  async updateStatus(hotelId: string, status: HotelStatus, userId: string) {
    const hotel = await this.hotelRepo.findHotelById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    if (hotel.userId.toString() !== userId) {
      throw new ForbiddenError("You are not allowed to change hotel status");
    }

    return this.hotelRepo.updateStatus(hotelId, status);
  }

  async delete(hotelId: string, userId: string) {
    const hotel = await this.hotelRepo.findHotelById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    if (hotel.userId.toString() !== userId) {
      throw new ForbiddenError("You are not allowed to delete this hotel");
    }

    return this.hotelRepo.delete(hotelId);
  }

  async findByStatus(status: HotelStatus, page = 1, limit = 10) {
    page = Math.max(1, Number(page));
    limit = Math.max(1, Number(limit));
    const skip = (page - 1) * limit;

    const [hotels, total] = await Promise.all([
      this.hotelRepo.findByStatus(status, skip, limit),
      this.hotelRepo.countByStatus(status),
    ]);

    return {
      total,
      totalPages: Math.ceil(total / limit),
      data: hotels,
    };
  }
  async countHotelStatus(status: HotelStatus) {
    return {
      status,
      total: await this.hotelRepo.countByStatus(status),
    };
  }
}
