import { Service } from "typedi";
import { ILocation, LocationModel } from "../models/Location";
import { CreateLocationInput } from "../types/location";

@Service()
export class LocationRepository {
  findAll(): Promise<ILocation[]> {
    return LocationModel.find().lean();
  }

  findOne(id: string) {
    return LocationModel.findById(id).lean();
  }

  async create(data: CreateLocationInput): Promise<ILocation> {
    const location = new LocationModel({
      name: data.name,
      image: data.image,
    });
    return location.save();
  }
  async update(id: string, data: Partial<ILocation>): Promise<ILocation | null> {
    return LocationModel.findByIdAndUpdate(id, {$set: data}, { new: true });
  }
  async delete(id: string): Promise<ILocation | null> {
    return LocationModel.findByIdAndDelete(id);
  }
}
