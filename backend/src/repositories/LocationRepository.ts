import { Service } from "typedi";
import { ILocation, LocationModel } from "../models/Location";
import { CreateLocationInput } from "../types/location";

@Service()
export class LocationRepository {
  findAll(): Promise<ILocation[]> {
    return LocationModel.find().lean();
  }

  findOne(id: string) {
    return LocationModel.findById(id);
  }

  async create(data: CreateLocationInput): Promise<ILocation> {
    const location = new LocationModel({
      name: data.name,
    });
    return location.save();
  }
}
