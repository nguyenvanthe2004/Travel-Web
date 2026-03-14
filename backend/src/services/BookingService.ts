import { Service } from "typedi";
import { BookingRepository } from "../repositories/BookingRepository";
import { RoomRepository } from "../repositories/RoomRepository";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { BookingStatus } from "../models/Booking";
import { CreateBookingDto, UpdateBookingDto } from "../dtos/BookingDto";
import { UserProps } from "../types/auth";
import { UserRepository } from "../repositories/UserRepository";

@Service()
export class BookingService {
  constructor(
    private readonly BookingRepo: BookingRepository,
    private readonly RoomRepo: RoomRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async findAll(page = 1, limit?: number, status?: string, userId?: string) {
    try {
      page = Math.max(1, Number(page));
      limit = Math.max(1, Number(limit));

      const skip = (page - 1) * limit;

      const [bookings, total] = await Promise.all([
        this.BookingRepo.findAll(skip, limit, status, userId),
        this.BookingRepo.countAll(status),
      ]);

      return {
        totalPages: Math.ceil(total / limit),
        total,
        data: bookings,
      };
    } catch (error: any) {
      throw new BadRequestError("Booking not found");
    }
  }

  async getBookingById(id: string) {
    try {
      const booking = await this.BookingRepo.findById(id);

      if (!booking) {
        throw new NotFoundError("Booking not found");
      }

      return booking;
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async findByUser(page = 1, limit = 10, user: UserProps, status?: string) {
    try {
      const userId = String(user.userId);
      page = Math.max(1, Number(page));
      limit = Math.max(1, Number(limit));

      const skip = (page - 1) * limit;

      const [bookings, total] = await Promise.all([
        this.BookingRepo.findByUser(skip, limit, userId, status),
        this.BookingRepo.countByUser(status),
      ]);

      return {
        totalPages: Math.ceil(total / limit),
        total,
        data: bookings,
      };
    } catch (error: any) {
      throw new BadRequestError("Booking not found");
    }
  }

  async create(dto: CreateBookingDto, user: UserProps) {
    try {
      const room = await this.RoomRepo.findById(dto.roomId);

      if (!room) {
        throw new NotFoundError("Room not found");
      }
      const booking = await this.BookingRepo.create({
        ...dto,
        userId: user.userId,
      });
      return {
        success: true,
      };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async update(bookingId: string, data: UpdateBookingDto, user: UserProps) {
    try {
      const booking = await this.BookingRepo.findById(bookingId);

      if (!booking) {
        throw new NotFoundError("Booking not found");
      }

      return this.BookingRepo.update(bookingId, data);
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async cancel(bookingId: string, user: UserProps) {
    try {
      const userId = String(user.userId);
      const existedUser = await this.userRepo.findOne(userId);
      if (!existedUser) {
        throw new BadRequestError("User not found");
      }
      const booking = await this.BookingRepo.findById(bookingId);

      if (!booking) {
        throw new NotFoundError("Booking not found");
      }
      if (booking.userId._id.toString() !== userId) {
        throw new BadRequestError(
          "You are not authorized to cancel this booking",
        );
      }

      return this.BookingRepo.update(bookingId, {
        status: BookingStatus.CANCELLED,
      });
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async delete(bookingId: string, user: UserProps) {
    try {
      const booking = await this.BookingRepo.findById(bookingId);

      if (!booking) {
        throw new NotFoundError("Booking not found");
      }

      if (booking.userId._id.toString() !== String(user.userId)) {
        throw new BadRequestError(
          "You are not authorized to delete this booking",
        );
      }

      return this.BookingRepo.delete(bookingId);
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async countByStatus(userId?: string) {
    const statuses = Object.values(BookingStatus);

    return Promise.all(
      statuses.map(async (status) => ({
        status,
        total: await this.BookingRepo.countByStatus(status, userId),
      })),
    );
  }
}
