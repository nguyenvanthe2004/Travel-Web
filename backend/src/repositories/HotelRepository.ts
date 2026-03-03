import { Service } from "typedi";
import { Types } from "mongoose";
import { HotelModel, IHotel, HotelStatus } from "../models/Hotel";
import {
  CreateHotelInput,
  HotelFindFilter,
  HotelQuery,
  UpdateHotelInput,
} from "../types/hotel";
@Service()
export class HotelRepository {
  countAll(status?: string, locationId?: string) {
    if (!status && !locationId) {
      return HotelModel.countDocuments();
    }
    return HotelModel.countDocuments({status , locationId});
  }

  async countByUser(status?: string): Promise<number> {
    const query: HotelFindFilter = {};
    if (status) {
      query.status = status;
    }
    return HotelModel.countDocuments(query);
  }

  async countByStatus(status: HotelStatus, userId: string): Promise<number> {
    return HotelModel.countDocuments({ status, userId });
  }

  async findAll(
    skip: number,
    limit: number,
    status?: string,
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
    skip: number,
    limit: number,
    userId: string,
    status?: string,
  ): Promise<IHotel[]> {
    const query: HotelQuery = { userId };

    if (status) {
      query.status = status;
    }

    return HotelModel.find(query)
      .skip(skip)
      .limit(limit)
      .populate("locationId", "name")
      .populate("userId")
      .lean<IHotel[]>();
  }

  async create(data: CreateHotelInput, userId: string): Promise<IHotel> {
    const hotel = new HotelModel({ ...data, userId });
    return hotel.save();
  }

  async update(id: string, data: UpdateHotelInput): Promise<IHotel | null> {
    return HotelModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await HotelModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
