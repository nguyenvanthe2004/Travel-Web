import { Service } from "typedi";
import {
  CreateBookingInput,
  UpdateBookingInput,
  BookingFindFilter,
  BookingQuery,
} from "../types/booking";
import { IBooking, BookingModel, BookingStatus } from "../models/Booking";

@Service()
export class BookingRepository {
  countAll(status?: string) {
    if (!status) {
      return BookingModel.countDocuments();
    }
    return BookingModel.countDocuments({ status });
  }

  async findAll(
    skip: number,
    limit: number,
    status?: string,
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

  async findById(id: string): Promise<IBooking | null> {
    return BookingModel.findById(id)
      .populate({
        path: "roomId",
        select: "name price images description hotelId",
        populate: {
          path: "hotelId",
          select: "name address locationId",
          populate: {
            path: "locationId",
            select: "name",
          },
        },
      })
      .populate("userId", "fullName email avatar")
      .lean();
  }

  async findByUser(
    skip: number,
    limit: number,
    userId: string,
    status?: string,
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
    status?: string,
  ): Promise<IBooking[]> {
    const query: any = {};

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
      .lean();

    return bookings.filter((b: any) => b.roomId?.hotelId);
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

  async update(id: string, data: UpdateBookingInput): Promise<IBooking | null> {
    return BookingModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await BookingModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
