import { Service } from "typedi";
import { RoomRepository } from "../repositories/RoomRepository";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { RoomStatus } from "../models/Room";
import { CreateRoomDto, UpdateRoomDto } from "../dtos/RoomDto";
import { UserProps } from "../types/auth";
import { HotelRepository } from "../repositories/HotelRepository";

@Service()
export class RoomService {
  constructor(
    private readonly RoomRepo: RoomRepository,
    private readonly HotelRepo: HotelRepository,
  ) {}

  async findAll(page = 1, limit?: number, status?: string, hotelId?: string) {
    try {
      page = Math.max(1, Number(page));
      limit = Math.max(1, Number(limit));

      const skip = (page - 1) * limit;

      const [rooms, total] = await Promise.all([
        this.RoomRepo.findAll(skip, limit, status, hotelId),
        this.RoomRepo.countAll({ hotelId, status }),
      ]);

      return {
        totalPages: Math.ceil(total / limit),
        total,
        data: rooms,
      };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
  async getRoomById(id: string) {
    try {
      const room = await this.RoomRepo.findById(id);
      if (!room) {
        throw new BadRequestError("Room not found");
      }
      return room;
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
  async findByHotel(page = 1, limit = 10, hotelId: string) {
    try {
      page = Math.max(1, Number(page));
      limit = Math.max(1, Number(limit));
      const skip = (page - 1) * limit;
      const [rooms, total] = await Promise.all([
        this.RoomRepo.findByHotel(skip, limit, hotelId),
        this.RoomRepo.countAll({ hotelId }),
      ]);

      return {
        totalPages: Math.ceil(total / limit),
        total,
        data: rooms,
      };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async create(dto: CreateRoomDto) {
    try {
      await this.RoomRepo.create({
        name: dto.name,
        description: dto.description,
        images: dto.images,
        price: dto.price,
        maxGuests: dto.maxGuests,
        wide: dto.wide,
        hotelId: dto.hotelId,
      });
      return {
        success: true,
      };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
  async update(roomId: string, data: UpdateRoomDto, user: UserProps) {
    try {
      const userId = String(user.userId);
      const room = await this.RoomRepo.findById(roomId);
      if (!room) {
        throw new NotFoundError("Room not found");
      }
      const hotel = await this.HotelRepo.findById(String(room.hotelId._id));
      if (hotel.userId.toString() !== userId) {
        throw new BadRequestError("You are not authorized to update this room");
      }
      return this.RoomRepo.update(roomId, data);
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async delete(roomId: string, user: UserProps) {
    try {
      const userId = String(user.userId);
      const room = await this.RoomRepo.findById(roomId);
      if (!room) {
        throw new NotFoundError("Room not found");
      }
      const hotel = await this.HotelRepo.findById(String(room.hotelId._id));
      if (hotel.userId.toString() !== userId) {
        throw new BadRequestError("You are not authorized to delete this room");
      }
      return this.RoomRepo.delete(roomId);
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
  async countByStatus() {
    const statuses = Object.values(RoomStatus);
    return Promise.all(
      statuses.map(async (status) => ({
        status,
        total: await this.RoomRepo.countByStatus(status),
      })),
    );
  }
}
