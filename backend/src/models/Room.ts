import { Schema, model, Document, Types } from "mongoose";

export enum RoomStatus {
  AVAILABLE = "available",
  BOOKED = "booked",
  MAINTENANCE = "maintenance",
}

export interface IRoom extends Document {
  name: string;
  description: string;
  images: string[];
  price: number;
  maxGuests: number;
  wide: number;
  status: RoomStatus;
  hotelId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGuests: {
      type: Number,
    },
    wide: {
      type: Number,
    },
    status: {
      type: String,
      enum: Object.values(RoomStatus),
      default: RoomStatus.AVAILABLE,
    },
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const RoomModel = model<IRoom>("Room", RoomSchema);
