import { Schema, model, Document, Types } from "mongoose";
import { IRoom } from "./Room";

export enum HotelStatus {
  OPEN = "open",
  CLOSED = "closed",
  RENOVATION = "renovation",
}

export interface IHotel extends Document {
  name: string;
  address: string;
  description: string;
  status: HotelStatus;
  images: string[];
  locationId: Types.ObjectId;
  userId: Types.ObjectId;
  rooms: IRoom[];
  createdAt: Date;
  updatedAt: Date;
}

const HotelSchema = new Schema<IHotel>(
  {
    name: {
      type: String,
      required: true,
    },
    address: String,
    description: String,
    images: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(HotelStatus),
      default: HotelStatus.OPEN,
    },
    locationId: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

HotelSchema.virtual("rooms", {
  ref: "Room",
  localField: "_id",
  foreignField: "hotelId",
});

HotelSchema.set("toObject", { virtuals: true });
HotelSchema.set("toJSON", { virtuals: true });

export const HotelModel = model<IHotel>("Hotel", HotelSchema);
