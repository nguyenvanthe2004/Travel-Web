import { Service } from "typedi";
import {
  CreateBookingInput,
  UpdateBookingInput,
  BookingFindFilter,
  BookingQuery,
  BookingWithPopulate,
} from "../types/booking";
import { IBooking, BookingModel, BookingStatus } from "../models/Booking";
import { ClientSession } from "mongoose";

@Service()
export class BookingRepository {
  countAll(status?: BookingStatus) {
    if (!status) {
      return BookingModel.countDocuments();
    }
    return BookingModel.countDocuments({ status });
  }

  async findAll(
    skip: number,
    limit: number,
    status?: BookingStatus,
    userId?: string,
  ): Promise<IBooking[]> {
    const query: BookingFindFilter = {};

    if (status) {
      query.status = status;
    }

    if (userId) {
      query.userId = userId;
    }

    return BookingModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "roomId",
        select: "name price images hotelId",
        populate: {
          path: "hotelId",
          select: "name address",
        },
      })
      .populate("userId", "fullName email avatar")
      .lean<IBooking[]>();
  }

  async findById(id: string): Promise<BookingWithPopulate | null> {
    return BookingModel.findById(id)
      .populate({
        path: "roomId",
        select: "name price images description hotelId",
        populate: {
          path: "hotelId",
          select: "name address locationId userId",
          populate: [
            { path: "locationId", select: "name" },
            { path: "userId", select: "_id fullName" },
          ],
        },
      })
      .populate("userId", "fullName email avatar")
      .lean<BookingWithPopulate>();
  }

  async findByUser(
    skip: number,
    limit: number,
    userId: string,
    status?: BookingStatus,
  ): Promise<IBooking[]> {
    const query: BookingQuery = { userId };

    if (status) {
      query.status = status;
    }
    return BookingModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "roomId",
        select: "name price images hotelId",
        populate: {
          path: "hotelId",
          select: "name address locationId",
          populate: [
            { path: "locationId", select: "name" },
            {
              path: "userId",
              select: "_id fullName",
            },
          ],
        },
      })
      .lean();
  }

  async findByOwner(
    skip: number,
    limit: number,
    ownerId: string,
    status?: BookingStatus,
  ): Promise<BookingWithPopulate[]> {
    const query: BookingQuery = { userId: ownerId };

    if (status) {
      query.status = status;
    }

    const bookings = await BookingModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "roomId",
        select: "name price images hotelId",
        populate: {
          path: "hotelId",
          select: "name address locationId userId",
          match: { userId: ownerId },
          populate: [
            { path: "locationId", select: "name" },
            { path: "userId", select: "_id fullName" },
          ],
        },
      })
      .lean<BookingWithPopulate[]>();

    return bookings.filter((b) => b.roomId?.hotelId);
  }

  async countByUser(status?: string): Promise<number> {
    const query: BookingFindFilter = {};
    if (status) {
      query.status = status;
    }
    return BookingModel.countDocuments(query);
  }
  async countByOwner(ownerId: string, status?: string): Promise<number> {
    const query: any = {};

    if (status) {
      query.status = status;
    }

    const bookings = await BookingModel.find(query)
      .populate({
        path: "roomId",
        populate: {
          path: "hotelId",
          match: { userId: ownerId },
        },
      })
      .lean();

    return bookings.filter((b: any) => b.roomId?.hotelId).length;
  }

  async countByStatus(status: BookingStatus, userId?: string): Promise<number> {
    const query: BookingFindFilter = { status };

    if (userId) {
      query.userId = userId;
    }

    return BookingModel.countDocuments(query);
  }

  async create(data: CreateBookingInput): Promise<IBooking> {
    const booking = new BookingModel(data);
    return booking.save();
  }

  async update(
    id: string,
    data: UpdateBookingInput,
    session?: ClientSession,
  ): Promise<IBooking | null> {
    return BookingModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, session },
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await BookingModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
