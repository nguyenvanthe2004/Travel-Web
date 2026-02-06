import { Service } from "typedi";
import { Types } from "mongoose";
import { HotelModel, IHotel, HotelStatus } from "../models/Hotel";
import { CreateHotelInput, UpdateHotelInput } from "../types/hotel";

type HotelFindFilter = {
  status?: HotelStatus;
  locationId?: string;
};
@Service()
export class HotelRepository {
  countAll(status?: HotelStatus, locationId?: string) {
    if (!status) {
      return HotelModel.countDocuments();
    }
    return HotelModel.countDocuments({ status, locationId });
  }

  async countByUser(userId: string): Promise<number> {
    return HotelModel.countDocuments({ userId });
  }

  async countByStatus(status: HotelStatus): Promise<number> {
    return HotelModel.countDocuments({ status });
  }

  async findAll(
    skip: number,
    limit: number,
    status?: HotelStatus,
    locationId?: string,
  ): Promise<IHotel[]> {
    const query: HotelFindFilter = {};

    if (status) {
      query.status = status;
    }

    if (locationId) {
      query.locationId = locationId;
    }

    return HotelModel.find(query)
      .skip(skip)
      .limit(limit)
      .populate("locationId", "name")
      .populate("userId")
      .lean<IHotel[]>();
  }

  async findById(id: string): Promise<IHotel | null> {
    return HotelModel.findById(id).populate("locationId", "_id name").lean();
  }

  async findByUser(
    userId: string,
    skip: number,
    limit: number,
  ): Promise<IHotel[]> {
    return HotelModel.find({ userId })
      .skip(skip)
      .limit(limit)
      .populate("locationId", "name")
      .populate("userId", "name email")
      .lean();
  }

  async findByStatus(
    status: HotelStatus,
    skip: number,
    limit: number,
  ): Promise<IHotel[]> {
    return HotelModel.find({ status })
      .skip(skip)
      .limit(limit)
      .populate("locationId", "name")
      .populate("userId", "name email")
      .lean();
  }

  async create(data: CreateHotelInput, userId: string): Promise<IHotel> {
    const hotel = new HotelModel({ ...data, userId });
    return hotel.save();
  }

  async update(id: string, data: UpdateHotelInput): Promise<IHotel | null> {
    return HotelModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  async updateStatus(id: string, status: HotelStatus): Promise<IHotel | null> {
    return HotelModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await HotelModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
