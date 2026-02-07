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
import { UserRole } from "../models/User";

@Service()
export class HotelService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hotelRepo: HotelRepository,
  ) {}

  async findAll(
    status?: HotelStatus,
    locationId?: string,
    page = 1,
    limit?: number,
  ) {
    try {
      page = Math.max(1, Number(page));
      limit = Math.max(1, Number(limit));

      const skip = (page - 1) * limit;

      const [hotels, total] = await Promise.all([
        this.hotelRepo.findAll(skip, limit, status, locationId),
        this.hotelRepo.countAll(status, locationId),
      ]);

      return {
        totalPages: Math.ceil(total / limit),
        data: hotels,
      };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
  async getHotelById(id: string) {
    const hotel = await this.hotelRepo.findById(id);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }
    return hotel;
  }
  async findByUser(user: UserProps, page = 1, limit = 10) {
    const userId = String(user.userId);
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
    await this.hotelRepo.create(
      {
        name: dto.name,
        description: dto.description,
        images: dto.images,
        address: dto.address,
        locationId: dto.locationId,
        status: HotelStatus.OPEN,
      },
      userId,
    );
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
    const hotel = await this.hotelRepo.findById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    if (hotel.userId.toString() !== userId) {
      throw new ForbiddenError("You are not allowed to update this hotel");
    }

    if (user.role === UserRole.ADMIN) {
      return this.hotelRepo.delete(hotelId);
    }
  }

  async updateStatus(hotelId: string, status: HotelStatus, user: UserProps) {
    const userId = String(user.userId);
    const existedUser = await this.userRepo.findOne(userId);
    if (!existedUser) {
      throw new BadRequestError("User not found");
    }
    const hotel = await this.hotelRepo.findById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    if (hotel.userId.toString() !== userId) {
      throw new ForbiddenError("You are not allowed to change hotel status");
    }

    return this.hotelRepo.updateStatus(hotelId, status);
  }

  async delete(hotelId: string, user: UserProps) {
    const userId = String(user.userId);
    const existedUser = await this.userRepo.findOne(userId);
    if (!existedUser) {
      throw new BadRequestError("User not found");
    }
    const hotel = await this.hotelRepo.findById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }
    if (user.role === UserRole.ADMIN) {
      return this.hotelRepo.delete(hotelId);
    }
  }
  async countHotelStatus(status: HotelStatus, user: UserProps) {
    const userId = String(user.userId)
    return {
      status,
      total: await this.hotelRepo.countByStatus(status, userId),
    };
  }
}
