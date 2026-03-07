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
    page = 1,
    limit?: number,
    status?: string,
    locationId?: string,
  ) {
    try {
      page = Math.max(1, Number(page));
      limit = Math.max(1, Number(limit));

      const skip = (page - 1) * limit;

      const [hotels, total] = await Promise.all([
        this.hotelRepo.findAll(skip, limit, status, locationId),
        this.hotelRepo.countAll(status),
      ]);

      const normalizedHotels = hotels.map((hotel) => {
        const minPrice = hotel.rooms.reduce((min, room) => {
          return room.price < min ? room.price : min;
        }, Infinity);

        const maxPrice = hotel.rooms.reduce((max, room) => {
          return room.price > max ? room.price : max;
        }, -Infinity);

        return {
          ...hotel,
          rangePrice:
            minPrice === maxPrice ? minPrice : `${minPrice} - ${maxPrice}`,
        };
      });

      return {
        totalPages: Math.ceil(total / limit),
        data: normalizedHotels,
      };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
  async getHotelById(id: string) {
    try {
      return await this.hotelRepo.findById(id);
    } catch (error: any) {
      throw new BadRequestError("Hotel not found");
    }
  }
  async findByUser(page = 1, limit = 10, user: UserProps, status?: string) {
    try {
      const userId = String(user.userId);
      page = Math.max(1, Number(page));
      limit = Math.max(1, Number(limit));

      const skip = (page - 1) * limit;

      const [hotels, total] = await Promise.all([
        this.hotelRepo.findByUser(skip, limit, userId, status),
        this.hotelRepo.countByUser(status),
      ]);

      return {
        total,
        totalPages: Math.ceil(total / limit),
        data: hotels,
      };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async create(dto: CreateHotelDto, user: UserProps) {
    try {
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
        },
        userId,
      );
      return {
        success: true,
      };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
  async update(hotelId: string, data: UpdateHotelDto, user: UserProps) {
    try {
      const userId = String(user.userId);
      const existedUser = await this.userRepo.findOne(userId);
      if (!existedUser) {
        throw new BadRequestError("User not found");
      }
      const hotel = await this.hotelRepo.findById(hotelId);
      if (!hotel) {
        throw new NotFoundError("Hotel not found");
      }
      const isOwner = hotel.userId.toString() === userId;
      const isAdmin = user.role === UserRole.ADMIN;

      if (!isOwner && !isAdmin) {
        throw new ForbiddenError("You are not allowed to update this hotel");
      }
      return this.hotelRepo.update(hotelId, data);
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async delete(hotelId: string, user: UserProps) {
    try {
      const userId = String(user.userId);
      const existedUser = await this.userRepo.findOne(userId);
      if (!existedUser) {
        throw new BadRequestError("User not found");
      }
      const hotel = await this.hotelRepo.findById(hotelId);
      if (!hotel) {
        throw new NotFoundError("Hotel not found");
      }
      const isOwner = hotel.userId.toString() === userId;
      const isAdmin = user.role === UserRole.ADMIN;

      if (!isOwner && !isAdmin) {
        throw new ForbiddenError("You are not allowed to update this hotel");
      }
      return this.hotelRepo.delete(hotelId);
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
  async countHotelStatus(user: UserProps) {
    const userId = String(user.userId);
    const statuses = Object.values(HotelStatus);
    return Promise.all(
      statuses.map(async (status) => ({
        status,
        total: await this.hotelRepo.countByStatus(status, userId),
      })),
    );
  }
}
