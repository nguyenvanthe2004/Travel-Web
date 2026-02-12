import { Service } from "typedi";
import { ILocation, LocationModel } from "../models/Location";
import { CreateLocationInput } from "../types/location";

@Service()
export class LocationRepository {
  countAll() {
    return LocationModel.countDocuments();
  }
  findAll(skip: number, limit: number): Promise<ILocation[]> {
    if(!limit) {
      return LocationModel.find().lean();
    }
    return LocationModel.find().skip(skip).limit(limit).lean<ILocation[]>();
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
