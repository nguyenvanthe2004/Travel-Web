import { Schema, model, Document, Types } from "mongoose";

export enum BookingStatus {
  PENDING = "pending",    
  CONFIRMED = "confirmed",   
  CANCELLED = "cancelled",   
}

export interface IBooking extends Document {
  userId: Types.ObjectId;
  roomId: Types.ObjectId;
  nights: number;
  status: BookingStatus;
  checkIn: Date;
  checkOut: Date;
  guest: number;
  request: string;
  total: number
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    nights: {
      type: Number,
      required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.PENDING,
    },
    guest: {
        type: Number,
        required: true,
    },
    request: {
        type: String,
    },
    total: {
        type: Number,
        required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const BookingModel = model<IBooking>("Booking", BookingSchema);
