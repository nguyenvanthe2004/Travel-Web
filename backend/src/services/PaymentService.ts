import { Service } from "typedi";
import { BookingRepository } from "../repositories/BookingRepository";
import { BookingStatus, PaymentStatus } from "../models/Booking";
import { SepayDataWebhook } from "../types/sepay";
import { CONTENT_REGEX } from "../constant";
import { pusher } from "../types/pusher";
import { RoomRepository } from "../repositories/RoomRepository";
import { RoomStatus } from "../models/Room";
import mongoose from "mongoose";
import { BadRequestError } from "routing-controllers";

@Service()
export class PaymentService {
  constructor(
    private readonly bookingRepo: BookingRepository,
    private readonly roomRepo: RoomRepository,
  ) {}

  async processWebhook(data: SepayDataWebhook) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const match = data.content.match(CONTENT_REGEX);
      const bookingId = match?.[1];
      if (!bookingId) return;

      const booking = await this.bookingRepo.findById(bookingId);
      if (!booking) return;

      console.log(booking);
      await this.bookingRepo.update(
        bookingId,
        {
          status: BookingStatus.CONFIRMED,
          paymentStatus: PaymentStatus.PAID,
        },
        session,
      );

      await this.roomRepo.update(
        String(booking.roomId._id),
        {
          status: RoomStatus.BOOKED,
        },
        session,
      );

      await session.commitTransaction();
      session.endSession();

      await pusher.trigger(`payment-${bookingId}`, "payment-success", {
        bookingId,
        status: "PAID",
      });

      return { success: true };
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError(error.message);
    }
  }
}
