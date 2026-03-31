import { Service } from "typedi";
import { ILocation, LocationModel } from "../models/Location";
import { CreateLocationInput } from "../types/location";
import { PipelineStage } from "mongoose";

@Service()
export class LocationRepository {
  countAll() {
    return LocationModel.countDocuments();
  }
  findAll(skip: number, limit: number) {
  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: "hotels",
        localField: "_id",
        foreignField: "locationId",
        as: "hotels",
      },
    },
    {
      $addFields: {
        hotelsCount: { $size: "$hotels" },
      },
    },
    {
      $sort: { hotelsCount: -1 },
    },
  ];

  if (skip) pipeline.push({ $skip: skip });
  if (limit) pipeline.push({ $limit: limit });

  return LocationModel.aggregate(pipeline);
}

  findOne(id: string) {
    return LocationModel.findById(id).lean();
  }

  async create(data: CreateLocationInput): Promise<ILocation> {
    const location = new LocationModel({
      name: data.name,
      images: data.images,
    });
    return location.save();
  }
  async update(
    id: string,
    data: Partial<ILocation>,
  ): Promise<ILocation | null> {
    return LocationModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  }
  async delete(id: string): Promise<ILocation | null> {
    return LocationModel.findByIdAndDelete(id);
  }
}
