import { Service } from "typedi";
import { Types } from "mongoose";
import { HotelModel, IHotel, HotelStatus } from "../models/Hotel";
import { CreateHotelInput, UpdateHotelInput } from "../types/hotel";

@Service()
export class HotelRepository {
  countAll() {
    return HotelModel.countDocuments();
  }

  async findAll(skip: number, limit: number): Promise<IHotel[]> {
    if (!limit) {
      return HotelModel.find().lean();
    }
    return await HotelModel.find()
      .skip(skip)
      .limit(limit)
      .populate("locationId", "name")
      .populate("userId")
      .lean<IHotel[]>();
  }

  async findById(id: string): Promise<IHotel | null> {
    return HotelModel.findById(id)
      .populate("locationId")
      .populate("userId")
      .exec();
  }

  async findByUser(userId: string): Promise<IHotel[]> {
    return HotelModel.find({ userId }).exec();
  }

  async findByLocation(locationId: string): Promise<IHotel[]> {
    return HotelModel.find({ locationId }).exec();
  }

  async create(data: CreateHotelInput): Promise<IHotel> {
    const hotel = new HotelModel(data);
    return hotel.save();
  }

  async update(id: string, data: UpdateHotelInput): Promise<IHotel | null> {
    return HotelModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    ).exec();
  }

  async updateStatus(id: string, status: HotelStatus): Promise<IHotel | null> {
    return HotelModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await HotelModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
