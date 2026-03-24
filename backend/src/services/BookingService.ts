import { Service } from "typedi";
import { BookingRepository } from "../repositories/BookingRepository";
import { RoomRepository } from "../repositories/RoomRepository";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { BookingStatus } from "../models/Booking";
import { CreateBookingDto, UpdateBookingDto } from "../dtos/BookingDto";
import { UserProps } from "../types/auth";
import { UserRepository } from "../repositories/UserRepository";
import { LIMIT } from "../constant";

@Service()
export class BookingService {
  constructor(
    private readonly BookingRepo: BookingRepository,
    private readonly RoomRepo: RoomRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async findAll(
    page = 1,
    limit = LIMIT,
    status?: BookingStatus,
    userId?: string,
  ) {
    try {
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

  async findBookedDates(roomId: string) {
    try {
      const bookings = await this.BookingRepo.findByRoomId(roomId);

      return bookings.map((b) => ({
        checkIn: b.checkIn,
        checkOut: b.checkOut,
      }));
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async findByUser(
    page = 1,
    limit = LIMIT,
    user: UserProps,
    status?: BookingStatus,
  ) {
    try {
      const userId = user.userId;

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

  async findByOwner(
    page = 1,
    limit = LIMIT,
    user: UserProps,
    status?: BookingStatus,
  ) {
    try {
      const userId = user.userId;

      const skip = (page - 1) * limit;

      const [bookings, total] = await Promise.all([
        this.BookingRepo.findByOwner(skip, limit, userId, status),
        this.BookingRepo.countByOwner(userId, status),
      ]);

      return {
        totalPages: Math.ceil(total / limit),
        total,
        data: bookings,
      };
    } catch (error: any) {
      throw new BadRequestError(error.message || "Booking not found");
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
      return { _id: booking._id, total: booking.total };
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

      await this.BookingRepo.update(bookingId, data);

      return {
        success: true,
      };
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  async cancel(bookingId: string, user: UserProps) {
    try {
      const userId = user.userId;
      const booking = await this.BookingRepo.findById(bookingId);

      if (!booking) {
        throw new NotFoundError("Booking not found");
      }
      if (
        String(booking.userId._id) !== userId &&
        String(booking.roomId.hotelId.userId._id) !== userId
      ) {
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

      if (String(booking.roomId.hotelId.userId._id) !== String(user.userId)) {
        throw new BadRequestError(
          "You are not authorized to delete this booking",
        );
      }

      await this.BookingRepo.delete(bookingId);

      return {
        success: true,
      };
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
