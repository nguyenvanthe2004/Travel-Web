import { Schema, model, Document } from "mongoose";

export interface ILocation extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<ILocation>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const LocationModel = model<ILocation>("Location", LocationSchema);
