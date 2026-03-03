import { Service } from "typedi";
import {
  CreateRoomInput,
  RoomFindFilter,
  UpdateRoomInput,
} from "../types/room";
import { IRoom, RoomModel, RoomStatus } from "../models/Room";

@Service()
export class RoomRepository {
  countAll(filter: { hotelId?: string; status?: string }) {
    return RoomModel.countDocuments(filter);
  }

  async findAll(
    skip: number,
    limit: number,
    status?: string,
    hotelId?: string,
  ): Promise<IRoom[]> {
    const query: RoomFindFilter = {};

    if (status) {
      query.status = status;
    }

    if (hotelId) {
      query.hotelId = hotelId;
    }

    return RoomModel.find(query)
      .skip(skip)
      .limit(limit)
      .populate("hotelId", "name")
      .lean<IRoom[]>();
  }

  async findById(id: string): Promise<IRoom | null> {
    return RoomModel.findById(id).populate("hotelId", "name userId").lean();
  }

  async findByHotel(
    skip: number,
    limit: number,
    hotelId: string,
  ): Promise<IRoom[]> {
    return RoomModel.find({ hotelId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "hotelId",
        select: "name locationId",
        populate: {
          path: "locationId",
          select: "name",
        },
      })
      .lean();
  }

  async countByStatus(
  status: RoomStatus,
  hotelId?: string
): Promise<number> {
  const query: RoomFindFilter = { status };

  if (hotelId) {
    query.hotelId = hotelId;
  }

  return RoomModel.countDocuments(query);
}

  async create(data: CreateRoomInput): Promise<IRoom> {
    const room = new RoomModel(data);
    return room.save();
  }

  async update(id: string, data: UpdateRoomInput): Promise<IRoom | null> {
    return RoomModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await RoomModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
