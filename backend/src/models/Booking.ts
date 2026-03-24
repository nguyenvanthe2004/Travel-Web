import { Schema, model, Document, Types } from "mongoose";

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
}

export interface IBooking extends Document {
  userId: Types.ObjectId;
  roomId: Types.ObjectId;
  info: string;
  nights: number;
  status: BookingStatus;
  checkIn: Date;
  checkOut: Date;
  guest: number;
  request: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  paymentStatus: PaymentStatus;
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
    info: {
      type: String,
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
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
  },
  {
    timestamps: true,
  },
);

export const BookingModel = model<IBooking>("Booking", BookingSchema);
