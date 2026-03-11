import { Service } from "typedi";
import { Types } from "mongoose";
import { HotelModel, IHotel, HotelStatus, SortValue } from "../models/Hotel";
import {
  CreateHotelInput,
  HotelFindFilter,
  HotelQuery,
  UpdateHotelInput,
} from "../types/hotel";
import { PipelineStage } from "mongoose";
import { buildVietnameseRegex } from "../utils/helper";
@Service()
export class HotelRepository {
  countAll(status?: string, locationId?: string) {
    if (!status && !locationId) {
      return HotelModel.countDocuments();
    }
    return HotelModel.countDocuments({ status, locationId });
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
      .populate("rooms")
      .populate("userId")
      .lean<IHotel[]>();
  }

  async findById(id: string): Promise<IHotel | null> {
    return HotelModel.findById(id)
      .populate("locationId", "_id name")
      .populate("rooms")
      .lean();
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
      .populate("rooms")
      .lean<IHotel[]>();
  }
  async findHotels(
    skip: number,
    limit: number,
    locationName?: string,
    guests?: number,
    minPrice?: number,
    maxPrice?: number,
    sort?: string,
  ) {
    const pipeline: PipelineStage[] = [];

    pipeline.push({
      $lookup: {
        from: "locations",
        localField: "locationId",
        foreignField: "_id",
        as: "locationId",
      },
    });

    pipeline.push({
      $unwind: "$locationId",
    });

    if (locationName) {
      const regex = buildVietnameseRegex(locationName);

      pipeline.push({
        $match: {
          "locationId.name": {
            $regex: regex,
            $options: "i",
          },
        },
      });
    }

    pipeline.push({
      $lookup: {
        from: "rooms",
        localField: "_id",
        foreignField: "hotelId",
        as: "rooms",
      },
    });

    if (guests) {
      pipeline.push({
        $match: {
          rooms: {
            $elemMatch: {
              maxGuests: { $gte: Number(guests) },
            },
          },
        },
      });
    }
    if (minPrice || maxPrice) {
      pipeline.push({
        $match: {
          rooms: {
            $elemMatch: {
              price: {
                $gte: Number(minPrice ?? 0),
                $lte: Number(maxPrice ?? 1000),
              },
            },
          },
        },
      });
    }
    pipeline.push({
      $addFields: {
        minRoomPrice: { $min: "$rooms.price" },
      },
    });
    switch (sort) {
      case SortValue.PRICE_ASC:
        pipeline.push({ $sort: { minRoomPrice: 1 } });
        break;

      case SortValue.PRICE_DESC:
        pipeline.push({ $sort: { minRoomPrice: -1 } });
        break;

      default:
        pipeline.push({ $sort: { createdAt: -1 } });
    }

    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    const hotels = await HotelModel.aggregate(pipeline);

    return hotels;
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
