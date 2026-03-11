import { Schema, model, Document } from "mongoose";

export interface ILocation extends Document {
  name: string;
  images: string[];
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
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
LocationSchema.virtual("hotels", {
  ref: "Hotel",
  localField: "_id",
  foreignField: "locationId",
});

LocationSchema.set("toObject", { virtuals: true });
LocationSchema.set("toJSON", { virtuals: true });

export const LocationModel = model<ILocation>("Location", LocationSchema);
